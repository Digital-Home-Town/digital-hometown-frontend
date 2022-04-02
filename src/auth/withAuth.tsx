import React from "react"
import { User } from "firebase/auth"
import useAuthContext, { AuthContextProps } from "./AuthContext"

export type UserType = User

function withAuth<Props>(Component: React.ComponentType<Props & AuthContextProps>) {
  return function WithAuth(props: Props) {
    const authContext = useAuthContext()

    return <Component {...props} {...authContext} />
  }
}

export default withAuth
