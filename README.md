# fake-store

# HTML
O HTML oferece:

Um campo de busca para produtos.
Um botão flutuante para abrir filtros.
Um painel deslizante para aplicar filtros.
Uma grade para listar os produtos.
---

1. Corpo (`<body>`)
- Classe do `<body>`: 
  - `bg-`: Define o fundo verde da página.
  - `p-3`: Aplica um espaçamento interno (padding) de 3.???

2. Contêiner Principal (`<main>`):
- **Classe do `<main>`: 
  - `bg-white`: Define um fundo branco para o contêiner principal.
  - `p-3`: Aplica um espaçamento interno (padding) de 3.???
  - `rounded-md`: Arredonda os cantos.

2.1. Busca de Produtos:**
- **Campo de Busca (`<input>`):**
  - Permite ao usuário digitar o termo de busca.
  - Estilo:
    - `w-full`: Ocupa 100% da largura do container.
    - `h-[40px]`: Define altura de 40px.
    - `border-2 border-gray-400`: Cria uma borda cinza de 2px.
    - `focus:border-green`: Muda a borda para verde ao focar.
    - `outline-none`: Remove o contorno padrão amarelado.
    - `rounded-md`: Arredonda os cantos.
    - `pl-3`: Adiciona espaçamento interno (padding) à esquerda.???
    - `duration-100`: Suaviza transições em 100ms.

---

2.2. Botão de Filtro (`<div>` com `onclick="showFilter()"`):**
- Este botão redondo e flutuante ativa a exibição de filtros.
- Estilo do botão:
  - `w-[40px] h-[40px]`: Define dimensões de 50px por 50px.
  - `bg-green`: Fundo verde.
  - `rounded-full`: Torna o botão circular.
  - `fixed bottom-6 right-3`: Posiciona o botão fixamente no canto inferior direito.
  - `flex justify-center items-center`: Centraliza o ícone dentro do botão.
  - `fill-white`: Define a cor do ícone como branca.

---

2.3. Overlay e Gaveta de Filtros:**
Overlay (`#overlay`)**:
  - Uma camada escura e semi-transparente aparece ao abrir o filtro.
  - Estilo:
    - `w-full h-full`: Ocupa toda a tela.
    - `bg-black opacity-0 invisible`: Inicialmente invisível.
    - `fixed top-0 left-0`: Posicionado no topo esquerdo da tela.
    - `duration-200`: Suaviza a transição.

Gaveta de Filtros (`#gaveta`)**:
  - Um painel deslizante à direita que contém opções de filtro.
  - Estilo:
    - `w-9/12 h-full`: Ocupa 9/12 da largura da tela e toda a altura.
    - `bg-white`: Fundo branco.
    - `fixed top-0 -right-full`: Posicionado fora da tela inicialmente.
    - `duration-200`: Suaviza a transição.

Opções de Filtros (`<select>`):**
  - Filtros de categorias e ordenação.

---

 2.4. Lista de Produtos (`<section id="produtos">`):**
- Uma seção vazia inicialmente, destinada a exibir os produtos da loja.
- Estilo:
  - `grid gap-3`: Organiza os produtos em uma grade com espaçamento.
  - `md:grid-cols-2 lg:grid-cols-4`: Configurações de responsividade (2 colunas em telas médias e 4 em telas grandes).

---
# JAVASCRIPT
utiliza JavaScript para buscar, exibir produtos de uma API e gerenciar um sistema de filtros com uma interface dinâmica:

 #Declaração de Variáveis
- `let products = [];`  
  Um array vazio para armazenar os produtos recebidos da API.

- `let filter = [];`  
  Um array vazio para armazenar critérios de filtro. (Não utilizado diretamente no código fornecido, mas presumivelmente para futuros filtros.)

---

#função `getProducts()`
Responsável por buscar os produtos da API e armazená-los no array `products`.

```javascript
fetch("https://fakestoreapi.com/products")
```
- Faz uma requisição `GET` à API `https://fakestoreapi.com/products` para obter a lista de produtos.

```javascript
.then(resposta => resposta.json())
```
- Converte a resposta da API em JSON.

```javascript
.then(resposta => {
    products = resposta;
    insertProducts(products);
})
```
- Armazena os dados no array `products` e chama a função `insertProducts(products)` para renderizar os produtos na interface.
---

#Função `insertProducts(list)`
Responsável por inserir os produtos fornecidos como uma lista na interface.

```javascript
produtos.innerHTML = '';
```
- Limpa qualquer conteúdo existente no elemento HTML identificado como `produtos`.

```javascript
list.map(item => { ... })
```
- Itera sobre cada item da lista de produtos fornecida e cria o HTML correspondente.

```javascript
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
```
- Para cada item, adiciona um card contendo:
  - **Nota do produto**: exibida no canto superior direito.
  - **Imagem do produto**.
  - **Título e categoria**.
  - **Preço**: formatado com `toFixed(2)` para exibir 2 casas decimais.

---

### Função `showFilter()`
Controla a exibição do filtro lateral e da cortina de fundo (overlay).

```javascript
if(overlay.classList.contains("invisible")) {
    overlay.classList.remove("invisible");
    overlay.classList.remove("opacity-0");
    overlay.classList.add("opacity-70");
}
```
- Caso o elemento com id `overlay` esteja invisível:
  - Remove a classe `invisible` e `opacity-0` (opacidade zero).
  - Adiciona a classe `opacity-70` (visível com 70% de opacidade).

```javascript
if(gaveta.classList.contains("-right-full")) {
    gaveta.classList.remove("-right-full");
    gaveta.classList.add("right-0");
}
```
- Caso o elemento com id `gaveta` esteja escondido fora da tela:
  - Remove a classe `-right-full` e adiciona a classe `right-0` para posicioná-lo visível.

O **else** de ambos os trechos inverte as alterações feitas, permitindo ocultar novamente os elementos.

---

### Fluxo Geral
1. **Carregamento inicial**:
   - A função `getProducts()` é chamada ao carregar o script.
   - Faz a requisição à API, processa os produtos e exibe-os usando `insertProducts`.

2. **Exibição dos produtos**:
   - Os produtos são renderizados como cards dinâmicos com informações relevantes.

3. **Controle de filtros**:
   - A função `showFilter()` alterna a visibilidade da gaveta de filtros e do overlay ao ser acionada (provavelmente ao clicar em um botão).

Esse código cria uma interface funcional e responsiva que utiliza dados de uma API para exibir produtos e gerenciar filtros de forma interativa.


