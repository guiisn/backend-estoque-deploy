const Router = require('express');

const productsController = require('./app/controllers/productsController.js');

const routes = Router.Router();

routes.get('/', (req, res) => {
    res.json({ estoque_version: process.env.VERSION, upload_api: 'success', author: `name: ${process.env.AUTHOR}, website: ${process.env.WEBSITE}` })
})


routes.get('/all-products', productsController.listAll);
routes.post('/create-product', productsController.create);

routes.get('/product/:barcode', productsController.listProduct);
routes.put('/product/:id', productsController.updateProduct);
routes.delete('/product/:id', productsController.deleteProduct);

routes.put('/product/sell/:barcode', productsController.venderProduto);
routes.put('/product/add/:barcode', productsController.addProduto);

routes.get('/inventory-value', productsController.valueTotal);
routes.get('/products/expiration', productsController.productsExpiration);

routes.get('/products/:query', productsController.find);

module.exports = routes;