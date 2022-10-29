import React from "react"
import { AuthContextI } from "src/auth/AuthContext"
import withAuth from "src/auth/withAuth"

import Dashboard from "./Dashboard"
import LandingPage from "./landing/LandingPage"

function Start({ currentUser }: AuthContextI) {
  return <div>{currentUser ? <Dashboard /> : <LandingPage isOrg={false} />}</div>
}

export default withAuth(Start)
