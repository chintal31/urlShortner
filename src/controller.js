import {
  addUrl,
  isURLValid,
  clearRedis,
  getKey,
  URLNotFoundError,
} from "./services";
import { client } from "./redis_config";

export const urlShortner = async (req, res) => {
  console.log("Incoming request: ", req.body);
  try {
    let { url } = req.body;
    if (!url) return res.status(404).json({ error: "URL required." });
    let isValid = await isURLValid(url);
    if (isValid) {
      let addedUrl = await addUrl(url);
      console.log(
        `Request success, url: ${url} and ${JSON.stringify(addedUrl)}`
      );
      res.status(200).json({ addedUrl });
    }
  } catch (err) {
    console.log(`Error in urlShortner, url - ${req.body.url} , err - ${err}`);
    if (err.name == "URLNotFoundError") {
      return res.status(404).json({ err: err.message });
    }
    return res.status(500).json({ err: err.message });
  }
};

export const redirectToOriginalUrl = async (req, res) => {
  try {
    let { short_url } = req.params;
    let originalUrl = await getKey(short_url);
    if (!originalUrl) return res.json({ error: "Invalid short url." });
    return res.redirect(originalUrl);
  } catch (err) {
    console.log(`Error in redirecting service: ${err}`);
    res.json({ err: " Error in redirecting url." });
  }
};

export const fetchAllUrls = async (req, res) => {
  try {
    let urls = await client.hGetAll("urls");
    urls = urls
      ? Object.entries(urls).map((urlArr) => {
          return { originalUrl: urlArr[0], ...JSON.parse(urlArr[1]) };
        })
      : [];
    return res.status(200).json({ urls });
  } catch (err) {
    console.log(`Error in fetching all urls: ${err}`);
    res.json({ err: " Error in fetching all urls." });
  }
};
export const emptyRedis = async (req, res) => {
  try {
    await clearRedis();
    res.json({ msg: "Deleted all data from redis" });
  } catch (err) {
    console.log(`Error in deleting data : ${err}`);
    res.json({ err: " Error in deleting data. " + err });
  }
};
