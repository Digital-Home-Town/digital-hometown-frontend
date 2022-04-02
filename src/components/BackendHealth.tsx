import { getAuth } from "firebase/auth"
import React from "react"

import { app } from "../firebase-config"
import { useBackendHealth } from "../hooks/useBackendHealth"

function BackendHealthNoAuth() {
  const { status } = useBackendHealth("LOADING")
  const auth = getAuth(app)
  return auth.currentUser ? (
    <div>
      <p>Backend status is {status.status}</p>
      <p>
        {auth.currentUser.displayName || "No name set"} is logged in as {auth.currentUser.email}
      </p>
    </div>
  ) : (
    <div>Not authenticated</div>
  )
}

export default BackendHealthNoAuth
