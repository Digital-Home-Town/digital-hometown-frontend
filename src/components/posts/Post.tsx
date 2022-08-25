import { Button, Card, CardActions, CardContent, CardHeader } from "@mui/material"
import * as React from "react"

interface PostProperties {
  post: Post
}
function Post(props: PostProperties) {
  return (
    <Card>
      <CardHeader subheader={"von " + props.post.author.displayName || props.post.author} title={props.post.type} />
      <CardContent>{props.post.text}</CardContent>
      <CardActions>
        <Button size="small">Mehr</Button>
      </CardActions>
    </Card>
  )
}

export default Post
