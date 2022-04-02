import React from "react"
import { AuthContextProps } from "src/auth/AuthContext"
import withAuth from "src/auth/withAuth"

import Dashboard from "./Dashboard"
import LandingPage from "./LandingPage"

function Start({ currentUser }: AuthContextProps) {
  return <div>{currentUser ? <Dashboard /> : <LandingPage />}</div>
}

export default withAuth(Start)
