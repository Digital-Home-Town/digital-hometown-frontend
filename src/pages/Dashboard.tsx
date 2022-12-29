import { Grid } from "@mui/material"
import * as React from "react"
import { AuthContextI } from "src/auth/AuthContext"
import withAuth from "src/auth/withAuth"
import PostService from "src/services/PostService"
import Posts from "src/components/posts/Posts"

function Dashboard({ currentUser }: AuthContextI) {
  const [veranstaltungen, setVeranstaltungen] = React.useState<Post[]>([])
  const [posts, setPosts] = React.useState<Post[]>([])

  React.useEffect(() => {
    PostService.getAll().then((posts) => {
      setPosts(posts.filter((post) => post?.author?.id !== currentUser?.id))
    })
    PostService.getAll().then((veranstaltungen) => {
      veranstaltungen = veranstaltungen.filter((post) => currentUser?.favoritePosts?.includes(post.id || ""))
      setVeranstaltungen(veranstaltungen.filter((post) => post.type === "Veranstaltung"))
    })
  })

  return (
    <div>
      <Grid container spacing={2} paddingTop={1}>
        <Grid item xs={5}>
          <h1>Beiträge aus deiner Nähe</h1>
          <Posts posts={posts} notFoundText="Keine Beiträge in deiner Umgebung gefunden." />
        </Grid>

        <Grid item xs={5}>
          <h1>Anstehende Veranstaltungen</h1>
          <Posts posts={veranstaltungen} notFoundText="Keine anstehenden Veranstaltungen in deinem Merkzettel." />
        </Grid>
      </Grid>
    </div>
  )
}

export default withAuth(Dashboard)
