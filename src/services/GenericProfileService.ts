import {
  CollectionReference,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "@firebase/firestore"
import { updateProfile as updateProfileFirebaseAuth } from "firebase/auth"
import { toast } from "react-toastify"
import { auth } from "src/firebase-config"

import PostService from "./PostService"

export let requestCount = 0
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

  updateAttribute(profile: T, attributes: Partial<T>): T {
    // Update
    if (profile) {
      const updatedUser = { ...profile, ...attributes }
      profile = updatedUser
      this.update(updatedUser.id, updatedUser)
        .then(() => {
          toast.success("Dein Profil wurde aktualisiert.")
        })
        .catch((e) => {
          toast.error("Dein Profil konnte nicht aktualisiert werden.")
          throw e
        })
      return updatedUser
    }
    return profile
  }

  async togglePostFavorites(profile: GenericProfile, postId: string) {
    if (profile.favoritePosts) {
      if (profile.favoritePosts.includes(postId)) {
        profile.favoritePosts = profile.favoritePosts.filter((p) => p !== postId)
      } else {
        profile.favoritePosts.push(postId)
      }
    } else {
      profile.favoritePosts = [postId]
    }
    this.update(profile.id, profile)
  }

  async update(id: string, profile: GenericProfile) {
    requestCount++
    console.log(`${this.collection.path}: update ${requestCount}`)
    try {
      const userRef = doc(this.collection, id)
      await setDoc(userRef, profile)
      await this.updateAuth(profile)

      const posts = await PostService.getAll(profile)

      posts.forEach(async (post) => {
        if (post.author.id === id && post.id) {
          post.author = profile
          await PostService.update(post.id, post)
        }
      })
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

  async delete(id: string) {
    requestCount++
    console.log(`${this.collection.path}: getDocument ${requestCount}`)
    const userRef = doc(this.collection, id)
    await deleteDoc(userRef)
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
