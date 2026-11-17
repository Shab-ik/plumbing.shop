
const logoElem = document.querySelector('.header__logo'); 
const catalogEl = document.querySelector('.goods')
const body = document.querySelector('body')

function toggleClassByWidth() {

    if (window.innerWidth < 520) {
        logoElem.classList.add('logo__delete');
    } else {
        logoElem.classList.remove('logo__delete');
        
    }
}

const korzinaBtn = document.createElement('div')
body.prepend(korzinaBtn)
function cartBtnByWidth() {
    const position = Object.values(getCart()).reduce((s, n) => s + n, 0)
    if (window.innerWidth < 1200) {
        if (position <= 0) {

            korzinaBtn.classList.toggle('cart-btn-unvis')
            
        } 
        else {
            korzinaBtn.className = 'cart-btn-blok'
            korzinaBtn.innerHTML = `
            <div class="nav__item_icon"><img src="img/header/korxina.png" alt="korzina"></div>
            <div class="nav__item_title"><a href="cart.html">Корзина</a></div>
            <div class="nav__cart__count" id="cart-btn-count">${position}</div>
            `
        }

    }
}


toggleClassByWidth();
cartBtnByWidth()



window.addEventListener('resize', toggleClassByWidth);







function getUniqueProducts() {
    const map = {};
    PRODUCTS.forEach((p) => {
        if (!map[p.productId]) {
            map[p.productId] = p;
        }
    });
    return Object.values(map);
}


getUniqueProducts().forEach((product) => {
    const good = document.createElement('div');
    good.classList.add('goods__karta')
    good.id = product.productId;
    good.innerHTML = `
    <div class="goods__image"></div>
    <div class="goods__name">${product.name}</div>
    <div class="goods__price">${product.price} ₽</div>
    <div class="goods__description">Описание Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolor quos ex assumenda hic ut cumque dolorum numquam voluptatem ducimus modi ullam natus, explicabo cupiditate? Officia, necessitatibus. Vel, quasi quisquam. ipsum dolor sit amet consectetur adipisicing elit?</div>
    <button class="open-btn">Подробнее</button>
    `
    catalogEl.append(good)


})


function renderControls(product, card) {
    
    const cartLength = getCart()[product.id] || 0

    const button = card.querySelector('.controls')
    if (!button) return;

    if (cartLength <= 0) {
        button.innerHTML = `
        <button class="buy-btn">В корзину</button>
        `

    } else {

        button.innerHTML = `
    <button class="minus-button">-</button>
    <span class="cartLength">${cartLength}</span>
    <button class="plus-button">+</button>
    `

    }

}

function renderControlsById(id, card) {
    const product = PRODUCTS.find((p) => p.id === id);
    if (!product) return;
    renderControls(product, card);
}



function attachControlsHandler(container) {
    container.addEventListener("click", (event) => {
        const id = container.dataset.currentVariant;   
        if (!id) return;

        if (event.target.matches(".plus-button")) {
            addToCart(id);
            renderControlsById(id, container);
            cartBtnByWidth()
            positionCount();
        }
        if (event.target.matches(".minus-button")) {
            decreaseFromCart(id);
            renderControlsById(id, container);
            cartBtnByWidth()
            positionCount();
        }
        if (event.target.matches(".buy-btn")) {
            addToCart(id);
            renderControlsById(id, container);
            cartBtnByWidth()
            positionCount();
        }
    });
}

function positionCount() {
    const cartBtn = document.querySelector('#cart-btn')
    const position = Object.values(getCart()).reduce((s, n) => s + n, 0)
    if (position <= 0) {
        cartBtn.innerHTML = `
        <div class="nav__item_icon"><img src="/img/header/korxina.png" alt="korzina"></div>
        <div class="nav__item_title"><a href="cart.html">Корзина</a></div>
        `
    }
    else {
        cartBtn.innerHTML = `
        <div class="nav__item_icon"><img src="img/header/korxina.png" alt="korzina"></div>
        <div class="nav__item_title"><a href="cart.html">Корзина</a></div>
        <div class="nav__cart__count">${position}</div>
        `
    }

}


function openProductPage(variants) {
  
    const oldPage = document.querySelector('.cart-page');
    const oldDark = document.querySelector('.back-shadow');
    if (oldPage) oldPage.remove();
    if (oldDark) oldDark.remove();

    body.style.overflow = 'hidden';

    const cartPage = document.createElement('div');
    cartPage.classList.add('cart-page');

    const dark = document.createElement('div');
    dark.classList.add('back-shadow');

    body.prepend(cartPage);
    body.prepend(dark);

    attachControlsHandler(cartPage);


    renderProductPage(variants[0], variants);
}


