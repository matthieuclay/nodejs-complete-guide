const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
	Product.findAll()
		.then((products) => {
			res.render('admin/products', {
				products,
				pageTitle: 'Admin products',
				path: '/admin/products',
			});
		})
		.catch((err) => console.error(err));
};

exports.getAddProduct = (req, res, next) => {
	res.render('admin/edit-product', {
		pageTitle: 'Add product',
		path: '/admin/add-product',
		editing: false,
	});
};

exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const imgUrl = req.body.imgUrl;
	const price = req.body.price;
	const description = req.body.description;
	Product.create({
		title,
		imgUrl,
		price,
		description,
	})
		.then((result) => console.log('Created product'))
		.catch((err) => console.error(err));
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect('/');
	}
	const productId = req.params.productId;
	Product.findById(productId, (product) => {
		if (!product) {
			return res.redirect('/');
		}
		res.render('admin/edit-product', {
			pageTitle: 'Edit product',
			path: '/admin/edit-product',
			editing: editMode,
			product,
		});
	});
};

exports.postEditProduct = (req, res, next) => {
	const productId = req.body.productId;
	const updatedTitle = req.body.title;
	const updatedImgUrl = req.body.imgUrl;
	const updatedPrice = req.body.price;
	const updatedDescription = req.body.description;
	const updatedProduct = new Product(
		productId,
		updatedTitle,
		updatedImgUrl,
		updatedPrice,
		updatedDescription,
	);
	updatedProduct.save();
	res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res, next) => {
	const productId = req.body.productId;
	Product.deleteById(productId);
	res.redirect('/admin/products');
};
