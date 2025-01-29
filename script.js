document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(registerForm);
            const data = {
                username: formData.get('username'),
                email: formData.get('email'),
                password: formData.get('password')
            };

            fetch('api.php?action=register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Регистрация успешна');
                    window.location.href = 'login.html';
                } else {
                    alert(data.message);
                }
            });
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(loginForm);
            const data = {
                username: formData.get('username'),
                password: formData.get('password')
            };

            fetch('api.php?action=login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Вход успешен');
                    window.location.href = 'glavnay.html';
                } else {
                    alert(data.message);
                }
            });
        });
    }

    if (window.location.pathname.includes('catalog.html')) {
        fetchProducts();
        fetchCart();
    }
});

function fetchProducts() {
    fetch('api.php?action=getProducts')
        .then(response => response.json())
        .then(products => {
            const productsContainer = document.getElementById('products');
            productsContainer.innerHTML = '';
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';
                productDiv.innerHTML = `
                    <h2>${product.name}</h2>
                    <p>${product.price} руб.</p>
                    <p>${product.description}</p>
                    <button onclick="addToCart(${product.id})">Добавить в корзину</button>
                `;
                productsContainer.appendChild(productDiv);
            });
        });
}

function addToCart(productId) {
    fetch('api.php?action=addToCart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productId: productId,
            quantity: 1
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            fetchCart();
        } else {
            alert(data.message);
        }
    });
}

function fetchCart() {
    fetch('api.php?action=getCart')
        .then(response => response.json())
        .then(cartItems => {
            const cartContainer = document.getElementById('cart');
            cartContainer.innerHTML = '';
            cartItems.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.className = 'cart-item';
                cartItemDiv.innerHTML = `
                    <h2>${item.name}</h2>
                    <p>${item.price} руб.</p>
                    <p>Количество: ${item.quantity}</p>
                `;
                cartContainer.appendChild(cartItemDiv);
            });
        });
}
