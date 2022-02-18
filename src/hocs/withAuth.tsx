import React from "react"
import useAuthContext, { AuthContextProps } from "../contexts/AuthContext"

function withAuth<Props>(Component: React.ComponentType<Props & AuthContextProps>) {
  return function WithAuth(props: Props) {
    const { loggedInUser, setLoggedInUser } = useAuthContext()
    return <Component {...props} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
  }
}

export default withAuth
