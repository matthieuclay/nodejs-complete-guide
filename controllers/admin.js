const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
	Product.find()
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
	const product = new Product({
		title,
		imgUrl,
		price,
		description,
		userId: req.user,
	});
	product
		.save()
		.then(() => res.redirect('/admin/products'))
		.catch((err) => console.error(err));
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect('/');
	}
	const productId = req.params.productId;
	Product.findById(productId)
		.then((product) => {
			if (!product) {
				return res.redirect('/');
			}
			res.render('admin/edit-product', {
				pageTitle: 'Edit product',
				path: '/admin/edit-product',
				editing: editMode,
				product,
			});
		})
		.catch((err) => console.error(err));
};

exports.postEditProduct = (req, res, next) => {
	const productId = req.body.productId;
	const updatedTitle = req.body.title;
	const updatedImgUrl = req.body.imgUrl;
	const updatedPrice = req.body.price;
	const updatedDescription = req.body.description;

	Product.findById(productId)
		.then((product) => {
			product.title = updatedTitle;
			product.imgUrl = updatedImgUrl;
			product.price = updatedPrice;
			product.description = updatedDescription;
			return product.save();
		})
		.then(() => res.redirect('/admin/products'))
		.catch((err) => console.error(err));
};

exports.postDeleteProduct = (req, res, next) => {
	const productId = req.body.productId;
	Product.findByIdAndRemove(productId)
		.then(() => res.redirect('/admin/products'))
		.catch((err) => console.error(err));
};
