# fake-store

# HTML
Este é um código HTML que cria uma página web para uma loja fictícia chamada "Fake Store". Ele utiliza a biblioteca CSS Tailwind para estilização e alguns elementos interativos com JavaScript. Vou detalhar os principais componentes para facilitar o seu estudo:

---

### Estrutura do Documento HTML
1. **`<!DOCTYPE html>`**: Declara que este é um documento HTML5.
2. **`<html lang="pt-BR">`**: Define o idioma da página como português do Brasil.
3. **`<head>`**: Contém metadados e links para estilos e scripts externos.
   - **`<meta charset="UTF-8">`**: Define a codificação de caracteres como UTF-8 (permite caracteres acentuados).
   - **`<meta name="viewport" content="width=device-width, initial-scale=1.0">`**: Ajusta a visualização para dispositivos móveis.
   - **`<title>Fake Store</title>`**: Define o título exibido na aba do navegador.
   - **`<script src="https://cdn.tailwindcss.com"></script>`**: Carrega a biblioteca Tailwind CSS para estilização.
   - **Configuração do Tailwind**: O script interno personaliza as configurações do Tailwind (neste caso, não adiciona cores extras, mas deixa espaço para personalização futura).

4. **`<body>`**: Contém o conteúdo visível da página.
   - A classe `bg-teal-900 p-3` define um fundo verde-azulado escuro com preenchimento (`padding`).

---

### Componentes da Página
#### 1. **Busca**
- **Menu Hambúrguer**: Botão que aparece em dispositivos menores (classe `sm:flex`) e serve para abrir um menu lateral ao clicar.
- **Input de Busca**: Campo para o usuário pesquisar itens.
- **Botão de Filtro (Mobile)**:
  - Um botão circular fixado no canto inferior direito da tela para abrir os filtros.

#### 2. **Overlay e Gaveta de Filtros (Mobile)**
- **Overlay**: Uma cortina escura aparece ao abrir os filtros, impedindo interações com outros elementos.
- **Gaveta de Filtros**: Um menu lateral deslizante que contém:
  - Seleção de categorias.
  - Ordenação de produtos.
  - Botão para aplicar filtros.

#### 3. **Menu Lateral (Desktop)**
- Exibido somente em telas maiores (classe `md:block`).
- Contém os mesmos filtros que a versão mobile.

#### 4. **Lista de Produtos**
- **Seção `produtos`**: Um grid dinâmico onde os produtos seriam exibidos. Atualmente, está vazia.

---

### Scripts e Interatividade
1. **Tailwind e Boxicons**:
   - **Tailwind CSS**: Facilita a criação de estilos responsivos e modernos.
   - **Boxicons**: Biblioteca de ícones usada para o menu e o botão de filtro.
2. **Interatividade**:
   - **Funções JavaScript**: 
     - `toggleMenu()`: Provavelmente usada para abrir/fechar o menu hambúrguer.
     - `showFilter()`: Mostra ou esconde a gaveta de filtros e o overlay.
     - `applyFilters()`: Aplica os filtros escolhidos pelo usuário.

3. **Arquivo `index.js`**:
   - Está referenciado no final do corpo (`<script src="index.js"></script>`). Provavelmente, contém a lógica para carregar produtos e lidar com interações de filtros e busca.

---

### Estilização e Responsividade
1. **Classes do Tailwind**:
   - As classes CSS são altamente configuráveis e ajudam a criar layouts rapidamente.
   - Exemplos:
     - `bg-teal-900`: Cor de fundo.
     - `rounded-full`: Bordas arredondadas (círculo).
     - `flex items-center gap-2`: Layout flexível com espaçamento.
     - `hidden sm:flex`: Oculta o elemento em telas menores que `sm`.

2. **Responsividade**:
   - Usando breakpoints (`sm`, `md`, `lg`) para adaptar o layout a diferentes tamanhos de tela.

---

### O que estudar a seguir:
1. **HTML**:
   - Estrutura básica.
   - Elementos como `div`, `input`, `button`, e `select`.
2. **CSS e Tailwind**:
   - Entender classes utilitárias (estilização rápida e responsiva).
   - Experimentar modificações para aprender na prática.
3. **JavaScript**:
   - Como manipular o DOM (Document Object Model).
   - Funções de interação, como `onclick` e manipulação de classes.
4. **Interatividade**:
   - Aprender como criar e usar filtros dinâmicos.

Se precisar de explicações mais detalhadas sobre algum ponto específico, é só perguntar!
---
# JAVASCRIPT
Este código JavaScript é responsável por gerenciar o carregamento, filtragem e exibição dos produtos de uma loja fictícia. Vou explicar cada parte para facilitar seu entendimento e estudo.

---

### 1. **Variáveis Globais**
```javascript
let products = [];
let filter = {
    category: '',
    sortBy: ''
};
```
- **`products`**: Armazena a lista de produtos obtida da API.
- **`filter`**: Contém os critérios de filtragem e ordenação:
  - `category`: Categoria selecionada para filtrar os produtos.
  - `sortBy`: Tipo de ordenação, como menor preço (`priceAsc`) ou melhor avaliação (`ratingDesc`).

---

