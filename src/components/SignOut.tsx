import * as React from "react"
import withAuth from "../auth/withAuth"
import { AuthContextProps } from "../auth/AuthContext"
import { Navigate } from "react-router-dom"

function SignIn({ setLoggedOut }: AuthContextProps) {
  setLoggedOut()

  return <Navigate to="/sign-in" />
}

export default withAuth(SignIn)
