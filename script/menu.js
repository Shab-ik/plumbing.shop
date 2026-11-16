const menuOpenElement = document.querySelector('.header__menu')
const menuCloseElement = document.querySelector('.menu__close')

const menuElement = document.querySelector('.menu__blok')




menuOpenElement.addEventListener('click', () => {
    menuElement.classList.add('menu__blok_open')
})

menuCloseElement.addEventListener('click', () => {
    menuElement.classList.remove('menu__blok_open')
})


