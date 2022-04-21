const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

module.exports = class Cart {
	static addProduct(id, productPrice) {
		// Fetch the previous cart
		fs.readFile(p, (err, data) => {
			let cart = { products: [], totalPrice: 0 };
			if (!err) {
				cart = JSON.parse(data);
			}
			// Analyze the cart => Find existing product
			const existingProductIndex = cart.products.findIndex(
				(product) => product.id === id,
			);
			const existingProduct = cart.products[existingProductIndex];
			let updateProduct;
			// Add new product / increase quantity
			if (existingProduct) {
				updateProduct = { ...existingProduct };
				updateProduct.quantity = updateProduct.quantity + 1;
				cart.products = [...cart.products];
				cart.products[existingProductIndex] = updateProduct;
			} else {
				updateProduct = {
					id: id,
					quantity: 1,
				};
				cart.products = [...cart.products, updateProduct];
			}
			cart.totalPrice = cart.totalPrice + +productPrice;
			fs.writeFile(p, JSON.stringify(cart), (err) => {
				console.log(err);
			});
		});
	}
};
