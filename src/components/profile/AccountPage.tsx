import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import React from "react"
import { AuthContextProps } from "src/auth/AuthContext"

import withAuth from "../../auth/withAuth"

function AccountPage({ currentUser, updateName }: AuthContextProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const fullName = (data.get("fullName") as string) || ""
    if (fullName.length > 0) {
      updateName(fullName)
    }
  }

  return currentUser ? (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField required fullWidth id="fullName" label="Voller Name" name="fullName" autoFocus />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Speichern
      </Button>
    </Box>
  ) : (
    <div>Not authenticated</div>
  )
}

export default withAuth(AccountPage)
