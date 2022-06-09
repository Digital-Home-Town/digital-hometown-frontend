import React, { useEffect, useRef, useState } from "react"
import ChatMessage from "./ChatMessage"
import { ChatContextI, withChat } from "./ChatContext"
import { IconButton } from "@mui/material"
import { Add } from "@mui/icons-material"
import { AddMemberDialog } from "./AddMembers"
import chatService from "../../services/ChatService"
import { toast } from "react-toastify"

function Messages_({ loading, currentRoomId, messages, rooms, currentRoomName }: ChatContextI) {
  const endMsgRef = useRef<HTMLDivElement | null>(null)
  const [showAddMember, setShowAddMember] = useState<boolean>(false)

  const handleAddMember = (profile: ProfileI) => {
    if (currentRoomId == null) {
      return
    }
    chatService.addMember(currentRoomId, profile.id, "admin").catch(() => {
      toast.error("Benutzer konnte nicht hinzugefügt werden.")
    })
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
        <h1>
          {currentRoomName}
          <IconButton onClick={() => setShowAddMember(true)}>
            <Add />
          </IconButton>
        </h1>
        <AddMemberDialog
          onClose={() => setShowAddMember(false)}
          open={showAddMember}
          onRowClick={(profile) => handleAddMember(profile)}
        />
        <div>
          <div style={{ overflowY: "auto", minHeight: "65vh", maxHeight: "65vh" }}>
            <div>
              {Object.keys(messages).map((id) => (
                <ChatMessage key={id} message={messages[id]} />
              ))}
              <div ref={endMsgRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withChat(Messages_)
