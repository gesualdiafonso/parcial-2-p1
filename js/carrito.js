/**
 * Programacion 1
 * Contreras, Nairut
 * Gesualdi, Afonso
 */

'use strict'
// Variable para agregar los productos al carrito
let carrito = {};



// Funcion para cargar el carrito del localStorange
function cargarCarritoDeLocalStorage() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
}

// Funcion para salvar el carrito en localStorange
function guardarCarritoNoLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Cargar el carrito cuando incia la pagina
cargarCarritoDeLocalStorage();
renderCartModal();

/**
 * function openCarrito() {
    if (!document.getElementById("modal-back")) {
        const modalBackground = document.createElement("div");
        modalBackground.className = "modal-back";

        modalBackground.innerHTML = 
            <div class="card-modal">
                <div class="modal-encabezado">
                    <h2>Carrito</h2>
                    <button id="cierreModal" type="button" class="btn btn-primary">X</button>
                </div>
                <div class="linea"></div>
                <div class="card-carrito px-5" id="cartItemsContainer"></div>
                <div class="botones">
                    <button type="button" class="btn btn-primary mt-lg-3 mx-auto" onclick="checkout()">Comprar</button>
                    <button type="button" class="btn btn-primary mt-lg-3 mx-auto" onclick="clearCart()">Quitar Carrito</button>
                </div>
            </div>
        ;

        document.body.appendChild(modalBackground);
        document.getElementById("cierreModal").addEventListener("click", closeCarrito);
    }
    renderCartModal();
}
    
 */

// Función que abre el carrito
document.querySelector(".carrito").addEventListener("click", openCarrito);

function openCarrito() {
    if (!document.getElementById("modal-back")) {
        const modalBackground = document.createElement("div");
        modalBackground.className = "modal-back";
        modalBackground.id = "modal-back";

        const cardModal = document.createElement("div");
        cardModal.className = "card-modal";

        const modalHeader = document.createElement("div");
        modalHeader.className = "modal-encabezado";

        const modalTitle = document.createElement("h2");
        modalTitle.textContent = "Carrito";

        const closeModalButton = document.createElement("button");
        closeModalButton.id = "cierreModal";
        closeModalButton.type = "button";
        closeModalButton.className = "btn btn-primary";
        closeModalButton.textContent = "X";
        closeModalButton.addEventListener("click", closeCarrito);

        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeModalButton);

        const linea = document.createElement("div");
        linea.className = "linea";

        const cartItemsContainer = document.createElement("div");
        cartItemsContainer.className = "card-carrito px-5";
        cartItemsContainer.id = "cartItemsContainer";

        const botones = document.createElement("div");
        botones.className = "botones";

        const comprarButton = document.createElement("button");
        comprarButton.type = "button";
        comprarButton.className = "btn btn-primary mt-lg-3 mx-auto";
        comprarButton.textContent = "Comprar";
        comprarButton.addEventListener("click", checkout);

        const clearButton = document.createElement("button");
        clearButton.type = "button";
        clearButton.className = "btn btn-primary mt-lg-3 mx-auto";
        clearButton.textContent = "Quitar Carrito";
        clearButton.addEventListener("click", clearCart);

        botones.appendChild(comprarButton);
        botones.appendChild(clearButton);

        cardModal.appendChild(modalHeader);
        cardModal.appendChild(linea);
        cardModal.appendChild(cartItemsContainer);
        cardModal.appendChild(botones);

        modalBackground.appendChild(cardModal);

        document.body.appendChild(modalBackground);
    }
    renderCartModal();
}

// Cierre del modal
function closeCarrito() {
    const modal = document.querySelector(".modal-back");
    if (modal) {
        modal.remove();
    }
}

