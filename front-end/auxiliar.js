function adicionaZero(num) {
    return num > 9 ? num : "0" + num;
}

function desenhaLista(res) {

    document.querySelector(".emptyList").innerHTML = "";

    document.querySelector(".listaDeAgendamentos").innerHTML = `
    <tr>
        <th>Opções</th>
        <th>Cliente</th>
        <th>Pet</th>
        <th>Serviço</th>
        <th>Data</th>
        <th>Status</th>
    </tr>`;


    res.forEach((agendamento) => {

        const date = new Date(agendamento.data);
        const parseDate = `${date.getDate()}/${adicionaZero(date.getMonth())}/${date.getFullYear()}`


        document.querySelector(".listaDeAgendamentos").innerHTML += `
            <tr>
                <td>
                    <img 
                        src="images/delete-icon.png"
                        class="optionButtons"
                        id="delete" 
                        alt="botão de delete"
                        onclick="apagar(${agendamento.id})"
                    >
                    <img src="images/edit-icon.png" class="optionButtons" id="edit" alt="">
                </td>
                <td>${agendamento.cliente.nome}</td>
                <td>${agendamento.pet}</td>
                <td>${agendamento.servico}</td>
                <td>${parseDate}</td>
                <td>${agendamento.status}</td>
            </tr>
        `
    })

}

function drawSearchBox() {

    const searchField = document.querySelector(".searchField");

    searchField.innerHTML = `
        <input type="text" id="searchBox" placeholder="Pesquisar por Id, Nome, Pet">
        <button id="searchButton" onclick="search()">Pesquisar</button>
    `
}

async function searchForId(terms, baseUrl) {

    const id = terms;

    if (isNaN(id)) {
        return 400
    } else {
        const url = baseUrl + id;

        const res = await fetch(url).then((res) => {
            if (res.status == 200) {
                return res.json()
            } else {
                return res.status;
            }
        });

        return res
    }
}

async function searchByKeyword(terms) {

    const url = baseUrl;
    const res = await fetch(url).then((res) => {
        return res.json()
    });

    function filtering(atendimento) {

        for (let i in atendimento) {
            terms = terms.toLowerCase();

            if (i == "cliente") {

                for (let j in atendimento[i]) {
                    let emTexto = atendimento[i][j].toString().toLowerCase();
                    if (emTexto.includes(terms)) {

                        console.log(atendimento)
                        return atendimento
                    }
                }
            }

            let emTexto = atendimento[i].toString().toLowerCase();

            if (emTexto.includes(terms)) {
                console.log(atendimento)
                return atendimento
            }
        }
    }


    const resultado = res.filter(filtering);

    if (resultado.length == 0) {
        return 400;
    } else {
        return resultado;
    }

}

function drawEmptyList() {

    document.querySelector(".listaDeAgendamentos").innerHTML = "";

    document.querySelector(".emptyList").innerHTML = `
        <img id="emptyImage" src="images/no-data.svg" alt="duas pranchetas vazias">
        <p>Nenhum agendamento encontrado!</p>
    `
}

function eraseAll() {

    document.querySelector(".emptyList").innerHTML = "";
    document.querySelector(".listaDeAgendamentos").innerHTML = "";
    document.querySelector(".searchField").innerHTML = "";
}