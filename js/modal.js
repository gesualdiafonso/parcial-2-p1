/**
 * Programacion 1
 * Contreras, Nairut
 * Gesualdi, Afonso
 */

'use strict'

function openModal(productoID) {
    // Cria o fundo do modal
    const backgroundModal = document.createElement("div");
    backgroundModal.classList.add("modal-background");

    // Cria o conteúdo do modal
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content", "w-50", "px-3", "d-flex", "flex-column");

    // Cabeçalho do modal
    const modalHeader = document.createElement("div");
    modalHeader.classList.add("d-flex", "flex-row", "justify-content-between", "align-items-center", "w-100");
    const modalTitle = document.createElement("h3");
    modalTitle.textContent = "Detalles del Producto";
    const closeButton = document.createElement("button");
    closeButton.id = "closeModal";
    closeButton.type = "button";
    closeButton.classList.add("btn", "btn-primary");
    closeButton.textContent = "Cerrar";

    // Adiciona elementos ao cabeçalho
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);

    // Linha divisória
    const hr = document.createElement("hr");

    // Corpo do modal
    const modalInfo = document.createElement("div");
    modalInfo.classList.add("modal-info", "w-100");

    // Imagem do produto
    const productoImageContainer = document.createElement("div");
    productoImageContainer.classList.add("w-100");
    productoImageContainer.id = "productoImage";

    // Descrição do produto
    const productoDescription = document.createElement("p");
    productoDescription.id = "productoDescription";
    productoDescription.classList.add("w-100");

    // Características
    const productFeaturesContainer = document.createElement("div");
    productFeaturesContainer.classList.add("w-100", "bg-dark", "bg-gradient", "border", "border-1", "rounded-3", "text-white");
    const productFeatures = document.createElement("div");
    productFeatures.id = "productFeatures";
    productFeatures.textContent = "Características";
    productFeaturesContainer.appendChild(productFeatures);

    // Preço e botão de compra
    const priceAndButtonContainer = document.createElement("div");
    priceAndButtonContainer.classList.add("d-flex", "flex-column", "align-items-center", "mt-3");
    const productPrice = document.createElement("span");
    productPrice.id = "productPrice";
    productPrice.classList.add("h2", "fw-bold");
    const addToCartButton = document.createElement("button");
    addToCartButton.type = "button";
    addToCartButton.id = "addToCartButton";
    addToCartButton.classList.add("btn", "btn-success", "mt-2");
    addToCartButton.textContent = "Agregar al Carrito";

    // Adiciona elementos ao container de preço e botão
    priceAndButtonContainer.appendChild(productPrice);
    priceAndButtonContainer.appendChild(addToCartButton);

    // Adiciona os elementos ao corpo do modal
    modalInfo.appendChild(productoImageContainer);
    modalInfo.appendChild(productoDescription);
    modalInfo.appendChild(productFeaturesContainer);
    modalInfo.appendChild(priceAndButtonContainer);

    // Adiciona cabeçalho, linha e corpo ao conteúdo do modal
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(hr);
    modalContent.appendChild(modalInfo);

    // Adiciona o conteúdo ao fundo do modal
    backgroundModal.appendChild(modalContent);
    document.body.appendChild(backgroundModal);

    // Exibe o modal
    setTimeout(() => backgroundModal.classList.add("show"), 10);

    // Fecha o modal ao clicar no botão de fechamento
    closeButton.addEventListener("click", () => {
        backgroundModal.classList.remove("show");
        setTimeout(() => document.body.removeChild(backgroundModal), 300);
    });

    // Busca o produto usando a lista global
    const producto = productosGlobal.find(p => p.id === productoID);

    if (producto) {
        // Atualiza descrição e imagem do produto
        productoDescription.textContent = producto.other;
        const productoImage = document.createElement("img");
        productoImage.src = producto.image;
        productoImage.alt = producto.name;
        productoImage.classList.add("img-fluid", "img-stl");
        productoImageContainer.appendChild(productoImage);

        // Atualiza o preço do produto
        productPrice.textContent = `U$${producto.price.toLocaleString()}`;

        // Configura o botão de adicionar ao carrinho
        addToCartButton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        });

        // Cria uma tabela de características
        if (producto.features) {
            const caracteristicasTabla = document.createElement("table");
            caracteristicasTabla.classList.add("table", "table-striped", "text-white");
            const thead = document.createElement("thead");
            thead.innerHTML = `<tr><th>Característica</th><th>Valor</th></tr>`;
            const tbody = document.createElement("tbody");

            for (let [feature, value] of Object.entries(producto.features)) {
                const row = document.createElement("tr");
                const featureCell = document.createElement("td");
                featureCell.textContent = feature;
                const valueCell = document.createElement("td");
                valueCell.textContent = value;
                row.appendChild(featureCell);
                row.appendChild(valueCell);
                tbody.appendChild(row);
            }

            caracteristicasTabla.appendChild(thead);
            caracteristicasTabla.appendChild(tbody);
            productFeatures.appendChild(caracteristicasTabla);
        }
    }
}