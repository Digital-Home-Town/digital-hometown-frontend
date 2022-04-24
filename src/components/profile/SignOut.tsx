import * as React from "react"
import { Navigate } from "react-router-dom"
import { AuthContextProps } from "../../auth/AuthContext"
import withAuth from "../../auth/withAuth"
import { useEffect } from "react"

function SignOut({ logOut }: AuthContextProps) {
  useEffect(() => logOut(), [])
  return <Navigate to="/" />
}

export default withAuth(SignOut)
