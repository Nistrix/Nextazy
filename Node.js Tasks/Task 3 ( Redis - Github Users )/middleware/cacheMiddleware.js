const redisService = require("../services/redisService");

async function cache(req, res, next) {
  const { username } = req.params;

  try{redisService.get(username, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      res.status(200).json({
        status: "Cache Success",
        message: `${username} has ${data} Github Public Repos !!`,
      });
    } else {
      next();
    }
  });
  }catch(err) {
    // Handle any other potential errors
    console.error(err);
    return res.status(500).json({
      status: "Error",
      message: "An error occurred in the cache middleware.",
    });
  }
  
}

module.exports = cache;

