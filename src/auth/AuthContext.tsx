import React, { createContext, ReactNode, useEffect, useState } from "react"
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth"
import { auth, db } from "../firebase-config"
import { onValue, ref, set } from "firebase/database"
import { toast } from "react-toastify"

export interface UserI extends User {
  address?: string
  //  private: boolean
  //  phoneNumber?: string
  //  interests?: string[]
  //  role?: string
}

export interface AuthContextI {
  currentUser: UserI | undefined | null
  loading: boolean
  logOut: () => void
  logIn: (email: string, password: string) => void
  signUp: (email: string, password: string, displayName: string) => void
  resetPassword: (email: string) => void
  updateUserData: (user: UserI) => void
}

const AuthContext = createContext<undefined | AuthContextI>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setCurrentUser(auth.currentUser)
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
      if (user != null) {
        const userRef = ref(db, `users/${user?.uid}`)
        onValue(
          userRef,
          (snapshot) => {
            const newUser = { ...snapshot.val(), ...user }
            setCurrentUser(newUser)
          },
          (error) => {
            console.error(error)
          },
        )
      }
    })
  }, [])

  /**
   * Update the user data in the database
   * @param user
   */
  function updateUserData(user: UserI) {
    const userRef = ref(db, `users/${user.uid}`)
    set(userRef, { email: user.email, displayName: user.displayName, photoURL: user.photoURL })
      .then(() => {
        console.log("User successfully written!")
      })
      .catch((error) => {
        console.error("Error writing user: ", error)
      })
  }

  const handleEmailLogIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((registeredUser) => {
        toast.success(`Hallo ${registeredUser.user.displayName}, du hast dich erfolgreich angemeldet.`)
        updateUserData({ ...registeredUser.user })
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
      .then(() => {
        if (auth.currentUser != null) {
          const user = { ...auth.currentUser, displayName: displayName, photoURL: "" }
          updateProfile(user, {}).then(() => {
            toast.success(`Hallo ${auth.currentUser?.displayName}, du bist nun registriert.`)
          })
          updateUserData({ ...auth.currentUser, displayName })
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
        signUp: handleSignUp,
        resetPassword: handlePasswordReset,
        updateUserData: updateUserData,
      }}
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
