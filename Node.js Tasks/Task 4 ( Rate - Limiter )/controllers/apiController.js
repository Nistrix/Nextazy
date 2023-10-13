const apiController = (req, res) => {
  try {
    return res.status(200).json({
      status: "Success",
      message: "Testing a rate-limited API",
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

module.exports = apiController;
