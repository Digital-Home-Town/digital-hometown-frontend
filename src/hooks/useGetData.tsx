import { db } from "../firebase-config"
import { get, ref } from "firebase/database"

export async function getMessages(roomId: string) {
  const snapshot = await get(ref(db, `messages/${roomId}/messages`))
  return snapshot.val()
}

export async function getUserData(uid: string) {
  const snapshot = await get(ref(db, `users/${uid}`))
  return snapshot.val()
}

// export function useGetUserData(uid: string) {
//   const [user, setUser] = useState<UserI | undefined>(undefined)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<Error | undefined>(undefined)
//
//   useEffect(() => {
//     async function _getUser() {
//       try {
//         const data = await getUserData(uid)
//         setUser(data)
//         setLoading(false)
//       } catch (error) {
//         setError(error as Error)
//         setLoading(false)
//       }
//     }
//     _getUser().then()
//   }, [uid])
//
//   return [user, loading, error]
// }
