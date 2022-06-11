import { userCollection } from "src/firebase-config"

import { GenericProfileService } from "./GenericProfileService"

class UserService extends GenericProfileService<User> {
  async get(id: string): Promise<User | undefined> {
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

  async update(id: string, profile: User) {
    if (!profile.clubs) profile.clubs = []
    if (!profile.clubRequests) profile.clubRequests = []
    super.update(id, profile)
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

const userService = new UserService(userCollection)
export default userService
