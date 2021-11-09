import { nanoid } from "nanoid";
import { hgetAllAsync, hsetAsync, hgetAsync, deleteAll } from "./redis_config";
import urlExists from "url-exists";

export const isURLValid = async (newUrl) => {
  try {
    return new Promise((resolve, reject) => {
      urlExists(newUrl, (err, exists) => {
        if (exists) resolve(exists);
        else reject("Invalid url. Kindly check the format.");
      });
    });
  } catch (error) {
    console.log(`Error while checking url: ${error}`);
    return false;
  }
};

export const addUrl = async (newUrl) => {
  try {
    let urlExists = await hgetAsync("urls", newUrl);
    let urlProp;
    if (urlExists) {
      urlProp = JSON.parse(urlExists);
      urlProp.shortenedAttempt++;
    } else {
      let short_url = "https://sho.rt/" + nanoid(5);
      urlProp = {
        short_url,
        visited: 0,
        shortenedAttempt: 1,
      };
    }
    await hsetAsync("urls", newUrl, JSON.stringify(urlProp));
    let urls = await hgetAllAsync("urls");
    return urlProp;
  } catch (error) {
    console.log(`Error while adding url: ${error}`);
    throw error;
  }
};

export const getKey = async (shortUrl) => {
  try {
    let urls = await hgetAllAsync("urls");
    if (urls) {
      let origUrls = Object.keys(urls),
        originalUrl;
      for (let origUrl of origUrls) {
        let urlProp = JSON.parse(urls[origUrl]);
        if (urlProp.short_url === shortUrl) {
          urlProp.visited++;
          await hsetAsync("urls", origUrl, JSON.stringify(urlProp));
          originalUrl = origUrl;
        }
      }
      return originalUrl;
    } else {
      return null;
    }
  } catch (err) {
    console.log("Error while fetching key: ", err);
    throw err;
  }
};

export const clearRedis = async () => {
  try {
    await deleteAll();
  } catch (err) {
    console.log("Error while deleting keys from redis: ", err);
  }
};
