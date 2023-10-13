const axios = require("axios");
const redisService = require("../services/redisService");

class GithubController {
  async getRepos(req, res) {
    try {
      console.log("Fetching Data..");
      const { username } = req.params;
      const response = await axios.get(`https://api.github.com/users/${username}`);
      const data = await response.data;
      const repos = data.public_repos;
      await redisService.set(username, repos);

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
}

function setResponse(username, repos) {
  return `${username} has ${repos} Github Public Repos !!`;
}

module.exports = new GithubController();
