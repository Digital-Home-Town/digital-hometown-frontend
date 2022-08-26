import { Stack } from "@mui/material"
import * as React from "react"

import Post from "./Post"

interface PostsProperties {
  posts: Post[]
}

function Posts(props: PostsProperties) {
  return (
    <Stack spacing={2}>
      {props.posts.map((post, index) => (
        <Post key={index} post={post}></Post>
      ))}
    </Stack>
  )
}

export default Posts
