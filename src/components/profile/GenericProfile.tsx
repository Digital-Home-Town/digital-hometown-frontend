import { Chat } from "@mui/icons-material"
import EditIcon from "@mui/icons-material/Edit"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { Button, Card, Stack } from "@mui/material"
import React, { useState } from "react"
import { useNavigate } from "react-router"
import { AuthContextI } from "src/auth/AuthContext"
import Loader from "src/auth/Loader"
import withAuth from "src/auth/withAuth"
import ChatService from "src/services/ChatService"
import userService from "src/services/UserService"

import GenericProfileInfo from "./GenericProfileInfo"
import GenericProfilePicture from "./GenericProfilePicture"
import GenericProfilePosts from "./GenericProfilePosts"

function GenericProfile({ profile, currentUser, setCurrentUser }: ProfileProps<User | Club> & AuthContextI) {
  const navigate = useNavigate()

  const [editMode, setEditMode] = useState<boolean>(true)
  if (currentUser == null || profile == null) {
    return <Loader />
  }

  const handleEditMode = () => {
    setEditMode(!editMode)
  }
  const openChat = async () => {
    const key = await ChatService.createChat(currentUser, profile)
    navigate(`/chat/${key}`)
  }

  const block = async () => {
    const blockedUsers = currentUser.blocked || []
    blockedUsers?.push(profile.id)
    await userService.updateAttribute(currentUser, { blocked: blockedUsers })
    currentUser.blocked = blockedUsers
    setCurrentUser(currentUser)
    navigate("/")
  }

  return (
    <div>
      <Card sx={{ display: "flex" }}>
        <GenericProfilePicture profile={profile} />
        <GenericProfileInfo profile={profile} editMode={editMode} />
      </Card>

      <Stack direction="row" spacing={0.5} justifyContent="center" marginY={2}>
        {currentUser.id !== profile.id && (
          <>
            {/* do not show buttons if it is the own profile */}
            <Button variant="contained" onClick={openChat} startIcon={<Chat />}>
              Schreib mir!
            </Button>
            <Button variant="contained" color="error" onClick={block} startIcon={<RemoveCircleOutlineIcon />}>
              Benutzer blockieren
            </Button>
          </>
        )}
        {currentUser.id === profile.id && (
          <>
            <Button
              variant="contained"
              onClick={handleEditMode}
              color={editMode ? "success" : "primary"}
              startIcon={editMode ? <VisibilityIcon /> : <EditIcon />}
            >
              {editMode ? "Vorschau" : "Profil bearbeiten"}
            </Button>
          </>
        )}
      </Stack>
      <GenericProfilePosts profile={profile} />
    </div>
  )
}

export default withAuth(GenericProfile)
