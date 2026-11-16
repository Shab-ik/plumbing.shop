'use strict'


const searchBlokElement = document.querySelector('.search__blok')
const searchInput = document.querySelector('.search__input');
const goods = document.querySelectorAll('.goods__karta');

searchInput.addEventListener('focus', () => {
    searchBlokElement.style.boxShadow = '0 0 10px rgba(255, 179, 0, 0.26)'
})
searchInput.addEventListener('blur', () => {
    searchBlokElement.style.boxShadow = 'none'
})

searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase().trim()

    goods.forEach((event) => {
        const title = event.querySelector('.goods__name')
        .textContent
        .toLowerCase()

        if (title.includes(searchText)) {
            event.style.display = 'flex';
        }
        else {
            event.style.display = 'none';
        }
    })


})