function renderProductPage(variant, variants) {
    const cartPage = document.querySelector('.cart-page');
    if (!cartPage) return;   

    cartPage.dataset.currentVariant = variant.id;


    let variantsHtml = '';
    if (variants.length > 1) {
        const variantName = variants[0].variantName;
        const buttons = variants.map((v) => {
            const isActive = v.id === variant.id ? 'active' : '';
            const label = v.colorCode
                ? `<span class="color-dot" style="background:${v.colorCode}"></span>`
                : v.variantLabel;
            return `<button class="variant-btn ${isActive}" data-id="${v.id}">${label}</button>`;
        }).join('');
        variantsHtml = `<div class="variants__title">${variantName}</div><div class="variants__buttons">${buttons}</div>`;
    }

    cartPage.innerHTML = `
        ${window.innerWidth > 520 ? `<button id="closeCartPage">Назад</button>` : `<button id="closeCartPage"><</button>`}
        <div class="cart-page__info">
            
            <div class="image-blok">
                <div class="images-blok">
                    <div class="img1">Фото 1</div>
                    <div class="img2">Фото 2</div>
                    <div class="img3">Фото 3</div>
                    <div class="img4">Фото 4</div>
                </div>
                <button class="left"><</button>
                <button class="right">></button>
            </div>

            <div class="cartPage__title">${variant.name}</div>
            <div class="cartPage__price">${variant.price} ₽</div>
            <div class="variants">${variantsHtml}</div>
            <div class="cartPage__desc">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </div>
            <div class="controls"></div>
        </div>
    `;

    renderControls(variant, cartPage);

    cartPage.querySelectorAll('.variant-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const newVariant = variants.find((v) => v.id === btn.dataset.id);
            renderProductPage(newVariant, variants);
        });
    });
}


catalogEl.addEventListener('click', (event) => {
    const cart = event.target.closest('.goods__karta')
    const cartImg = event.target.matches('.goods__image')
    if (!cart) return;
    if (cart || cartImg) {

        const variants = PRODUCTS.filter((p) => p.productId === cart.id);
        if (variants.length === 0) return;
        openProductPage(variants);  
    }
})


body.addEventListener("click", (event) => {
  
    if (event.target.matches("#closeCartPage")) {
        closeProductPage();
    }
    
    if (event.target.matches(".back-shadow")) {
        closeProductPage();
    }
});

function closeProductPage() {
    const cartPage = body.querySelector(".cart-page");
    const dark = body.querySelector(".back-shadow");
    if (cartPage) cartPage.remove();
    if (dark) dark.remove();
    body.style.overflow = "auto";
}

body.addEventListener('mouseover', event => {
    const imgBlok = event.target.closest('.image-blok')
    const nextBtn = document.querySelector('.right')
    const previousBtn = document.querySelector('.left')
    if (!imgBlok) return;

    nextBtn.style.opacity = '1'
    previousBtn.style.opacity = '1'
})
body.addEventListener('mouseout', event => {
    const imgBlok = event.target.closest('.image-blok')
    if (!imgBlok) return;
    const nextBtn = document.querySelector('.right')
    const previousBtn = document.querySelector('.left')
    nextBtn.style.opacity = '0'
    previousBtn.style.opacity = '0'
})

let imgCount = 0;
body.addEventListener('click', event => {
    const nextBtn = event.target.closest('.right')
    if (!nextBtn) return;
    const imgBlok = document.querySelector('.images-blok')
    if (imgCount === 0) {
        imgBlok.style.transform = 'translateX(-100%)'
        imgCount++
        console.log(imgCount)
    }
    else if (imgCount === 1) {
        imgBlok.style.transform = 'translateX(-200%)'
        imgCount++
        console.log(imgCount)
    }
    else if (imgCount === 2) {
        imgBlok.style.transform = 'translateX(-300%)'
        imgCount++
        console.log(imgCount)
    }
    else {
        imgCount = 0
        imgBlok.style.transform = 'translateX(0)'
        console.log(imgCount)
    }
})
body.addEventListener('click', event => {
    const previousBtn = event.target.closest('.left')
    if (!previousBtn) return;
    const imgBlok = document.querySelector('.images-blok')
    if (imgCount === 3) {
        imgBlok.style.transform = 'translateX(-200%)'
        imgCount--
        console.log(imgCount)
    }
    else if (imgCount === 2) {
        imgBlok.style.transform = 'translateX(-100%)'
        imgCount--
        console.log(imgCount)
    }
    else if (imgCount === 1) {
        imgBlok.style.transform = 'translateX(0)'
        imgCount--
        console.log(imgCount)
    }
    else if (imgCount == 0) {
        imgCount = 3
        imgBlok.style.transform = 'translateX(-300%)'
        console.log(imgCount)
    }
})








positionCount()




function openProductFromHash() {
    const m = window.location.hash.match(/^#product-(.+)$/)
    if (!m) return

    const variantId = m[1]


    const variant = PRODUCTS.find(p => String(p.id) === String(variantId))
    if (!variant) {
        console.warn('Вариант не найден:', variantId)
        return
    }

    const variants = PRODUCTS.filter(p => p.productId === variant.productId)
    if (variants.length === 0) return

    openProductPage(variants)
}


openProductFromHash()
window.addEventListener('hashchange', openProductFromHash)
