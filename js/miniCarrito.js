/**
 * Programacion 1
 * Contreras, Nairut
 * Gesualdi, Afonso
 */
'use strict'

//Referencia global para el mini carrito cuando hover

const carritoBtn = document.querySelector(".carrito");
const miniContainer = document.createElement("div");

miniContainer.className = "mini-cart"
miniContainer.style.display = "none";
carritoBtn.parentNode.appendChild(miniContainer);

//Evento para exhibición y ocultar el mini-cart
carritoBtn.addEventListener("mouseover", showMiniCarrito);
carritoBtn.addEventListener("mouseout", hideMiniCarrito);
miniContainer.addEventListener("mouseover", showMiniCarrito);
miniContainer.addEventListener("mouseout", hideMiniCarrito);

//Funcion

function showMiniCarrito (){
    miniContainer.style.display = "block"
    renderMiniCarrito();
}

function hideMiniCarrito(){
    miniContainer.style.display = "none";
}

//Function de renderizacion

// Funcon de renderizacion del mini-carrito
function renderMiniCarrito(){
    // Limpia el mini-cart antes de ser renderizado
    miniContainer.innerHTML = "";

    // Container para los itens de carrito
    const itemsContainer = document.createElement("div");

    // Variable para guardar el total
    let total = 0;

    // Loop por el los produtos in carrito
    for (const productId in carrito) {
        const item = carrito[productId];
        total += item.price * item.cantidad;

        // Container del item en mini-cart
        const itemContainer = document.createElement("div");
        itemContainer.className = "mini-cart-item d-flex align-items-center";

        // Imagem produto
        const itemImage = document.createElement("img");
        itemImage.src = item.image;  // Acessa a URL da imagem do JSON
        itemImage.alt = item.name;
        itemImage.className = "mini-cart-image img-thumbnail me-2"; // Adiciona classes Bootstrap

        // Nombre y cantidade produto
        const itemName = document.createElement("span");
        itemName.textContent = `${item.name} (x${item.cantidad})`;
        itemName.className = "mini-cart-name";

        // Precio del item
        const itemPrice = document.createElement("span");
        itemPrice.textContent = `U$ ${(item.price * item.cantidad).toFixed(2)}`;
        itemPrice.className = "mini-cart-price ms-auto";

        // Add la imagem, el nombre y el precio al clicar en itemContainer
        itemContainer.appendChild(itemImage);
        itemContainer.appendChild(itemName);
        itemContainer.appendChild(itemPrice);

        // Add el itemContainer al itemsContainer
        itemsContainer.appendChild(itemContainer);
    }

    // Add el container de itens al mini-cart
    miniContainer.appendChild(itemsContainer);

    // Seccion de subtotal
    const totalContainer = document.createElement("div");
    totalContainer.className = "mini-cart-total d-flex justify-content-between align-items-center mt-3 text-dark";
    
    const totalLabel = document.createElement("span");
    totalLabel.textContent = "Total: U$ ";

    const totalAmount = document.createElement("span");
    totalAmount.textContent = total.toFixed(2);

    totalContainer.appendChild(totalLabel);
    totalContainer.appendChild(totalAmount);

    // Btn de checkout
    const checkoutBtn = document.createElement("button");
    checkoutBtn.className = "btn btn-primary btn-sm w-100 mt-2";
    checkoutBtn.textContent = "Finalizar a compra";
    checkoutBtn.addEventListener("click", checkout);

    // Add el subtotal y el btn de chekout al mini-cart 
    miniContainer.appendChild(totalContainer);
    miniContainer.appendChild(checkoutBtn);
}



function checkout(){
    alert("Yendo para finalizar la compra...")
}