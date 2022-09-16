import * as React from "react"
import { Stack } from "@mui/material"

import Post from "./Post"

interface PostsProperties {
  posts: Post[]
}

function Posts(props: PostsProperties) {
  return (
    <Stack spacing={2}>
      {props.posts.map((post, index) => (
        <Post post={post} key={index}></Post>
      ))}
    </Stack>
  )
}

export default Posts
