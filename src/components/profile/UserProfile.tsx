import { Edit } from "@mui/icons-material"
import { Card, CardContent, Chip, Grid, IconButton, Typography } from "@mui/material"
import Box from "@mui/material/Box"
import { useEffect, useState } from "react"
import { AuthContextI } from "src/auth/AuthContext"
import withAuth from "src/auth/withAuth"
import ProfilePicture from "./ProfilePicture"

function UserProfile({ profile, currentUser }: ProfileProps<User> & AuthContextI) {
  const [editable, setEditable] = useState<boolean>(false)
  const [mouseOverAvatar, setMouseOverAvatar] = useState<boolean>(false)

  useEffect(() => {
    if (currentUser && profile && currentUser.id === profile?.id) {
      setEditable(true)
    }
  }, [currentUser, profile])

  return (
    <Box sx={{ mt: 1 }}>
      <Card>
        <CardContent>
          <Grid container>
            <Grid textAlign="center">
              <IconButton
                onMouseOver={() => {
                  setMouseOverAvatar(true)
                  setTimeout(() => {
                    setMouseOverAvatar(false)
                  }, 1000)
                }}
              >
                {mouseOverAvatar && editable ? (
                  <Edit sx={{ height: "128px", width: "128px" }} />
                ) : (
                  <ProfilePicture profile={profile || undefined} size={128} />
                )}
              </IconButton>
              <Typography variant="h6" gutterBottom>
                {profile?.displayName || "Kein Name"}
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="body1" gutterBottom>
                Email: {profile?.email || "Keine Email"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Alter: {profile?.age || "Kein Alter angegeben"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Intessen:{" "}
                {(profile?.interests || []).map((interest, i) => (
                  <Chip key={i} label={interest.name} />
                ))}
              </Typography>
            </Grid>
          </Grid>

          {/* {editable && <EditButton small={true} onClick={() => {}} />} */}
        </CardContent>
      </Card>
    </Box>
  )
}

export default withAuth(UserProfile)
