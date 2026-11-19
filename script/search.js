'use strict'

const searchBlokElement = document.querySelector('.search__blok');
const searchInput = document.querySelector('.search__input');
const goods = document.querySelectorAll('.goods__karta');
const catalogContainer = document.querySelector('.catalog__container')


const notFoundMessage = document.createElement('p');
notFoundMessage.className = 'search__not-found';
notFoundMessage.style.display = 'none';

catalogContainer.append(notFoundMessage);

searchInput.addEventListener('focus', () => {
    searchBlokElement.style.boxShadow = '0 0 10px rgba(255, 179, 0, 0.26)';
});

searchInput.addEventListener('blur', () => {
    searchBlokElement.style.boxShadow = 'none';
});

searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase().trim();
    let foundCount = 0;

    goods.forEach((event) => {
        const title = event.querySelector('.goods__name')
            .textContent
            .toLowerCase();

        if (title.includes(searchText)) {
            event.style.display = 'flex';
            foundCount++;
        } else {
            event.style.display = 'none';
        }
    });


    if (foundCount === 0 && searchText !== '') {
        notFoundMessage.textContent = `Ничего не найдено по запросу "${searchInput.value.trim()}"`;
        notFoundMessage.style.display = 'block';
    } else {
        notFoundMessage.style.display = 'none';
    }
});