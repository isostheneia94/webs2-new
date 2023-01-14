const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')
const cookieSession = require('cookie-session')
require('./passport-setup');

app.use(cors())

app.use(bodyParser.urlencoded({
    extended: false
}))


app.use(bodyParser.json())

app.use(cookieSession({
    name: 'application-session',
    keys: ['key1', 'key2']
}))

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.send('You are not logged in!'))
app.get('/failed', (req, res) => res.send('You Failed to log on!'))
app.get('/good', isLoggedIn, (req, res) => res.send(`Welcome mr ${req.user.displayName}`))

app.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

app.get('/google/callback', passport.authenticate('google', {
        failureRedirect: '/failed'
    }),
    function (req, res) {
        res.redirect('/good');
    });

app.get('/auth/yandex',
    passport.authenticate('yandex', {
        scope: ['profile', 'email']
    }));

app.get('/yandex/callback',
    passport.authenticate('yandex', {
        failureRedirect: '/failed'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/good');
    });//яндекс не дает почту в 3 лица ,поэтому не работает

app.get('/auth/facebook',
    passport.authenticate('facebook', {
        scope: ['email']
    }));

app.get('/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/failed'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/good');
    });

app.get('/auth/instagram',
    passport.authenticate('instagram'));

app.get('/auth/instagram/callback',
    passport.authenticate('instagram', {
        failureRedirect: '/failde'
    }),//с инстой таже фигня что и с яндексом
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/good');
    });


app.get('/auth/github',
    passport.authenticate('github'));

app.get('/auth/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/good');
    });


app.get('/discord',
    passport.authenticate('discord', {
        scope: ['email']
    }));



app.get('/discord/callback',
    passport.authenticate('discord', {
        failureRedirect: '/failed'
    }),//дискорд вообще ничего не дает , там была ошибка что пользоваетль не найден
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/good');
    });



app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

app.listen(3000, () => console.log(`Example app listening on port ${3000}`))