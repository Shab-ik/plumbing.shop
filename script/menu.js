const menuOpenElement = document.querySelector('.header__menu')
const menuCloseElement = document.querySelector('.menu__close')
const bodyElem = document.querySelector('body')
const menuElement = document.querySelector('.menu__blok')

const darkBack = document.createElement('div')
darkBack.className = 'fon-menu'

menuOpenElement.addEventListener('click', () => {
    menuElement.classList.add('menu__blok_open')
    bodyElem.prepend(darkBack)
})

menuCloseElement.addEventListener('click', () => {
    menuElement.classList.remove('menu__blok_open')
    darkBack.remove()
})

document.addEventListener('click', (event) => {
    const back = event.target.closest('.fon-menu')
    if (!back) return;
    menuElement.classList.remove('menu__blok_open')
    darkBack.remove()
})


