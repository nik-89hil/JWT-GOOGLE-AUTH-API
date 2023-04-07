const express = require("express");
const app = express();
const authRouter = require("./auth");
const passport = require("passport");
const moviesRouter = require("./movies");
const ejs = require("ejs");



require("dotenv").config();
app.use(express.static("/static"));
app.set("view engine",'ejs');

app.use(passport.initialize());

require("./passport");
app.use("/auth",authRouter);
app.use("/movies",passport.authenticate('jwt', { session: false }),moviesRouter);

app.get("/",(req,res)=>{
    res.send("<a href='/movies'>movies list</a>")
})

app.listen(8080,()=>{
    console.log("server started at port no. 8080....")
})