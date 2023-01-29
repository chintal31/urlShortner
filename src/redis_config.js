import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS_URL,
});

client.connect();
client.on("connect", () => {
  console.log("Connected to redis client");
});

client.on("error", (err) => {
  console.log("Error " + err);
});

module.exports = { client };
