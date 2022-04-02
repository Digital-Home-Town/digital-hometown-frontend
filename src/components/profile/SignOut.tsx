import * as React from "react"
import { Navigate } from "react-router-dom"
import { AuthContextProps } from "../../auth/AuthContext"
import withAuth from "../../auth/withAuth"

function SignOut({ logOut }: AuthContextProps) {
  logOut()

  return <Navigate to="/sign-in" />
}

export default withAuth(SignOut)
