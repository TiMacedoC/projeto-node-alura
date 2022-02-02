const conexao = require('../infraestrutura/database/conexao');
const imageHandle = require('../infraestrutura/arquivos/uploadDeArquivos')


class PetHandle {

    adiciona(res, pet) {

        //Salva a imagem no banco de dados e retorna o caminho que foi salvo
        //Aí sim executa a query no postgreSQL
        imageHandle(pet, (linkDaImagem) => {

            if (linkDaImagem) {

                const sql = `INSERT INTO pets (nome, imagem)
                         VALUES ('${pet.nome}', '${linkDaImagem}');`

                console.log(sql);

                conexao.query(sql, (erro, result) => {
                    if (erro) {
                        res.status(400).send(erro);
                        console.log(erro);
                    } else {
                        res.status(200).json({ ...pet, linkDaImagem });
                    }
                });
            } else {

                res.status(400).json({ error: "Tipo de arquivo inválido" })

            }

        });

    }
}

module.exports = new PetHandle();
