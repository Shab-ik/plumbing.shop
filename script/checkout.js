
const cartEl = document.querySelector('.cart__list');
const totalEl = document.querySelector('.goods__buy__total');
const countEl = document.querySelector('.goods__count');
const orderEl = document.querySelector('.order')
const nameEl = document.querySelector('#name')
const phoneEl = document.querySelector('#phone')
const submitBtn = document.querySelector("#submit-order");



function getCartItems() {
    const cart = getCart();
    return Object.keys(cart).map((id) => {
        const product = PRODUCTS.find((p) => p.id === id);
        return { product, qty: cart[id] };
    })
        .filter((item) => item.product);
}


function renderCart() {
    const items = getCartItems();

    cartEl.textContent = "";

    items.forEach(({ product, qty }) => {
        const item = document.createElement("div");
        item.className = "cart__item";
        item.dataset.id = product.id;
        item.innerHTML = `
        <div class="cart__img"></div>
        ${window.innerWidth > 520 ? `
            <div class="cart__name">${product.name}${product.variantLabel ? ` (${product.variantLabel})` : ""}</div>
            <div class="cart__prices">
                <div class="cart__totalPrice">${product.price * qty} ₽</div>
                <div class="cart__price">${product.price} ₽</div>
            </div>
            ` : `
            <div class="cart__prices">
                <div class="cart__name">${product.name}${product.variantLabel ? ` (${product.variantLabel})` : ""}</div>
                <div class="cart__totalPrice">${product.price * qty} ₽</div>
                <div class="cart__price">${product.price} ₽</div>
            </div>
            `}
        <div class="cart__counts">
            <div>${qty}</div>
        </div>
        `;
        cartEl.append(item);
    });

    const total = items.reduce((sum, item) => sum + item.product.price * item.qty, 0);
    totalEl.textContent = `${total} ₽`;
    const count = Object.values(getCart()).reduce((s, n) => s + n, 0)
    countEl.textContent = `Товаров: ${count}`


}




renderCart()



submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const name = nameEl.value.trim();
    const phone = phoneEl.value.trim();
    nameEl.classList.remove("error-input");
    phoneEl.classList.remove("error-input");
    document.querySelector("#name-error").textContent = "";
    document.querySelector("#phone-error").textContent = "";

    if (!name) {
        nameEl.classList.add('error-input')
        document.querySelector("#name-error").textContent = "Введите имя";
        return;
    }

    if (!phone) {
        phoneEl.classList.add('error-input')
        document.querySelector("#phone-error").textContent = "Введите телефон";
        return;
    }


    console.log("Валидация прошла:", name, phone);
});