interface Post {
  author: User
  title: string
  text: string
  type: string
  tags: string[]
  created?: number | firebase.firestore.Timestamp | firebase.firestore.FieldValue
}
