const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwtStrategy = passportJWT.Strategy;
const extractJWT = passportJWT.ExtractJwt;
const USER = require('../models/user.model');
require('dotenv').config();

const jwtOptions = {
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey: process.env.SECRET
};

passport.use(new jwtStrategy(jwtOptions, async(payload,done) => {
    try{
        const user = await USER.findById(payload.id);
        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }

    }catch(error){
        done(error,false);
    }
}));

module.exports = passport;