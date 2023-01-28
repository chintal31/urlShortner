import {
  urlShortner,
  redirectToOriginalUrl,
  fetchAllUrls,
  emptyRedis,
} from "./controller";

module.exports = (app) => {
  app.post("/url-shortner", urlShortner);
  app.get("/redirect/:short_url", redirectToOriginalUrl);
  app.get("/fetchAllUrls", fetchAllUrls);
  app.delete("/clearDB", emptyRedis);
};
