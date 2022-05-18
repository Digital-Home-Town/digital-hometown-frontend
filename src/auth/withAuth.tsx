import React from "react"
import useAuthContext, { AuthContextProps } from "./AuthContext"

function withAuth<Props>(Component: React.ComponentType<Props & AuthContextProps>) {
  return function WithAuth(props: Props) {
    const authContext = useAuthContext()

    return <Component {...props} {...authContext} />
  }
}

export default withAuth
