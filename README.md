# 📬 Aula 07 — Formulário com Busca de CEP

> **Professor:** Prof. Ms. Ricardo Leme  
> **Unidade:** Fatec Itu
> **Tema:** Fetch API, LocalStorage e Manipulação do DOM

---

## 🎯 Objetivo da Aula

Nesta aula, vamos construir **ao vivo** um formulário de cadastro de endereço que:

1. Busca dados de endereço automaticamente a partir do CEP digitado (consumindo uma API pública)
2. Salva os registros no **LocalStorage** do navegador (sem precisar de servidor ou banco de dados)
3. Exibe os registros salvos em uma tabela com opção de **exclusão**

---

## 🗂️ Estrutura de Arquivos

```
aula07-cep/
├── index.html   ← Estrutura da página (HTML semântico)
├── style.css    ← Estilos com 8pt Grid System (já pronto)
├── app.js       ← JavaScript (será desenvolvido em aula! ⚠️)
├── .gitignore   ← Ignora o app.js no Git
└── README.md    ← Este arquivo
```

> **⚠️ Atenção:** O arquivo `app.js` está no `.gitignore`.  
> Ele será **criado do zero com os alunos durante a aula**.

---

## 💡 Conceitos Abordados

### 1. Fetch API

A **Fetch API** é a forma moderna de fazer requisições HTTP no JavaScript. Ela substitui o antigo `XMLHttpRequest` e funciona com **Promises**.

```js
// Sintaxe básica com async/await
async function buscarDados(url) {
  const resposta = await fetch(url);   // faz a requisição
  const dados = await resposta.json(); // converte para objeto JS
  return dados;
}
```

Neste projeto, utilizamos a **API pública ViaCEP**:

```
https://viacep.com.br/ws/{CEP}/json/
```

**Exemplo de retorno da API para o CEP `01310-100`:**

```json
{
  "cep": "01310-100",
  "logradouro": "Avenida Paulista",
  "bairro": "Bela Vista",
  "localidade": "São Paulo",
  "uf": "SP"
}
```

---

### 2. LocalStorage

O **LocalStorage** é um mecanismo do navegador que permite guardar dados **sem precisar de servidor**. Os dados persistem mesmo após fechar o navegador.

| Método | O que faz |
|---|---|
| `localStorage.setItem('chave', valor)` | Salva um dado |
| `localStorage.getItem('chave')` | Lê um dado |
| `localStorage.removeItem('chave')` | Remove um dado |
| `localStorage.clear()` | Apaga tudo |

> ⚠️ O LocalStorage **só armazena strings**. Para salvar objetos, precisamos convertê-los com `JSON.stringify()` e `JSON.parse()`.

```js
// Salvando um objeto
const pessoa = { nome: "Ana", cidade: "São Paulo" };
localStorage.setItem('pessoa', JSON.stringify(pessoa));

// Lendo de volta
const dados = JSON.parse(localStorage.getItem('pessoa'));
console.log(dados.nome); // "Ana"
```

---

### 3. Manipulação do DOM

**DOM** (Document Object Model) é a representação da página HTML como uma árvore de objetos JavaScript. Podemos **ler e modificar** a página dinamicamente.

```js
// Selecionar elementos
const campo = document.getElementById('cep');
const botao = document.querySelector('.btn--primary');

// Ler e escrever valores
campo.value = '01310100';

// Escutar eventos
campo.addEventListener('input', function() {
  console.log('O usuário digitou:', campo.value);
});

// Criar elementos dinamicamente
const linha = document.createElement('tr');
linha.innerHTML = `<td>Dado 1</td><td>Dado 2</td>`;
document.querySelector('tbody').appendChild(linha);
```

---

### 4. Sistema de Grid (8pt Grid)

O `style.css` utiliza o **8pt Grid System**: todos os espaçamentos são múltiplos de 8px. Isso garante **consistência visual** e facilita o trabalho em equipe.

```
4px   →  micro espaço (entre label e input)
8px   →  espaço base (padding interno)
16px  →  espaço médio (gap entre campos)
24px  →  espaço grande (margin entre seções)
32px  →  padding dos cards
```

No CSS, essas medidas ficam em variáveis para fácil reutilização:

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 32px;
}
```

---

## 🔗 API Utilizada

| Informação | Detalhe |
|---|---|
| **Nome** | ViaCEP |
| **URL base** | `https://viacep.com.br` |
| **Endpoint** | `/ws/{CEP}/json/` |
| **Método** | `GET` |
| **Autenticação** | Nenhuma (gratuita e pública) |
| **Documentação** | [viacep.com.br](https://viacep.com.br) |

---

## 🚀 Como Executar o Projeto

### Pré-requisito
Instale a extensão **Live Server** no VS Code.

### Passos

1. Clone ou baixe o repositório:
   ```bash
   git clone https://github.com/seu-usuario/aula07-cep.git
   ```

2. Abra a pasta no VS Code:
   ```bash
   code aula07-cep
   ```

3. Crie o arquivo `app.js` (desenvolvido em aula)

4. Clique com botão direito no `index.html` → **"Open with Live Server"**

---

## 📋 Roteiro de Desenvolvimento do `app.js`

> Este roteiro será seguido durante a aula. Tente implementar cada etapa antes de ver a solução!

- [ ] **Etapa 1** — Selecionar o campo `#cep` e ouvir o evento `input`
- [ ] **Etapa 2** — Remover a máscara do CEP e verificar se tem 8 dígitos
- [ ] **Etapa 3** — Fazer o `fetch` na API ViaCEP
- [ ] **Etapa 4** — Preencher os campos do formulário com os dados retornados
- [ ] **Etapa 5** — Capturar o `submit` do formulário e validar os dados
- [ ] **Etapa 6** — Salvar o registro no `LocalStorage`
- [ ] **Etapa 7** — Ler o `LocalStorage` e renderizar a tabela na tela
- [ ] **Etapa 8** — Implementar o botão de excluir registro

---

## 📚 Referências

- [MDN — Fetch API](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API)
- [MDN — LocalStorage](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/localStorage)
- [MDN — Manipulação do DOM](https://developer.mozilla.org/pt-BR/docs/Web/API/Document_Object_Model)
- [ViaCEP — Documentação](https://viacep.com.br/)
- [8pt Grid System](https://spec.fm/specifics/8-pt-grid)
- [CSS Grid Layout — MDN](https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_grid_layout)

---

*Desenvolvido para fins educacionais — Prof. Ms. Ricardo Leme*
