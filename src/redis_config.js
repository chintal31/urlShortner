import { createClient } from "redis";

const client = createClient();

client.connect();
client.on("connect", () => {
  console.log("Connected to redis client");
});

client.on("error", (err) => {
  console.log("Error " + err);
});

module.exports = { client };
