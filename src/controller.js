import { addUrl, isURLValid, clearRedis, getKey } from "./services";
import { hgetAllAsync } from "./redis_config";

export const UrlShortner = async (req, res) => {
  try {
    let { url } = req.body;
    if (!url) return res.status(404).json({ error: "URL required." });
    let isValid = await isURLValid(url);
    if (isValid) {
      let addedUrl = await addUrl(url);
      res.status(200).json({ addedUrl });
    }
  } catch (err) {
    console.log(`Error in urlShortner service: ${err}`);
    return res.status(404).json({ err });
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
    let urls = await hgetAllAsync("urls");
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
    res.json({ err: " Error in deleting data." });
  }
};
