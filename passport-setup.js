const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook')
const InstagramStrategy = require('passport-instagram').Strategy;
const YandexStrategy = require('passport-yandex').Strategy
const DiscordStrategy = require('passport-discord')
const GihubStrategy = require('passport-github2').Strategy
passport.serializeUser(function (user, done) {
    done(null, user);
})

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
        clientID: '185543948440-2hnkf9pr298kr8esmga0fijmnn1hvkgr.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "http://localhost:3000/google/callback"
    },
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));


passport.use(new GihubStrategy({
    clientID: '68a0754362df78ef537e',
    clientSecret: 'df83a816b5c739139c83bf311bd211e2f8d6ed02',
    callbackURL: "http://localhost:3000/auth/github/callback"
},
// = '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'
function (accessToken, refreshToken, profile, done) {
    console.log(profile)
    return done(null, profile);
}
));

passport.use(new FacebookStrategy({
    clientID: "691114329084552",
    clientSecret: "70c5d79138916d15ec9698e55b2badc7",
    callbackURL: "http://localhost:3000/facebook/callback"
},
function (accessToken, refreshToken, profile, done) {
    console.log(profile)
    return done(null, profile);
}
));
// "keys": {
//     "id": "айди",
//     "secret": "пароль"
// },
// "scope": "login:birthday login:email login:info"
