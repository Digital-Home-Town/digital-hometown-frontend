import { onValue, orderByChild, query, ref } from "firebase/database"
import React, { createContext, ReactNode, useEffect, useState } from "react"
import ReactPlaceholder from "react-placeholder"

import Loader from "../../auth/Loader"
import { realtimeDB } from "../../firebase-config"
import ChatService from "../../services/ChatService"
import { toast } from "react-toastify"
import UserService from "../../services/UserService"
import clubService from "src/services/ClubService"

export interface ChatContextI {
  rooms: RoomI[]
  currentRoom: RoomI | undefined
  setCurrentRoom: (roomId: string) => void
  createGroup: () => void
  createChat: (chatPartner: GenericProfile) => void
  messages: MessageI[]
  loading: boolean
}

const ChatContext = createContext<undefined | ChatContextI>(undefined)

export function ChatProvider({
  children,
  currentUser,
  defaultChatId,
}: {
  children: ReactNode
  currentUser: GenericProfile
  defaultChatId?: string
}) {
  const [rooms, setRooms] = useState<RoomI[]>([])

  const [currentRoom, setCurrentRoom] = useState<RoomI | undefined>(undefined)
  const [messages, setMessages] = useState<MessageI[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("register get rooms from realtime db")

    onValue(
      query(ref(realtimeDB, `rooms`), orderByChild("lastMessageSendAt")),
      async (snpsht) => {
        const rooms_ = snpsht.val()
        console.log("get rooms from realtime db", rooms_)

        const newRooms = []
        for (const roomId in rooms_) {
          const room = rooms_[roomId]
          let name

          // do not show rooms where current user is not a member
          if (!Object.keys(room.members).includes(currentUser.id)) {
            continue
          }

          for (const userId in room.members) {
            if (userId !== currentUser.id) {
              const user = await UserService.get(userId)
              if (user) {
                room.members[userId].user = user
              } else {
                const club = await clubService.get(userId)
                room.members[userId].user = club
              }
            } else {
              room.members[userId].user = currentUser
            }
          }

          if (!room.group) {
            // personal chats
            try {
              const chatPartnerId = Object.keys(room.members).filter((userId) => userId !== currentUser.id)[0]
              const user = room.members[chatPartnerId].user
              console.log("Chat name", user?.displayName)
              name = user?.displayName || user.email
            } catch (e) {
              toast.error("Die Daten deines Chatpartners konnten nicht geladen werden.")
              throw e
            }
          } else {
            // group chats
            name = room.name
          }
          newRooms.push({ ...room, name: name, id: roomId })
        }
        // newRooms.reverse()
        console.log("new rooms", rooms_, newRooms)
        setRooms(newRooms.sort((a, b) => b.lastMessageSendAt - a.lastMessageSendAt))
      },
      (e) => {
        console.error("Error", e)
      },
    )
  }, [])

  useEffect(() => {
    if (currentRoom == null) {
      if (defaultChatId != null && defaultChatId !== "first") {
        setCurrentRoom(rooms.find((room) => room.id === defaultChatId))
      } else {
        setCurrentRoom(rooms[0])
      }
    } else {
      setCurrentRoom(rooms.find((room) => room.id === currentRoom.id))
    }
    setLoading(false)
  }, [rooms])

  useEffect(() => {
    const func = async () => {
      setMessages([])
      if (currentRoom?.id == null || rooms == null) {
        return
      }

      onValue(
        query(ref(realtimeDB, `messages/${currentRoom.id}/messages`), orderByChild("sendAt")),
        (snpsht) => {
          const msgs = snpsht.val() || {}
          console.log("messages", msgs)
          const newMsgs = []
          for (const msgId of Object.keys(msgs)) {
            const msg = msgs[msgId]
            newMsgs.push({ ...msg, id: msgId })
          }
          setMessages(newMsgs.sort((a, b) => a.sendAt - b.sendAt))
        },
        (e) => {
          console.error("Error", e)
        },
      )
    }

    func().then()
  }, [currentRoom])

  const handleCurrentRoom = (roomId: string) => {
    if (rooms != null) setCurrentRoom(rooms.filter((room) => room.id === roomId)[0])
    console.log("set current room", roomId)
  }

  const createGroup = () => {
    ChatService.createRoom(currentUser, "Neuer Chat von " + currentUser.displayName).catch((error) => {
      toast.error("Es konnte kein neuer Chat-Raum erstellt werden.")
      throw error
    })
  }

  const createChat = (chatPartner: GenericProfile) => {
    ChatService.createChat(currentUser, chatPartner).catch((error) => {
      toast.error("Es konnte kein neuer persönlicher Chat erstellt werden.")
      throw error
    })
  }

  return (
    <ReactPlaceholder ready={!loading} customPlaceholder={<Loader />}>
      <ChatContext.Provider
        value={{
          rooms: rooms,
          currentRoom: currentRoom,
          setCurrentRoom: handleCurrentRoom,
          createGroup: createGroup,
          createChat: createChat,
          messages: messages,
          loading: loading,
        }}
      >
        {children}
      </ChatContext.Provider>
    </ReactPlaceholder>
  )
}

export function useChatContext() {
  const context = React.useContext(ChatContext)

  if (context === undefined) {
    throw new Error("useAuthContext should be used within an AuthProvider.")
  }

  return context
}

export function withChat<Props>(Component: React.ComponentType<Props & ChatContextI>) {
  return function WithChat(props: Props) {
    const chatContext = useChatContext()

    return <Component {...props} {...chatContext} />
  }
}
