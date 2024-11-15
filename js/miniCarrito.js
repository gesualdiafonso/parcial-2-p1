/**
 * Programacion 1
 * Contreras, Nairut
 * Gesualdi, Afonso
 */
'use strict'

// Referencia global para o mini-carrito quando hover
const carritoBtn = document.querySelector(".carrito");
const miniContainer = document.createElement("div");

miniContainer.className = "mini-cart";
miniContainer.style.display = "none";

// Criação de um contêiner para o botão do carrinho e o mini-cart
const carritoWrapper = document.createElement("div");
carritoWrapper.className = "carrito-wrapper";
carritoBtn.parentNode.appendChild(carritoWrapper);

// Adiciona o botão do carrinho e o mini-carrito ao contêiner
carritoWrapper.appendChild(carritoBtn);
carritoWrapper.appendChild(miniContainer);

// Evento para exibir e ocultar o mini-cart
carritoWrapper.addEventListener("mouseover", showMiniCarrito);
carritoWrapper.addEventListener("mouseout", hideMiniCarrito);
miniContainer.addEventListener("mouseover", showMiniCarrito);
miniContainer.addEventListener("mouseout", hideMiniCarrito);

// Função para mostrar o mini-carrito
function showMiniCarrito() {
    miniContainer.style.display = "block";
    renderMiniCarrito();
}

// Função para esconder o mini-carrito
function hideMiniCarrito() {
    miniContainer.style.display = "none";
}

// Função de renderização do mini-carrito
function renderMiniCarrito() {
    // Limpa o mini-cart antes de ser renderizado
    miniContainer.innerHTML = "";

    // Container para os itens do carrinho
    const itemsContainer = document.createElement("div");

    // Variável para guardar o total
    let total = 0;

    // Loop pelos produtos no carrinho
    for (const productId in carrito) {
        const item = carrito[productId];
        total += item.price * item.cantidad;

        // Container do item no mini-cart
        const itemContainer = document.createElement("div");
        itemContainer.className = "mini-cart-item d-flex align-items-center";

        // Imagem do produto
        const itemImage = document.createElement("img");
        itemImage.src = item.image;  // Acessa a URL da imagem do JSON
        itemImage.alt = item.name;
        itemImage.className = "mini-cart-image img-thumbnail me-2"; // Adiciona classes Bootstrap

        // Nome e quantidade do produto
        const itemName = document.createElement("span");
        itemName.textContent = `${item.name} (x${item.cantidad})`;
        itemName.className = "mini-cart-name";

        // Preço do item
        const itemPrice = document.createElement("span");
        itemPrice.textContent = `U$ ${(item.price * item.cantidad).toFixed(2)}`;
        itemPrice.className = "mini-cart-price ms-auto";

        // Adiciona a imagem, o nome e o preço ao container do item
        itemContainer.appendChild(itemImage);
        itemContainer.appendChild(itemName);
        itemContainer.appendChild(itemPrice);

        // Adiciona o itemContainer ao itemsContainer
        itemsContainer.appendChild(itemContainer);
    }

    // Adiciona o container de itens ao mini-cart
    miniContainer.appendChild(itemsContainer);

    // Seção de subtotal
    const totalContainer = document.createElement("div");
    totalContainer.className = "mini-cart-total d-flex justify-content-between align-items-center mt-3 text-dark";

    const totalLabel = document.createElement("span");
    totalLabel.textContent = "Total: U$ ";

    const totalAmount = document.createElement("span");
    totalAmount.textContent = total.toFixed(2);

    totalContainer.appendChild(totalLabel);
    totalContainer.appendChild(totalAmount);

    // Botão de checkout
    const checkoutBtn = document.createElement("button");
    checkoutBtn.className = "btn btn-primary btn-sm w-100 mt-2";
    checkoutBtn.textContent = "Finalizar a compra";
    checkoutBtn.addEventListener("click", checkout);

    // Adiciona o subtotal e o botão de checkout ao mini-cart
    miniContainer.appendChild(totalContainer);
    miniContainer.appendChild(checkoutBtn);
}
