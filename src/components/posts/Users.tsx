import { Stack } from "@mui/material"
import * as React from "react"

import User from "./User"

interface UserProperties {
  users: GenericProfile[]
  notFoundText: string
}

function Users(props: UserProperties) {
  return (
    <Stack spacing={2}>
      {props.users.length ? (
        props.users.map((user, index) => <User user={user} key={index}></User>)
      ) : (
        <p>{props.notFoundText}</p>
      )}
    </Stack>
  )
}

Users.defaultProps = {
  notFoundText: "Leider keine Benutzer gefunden.",
}

export default Users
