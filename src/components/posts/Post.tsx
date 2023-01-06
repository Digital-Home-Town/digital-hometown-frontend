import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, Chip, Link, Stack } from "@mui/material"
//import * as React from "react"
import { useNavigate } from "react-router"

import BobbelMenu from "./BobbelMenu"
import ShowDialog from "./ShowDialog"

interface PostProperties {
  post: Post
}
function Post({ post }: PostProperties) {
  // const navigate = useNavigate()
  const [cursor, setCursor] = React.useState("auto")
  const [borderColor, setBorderColor] = React.useState("transparent")
  const [postDialogOpen, setPostDialogOpen] = React.useState(false)
  const [isOutdated] = React.useState(post.validityEnd && post.validityEnd <= new Date().getTime())

  React.useEffect(() => {
    if (!postDialogOpen) {
      setBorderColor("transparent")
    }
  }, [postDialogOpen])

  console.log(postDialogOpen)

  return (
    <>
      <ShowDialog open={postDialogOpen} setOpen={setPostDialogOpen} post={post} />
      <Card
        onMouseOver={() => {
          setCursor("pointer")
          setBorderColor("primary")
        }}
        onMouseLeave={() => {
          setCursor("auto")
          setBorderColor("transparent")
        }}
        sx={{ border: 1, borderColor: borderColor, cursor: cursor, bgcolor: isOutdated ? "lightgray" : "" }}
      >
        <CardHeader
          title={<span onClick={() => setPostDialogOpen(true)}>{post.title}</span>}
          subheader={
            // BUG: No dialog is displaying if someone clicks at the line behind the text
            <span onClick={() => setPostDialogOpen(true)}>
              {post.type} von {post.author?.displayName}
            </span>
          }
          action={<BobbelMenu post={post} />}
        />
        <CardContent style={{ paddingTop: 0 }} onClick={() => setPostDialogOpen(true)}>
          <Stack direction="column" spacing={1}>
            {post.type === "Veranstaltung" && (
              <>
                <span>
                  <b>Datum:</b> {new Date(post.eventDate || new Date()).toLocaleDateString()}
                </span>
                <span>
                  <b>Ort:</b> {post.eventLocation}
                </span>
              </>
            )}
            <div style={{ whiteSpace: "pre-line" }}>{post.text}</div>
          </Stack>

          <Stack direction="row" justifyContent="flex-start" gap={1} marginTop={2}>
            {post.tags?.map((category, val) => (
              <Chip key={val} label={category} />
            ))}
          </Stack>
        </CardContent>
      </Card>
    </>
  )
}

export default Post
