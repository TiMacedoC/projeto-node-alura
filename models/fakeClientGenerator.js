//Esse arquivo serve pra pegar um cliente fake retornar um uma String com os dados desse cliente para ser salva no banco de dados postgre
const axios = require('axios');


module.exports = async (cpf) => {


    const { data } = await axios.get(`http://localhost:8082/${cpf}`);

    return JSON.stringify(data);

} 