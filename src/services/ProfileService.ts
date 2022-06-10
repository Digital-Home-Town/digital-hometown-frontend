import { profileCollection } from "src/firebase-config"

import { GenericProfileService } from "./GenericProfileService"

class ProfileService extends GenericProfileService<ProfileI> {
  async get(id: string): Promise<ProfileI | undefined> {
    const profile = await super.get(id)
    if (profile) {
      profile.age = this.getAge(profile.dateOfBirth)
    }
    return profile
  }

  async getAll(profileQuery?: ProfileQueryI) {
    const profiles = await super.getAll(profileQuery)
    profiles.forEach((profile) => {
      profile.age = this.getAge(profile.dateOfBirth)
    })

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

const profileService = new ProfileService(profileCollection)
export default profileService
