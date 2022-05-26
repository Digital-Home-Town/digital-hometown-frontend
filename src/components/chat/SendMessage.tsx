import { IconButton, InputAdornment, TextField } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import classes from "./SendMessage.module.css"
import * as React from "react"
import { useEffect, useState } from "react"
import withAuth from "../../auth/withAuth"
import { DatabaseReference, push, ref } from "firebase/database"
import { realtimeDB } from "../../firebase-config"
import { AuthContextI } from "../../auth/AuthContext"
import { toast } from "react-toastify"
import { ChatContextI, withChat } from "./ChatContext"
import chatService from "../../services/ChatService"

function SendMessage({ currentRoomId, currentUser }: AuthContextI & ChatContextI) {
  const [message, setMessage] = useState("")

  const handleSubmit = () => {
    chatService
      .sendMessage(currentRoomId as string, {
        messageText: message,
        sendAt: Date.now(),
        sendBy: currentUser?.uid as string,
      })
      .then(() => {
        setMessage("")
      })
  }

  return (
    <form
      className={classes.sendMsgContainer}
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <TextField
        id="outlined-textarea"
        placeholder="Verfasse eine Nachricht..."
        variant={"outlined"}
        multiline
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        fullWidth={true}
        onKeyPress={(e) => {
          if (!e.shiftKey && e.key === "Enter") {
            handleSubmit()
          }
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit">
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  )
}

export default withChat(withAuth(SendMessage))
