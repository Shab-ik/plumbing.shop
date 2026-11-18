function getTheme() {
    const raw = localStorage.getItem('theme');
    return raw
}


function clearTheme() {
    localStorage.removeItem("theme");
}



function setLightTheme() {
    clearTheme()
    localStorage.setItem('theme', 'light')
}
function setDarkTheme() {
    clearTheme()
    localStorage.setItem('theme', 'dark')
}



const lightButton = document.querySelector('#light')
const darkButton = document.querySelector('#dark')


lightButton.addEventListener('click', event => {
    if (getTheme() === 'dark') {
        setLightTheme()
        location.reload();
    }

})
darkButton.addEventListener('click', event => {
    if (getTheme() === 'light') {
        setDarkTheme()
        location.reload()
    }

})
const kranElem = document.querySelector('.kran__blok')
const head = document.querySelector('head')
const themeLink = document.createElement('link')
themeLink.setAttribute('rel', 'stylesheet')
themeLink.setAttribute('href', 'css/lightTheme.css')
themeLink.className = 'lightTheme'


if (getTheme() === 'light') {
    head.append(themeLink)
    kranElem.innerHTML = `
    <img src="img/kranlight.png" alt="">
    `
}
else if (getTheme() === 'dark') {
    themeLink.remove()
    kranElem.innerHTML = `
    <img src="img/kran.png" alt="">
    `
}
