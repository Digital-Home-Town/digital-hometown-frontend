interface GenericProfile {
  id: string
  isOrg: boolean
  displayName?: string
  email?: string
  photoURL?: string
  postCode?: number
  dateOfBirth?: number
  age?: number
  interests?: string[]
  desc?: string
  favoritePosts?: string[]
}
