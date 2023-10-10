const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    movie_name : {
        type : String,
        required : [true,"Movie name is required !"]
    },
    info : {
        type : String,
        required : [true,"Some information is required !"]
    },
    rating : {
        type : Number,
        required : [true,"Please Rate the movie !"]
    }
})


const movieModel = mongoose.model("Movies", movieSchema);

module.exports = movieModel;