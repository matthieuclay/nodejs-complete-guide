const fs = require('fs');
const path = require('path');

const p = path.join(
	path.dirname(require.main.filename),
	'data',
	'products.json',
);

const getProductsFromFile = (cb) => {
	fs.readFile(p, (err, data) => {
		if (err) {
			cb([]);
		} else {
			cb(JSON.parse(data));
		}
	});
};

module.exports = class Product {
	constructor(id, title, imgUrl, price, description) {
		this.id = id;
		this.title = title;
		this.imgUrl = imgUrl;
		this.price = price;
		this.description = description;
	}

	save() {
		getProductsFromFile((products) => {
			if (this.id) {
				const existingProductIndex = products.findIndex(
					(product) => product.id === this.id,
				);
				const updatedProducts = [...products];
				updatedProducts[existingProductIndex] = this;
				fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
					console.log(err);
				});
			} else {
				this.id = Math.floor(Math.random() * 1000000000).toString();
				products.push(this);
				fs.writeFile(p, JSON.stringify(products), (err) => {
					console.log(err);
				});
			}
		});
	}

	static fetchAll(cb) {
		getProductsFromFile(cb);
	}

	static findById(id, cb) {
		getProductsFromFile((products) => {
			const product = products.find((p) => p.id === id);
			cb(product);
		});
	}
};
