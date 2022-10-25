import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Link,
  Stack,
  Typography,
} from "@mui/material"
import React from "react"
import { useNavigate } from "react-router"

import BobbelMenu from "./BobbelMenu"

interface ShowDialogI {
  open: boolean
  setOpen: (open: boolean) => void
  post: Post
}

function ShowDialog({ open, setOpen, post }: ShowDialogI) {
  const navigate = useNavigate()

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogContent>
        <Typography fontSize="small">{post.type}</Typography>
        <Card sx={{ boxShadow: "none", padding: 0 }}>
          <CardHeader
            sx={{ padding: 0 }}
            subheader={
              <span>
                von{" "}
                <Link component="button" onClick={() => navigate(`/profile/${post.author.id}`)}>
                  {post.author?.displayName}
                </Link>
              </span>
            }
            title={post.title}
            action={<BobbelMenu post={post} />}
          />
          <CardContent sx={{ paddingX: 0 }}>{post.text}</CardContent>
          <Stack direction="row" justifyContent="flex-start" gap={1}>
            {post.tags.map((category, val) => (
              <Chip key={val} label={category} />
            ))}
          </Stack>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button size="small" onClick={() => setOpen(false)}>
          Schließen
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ShowDialog
