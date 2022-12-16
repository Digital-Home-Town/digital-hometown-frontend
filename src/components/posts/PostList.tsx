import { Box } from "@mui/material"
import * as React from "react"
import { Navigate } from "react-router"
import { AuthContextI } from "src/auth/AuthContext"
import withAuth from "src/auth/withAuth"

import Posts from "./Posts"

function PostList({ currentUser, posts }: AuthContextI) {
  const [filteredPosts, setFilteredPosts] = React.useState<Post[]>([])

  React.useEffect(() => {
    async function getFilteredPosts() {
      const filtered = posts
        .filter((post) => !currentUser?.blocked?.includes(post.author.id))
        .filter((post) => {
          console.log(posts)
          if (!(post.validityStart && post.validityEnd)) {
            // no validity set
            return true
          }

          if (!post.validityStart && post.validityEnd >= new Date().getTime()) {
            return true
          }
          if (!post.validityEnd && post.validityStart <= new Date().getTime()) {
            return true
          }

          if (post.validityStart <= new Date().getTime() && post.validityEnd >= new Date().getTime()) {
            return true
          } else {
            return false
          }
        })
      setFilteredPosts(filtered)
    }
    getFilteredPosts()
  }, [currentUser?.blocked, currentUser?.id, currentUser?.displayName, posts])

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
