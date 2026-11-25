

function getCart() {
    const raw = localStorage.getItem('cart');
    return raw ? JSON.parse(raw) : {};
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(id) {
    const cart = getCart();
    cart[id] = (cart[id] || 0) + 1;
    saveCart(cart);
}

function decreaseFromCart(id) {

    const cart = getCart();
    if (!cart[id]) return;
    cart[id] = cart[id] - 1;
    if (cart[id] === 0) {
        delete cart[id]
    }
    saveCart(cart);
}

function clearCart() {
    localStorage.removeItem("cart");
}