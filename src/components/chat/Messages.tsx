import React, { useEffect, useReducer, useRef } from "react"
import ChatMessage from "./ChatMessage"
import { ChatContextI, withChat } from "./ChatContext"
import { IconButton } from "@mui/material"
import { Edit } from "@mui/icons-material"
import ChatEdit from "./ChatEdit"
import chatService from "../../services/ChatService"
import { toast } from "react-toastify"

function Messages_({ loading, currentRoom, messages, rooms }: ChatContextI) {
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
      <div style={{ flexGrow: 2 }}>
        <b>{currentRoom?.name}</b> <small>({Object.keys(currentRoom?.members || []).length} Mitglieder)</small>
        <IconButton onClick={() => toggleShowChatEdit()}>
          <Edit />
        </IconButton>
        <ChatEdit
          onClose={() => toggleShowChatEdit()}
          open={showChatEdit}
          onItemClick={(profile: GenericProfile) => handleEdit(profile)}
        />
        <div>
          <div style={{ overflowY: "auto", minHeight: "65vh", maxHeight: "65vh" }}>
            <div>
              {messages == null ||
                Object.keys(messages).map((id, index) => <ChatMessage key={index} message={messages[id]} />)}
              <div ref={endMsgRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withChat(Messages_)
