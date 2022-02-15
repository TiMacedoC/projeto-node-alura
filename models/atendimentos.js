const axios = require('axios');
const moment = require('moment');
const conexao = require('../infraestrutura/database/conexao');

class Atendimento {

    async adiciona(atendimento, res) {

        const dataCriacao = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
        var dataAgendamento = moment(atendimento.data).format('YYYY-MM-DD hh:mm:ss');

        // Checa se a data de agendamento é valida ou não
        const dataEhValida = moment(dataAgendamento).isSameOrAfter(dataCriacao);

        //Checa se o nome é válido
        const nomeEhValido = atendimento.cliente.length >= 4;

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: nomeEhValido,
                mensagem: 'O nome deve conter 4 ou mais caracteres'
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;

        dataAgendamento = atendimento.data + ":00";

        if (existemErros) {
            res.status(400).json(erros);
        } else {
            const sql = `INSERT INTO atendimentos (
                cliente,
                cpf,
                pet,
                servico,
                status,
                observacoes,
                datacriacao,
                data)
             VALUES (
                '${atendimento.cliente}',
                '${atendimento.cpf}',
                '${atendimento.pet}',
                '${atendimento.servico}',
                'Agendado',
                '${atendimento.observacoes}',
                '${dataCriacao}',
                '${dataAgendamento}');`

            conexao.query(sql, (erro, result) => {
                if (erro) {
                    res.status(400).json(erro);
                } else {
                    res.status(201).json(
                        { ...atendimento, dataCriacao }
                    );
                }
            });
        }

    }

    lista(res) {

        const sql = `SELECT * FROM atendimentos`;

        conexao.query(sql, (erro, result) => {

            if (erro) {
                res.status(400).json(erro);
            } else {

                let colunas = [];

                result.rows.forEach((row) => {
                    colunas.push(row)
                });

                res.json(colunas);
            }

        })
    }

    buscaPorId(res, id) {

        const sql = `SELECT * FROM atendimentos WHERE id = ${id}`

        conexao.query(sql, (erro, result) => {

            //Uso a posição [0], porque a busca no banco devolve um array, como buscamos por id, sempre será um array de uma posição só
            const atendimento = result.rows[0];

            if (atendimento) {

                result.rows.length == 1 ? res.json(atendimento) : res.send("Id não encontrado");

            } else {

                res.status(400).send("Id não encontrado")
            }
        })
    }

    altera(res, id, valores) {

        //Transforma o objeto alterações para o formato SQL que a gente precisa no banco de dados
        var alteracoes = '';

        for (const property in valores) {
            alteracoes += `${property} = '${valores[property]}',`
        }

        //Retira a ultima virgula da string
        alteracoes = alteracoes.slice(0, -1);

        const sql = `
            UPDATE atendimentos
            SET ${alteracoes}
            WHERE id = ${id}   
        `;

        conexao.query(sql, (erro, result) => {

            if (erro) {
                res.status(400).json(erro);
            } else {
                this.buscaPorId(res, id)
            }
        })
    }

    deleta(res, id) {

        const sql = `DELETE FROM atendimentos WHERE id = ${id}`

        conexao.query(sql, (erro, result) => {

            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({ id })
            }
        });
    }
}

module.exports = new Atendimento();