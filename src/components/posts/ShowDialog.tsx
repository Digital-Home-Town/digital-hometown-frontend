import "moment/locale/de"

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
import moment from "moment"
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

  function getDate() {
    moment.locale("de")
    return moment(post.created).fromNow()
  }
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
          <CardContent sx={{ paddingX: 0, paddingY: 1 }}>
            {post.text}
            <Stack direction="row" justifyContent="flex-start" gap={1} marginY={1}>
              {post.tags.map((category, val) => (
                <Chip key={val} label={category} />
              ))}
            </Stack>
            <Typography fontSize="small" marginTop={2}>
              Erstellt {getDate()}
            </Typography>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Schließen</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ShowDialog
