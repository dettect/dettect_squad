document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const cartButton = document.querySelector('.menu li:last-child a'); // Кнопка "Корзина"
    const cartCount = document.createElement("span"); // Счетчик товаров
    cartCount.classList.add("cart-count");
    cartCount.textContent = " (0)";
    cartButton.appendChild(cartCount);

    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.stopPropagation();
            const productCard = button.closest(".product-card");
            const title = productCard.querySelector("h3").textContent;
            const price = parseInt(productCard.querySelector(".price").textContent.replace(/\D/g, ""));
            const imgSrc = productCard.querySelector("img").src;

            cart.push({ title, price, imgSrc }); // Добавляем каждую позицию отдельно
            updateCart();
        });
    });

    function updateCart() {
        cartCount.textContent = ` (${cart.length})`;
    }

    cartButton.addEventListener("click", (event) => {
        event.preventDefault();
        showCart();
    });

    function showCart() {
        const cartModal = document.createElement("div");
        cartModal.classList.add("cart-modal");
        cartModal.innerHTML = `
            <div class="cart-content">
                <span class="close-cart">&times;</span>
                <h2>Корзина</h2>
                <ul id="cart-items"></ul>
                <p><strong>Итого:</strong> <span id="cart-total">0</span> руб.</p>
                <button id="checkout-button">Оформить заказ</button>
                <button id="clear-cart">Очистить корзину</button>
            </div>
        `;
        document.body.appendChild(cartModal);

        const closeCart = cartModal.querySelector(".close-cart");
        closeCart.addEventListener("click", () => cartModal.remove());

        const checkoutButton = cartModal.querySelector("#checkout-button");
        checkoutButton.addEventListener("click", () => showCheckoutForm(cartModal));

        const clearCartButton = cartModal.querySelector("#clear-cart");
        clearCartButton.addEventListener("click", () => {
            cart.length = 0;
            updateCart();
            cartModal.remove();
        });

        const cartItemsList = cartModal.querySelector("#cart-items");
        cartItemsList.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <img src="${item.imgSrc}" width="50"> 
                <span>${item.title}</span> 
                — ${item.price} руб.
                <button class="remove-item" data-index="${index}">Удалить</button>
            `;
            cartItemsList.appendChild(li);
            total += item.price;
        });

        cartModal.querySelector("#cart-total").textContent = total;

        // Удаление товаров по кнопке ❌
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", (event) => {
                const index = event.target.dataset.index;
                if (index !== undefined) {
                    cart.splice(index, 1);
                    updateCart();
                    cartModal.remove();
                    showCart();
                }
            });
        });
    }

    function showCheckoutForm(cartModal) {
        cartModal.innerHTML = `
            <div class="checkout-content">
                <span class="close-checkout">&times;</span>
                <h2>Оформление заказа</h2>
                <form id="checkout-form">
                    <input type="text" id="name" placeholder="Ваше имя" required><br>
                    <input type="tel" id="phone" placeholder="Телефон" required><br>
                    <input type="text" id="address" placeholder="Адрес доставки" required><br>
                    <button type="submit">Подтвердить заказ</button>
                    <button type="button" id="cancel-checkout">Отмена</button>
                </form>
            </div>
        `;

        document.querySelector(".close-checkout").addEventListener("click", () => {
            cartModal.remove();
        });

        document.getElementById("checkout-form").addEventListener("submit", function(event) {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const phone = document.getElementById("phone").value;
            const address = document.getElementById("address").value;

            if (name && phone && address) {
                alert(`Спасибо, ${name}! Ваш заказ оформлен. Мы свяжемся с вами по телефону ${phone}.`);
                cart.length = 0;
                updateCart();
                cartModal.remove();
            } else {
                alert("Пожалуйста, заполните все поля.");
            }
        });

        document.getElementById("cancel-checkout").addEventListener("click", () => {
            cartModal.remove(); // Закрытие окна при нажатии "Отмена"
        });
    }
});

