import userService from "src/services/UserService"

export function updateProfileAttribute(profile: any, attr: string, value: any, setValue: (param: any) => void) {
  // Update
  if (profile) {
    var list = { [attr]: value }
    const updatedUser: User = { ...profile, ...list }
    userService.update(updatedUser.id, updatedUser)
  }
  // Change State
  setValue(value)
}
