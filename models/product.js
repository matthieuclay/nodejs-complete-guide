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

	save() {}

	static deleteById(id) {}

	static fetchAll() {
		return db.execute('SELECT * FROM products');
	}

	static findById(id) {}
};
