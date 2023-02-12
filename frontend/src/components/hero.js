import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function Hero() {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Give nickname to your long web address with ease!
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          paragraph
        >
          Your affiliate link or your portfolio link is too long ? You want to
          make it shorter? URL Shortener is at your service! Just enter your
          long URL and get a short URL. When user clicks it, they will be
          redirected to original link. Tada!!
        </Typography>
      </Container>
    </Box>
  );
}
