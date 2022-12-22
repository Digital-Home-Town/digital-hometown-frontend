import { Card, CardContent, CardHeader, Chip, Link, Stack } from "@mui/material"
import * as React from "react"
import { useNavigate } from "react-router"

interface UserProperties {
  user: GenericProfile
}

function User({ user }: UserProperties) {
  const navigate = useNavigate()
  return (
    <Card>
      <CardHeader
        title={
          <span>
            <Link component="button" color="inherit" onClick={() => navigate(`/profile/${user.id}`)}>
              <h2>{user?.displayName}</h2>
            </Link>
          </span>
        }
      />
      <CardContent style={{ paddingTop: 0 }}>
        <Stack direction="column" spacing={1}>
          <div style={{ whiteSpace: "pre-line" }}>{user.desc}</div>
        </Stack>

        <Stack direction="row" justifyContent="flex-start" gap={1} marginTop={2}>
          {user.interests?.map((category, val) => (
            <Chip key={val} label={category} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default User
