import { CollectionReference, doc, getDoc, getDocs, query, setDoc } from "@firebase/firestore"
import { updateProfile as updateProfileFirebaseAuth } from "firebase/auth"
import { toast } from "react-toastify"
import { auth } from "src/firebase-config"

let requestCount = 0
export class GenericProfileService<T extends GenericProfile> {
  private collection: CollectionReference<T>
  constructor(collection: CollectionReference<T>) {
    this.collection = collection
  }
  async add(id: string, profile: GenericProfile) {
    await this.update(id, profile)
  }

  async exists(id: string) {
    requestCount++
    console.log(`${this.collection.path}: exists ${requestCount}`)
    if (!id) return false
    const profile = await this.getDocument(id)
    return profile.exists()
  }

  async updateAuth(profile: GenericProfile) {
    requestCount++
    console.log(`${this.collection.path}: updateAuth ${requestCount}`)
    if (auth.currentUser !== null) {
      await updateProfileFirebaseAuth(auth.currentUser, {
        displayName: profile?.displayName || null,
        photoURL: profile.photoURL || null,
      })
    }
  }

  async update(id: string, profile: GenericProfile) {
    requestCount++
    console.log(`${this.collection.path}: update ${requestCount}`)
    try {
      const userRef = doc(this.collection, id)
      await setDoc(userRef, profile)
      await this.updateAuth(profile)
    } catch (error) {
      toast.error("Fehler beim Speichern des Profils.")
      throw error
    }
  }

  async getDocument(id: string) {
    requestCount++
    console.log(`${this.collection.path}: getDocument ${requestCount}`)
    const userRef = doc(this.collection, id)
    return await getDoc(userRef)
  }

  async get(id: string) {
    const resp = await this.getDocument(id)
    const profile = resp.data()
    return profile
  }

  async getAll(profileQuery?: ProfileQueryI) {
    // const orderBy = profileQuery?.orderBy || "displayName"
    // const limit = profileQuery?.limit || 10

    const firebaseQuery = query(this.collection)

    requestCount++
    console.log(`${this.collection.path}: getAll ${requestCount}`)
    const documents = await getDocs(firebaseQuery)
    const profiles = documents.docs.map((doc) => doc.data())
    return profiles
  }
}
