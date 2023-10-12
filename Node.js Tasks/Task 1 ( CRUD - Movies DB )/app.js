const express = require('express');
const mongoose = require("mongoose");
const app = express();
const movieRoutes = require("./routes/movieRoutes");

app.use(express.json());

require("dotenv").config();

//Connection..
mongoose
  .connect(process.env.url, {})
  .then(() => {
    console.log("Connection Of MongoDb Successful !");
  })
  .catch(() => {
    console.log("Connection Of MongoDb Failed !");
  });
  
require("./models/movies.model");

app.use("/task-1/movies", movieRoutes);

app.listen(4000, () => {
  console.log("Server Connected Sucessfully !");
});


