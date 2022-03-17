const passport = require('passport');
const { INSERT } = require('sequelize/types/query-types');
const TwitterStrategy = require('passport-twitter').Strategy;

const User = require('../models/user');

module.exports = () => {

    passport.use(new TwitterStrategy({
        consumerKey: TWITTER_CONSUMER_KEY,
        consumerSecret:TWITTER_CONSUMER_SECRET,
        callbackURL: '/auth/twitter',
    }, async (token, tokenSecret, profile, done) => {
        User.findOrCreate({ twitterId: profile.id}, (err, user) => {
            return done(err, user);
        });
    }));

};
