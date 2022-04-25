const mongoConnect = require('../utils/database');

class Product {
	constructor(title, imgUrl, price, description) {
		this.title = title;
		this.imgUrl = imgUrl;
		this.price = price;
		this.description = description;
	}

	save() {}
}

const Product = sequelize.define('product', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	imgUrl: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	price: {
		type: Sequelize.DOUBLE,
		allowNull: false,
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

module.exports = Product;
