interface Post {
  id?: string
  author: User
  title: string
  text: string
  type: string
  tags: string[]
  created?: number | firebase.firestore.Timestamp | firebase.firestore.FieldValue
  eventDate?: number | firebase.firestore.Timestamp | firebase.firestore.FieldValue
  eventLocation?: string
  validityStart?: number | firebase.firestore.Timestamp | firebase.firestore.FieldValue
  validityEnd?: number | firebase.firestore.Timestamp | firebase.firestore.FieldValue
}
