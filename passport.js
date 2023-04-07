const passport = require("passport");
const {users}  = require("./fake_database");


const GoogleStrategy = require('passport-google-oauth20').Strategy;

const  JwtStrategy = require('passport-jwt').Strategy;
const  ExtractJwt = require('passport-jwt').ExtractJwt;

passport.use(new GoogleStrategy({
    clientID: process.env.Google_client_id,
    clientSecret: process.env.Google_client_secret,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    const email = profile?.emails[0]?.value;
    const username = profile?.displayName;

    const userExits = users.some((user)=>{
        return user.email === email;

    });

    if(!userExits){
        return cb(new Error("no such user found in this system"),{})
    }

    return cb(null,{email,username})
  }
));





var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.MY_JWT_SECRET;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(jwt_payload);

    const email =jwt_payload?.email;
    const username= jwt_payload?.username;
    // const username = jwt_payload?.;

    const userExits = users.some((user)=>{
        return user.email === email;

    });

    if(!userExits){
        return done(new Error("no such user found in this system"),false)
    }

    return done(null , {email,username})

}));