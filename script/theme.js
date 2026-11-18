function getTheme() {
    const raw = localStorage.getItem('theme');
    return raw
}


const head = document.querySelector('head')
const themeLink = document.createElement('link')
themeLink.setAttribute('rel', 'stylesheet')
themeLink.setAttribute('href', 'css/lightTheme.css')
themeLink.className = 'lightTheme'
if (getTheme() === 'light') {
    head.append(themeLink)

}
else if (getTheme() === 'dark') {
    themeLink.remove()

}
