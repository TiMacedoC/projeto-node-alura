const { Client } = require('pg');

const conexao = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'agenda-petshop',
    password: 'dbpass',
    port: 5432,
});

module.exports = conexao;
