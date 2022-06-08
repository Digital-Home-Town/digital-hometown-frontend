import { realtimeDB } from "../firebase-config"
import { get, push, ref } from "firebase/database"

class ChatService {
  async getMessages(roomId: string) {
    const snapshot = await get(ref(realtimeDB, `messages/${roomId}/messages`))
    return snapshot.val()
  }

  async sendMessage(roomId: string, message: MessageI) {
    try {
      const resp = await push(ref(realtimeDB, `messages/${roomId}/messages`), message)
      console.log("added message", resp.key)
    } catch (error) {
      throw error
    }
  }

  async newRoom(members: { [uid: string]: { role: string } }) {
    try {
      const resp = await push(ref(realtimeDB, `rooms`), { members: members })
      console.log("added new room", resp.key)
      return resp.key
    } catch (error) {
      throw error
    }
  }
}

const chatService = new ChatService()
export default chatService
