const mongoose = require("mongoose");

const deleteMovie = async (req,res)=>{

    const moviesModel = mongoose.model("Movies");

    const movie_id = req.params.movie_id;

    const getMovie = await moviesModel.findOne({
        _id: movie_id,
    });

    try{
    if(!getMovie) throw "No such movie exist to perform deletion !!";
    }catch(e){
        res.status(400).json({
            status : "Failed",
            message : e,
        });
        return;
    }

    try{

       await moviesModel.deleteOne({
            _id : movie_id,
        })
       
    }catch(e){
        res.status(400).json({
            status : "Failed",
            message : e.message,

        });
        return;
    }

     res.status(200).json({
        status : "Success",
    message : " Movie has been Deleted !"     })

};

module.exports = deleteMovie;