import { ListItem, ListItemText, Paper, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import clubService from "src/services/ClubService"

import { AuthContextI } from "../../auth/AuthContext"
import withAuth from "../../auth/withAuth"
import userService from "../../services/UserService"
import classes from "./ChatMessage.module.css"

function ChatMessageNoAuth({ currentUser, message }: AuthContextI & { message: MessageI }) {
  const [user, setUser] = useState<GenericProfile | null | undefined>(undefined)
  const service = currentUser?.isOrg ? clubService : userService

  useEffect(() => {
    service.get(message.sendBy).then((user) => setUser(user))
  }, [message.sendBy, service])

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
