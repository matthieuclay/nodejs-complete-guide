const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');

const User = require('../models/user');
const authController = require('../controllers/auth');

describe('auth-controller.js - login', function () {
	it('should throw an error with code 500 if accessing the database fails', function (done) {
		sinon.stub(User, 'findOne');
		User.findOne.throws();

		const req = {
			body: {
				email: 'test@test.com',
				password: 'test123',
			},
		};
		authController
			.login(req, {}, () => {})
			.then((result) => {
				expect(result).to.be.an('error');
				expect(result).to.have.property('statusCode', 500);
				done();
			});

		User.findOne.restore();
	});

	it('should send a response with a valid user status for an existing user', function (done) {
		mongoose
			.connect(process.env.MONGODB_TEST_CONNECT)
			.then(() => {
				const user = new User({
					email: 'test@test.com',
					password: 'test123',
					name: 'test',
					posts: [],
				});
				return user.save();
			})
			.then(() => {})
			.catch((err) => console.error(err));
	});
});
