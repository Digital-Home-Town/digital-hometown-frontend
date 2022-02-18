import React, { createContext, ReactNode, useState } from "react"
import { UserType } from "../types/User"

export interface AuthContextProps {
  loggedInUser: UserType | undefined
  setLoggedInUser: (user: UserType | undefined) => void
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

  function handleLoggedInUser(user: UserType | undefined) {
    setLoggedInUser(user)
  }

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser: handleLoggedInUser }}>
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
