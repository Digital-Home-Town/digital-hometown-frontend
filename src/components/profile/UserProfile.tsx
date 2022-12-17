import React from "react"
import { AuthContextI } from "src/auth/AuthContext"
import withAuth from "src/auth/withAuth"

import GenericProfile from "./GenericProfile"

function UserProfile({ profile }: ProfileProps<User> & AuthContextI) {
  return <GenericProfile profile={profile} />
}

export default withAuth(UserProfile)
