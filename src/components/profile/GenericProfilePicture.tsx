import "firebase/compat/storage"

import { Person } from "@mui/icons-material"
import ClearIcon from "@mui/icons-material/Clear"
import EditIcon from "@mui/icons-material/Edit"
import { Avatar, Grid } from "@mui/material"
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage"
import React, { useState } from "react"
import { AuthContextI } from "src/auth/AuthContext"
import withAuth from "src/auth/withAuth"
import { storage } from "src/firebase-config"

import { updateProfileAttribute } from "./updateProfileAttribute"

function GenericProfilePicture({ profile, currentUser }: ProfileProps<User> & AuthContextI) {
  const readOnly: boolean = currentUser == null || currentUser.id !== profile?.id
  // Image
  const [imageUrl, setImageUrl] = useState<string>(profile?.photoURL || "")
  const [_file, setFile] = useState(null)

  function deleteImage() {
    if (!profile?.photoURL) {
      setImageUrl("")
      return
    }

    // (1) get ref & delete file
    // https://firebase.google.com/docs/storage/web/delete-files
    const desertRef = ref(storage, profile?.photoURL)
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      })

    // (2) update profile data
    // BUG : updatedUser keeps old data
    const url = ""
    updateProfileAttribute(profile, "photoURL", url, setImageUrl)

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
    console.log("chk_handleUpload")
    if (!file) return

    console.log("handleUpload")
    // create a storage reference
    // https://firebase.google.com/docs/storage/web/create-reference
    const path = "images/" || file
    const imageRef = ref(storage, path)
    // upload file
    // https://firebase.google.com/docs/storage/web/upload-files
    await uploadBytes(imageRef, file)
    // get url
    // https://firebase.google.com/docs/storage/web/download-files
    const url = await getDownloadURL(imageRef)

    // update profile data
    updateProfileAttribute(profile, "photoURL", url, setImageUrl)
  }

  return (
    <Grid item xs={4}>
      {/* TODO: url-state-change
      <ProfilePicture profile={profile || undefined} size={128} /> */}
      <Avatar alt="profile-picture" src={imageUrl} sx={{ height: 128, width: 128 }} variant="rounded">
        {!imageUrl && <Person fontSize="large" />}
      </Avatar>
      {!readOnly ? (
        <div>
          <form onSubmit={handleUpload}>
            <label htmlFor="file-input">
              <EditIcon />
            </label>
            <input
              style={{ display: "none" }}
              id="file-input"
              type="file"
              accept="image/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                addImage(e)
              }}
            />
            <ClearIcon onClick={deleteImage} />
          </form>
        </div>
      ) : (
        ""
      )}
    </Grid>
  )
}

export default withAuth(GenericProfilePicture)
