import { AllInbox } from "@mui/icons-material"
import { Grid, IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import * as React from "react"
import { AuthContextI } from "src/auth/AuthContext"
import withAuth from "src/auth/withAuth"
import { POST_TYPES, POST_TYPES_ICONS } from "src/global"
import PostService from "src/services/PostService"

import Posts from "./Posts"

function Merkzettel({ currentUser }: AuthContextI) {
  const [postFilter, setPostFilter] = React.useState<string>("")
  const [posts, setPosts] = React.useState<Post[]>([])

  React.useEffect(() => {
    PostService.getAll().then((posts) => {
      posts = posts.filter((post) => currentUser?.favoritePosts?.includes(post.id || ""))
      if (postFilter) {
        setPosts(posts.filter((post) => post.type === postFilter))
      } else {
        setPosts(posts)
      }
    })
  }, [currentUser?.favoritePosts, postFilter])

  return (
    <div>
      <h1>Merkzettel</h1>
      Hier siehst du alle Beiträge, die du in deinen Merkzettel gespeichert hast.
      <Grid container spacing={2} paddingTop={1}>
        <Grid item xs={2}>
          <List>
            <ListItem button onClick={() => setPostFilter("")} disablePadding>
              <ListItemButton selected={postFilter === ""}>
                <IconButton>
                  <AllInbox />
                </IconButton>
                <ListItemText primary="Alle" />
              </ListItemButton>
            </ListItem>
            {POST_TYPES.map((postType, i) => {
              const Icon = POST_TYPES_ICONS[i]
              return (
                <ListItem key={i} button onClick={() => setPostFilter(postType)} disablePadding>
                  <ListItemButton selected={postFilter === postType}>
                    <IconButton>
                      <Icon />
                    </IconButton>
                    <ListItemText primary={postType} />
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </Grid>
        <Grid item xs={10}>
          <Posts posts={posts} notFoundText="Keine Beiträge im Merkzettel gespeichert." />
        </Grid>
      </Grid>
    </div>
  )
}

export default withAuth(Merkzettel)
