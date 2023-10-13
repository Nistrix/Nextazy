const express = require("express");
const githubRoutes = require("./routes/githubRoutes");

require('dotenv').config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

app.use("/", githubRoutes);

app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
