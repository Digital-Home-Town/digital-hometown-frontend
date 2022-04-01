import * as React from "react"
import withAuth from "../../auth/withAuth"
import { AuthContextProps } from "../../auth/AuthContext"
import SignIn from "./SignIn"

function SignInOrg({ loggedInUser, setLoggedInUser }: AuthContextProps) {
  return (
    <div>
      <h1>Organisation</h1>
      <SignIn />
    </div>
  )
}

export default withAuth(SignInOrg)
