import withAuth from "../../auth/withAuth"
import { AuthContextI } from "../../auth/AuthContext"
import React from "react"
import { Navigate } from "react-router-dom"
import ChatRoom from "./ChatRoom"

function Chat({ currentUser }: AuthContextI) {
  return currentUser != null ? <ChatRoom roomId="12341234" /> : <Navigate to="/sign-in" />
}

export default withAuth(Chat)
