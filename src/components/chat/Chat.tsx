import withAuth from "../../auth/withAuth"
import { AuthContextI } from "../../auth/AuthContext"
import React from "react"
import { Navigate } from "react-router-dom"
import ChatRoom from "./ChatRoom"

function Chat({ currentUser }: AuthContextI) {
  return currentUser != null ? (
    <div style={{ height: "100%" }}>
      <ChatRoom roomId="12341234" />
    </div>
  ) : (
    <Navigate to="/sign-in" />
  )
}

export default withAuth(Chat)
