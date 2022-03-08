import app from './app';
import sequelize from 'sequelize';

const port = process.env.PORT || 3333;

app.listen(port, () => {
    console.log(`🚀 [server]: servidor rodando em :${port}.`)
});