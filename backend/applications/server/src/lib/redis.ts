import redis from "redis";
import config from "@unijobs/backend-modules-config";

const client = redis.createClient(config.get("redis_url"));

export default client;
