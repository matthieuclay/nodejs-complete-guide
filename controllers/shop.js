const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
	Product.find()
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
	Product.findById(productId)
		.then((product) => {
			res.render('shop/product-detail', {
				product,
				pageTitle: product.title + ' - $' + product.price,
				path: '/products',
			});
		})
		.catch((err) => console.error(err));
};

exports.getIndex = (req, res, next) => {
	Product.find()
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
		.populate('cart.items.productId')
		.then((user) => {
			const products = user.cart.items;
			res.render('shop/cart', {
				pageTitle: 'Your cart',
				path: '/cart',
				products,
			});
		})
		.catch((err) => console.error(err));
};

exports.postCart = (req, res, next) => {
	const productId = req.body.productId;
	Product.findById(productId)
		.then((product) => {
			return req.user.addToCart(product);
		})
		.then((result) => {
			console.log(result);
			res.redirect('/cart');
		});
};

exports.postCartDeleteProduct = (req, res, next) => {
	const productId = req.body.productId;
	req.user
		.removeFromCart(productId)
		.then((result) => res.redirect('/cart'))
		.catch((err) => console.error(err));
};

exports.postOrder = (req, res, next) => {
	req.user
		.addOrder()
		.then((result) => {
			res.redirect('/orders');
		})
		.catch((err) => console.error(err));
};

exports.getOrders = (req, res, next) => {
	req.user
		.getOrders()
		.then((orders) => {
			res.render('shop/orders', {
				pageTitle: 'Your orders',
				path: '/orders',
				orders,
			});
		})
		.catch((err) => console.error(err));
};
