import React, { useCallback, useEffect, useRef } from "react"
import ChatMessage from "./ChatMessage"
import { ChatContextI, withChat } from "./ChatContext"

function Messages_({ loading, currentRoomId, messages, rooms, currentRoomName }: ChatContextI) {
  const endMsgRef = useRef<HTMLDivElement | null>(null)

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
        <h1>{currentRoomName}</h1>
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
