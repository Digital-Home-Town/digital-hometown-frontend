import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import React from "react"
import { toast } from "react-toastify"
import { AuthContextI } from "src/auth/AuthContext"
import withAuth from "src/auth/withAuth"
import Input from "src/components/general/input/Input"
import clubService from "src/services/ClubService"

function ClubSettingsPage({ currentUser }: AuthContextI) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const fullName = (data.get("fullName") as string) || ""
    const email = (data.get("email") as string) || ""
    if (fullName.length > 0 && email.length > 0 && currentUser) {
      const club: ClubI = {
        id: currentUser.id,
        isOrg: true,
        displayName: fullName,
        email: email,
      }
      clubService.update(currentUser.id, club).catch((e) => {
        toast.error("Dein Profil konnte nicht aktualisiert werden.")
        throw e
      })
      toast.success("Dein Profil wurde aktualisiert.")
    }
  }

  return currentUser ? (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Input name="fullName" placeholder="Voller Name" initialValue={currentUser?.displayName || ""} />
      <Input name="email" placeholder="Email" initialValue={currentUser?.email || ""} />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Speichern
      </Button>
    </Box>
  ) : (
    <div>Du hast keinen Zugriff auf diese Seite</div>
  )
}

export default withAuth(ClubSettingsPage)
