const cartEl = document.querySelector('.cart__list');
const totalEl = document.querySelector('.goods__buy__total');
const countEl = document.querySelector('.goods__count');
const orderEl = document.querySelector('.order')
const nameEl = document.querySelector('#name')
const phoneEl = document.querySelector('#phone')
const submitBtn = document.querySelector("#submit-order");
const bodyEl = document.querySelector('body')



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


nameEl.addEventListener('input', (event) => {
    event.target.value = event.target.value.replace(/[^а-яА-ЯёЁa-zA-Z\s]/g, '');
});
phoneEl.addEventListener('input', () => {

    let v = phoneEl.value.replace(/[^0-9+]/g, '');

    const hasPlus = v.startsWith('+');
    v = v.replace(/\+/g, '');
    v = (hasPlus ? '+' : '') + v;

    if (v.length > 12) v = v.slice(0, 11);

    phoneEl.value = v;
});


function shortId(length = 4) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let id = '';
    for (let i = 0; i < length; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
}

const removeWarning = document.createElement('div')
removeWarning.className = 'remove-warning'
removeWarning.innerHTML = `
    <div class="warning-title">Подтвердите заказ</div>
    <div class="warning-btns">
        <button class="warning-btn" id="warning-no">Отмена</button>
        <button class="warning-btn" id="warning-yes">Подтвердить</button>
    </div>
    `
const backDark = document.createElement('div')
backDark.className = 'back-dark'
const cart = getCartItems();


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
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length !== 11) {
        phoneEl.classList.add('error-input')
        document.querySelector("#phone-error").textContent = "Неправильный номер";
        return;
    }

    if (name.replace(/\s/g, '').length < 3) {
        nameEl.classList.add('error-input')
        document.querySelector("#name-error").textContent = "Имя не может быть меньше трёх символов";
        return;
    }

    if (/[a-zA-Z]/.test(name)) {
        nameEl.classList.add('error-input')
        document.querySelector("#name-error").textContent = "Имя должно быть на русском";
        return;
    }

    if (!cart.length) {

        document.querySelector("#phone-error").textContent = "Корзина пуста";
        return;
    }




    bodyEl.prepend(removeWarning)
    bodyEl.prepend(backDark)



});



document.addEventListener('click', event => {
    const yesBtn = event.target.closest('#warning-yes')
    const noBtn = event.target.closest('#warning-no')

    if (noBtn) {
        backDark.remove()
        removeWarning.remove()
    }
    if (yesBtn) {

        backDark.remove()
        removeWarning.remove()

        // --- оформление заказа ---
        const orders = JSON.parse(localStorage.getItem("orders")) || [];

        let id;
        do {
            id = shortId(4);
        } while (orders.some(o => o.id === id));

        const items = cart.map(({ product, qty }) => ({
            id: product.id,
            name: product.name,
            variantLabel: product.variantLabel || null,
            price: product.price,
            qty,
            sum: product.price * qty
        }));

        const total = items.reduce((s, i) => s + i.sum, 0);

        orders.push({
            id,
            date: new Date().toISOString(),
            customer: { name, phone },
            items,
            total
        });

        localStorage.setItem("orders", JSON.stringify(orders));


        clearCart()



        bodyEl.innerHTML = `
        <div class="thank-blok">
            <div class="thank">Спасибо за заказ!</div>
            <a href="index.html" class="go-home">На главную</a>
        </div>
        `





    }
})

