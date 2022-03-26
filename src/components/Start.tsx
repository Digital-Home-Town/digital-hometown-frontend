import React from "react"
import { AuthContextProps } from "../auth/AuthContext"
import withAuth from "../auth/withAuth"
import Dashboard from "./Dashboard"
import LandingPage from "./LandingPage"

function Start({ loggedInUser }: AuthContextProps) {
  return <div>{loggedInUser !== undefined ? <Dashboard /> : <LandingPage />}</div>
}

export default withAuth(Start)
