const Router = require('express');

const productsController = require('./app/controllers/productsController.js');

const routes = Router.Router();

routes.get('/', (req, res) => {
    res.json({ ok: true })
})


routes.get('/product', productsController.listAll);
routes.post('/product', productsController.create);

routes.get('/product/:barcode', productsController.listProduct);
routes.put('/product/:id', productsController.updateProduct);
routes.delete('/product/:id', productsController.deleteProduct);

routes.put('/product/sell/:barcode', productsController.venderProduto);
routes.put('/product/add/:barcode', productsController.addProduto);

routes.get('/products/value', productsController.valueTotal);
routes.get('/products/expiration', productsController.productsExpiration);

routes.get('/products/:query', productsController.find);

module.exports = routes;