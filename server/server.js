const express = require('express');
const session = require('express-session');
const app = express();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const userController = require('./controllers/user');
const youtubeController = require('./controllers/youtube');
const commentController = require('./controllers/comment');
const User = require('./models/User');

require('dotenv').config();

console.log('Forbidden Comments NodeJS');
console.log('Ben Faerber 2020');

app.use('/static', express.static('static'));
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
	res.render('index');
});

// Comment
app.get('/comment', async (req, res) => {
	const response = await commentController.makeComment(req.query, req.user);
	res.json(response);
});

app.get('/editComment', async (req, res) => {
	const response = await commentController.editComment(req.query, req.user);
	res.json(response);
});

app.get('/deleteComment', async (req, res) => {
	const response = await commentController.deleteComment(
		req.query.id,
		req.user
	);
	res.json(response);
});

app.get('/likeComment', async (req, res) => {
	const { id, action } = req.query;
	if (!req.user || !id || !action) {
		res.json({ status: 'bad' });
		return;
	}

	const isPossible = ['like', 'unlike', 'dislike', 'undislike'].find(
		(elem) => action === elem
	);
	if (!isPossible) {
		res.json({ status: 'bad' });
		return;
	}

	const success = commentController.likeComment(id, req.user, action);
	res.json({ status: success ? 'ok' : 'bad' });
});

app.get('/dummyData', async (req, res) => {
	//commentController.fillDummyData(50);
	res.end('bye!');
});

// Youtube API and init comments
app.get('/load', async (req, res) => {
	const { v } = req.query;

	if (v) {
		youtubeController.getVideo(v, async (vid) => {
			vid['status'] = 'ok';

			const { comments, isDone } = await commentController.getParentComments(
				v,
				0
			);
			res.json({
				video: vid,
				comments: comments,
				isDone: isDone,
			});
		});
	} else {
		res.json({ status: 'error' });
	}
});

// Comment loading
app.get('/loadCommentChunk', async (req, res) => {
	const { v, c } = req.query;
	if (!v) {
		res.json({ status: 'bad' });
		return;
	}

	if (!c) {
		c = 0;
	}

	const { comments, isDone } = await commentController.getParentComments(v, c);
	if (comments) {
		res.json({
			comments: comments,
			isDone: isDone,
		});
	} else {
		res.json({ status: 'none' });
	}
});

app.get('/loadChildComments', async (req, res) => {
	const { c } = req.query;
	if (!c) {
		res.json({ status: 'bad' });
		return;
	}

	const comments = await commentController.getChildComments(c);
	if (comments) {
		res.json({ comments });
	} else {
		res.json({ status: 'bad' });
	}
});

// User Data
app.get('/user', (req, res) => {
	if (req.user) {
		let json = req.user;
		json['status'] = 'ok';
		res.json(req.user);
	} else {
		res.json(userController.anon());
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

app.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	userController.loadUser(user, (err, user) => {
		done(null, user);
	});
});

app.listen(8080);
