import React, { createContext, ReactNode, useEffect, useState } from "react"
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import { auth } from "../firebase-config"
import { toast } from "react-toastify"
import profileService from "src/services/ProfileService"
import ReactPlaceholder from "react-placeholder"
import AuthLoader from "./AuthLoader"

export interface AuthContextI {
  currentUser: ProfileI | undefined | null
  logOut: () => void
  logIn: (email: string, password: string) => void
  signUp: (email: string, password: string, displayName: string) => void
  resetPassword: (email: string) => void
}

const AuthContext = createContext<undefined | AuthContextI>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<ProfileI | null | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setCurrentUser(null)
    auth.onAuthStateChanged((user) => {
      setLoading(false)
      setCurrentUser(null)
      if (user != null) {
        setCurrentUser({
          uid: auth.currentUser?.uid || "",
          email: auth.currentUser?.email || undefined,
          displayName: auth.currentUser?.displayName || undefined,
        })
        profileService
          .getProfile(user.uid)
          .then((profile) => {
            if (profile == null) {
              // can be removed when all users have a profile in the firestore
              profileService.addProfile(user.uid, {
                uid: user.uid,
                email: user.email as string,
                displayName: user.displayName as string,
                photoURL: user.photoURL as string,
              })
            } else {
              setCurrentUser(profile)
            }
          })
          .catch((err) => {
            toast.error(`Fehler beim Laden deines Profils. ${err.message}`)
          })
      }
    })
  }, [])

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

  const handleSignUp = (email: string, password: string, displayName: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const currentUser = response.user
        if (currentUser != null) {
          const id = currentUser.uid
          profileService
            .updateProfile(id, {
              uid: id,
              age: 99,
              email: currentUser.email || "",
              displayName: displayName || "",
              photoURL: currentUser.photoURL || "",
            })
            .then(() => {
              toast.success(`Hallo ${displayName}, du bist nun registriert.`)
            })
            .catch(() => {
              toast.error("Fehler beim Speichern des Profils.")
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
    <ReactPlaceholder ready={!loading} customPlaceholder={<AuthLoader />}>
      <AuthContext.Provider
        value={{
          currentUser: currentUser,
          logOut: handleSignOut,
          logIn: handleEmailLogIn,
          signUp: handleSignUp,
          resetPassword: handlePasswordReset,
        }}
      >
        {children}
      </AuthContext.Provider>
    </ReactPlaceholder>
  )
}

export default function useAuthContext() {
  const context = React.useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuthContext should be used within an AuthProvider.")
  }

  return context
}
