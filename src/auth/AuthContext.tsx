import React, { createContext, ReactNode, useEffect, useState } from "react"
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth"
import { auth } from "../firebase-config"
import { toast } from "react-toastify"

export interface AuthContextProps {
  currentUser: User | undefined | null
  logOut: () => void
  logIn: (email: string, password: string) => void
  logInGoogle: () => void
  signUp: (email: string, password: string, displayName: string) => void
  resetPassword: (email: string) => void
}

const AuthContext = createContext<undefined | AuthContextProps>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined)

  useEffect(() => {
    setCurrentUser(auth.currentUser)
    auth.onAuthStateChanged(setCurrentUser)
  }, [])

  function handleGoogleLogIn() {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((registeredUser) => {
        toast.success(`Hallo ${registeredUser.user.displayName}, du hast dich erfolgreich angemeldet.`)
      })
      .catch((err) => {
        console.error(err)
        toast.error("Fehler bei der Authentifizierung mit Google.")
      })
  }

  const handleEmailLogIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((registeredUser) => {
        toast.success(`Hallo ${registeredUser.user.displayName}, du hast dich erfolgreich angemeldet.`)
      })
      .catch((err) => {
        console.error(err)
        toast.error("Fehler bei der Authentifizierung. Bitte überprüfe deinen Nutzernamen und Passwort!")
      })
  }

  const handleSignOut = () => {
    signOut(auth)
  }

  const handleCreateUserWithEmail = (email: string, password: string, displayName: string) => {
    createUserWithEmailAndPassword(auth, email, password).then(() => {
      if (auth.currentUser != null) {
        updateProfile(auth.currentUser, { displayName }).then(() => {
          toast.success(`Hallo ${auth.currentUser?.displayName}, du bist nun registriert.`)
        })
      }
    })
  }

  const handlePasswordReset = (email: string) => {
    sendPasswordResetEmail(auth, email)
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
