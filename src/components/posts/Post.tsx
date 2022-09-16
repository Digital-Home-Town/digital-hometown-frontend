import * as React from "react"
import { Button, Card, CardActions, CardContent, CardHeader, Chip, Stack, Typography, Link } from "@mui/material"
import ShowDialog from "./ShowDialog"
import BobbelMenu from "./BobbelMenu"
import { useNavigate } from "react-router"

interface PostProperties {
  post: Post
}
function Post({ post }: PostProperties) {
  const navigate = useNavigate()
  const [postDialogOpen, setPostDialogOpen] = React.useState(false)
  return (
    <Card>
      <CardHeader
        subheader={
          <span>
            von{" "}
            <Link component="button" onClick={() => navigate(`/profile/${post.author.id}`)}>
              {post.author?.displayName}
            </Link>
          </span>
        }
        title={
          post.title
          // <span>
          //   <Typography>{post.title}</Typography>
          //   <Typography fontSize="small">{post.type}</Typography>
          // </span>
        }
        action={<BobbelMenu post={post} />}
      />
      <CardContent>
        <Typography>{post.text}</Typography>
      </CardContent>
      <Stack direction="row" justifyContent="flex-start" gap={1} sx={{ px: 1 }}>
        {post.tags.map((category, val) => (
          <Chip key={val} label={category} />
        ))}
      </Stack>
      <CardActions>
        <Button size="small" onClick={() => setPostDialogOpen(true)}>
          Öffnen
        </Button>
      </CardActions>
      <ShowDialog open={postDialogOpen} setOpen={setPostDialogOpen} post={post} />
    </Card>
  )
}

export default Post
