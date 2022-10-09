import React from "react"
import { Navigate, useParams } from "react-router-dom"

import { AuthContextI } from "../auth/AuthContext"
import withAuth from "../auth/withAuth"
import { ChatProvider } from "../components/chat/ChatContext"
import Chat from "../components/chat/Chat"
import ChatService from "src/services/ChatService"

function ChatPage({ currentUser }: AuthContextI) {
  const { id } = useParams()

  ChatService.getRooms()

  return currentUser != null ? (
    <ChatProvider currentUser={currentUser} defaultChatId={id}>
      <Chat />
    </ChatProvider>
  ) : (
    <Navigate to="/sign-in" />
  )
}

export default withAuth(ChatPage)
