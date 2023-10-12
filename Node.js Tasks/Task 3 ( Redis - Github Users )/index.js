const express = require("express");
const axios = require("axios");
const redis = require("redis");

require("dotenv").config();

const port = process.env.PORT || 5000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT);

const app = express();

app.use(express.json());


function setResponse(username, repos) {
  return `${username} has ${repos} Github Public Repos !!`;
}

//Make a request to GitHub for data
async function getRepos(req, res, next) {
  try {
    console.log("Fetching Data..");

    const { username } = req.params;

    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );

    const data = await response.data;

    const repos = data.public_repos;

    //Set data to Redis
    client.setex(username, 3600, repos);

    return res.status(200).json({
      status: "Success",
      message: setResponse(username, repos),
      data: data,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
}

//Cache Middleware
function cache(req, res, next) {
  const { username } = req.params;

  client.get(username, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      res.send(setResponse(username, data));
    } else {
      next();
    }
  });
}

//Routes..
app.get("/repos/:username", cache, getRepos);

app.listen(port, () => {
  console.log(`App is running on port : ${port}`);
});
