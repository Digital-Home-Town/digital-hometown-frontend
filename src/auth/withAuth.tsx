import React from "react"

import useAuthContext, { AuthContextI } from "./AuthContext"

function withAuth<Props>(Component: React.ComponentType<Props & AuthContextI>) {
  return function WithAuth(props: Props) {
    const authContext = useAuthContext()
    return <Component {...props} {...authContext} />
  }
}

export default withAuth
