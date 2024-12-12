let products = [];
let filter = {
    category: '',
    sortBy: ''
};

// Função para obter os produtos
function getProducts() {
    fetch("https://fakestoreapi.com/products")
    .then(resposta => resposta.json())
    .then(resposta => {
        products = resposta;
        insertProducts(products); // Chama a função para inserir os produtos inicialmente
    });
}

getProducts();

// Função para inserir os produtos filtrados e ordenados
function insertProducts(list) {
    const produtos = document.getElementById("produtos");
    produtos.innerHTML = ''; // Limpa a lista de produtos
    
    // Filtragem por categoria
    let filteredList = list;

    if (filter.category) {
        filteredList = filteredList.filter(item => item.category.toLowerCase() === filter.category.toLowerCase());
    }

    // Ordenação por preço ou avaliação
    if (filter.sortBy) {
        if (filter.sortBy === 'priceAsc') {
            filteredList.sort((a, b) => a.price - b.price);
        } else if (filter.sortBy === 'ratingDesc') {
            filteredList.sort((a, b) => b.rating.rate - a.rating.rate);
        }
    }

    // Exibir os produtos filtrados
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

// Função para aplicar os filtros quando o botão for clicado
function applyFilters() {
    // Obter os valores selecionados nos selects
    const categorySelect = document.getElementById("category") || document.getElementById("category-menu");
    const sortSelect = document.getElementById("sort") || document.getElementById("sort-menu");
    
    // Atualizar os filtros com os valores selecionados
    filter.category = categorySelect.value; // A categoria selecionada
    filter.sortBy = sortSelect.value; // O tipo de ordenação (preço ou avaliação)
    
    // Aplicar os filtros e re-exibir os produtos
    insertProducts(products);
    
    // Fechar o menu de filtro lateral após aplicar os filtros
    toggleMenu(); // Chama a função para fechar o menu lateral
    showFilter(); // Fecha a gaveta mobile
}

// Função para alternar o menu lateral
function toggleMenu() {
    const menuFiltro = document.getElementById("menu-filtro");
    menuFiltro.classList.toggle("transform"); // Alterna a visibilidade do menu
    menuFiltro.classList.toggle("-translate-x-full");
}

// Função para exibir ou ocultar a gaveta de filtro e o overlay
function showFilter() {
    const gaveta = document.getElementById("gaveta");
    const overlay = document.getElementById("overlay");

    const isHidden = gaveta.classList.contains("right-0");

    // Atualiza o estado da gaveta (mostrar ou esconder)
    if (isHidden) {
        gaveta.classList.remove("right-0");
        gaveta.classList.add("-right-full");
    } else {
        gaveta.classList.remove("-right-full");
        gaveta.classList.add("right-0");
    }

    // Atualiza o estado do overlay (mostrar ou esconder)
    if (isHidden) {
        overlay.classList.add("invisible");
        overlay.classList.remove("opacity-70");
        overlay.classList.add("opacity-0");
    } else {
        overlay.classList.remove("invisible");
        overlay.classList.add("opacity-70");
    }
}

// Chamar a função para carregar os produtos ao iniciar
getProducts();


