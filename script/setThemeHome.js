
function getTheme() {
    return localStorage.getItem('theme');
}

function clearTheme() {
    localStorage.removeItem('theme');
}

function setLightTheme() {
    localStorage.setItem('theme', 'light');
}

function setDarkTheme() {
    localStorage.setItem('theme', 'dark');
}

const lightButton = document.querySelector('#light');
const darkButton = document.querySelector('#dark');

const kranElem = document.querySelector('.kran__blok');


function applyTheme() {
    const isLight = getTheme() === 'light';

    document.documentElement.classList.toggle('light-theme', isLight);


    if (kranElem) {
        const kranImg = kranElem.querySelector('img');

        if (kranImg) {
            kranImg.src = isLight
                ? 'img/kranlight.png'
                : 'img/kran.png';
        }
    }
}


lightButton.addEventListener('click', () => {
    setLightTheme();
    applyTheme();
});


darkButton.addEventListener('click', () => {
    setDarkTheme();
    applyTheme();
});


applyTheme();
