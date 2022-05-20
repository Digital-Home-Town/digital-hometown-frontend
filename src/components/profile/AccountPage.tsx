import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import React from "react"
import { AuthContextI } from "src/auth/AuthContext"
import profileService from "src/services/ProfileService"

import withAuth from "../../auth/withAuth"
import Input from "../general/input/Input"

function AccountPage({ currentUser }: AuthContextI) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const fullName = (data.get("fullName") as string) || ""
    const email = (data.get("email") as string) || ""
    const age = +(data.get("age") as string) || 0
    if (fullName.length > 0 && email.length > 0 && age && currentUser) {
      const profile: ProfileI = {
        uid: currentUser.uid,
        displayName: fullName,
        email: email,
        age: age,
      }
      profileService.updateProfile(currentUser.uid, profile)
    }
  }

  console.log("currentUser", currentUser)

  return currentUser ? (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Input name="fullName" placeholder="Voller Name" initialValue={currentUser?.displayName || ""} />
      <Input name="email" placeholder="Email" initialValue={currentUser?.email || ""} />
      <Input name="age" placeholder="Alter" initialValue={currentUser?.age} />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Speichern
      </Button>
    </Box>
  ) : (
    <div>Du hast keinen Zugriff auf diese Seite</div>
  )
}

export default withAuth(AccountPage)
