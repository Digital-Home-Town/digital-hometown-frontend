import { Box } from "@mui/material"
import * as React from "react"
import { Navigate } from "react-router"
import { AuthContextI } from "src/auth/AuthContext"
import withAuth from "src/auth/withAuth"
import usePostContext from "./PostContext"

import Posts from "./Posts"

function PostList({ currentUser }: AuthContextI) {
  const { posts } = usePostContext()

  return currentUser ? (
    <Box sx={{ mt: 1 }}>
      <h1>Alle Beiträge</h1>
      <Posts posts={posts}></Posts>
    </Box>
  ) : (
    <Navigate to="/sign-in" />
  )
}

export default withAuth(PostList)
