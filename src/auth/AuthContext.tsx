import React, { createContext, ReactNode, useEffect, useState } from "react"
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth"
import { app } from "../firebase-config"
import { toast } from "react-toastify"

export interface AuthContextProps {
  currentUser: User | undefined | null
  logOut: () => void
  logIn: (email: string, password: string) => void
  logInGoogle: () => void
  signUp: (email: string, password: string) => void
  resetPassword: (email: string) => void
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
      .then(() => {
        toast.success("Erfolgreich mit Google eingeloggt.")
      })
      .catch((err) => {
        console.error(err)
        toast.error("Fehler bei der Authentifizierung mit Google.")
      })
  }

  const handleEmailLogIn = (email: string, password: string) => {
    signInWithEmailAndPassword(getAuth(app), email, password)
      .then(() => {
        toast.success("Erfolgreich eingeloggt.")
      })
      .catch((err) => {
        console.error(err)
        toast.error("Fehler bei der Authentifizierung. Bitte überprüfe deinen Nutzernamen und Passwort!")
      })
  }

  const handleSignOut = () => {
    signOut(getAuth(app))
  }

  const handleCreateUserWithEmail = (email: string, password: string) => {
    createUserWithEmailAndPassword(getAuth(app), email, password).then(() => {
      toast.success("Du bist nun registriert.")
    })
  }

  const handlePasswordReset = (email: string) => {
    sendPasswordResetEmail(getAuth(app), email)
      .then(() => {
        toast.success("Passwort zurückgesetzt. Bitte überprüfe deine Mails und folge den Anweisungen in der Mail.")
      })
      .catch(() => {
        toast.error("Fehler beim Passwort zurücksetzen. Ist deine Mail richtig geschrieben?")
      })
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser,
        logOut: handleSignOut,
        logIn: handleEmailLogIn,
        logInGoogle: handleGoogleLogIn,
        signUp: handleCreateUserWithEmail,
        resetPassword: handlePasswordReset,
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
