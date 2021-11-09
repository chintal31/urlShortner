import redis from "redis";
import { promisify } from "util";

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

client.on("connect", () => {
  console.log("Connected to redis client");
});

client.on("error", (err) => {
  console.log("Error " + err);
});

export const hgetAllAsync = promisify(client.hgetall).bind(client);
export const hsetAsync = promisify(client.hset).bind(client);
export const hgetAsync = promisify(client.hget).bind(client);
export const deleteAll = promisify(client.flushdb).bind(client);
