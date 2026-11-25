const goodsElem = document.querySelector('.goods')
const infoElement = document.querySelector('.info__items-blok')
const userCountEl = document.querySelector('.user__count')


function renderOrders() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (!orders.length) {
        infoElement.innerHTML = `
            <div class="info__item">
                <div class="info__subtitle info__subtitle_live">Заказов нет</div>
            </div>
        `;
        userCountEl.innerHTML = '';
        return;
    }

    const visibleOrders = orders
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);                 

    infoElement.innerHTML = visibleOrders.map(order => `
        <div class="info__item">
            <div class="info__subtitle info__subtitle_live">${order.id}</div>
            <div class="info__status">
                <div class="info__status__blob"></div>
                <div class="info__status__title">${new Date(order.date).toLocaleDateString("ru-RU")}</div>
                <div class="info__status__title">Товаров: ${order.items.length}</div>
            </div>
            <button class="info__btn">Посмотреть</button>
        </div>
    `).join("");


    userCountEl.innerHTML = `Количество заказов: ${orders.length}`;
}

renderOrders()

document.addEventListener('click', event => {
    const infoBtn = event.target.closest('.info__btn')

    if (!infoBtn) return;

    window.location.href = 'profile.html'
})

const last6 = PRODUCTS.slice(-6);

last6.forEach(product => {
    const goodKarta = document.createElement('div')
    goodKarta.className = 'goods__karta'
    goodKarta.dataset.id = product.id
    goodKarta.innerHTML = `
    <div class="goods__image"></div>
    <div class="goods__name">${product.name}</div>
    <div class="goods__description">Описание Lorem ipsum dolor sit amet consectetur adipisicing elit? Lorem ipsum dolor sit amet consectetur adipisicing elit?</div>
    <button class="goods__btn" id="${product.id}">В каталог</button>
`
    goodsElem.prepend(goodKarta)
})




goodsElem.addEventListener('click', event => {
    const button = event.target.closest('.goods__btn')
    if (!button) return;

    const id = button.id
    window.location.href = `catalog.html#product-${id}`
}) 