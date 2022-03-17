const passport = require('passport');
const NaverStrategy = require('passport-naver').Strategy;

const User = require('../models/user');

module.exports = () => {
    passport.use(new NaverStrategy({
        clientID: process.env.NAVER_ID,
        clientSecret: process.env.NAVER_SECRET,
        callbackURL: '/auth/naver/callback',
    }, async (accessToken, refreshToken, profile, done) => {
        await User.findOne({
            where: {snsId: profile.id, provider:'naver'}
        }, (error, user) => {
            if (!user){
                user = new User({
                    email: profile.emails[0].value,
                    nickname: profile.displayName,
                    snsId: profile.id,
                    provider: 'naver',
                    //naver: profile._json,
                });
                user.save((error) => {
                    if (error){
                        console.log(error);
                        return done(error, user);
                    }
                });
            }
            else{
                return done(error, user);
            }
        });
    }));
};