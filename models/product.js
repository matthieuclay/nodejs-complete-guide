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
	constructor(title, imgUrl, price, description) {
		this.title = title;
		this.imgUrl = imgUrl;
		this.price = price;
		this.description = description;
	}

	save() {
		this.id = Math.floor(Math.random() * 1000000000).toString();
		getProductsFromFile((products) => {
			products.push(this);
			fs.writeFile(p, JSON.stringify(products), (err) => {
				console.log(err);
			});
		});
	}

	static fetchAll(cb) {
		getProductsFromFile(cb);
	}
};
