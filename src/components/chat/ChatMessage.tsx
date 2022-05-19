import { AuthContextI, UserI } from "../../auth/AuthContext"
import { ListItem, ListItemText, Paper } from "@mui/material"
import withAuth from "../../auth/withAuth"
import React from "react"
import "./ChatMessage.css"

export interface ChatMessageI {
  messageText: string
  sendAt: number
  sendBy: string
}

interface ChatMessageProps {
  message: ChatMessageI
  user: UserI
}

function ChatMessageNoAuth({ currentUser, message, user }: ChatMessageProps & AuthContextI) {
  const isMyMsg = message.sendBy === currentUser?.uid

  const itemClass = isMyMsg ? "ownMessageBubbleItem" : ""

  console.log("own message", isMyMsg)

  return (
    <ListItem className={itemClass}>
      <Paper className="messageBubble">
        {/* Show name if it is a group message */}
        {/*<ListItemText secondary>{user?.displayName}</ListItemText>*/}
        <ListItemText primary={message.messageText} secondary={new Date(message.sendAt).toLocaleString()} />
      </Paper>
    </ListItem>
  )
}

export default withAuth(ChatMessageNoAuth)
