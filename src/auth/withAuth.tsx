import React from "react"

import useAuthContext, { AuthContextI } from "./AuthContext"

function withAuth<Props>(Component: React.ComponentType<Props & AuthContextI>) {
  return function WithAuth(props: Props) {
    const authContext = useAuthContext()
    console.log("user in auth context", authContext.currentUser)
    return <Component {...props} {...authContext} />
  }
}

export default withAuth
