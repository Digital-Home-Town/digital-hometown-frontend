import { clubCollection } from "src/firebase-config"

import { GenericProfileService } from "./GenericProfileService"

class ClubService extends GenericProfileService<Club> {
  async update(id: string, profile: Club) {
    if (!profile.members) profile.members = []
    if (!profile.requests) profile.requests = []
    super.update(id, profile)
  }
}

const clubService = new ClubService(clubCollection)
export default clubService
