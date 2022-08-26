import { Box } from "@mui/material"
import * as React from "react"
import { AuthContextI } from "src/auth/AuthContext"
import withAuth from "src/auth/withAuth"
import PostService from "src/services/PostService"

import Posts from "./Posts"

function PostList(context: AuthContextI) {
  const [posts, setPosts] = React.useState<Post[]>([])

  React.useEffect(() => {
    const getPosts = async () => {
      const data = await PostService.getAll()
      console.log(data)
      if (data) {
        setPosts(data)
      }
    }
    if (!posts.length) getPosts()
  }, [posts])
  return (
    <Box sx={{ mt: 1 }}>
      <h1>Alle Beiträge</h1>
      <Posts posts={posts}></Posts>
    </Box>
  )
}

export default withAuth(PostList)
