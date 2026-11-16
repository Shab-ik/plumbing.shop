const kartaElement = document.querySelectorAll('.goods__karta')
const cartListElement = document.querySelectorAll('.cart__item')

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
           setTimeout(() => {
            entry.target.classList.add('animate')
           }
            
           , 300) 
        } 
        
    })
}, {
    threshold: 0
});

kartaElement.forEach(el => observer.observe(el));
cartListElement.forEach(el => observer.observe(el));


