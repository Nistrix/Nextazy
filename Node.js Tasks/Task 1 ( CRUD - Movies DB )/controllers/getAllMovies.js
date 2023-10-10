const mongoose = require("mongoose");

const getAllMovies = async (req,res)=>{
    const moviesModel = mongoose.model("Movies");
try{
    const moviesData = await moviesModel.find({});

    res.status(200).json({
        status : 'Success Getting All Records',
       data : moviesData,
    });
}catch(e){
    res.status(200).json({
        status : 'Failed',
       message : e.message,
    });

}
}

module.exports = getAllMovies;