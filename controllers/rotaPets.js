const Pet = require('../models/pets');

module.exports = app => {
    app.post('/pets', (req, res) => {

        const dados = req.body;

        Pet.adiciona(res, dados)

    })
}