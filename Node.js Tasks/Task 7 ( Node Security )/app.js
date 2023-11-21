const express = require("express");     
const helmet = require("helmet");

const app = express();
app.use(helmet());
const port = 4000;

app.get("/", (req, res) => {
  res.send("Helmet Protection Enabled For Headers!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
