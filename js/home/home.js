// Função para fazer a requisição à API
function fetchData() {
    fetch("https://feg0ucemi1.execute-api.us-east-1.amazonaws.com/v1/oab?", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            "tag": "precos",
            "method": "POST"
         })  // Send the tag object directly, not inside an array
    })
    .then(response => response.json())
    .then(data => {
        // O corpo da resposta está como uma string JSON, precisamos fazer o parse
        const parsedData = JSON.parse(data.body); // Fazendo o parse da string JSON
        console.log(parsedData); // Verifica o que foi transformado
        // Popula a tabela com os dados retornados
        populateTable(parsedData);
    })
    .catch(error => console.error("Erro ao buscar dados:", error));

    fetch("https://feg0ucemi1.execute-api.us-east-1.amazonaws.com/v1/oab?", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            "tag": "familiaHome",
            "method": "POST"
         })  // Send the tag object directly, not inside an array
    })
    .then(response => response.json())
    .then(data => {
        // O corpo da resposta está como uma string JSON, precisamos fazer o parse
        const parsedData = JSON.parse(data.body); // Fazendo o parse da string JSON
        console.log(parsedData); // Verifica o que foi transformado
        // Popula a tabela com os dados retornados
        populateTableFamilia(parsedData);
    })
    .catch(error => console.error("Erro ao buscar dados:", error));
}

// Função para popular a tabela com os dados da API
function populateTable(data) {
    const tableBody = document.getElementById('table-body'); // Referência ao corpo da tabela
    tableBody.innerHTML = ""; // Limpa o conteúdo atual da tabela

    data.forEach(item => {
        const row = document.createElement("tr");

        const procedimentoNomeCell = document.createElement("td");
        procedimentoNomeCell.textContent = item.procedimentoNome;
        row.appendChild(procedimentoNomeCell);

        const valorCell = document.createElement("td");
        valor = "R$ " + item.valor
        valorCell.textContent = valor;
        row.appendChild(valorCell);

        tableBody.appendChild(row); // Adiciona a linha à tabela
    });
}

function populateTableFamilia(data) {
    const tableBody = document.getElementById('table-familia'); // Referência ao corpo da tabela
    tableBody.innerHTML = ""; // Limpa o conteúdo atual da tabela

    data.forEach(item => {
        const row = document.createElement("tr");

        const nomeDaFamiliaCell = document.createElement("td");
        nomeDaFamiliaCell.textContent = item.nomeDaFamilia;
        row.appendChild(nomeDaFamiliaCell);

        const liderDaFamiliaCell = document.createElement("td");
        liderDaFamiliaCell.textContent = item.liderDaFamilia;
        row.appendChild(liderDaFamiliaCell);

        const dataUltimoPagamentoCell = document.createElement("td");
        dataUltimoPagamentoCell.textContent = item.dataUltimoPagamento;
        row.appendChild(dataUltimoPagamentoCell);

        const dataVencimentoCell = document.createElement("td");
        dataVencimentoCell.textContent = item.dataVencimento;
        row.appendChild(dataVencimentoCell);

        const quantidadeDiasPagosCell = document.createElement("td");
        quantidadeDiasPagosCell.textContent = item.quantidadeDiasPagos;
        row.appendChild(quantidadeDiasPagosCell);

        const vencidoCell = document.createElement("td");
        if (isDataVencida(item.dataVencimento)) {
            vencidoCell.textContent = "EM DIA"
        } else {
            vencidoCell.textContent = "VENCIDO"
        }
        row.appendChild(vencidoCell);

        tableBody.appendChild(row); // Adiciona a linha à tabela
    });
}

function isDataVencida(dataVencimento) {
    // Divide a string no formato "DD/MM/AAAA"
    const [dia, mes, ano] = dataVencimento.split('/').map(Number);
    
    // Cria um objeto Date (mês em JS começa do zero, por isso -1)
    const dataItem = new Date(ano, mes - 1, dia);
    
    // Obtém a data atual sem a parte de horas/minutos/segundos
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    // Retorna true se a data do item já passou
    return dataItem < hoje;
}


// Chama a função para buscar os dados ao carregar a página
fetchData();
