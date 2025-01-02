let products = [];
let filter = {
    category: '',
    sortBy: ''
};

// Função para obter os produtos
function getProducts() {
    fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(response => {
            products = response;
            insertProducts(products); // Chama a função para inserir os produtos inicialmente
        });
}

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

// Função para aplicar os filtros
function applyFilters() {
    // Identificar se é mobile ou desktop
    const isMobile = window.innerWidth < 768;

    // Selecionar os elementos de filtro apropriados
    const categorySelect = isMobile
        ? document.getElementById("category-menu-mobile")
        : document.getElementById("category-menu-desktop");
    const sortSelect = isMobile
        ? document.getElementById("sort-menu-mobile")
        : document.getElementById("sort-menu-desktop");

    // Atualizar os filtros com os valores selecionados
    filter.category = categorySelect?.value || '';
    filter.sortBy = sortSelect?.value || '';

    // Aplicar os filtros e reexibir os produtos
    insertProducts(products);

    // Fechar menus
    if (isMobile) {
        showFilter(); // Fecha o menu mobile
    } else {
        toggleMenu(); // Fecha o menu desktop
    }
}

// Função para alternar o menu lateral (desktop)
function toggleMenu() {
    const menuFiltro = document.getElementById("menu-filtro");
    menuFiltro.classList.toggle("-translate-x-full"); // Alterna visibilidade
}

// Função para exibir ou ocultar a gaveta de filtro e o overlay (mobile)
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

// Carregar os produtos ao iniciar
getProducts();



