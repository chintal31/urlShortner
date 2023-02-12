import { nanoid } from "nanoid";
import { client } from "./redis_config";
import axios from "axios";

export const isURLValid = async (newUrl) => {
  try {
    const res = await axios.get(newUrl);
    return res.status === 200;
  } catch (error) {
    if (
      error.toJSON().code === "ENOTFOUND" ||
      error.toJSON().code === "ECONNREFUSED" ||
      error.toJSON().code === "ETIMEDOUT"
    ) {
      console.log(`URLNotFoundError: ${newUrl}`);
      throw new URLNotFoundError(`Cannot find the requested URL`);
    }
    console.log(
      `Error while checking isURLValid: ${newUrl} - ${error.toJSON().message}`
    );
    throw new Error(error.toJSON().message);
  }
};

export const addUrl = async (newUrl) => {
  try {
    let urlExists = await client.hGet("urls", newUrl);
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
    await client.hSet("urls", newUrl, JSON.stringify(urlProp));
    return urlProp;
  } catch (error) {
    console.log(`Error while adding url: ${error}`);
    throw new Error(error.toJSON().message);
  }
};

export const getKey = async (shortUrl) => {
  try {
    let urls = await client.hGetAll("urls");
    if (urls) {
      let origUrls = Object.keys(urls),
        originalUrl;
      for (let origUrl of origUrls) {
        let urlProp = JSON.parse(urls[origUrl]);
        if (urlProp.short_url === shortUrl) {
          urlProp.visited++;
          await client.hSet("urls", origUrl, JSON.stringify(urlProp));
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
    await client.del("urls");
  } catch (err) {
    console.log("Error while deleting keys from redis: ", err);
    throw err;
  }
};

export class URLNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "URLNotFoundError";
  }
}
