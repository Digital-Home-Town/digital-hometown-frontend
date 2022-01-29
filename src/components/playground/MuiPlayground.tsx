import React, { useState } from "react"
import {
  Alert,
  AlertColor,
  AlertTitle,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Stack,
  Switch,
  TextField,
} from "@mui/material"
import { Edit, LocationOn, ShoppingCartRounded } from "@mui/icons-material"
import logo from "../../img/logo.png"
import paellaImg from "../../img/paella.png"
import { styled } from "@mui/material/styles"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Collapse from "@mui/material/Collapse"
import Avatar from "@mui/material/Avatar"
import IconButton, { IconButtonProps } from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import { red } from "@mui/material/colors"
import FavoriteIcon from "@mui/icons-material/Favorite"
import ShareIcon from "@mui/icons-material/Share"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import Container from "@mui/material/Container"

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}))

function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia component="img" height="194" image={paellaImg} alt="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of
          frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken,
            shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp
            to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic,
            tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes.
            Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook without stirring,
            until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without stirring, until mussels have opened and
            rice is just tender, 5 to 7 minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>Set aside off of the heat to let rest for 10 minutes, and then serve.</Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

function ProfileOverview() {
  return (
    <Card>
      <Box sx={{ p: 2, display: "flex" }}>
        <Avatar variant="rounded" src={logo} />
        <Stack spacing={0.5}>
          <Typography fontWeight={700}>Michael Scott</Typography>
          <Typography variant="body2" color="text.secondary">
            <LocationOn /> Scranton, PA
          </Typography>
        </Stack>
        <IconButton>
          <Edit sx={{ fontSize: 14 }} />
        </IconButton>
      </Box>
      <Divider />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 2, py: 1, bgcolor: "background.default" }}
      >
        <Chip label="Active account" />
        <Switch />
      </Stack>
    </Card>
  )
}

function DifferentButtons() {
  return (
    <>
      <Button variant="text" startIcon={<ShoppingCartRounded />}>
        Add to Cart
      </Button>
      <Button variant="contained" startIcon={<ShoppingCartRounded />}>
        Add to Cart
      </Button>
      <Button variant="outlined" startIcon={<ShoppingCartRounded />}>
        Add to Cart
      </Button>
    </>
  )
}

interface ExampleAlertInterface {
  variant: "standard" | "filled" | "outlined" | undefined
  severity: AlertColor
  title: string
  msg: string
}

function ExampleAlert({ variant, severity, title, msg }: ExampleAlertInterface) {
  const [open, setOpen] = useState(true)
  return (
    <>
      {open && (
        <Alert
          severity={severity}
          variant={variant}
          onClose={() => {
            setOpen(false)
          }}
        >
          <AlertTitle>{title}</AlertTitle>
          <div dangerouslySetInnerHTML={{ __html: msg }} />
        </Alert>
      )}
    </>
  )
}

function FormDialog() {
  const [open, setOpen] = React.useState(false)

  function handleClickOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  function handleSubmit() {
    console.log("Submitted")
    setOpen(false)
  }

  return (
    <div style={{ margin: 10 }}>
      <Button variant={"outlined"} onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleSubmit()
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

function MuiPlayground() {
  return (
    <Container maxWidth="lg">
      <ExampleAlert
        variant={"standard"}
        severity={"success"}
        msg={"This is a success alert — <strong>check it out!</strong>"}
        title={"Success"}
      />
      <ProfileOverview />
      <DifferentButtons />
      <FormDialog />
      <RecipeReviewCard />
    </Container>
  )
}

export default MuiPlayground
