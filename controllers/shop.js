const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
	Product.fetchAll()
		.then(([rows, fieldData]) => {
			res.render('shop/product-list', {
				products: rows,
				pageTitle: 'All products',
				path: '/products',
			});
		})
		.catch((err) => console.error(err));
};

exports.getProduct = (req, res, next) => {
	const productId = req.params.productId;
	Product.findById(productId)
		.then(([product]) => {
			res.render('shop/product-detail', {
				product: product[0],
				pageTitle: product[0].title + ' - $' + product[0].price,
				path: '/products',
			});
		})
		.catch((err) => console.error(err));
};

exports.getIndex = (req, res, next) => {
	Product.fetchAll()
		.then(([rows, fieldData]) => {
			res.render('shop/index', {
				products: rows,
				pageTitle: 'Shop',
				path: '/',
			});
		})
		.catch((err) => console.error(err));
};

exports.getCart = (req, res, next) => {
	Cart.getCart((cart) => {
		Product.fetchAll((products) => {
			const cartProducts = [];
			for (let product of products) {
				const cartProductData = cart.products.find(
					(prod) => prod.id === product.id,
				);
				if (cartProductData) {
					cartProducts.push({
						productData: product,
						quantity: cartProductData.quantity,
					});
				}
			}
			res.render('shop/cart', {
				pageTitle: 'Your cart',
				path: '/cart',
				products: cartProducts,
			});
		});
	});
};

exports.postCart = (req, res, next) => {
	const productId = req.body.productId;
	Product.findById(productId, (product) => {
		Cart.addProduct(productId, product.price);
	});
	res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
	const productId = req.body.productId;
	Product.findById(productId, (product) => {
		Cart.deleteProduct(productId, product.price);
		res.redirect('/cart');
	});
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
