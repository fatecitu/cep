// ================================================================
//  APP.JS — Aula 07: Formulário com CEP
//  ================================================================
//  Este arquivo será desenvolvido junto com os alunos em aula.
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
//  ROTEIRO
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
