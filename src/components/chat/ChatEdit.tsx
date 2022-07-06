import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  List,
  ListItem,
  TextField,
} from "@mui/material"
import * as React from "react"
import { FormEvent, useEffect, useState } from "react"
import userService from "../../services/UserService"
import chatService from "../../services/ChatService"
import { ChatContextI, withChat } from "./ChatContext"
import { toast } from "react-toastify"
import SaveButton from "../general/button/SaveButton"
import CancelButton from "../general/button/CancelButton"

interface SimpleDialogI {
  open: boolean
  onItemClick: (profile: GenericProfile) => void
  onClose: () => void
}

function ChatEdit({ open, onItemClick, onClose, currentRoom }: SimpleDialogI & ChatContextI) {
  const [profiles, setProfiles] = useState<GenericProfile[]>([])
  const [newChatName, setNewChatName] = useState<string | undefined>(currentRoom?.name)

  useEffect(() => {
    if (currentRoom?.id != null) {
      setNewChatName(currentRoom?.name)
    }
  }, [currentRoom])

  useEffect(() => {
    const getProfiles = async () => {
      const profilesData = await userService.getAll()
      if (profilesData) {
        setProfiles(profilesData)
      }
    }
    if (!profiles.length) getProfiles().then()
  }, [profiles])

  const handleSubmit = () => {
    if (newChatName != null && currentRoom != null) {
      chatService.editRoom(currentRoom.id, newChatName).catch((e) => {
        toast.error("Der Name des Chatraums konnte nicht geändert werden")
        throw e
      })
    }
    onClose()
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Chat bearbeiten</DialogTitle>
      <DialogContent>
        <List>
          {currentRoom?.isGroup && (
            <ListItem>
              <Box>
                Chatname bearbeiten
                <FormGroup onSubmit={handleSubmit}>
                  <TextField
                    required
                    label="Neuer Chatname"
                    type="text"
                    onChange={(e) => setNewChatName(e.target.value)}
                    value={newChatName}
                  />
                </FormGroup>
              </Box>
            </ListItem>
          )}
          <ListItem>
            <Box>
              Benutzer hinzufügen
              <List>
                {profiles.map((profile, index) => (
                  <ListItem
                    selected={Object.keys(currentRoom?.members || []).includes(profile.id)}
                    button
                    id={profile.id}
                    key={index}
                    onClick={() => {
                      onItemClick(profile)
                    }}
                  >
                    {profile.displayName}
                  </ListItem>
                ))}
              </List>
            </Box>
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <CancelButton onClick={onClose} />
        <SaveButton onClick={handleSubmit} />
      </DialogActions>
    </Dialog>
  )
}
export default withChat(ChatEdit)
