import { Chip, Grid, Stack, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { AuthContextI } from "src/auth/AuthContext"
import withAuth from "src/auth/withAuth"
import clubService from "src/services/ClubService"
import userService from "src/services/UserService"

interface BlockerUsers {
  id: string
  name: string
}
function BlockedPage({ currentUser, setCurrentUser }: AuthContextI) {
  const [blocked, setBlocked] = useState<BlockerUsers[]>([])

  const [profiles, setProfiles] = React.useState<GenericProfile[]>([])

  useEffect(() => {
    const getProfiles = async () => {
      const profilesData = await userService.getAll()
      const clubData = await clubService.getAll()
      if (profilesData && clubData) {
        const datas = [...profilesData, ...clubData]
        const blockedUsers = (currentUser?.blocked || [])
          .map((id) => {
            const found = datas.find((data) => id === data.id)
            return { id: found?.id || "", name: (found?.displayName || "") + " (" + (found?.email || "") + ")" }
          })
          .filter((blockedUser) => blockedUser.id !== "")
        setBlocked(blockedUsers)
        setProfiles(datas)
      }
    }
    if (!profiles.length) getProfiles()
  }, [currentUser?.blocked, profiles.length])

  const handleDelete = (item: BlockerUsers) => {
    const blockedUsers = blocked.filter((blocked) => blocked.id !== item.id)
    if (!currentUser) return
    currentUser.blocked = blockedUsers.map((user) => user.id)
    userService.updateAttribute(currentUser, { blocked: currentUser?.blocked })
    setCurrentUser(currentUser)
    setBlocked(blockedUsers)
  }

  return (
    <>
      {currentUser ? (
        <Stack spacing={2}>
          <Typography variant="h6" gutterBottom>
            Blockierte Nutzer und Vereine
          </Typography>

          <Grid container spacing={2}>
            {blocked.length
              ? blocked.map((item, i) => (
                  <>
                    <Grid item xs={6} md={4}>
                      <Chip key={i} label={item.name} onDelete={() => handleDelete(item)} />
                    </Grid>
                  </>
                ))
              : "Keine Nutzer Blockiert..."}
          </Grid>
        </Stack>
      ) : (
        <div>Du hast keinen Zugriff auf diese Seite</div>
      )}
    </>
  )
}

export default withAuth(BlockedPage)
