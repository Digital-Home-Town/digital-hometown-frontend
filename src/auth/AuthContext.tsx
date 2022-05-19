import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth"
import React, { createContext, ReactNode, useEffect, useState } from "react"
import { toast } from "react-toastify"
import profileService from "src/services/ProfileService"

import { auth } from "../firebase-config"

export interface AuthContextProps {
  currentUser: User | undefined | null
  loading: boolean
  logOut: () => void
  logIn: (email: string, password: string) => void
  logInGoogle: () => void
  signUp: (email: string, password: string, displayName: string) => void
  resetPassword: (email: string) => void
}

const AuthContext = createContext<undefined | AuthContextProps>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setCurrentUser(auth.currentUser)
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })
  }, [])

  function handleGoogleLogIn() {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then(async (registeredUser) => {
        toast.success(`Hallo ${registeredUser.user.displayName}, du hast dich erfolgreich angemeldet.`)
        const id = registeredUser.user.uid
        const exist = await profileService.existsProfile(id)
        if (exist)
          profileService.updateProfile(id, {
            id,
            age: 99,
            email: registeredUser.user.email || "",
            name: registeredUser.user.displayName || "",
            photoUrl: registeredUser.user.photoURL || "",
          })
      })
      .catch((err) => {
        toast.error("Fehler bei der Authentifizierung mit Google.")
        throw err
      })
  }

  const handleEmailLogIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((registeredUser) => {
        toast.success(`Hallo ${registeredUser.user.displayName}, du hast dich erfolgreich angemeldet.`)
      })
      .catch((err) => {
        toast.error("Fehler bei der Authentifizierung. Bitte überprüfe deinen Nutzernamen und Passwort!")
        throw err
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.info("Erfolgreich abgemeldet.")
      })
      .catch((error) => {
        toast.error("Abmeldung konnte nicht durchgeführt werden.")
        throw error
      })
  }

  const handleCreateUserWithEmail = (email: string, password: string, displayName: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        toast.success(`Hallo ${auth.currentUser?.displayName}, du bist nun registriert.`)
        if (auth.currentUser != null) {
          const user = auth.currentUser
          const id = user.uid
          const exist = await profileService.existsProfile(id)
          if (exist)
            profileService.updateProfile(id, {
              id,
              age: 99,
              email: user.email || "",
              name: user.displayName || "",
              photoUrl: user.photoURL || "",
            })
        }
      })
      .catch((err) => {
        toast.error("Registrierung war nicht erfolgreich")
        throw err
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
        loading: loading,
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
