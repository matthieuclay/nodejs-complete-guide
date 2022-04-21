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
			let updatedProduct;
			// Add new product / increase quantity
			if (existingProduct) {
				updatedProduct = { ...existingProduct };
				updatedProduct.quantity = updatedProduct.quantity + 1;
				cart.products = [...cart.products];
				cart.products[existingProductIndex] = updatedProduct;
			} else {
				updatedProduct = {
					id: id,
					quantity: 1,
				};
				cart.products = [...cart.products, updatedProduct];
			}
			cart.totalPrice = cart.totalPrice + +productPrice;
			fs.writeFile(p, JSON.stringify(cart), (err) => {
				console.log(err);
			});
		});
	}

	static deleteProduct(id, productPrice) {
		fs.readFile(p, (err, data) => {
			if (err) {
				return;
			}
			const updatedCart = { ...JSON.parse(data) };
			const product = updatedCart.products.find(
				(product) => product.id === id,
			);
			if (!product) {
				return;
			}
			const productQuantity = product.quantity;
			updatedCart.products = updatedCart.products.filter(
				(product) => product.id !== id,
			);
			updatedCart.totalPrice =
				updatedCart.totalPrice - productPrice * productQuantity;

			fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
				console.log(err);
			});
		});
	}

	static getCart(cb) {
		fs.readFile(p, (err, data) => {
			const cart = JSON.parse(data);
			if (err) {
				cb(null);
			} else {
				cb(cart);
			}
		});
	}
};
