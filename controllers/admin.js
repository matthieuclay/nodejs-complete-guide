const { validationResult } = require('express-validator');

const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
	Product.find({ userId: req.user._id })
		// .select('title price -_id')
		// .populate('userId', 'username')
		.then((products) => {
			res.render('admin/products', {
				products,
				pageTitle: 'Admin products',
				path: '/admin/products',
			});
		})
		.catch((err) => {
			const error = new Error(err);
			error.httpStatusCode = 500;
			return next(error);
		});
};

exports.getAddProduct = (req, res, next) => {
	res.render('admin/edit-product', {
		pageTitle: 'Add product',
		path: '/admin/add-product',
		editing: false,
		hasError: false,
		errorMessage: null,
		validationErrors: [],
	});
};

exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const img = req.body.img;
	const price = req.body.price;
	const description = req.body.description;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).render('admin/edit-product', {
			pageTitle: 'Add product',
			path: '/admin/add-product',
			editing: false,
			hasError: true,
			product: {
				title,
				img,
				price,
				description,
			},
			errorMessage: errors.array()[0].msg,
			validationErrors: errors.array(),
		});
	}

	const product = new Product({
		title,
		img,
		price,
		description,
		userId: req.user,
	});
	product
		.save()
		.then(() => res.redirect('/admin/products'))
		.catch((err) => {
			// return res.status(500).render('admin/edit-product', {
			// 	pageTitle: 'Add product',
			// 	path: '/admin/add-product',
			// 	editing: false,
			// 	hasError: true,
			// 	product: {
			// 		title,
			// 		imgUrl,
			// 		price,
			// 		description,
			// 	},
			// 	errorMessage: 'Database operation failed, please try again.',
			// 	validationErrors: [],
			// });
			// res.redirect('/500');
			const error = new Error(err);
			error.httpStatusCode = 500;
			return next(error);
		});
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
				hasError: false,
				errorMessage: null,
				validationErrors: [],
				product,
			});
		})
		.catch((err) => {
			const error = new Error(err);
			error.httpStatusCode = 500;
			return next(error);
		});
};

exports.postEditProduct = (req, res, next) => {
	const productId = req.body.productId;
	const updatedTitle = req.body.title;
	const updatedImgUrl = req.body.imgUrl;
	const updatedPrice = req.body.price;
	const updatedDescription = req.body.description;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).render('admin/edit-product', {
			pageTitle: 'Edit product',
			path: '/admin/edit-product',
			editing: true,
			hasError: true,
			product: {
				title: updatedTitle,
				imgUrl: updatedImgUrl,
				price: updatedPrice,
				description: updatedDescription,
				_id: productId,
			},
			errorMessage: errors.array()[0].msg,
			validationErrors: errors.array(),
		});
	}

	Product.findById(productId)
		.then((product) => {
			if (product.userId.toString() !== req.user._id.toString()) {
				return res.redirect('/');
			}
			product.title = updatedTitle;
			product.imgUrl = updatedImgUrl;
			product.price = updatedPrice;
			product.description = updatedDescription;
			return product.save().then(() => res.redirect('/admin/products'));
		})
		.catch((err) => {
			const error = new Error(err);
			error.httpStatusCode = 500;
			return next(error);
		});
};

exports.postDeleteProduct = (req, res, next) => {
	const productId = req.body.productId;
	Product.deleteOne({ _id: productId, userId: req.user._id })
		.then(() => res.redirect('/admin/products'))
		.catch((err) => {
			const error = new Error(err);
			error.httpStatusCode = 500;
			return next(error);
		});
};
