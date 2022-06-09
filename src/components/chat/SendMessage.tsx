import { IconButton, InputAdornment, TextField } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import classes from "./SendMessage.module.css"
import * as React from "react"
import { useReducer, useState } from "react"
import withAuth from "../../auth/withAuth"
import { AuthContextI } from "../../auth/AuthContext"
import { ChatContextI, withChat } from "./ChatContext"
import chatService from "../../services/ChatService"
import Picker, { IEmojiData } from "emoji-picker-react"
import { EmojiEmotions } from "@mui/icons-material"
import { BrowserView } from "react-device-detect"

function SendMessage({ currentRoomId, currentUser }: AuthContextI & ChatContextI) {
  const [message, setMessage] = useState("")
  const [showEmojiPicker, toggleEmojiPicker] = useReducer((state: boolean) => !state, false)

  const onEmojiClick = (emojiObject: IEmojiData) => {
    if (emojiObject.emoji != null) setMessage((prev) => prev + emojiObject.emoji)
  }

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
      {showEmojiPicker && (
        <BrowserView>
          <div className={classes.emojiPicker}>
            <Picker onEmojiClick={(_, emojiObject) => onEmojiClick(emojiObject)} />
          </div>
        </BrowserView>
      )}
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
              <BrowserView>
                <IconButton onClick={() => toggleEmojiPicker()}>
                  <EmojiEmotions />
                </IconButton>
              </BrowserView>
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
