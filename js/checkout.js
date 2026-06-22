// Checkout Page Logic

function renderCheckout() {
    const cart = JSON.parse(localStorage.getItem('kopikitaCart')) || [];
    const cartEmpty = document.getElementById('cart-empty');
    const cartContent = document.getElementById('cart-content');
    const checkoutItems = document.getElementById('checkout-items');

    if (cart.length === 0) {
        cartEmpty.classList.remove('hidden');
        cartContent.classList.add('hidden');
        return;
    }

    cartEmpty.classList.add('hidden');
    cartContent.classList.remove('hidden');

    checkoutItems.innerHTML = cart.map(item => `
        <div class="flex items-center justify-between p-4 rounded-2xl bg-[#2d1509]/50 border border-amber-800/30">
            <div class="flex items-center gap-4 flex-1">
                <img src="${item.image}" alt="${item.title}" class="w-16 h-16 rounded-xl object-cover">
                <div>
                    <h3 class="text-amber-100 font-semibold">${item.title}</h3>
                    <p class="text-amber-300 text-sm">${item.price} x ${item.qty}</p>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                    <button onclick="decreaseQty('${item.title}')" class="bg-amber-900/50 hover:bg-amber-900 px-3 py-1 rounded-lg text-amber-100">−</button>
                    <span class="w-8 text-center text-amber-100">${item.qty}</span>
                    <button onclick="increaseQty('${item.title}')" class="bg-amber-900/50 hover:bg-amber-900 px-3 py-1 rounded-lg text-amber-100">+</button>
                </div>
                <span class="text-amber-200 font-semibold min-w-24 text-right">Rp${(item.priceNum * item.qty).toLocaleString('id-ID')}</span>
                <button onclick="removeItem('${item.title}')" class="text-red-500 hover:text-red-400 font-bold">✕</button>
            </div>
        </div>
    `).join('');

    updateCheckoutSummary();
}

function decreaseQty(title) {
    let cart = JSON.parse(localStorage.getItem('kopikitaCart')) || [];
    const item = cart.find(c => c.title === title);
    if (item && item.qty > 1) {
        item.qty -= 1;
        localStorage.setItem('kopikitaCart', JSON.stringify(cart));
        renderCheckout();
    }
}

function increaseQty(title) {
    let cart = JSON.parse(localStorage.getItem('kopikitaCart')) || [];
    const item = cart.find(c => c.title === title);
    if (item) {
        item.qty += 1;
        localStorage.setItem('kopikitaCart', JSON.stringify(cart));
        renderCheckout();
    }
}

function removeItem(title) {
    let cart = JSON.parse(localStorage.getItem('kopikitaCart')) || [];
    cart = cart.filter(c => c.title !== title);
    localStorage.setItem('kopikitaCart', JSON.stringify(cart));
    renderCheckout();
}

function updateCheckoutSummary() {
    const cart = JSON.parse(localStorage.getItem('kopikitaCart')) || [];
    const shippingType = document.getElementById('shipping-type');
    
    let shippingCost = 0;
    if (shippingType) {
        const type = shippingType.value;
        if (type === 'delivery-15') shippingCost = 15000;
        if (type === 'delivery-25') shippingCost = 25000;
    }

    const subtotal = cart.reduce((total, item) => total + (item.priceNum * item.qty), 0);
    const total = subtotal + shippingCost;

    document.getElementById('subtotal').textContent = `Rp${subtotal.toLocaleString('id-ID')}`;
    document.getElementById('shipping').textContent = shippingCost > 0 ? `Rp${shippingCost.toLocaleString('id-ID')}` : 'Gratis';
    document.getElementById('total-price').textContent = `Rp${total.toLocaleString('id-ID')}`;
}

function proceedToPayment() {
    const cart = JSON.parse(localStorage.getItem('kopikitaCart')) || [];
    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const address = document.getElementById('customer-address').value;
    const shippingType = document.getElementById('shipping-type').value;

    if (!name || !phone || !address) {
        alert('Harap isi semua data pengiriman!');
        return;
    }

    if (cart.length === 0) {
        alert('Keranjang kamu kosong!');
        return;
    }

    // Save order data
    const orderData = {
        customer: { name, phone, address },
        shippingType,
        items: cart,
        timestamp: new Date().toISOString()
    };

    localStorage.setItem('kopikitaOrder', JSON.stringify(orderData));
    window.location.href = 'payment.html';
}

// Setup shipping type change listener
document.addEventListener('DOMContentLoaded', () => {
    renderCheckout();
    
    const shippingType = document.getElementById('shipping-type');
    if (shippingType) {
        shippingType.addEventListener('change', updateCheckoutSummary);
    }
});
