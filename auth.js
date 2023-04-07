const express = require("express");
const authRouter = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken")


authRouter.get("/login",(req,res)=>{
    res.render("login",{})

})

authRouter.get("/google", passport.authenticate('google',
 { scope: ['profile','email'] ,session:false })
)

authRouter.get("/google/callback",
passport.authenticate('google', { failureRedirect: '/auth/login',session:false }),
async (req,res)=>{

    const token = await jwt.sign(req.user,process.env.MY_JWT_SECRET)
    // console.log(req.user);
    res.render("login_success",{token:token})
})

module.exports = authRouter;