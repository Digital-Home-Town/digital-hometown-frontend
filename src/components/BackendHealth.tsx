import React from "react"
import { AuthContextProps } from "src/auth/AuthContext"
import withAuth from "../auth/withAuth"

import { useBackendHealth } from "../hooks/useBackendHealth"

function BackendHealthNoAuth({ currentUser }: AuthContextProps) {
  const { status } = useBackendHealth("LOADING")

  return currentUser ? (
    <div>
      <p>Backend status is {status.status}</p>
      <p>
        {currentUser?.displayName || "No name set"} is logged in as {currentUser?.email}
      </p>
    </div>
  ) : (
    <div>Not authenticated</div>
  )
}

export default withAuth(BackendHealthNoAuth)
