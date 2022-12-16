import { Card, CardContent, CardHeader, Chip, Link, Stack } from "@mui/material"
import * as React from "react"
import { useNavigate } from "react-router"

import BobbelMenu from "./BobbelMenu"

interface PostProperties {
  post: Post
}
function Post({ post }: PostProperties) {
  const navigate = useNavigate()
  return (
    <Card>
      <CardHeader
        subheader={
          <span>
            {post.type} von{" "}
            <Link component="button" onClick={() => navigate(`/profile/${post.author.id}`)}>
              {post.author?.displayName}
            </Link>
          </span>
        }
        title={post.title}
        action={<BobbelMenu post={post} />}
      />
      <CardContent style={{ paddingTop: 0 }}>
        <Stack direction="column" spacing={1}>
          {post.type === "Veranstaltung" && (
            <>
              <span>
                <b>Datum:</b> {post.eventDate}
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
  )
}

export default Post
