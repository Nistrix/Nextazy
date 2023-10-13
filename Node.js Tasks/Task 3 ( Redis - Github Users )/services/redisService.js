const redis = require("redis");
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = redis.createClient(REDIS_PORT);

client.on("error", (err) => {
  console.error("Redis error: " + err);
});

const redisService = {
  set: (key, value, expiration = 3600) => {
    client.setex(key, expiration, value);
  },
  get: (key, callback) => {
    client.get(key, callback);
  },
};

module.exports = redisService;
