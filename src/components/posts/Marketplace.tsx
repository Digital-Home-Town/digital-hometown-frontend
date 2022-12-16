import { Event, ExpandLess, ExpandMore, Group, Info, Store } from "@mui/icons-material"
import {
  Checkbox,
  Collapse,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material"
import { Box } from "@mui/system"
import { orderBy } from "lodash"
import moment from "moment"
import * as React from "react"
import { AuthContextI } from "src/auth/AuthContext"
import withAuth from "src/auth/withAuth"
import PostService from "src/services/PostService"

import DatePicker from "../general/input/DatePicker2"
import TagSelect from "../general/input/TagSelect"
import Posts from "./Posts"

function Marketplace({ currentUser }: AuthContextI) {
  // Settings
  const [openCreator, setOpenCreator] = React.useState(false)
  const [postCreatorPerson, setPostCreatorPerson] = React.useState<boolean>(true)
  const [postCreatorClub, setPostCreatorClub] = React.useState<boolean>(true)

  const [postMarket, setPostMarket] = React.useState<boolean>(false)
  const [postMarketOffer, setPostMarketOffer] = React.useState<boolean>(true)
  const [postMarketDemand, setPostMarketDemand] = React.useState<boolean>(true)

  const [postInfo, setPostInfo] = React.useState<boolean>(false)
  const [postEvent, setPostEvent] = React.useState<boolean>(false)
  const [postEventStart, setPostEventStart] = React.useState<Date>(new Date())
  const [postEventEnd, setPostEventEnd] = React.useState<Date>(new Date(postEventStart.getTime() + 1000 * 60 * 60 * 24))
  const [postTags, setPostTags] = React.useState<boolean>(false)
  const [postTagsValue, setPostTagsValue] = React.useState<string[]>([])

  // Filter
  const [posts, setPosts] = React.useState<Post[]>([])

  React.useEffect(() => {
    PostService.getAll().then((allPosts) => {
      if (postCreatorPerson && postCreatorClub) {
      } else {
        allPosts = allPosts.filter((post) => post?.author?.isOrg === !postCreatorPerson)
      }

      var filteredPosts: Post[] = []

      if (postMarket) {
        let tempPostsA: Post[] = []
        let tempPostsB: Post[] = []

        if (postMarketOffer) {
          tempPostsA = allPosts.filter((post) => post?.type === "Angebot")
        }
        if (postMarketDemand) {
          tempPostsB = allPosts.filter((post) => post?.type === "Anfrage")
        }
        filteredPosts = [...filteredPosts, ...tempPostsA, ...tempPostsB]
      }
      if (postInfo) {
        let tempPosts: Post[] = []
        tempPosts = allPosts.filter((post) => post?.type === "Information")
        filteredPosts = [...filteredPosts, ...tempPosts]
      }
      if (postEvent) {
        let tempPosts: Post[] = []
        tempPosts = allPosts.filter((post) => post?.type === "Veranstaltung")

        // eventDate-Format: 24.11.2022 18:01
        tempPosts = tempPosts.filter(
          (post) =>
            new Date(moment(post.eventDate, "DD.MM.YYYY hh:mm").toDate()) >= postEventStart &&
            new Date(moment(post.eventDate, "DD.MM.YYYY hh:mm").toDate()) <= postEventEnd,
        )
        filteredPosts = [...filteredPosts, ...tempPosts]
      }
      if (!postInfo && !postEvent && !postMarket) {
        filteredPosts = allPosts
      }
      if (postTags && postTagsValue.length) {
        filteredPosts = filteredPosts.filter(
          (post) => post?.tags.filter((tag) => postTagsValue.includes(tag)).length > 0,
        )
      }

      filteredPosts = orderBy(filteredPosts, ["created"], ["desc"])

      setPosts(filteredPosts)
    })
  }, [
    postCreatorPerson,
    postCreatorClub,
    postMarket,
    postMarketOffer,
    postMarketDemand,
    postInfo,
    postEvent,
    postEventStart,
    postEventEnd,
    postTags,
    postTagsValue,
  ])

  const [creators, setCreator] = React.useState(() => ["person", "club"])
  const [marketAdds, setMarketAdds] = React.useState(() => ["demand", "offer"])

  // use effect when start date changes
  React.useEffect(() => {
    if (postEventEnd < postEventStart) {
      setPostEventEnd(new Date(postEventStart.getTime()))
    }

    if (postEventStart > postEventEnd) {
      setPostEventStart(new Date(postEventEnd.getTime()))
    }
  }, [postEventStart, postEventEnd])

  const handleChange = (evt: React.MouseEvent<HTMLElement>, newChange: string[]) => {
    const seg: string[] = evt.currentTarget.id.split(".")
    const grp: string = seg[0]
    const id: string = seg[1]

    if (grp === "creator") {
      if (newChange !== null && newChange.length) {
        setCreator(newChange)
        if (id === "club") {
          setPostCreatorClub(!postCreatorClub)
        } else if (id === "person") {
          setPostCreatorPerson(!postCreatorPerson)
        }
      }
    } else if (grp === "marketAdds") {
      setMarketAdds(newChange)
      if (id === "demand") {
        setPostMarketDemand(!postMarketDemand)
      } else if (id === "offer") {
        setPostMarketOffer(!postMarketOffer)
      }
    } else {
      throw new Error("Wrong key!")
    }
  }

  return (
    <div>
      <h1>Marktplatz</h1>
      <Grid container spacing={2} paddingTop={1}>
        <Grid item xs={3}>
          <List component="nav">
            <ListItemButton onClick={() => setOpenCreator(!openCreator)}>
              <IconButton>
                <Group />
              </IconButton>
              <ListItemText primary="Ersteller" />
              {openCreator ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openCreator} timeout="auto" orientation="vertical" unmountOnExit>
              <ToggleButtonGroup sx={{ pl: 6 }} value={creators} size="small" onChange={handleChange}>
                <ToggleButton id="creator.person" value="person" selected={postCreatorPerson}>
                  Person
                </ToggleButton>
                <ToggleButton id="creator.club" value="club">
                  Verein
                </ToggleButton>
              </ToggleButtonGroup>
            </Collapse>

            <ListItem
              secondaryAction={<Checkbox edge="end" checked={postMarket} onClick={() => setPostMarket(!postMarket)} />}
              disablePadding
            >
              <ListItemButton onClick={() => setPostMarket(!postMarket)}>
                <IconButton>
                  <Store />
                </IconButton>
                <ListItemText primary="Markt" />
              </ListItemButton>
            </ListItem>

            <Collapse in={postMarket} timeout="auto" orientation="vertical" unmountOnExit>
              <ToggleButtonGroup sx={{ pl: 6 }} value={marketAdds} size="small" onChange={handleChange}>
                <ToggleButton id="marketAdds.demand" value="demand">
                  Anfrage
                </ToggleButton>
                <ToggleButton id="marketAdds.offer" value="offer">
                  Angebot
                </ToggleButton>
              </ToggleButtonGroup>
            </Collapse>

            <ListItem
              secondaryAction={<Checkbox edge="end" checked={postInfo} onClick={() => setPostInfo(!postInfo)} />}
              disablePadding
            >
              <ListItemButton onClick={() => setPostInfo(!postInfo)}>
                <IconButton>
                  <Info />
                </IconButton>
                <ListItemText primary="Informationen" />
              </ListItemButton>
            </ListItem>

            <ListItem
              secondaryAction={<Checkbox edge="end" checked={postEvent} onClick={() => setPostEvent(!postEvent)} />}
              disablePadding
            >
              <ListItemButton onClick={() => setPostEvent(!postEvent)}>
                <IconButton>
                  <Event />
                </IconButton>
                <ListItemText primary="Veranstaltungen" />
              </ListItemButton>
            </ListItem>

            <Collapse in={postEvent} timeout="auto" orientation="vertical" unmountOnExit>
              <Box sx={{ pl: 6, width: 120 }}>
                <DatePicker
                  name="startDate"
                  initialValue={postEventStart}
                  onChange={(_, newDate) => (newDate != null ? setPostEventStart(newDate) : null)}
                  placeholder="Von"
                ></DatePicker>
                <DatePicker
                  name="endDate"
                  initialValue={postEventEnd}
                  onChange={(_, newDate) => (newDate != null ? setPostEventEnd(newDate) : null)}
                  placeholder="Bis"
                ></DatePicker>
              </Box>
            </Collapse>

            <ListItem
              secondaryAction={<Checkbox edge="end" checked={postTags} onClick={() => setPostTags(!postTags)} />}
              disablePadding
            >
              <ListItemButton onClick={() => setPostTags(!postTags)}>
                <IconButton>
                  <Event />
                </IconButton>
                <ListItemText primary="Kategorien" />
              </ListItemButton>
            </ListItem>

            <Collapse in={postTags} timeout="auto" orientation="vertical" unmountOnExit>
              <Box sx={{ pl: 6 }}>
                <TagSelect
                  label={"Beitragkategorien auswählen"}
                  placeholder={"Sport / Werkzeug / ..."}
                  onChange={setPostTagsValue}
                  values={postTagsValue}
                />
              </Box>
            </Collapse>
          </List>
        </Grid>
        <Grid item xs={9}>
          <Posts posts={posts} notFoundText="Keine Beiträge im Marketplace gespeichert." />
        </Grid>
      </Grid>
    </div>
  )
}

export default withAuth(Marketplace)
