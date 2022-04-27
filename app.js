require('dotenv').config();
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();
const store = new MongoDBStore({
	uri: process.env.MONGODB_CONNECT,
	collection: 'sessions',
});

app.set('view engine', 'pug');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
	session({
		secret: 'my secret long string for session',
		resave: false,
		saveUninitialized: false,
		store,
	}),
);

app.use((req, res, next) => {
	User.findById('6267f4c9a043a8d99346c4e6')
		.then((user) => {
			req.user = user;
			next();
		})
		.catch((err) => console.error(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
	.connect(process.env.MONGODB_CONNECT)
	.then((result) => {
		User.findOne().then((user) => {
			if (!user) {
				const user = new User({
					username: 'Matthieu',
					email: 'matthieu@test.com',
					cart: {
						items: [],
					},
				});
				user.save();
			}
		});
		app.listen(3000);
	})
	.catch((err) => console.error(err));
