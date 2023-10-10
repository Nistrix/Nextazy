const express = require("express");

const app = express();

app.use(express.json());

const addMovie = require("./controllers/addMovie");
const getAllMovies = require("./controllers/getAllMovies");
const mongoose = require("mongoose");
const getSingleMovie = require("./controllers/getSingleMovie");
const editMovie = require("./controllers/editMovie");
const deleteMovie = require("./controllers/deleteMovie");

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

//Routes..

app.post("/task-1/movies", addMovie);
app.get("/task-1/movies", getAllMovies);
app.get("/task-1/movies/:movie_id", getSingleMovie);
app.patch("/task-1/movies", editMovie);
app.delete("/task-1/movies/:movie_id", deleteMovie);

app.listen(4000, () => {
  console.log("Server Connected Sucessfully !");
});
