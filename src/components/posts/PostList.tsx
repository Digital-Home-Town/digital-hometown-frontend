import { Box } from "@mui/material"
import moment from "moment"
import * as React from "react"
import { Navigate } from "react-router"
import { AuthContextI } from "src/auth/AuthContext"
import withAuth from "src/auth/withAuth"

import Posts from "./Posts"

function PostList({ currentUser, posts }: AuthContextI) {
  const [filteredPosts, setFilteredPosts] = React.useState<Post[]>([])

  React.useEffect(() => {
    const filtered = posts
      .filter((post) => !currentUser?.blocked?.includes(post.author.id))
      .filter((post) => {
        // check validity
        if (currentUser?.id === post.author.id) {
          return true
        }

        if (!(post.validityStart && post.validityEnd)) {
          // no validity set
          return true
        }
        console.log(
          moment(post.validityStart).toDate().getTime(),
          moment(post.validityStart).toDate().getTime() <= new Date().getTime(),
        )
        if (
          moment(post.validityStart).toDate().getTime() >= new Date().getTime() &&
          moment(post.validityEnd).toDate().getTime() <= new Date().getTime()
        ) {
          return true
        } else {
          return false
        }
      })
    setFilteredPosts(filtered)
  }, [currentUser?.blocked, currentUser?.id, posts])

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