### 2. **Função `getProducts`**
```javascript
function getProducts() {
    fetch("https://fakestoreapi.com/products")
    .then(resposta => resposta.json())
    .then(resposta => {
        products = resposta;
        insertProducts(products);
    });
}
```
- **Propósito**: Obtém os produtos da API [FakeStoreAPI](https://fakestoreapi.com/).
- **Detalhes**:
  - Usa `fetch` para fazer uma requisição HTTP e obter os dados.
  - Os dados são convertidos para JSON com `.json()` e armazenados em `products`.
  - Chama a função `insertProducts` para exibir os produtos na tela.

---

### 3. **Função `insertProducts`**
```javascript
function insertProducts(list) {
    const produtos = document.getElementById("produtos");
    produtos.innerHTML = ''; // Limpa a lista de produtos
    
    let filteredList = list;

    if (filter.category) {
        filteredList = filteredList.filter(item => item.category.toLowerCase() === filter.category.toLowerCase());
    }

    if (filter.sortBy) {
        if (filter.sortBy === 'priceAsc') {
            filteredList.sort((a, b) => a.price - b.price);
        } else if (filter.sortBy === 'ratingDesc') {
            filteredList.sort((a, b) => b.rating.rate - a.rating.rate);
        }
    }

    filteredList.forEach(item => {
        produtos.innerHTML += `
            <div class="border border-gray-400 rounded-md overflow-hidden" title="${item.title}">
                <div class="relative">
                    <h6 class="absolute top-3 right-3 bg-teal-900 text-white px-2 py-1 rounded-md font-bold">${item.rating.rate}</h6>
                    <img src="${item.image}" class="w-full h-[250px] p-3 object-contain" />
                </div>
                <div class="p-3">
                    <h5 class="text-xl md:line-clamp-1">${item.title}</h5>
                    <h6 class="text-teal-900 font-bold mb-3">${item.category}</h6>
                    <h2 class="text-3xl text-right font-bold">R$ ${item.price.toFixed(2)}</h2>
                </div>
            </div>
        `;
    });
}
```
- **Propósito**: Exibe os produtos na página, aplicando filtros e ordenação.
- **Processo**:
  1. **Limpeza**: Remove os produtos existentes para exibir apenas os novos.
  2. **Filtragem**: Filtra os produtos por categoria, se especificada.
  3. **Ordenação**:
     - `priceAsc`: Ordena do menor para o maior preço.
     - `ratingDesc`: Ordena do mais bem avaliado para o menos avaliado.
  4. **Renderização**: Cria o HTML para cada produto e adiciona ao elemento com `id="produtos"`.

---

### 4. **Função `applyFilters`**
```javascript
function applyFilters() {
    const categorySelect = document.getElementById("category") || document.getElementById("category-menu");
    const sortSelect = document.getElementById("sort") || document.getElementById("sort-menu");
    
    filter.category = categorySelect.value;
    filter.sortBy = sortSelect.value;

    insertProducts(products);

    toggleMenu();
    showFilter();
}
```
- **Propósito**: Atualiza os filtros e exibe os produtos correspondentes.
- **Passos**:
  1. Obtém os valores dos selects de categoria e ordenação.
  2. Atualiza o objeto `filter` com os valores selecionados.
  3. Chama `insertProducts` para aplicar os filtros e atualizar a lista de produtos.
  4. Fecha os menus de filtro no desktop e no mobile.

---

### 5. **Função `toggleMenu`**
```javascript
function toggleMenu() {
    const menuFiltro = document.getElementById("menu-filtro");
    menuFiltro.classList.toggle("transform");
    menuFiltro.classList.toggle("-translate-x-full");
}
```
- **Propósito**: Mostra ou esconde o menu de filtros no desktop.
- **Detalhes**:
  - Adiciona ou remove as classes `transform` e `-translate-x-full` para manipular a visibilidade do menu.

---

### 6. **Função `showFilter`**
```javascript
function showFilter() {
    const gaveta = document.getElementById("gaveta");
    const overlay = document.getElementById("overlay");

    const isHidden = gaveta.classList.contains("right-0");

    if (isHidden) {
        gaveta.classList.remove("right-0");
        gaveta.classList.add("-right-full");
    } else {
        gaveta.classList.remove("-right-full");
        gaveta.classList.add("right-0");
    }

    if (isHidden) {
        overlay.classList.add("invisible");
        overlay.classList.remove("opacity-70");
        overlay.classList.add("opacity-0");
    } else {
        overlay.classList.remove("invisible");
        overlay.classList.add("opacity-70");
    }
}
```
- **Propósito**: Controla a exibição da gaveta de filtros no mobile.
- **Detalhes**:
  - Alterna entre as classes `-right-full` e `right-0` para esconder ou mostrar a gaveta.
  - Atualiza a visibilidade e opacidade do `overlay` (fundo escuro).

---

### 7. **Chamada Inicial**
```javascript
getProducts();
```
- A função `getProducts` é chamada para carregar os produtos assim que a página é carregada.

---

### Conceitos Importantes para Estudo
1. **`fetch`**:
   - Como fazer requisições HTTP e lidar com Promises.
2. **Manipulação do DOM**:
   - Usando `document.getElementById`, `innerHTML` e classes CSS para criar interatividade.
3. **Array Methods**:
   - `filter`: Para filtrar produtos por categoria.
   - `sort`: Para ordenar os produtos.
   - `forEach`: Para iterar sobre os produtos e gerar o HTML.
4. **Classes e Estilização**:
   - Manipulação dinâmica de classes com `classList`.

Se precisar de mais explicações ou exemplos, é só perguntar!