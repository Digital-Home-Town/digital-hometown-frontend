import React from "react"
import useAuthContext, { AuthContextProps } from "./AuthContext"

function withAuth<Props>(Component: React.ComponentType<Props & AuthContextProps>) {
  return function WithAuth(props: Props) {
    const { loggedInUser, setLoggedInUser, setLoggedOut } = useAuthContext()
    return (
      <Component {...props} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} setLoggedOut={setLoggedOut} />
    )
  }
}

export default withAuth
