import React from "react"
import useAuthContext, { AuthContextValues } from "../contexts/AuthContext"

function withAuth<Props>(Component: React.ComponentType<Props & AuthContextValues>) {
  return function WithAuth(props: Props) {
    const { loggedInUser, setLoggedInUser } = useAuthContext()
    return <Component {...props} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
  }
}

export default withAuth
