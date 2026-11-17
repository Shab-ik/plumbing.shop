const goodsElem = document.querySelector('.goods')



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