/**
 * function renderCartModal() {
    const carritoContainer = document.getElementById("cartItemsContainer");
    if (carritoContainer) {
        carritoContainer.innerHTML = "";

        let total = 0;
        let totalItems = 0;

        for (const productoId in carrito) {
            const item = carrito[productoId];
            const itemTotal = item.price * item.cantidad;
            total += itemTotal;
            totalItems += item.cantidad;

            const carritoItem = document.createElement("div");
            carritoItem.classList.add("card", "mb-3");
            carritoItem.innerHTML = 
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${item.image}" alt="${item.name}" class="img-fluid img-stl">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h3 class="card-title">${item.name}</h3>
                            <span class="card-text text-body-secondary">Restan ${item.stock} en stock</span>
                            <span class="card-text text-body-secondary">Cantidad: ${item.cantidad}</span>
                            <span class="h3 text-center fw-semibold my-lg-5">U$${itemTotal.toLocaleString()}</span>
                        </div>
                        <div class="button-card">
                            <button type="button" class="btn btn-primary mt-lg-3 mx-auto" onclick="checkoutItem(${productoId})">Agregar mas</button>
                            <button type="button" class="btn btn-primary mt-lg-3 mx-auto" onclick="removeFromCart(${productoId})">Borrar</button>
                        </div>
                    </div>
                </div>
            ;

            carritoContainer.appendChild(carritoItem);
        }

        // agregar la cantidade total de itens y el valor total
        const totalContainer = document.createElement("div");
        totalContainer.className = "total-info d-flex justify-content-between mt-3";
        
        const totalItemsLabel = document.createElement("span");
        totalItemsLabel.textContent = Total de itens: ${totalItems};

        const totalAmountLabel = document.createElement("span");
        totalAmountLabel.textContent = Total a pagar: U$ ${total.toFixed(2)};

        totalContainer.appendChild(totalItemsLabel);
        totalContainer.appendChild(totalAmountLabel);

        carritoContainer.appendChild(totalContainer);
    }
}
 */

// Funcion para renderizar los items del carrito
function renderCartModal() {
    const carritoContainer = document.getElementById("cartItemsContainer");
    if (carritoContainer) {
        carritoContainer.textContent = "";

        let total = 0;
        let totalItems = 0;

        for (const productoId in carrito) {
            const item = carrito[productoId];
            const itemTotal = item.price * item.cantidad;
            total += itemTotal;
            totalItems += item.cantidad;

            const carritoItem = document.createElement("div");
            carritoItem.className = "card mb-3";

            const row = document.createElement("div");
            row.className = "row g-0";

            const colImg = document.createElement("div");
            colImg.className = "col-md-4 align-content-center";

            const img = document.createElement("img");
            img.src = item.image;
            img.alt = item.name;
            img.className = "img-fluid mt-auto";

            colImg.appendChild(img);

            const colDetails = document.createElement("div");
            colDetails.className = "col-md-8";

            const cardBody = document.createElement("div");
            cardBody.className = "card-body";

            const title = document.createElement("h3");
            title.className = "card-title";
            title.textContent = item.name;

            // Aqui estão as alterações sugeridas
            const stockInfo = document.createElement("span");
            stockInfo.className = "card-text text-body-secondary p-1";
            stockInfo.textContent = `Restan ${item.stock} en stock`;

            const quantityInfo = document.createElement("span");
            quantityInfo.className = "card-text text-body-secondary";
            quantityInfo.textContent = `Cantidad: ${item.cantidad}`;

            const priceInfo = document.createElement("span");
            priceInfo.className = "h3 text-center fw-semibold my-lg-5";
            priceInfo.textContent = `U$${itemTotal.toLocaleString()}`;

            // Novo contêiner para stock e cantidad
            const stockCantidadContainer = document.createElement("div");
            stockCantidadContainer.className = "d-flex justify-content-between my-2"; // Classe para organizar layout flexível
            stockCantidadContainer.appendChild(stockInfo);
            stockCantidadContainer.appendChild(quantityInfo);

            // Adiciona os elementos ao cardBody
            cardBody.appendChild(title);
            cardBody.appendChild(stockCantidadContainer); // Adiciona o contêiner novo
            cardBody.appendChild(priceInfo);

            // Ajusta os botões
            const buttonCard = document.createElement("div");
            buttonCard.className = "button-card d-flex justify-content-around mt-1 mb-3"; // Classe para organizar os botões

            const addButton = document.createElement("button");
            addButton.type = "button";
            addButton.className = "btn btn-primary";
            addButton.textContent = "Agregar más";
            addButton.addEventListener("click", () => checkoutItem(productoId));

            const removeButton = document.createElement("button");
            removeButton.type = "button";
            removeButton.className = "btn btn-primary";
            removeButton.textContent = "Borrar";
            removeButton.addEventListener("click", () => removeFromCart(productoId));

            // Adiciona os botões ao contêiner
            buttonCard.appendChild(addButton);
            buttonCard.appendChild(removeButton);

            // Continua adicionando os elementos
            colDetails.appendChild(cardBody);
            colDetails.appendChild(buttonCard);

            row.appendChild(colImg);
            row.appendChild(colDetails);

            carritoItem.appendChild(row);

            carritoContainer.appendChild(carritoItem);
        }

        const totalContainer = document.createElement("div");
        totalContainer.className = "total-info d-flex justify-content-between mt-3";

        const totalItemsLabel = document.createElement("span");
        totalItemsLabel.textContent = `Total de itens: ${totalItems}`;

        const totalAmountLabel = document.createElement("span");
        totalAmountLabel.textContent = `Total a pagar: U$${total.toFixed(2)}`;

        totalContainer.appendChild(totalItemsLabel);
        totalContainer.appendChild(totalAmountLabel);

        carritoContainer.appendChild(totalContainer);
    }
}

