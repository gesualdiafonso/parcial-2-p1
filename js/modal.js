/**
 * Programacion 1
 * Contreras, Nairut
 * Gesualdi, Afonso
 */

'use strict'

function openModal(productoID) {
    // Crea el fondo del modal
    const backgroundModal = document.createElement("div");
    backgroundModal.classList.add("modal-background");

    // Crea el contenido del modal
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content", "w-50", "px-3", "d-flex", "flex-column");

    // Cabecera del modal
    const modalHeader = document.createElement("div");
    modalHeader.classList.add("d-flex", "flex-row", "justify-content-between", "align-items-center", "w-100");
    
    const modalTitle = document.createElement("h3");
    modalTitle.textContent = "Detalles del Producto";
    
    const closeButton = document.createElement("button");
    closeButton.id = "closeModal";
    closeButton.type = "button";
    closeButton.classList.add("btn", "btn-primary");
    closeButton.textContent = "Cerrar";

    // Añade los elementos a la cabecera
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);

    // Línea divisoria
    const hr = document.createElement("hr");

    // Cuerpo del modal
    const modalInfo = document.createElement("div");
    modalInfo.classList.add("modal-info", "w-100");

    // Imagen del producto
    const productoImageContainer = document.createElement("div");
    productoImageContainer.classList.add("w-100");
    productoImageContainer.id = "productoImage";

    // Descripción del producto
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

    // Precio y botón de compra
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
    
    

    // Añade los elementos al contenedor de precio y botón
    priceAndButtonContainer.appendChild(productPrice);
    priceAndButtonContainer.appendChild(addToCartButton);

    // Añade los elementos al cuerpo del modal
    modalInfo.appendChild(productoImageContainer);
    modalInfo.appendChild(productoDescription);
    modalInfo.appendChild(productFeaturesContainer);
    modalInfo.appendChild(priceAndButtonContainer);

    // Añade la cabecera, la línea divisoria y el cuerpo al contenido del modal
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(hr);
    modalContent.appendChild(modalInfo);

    // Añade el contenido al fondo del modal
    backgroundModal.appendChild(modalContent);
    document.body.appendChild(backgroundModal);

    // Muestra el modal
    setTimeout(() => backgroundModal.classList.add("show"), 10);

    // Cierra el modal al hacer clic en el botón de cierre
    closeButton.addEventListener("click", () => {
        backgroundModal.classList.remove("show");
        setTimeout(() => document.body.removeChild(backgroundModal), 300);
    });

    // Busca el producto usando la lista global
    const producto = productosGlobal.find(p => p.id === productoID);

    if (producto) {
        // Actualiza la descripción y la imagen del producto
        productoDescription.textContent = producto.other;
        const productoImage = document.createElement("img");
        productoImage.src = producto.image;
        productoImage.alt = producto.name;
        productoImage.classList.add("img-fluid", "img-stl");
        productoImageContainer.appendChild(productoImage);

        // Actualiza el precio del producto
        productPrice.textContent = `U$${producto.price.toLocaleString()}`;

        // Configura el botón de agregar al carrito
        addToCartButton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        });

        // Crea una tabla de características
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