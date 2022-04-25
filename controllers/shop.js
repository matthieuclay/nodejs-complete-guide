const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
	Product.findAll()
		.then((products) => {
			res.render('shop/product-list', {
				products,
				pageTitle: 'All products',
				path: '/products',
			});
		})
		.catch((err) => console.error(err));
};

exports.getProduct = (req, res, next) => {
	const productId = req.params.productId;
	Product.findByPk(productId)
		.then((product) => {
			res.render('shop/product-detail', {
				product,
				pageTitle: product.title + ' - $' + product.price,
				path: '/products',
			});
		})
		.catch((err) => console.error(err));

	// Product.findAll({where: {id:productId}})
	// 	.then((products) => {
	// 		res.render('shop/product-detail', {
	// 			product: products[0],
	// 			pageTitle: products[0].title + ' - $' + products[0].price,
	// 			path: '/products',
	// 		});
	// 	})
	// 	.catch((err) => console.error(err));
};

exports.getIndex = (req, res, next) => {
	Product.findAll()
		.then((products) => {
			res.render('shop/index', {
				products,
				pageTitle: 'Shop',
				path: '/',
			});
		})
		.catch((err) => console.error(err));
};

exports.getCart = (req, res, next) => {
	req.user
		.getCart()
		.then((cart) => {
			return cart
				.getProducts()
				.then((products) => {
					res.render('shop/cart', {
						pageTitle: 'Your cart',
						path: '/cart',
						products,
					});
				})
				.catch((err) => console.error(err));
		})
		.catch((err) => console.error(err));
};

exports.postCart = (req, res, next) => {
	const productId = req.body.productId;
	let fetchedCart;
	let newQuantity = 1;
	req.user
		.getCart()
		.then((cart) => {
			fetchedCart = cart;
			return cart.getProducts({ where: { id: productId } });
		})
		.then((products) => {
			let product;
			if (products.length > 0) {
				product = products[0];
			}
			if (product) {
				const oldQuantity = product.cartItem.quantity;
				newQuantity = oldQuantity + 1;
				return product;
			}
			return Product.findByPk(productId);
		})
		.then((product) => {
			return fetchedCart.addProduct(product, {
				through: { quantity: newQuantity },
			});
		})
		.then(() => {
			res.redirect('/cart');
		})
		.catch((err) => console.error(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
	const productId = req.body.productId;
	req.user
		.getCart()
		.then((cart) => {
			return cart.getProducts({ where: { id: productId } });
		})
		.then((products) => {
			const product = products[0];
			return product.cartItem.destroy();
		})
		.then((result) => res.redirect('/cart'))
		.catch((err) => console.error(err));
};

exports.getOrders = (req, res, next) => {
	res.render('shop/orders', {
		pageTitle: 'Your orders',
		path: '/orders',
	});
};

exports.getCheckout = (req, res, next) => {
	res.render('shop/checkout', {
		pageTitle: 'Checkout',
		path: '/checkout',
	});
};
