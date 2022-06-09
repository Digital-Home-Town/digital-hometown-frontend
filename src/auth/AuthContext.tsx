import React, { createContext, ReactNode, useEffect, useState } from "react"
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth"
import { auth } from "../firebase-config"
import { toast } from "react-toastify"
import profileService from "src/services/ProfileService"
import ReactPlaceholder from "react-placeholder"
import Loader from "./Loader"

export interface AuthContextI {
  currentUser: ProfileI | undefined | null
  logOut: () => void
  logIn: (email: string, password: string) => void
  signUpWithEmail: (email: string, password: string, displayName: string) => void
  signUpOAuth: (providerName: "google" | "facebook") => void
  resetPassword: (email: string) => void
}

const AuthContext = createContext<undefined | AuthContextI>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<ProfileI | null | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user != null) {
        setCurrentUser({
          uid: auth.currentUser?.uid || "",
          email: auth.currentUser?.email || undefined,
          displayName: auth.currentUser?.displayName || undefined,
        })
        profileService
          .getProfile(user.uid)
          .then((profile) => {
            setCurrentUser(profile)
            setLoading(false)
          })
          .catch((err) => {
            toast.error(`Fehler beim Laden deines Profils. ${err.message}`)
            setLoading(false)
          })
      } else {
        setLoading(false)
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
    setCurrentUser(undefined)
    signOut(auth)
      .then(() => {
        toast.info("Erfolgreich abgemeldet.")
      })
      .catch((error) => {
        toast.error("Abmeldung konnte nicht durchgeführt werden.")
        throw error
      })
  }

  const handleSignUpEmail = (email: string, password: string, displayName: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const currentUser = response.user
        if (currentUser != null) {
          const id = currentUser.uid
          toast.success(`Hallo ${displayName}, du bist nun registriert.`)
          profileService
            .updateProfile(id, {
              uid: id,
              email: currentUser.email || "",
              displayName: displayName || "",
              photoURL: currentUser.photoURL || "",
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

  function handleOAuthSignIn(providerName: "google" | "facebook") {
    let provider
    if (providerName === "google") {
      provider = new GoogleAuthProvider()
    } else if (providerName === "facebook") {
      provider = new FacebookAuthProvider()
    } else {
      throw new Error("Unbekannter Auth Provider")
    }

    signInWithPopup(auth, provider)
      .then(async (registeredUser) => {
        toast.success(`Hallo ${registeredUser.user.displayName}, du hast dich erfolgreich angemeldet.`)
        const id = registeredUser.user.uid
        profileService
          .updateProfile(id, {
            uid: id,
            email: registeredUser.user.email || "",
            displayName: registeredUser.user.displayName || "",
            photoURL: registeredUser.user.photoURL || "",
          })
          .catch((e) => {
            toast.error(`Fehler beim Speichern des Profils bei der Anmeldung mit ${providerName}.`)
            throw e
          })
      })
      .catch((err) => {
        toast.error(`Fehler bei der Authentifizierung mit ${providerName}.`)
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
    <ReactPlaceholder ready={!loading} customPlaceholder={<Loader />}>
      <AuthContext.Provider
        value={{
          currentUser: currentUser,
          logOut: handleSignOut,
          logIn: handleEmailLogIn,
          signUpWithEmail: handleSignUpEmail,
          signUpOAuth: handleOAuthSignIn,
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
