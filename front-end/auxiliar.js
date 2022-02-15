function adicionaZero(num, aux) {
    num = num + aux;
    return num > 9 ? num : "0" + num;
}

function desenhaLista(res) {

    document.querySelector(".emptyList").innerHTML = "";
    document.querySelector(".form").innerHTML = "";

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

        console.log(agendamento.data);


        const date = new Date(agendamento.data);
        const parseDate = `${date.getDate()}/${adicionaZero(date.getMonth(), 1)}/${date.getFullYear()}`


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
                    <img 
                        src="images/edit-icon.png"
                        class="optionButtons"
                        id="edit"
                        alt="botão de editar"
                        onclick="desenhaEditForm(${agendamento.id})"    
                    >
                </td>
                <td>${agendamento.cliente}</td>
                <td>${agendamento.pet}</td>
                <td>${agendamento.servico}</td>
                <td>${parseDate}</td>
                <td>${agendamento.status}</td>
            </tr>
        `
    })

}

function drawSearchBox() {

    document.querySelector(".form").innerHTML = "";

    const searchField = document.querySelector(".searchField");
    searchField.innerHTML = `
        <input type="text" id="searchBox" placeholder="Pesquisar por Id, Nome, Pet">
        <button id="searchButton" onclick="search()">Pesquisar</button>
    `
}

async function searchForId(terms) {

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
    document.querySelector(".form").innerHTML = "";

}

function desenhaForm() {

    eraseAll();

    document.querySelector(".form").innerHTML = `
        <h3>Cadastrar novo Agendamento</h3>

        <div class="formField">
            <label class="inputLabels" for="cliente">Nome: </label>
            <input class="inputField" type="text" id="cliente">
        </div>

        <div class="formField">
            <label class="inputLabels" for="cpf">CPF:</label>
            <input class="inputField" type="number" id="cpf">
        </div>

        <div class="formField">
            <label class="inputLabels" for="pet">Pet: </label>
            <input class="inputField" type="text" id="pet">
        </div>

        <div class="formField">
            <label class="inputLabels" for="servico">Serviço: </label>
            <input class="inputField" type="text" id="servico">
        </div>

        <div class="formField">
            <label class="inputLabels" for="observacoes">Observações</label>
            <input class="inputField" type="text" id="observacoes">
        </div>

        <div class="formField">
            <label class="inputLabels" for="data">Data: </label>
            <input class="inputField" type="datetime-local" id="data">
        </div>

        <input class="button" type="submit" name="enviar" value="Enviar" id="enviar">
    `;
}

async function desenhaEditForm(agendamento) {

    const atendimento = await searchForId(agendamento)
    console.log('atendimento:', atendimento)

    document.querySelector(".form").innerHTML = `
        <h3>Cadastrar novo Agendamento</h3>

        <div class="formField">
            <label class="inputLabels" for="cliente">Nome: </label>
            <input class="inputField" type="text" id="cliente" value="${atendimento.cliente}">
        </div>

        <div class="formField">
            <label class="inputLabels" for="cpf">CPF:</label>
            <input class="inputField" type="number" id="cpf" value="${atendimento.cpf}">
        </div>

        <div class="formField">
            <label class="inputLabels" for="pet">Pet: </label>
            <input class="inputField" type="text" id="pet" value="${atendimento.pet}">
        </div>

        <div class="formField">
            <label class="inputLabels" for="servico">Serviço: </label>
            <input class="inputField" type="text" id="servico" value="${atendimento.servico}">
        </div>

        <div class="formField">
            <label class="inputLabels" for="observacoes">Observações</label>
            <input class="inputField" type="text" id="observacoes" value="${atendimento.observacoes}">
        </div>

        <div class="formField">
            <label class="inputLabels" for="data">Data: </label>
            <input class="inputField" type="datetime-local" id="data" 
            value="${atendimento.data}">
        </div>

        <div class="formField">
            <label class="inputLabels" for="status">Data: </label>
            <input class="inputField" type="text" id="status" value="${atendimento.status}">
        </div>

        <input class="button" type="submit" name="enviar" value="Enviar" id="enviar">
    `;
}

function formHandle() {

    const values = document.querySelectorAll(".inputField")

    var str = {};

    values.forEach((value) => {

        str[value.id] = value.value;
    })

    const finalForm = JSON.stringify(str)

    return finalForm;
} 