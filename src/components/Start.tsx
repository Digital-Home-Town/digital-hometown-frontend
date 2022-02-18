import React from "react"
import { AuthContextProps } from "../auth/AuthContext"
import withAuth from "../auth/withAuth"
import Dashboard from "./Dashboard"

function Start({ loggedInUser }: AuthContextProps) {
  return <div>{loggedInUser !== undefined ? <Dashboard /> : "Landing page"}</div>
}

export default withAuth(Start)
