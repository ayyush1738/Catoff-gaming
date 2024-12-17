import passport from 'passport';
import TwitterStrategy from 'passport-twitter'
import User from '../models/user.models.js'

// Serialize and Deserialize User
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => done(null, user));
});


// Twitter OAuth Strategy
passport.use(
    new TwitterStrategy(
        {
            consumerKey: process.env.TWITTER_CONSUMER_KEY,
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
            callbackURL: "/auth/twitter/callback",
        },
        async (token, tokenSecret, profile, done) => {
            let user = await User.findOne({ twitterId: profile.id });
            if (!user) {
                user = await new User({
                    twitterId: profile.id,
                    name: profile.displayName,
                    photo: profile.photos[0].value,
                }).save();
            }
            return done(null, user);
        }
    )
);
