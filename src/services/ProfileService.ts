import { doc, getDoc, getDocs, query, setDoc } from "@firebase/firestore"
import { updateProfile as updateProfileFirebaseAuth } from "firebase/auth"
import { toast } from "react-toastify"
import { auth, profileCollection } from "src/firebase-config"

class ProfileService {
  async addProfile(uid: string, profile: ProfileI) {
    await this.updateProfile(uid, profile)
  }

  async existsProfile(uid: string) {
    if (!uid) return false
    const profile = await this.getDocument(uid)
    return profile.exists()
  }

  async updateAuthProfile(profile: ProfileI) {
    if (auth.currentUser !== null) {
      await updateProfileFirebaseAuth(auth.currentUser, {
        displayName: profile.displayName || null,
        photoURL: profile.photoURL || null,
      })
    }
  }

  async updateProfile(uid: string, profile: ProfileI) {
    try {
      console.log("updateProfile", profile)
      const userRef = doc(profileCollection, uid)
      await setDoc(userRef, profile)
      await this.updateAuthProfile(profile)
    } catch (error) {
      toast.error("Fehler beim Speichern des Profils.")
      throw error
    }
  }

  async getDocument(uid: string) {
    const userRef = doc(profileCollection, uid)
    return await getDoc(userRef)
  }

  async getProfile(uid: string) {
    if (await this.existsProfile(uid)) {
      const resp = await this.getDocument(uid)
      const profile = resp.data()
      if (profile != null) {
        profile.age = this.getAge(profile.dateOfBirth)
      }
      return profile
    }
    return undefined
  }

  async getProfiles(profileQuery?: ProfileQueryI) {
    // const orderBy = profileQuery?.orderBy || "displayName"
    // const limit = profileQuery?.limit || 10

    const firebaseQuery = query(profileCollection)

    const documents = await getDocs(firebaseQuery)
    const profiles = documents.docs.map((doc) => doc.data())
    return profiles
  }

  getAge(dateOfBirth?: number) {
    const today = new Date()
    const birthday = new Date(dateOfBirth || 0)
    let age = today.getFullYear() - birthday.getFullYear()
    if (
      today.getMonth() < birthday.getMonth() ||
      (today.getMonth() === birthday.getMonth() && today.getDate() < birthday.getDay())
    ) {
      age--
    }
    return age
  }
}

const profileService = new ProfileService()
export default profileService
