import React, { useState } from "react";
import Box from "@mui/material/Box";
import DisplayStats from "./stats.js";
import Form from "./form.js";
import { shortUrl, fetchAllUrls } from "../api";

export default function Main() {
  const [urls, setUrls] = useState([]);
  const [shortUrlFailed, setShortUrlFailed] = useState(false);
  const [viewStats, setViewStats] = useState(false);

  const displayStats = async () => {
    const res = await fetchAllUrls();
    if (res.success) setUrls(res.urls);
    else setUrls([]);
    setViewStats(true);
  };
  const showForm = () => {
    setViewStats(false);
  };
  const removePrevError = () => {
    setShortUrlFailed(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let res = await shortUrl(data.get("url"));
    if (res.success) {
      displayStats();
    } else {
      setShortUrlFailed(res.error);
    }
  };

  return (
    <Box sx={{ marginLeft: "auto", width: "60%", marginRight: "auto" }}>
      {!viewStats ? (
        <Form
          onSubmit={handleSubmit}
          showStats={displayStats}
          removePrevError={removePrevError}
          shortUrlFailed={shortUrlFailed}
        />
      ) : (
        <DisplayStats
          stats={urls}
          showForm={showForm}
          removePrevError={removePrevError}
        />
      )}
    </Box>
  );
}
