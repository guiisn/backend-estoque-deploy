module.exports = {
    dialect: 'mysql',
    host: 'newestoque-aws.ce7o6fa7tija.us-east-1.rds.amazonaws.com',
    username: 'admin',
    password: '12345678',
    database: 'estoque',
    dialectOptions: {
        ssl: 'Amazon RDS'
    },
    logging: console.log,
    port: 3306,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};