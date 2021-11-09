import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export default function Form(props) {
  function showStats() {
    props.showStats();
  }
  return (
    <Box
      component="form"
      onSubmit={props.onSubmit}
      sx={{ textAlign: "center" }}
    >
      <TextField
        required
        id="outlined-required"
        name="url"
        label="Enter your url here"
        fullWidth
        defaultValue=""
        onKeyPress={props.removePrevError}
      />
      <Button type="submit" variant="contained" sx={{ mt: 3 }}>
        Get ShortURL
      </Button>
      <Button onClick={showStats} variant="contained" sx={{ mt: 3, ml: 2 }}>
        Show Stats
      </Button>
    </Box>
  );
}
