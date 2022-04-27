const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
	res.render('auth/login', {
		pageTitle: 'Login',
		path: '/login',
		isAuthenticated: false,
	});
};

exports.getSignup = (req, res, next) => {
	res.render('auth/signup', {
		pageTitle: 'Signup',
		path: '/signup',
		isAuthenticated: false,
	});
};

exports.postLogin = (req, res, next) => {
	User.findById('6267f4c9a043a8d99346c4e6')
		.then((user) => {
			req.session.isLoggedIn = true;
			req.session.user = user;
			req.session.save(() => {
				res.redirect('/');
			});
		})
		.catch((err) => console.error(err));
};

exports.postSignup = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	const confirmPassword = req.body.confirmPassword;
	User.findOne({ email })
		.then((userDoc) => {
			if (userDoc) {
				return res.redirect('/signup');
			}
			return bcrypt
				.hash(password, 12)
				.then((hashedPassword) => {
					const user = new User({
						email,
						password: hashedPassword,
						cart: { items: [] },
					});
					return user.save();
				})
				.then(() => {
					res.redirect('/login');
				});
		})

		.catch((err) => console.error(err));
};

exports.postLogout = (req, res, next) => {
	req.session.destroy(() => {
		res.redirect('/');
	});
};
