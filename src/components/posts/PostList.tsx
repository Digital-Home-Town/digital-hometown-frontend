import { Box } from "@mui/material"
import * as React from "react"
import { Navigate } from "react-router"
import { AuthContextI } from "src/auth/AuthContext"
import withAuth from "src/auth/withAuth"

import Posts from "./Posts"

function PostList({ currentUser, posts }: AuthContextI) {
  const filteredPosts = posts.filter((post) => post.validityEnd && post.validityEnd >= new Date().getTime())

  return currentUser ? (
    <Box sx={{ mt: 1 }}>
      <h1>Alle Beiträge</h1>
      <Posts posts={filteredPosts}></Posts>
    </Box>
  ) : (
    <Navigate to="/sign-in" />
  )
}

export default withAuth(PostList)
