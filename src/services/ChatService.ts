import { child, get, push, ref, remove, set } from "firebase/database"

import { realtimeDB } from "../firebase-config"

class ChatService {
  async sendMessage(roomId: string, text: string, currentUser: GenericProfile) {
    try {
      const sendAt = Date.now()
      await set(ref(realtimeDB, `rooms/${roomId}/lastMessageSendAt`), sendAt)
      const resp = await push(ref(realtimeDB, `messages/${roomId}/messages`), {
        text: text,
        sendAt: sendAt,
        sendBy: currentUser.id,
      })
      console.log("added message", resp.key)
    } catch (error) {
      throw error
    }
  }

  async createRoom(currentUser: GenericProfile, name: string) {
    try {
      const resp = await push(ref(realtimeDB, `rooms`), {
        name: name,
        members: { [currentUser.id]: { role: "admin" } },
        group: true,
      })
      return resp.key
    } catch (error) {
      throw error
    }
  }

  async getRooms() {
    try {
      const snapshot = await get(child(ref(realtimeDB), "rooms"))
      const rooms = await snapshot.val()
      return rooms
    } catch (error) {
      throw error
    }
  }

  async checkIfChatExists(currentUser: GenericProfile, chatPartner: GenericProfile) {
    const rooms = await this.getRooms()
    const keys = Object.keys(rooms).filter((key: string) => {
      if (rooms[key].members == null) return false
      return (
        !rooms[key].group && rooms[key].members[chatPartner.id] != null && rooms[key].members[currentUser.id] != null
      )
    })
    console.log("checkIfChatExists", keys.length > 0, keys)
    return { chatExists: keys.length > 0, key: keys[0] || null }
  }

  async createChat(currentUser: GenericProfile, chatPartner: GenericProfile) {
    try {
      const { chatExists, key } = await this.checkIfChatExists(currentUser, chatPartner)
      console.log("chatExists", chatExists)
      if (chatExists) {
        return key
      }

      const resp = await push(ref(realtimeDB, `rooms`), {
        name: null,
        group: false,
        members: { [currentUser.id]: { role: "admin" }, [chatPartner.id]: { role: "admin" } },
      })
      return resp.key
    } catch (error) {
      throw error
    }
  }

  async deleteRoom(roomId: string | undefined | null) {
    if (roomId) {
      await remove(ref(realtimeDB, `rooms/${roomId}`))
    }
  }

  async renameRoom(roomId: string, name: string) {
    await set(ref(realtimeDB, `rooms/${roomId}/name`), name)
  }

  async addMember(roomId: string, userId: string, role: string = "admin") {
    await set(ref(realtimeDB, `rooms/${roomId}/members/${userId}`), { role: "admin" })
  }

  async removeMember(roomId: string, userId: string) {
    await remove(ref(realtimeDB, `rooms/${roomId}/members/${userId}`))
  }
}

export default new ChatService()
