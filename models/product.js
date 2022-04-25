const getDb = require('../utils/database').getDb;

class Product {
	constructor(title, imgUrl, price, description) {
		this.title = title;
		this.imgUrl = imgUrl;
		this.price = price;
		this.description = description;
	}

	save() {
		const db = getDb();
		return db
			.collection('products')
			.insertOne(this)
			.then((result) => console.log(result))
			.catch((err) => console.error(err));
	}

	static fetchAll() {
		const db = getDb();
		return db
			.collection('products')
			.find()
			.toArray()
			.then((products) => {
				console.log(products);
				return products;
			})
			.catch((err) => console.error(err));
	}
}

module.exports = Product;
