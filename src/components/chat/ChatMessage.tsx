import { Grid, ListItemText, Paper, Typography } from "@mui/material"

import { AuthContextI } from "../../auth/AuthContext"
import withAuth from "../../auth/withAuth"
import { ChatContextI, withChat } from "./ChatContext"

function ChatMessage_({ currentUser, message, currentRoom }: AuthContextI & ChatContextI & { message: MessageI }) {
  const isMyMsg = message.sendBy === currentUser?.id

  return (
    <>
      {currentRoom != null && (
        <Grid
          item
          component={Paper}
          sx={{ padding: "10px 30px", marginBottom: "5px", marginLeft: isMyMsg ? "50px" : "0px" }}
        >
          <Typography fontSize="small" color="primary">
            <b>{currentRoom.members[message.sendBy]?.user?.displayName}</b>
          </Typography>
          <ListItemText
            primary={<Typography component={"pre"}>{message.text}</Typography>}
            secondary={new Date(message.sendAt).toLocaleString()}
          />
        </Grid>
      )}
    </>
  )
}

const ChatMessage__ = withChat(ChatMessage_)
export default withAuth(ChatMessage__)
