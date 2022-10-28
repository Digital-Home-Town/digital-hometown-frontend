import { Box } from "@mui/material"
import React from "react"
import { AuthContextI } from "src/auth/AuthContext"
import withAuth from "src/auth/withAuth"

import usePostContext from "../posts/PostContext"
import Posts from "../posts/Posts"

function GenericProfilePosts({ profile, currentUser }: ProfileProps<User | Club> & AuthContextI) {
  const posts = usePostContext().posts.filter((p) => p.author.id === profile?.id)

  return (
    <Box sx={{ mt: 1 }}>
      <h1> Beiträge</h1>
      <Posts posts={posts}></Posts>
    </Box>
  )
}

export default withAuth(GenericProfilePosts)
