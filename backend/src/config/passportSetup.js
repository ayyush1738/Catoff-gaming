import passport from 'passport';
import TwitterStrategy from 'passport-twitter';
import User from '../models/user.models.js';

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
            callbackURL: "http://localhost:5723/auth/twitter/callback", // Ensure proper callback URL
        },
        async (token, tokenSecret, profile, done) => {
            try {
                let user = await User.findOne({ twitterId: profile.id });
                if (!user) {
                    user = new User({
                        twitterId: profile.id,
                        username: profile.username || profile.displayName, // Twitter username
                        avatar: profile.photos[0].value, // Profile photo URL
                    });
                    await user.save();
                }
                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);
