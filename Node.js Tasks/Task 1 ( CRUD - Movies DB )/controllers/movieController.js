 const mongoose = require("mongoose");
 const movieModel = require("../models/movies.model");


class MovieController {
    async addMovie(req, res) {
      try {
        const { movie_name, info, rating } = req.body;
  
        // Validations..
        if (rating < 1 || rating > 10) {
          throw new Error("Rating must be between 1-10.");
        }
  
        // Success response!
        await movieModel.create({
          movie_name : movie_name,
          info : info,
          rating : rating,
        });
  
        res.status(200).json({
          status: "Success",
          message: "Movie Added Successfully :)",
        });
      } catch (e) {
        res.status(400).json({
          status: "Failed",
          message: e.message,
        });
      }
    }
  
    async getAllMovies(req, res) {
      try {
        const moviesData = await movieModel.find({});
  
        res.status(200).json({
          status: "Success Getting All Records",
          data: moviesData,
        });
      } catch (e) {
        res.status(400).json({
          status: "Failed",
          message: e.message,
        });
      }
    }
  
    async getSingleMovie(req, res) {
      try {
        const moviesData = await movieModel.findOne({
          _id: req.params.movie_id,
        });
  
        if (!moviesData) {
          throw new Error("No such movie exists!");
        }
  
        res.status(200).json({
          status: "Success Getting Individual Record",
          data: moviesData,
        });
      } catch (e) {
        res.status(400).json({
          status: "Failed",
          message: e.message,
        });
      }
    }
  
    async editMovie(req, res) {
      try {
        const { movie_id, movie_name, info, rating } = req.body;
  
        if (!movie_id) {
          throw new Error("Check movie_id?");
        }
  
        await movieModel.updateOne(
          {
            _id: movie_id,
          },
          {
            movie_name : movie_name,
            info : info,
            rating : rating,
          },
          {
            runValidators: true,
          }
        );
  
        res.status(200).json({
          status: "Successful!",
          message: "Movie Updated Successfully!",
        });
      } catch (e) {
        res.status(400).json({
          status: "Failed",
          message: e.message,
        });
      }
    }
  
    async deleteMovie(req, res) {
      try {
        const movie_id = req.params.movie_id;
  
        const getMovie = await movieModel.findOne({
          _id: movie_id,
        });
  
        if (!getMovie) {
          throw new Error("No such movie exists to perform deletion!");
        }
  
        await movieModel.deleteOne({
          _id: movie_id,
        });
  
        res.status(200).json({
          status: "Success",
          message: "Movie has been Deleted!",
        });
      } catch (e) {
        res.status(400).json({
          status: "Failed",
          message: e.message,
        });
      }
    }
  }
  
  module.exports = new MovieController();
  