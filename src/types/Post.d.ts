interface Post {
  id?: string
  author: User
  title: string
  text: string
  type: string
  tags: string[]
  created: number
  eventDate?: number
  eventLocation?: string
  validityStart?: number
  validityEnd?: number
}
