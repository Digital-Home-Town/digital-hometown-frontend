interface Post {
  id?: string
  author: User
  title: string
  text: string
  type: string
  tags: string[]
  created?: number | firebase.firestore.Timestamp | firebase.firestore.FieldValue
}