// Funcion para add un item al carrito
function agregarAlCarrito(productId) {
    const producto = productosGlobal.find(p => p.id === productId);
    if (!producto) return;

    if (carrito[productId]) {
        if (carrito[productId].cantidad < producto.stock) {
            carrito[productId].cantidad++;
            alert(`El producto "${producto.name}" fue agregado al carrito con éxito!`);
        } else {
            alert("Estoque insuficiente!");
        }
    } else {
        carrito[productId] = { ...producto, cantidad: 1 };
        alert(`El producto "${producto.name}" fue agregado al carrito con éxito!`);
    }

    guardarCarritoNoLocalStorage();
    renderCartModal();
}

// Funcion para add un item al carrito
function checkoutItem(productId) {
    const producto = productosGlobal.find(p => p.id === productId);
    if (!producto) return;

    // Verifica se ainda há estoque disponível
    if (carrito[productId].cantidad < producto.stock) {
        carrito[productId].cantidad++;  // Aumenta a quantidade no carrinho
        producto.stock--;  // Reduz o estoque do produto
    } else {
        alert("Estoque insuficiente!");
    }

    guardarCarritoNoLocalStorage();  // Salva localStorage
    renderCartModal();  // actualizar os valores
}

// Funcion para remover la cantidad de item
function removeFromCart(productId) {
    const item = carrito[productId];
    
    if (item.cantidad > 1) {
        //Dicto la cantidad
        item.cantidad--;
    } else {
        //Borro el item de carrito 
        delete carrito[productId];
    }
    
    guardarCarritoNoLocalStorage();
    renderCartModal();
}

//Funcion para limpiar el carrito todo 
function clearCart() {
    carrito = {};
    guardarCarritoNoLocalStorage();
    renderCartModal();
}

// Função de simular o checkout
function checkout() {
    // Verifica se o carrinho está vazio
    if (Object.keys(carrito).length === 0) {
        alert("O carrinho está vazio! Adicione produtos antes de finalizar a compra.");
        return; // Interrompe a execução se o carrinho estiver vazio
    }

    // Caso o carrinho tenha itens, executa o checkout
    alert("Compra realizada com sucesso!");
    clearCart(); // Limpa o carrinho
}

