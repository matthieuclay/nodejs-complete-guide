const User = require('../models/user');

exports.getLogin = (req, res, next) => {
	// const isLoggedIn =
	// 	req.get('Cookie').split(';')[0].trim().split('=')[1] === 'true';
	console.log(req.session.isLoggedIn);
	res.render('auth/login', {
		pageTitle: 'Login',
		path: '/login',
		isAuthenticated: false,
	});
};

exports.postLogin = (req, res, next) => {
	User.findById('6267f4c9a043a8d99346c4e6')
		.then((user) => {
			req.session.isLoggedIn = true;
			req.session.user = user;
			res.redirect('/');
		})
		.catch((err) => console.error(err));
};

exports.postLogout = (req, res, next) => {
	req.session.destroy(() => {
		res.redirect('/');
	});
};
