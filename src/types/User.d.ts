interface User extends GenericProfile {
  dateOfBirth?: number
  age?: number
  clubs?: Club[]
  clubRequests?: Club[]
  friends?: Club[]
  photoURL?: string
  interests?: Interest[]
}
