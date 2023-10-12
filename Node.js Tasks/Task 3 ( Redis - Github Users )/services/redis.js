
const redis = require('redis');

// Creating the Redis client
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: REDIS_PORT,
});

module.exports = client;