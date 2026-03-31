// ================================================================
//  APP.JS — Aula 07: Formulário com CEP
//  ================================================================
//  Este arquivo será desenvolvido AO VIVO com os alunos em aula.
//
//  Tópicos que serão abordados:
//
//  1. Seleção de elementos do DOM (getElementById, querySelector)
//  2. Eventos (addEventListener)
//  3. Fetch API + Promises (async/await)
//  4. Manipulação do LocalStorage (getItem, setItem)
//  5. Criação dinâmica de elementos HTML (createElement, innerHTML)
//  6. Validação simples de formulário
//  7. UUID simples com crypto.randomUUID()
//
//  ================================================================
//
//  ROTEIRO PARA A AULA (guia do professor):
//
//  ETAPA 1 — Selecionar o campo de CEP e ouvir o evento "input"
//  ETAPA 2 — Remover a máscara e verificar se tem 8 dígitos
//  ETAPA 3 — Fazer o fetch na API ViaCEP
//  ETAPA 4 — Preencher os campos com os dados retornados
//  ETAPA 5 — Capturar o submit do formulário
//  ETAPA 6 — Salvar o objeto no LocalStorage
//  ETAPA 7 — Ler o LocalStorage e renderizar a tabela
//  ETAPA 8 — Implementar o botão de excluir
//
//  ================================================================

// ================================================================
//  APP.JS — Aula 07: Formulário com CEP (Implementação Completa)
//  ================================================================

// --- Seleção de Elementos ---
const form = document.getElementById('formCadastro');
const inputCep = document.getElementById('cep');
const cepStatus = document.getElementById('cepStatus');
const tabelaBody = document.getElementById('tabelaBody');
const tableWrapper = document.getElementById('tableWrapper');
const emptyMessage = document.getElementById('emptyMessage');
const btnLimpar = document.getElementById('btnLimpar');

// --- ETAPA 1 e 2: Ouvir evento de input no CEP e validar ---
inputCep.addEventListener('input', (e) => {
    // Remove qualquer caractere que não seja número
    let cep = e.target.value.replace(/\D/g, "");

    // Aplica máscara visual (00000-000)
    if (cep.length > 5) {
        e.target.value = cep.replace(/^(\d{5})(\d)/, "$1-$2");
    } else {
        e.target.value = cep;
    }

    // Se tiver 8 dígitos, busca na API
    if (cep.length === 8) {
        buscarCep(cep);
    }
});

// --- ETAPA 3 e 4: Fetch API ViaCEP e Preenchimento ---
async function buscarCep(cep) {
    cepStatus.innerHTML = "<img src='../images/loading.webp' alt='Buscando...' /> Buscando...";
    cepStatus.style.color = "var(--primary-color)";

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            throw new Error("CEP não encontrado");
        }

        // Preenche os campos automaticamente
        document.getElementById('logradouro').value = data.logradouro;
        document.getElementById('bairro').value = data.bairro;
        document.getElementById('cidade').value = data.localidade;
        document.getElementById('estado').value = data.uf;

        cepStatus.textContent = "✓ CEP Encontrado";
        cepStatus.style.color = "green";
        document.getElementById('numero').focus();

    } catch (error) {
        cepStatus.textContent = "CEP inválido ou não encontrado.";
        cepStatus.style.color = "red";
    }
}

// --- ETAPA 5 e 6: Capturar Submit e Salvar no LocalStorage ---
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validação simples: verifica se campos obrigatórios estão vazios
    if (!form.checkValidity()) {
        alert("Por favor, preencha todos os campos obrigatórios corretamente.");
        return;
    }

    // Cria o objeto com os dados do formulário
    const novoCadastro = {
        id: crypto.randomUUID(), // ETAPA 7: UUID
        cpf: document.getElementById('cpf').value,
        nome: document.getElementById('nome').value,
        cep: document.getElementById('cep').value,
        logradouro: document.getElementById('logradouro').value,
        numero: document.getElementById('numero').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value
    };

    salvarNoLocalStorage(novoCadastro);
    form.reset();
    cepStatus.textContent = "";
    renderizarTabela();
});

function salvarNoLocalStorage(objeto) {
    const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
    cadastros.push(objeto);
    localStorage.setItem('cadastros', JSON.stringify(cadastros));
}

// --- ETAPA 7: Ler LocalStorage e Renderizar Tabela ---
function renderizarTabela() {
    const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];

    // Alternar visibilidade da mensagem de "vazio"
    if (cadastros.length === 0) {
        tableWrapper.hidden = true;
        emptyMessage.hidden = false;
        return;
    }

    tableWrapper.hidden = false;
    emptyMessage.hidden = true;
    tabelaBody.innerHTML = "";

    cadastros.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.cpf}</td>
            <td>${item.nome}</td>
            <td>${item.cep}</td>
            <td>${item.logradouro}, ${item.numero}</td>
            <td>${item.bairro}</td>
            <td>${item.cidade}/${item.estado}</td>
            <td>
                <button class="btn--danger" onclick="excluirRegistro('${item.id}')">Excluir</button>
            </td>
        `;
        tabelaBody.appendChild(tr);
    });
}

// --- ETAPA 8: Implementar botão de excluir ---
window.excluirRegistro = (id) => {
    if (confirm("Deseja realmente excluir este registro?")) {
        let cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
        cadastros = cadastros.filter(c => c.id !== id);
        localStorage.setItem('cadastros', JSON.stringify(cadastros));
        renderizarTabela();
    }
};

// --- Botão Limpar ---
btnLimpar.addEventListener('click', () => {
    form.reset();
    cepStatus.textContent = "";
});

// Inicialização: Renderiza a tabela ao carregar a página
renderizarTabela();
