const customExpress = require('./config/customExpress.js');
const conexao = require('./infraestrutura/database/conexao');
const Tabelas = require('./infraestrutura/database/tabelas');

//Conecta ao banco de dados 
conexao.connect(erro => {

    if (erro) {
        console.error('erro:', erro)
    } else {
        console.log('Conexão com o banco de dados bem sucedida');

        Tabelas.init();

        const app = customExpress();

        app.listen(3000, () => console.log("rodando na porta 3k"));
    }

});




