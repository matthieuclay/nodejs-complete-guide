const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
	res.render('admin/edit-product', {
		pageTitle: 'Add product',
		path: '/admin/add-product',
	});
};

exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const imgUrl = req.body.imgUrl;
	const price = req.body.price;
	const description = req.body.description;
	const product = new Product(title, imgUrl, price, description);
	product.save();
	res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect('/');
	}
	res.render('admin/edit-product', {
		pageTitle: 'Edit product',
		path: '/admin/edit-product',
		editing: editMode,
	});
};

exports.getProducts = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render('admin/products', {
			products,
			pageTitle: 'Admin products',
			path: '/admin/products',
		});
	});
};
