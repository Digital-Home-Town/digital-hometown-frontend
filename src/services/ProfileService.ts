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
      console.log(profile)
      if (profile != null) {
        profile.dateOfBirth = profile?.dateOfBirth || 0
        if (profile.dateOfBirth != null) {
          const today = new Date()
          const birthday = new Date(profile.dateOfBirth)
          console.log(birthday)
          let age = today.getFullYear() - birthday.getFullYear()
          if (
            today.getMonth() < birthday.getMonth() ||
            (today.getMonth() === birthday.getMonth() && today.getDate() < birthday.getDay())
          ) {
            age--
          }
          profile.age = age
        }
      }
      return profile
    }
    return undefined
  }
}

const profileService = new ProfileService()
export default profileService
