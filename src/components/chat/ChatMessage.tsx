import { AuthContextI } from "../../auth/AuthContext"
import { ListItem, ListItemText, Paper, Typography } from "@mui/material"
import withAuth from "../../auth/withAuth"
import React, { useEffect, useState } from "react"
import classes from "./ChatMessage.module.css"
import profileService from "../../services/ProfileService"

function ChatMessageNoAuth({ currentUser, message }: AuthContextI & { message: MessageI }) {
  const [user, setUser] = useState<ProfileI | null | undefined>(undefined)

  useEffect(() => {
    profileService.getProfile(message.sendBy).then((user) => setUser(user))
  }, [])

  const isMyMsg = message.sendBy === currentUser?.uid

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
