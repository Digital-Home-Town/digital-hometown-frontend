import { ListItem, ListItemText, Paper, Typography } from "@mui/material"

import { AuthContextI } from "../../auth/AuthContext"
import withAuth from "../../auth/withAuth"
import { ChatContextI, withChat } from "./ChatContext"
import classes from "./ChatMessage.module.css"

function ChatMessage_({ currentUser, message, currentRoom }: AuthContextI & ChatContextI & { message: MessageI }) {
  const isMyMsg = message.sendBy === currentUser?.id

  return (
    <>
      {currentRoom != null && (
        <ListItem className={isMyMsg ? classes.ownMessageBubbleItem : ""}>
          <Paper className={classes.messageBubble}>
            <Typography fontSize="small" color="primary">
              <b>{currentRoom.members[message.sendBy]?.user?.displayName}</b>
            </Typography>
            <ListItemText primary={message.text} secondary={new Date(message.sendAt).toLocaleString()} />
          </Paper>
        </ListItem>
      )}
    </>
  )
}

const ChatMessage__ = withChat(ChatMessage_)
export default withAuth(ChatMessage__)
