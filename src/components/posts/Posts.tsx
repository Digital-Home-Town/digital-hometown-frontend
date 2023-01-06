import * as React from "react"

import { Stack } from "@mui/material"

import Post from "./Post"

interface PostsProperties {
  posts: Post[]
  notFoundText: string
}

function Posts(props: PostsProperties) {
  return (
    <Stack spacing={2}>
      {props.posts.length ? (
        props.posts.map((post, index) => <Post post={post} key={index}></Post>)
      ) : (
        <p>{props.notFoundText}</p>
      )}
    </Stack>
  )
}

Posts.defaultProps = {
  notFoundText: "Leider keine Beiträge gefunden.",
}

export default Posts
