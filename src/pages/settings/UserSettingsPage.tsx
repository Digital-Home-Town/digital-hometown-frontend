import { Stack, Typography } from "@mui/material"

import withAuth from "src/auth/withAuth"
import { AuthContextI } from "src/auth/AuthContext"

function UserSettingsPage({ currentUser, setCurrentUser }: AuthContextI) {
  return (
    <>
      {currentUser ? (
        <Stack spacing={0.5}>
          <Typography variant="h6" gutterBottom>
            Account-Einstellungen
          </Typography>
          <div>Name</div>
          <div>Email</div>
          <div>Geburtstag</div>
          <div>PLZ</div>

          <div>Account löschen</div>
        </Stack>
      ) : (
        <div>Du hast keinen Zugriff auf diese Seite</div>
      )}
    </>
  )
}

export default withAuth(UserSettingsPage)
