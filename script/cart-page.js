
const cartEl = document.querySelector('.cart__list');
const totalEl = document.querySelector('.goods__buy__total');
const orderEl = document.querySelector('.goods__buy__button');
const countEl = document.querySelector('.goods__count');
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


    if (items.length === 0) {
        cartEl.innerHTML = `<div class="null">В корзине ничего нет</div>`;
        countEl.textContent = 'Количество товаров: 0'
        totalEl.textContent = "";
        orderEl.innerHTML = `<a href="catalog.html">Каталог</a>`
        return;
    }

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
            <button class="minus-button">−</button>
            <div class="cart-count">${qty}</div>
            <button class="plus-button">+</button>
        </div>
        `;
        cartEl.append(item);
    });

    const total = items.reduce((sum, item) => sum + item.product.price * item.qty, 0);
    totalEl.textContent = `${total} ₽`;
    const count = Object.values(getCart()).reduce((s, n) => s + n, 0)
    countEl.textContent = `${window.innerWidth > 520 ? `Количество товаров: ${count}` : `Всего ${count}`}`

    const clearButton = document.createElement('button')
    clearButton.classList.add('clear-btn')
    clearButton.textContent = 'Очистить'
    cartEl.append(clearButton)

}




cartEl.addEventListener("click", (event) => {

    // if (event.target.matches('.clear-btn')) {
    //     if (confirm("Точно очистить корзину?")) {
    //         clearCart();
    //         renderCart();
    //     }
    //     return;   
    // }


    const card = event.target.closest(".cart__item");
    if (!card) return;

    const id = card.dataset.id;

    if (event.target.matches('.plus-button')) {
        addToCart(id);
        renderCart();
    }
    if (event.target.matches('.minus-button')) {
        decreaseFromCart(id);
        renderCart();
    }
});



const removeWarning = document.createElement('div')
removeWarning.className = 'remove-warning'
removeWarning.innerHTML = `
    <div class="warning-title">Вы уверены что хотите очистить корзину?</div>
    <div class="warning-btns">
        <button class="warning-btn" id="warning-no">Нет</button>
        <button class="warning-btn" id="warning-yes">Да</button>
    </div>
    `
const backDark = document.createElement('div')
backDark.className = 'back-dark'

document.addEventListener('click', event => {
    const clearBtn = event.target.closest('.clear-btn')

    if (!clearBtn) return;

    
    bodyEl.prepend(removeWarning)
    bodyEl.prepend(backDark)

})

document.addEventListener('click', event => {
    const yesBtn = event.target.closest('#warning-yes')
    const noBtn = event.target.closest('#warning-no')

    if (noBtn) {
        backDark.remove()
        removeWarning.remove()
    }
    if (yesBtn) {
        clearCart()
        renderCart()
        backDark.remove()
        removeWarning.remove()
    }
})


renderCart()