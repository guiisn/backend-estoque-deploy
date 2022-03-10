//conexao com banco/ carregamento dos models
const Sequelize = require("sequelize");

const Products = require('../app/models/products.js');

const databaseConfig = require('../config/database.js');

const models = [Products];

class Database {
    constructor() {
        this.init();
    };

    init() {
        this.connection = new Sequelize(databaseConfig);

        try {
            this.connection.authenticate();
            console.log(`🆗 [database]: a conexão foi bem estabelecida.`);
        } catch (error) {
            console.error(`❌ [database]: a conexão falhou. Erro: `, error);
        };

        models.map(model => model.init(this.connection));
    };
};

module.exports = new Database();