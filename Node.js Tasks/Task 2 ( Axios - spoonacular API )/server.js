const express = require("express");
const app = express();
const recipeRoutes = require('./routes/recipeRoutes');

// Enable JSON parsing for incoming requests
app.use(express.json());

// Use recipeRoutes
app.use('/', recipeRoutes);

app.listen(3000,()=>{
    console.log("Server connected successfully !");
});