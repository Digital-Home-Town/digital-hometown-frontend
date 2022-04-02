import React, { createContext, ReactNode, useEffect, useState } from "react"
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth"
import { app } from "../firebase-config"

export interface AuthContextProps {
  currentUser: User | undefined | null
  logOut: () => void
  logIn: (email: string, password: string) => void
  logInGoogle: () => void
  signUp: (email: string, password: string) => void
}

const AuthContext = createContext<undefined | AuthContextProps>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined)

  useEffect(() => {
    setCurrentUser(getAuth(app).currentUser)
    getAuth(app).onAuthStateChanged(setCurrentUser)
  }, [])

  function handleGoogleLogIn() {
    const provider = new GoogleAuthProvider()
    signInWithPopup(getAuth(app), provider)
  }

  const handleEmailLogIn = (email: string, password: string) => {
    signInWithEmailAndPassword(getAuth(app), email, password)
  }

  const handleSignOut = () => {
    signOut(getAuth(app))
  }

  const handleCreateUserWithEmail = (email: string, password: string) => {
    createUserWithEmailAndPassword(getAuth(app), email, password)
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser,
        logOut: handleSignOut,
        logIn: handleEmailLogIn,
        logInGoogle: handleGoogleLogIn,
        signUp: handleCreateUserWithEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuthContext() {
  const context = React.useContext(AuthContext)

  console.log("Current user", context?.currentUser)

  if (context === undefined) {
    throw new Error("useAuthContext should be used within an AuthProvider.")
  }

  return context
}
