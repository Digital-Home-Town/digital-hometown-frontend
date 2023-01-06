import { Card, CardContent, CardHeader, Chip, Stack } from "@mui/material"
import * as React from "react"
import { useNavigate } from "react-router"

interface UserProperties {
  user: GenericProfile
}

function User({ user }: UserProperties) {
  const navigate = useNavigate()
  //const [color, setColor] = React.useState("background.default")
  const [cursor, setCursor] = React.useState("auto")
  const [borderColor, setBorderColor] = React.useState("transparent")

  return (
    <Card
      onMouseOver={() => {
        //setColor("lightgrey")
        setCursor("pointer")
        setBorderColor("primary")
      }}
      onMouseLeave={() => {
        //setColor("background.default")
        setCursor("auto")
        setBorderColor("transparent")
      }}
      onClick={() => navigate(`/profile/${user.id}`)}
      sx={{ border: 1, borderColor: borderColor, /*bgcolor: color,*/ cursor: cursor }}
    >
      <CardHeader
        title={
          user?.displayName
          // <span>
          //   <Link component="button" color="inherit" onClick={() => navigate(`/profile/${user.id}`)}>
          //     {}
          //   </Link>
          // </span>
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
