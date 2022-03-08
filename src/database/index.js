//conexao com banco/ carregamento dos models
import Sequelize from "sequelize";

import Products from '../app/models/products';

import databaseConfig from '../config/database';

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

export default new Database();