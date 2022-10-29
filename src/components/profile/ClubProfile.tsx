import React from "react"
import { AuthContextI } from "src/auth/AuthContext"
import withAuth from "src/auth/withAuth"

import GenericProfile from "./GenericProfile"

function ClubProfile({ profile, currentUser }: ProfileProps<Club> & AuthContextI) {
  return <GenericProfile profile={profile} />
}

export default withAuth(ClubProfile)
