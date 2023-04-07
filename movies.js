const express = require("express");
const moviesRouter = express.Router();
const passport = require("passport")

moviesRouter.get("/",(req,res)=>{
    res.json({message:"movies here!!"})

});

module.exports= moviesRouter;