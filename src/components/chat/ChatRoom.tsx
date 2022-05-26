import React, { useEffect, useRef } from "react"
import { List } from "@mui/material"
import ChatMessage from "./ChatMessage"
import SendMessage from "./SendMessage"
import { ChatContextI, withChat } from "./ChatContext"

function ChatRoom_({ currentRoomId, messages, rooms, currentRoomName }: ChatContextI) {
  const endMsgRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (endMsgRef.current != null) {
      // const scroll = chatContainerRef.current.scrollHeight - chatContainerRef.current.clientHeight
      endMsgRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    // chatContainerRef?.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return currentRoomId == null || rooms == null ? (
    <></>
  ) : (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "stretch" }}>
      <div style={{ flexGrow: 2 }}>
        <h1>{currentRoomName}</h1>
        <div>
          <div style={{ overflowY: "auto", verticalAlign: "end", minHeight: "60vh", maxHeight: "60vh" }}>
            {Object.keys(messages).map((id) => (
              <ChatMessage key={id} message={messages[id]} />
            ))}
            <div ref={endMsgRef} />
          </div>
          <div style={{ flexGrow: 6 }}>
            <SendMessage />
          </div>
        </div>
      </div>
    </div>
  )
}

export default withChat(ChatRoom_)
