import React, { useEffect, useReducer, useRef } from "react"
import ChatMessage from "./ChatMessage"
import { ChatContextI, withChat } from "./ChatContext"
import { Divider, Grid, IconButton, ListItem } from "@mui/material"
import { DeleteForever, Edit } from "@mui/icons-material"
import ChatEdit from "./ChatEdit"
import ChatService from "../../services/ChatService"
import { toast } from "react-toastify"
import SendMessage from "./SendMessage"
import DeleteDialog from "../dialogs/DeleteDialog"

function ChatRoom_({ loading, currentRoom, messages, rooms }: ChatContextI) {
  const endMsgRef = useRef<HTMLDivElement | null>(null)
  const [showChatEdit, toggleShowChatEdit] = useReducer((state: boolean) => !state, false)
  const [showDeleteDialog, toggleShowDeleteDialog] = useReducer((state: boolean) => !state, false)

  const handleEdit = (profile: GenericProfile) => {
    if (currentRoom?.id == null) {
      return
    }
    if (!Object.keys(currentRoom.members).includes(profile.id)) {
      ChatService.addMember(currentRoom.id, profile.id, "admin")
        .then(() => toggleShowChatEdit())
        .catch(() => {
          toast.error("Benutzer konnte nicht hinzugefügt werden.")
        })
    } else {
      ChatService.removeMember(currentRoom.id, profile.id)
        .then(() => toggleShowChatEdit())
        .catch((e) => {
          toast.error("Benutzer konnte nicht entfernt werden.")
        })
    }
  }

  const handleScroll = () => {
    setTimeout(() => {
      if (endMsgRef.current != null) {
        endMsgRef.current?.scrollIntoView({ behavior: "smooth" })
      }
    }, 500)
  }

  useEffect(() => {
    handleScroll()
  }, [messages])

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <header>
        <ListItem>
          <span>
            <b>{currentRoom?.name}</b>{" "}
            {currentRoom?.group ? <small>({Object.keys(currentRoom?.members || []).length} Mitglieder)</small> : null}
          </span>
          {currentRoom?.group ? (
            <div>
              <IconButton onClick={() => toggleShowChatEdit()}>
                <Edit />
              </IconButton>
              <ChatEdit
                onClose={() => toggleShowChatEdit()}
                open={showChatEdit}
                onItemClick={(profile: GenericProfile) => handleEdit(profile)}
              />
            </div>
          ) : null}
          <IconButton color="error" sx={{ alignContent: "right" }} onClick={() => toggleShowDeleteDialog()}>
            <DeleteForever />
          </IconButton>
        </ListItem>
        <Divider />
      </header>
      <DeleteDialog
        open={showDeleteDialog}
        text="Bist du dir sicher, dass du diesen Chat löschen möchtest?"
        title="Chat löschen?"
        handleClose={() => toggleShowDeleteDialog()}
        onConfirm={() => {
          ChatService.deleteRoom(currentRoom?.id)
          window.location.reload()
        }}
      />
      <main style={{ display: "flex", height: "70vh" }}>
        <article style={{ flex: "2 2 12em", overflowY: "scroll" }}>
          <Grid container sx={{ flexDirection: "column" }}>
            {messages.map((message, index) => (
              <div key={index}>
                <ChatMessage message={message} />
                <div ref={endMsgRef} />
              </div>
            ))}
          </Grid>
        </article>
      </main>
      <footer>
        <SendMessage />
      </footer>
    </div>
  )
}

export default withChat(ChatRoom_)
