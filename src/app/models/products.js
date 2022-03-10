const Sequelize = require("sequelize");

class Product extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            barcode: Sequelize.STRING,
            name: Sequelize.STRING,
            validate_product: Sequelize.STRING,
            qtd: Sequelize.STRING,
            price: Sequelize.STRING,
        }, {
            sequelize
        });
    };
};

module.exports = Product;

// "barcode": "10101010101",
// "name": "Produto teste",
// "validate_product": "02/2024",
// "qtd": "3",
// "price": "15.90",