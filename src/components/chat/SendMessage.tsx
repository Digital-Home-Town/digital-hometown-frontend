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

interface SendMessageI {
  roomId: string
}

function SendMessage({ roomId, currentUser }: AuthContextI & SendMessageI) {
  const [message, setMessage] = useState("")
  const [messagesRef, setMessagesRef] = useState<DatabaseReference | null>(null)

  useEffect(() => {
    setMessagesRef(ref(realtimeDB, `messages/${roomId}`))
  }, [])

  const handleSubmit = () => {
    if (messagesRef == null) {
      toast.error("Deine Nachricht konnte nicht versendet werden")
      return
    }
    console.log("message:", message)
    push(messagesRef, { messageText: message, sendAt: Date.now(), sendBy: currentUser?.uid })
      .then(() => {
        setMessage("")
      })
      .catch((error) => {
        console.error(error)
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
          if (e.ctrlKey && e.key === "\n") {
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

export default withAuth(SendMessage)
