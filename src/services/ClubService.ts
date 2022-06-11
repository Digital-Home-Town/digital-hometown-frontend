import { clubCollection } from "src/firebase-config"

import { GenericProfileService } from "./GenericProfileService"

class ClubService extends GenericProfileService<Club> {
  async update(id: string, club: Club) {
    if (!club.members) club.members = []
    if (!club.requests) club.requests = []
    super.update(id, club)
  }
}

const clubService = new ClubService(clubCollection)
export default clubService
