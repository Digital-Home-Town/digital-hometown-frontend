import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react"

import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
} from "firebase/auth"
import { onSnapshot } from "firebase/firestore"
import { isEqual } from "lodash"
import ReactPlaceholder from "react-placeholder"
import { toast } from "react-toastify"
import PostService from "src/services/PostService"

import {
  auth,
  postCollection,
} from "../firebase-config"
import clubService from "../services/ClubService"
import userService from "../services/UserService"
import Loader from "./Loader"

export interface AuthContextI {
  currentUser: User | Club | undefined | null
  setCurrentUser: React.Dispatch<React.SetStateAction<User | Club | undefined | null>>
  logOut: () => void
  logIn: (email: string, password: string) => void
  signUpWithEmail: (email: string, password: string, displayName: string, isOrg: boolean) => Promise<void>
  signUpOAuth: (providerName: "google" | "facebook", isOrg: boolean) => void
  resetPassword: (email: string) => void
  posts: Post[]
  deletePost: (post: Post) => void
  firstLogin: boolean
  setFirstLogin: (firstLogin: boolean) => void
  deleteUser: () => Promise<void>
}

export interface AuthProps {
  isOrg: boolean
}

const AuthContext = createContext<undefined | AuthContextI>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<Post[]>([])
  const [firstLogin, setFirstLogin] = useState(false)

  useEffect(() => {
    onSnapshot(postCollection, (doc) => {
      const updatedPosts = PostService.parsePosts(doc.docs, currentUser)
      if (!isEqual(updatedPosts, posts)) {
        setPosts(updatedPosts)
      }
    })
  }, [currentUser])

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user != null) {
        setCurrentUser({
          id: auth.currentUser?.uid || "",
          isOrg: false,
          email: auth.currentUser?.email || undefined,
          displayName: auth.currentUser?.displayName || undefined,
        })
        userService
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

  const deletePost = async (post: Post) => {
    await PostService.delete(post)
    setPosts(posts.filter((p) => p.id !== post.id))
  }

  const handleEmailLogIn = (email: string, password: string) => {
    console.log("log in with email", email)
    signInWithEmailAndPassword(auth, email, password)
      .then((registeredUser) => {
        toast.success(`Hallo ${registeredUser.user?.displayName}, du hast dich erfolgreich angemeldet.`)
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

  const handleSignUpEmail = async (email: string, password: string, displayName: string, isOrg: boolean) => {
    let response
    try {
      response = await createUserWithEmailAndPassword(auth, email, password)
    } catch (err: any) {
      toast.error("Fehler beim Registrieren. Bitte überprüfe deine Eingaben! " + err.message)
      throw err
    }
    const user = response.user
    if (user == null) {
      toast.error(`Hallo ${displayName} du konntest leider nicht eingeloggt werden`)
    }
    toast.success(`Hallo ${displayName}, du bist nun registriert.`)
    const id = user.uid
    const isClub = await clubService.exists(id)
    const isProfile = await userService.exists(id)
    console.log(user, isClub, isProfile)
    let service
    const profile: GenericProfile = {
      id,
      isOrg: false,
      email: user.email || email,
      displayName: displayName || "",
      photoURL: user.photoURL || "",
    }

    if (isProfile) {
      profile.isOrg = false
      service = userService
    } else if (isClub) {
      profile.isOrg = true
      service = clubService
    } else {
      profile.isOrg = isOrg
      service = isOrg ? clubService : userService
    }
    await service.update(id, profile).catch(() => {
      toast.error("Fehler beim Speichern des Profils.")
    })

    setCurrentUser(profile)
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
        const isProfile = await userService.exists(id)

        let service
        let profile: GenericProfile = {
          id,
          isOrg: false,
          email: user.email || "",
          displayName: user.displayName || "",
          photoURL: user.photoURL || "",
        }

        if (isProfile) {
          service = userService
          profile.isOrg = false
        } else if (isClub) {
          service = clubService

          profile.isOrg = true
        } else {
          profile.isOrg = isOrg
          service = isOrg ? clubService : userService
          service.update(id, profile).catch((e) => {
            toast.error(`Fehler beim Speichern des Profils bei der Anmeldung mit ${providerName}.`)
            throw e
          })
        }
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
  const deleteUser = async () => {
    if (!currentUser?.email || !auth.currentUser) return
    const service = currentUser.isOrg ? clubService : userService
    try {
      /* To check if reauthentication is needed
       * (if it is not needed, user is deleted afterwards)
       * So it does not matter, that the users password is not his email.
       * If reauthentication is needed, users password is not updated, so he can just login.
       */
      await updatePassword(auth.currentUser, currentUser.email)
      const id = currentUser.id
      await PostService.removePostsFromUser(id)

      await service.delete(id)
      await auth.currentUser?.delete()
      setCurrentUser(null)
      toast.info("Dein Profil wurde gelöscht")
    } catch (exception) {
      toast.error("Bitte melde dich erneut an, um dein Konto zu löschen.")
      signOut(auth)
      setCurrentUser(null)
    }
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
          setCurrentUser,
          deletePost,
          deleteUser,
          posts,
          firstLogin,
          setFirstLogin,
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
