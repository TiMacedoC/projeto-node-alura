const conexao = require("./conexao");

class Tabelas {

    init() {

        this.criarAtendimentos();
        this.criarPets();
    }

    criarAtendimentos() {
        // Comando em linguagem SQL que será passado para o postgreSQL
        const sql = `
        CREATE TABLE IF NOT EXISTS Atendimentos (
            id serial NOT NULL PRIMARY KEY,
            cliente varchar(200) NOT NULL,
            pet varchar(30),
            servico varchar(30) NOT NULL,
            data timestamp NOT NULL,
            dataCriacao timestamp NOT NULL,
            status varchar(20) NOT NULL,
            observacoes text
        );
        `;

        //Função que passa o comando para o PostgreSQL
        conexao.query(sql, (erro, res) => {

            if (erro) {
                console.log("Tabela não criada", erro);
            } else {
                console.log("Tabela Atendimentos criada com sucesso");
            }

        });
    }

    criarPets() {

        const sql = `
            CREATE TABLE IF NOT EXISTS pets(
                id serial NOT NULL PRIMARY KEY,
                nome varchar(50),
                imagem varchar(200)
            );
        `

        //Função que passa o comando para o PostgreSQL
        conexao.query(sql, (erro, res) => {

            if (erro) {
                console.log("Tabela não criada", erro);
            } else {
                console.log("Tabela Pets criada com sucesso");
            }

        });
    }

}

module.exports = new Tabelas;