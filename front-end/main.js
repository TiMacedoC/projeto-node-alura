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
            desenhaForm();
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


    //Se o resultado da primeira pesquisa por id for 400 ele faz uma nova
    //Se o resultado continuar 400 ele imprime a tela de vazio, senão ele imprime com o resultado da segunda pesquisa;
    const result = await searchForId(terms);

    if (result == 400) {
        let result = await searchByKeyword(terms);
        if (result == 400) {
            drawEmptyList();
        } else {
            desenhaLista(result)
        }
    } else {
        desenhaLista([result])
    }
};

const agendar = async () => {

    const formulario = formHandle();
    console.log('formulario:', formulario)


    const header = {
        method: "POST",
        body: formulario,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const url = baseUrl;

    const res = await fetch(url, header).then((res) => {
        return res.json()
    });

    if (res.length) {
        res.forEach((res) => {
            console.log(res.mensagem)
        })
    } else {
        console.log(res)
    }


}

const alterar = async (id) => {

    const formulario = formHandle();

    const url = baseUrl + id

    const header = {
        method: "PATCH",
        body: formulario,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const res = await fetch(url, header).then((res) => {
        return res.json()
    });

    console.log(res);

}





