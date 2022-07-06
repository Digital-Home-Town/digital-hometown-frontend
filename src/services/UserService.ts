import { differenceInYears } from "date-fns"
import { userCollection } from "src/firebase-config"

import { GenericProfileService } from "./GenericProfileService"

class UserService extends GenericProfileService<User> {
  async get(id: string): Promise<User | undefined> {
    const user = await super.get(id)
    if (user) {
      user.age = this.getAge(user.dateOfBirth)
    }
    return user
  }

  async getAll(profileQuery?: ProfileQueryI) {
    const users = await super.getAll(profileQuery)
    users.forEach((user) => {
      user.age = this.getAge(user.dateOfBirth)
    })

    return users
  }

  async update(id: string, user: User) {
    if (!user.clubs) user.clubs = []
    if (!user.clubRequests) user.clubRequests = []
    if (!user.friends) user.friends = []

    delete user.age

    super.update(id, user)
  }

  getAge(dateOfBirth?: number) {
    const today = new Date()
    const birthday = new Date(dateOfBirth || 0)
    return differenceInYears(today, birthday)
  }
}

const userService = new UserService(userCollection)
export default userService
