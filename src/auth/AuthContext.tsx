import React, { createContext, ReactNode, useState } from "react"
import { UserType } from "./Auth"

export interface AuthContextProps {
  loggedInUser: UserType | undefined
  userLoggedIn: boolean
  setLoggedInUser: (user: UserType | undefined) => void
  setLoggedOut: () => void
}

const AuthContext = createContext<undefined | AuthContextProps>(undefined)

export function AuthProvider({
  children,
  initialLoggedInUser,
}: {
  children: ReactNode
  initialLoggedInUser?: UserType
}) {
  const [loggedInUser, setLoggedInUser] = useState<UserType | undefined>(initialLoggedInUser)
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(initialLoggedInUser !== undefined)

  function handleLoggedInUser(user: UserType | undefined) {
    setLoggedInUser(user)
    setUserLoggedIn(true)
  }

  function handleLogOut() {
    setLoggedInUser(undefined)
    setUserLoggedIn(false)
  }

  return (
    <AuthContext.Provider
      value={{ loggedInUser, userLoggedIn, setLoggedInUser: handleLoggedInUser, setLoggedOut: handleLogOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuthContext() {
  const context = React.useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuthContext should be used within an AuthProvider.")
  }

  return context
}
