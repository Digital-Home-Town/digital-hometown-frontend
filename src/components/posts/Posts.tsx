import { Stack } from "@mui/material"
import * as React from "react"

import Post from "./Post"

interface PostsProperties {
  posts: Post[]
}

function Posts(props: PostsProperties) {
  return (
    <Stack spacing={2}>
      {props.posts.length ? (
        props.posts.map((post, index) => <Post post={post} key={index}></Post>)
      ) : (
        <p>Leider keine Beiträge abgeben</p>
      )}
    </Stack>
  )
}

export default Posts
