const orderList = document.querySelector('.orders')
const orderTit = document.querySelector('.order-title__remove')

function renderOrders() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];


    if (!orders.length) {
        orderList.innerHTML = `<p class="not-orders" >Заказов пока нет <a href="catalog.html">В каталог</a></p>`;
        orderTit.innerHTML = `
            <h1>Мои заказы</h1>
        `
        return;
    }


    orderList.innerHTML = orders
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(order => `
            <div class="order-card">

                <div class="order-blok">
                    <div class="order-title">Заказ ${order.id}
                        <p class="order-date">${new Date(order.date).toLocaleString("ru-RU", {
                        day: "2-digit", month: "2-digit", year: "numeric",
                        hour: "2-digit", minute: "2-digit"
                        })}
                        </p>
                    </div>
                


                        ${order.items.map(i => `
                            <div class="order-item">
                                <div class="order-product">${i.name}${i.variantLabel ? ` (${i.variantLabel})` : ""}</div>
                                
                                <div class="order-info order-sum">${i.sum} ₽
                                    <div class="order-price">${i.price} ₽ x 1</div>
                                </div>
                                <div class="order-info order-qty">${i.qty} шт.</div>
                            </div>
                        `).join("")}


                </div>
                <div class="order-total">Итого: ${order.total} ₽</div>
            </div>
        `).join("");
}


document.addEventListener('click', event => {
    const removeBtn = event.target.closest('.remove-orders')

    if (!removeBtn) return;

    const removeWarning = confirm('Вы точно хотите удалить все заказы?')
    if (removeWarning) {
        localStorage.removeItem('orders')
        renderOrders()
    }

})

renderOrders()