import { Edit } from "@mui/icons-material"
import { Avatar, Button, Card, CardContent, Chip, Grid, IconButton, Typography, Stack } from "@mui/material"
import Box from "@mui/material/Box"
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { Person } from "@mui/icons-material"
import Dialog from '@mui/material/Dialog';

import { useEffect, useRef, useState } from "react"
import { AuthContextI } from "src/auth/AuthContext"
import withAuth from "src/auth/withAuth"
import ProfilePicture from "./ProfilePicture"
//import Editable from "./Editable";
import MultilineEdit from "./EditDialog";

function UserProfile({ profile, currentUser }: ProfileProps<User> & AuthContextI) {
  const [interests, setInterests] = useState<string[]>(profile?.interests || [])
  const [image, setImage] = useState<string>(profile?.photoURL || "")
  const [desc, setDesc] = useState<string>(profile?.desc || "")
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const inputRef = useRef();
  const [task, setTask] = useState("");


  const handleAddItem = () => {
    console.info('You clicked the Chip.');
  };

  const handleDeleteItem = (id:number) => {
    const newList = [...interests];
    newList.splice(id, 1);
    setInterests(newList);
    console.info('You clicked the delete icon.');
  };

  const handleEditDesc = () => {
    console.log("a")
  };

  // PROFILE
  return <Card>
    <Grid container spacing={-2}>
      <Grid item xs={12}>
        <Stack direction="row" spacing={0.5} justifyContent="end">
          <Button variant="contained">Details</Button>
          <Button variant="contained">Folgen</Button>
          <Button variant="outlined">Ausblenden</Button>
        </Stack>
      </Grid>

      <Grid item xs={2}>
        {/* <ProfilePicture profile={profile || undefined} size={128} /> */}
        <Avatar
          alt="profile-picture"
          src={image}
          sx={{ height: 128, width: 128 }}
          variant="rounded">
          {!image && <Person fontSize="large"/>}
        </Avatar>
        <div>
          <label htmlFor="file-input"><EditIcon/></label>
          <input
            style={{ display: "none" }}
            id="file-input"
            type="file"
            accept="image/*"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setImage(URL.createObjectURL(e.target.files![0]))}}
          />
          <ClearIcon onClick={() => {setImage("")}}/>
        </div>
      </Grid>

      <Grid container item xs={10}>
        <Grid item lg={12} xs={12}>
          {/*Name*/}
          <Typography variant="h6" gutterBottom>
            {profile?.displayName || "Kein Name"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {/*Intessen*/}
          <Typography variant="body1" gutterBottom>
            Intessen:{" "}
            <Typography variant="body2" gutterBottom>
            {interests.map((item, i) => (
              <Chip key={i} label={item} onDelete={() => handleDeleteItem(i)} />
            ))}

            <Chip label="Add" variant="outlined" onClick={handleAddItem} />
            </Typography>
          </Typography>
          <Grid item xs={12}>
            {/*Beschreibung*/}
            <Typography variant="body1" gutterBottom>
              Beschreibung:{" "} <br/>
              <Typography variant="body2" gutterBottom onMouseEnter={handleEditDesc}>
              {desc}
              </Typography>
            </Typography>

{/*             <Dialog open={dialogOpen} onClose={handleClose}>
              <DialogTitle>Subscribe</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To subscribe to this website, please enter your email address here. We
                  will send updates occasionally.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email Address"
                  type="email"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Subscribe</Button>
              </DialogActions>
            </Dialog> */}

          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Card>;
}

// function UserProfile({ profile, currentUser }: ProfileProps<User> & AuthContextI) {
//   const [editable, setEditable] = useState<boolean>(false)
//   const [mouseOverAvatar, setMouseOverAvatar] = useState<boolean>(false)

//   useEffect(() => {
//     if (currentUser && profile && currentUser.id === profile?.id) {
//       setEditable(true)
//     }
//   }, [currentUser, profile])

//   return (
//     <Box sx={{ mt: 1 }}>
//       <Card>
//         <CardContent>
//           <Grid container>
//             <Grid textAlign="center">
//               <IconButton
//                 onMouseOver={() => {
//                   setMouseOverAvatar(true)
//                   setTimeout(() => {
//                     setMouseOverAvatar(false)
//                   }, 1000)
//                 }}
//               >
//                 {mouseOverAvatar && editable ? (
//                   <Edit sx={{ height: "128px", width: "128px" }} />
//                 ) : (
//                   <ProfilePicture profile={profile || undefined} size={128} />
//                 )}
//               </IconButton>
//               <Typography variant="h6" gutterBottom>
//                 {profile?.displayName || "Kein Name"}
//               </Typography>
//             </Grid>
//             <Grid>
//               <Typography variant="body1" gutterBottom>
//                 Email: {profile?.email || "Keine Email"}
//               </Typography>
//               <Typography variant="body1" gutterBottom>
//                 Alter: {profile?.age || "Kein Alter angegeben"}
//               </Typography>
//               <Typography variant="body1" gutterBottom>
//                 Intessen:{" "}
//                 {(profile?.interests || []).map((interest, i) => (
//                   <Chip key={i} label={interest.name} />
//                 ))}
//               </Typography>
//             </Grid>
//           </Grid>

//           {/* {editable && <EditButton small={true} onClick={() => {}} />} */}
//         </CardContent>
//       </Card>
//     </Box>
//   )
// }

export default withAuth(UserProfile)
