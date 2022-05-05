const expect = require('chai').expect;

const authMiddleware = require('../middleware/is-auth');

describe('auth-middleware.js', function () {
	it('should throw an error if no authorization header is present', function () {
		const req = {
			get: function () {
				return null;
			},
		};
		expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
			'Not authenticated.',
		);
	});

	it('should throw an error if the authorization header is only one string', function () {
		const req = {
			get: function () {
				return 'azerty';
			},
		};
		expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
	});

	it('should throw an error if the token cannot be verified', function () {
		const req = {
			get: function () {
				return 'Bearer abc';
			},
		};
		expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
	});

	it('should yield a userId after decoding the token', function () {
		const req = {
			get: function () {
				return 'Bearer abc';
			},
		};
		authMiddleware(req, {}, () => {});
		expect(req).to.have.property('userId');
	});
});
