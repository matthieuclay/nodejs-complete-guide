const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
	constructor(username, email, cart, _id) {
		this.username = username;
		this.email = email;
		this.cart = cart; // {items: []}
		this._id = _id;
	}

	save() {
		const db = getDb();
		return db.collection('users').insertOne(this);
	}

	addToCart(product) {
		// const cartProduct = this.cart.items.findIndex(cp => {
		// 	return cp._id === product._id
		// });
		const updatedCart = { items: [{ ...product, quantity: 1 }] };
		const db = getDb();
		return db
			.collection('users')
			.updateOne(
				{ _id: new ObjectId(this._id) },
				{ $set: { cart: updatedCart } },
			);
	}

	static findById(userId) {
		const db = getDb();
		return db
			.collection('users')
			.findOne({ _id: new ObjectId(userId) })
			.then((user) => {
				console.log(user);
				return user;
			})
			.catch((err) => console.error(err));
	}
}

module.exports = User;
