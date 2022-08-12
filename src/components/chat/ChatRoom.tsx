import React, { useEffect, useReducer, useRef } from "react"
import ChatMessage from "./ChatMessage"
import { ChatContextI, withChat } from "./ChatContext"
import { Divider, IconButton, List, ListItem } from "@mui/material"
import { Edit } from "@mui/icons-material"
import ChatEdit from "./ChatEdit"
import chatService from "../../services/ChatService"
import { toast } from "react-toastify"

function ChatRoom_({ loading, currentRoom, messages, rooms }: ChatContextI) {
  const endMsgRef = useRef<HTMLDivElement | null>(null)
  const [showChatEdit, toggleShowChatEdit] = useReducer((state: boolean) => !state, false)

  const handleEdit = (profile: GenericProfile) => {
    if (currentRoom?.id == null) {
      return
    }
    if (!Object.keys(currentRoom.members).includes(profile.id)) {
      chatService
        .addMember(currentRoom.id, profile.id, "admin")
        .then(() => toggleShowChatEdit())
        .catch(() => {
          toast.error("Benutzer konnte nicht hinzugefügt werden.")
        })
    } else {
      chatService
        .removeMember(currentRoom.id, profile.id)
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
    <div style={{ display: "flex", flexDirection: "row", alignItems: "stretch" }}>
      <List style={{ flexGrow: 2 }}>
        <ListItem>
          <span>
            <b>{currentRoom?.name}</b> <small>({Object.keys(currentRoom?.members || []).length} Mitglieder)</small>
          </span>
          <IconButton onClick={() => toggleShowChatEdit()}>
            <Edit />
          </IconButton>
          <ChatEdit
            onClose={() => toggleShowChatEdit()}
            open={showChatEdit}
            onItemClick={(profile: GenericProfile) => handleEdit(profile)}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <div>
            <div style={{ overflowY: "auto", minHeight: "65vh", maxHeight: "65vh" }}>
              <div>
                {messages.map((message, index) => (
                  <ChatMessage key={index} message={message} />
                ))}
                <div ref={endMsgRef} />
              </div>
            </div>
          </div>
        </ListItem>
      </List>
    </div>
  )
}

export default withChat(ChatRoom_)
