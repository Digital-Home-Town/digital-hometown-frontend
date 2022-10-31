import { Box } from "@mui/material"
import * as React from "react"
import { Navigate } from "react-router"
import { AuthContextI } from "src/auth/AuthContext"
import withAuth from "src/auth/withAuth"

import usePostContext from "./PostContext"
import Posts from "./Posts"

function PostList({ currentUser }: AuthContextI) {
  const { posts } = usePostContext()
  const filteredPosts = posts
    .filter((post) => !currentUser?.blocked?.includes(post.author.id))
    .filter((post) => {
      console.log("post", post)
      // check validity
      if (currentUser?.id === post.author.id) {
        return true
      } else {
        if (!(post.validityStart && post.validityEnd)) {
          // no validity set
          return true
        }
        if (post.validityStart <= new Date() && post.validityEnd >= new Date()) {
          return true
        } else {
          return false
        }
      }
    })
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
