const db = require('../utils/database');

const Cart = require('./cart');

module.exports = class Product {
	constructor(id, title, imgUrl, price, description) {
		this.id = id;
		this.title = title;
		this.imgUrl = imgUrl;
		this.price = price;
		this.description = description;
	}

	save() {
		return db.execute(
			'INSERT INTO products (title, imgUrl, price, description) VALUES (?, ?, ?, ?)',
			[this.title, this.imgUrl, this.price, this.description],
		);
	}

	static deleteById(id) {}

	static fetchAll() {
		return db.execute('SELECT * FROM products');
	}

	static findById(id) {
		return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
	}
};
