import { getAuth, signOut } from "firebase/auth"
import * as React from "react"
import { Navigate } from "react-router-dom"

export function SignOut() {
  const auth = getAuth()
  signOut(auth)

  return <Navigate to="/sign-in" />
}
