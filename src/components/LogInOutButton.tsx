import { AuthContextProps } from "../contexts/AuthContext"
import withAuth from "../hocs/withAuth"
import { INITIAL_LOGGED_IN_USER } from "../types/User"

function LogInOut({ loggedInUser, setLoggedInUser }: AuthContextProps) {
  return (
    <>
      {loggedInUser === undefined ? (
        <button
          onClick={() => {
            setLoggedInUser(INITIAL_LOGGED_IN_USER)
          }}
        >
          Login
        </button>
      ) : (
        <button
          onClick={() => {
            setLoggedInUser(undefined)
          }}
        >
          Logout
        </button>
      )}
    </>
  )
}

export default withAuth(LogInOut)
