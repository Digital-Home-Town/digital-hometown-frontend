import { Box } from "@mui/material"
import React from "react"
import { AuthContextI } from "src/auth/AuthContext"
import withAuth from "src/auth/withAuth"

import Posts from "../posts/Posts"

function GenericProfilePosts({ profile, posts }: ProfileProps<User | Club> & AuthContextI) {
  const profilePosts = posts.filter((p) => p.author.id === profile?.id)

  return (
    <Box sx={{ mt: 1 }}>
      <h1> Beiträge</h1>
      <Posts posts={profilePosts}></Posts>
    </Box>
  )
}

export default withAuth(GenericProfilePosts)
