import { getAuth } from "firebase/auth"
import React from "react"

import { app } from "../firebase-config"
import Dashboard from "./Dashboard"
import LandingPage from "./LandingPage"

function Start() {
  const auth = getAuth(app)
  return <div>{auth.currentUser ? <Dashboard /> : <LandingPage />}</div>
}

export default Start
