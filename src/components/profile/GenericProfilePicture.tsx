import "firebase/compat/storage"

import { Person, PhotoCamera } from "@mui/icons-material"
import ClearIcon from "@mui/icons-material/Clear"
import { Avatar, Grid, IconButton } from "@mui/material"
import { Stack } from "@mui/system"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import React, { useState } from "react"
import { AuthContextI } from "src/auth/AuthContext"
import withAuth from "src/auth/withAuth"
import { storage } from "src/firebase-config"
import userService from "src/services/UserService"

function GenericProfilePicture({ profile, currentUser }: ProfileProps<User> & AuthContextI) {
  const readOnly: boolean = currentUser == null || currentUser.id !== profile?.id
  // Image
  let profilePicture = profile?.photoURL || ""
  const [imageUrl, setImageUrl] = useState<string>(profile?.photoURL || "")
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
    profilePicture = url
    setImageUrl(url)

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
    profilePicture = ""
    setImageUrl(url)
  }

  return (
    <Grid item xs={4} padding={3}>
      {/* TODO: url-state-change
      <ProfilePicture profile={profile || undefined} size={128} /> */}
      <Avatar alt="profile-picture" src={profilePicture || imageUrl} sx={{ height: 128, width: 128 }} variant="rounded">
        {!profilePicture && !imageUrl && <Person fontSize="large" />}
      </Avatar>
      {!readOnly ? (
        <Stack direction="row" spacing={5} alignItems={"center"} justifyContent={"center"} width={100} margin={1}>
          <form onSubmit={handleUpload}>
            <label htmlFor="file-input">
              <IconButton>
                <PhotoCamera />
                <input
                  style={{ display: "none" }}
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    addImage(e)
                  }}
                />
              </IconButton>
            </label>

            <IconButton color="error" onClick={deleteImage}>
              <ClearIcon />
            </IconButton>
          </form>
        </Stack>
      ) : (
        ""
      )}
    </Grid>
  )
}

export default withAuth(GenericProfilePicture)
