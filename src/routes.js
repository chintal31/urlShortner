import {
  UrlShortner,
  redirectToOriginalUrl,
  fetchAllUrls,
  emptyRedis,
} from "./controller";

module.exports = (app) => {
  app.get("/", (req, res) => res.send("Hello World!"));
  app.post("/url-shortner", UrlShortner);
  app.get("/redirect/:short_url", redirectToOriginalUrl);
  app.get("/fetchAllUrls", fetchAllUrls);
  app.delete("/clearDB", emptyRedis);
};
