import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import parse from "date-fns/parse"
import React from "react"
import { toast } from "react-toastify"
import { AuthContextI } from "src/auth/AuthContext"
import userService from "src/services/UserService"

import withAuth from "../../auth/withAuth"
import DatePicker from "../../components/general/input/DatePicker"
import Input from "../../components/general/input/Input"

function UserSettingsPage({ currentUser, setCurrentUser }: AuthContextI) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const fullName = (data.get("fullName") as string) || ""
    const email = (data.get("email") as string) || ""
    const dateOfBirth = parse(data.get("dateOfBirth") as string, "dd.MM.yyyy", new Date()).getTime()
    if (fullName.length > 0 && email.length > 0 && dateOfBirth && currentUser) {
      const profile: User = {
        ...currentUser,
        displayName: fullName,
        email: email,
        dateOfBirth: dateOfBirth,
      }
      userService
        .update(currentUser.id, profile)
        .then(() => {
          setCurrentUser(profile)
          toast.success("Dein Profil wurde aktualisiert.")
        })
        .catch((e) => {
          toast.error("Dein Profil konnte nicht aktualisiert werden.")
          throw e
        })
    }
  }

  return currentUser ? (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Input name="fullName" placeholder="Voller Name" initialValue={currentUser?.displayName || ""} />
      <Input name="email" placeholder="Email" initialValue={currentUser?.email || ""} />
      <DatePicker
        name="dateOfBirth"
        placeholder="Geburtstag"
        initialValue={currentUser?.dateOfBirth ? new Date(currentUser.dateOfBirth) : undefined}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Speichern
      </Button>
    </Box>
  ) : (
    <div>Du hast keinen Zugriff auf diese Seite</div>
  )
}

export default withAuth(UserSettingsPage)
