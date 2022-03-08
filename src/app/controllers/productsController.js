import Product from "../models/products";
import { Op } from "sequelize";

export default {
    async create(req, res) {
        const { barcode, name, validate_product, qtd, price } = req.body;

        const product = await Product.findOne({ where: { barcode } });

        if (product && validate_product == product.dataValues.validate_product) {
            return res.status(500).json({ error: 'Produto já cadastrado' });
        };

        await Product.create({
            barcode,
            name,
            validate_product,
            qtd,
            price
        });

        return res.json({
            barcode,
            name,
            validate_product,
            qtd,
            price
        });
    },

    async listAll(req, res) {
        const products = await Product.findAll();

        return res.json(products);
    },

    async listProduct(req, res) {
        const { barcode } = req.params;
        const product = await Product.findOne({ where: { barcode } });

        const products = await Product.findAll();

        let array_return_products = [];
        for (let i = 0; i < products.length; i++) {
            if (product.dataValues.barcode === products[i].dataValues.barcode) {
                array_return_products.push(products[i].dataValues);
            }
        };

        function compare(a, b) {
            if (a.validate_product < b.validate_product)
                return -1;
            if (a.validate_product > b.validate_product)
                return 1;
            return 0;
        };

        const array_sorted = array_return_products.sort(compare);

        // return res.json([product]);
        return res.json(array_sorted);
    },

    async updateProduct(req, res) {
        const { barcode } = req.params;

        const { name, validate_product, qtd } = req.body;

        const product = await Product.findOne({ where: { barcode } });

        if (!product) {
            return res.status(500).json({ error: 'produto não exite' });
        };

        await product.update({
            name,
            validate_product,
            qtd,
            price,

        });

        return res.json({
            name,
            validate_product,
            qtd,
            price
        });

    },

    async deleteProduct(req, res) {
        const { id } = req.params;

        const product = await Product.findOne({ where: { id } });

        if (!product) {
            return res.status(501).json({ error: 'produto não existe' });
        };

        await product.destroy();

        return res.json({ 'sucess': `Produto ${product.name} deletado com sucesso!` });
    },

    async venderProduto(req, res) {
        const { barcode } = req.params;
        const { qtd } = req.body;

        const product = await Product.findOne({ where: { barcode } });

        if (!product) {
            return res.status(500).json({ error: 'o produto informado não existe.' });
        };

        const qtd_product = parseInt(product.qtd);

        if (parseInt(qtd) > qtd_product) {
            return res.status(501).json({ error: 'a quantidade de produtos vendidos não pode ser maior que a de produtos em estoque.' });
        };

        const qtd_sell = qtd_product - parseInt(qtd);

        if (qtd_sell === 0) {
            await product.destroy();
        };

        product.qtd = qtd_sell;

        await product.save();

        return res.json(product);
    },

    async addProduto(req, res) {
        const { barcode } = req.params;
        const { qtd } = req.body;

        const product = await Product.findOne({ where: { barcode } });

        if (!product) {
            return res.status(500).json({ error: 'o produto informado não existe.' });
        };

        const qtd_product = parseInt(product.qtd);

        const qtd_sell = qtd_product + parseInt(qtd);

        product.qtd = qtd_sell;

        await product.save();

        return res.json(product);
    },

    async valueTotal(req, res) {
        const products = await Product.findAll();

        let sum = 0;
        for (let i = 0; i < products.length; i++) {
            const quantidade = products[i].dataValues.qtd;
            const price = products[i].dataValues.price.replace(',', '.');

            const value_product = parseInt(quantidade) * parseFloat(price);

            sum += value_product;
        }

        return res.json(sum)
    },

    async productsExpiration(req, res) {
        const products = await Product.findAll();

        const current_year = new Date().getFullYear();

        let arr = [];
        for (let i = 0; i < products.length; i++) {
            const val = products[i].dataValues.validate_product.split('/')[1];

            if (current_year + 1 == val) {
                arr.push(products[i].dataValues)
            }
        }

        return res.json(arr)
    },

    async find(req, res) {
        const { query } = req.params;

        const response = await Product.findAll({
            where: { name: { [Op.like]: `%${query}%` } }
        });
        return res.json(response)
    }

};