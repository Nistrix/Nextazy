
const mongoose = require("mongoose");
const movieModel = require("../models/movies.model");

const addMovie = async (req, res) => {
  //console.log(req.body);

  const { movie_name, info, rating } = req.body;


//Validations..
 try{
//     if(!movie_name) throw "Movie name is required.."
//     if(!info) throw "Info must be provided.."
//    if(!rating) throw "Rating is required.."
    if(rating<1 || rating >10) throw "Rating must be between 1-10.."
 }catch(e){
    res.status(400).json({
        status : "Failed",
        message : e,
    });
    return;
}

//Success response !
try{
await movieModel.create({
  movie_name : movie_name,
  info : info,
  rating : rating
});
}catch(e){
  res.status(400).json({
    status : 'Failed',
    message : e.message
  });
  return;

}

  res.status(200).json({
    status: "Success",
    message: "Movie Added Successfully :)",

    // movie_name : movie_name,
    // info : info,
    // rating : rating
  });
};

module.exports = addMovie;
