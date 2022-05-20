import { doc, getDoc, setDoc } from "@firebase/firestore"
import { toast } from "react-toastify"
import { updateProfile as updateProfileFirebaseAuth } from "firebase/auth"
import { auth, profileCollection } from "src/firebase-config"

class ProfileService {
  async addProfile(uid: string, profile: ProfileI) {
    await this.updateProfile(uid, profile)
  }

  async existsProfile(uid: string) {
    const profile = await this.getDocument(uid)
    return profile.exists()
  }

  async updateAuthProfile(profile: ProfileI) {
    if (auth.currentUser !== null) {
      console.log("updateAuthProfile", profile)
      await updateProfileFirebaseAuth(auth.currentUser, {
        displayName: profile.displayName || null,
        photoURL: profile.photoURL || null,
      })
    }
  }

  async updateProfile(uid: string, profile: ProfileI) {
    try {
      const userRef = doc(profileCollection, uid)
      await setDoc(userRef, profile)
      await this.updateAuthProfile(profile)
      toast.info("Profil gespeichert.")
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
      return (await this.getDocument(uid)).data()
    }
    return undefined
  }
}

const profileService = new ProfileService()
export default profileService
