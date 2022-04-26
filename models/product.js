const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	imgUrl: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

module.exports = mongoose.model('Product', productSchema);

// const mongodb = require('mongodb');
// const getDb = require('../utils/database').getDb;

// class Product {
// 	constructor(title, imgUrl, price, description, _id, userId) {
// 		this.title = title;
// 		this.imgUrl = imgUrl;
// 		this.price = price;
// 		this.description = description;
// 		this._id = _id ? new mongodb.ObjectId(_id) : null;
// 		this.userId = userId;
// 	}

// 	save() {
// 		const db = getDb();
// 		let dbOp;
// 		if (this._id) {
// 			// update the product
// 			dbOp = db
// 				.collection('products')
// 				.updateOne({ _id: this._id }, { $set: this });
// 		} else {
// 			dbOp = db.collection('products').insertOne(this);
// 		}

// 		return dbOp
// 			.then((result) => console.log(result))
// 			.catch((err) => console.error(err));
// 	}

// 	static fetchAll() {
// 		const db = getDb();
// 		return db
// 			.collection('products')
// 			.find()
// 			.toArray()
// 			.then((products) => {
// 				return products;
// 			})
// 			.catch((err) => console.error(err));
// 	}

// 	static findById(productId) {
// 		const db = getDb();
// 		return db
// 			.collection('products')
// 			.find({ _id: new mongodb.ObjectId(productId) })
// 			.next()
// 			.then((product) => {
// 				return product;
// 			})
// 			.catch((err) => console.error(err));
// 	}

// 	static deleteById(productId) {
// 		const db = getDb();
// 		return db
// 			.collection('products')
// 			.deleteOne({ _id: new mongodb.ObjectId(productId) })
// 			.then(() => console.log('Deleted'))
// 			.catch((err) => console.error(err));
// 	}
// }

// module.exports = Product;
