import React, { useEffect, useState } from "react"

import { Event, ExpandLess, ExpandMore, Group, Info, Store, Tag } from "@mui/icons-material"
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

import { AuthContextI } from "src/auth/AuthContext"
import withAuth from "src/auth/withAuth"
import DatePicker from "../general/input/DatePicker2"
import TagSelect from "../general/input/TagSelect"
import Posts from "./Posts"
import Users from "./Users"
import userService from "src/services/UserService"

function Marketplace({ currentUser, posts }: AuthContextI) {
  // Settings
  const [searchPosts, setSearchPosts] = useState(true)
  // Settings - Posts
  const [openCreator, setOpenCreator] = useState(false)
  const [postCreatorPerson, setPostCreatorPerson] = useState<boolean>(true)
  const [postCreatorClub, setPostCreatorClub] = useState<boolean>(true)

  const [postMarket, setPostMarket] = useState<boolean>(false)
  const [postMarketOffer, setPostMarketOffer] = useState<boolean>(true)
  const [postMarketDemand, setPostMarketDemand] = useState<boolean>(true)

  const [postInfo, setPostInfo] = useState<boolean>(false)

  const [postEvent, setPostEvent] = useState<boolean>(false)
  const [postEventStart, setPostEventStart] = useState<Date>(new Date())
  const [postEventEnd, setPostEventEnd] = useState<Date>(
    new Date(postEventStart.getTime() + 1000 * 60 * 60 * 24 * 365 * 2),
  )
  // Settings - Users
  const [users, setUsers] = useState<GenericProfile[]>([])
  // Settings - Posts & Users
  const [itemTags, setItemTags] = useState<boolean>(false)
  const [itemTagsValue, setItemTagsValue] = useState<string[]>([])
  const [filteredItems, setFilteredItems] = useState<Post[] | User[]>([])

  useEffect(() => {
    if (searchPosts) {
      let allPosts = posts.filter((post) => post?.author?.id !== currentUser?.id)
      if (!(postCreatorPerson && postCreatorClub)) {
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
        tempPosts = tempPosts.filter((post) => {
          if (post.eventDate)
            return post.eventDate >= postEventStart.getTime() && post.eventDate <= postEventEnd.getTime()
          else return false
        })
        filteredPosts = [...filteredPosts, ...tempPosts]
      }
      if (!postInfo && !postEvent && !postMarket) {
        filteredPosts = allPosts
      }
      // tags (and)
      if (itemTags && itemTagsValue.length) {
        filteredPosts = filteredPosts.filter(
          (post) => post?.tags.filter((tag) => itemTagsValue.includes(tag)).length > 0,
        )
      }

      filteredPosts = orderBy(filteredPosts, ["created"], ["desc"])

      setFilteredItems(filteredPosts)
    } else {
      let filteredUsers: GenericProfile[] = []

      if (users.length === 0) {
        userService.getAll().then((users: GenericProfile[]) => {
          setUsers(users.filter((user) => user.id !== currentUser?.id))
        })
      }

      if (itemTags && itemTagsValue.length) {
        filteredUsers = users.filter(
          (user) => user?.interests && user?.interests.filter((tag) => itemTagsValue.includes(tag)).length > 0,
        )
      } else {
        filteredUsers = [...users]
      }

      filteredUsers = orderBy(filteredUsers, ["displayName"])
      setFilteredItems(filteredUsers)
    }
  }, [
    searchPosts,
    posts,
    currentUser,
    postCreatorPerson,
    postCreatorClub,
    postMarket,
    postMarketOffer,
    postMarketDemand,
    postInfo,
    postEvent,
    postEventStart,
    postEventEnd,
    itemTags,
    itemTagsValue,
    users,
  ])

  const [searchTypes, setSearchTypes] = React.useState(() => ["posts"])
  const [creators, setCreator] = React.useState(() => ["person", "club"])
  const [marketAdds, setMarketAdds] = React.useState(() => ["demand", "offer"])

  // use effect when start date changes
  useEffect(() => {
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

    if (grp === "searchtype") {
      if (newChange !== null && newChange.length) {
        setFilteredItems([])
        if (id === "posts") {
          setSearchPosts(true)
        } else if (id === "people") {
          setSearchPosts(false)
        }
        setSearchTypes([id])
      }
    } else if (grp === "creator") {
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
            <ToggleButtonGroup sx={{ pl: 6 }} value={searchTypes} size="small" onChange={handleChange}>
              <ToggleButton id="searchtype.posts" value="posts">
                Beitrag
              </ToggleButton>
              <ToggleButton id="searchtype.people" value="people">
                Person
              </ToggleButton>
            </ToggleButtonGroup>
            {searchPosts ? (
              <>
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
                  secondaryAction={
                    <Checkbox edge="end" checked={postMarket} onClick={() => setPostMarket(!postMarket)} />
                  }
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
              </>
            ) : (
              ""
            )}
            <ListItem
              secondaryAction={<Checkbox edge="end" checked={itemTags} onClick={() => setItemTags(!itemTags)} />}
              disablePadding
            >
              <ListItemButton onClick={() => setItemTags(!itemTags)}>
                <IconButton>
                  <Tag />
                </IconButton>
                <ListItemText primary="Kategorien" />
              </ListItemButton>
            </ListItem>

            <Collapse in={itemTags} timeout="auto" orientation="vertical" unmountOnExit>
              <Box sx={{ pl: 6 }}>
                <TagSelect
                  label={"Beitragkategorien auswählen"}
                  placeholder={"Sport / Werkzeug / ..."}
                  onChange={setItemTagsValue}
                  values={itemTagsValue}
                />
              </Box>
            </Collapse>
          </List>
        </Grid>
        <Grid item xs={9}>
          {searchPosts ? (
            <Posts
              posts={filteredItems as Post[]}
              notFoundText="Keine Beiträge im Marktplatz für deine aktuellen Filter."
            />
          ) : (
            <Users
              users={filteredItems as User[]}
              notFoundText="Keine Mitglieder im Marktplatz für deine aktuellen Filter."
            />
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default withAuth(Marketplace)
