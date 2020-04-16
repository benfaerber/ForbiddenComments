const express = require('express');
const session = require('express-session');
const app = express();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//const db = require("./database");
const userController = require('./controllers/user');
const User = require('./models/User');

require('dotenv').config();

app.use('/static', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'luna moon mond',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback/',
    },
    (accessToken, refreshToken, profile, done) => {
      userController.findOrCreate(
        { accessToken, refreshToken, profile },
        (err, user) => {
          return done(err, user);
        }
      );
    }
  )
);

// Home page
app.get('/', (req, res) => {
  if (req.session.passport && req.session.passport.user) {
    console.log(req.user);
  }
  res.render('index');
});

// API
app.get('/user', (req, res) => {
  if (req.user) {
    let json = req.user;
    json['status'] = 'ok';
    res.json(req.user);
  } else {
    res.json({ status: 'not-logged-in' });
  }
});

// Auth
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login'],
  })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  userController.loadUser(user, (err, user) => {
    done(null, user);
  });
});

app.listen(8080);
