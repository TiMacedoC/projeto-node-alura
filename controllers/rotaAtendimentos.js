const Atendimento = require('../models/atendimentos')

module.exports = (app) => {

    app.get('/atendimentos', (req, res) => {

        const nome = undefined;
        Atendimento.lista(res);

    });

    app.get('/atendimentos/:id', (req, res) => {

        const id = req.params.id;
        Atendimento.buscaPorId(res, id);
    });

    app.post('/atendimentos', (req, res) => {

        const atendimento = req.body;

        Atendimento.adiciona(atendimento, res);
    });

    app.patch('/atendimentos/:id', (req, res) => {

        const id = parseInt(req.params.id);
        const alteracoes = req.body;

        Atendimento.altera(res, id, alteracoes)
    });

    app.delete('/atendimentos/:id', (req, res) => {

        const id = parseInt(req.params.id);

        Atendimento.deleta(res, id);

    });

};