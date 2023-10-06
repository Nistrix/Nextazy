require('dotenv').config();
const express = require("express");
const itemRoutes = require("./routes/items");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect(process.env.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(express.json()); // Parse JSON request bodies
app.use("/items", itemRoutes);

app.listen(port, () => {
  console.log(`Server started at port http://localhost:${port}`);
});