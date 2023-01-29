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
          Your link will be more remembered than ever before. A short URL is
          beneficial to fit into your portfolio, whether you're communicating
          with prospects offline or online.
        </Typography>
      </Container>
    </Box>
  );
}
