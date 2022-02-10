const buttons = document.querySelectorAll(".actions")

console.log('buttons:', buttons)

buttons.forEach(button => {

    button.addEventListener("click", onClick)

})

const baseUrl = `http://localhost:3000/atendimentos/`

//Controla os botões principais
function onClick() {
    switch (this.id) {
        case "post":
            console.log(this.id, "post");
            break;
        case "get":
            lista();
            break;
        case "getById":
            drawSearchBox();
            break;
    }
}

const lista = async () => {

    const url = baseUrl;

    const res = await fetch(url).then((res) => {
        return res.json()
    });

    //Chama a função que vai mostrar na tela todos os agendamentos
    //Essa função está no arquivo auxiliar.js
    desenhaLista(res)
};

const apagar = async (id) => {

    const url = baseUrl + id;
    const config = {
        method: 'DELETE'
    }

    await fetch(url, config);

    lista();

}

const search = async () => {

    const terms = document.querySelector("#searchBox").value;


    const result = await trySearchForId(terms, baseUrl);

    if (result == 400) {
        drawEmptyList()
    } else {
        desenhaLista([result])
    }
};





