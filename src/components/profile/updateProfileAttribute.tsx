import { toast } from "react-toastify"

import userService from "src/services/UserService"

export function updateProfileAttribute(profile: any, attr: string, value: any, setValue: (param: any) => void) {
  // Update
  if (profile) {
    var list = { [attr]: value }
    const updatedUser: User = { ...profile, ...list }
    userService
      .update(updatedUser.id, updatedUser)
      .then(() => {
        toast.success("Dein Profil wurde aktualisiert.")
      })
      .catch((e) => {
        toast.error("Dein Profil konnte nicht aktualisiert werden.")
        throw e
      })
  }
  // Change State
  setValue(value)
}
