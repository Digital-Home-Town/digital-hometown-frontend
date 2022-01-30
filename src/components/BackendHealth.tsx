import React from "react"
import { useBackendHealth } from "../hooks/useBackendHealth"
import withAuth from "../hocs/withAuth"
import { AuthContextProps } from "../contexts/AuthContext"

function BackendHealthNoAuth({ loggedInUser }: AuthContextProps) {
  const { status } = useBackendHealth("LOADING")

  return loggedInUser !== undefined ? (
    <div>
      <p>Backend status is {status.status}</p>
      <p>
        {loggedInUser.name.first} {loggedInUser.name.last} is logged in as {loggedInUser.role}
      </p>
    </div>
  ) : (
    <div>Not authenticated</div>
  )
}

export default withAuth(BackendHealthNoAuth)
