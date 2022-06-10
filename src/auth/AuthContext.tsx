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
import ReactPlaceholder from "react-placeholder"
import { toast } from "react-toastify"
import clubService from "src/services/ClubService"
import profileService from "src/services/ProfileService"

import { auth } from "../firebase-config"
import Loader from "./Loader"

export interface AuthContextI {
  currentUser: ProfileI | undefined | null
  logOut: () => void
  logIn: (email: string, password: string) => void
  signUpWithEmail: (email: string, password: string, displayName: string, isOrg: boolean) => void
  signUpOAuth: (providerName: "google" | "facebook", isOrg: boolean) => void
  resetPassword: (email: string) => void
}

export interface AuthProps {
  isOrg: boolean
}

const AuthContext = createContext<undefined | AuthContextI>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<ProfileI | null | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user != null) {
        setCurrentUser({
          id: auth.currentUser?.uid || "",
          isOrg: false,
          email: auth.currentUser?.email || undefined,
          displayName: auth.currentUser?.displayName || undefined,
        })
        profileService
          .get(user.uid)
          .then((profile) => {
            if (!profile) {
              clubService
                .get(user.uid)
                .then((profile) => {
                  setCurrentUser(profile)
                  setLoading(false)
                })
                .catch((err) => {
                  toast.error(`Fehler beim Laden deines Profils. ${err.message}`)
                  setLoading(false)
                })
            } else {
              setCurrentUser(profile)
              setLoading(false)
            }
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

  const handleSignUpEmail = (email: string, password: string, displayName: string, isOrg: boolean) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        const user = response.user
        if (user != null) {
          toast.success(`Hallo ${displayName}, du bist nun registriert.`)
          const id = user.uid
          const isClub = await clubService.exists(id)
          const isProfile = await profileService.exists(id)

          let service
          const profile: GenericProfile = {
            id,
            isOrg: false,
            email: user.email || "",
            displayName: user.displayName || "",
            photoURL: user.photoURL || "",
          }

          if (isProfile) {
            profile.isOrg = false
            service = profileService
          } else if (isClub) {
            profile.isOrg = true
            service = clubService
          } else {
            profile.isOrg = isOrg
            service = isOrg ? clubService : profileService
          }
          service
            .update(id, {
              id,
              isOrg,
              email: user.email || "",
              displayName: displayName || "",
              photoURL: user.photoURL || "",
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

  function handleOAuthSignIn(providerName: "google" | "facebook", isOrg: boolean) {
    let provider
    if (providerName === "google") {
      provider = new GoogleAuthProvider()
    } else if (providerName === "facebook") {
      provider = new FacebookAuthProvider()
    } else {
      throw new Error("Unbekannter Auth Provider")
    }

    signInWithPopup(auth, provider)
      .then(async (response) => {
        const user = response.user
        toast.success(`Hallo ${user.displayName}, du hast dich erfolgreich angemeldet.`)
        const id = user.uid
        const isClub = await clubService.exists(id)
        const isProfile = await profileService.exists(id)

        let service
        const profile: GenericProfile = {
          id,
          isOrg: false,
          email: user.email || "",
          displayName: user.displayName || "",
          photoURL: user.photoURL || "",
        }

        if (isProfile) {
          profile.isOrg = false
          service = profileService
        } else if (isClub) {
          profile.isOrg = true
          service = clubService
        } else {
          profile.isOrg = isOrg
          service = isOrg ? clubService : profileService
        }

        service.update(id, profile).catch((e) => {
          toast.error(`Fehler beim Speichern des Profils bei der Anmeldung mit ${providerName}.`)
          throw e
        })
        setCurrentUser(profile)
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
