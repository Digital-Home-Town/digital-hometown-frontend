import * as React from "react"
import withAuth from "../../auth/withAuth"
import { AuthContextProps } from "../../auth/AuthContext"
import Register from "./Register"

function RegisterOrg({ loggedInUser, setLoggedInUser }: AuthContextProps) {
  return (
    <div>
      <h1>Organisation</h1>
      <Register />
    </div>
  )
}

export default withAuth(RegisterOrg)
