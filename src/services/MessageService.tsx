import { realtimeDB } from "../firebase-config"
import { get, ref } from "firebase/database"

class MessageService {
  async getMessages(roomId: string) {
    const snapshot = await get(ref(realtimeDB, `messages/${roomId}/messages`))
    return snapshot.val()
  }
}

const messageService = new MessageService()
export default messageService
