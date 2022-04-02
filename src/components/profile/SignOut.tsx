import { getAuth, signOut } from "firebase/auth"
import * as React from "react"
import { Navigate } from "react-router-dom"

function SignIn() {
  const auth = getAuth()
  signOut(auth)

  return <Navigate to="/sign-in" />
}

export default SignIn
