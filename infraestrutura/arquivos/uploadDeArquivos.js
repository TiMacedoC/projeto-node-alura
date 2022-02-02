//Esse arquivo grava a nossa imagem na nossa pasta imagens
//Depois disso ele chama a função que vai salvar no nosso banco de dados o nosso pet

const fs = require('fs');
const path = require('path')

module.exports = (pet, callbackImagem) => {

    const nome = pet.nome;
    const caminhoLeitura = pet.imagem;
    const tiposValidos = ['.jpg', '.jpeg', '.gif', '.png']
    const tipo = path.extname(caminhoLeitura);
    console.log('tipo:', tipo)

    const isTipoValido = tiposValidos.some((tipos) => tipos == tipo)

    if (isTipoValido) {
        const caminhoGravacao = `./assets/imagens/${nome}${tipo}`
        console.log("tipo", tipo);

        fs.createReadStream(caminhoLeitura)
            .pipe(fs.createWriteStream(caminhoGravacao))
            .on('finish', () => {
                callbackImagem(caminhoGravacao);
            });
    } else {
        callbackImagem(false);
    };
}