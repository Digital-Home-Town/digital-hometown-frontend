import "firebase/compat/storage"

import { PhotoCamera } from "@mui/icons-material"
import ClearIcon from "@mui/icons-material/Clear"
import { Box, CardMedia, IconButton } from "@mui/material"
import { Stack } from "@mui/system"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import React, { useState } from "react"
import { AuthContextI } from "src/auth/AuthContext"
import withAuth from "src/auth/withAuth"
import { storage } from "src/firebase-config"
import userService from "src/services/UserService"

function GenericProfilePicture({ profile, currentUser, setCurrentUser }: ProfileProps<User> & AuthContextI) {
  const readOnly: boolean = currentUser == null || currentUser.id !== profile?.id
  // Image
  const [imageUrl, setImageUrl] = useState<string>(profile?.photoURL || "")
  if (imageUrl !== profile?.photoURL && profile) {
    setImageUrl(profile.photoURL || "")
  }
  const [_file, setFile] = useState(null)

  function deleteImage() {
    // (1) get ref & delete file
    // https://firebase.google.com/docs/storage/web/delete-files
    // Jonas: Why tho?
    // const desertRef = ref(storage, profile?.photoURL)
    // deleteObject(desertRef)
    //   .then(() => {
    //     // File deleted successfully
    //   })
    //   .catch((error) => {
    //     // Uh-oh, an error occurred!
    //   })

    // (2) update profile data
    // BUG : updatedUser keeps old data
    const url = ""
    userService.updateAttribute(profile, { photoURL: url })
    setImageUrl(url)
    if (currentUser) {
      currentUser.photoURL = ""
      setCurrentUser(currentUser)
    }

    // (3) set new state
    setFile(null)
  }

  function addImage(e: any) {
    e.preventDefault()
    console.log("add")

    const file = e.target.files[0]

    if (console) {
      console.log("setFile")
      handleUpload(file)
    }
  }

  async function handleUpload(file: any) {
    if (!file) return

    // create a storage reference
    // https://firebase.google.com/docs/storage/web/create-reference
    const path = "images/" + currentUser?.id
    const imageRef = ref(storage, path)
    // upload file
    // https://firebase.google.com/docs/storage/web/upload-files
    await uploadBytes(imageRef, file)
    // get url
    // https://firebase.google.com/docs/storage/web/download-files
    const url = await getDownloadURL(imageRef)

    // update profile data
    userService.updateAttribute(profile, { photoURL: url })
    if (currentUser) {
      currentUser.photoURL = url
      setCurrentUser(currentUser)
    }
    setImageUrl(url)
  }

  const width = 200

  return (
    <Box marginTop={3} marginLeft={3} marginBottom={readOnly ? 3 : 0} marginRight={readOnly ? 3 : 0}>
      <CardMedia
        component="img"
        sx={{ width: width, height: width }}
        image={imageUrl || "https://i.stack.imgur.com/l60Hf.png"}
      ></CardMedia>

      {!readOnly ? (
        <Stack direction="row" spacing={2} alignItems={"center"} justifyContent={"center"} width={width} margin={1}>
          <IconButton component="label" onSubmit={handleUpload}>
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                addImage(e)
              }}
            />
            <PhotoCamera />
          </IconButton>

          <IconButton color="error" onClick={deleteImage}>
            <ClearIcon />
          </IconButton>
        </Stack>
      ) : (
        ""
      )}
    </Box>
  )
}

export default withAuth(GenericProfilePicture)
