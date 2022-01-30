export type UserType = {
  name: {
    first: string
    last: string
  }
  role: "user" | "admin"
}

export const INITIAL_LOGGED_IN_USER = { name: { first: "Max", last: "Mustermann" }, role: "admin" as const }
