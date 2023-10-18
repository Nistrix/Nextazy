const express = require("express");
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

// Use the log routes
const logRoutes = require("./routes/logRoutes");
app.use("/", logRoutes);

app.listen(port, () => {
  console.log(`Server connected to Port: ${port} successfully!`);
});
