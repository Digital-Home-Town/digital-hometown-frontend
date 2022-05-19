import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import React from "react"
import { AuthContextProps } from "src/auth/AuthContext"
import profileService from "src/services/ProfileService"

import withAuth from "../auth/withAuth"
import Input from "./input/Input"

function AccountPage({ currentUser }: AuthContextProps) {
  const [profile, setProfile] = React.useState<null | Profile>(null)
  const [exists, setExists] = React.useState<null | Boolean>(null)

  React.useEffect(() => {
    const getProfile = async () => {
      const profileData = await profileService.getProfile(currentUser?.uid || "")
      if (profileData) {
        setProfile(profileData)
      }
    }
    if (!profile) getProfile()
  })

  React.useEffect(() => {
    const getExists = async () => {
      const exists = await profileService.existsProfile(currentUser?.uid || "")
      if (exists) {
        setExists(exists)
      }
    }
    if (!exists) getExists()
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const fullName = (data.get("fullName") as string) || ""
    const email = (data.get("email") as string) || ""
    const age = +(data.get("age") as string) || 0
    if (fullName.length > 0 && email.length > 0 && age && currentUser) {
      const profile: Profile = {
        id: currentUser?.uid,
        name: fullName,
        email: email,
        age: age,
      }
      profileService.updateProfile(currentUser?.uid, profile)
    }
  }

  return currentUser && exists && profile ? (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Input name="fullName" placeholder="Voller Name" initialValue={profile?.name || ""} />
      <Input name="email" placeholder="Email" initialValue={profile?.email || ""} />
      <Input name="age" placeholder="Alter" initialValue={profile?.age ? `${profile?.age}` : ""} />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Speichern
      </Button>
    </Box>
  ) : (
    <div>Du hast keinen Zugriff auf diese Seite</div>
  )
}

export default withAuth(AccountPage)
