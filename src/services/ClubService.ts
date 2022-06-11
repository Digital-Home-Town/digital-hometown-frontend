import { clubCollection } from "src/firebase-config"

import { GenericProfileService } from "./GenericProfileService"

class ClubService extends GenericProfileService<Club> {}

const clubService = new ClubService(clubCollection)
export default clubService
