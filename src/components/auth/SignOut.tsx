import * as React from "react"
import { Navigate } from "react-router-dom"
import { AuthContextI } from "../../auth/AuthContext"
import withAuth from "../../auth/withAuth"
import { useEffect } from "react"

function SignOut({ logOut }: AuthContextI) {
  useEffect(() => logOut(), [logOut])
  return <Navigate to="/" />
}

export default withAuth(SignOut)
