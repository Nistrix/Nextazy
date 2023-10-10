const mongoose = require("mongoose");

const editMovie = async (req, res) => {
  const moviesModel = mongoose.model("Movies");
  const { movie_id, movie_name, info, rating } = req.body;

try{
  if(!movie_id) throw "Check movie_id ?"
}catch(e){
  res.status(400).json({
    status : "Failed",
    message : e
  });
  return;
}
  try{
  await moviesModel.updateOne({
    _id: movie_id,
  }, {
    movie_name : movie_name,
    info : info,
    rating : rating,
  }, {
    runValidators : true,
  });
}catch(e){
  res.status(400).json({
    status : "Failed",
    message : e.message,
  });
  return;
}

  res.status(200).json({
    status: "Successful !",
    message : "Movie Updated Successfully !"
  });

};

module.exports = editMovie;
