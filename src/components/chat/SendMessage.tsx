import { Box, Button, TextField } from "@mui/material"
import classes from "./SendMessage.module.css"

function SendMessage() {
  return (
    <Box className={classes.sendMsgContainer}>
      <TextField
        id="outlined-textarea"
        placeholder="Verfasse eine Nachricht..."
        variant={"outlined"}
        multiline
        name="value"
        fullWidth={true}
      />
      <Button color="primary" type="submit">
        Send
      </Button>
    </Box>
  )
}

export default SendMessage
