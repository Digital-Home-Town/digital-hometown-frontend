import { ListItem, ListItemText, Paper, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"

import { AuthContextI } from "../../auth/AuthContext"
import withAuth from "../../auth/withAuth"
import profileService from "../../services/ProfileService"
import classes from "./ChatMessage.module.css"

function ChatMessageNoAuth({ currentUser, message }: AuthContextI & { message: MessageI }) {
  const [user, setUser] = useState<ProfileI | null | undefined>(undefined)

  useEffect(() => {
    profileService.getProfile(message.sendBy).then((user) => setUser(user))
  }, [message.sendBy])

  const isMyMsg = message.sendBy === currentUser?.id

  return (
    <ListItem className={isMyMsg ? classes.ownMessageBubbleItem : ""}>
      <Paper className={classes.messageBubble}>
        <Typography fontSize="small" color="primary">
          <b>{user?.displayName}</b>
        </Typography>
        <ListItemText primary={message.messageText} secondary={new Date(message.sendAt).toLocaleString()} />
      </Paper>
    </ListItem>
  )
}

export default withAuth(ChatMessageNoAuth)
