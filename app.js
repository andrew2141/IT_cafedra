$(document).ready(function() {
    const products = [
        { id: 1, name: "Ноутбук", description: "Описание", price: 10000, image: "ноутбук.jpg" },
        { id: 2, name: "Смартфон", description: "Описание", price: 20000, image: "смартфон.jpg" },
        { id: 3, name: "Клавиатура", description: "Описание", price: 2000, image: "клавиатура.jpg" },
        { id: 4, name: "Системный блок", description: "Описание", price: 40000, image: "системный блок.jpg" },
        { id: 5, name: "Монитор", description: "Описание", price: 8000, image: "монитор.jpg" },
        { id: 6, name: "Компьютерная мышь", description: "Описание", price: 1000, image: "мышь.jpg" }
    ];

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function loadProducts() {
        let productHTML = '';
        products.forEach(product => {
            productHTML += `
                <div class="product">
                    <img src="${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p>Цена: ${product.price} руб.</p>
                    <button class="add-to-cart" data-id="${product.id}">Добавить в корзину</button>
                </div>
            `;
        });
        $('#product-catalog').html(productHTML);
    }

    function loadCart() {
        let cartHTML = '';
        if (cart.length === 0) {
            cartHTML = '<p>Корзина пуста</p>';
        } else {
            cart.forEach(item => {
                cartHTML += `
                    <div class="cart-item">
                        <h2>${item.name}</h2>
                        <img src="${item.image}" alt="${item.name}">
                        <p>Цена: ${item.price} руб.</p>
                        <p>Количество: ${item.quantity}</p>
                        <button class="increase-qty" data-id="${item.id}">+</button>
                        <button class="decrease-qty" data-id="${item.id}">-</button>
                        <button class="remove-from-cart" data-id="${item.id}">Удалить</button>
                    </div>
                `;
            });
        }
        $('#cart-content').html(cartHTML);
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        const cartItem = cart.find(item => item.id === productId);

        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
    }

    function updateQuantity(productId, amount) {
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity += amount;
            if (cartItem.quantity <= 0) {
                cart = cart.filter(item => item.id !== productId);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart();
        }
    }

    if ($('#product-catalog').length) {
        loadProducts();
    }

    if ($('#cart-content').length) {
        loadCart();
    }

    $('#product-catalog').on('click', '.add-to-cart', function() {
        const productId = $(this).data('id');
        addToCart(productId);
    });

    $('#cart-content').on('click', '.increase-qty', function() {
        const productId = $(this).data('id');
        updateQuantity(productId, 1);
    });

    $('#cart-content').on('click', '.decrease-qty', function() {
        const productId = $(this).data('id');
        updateQuantity(productId, -1);
    });

    $('#cart-content').on('click', '.remove-from-cart', function() {
        const productId = $(this).data('id');
        updateQuantity(productId, -cart.find(item => item.id === productId).quantity);
    });
});