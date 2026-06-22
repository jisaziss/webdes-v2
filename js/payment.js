// Payment Page Logic

let selectedPayment = null;

function loadOrderData() {
    const orderData = JSON.parse(localStorage.getItem('kopikitaOrder')) || {};
    const { customer, shippingType, items } = orderData;

    if (!items || items.length === 0) {
        window.location.href = 'menu.html';
        return;
    }

    // Calculate totals
    let shippingCost = 0;
    let shippingLabel = 'Gratis';

    if (shippingType === 'delivery-15') {
        shippingCost = 15000;
        shippingLabel = 'Rp15.000';
    } else if (shippingType === 'delivery-25') {
        shippingCost = 25000;
        shippingLabel = 'Rp25.000';
    }

    const subtotal = items.reduce((total, item) => total + (item.priceNum * item.qty), 0);
    const total = subtotal + shippingCost;

    // Update summary
    document.getElementById('summary-subtotal').textContent = `Rp${subtotal.toLocaleString('id-ID')}`;
    document.getElementById('summary-shipping').textContent = shippingLabel;
    document.getElementById('summary-total').textContent = `Rp${total.toLocaleString('id-ID')}`;

    document.getElementById('summary-name').textContent = customer?.name || '-';
    document.getElementById('summary-address').textContent = customer?.address || '-';

    // Update payment amounts
    document.getElementById('cash-amount').textContent = `Rp${total.toLocaleString('id-ID')}`;
    document.getElementById('qris-amount').textContent = total.toLocaleString('id-ID');

    // Render order items
    const paymentSummary = document.getElementById('payment-summary');
    paymentSummary.innerHTML = items.map(item => `
        <div class="bg-[#2d1509]/50 p-3 rounded-xl border border-amber-800/30 flex justify-between items-center">
            <div>
                <p class="text-amber-100 font-semibold">${item.title}</p>
                <p class="text-amber-300 text-xs">x${item.qty}</p>
            </div>
            <p class="text-amber-200 font-semibold">Rp${(item.priceNum * item.qty).toLocaleString('id-ID')}</p>
        </div>
    `).join('');
}

function selectPayment(method) {
    selectedPayment = method;

    // Update UI
    const cashRadio = document.getElementById('radio-cash-check');
    const qrisRadio = document.getElementById('radio-qris-check');
    const qrisContainer = document.getElementById('qris-container');
    const cashCard = cashRadio.closest('.rounded-\\[2rem\\]').parentElement.parentElement;
    const qrisCard = qrisRadio.closest('.rounded-\\[2rem\\]').parentElement.parentElement;

    if (method === 'cash') {
        cashRadio.classList.remove('hidden');
        qrisRadio.classList.add('hidden');
        qrisContainer.classList.add('hidden');
        
        document.querySelector('[onclick="selectPayment(\'cash\')"]').classList.add('border-amber-600');
        document.querySelector('[onclick="selectPayment(\'cash\')"]').classList.remove('border-amber-800/50');
        document.querySelector('[onclick="selectPayment(\'qris\')"]').classList.remove('border-amber-600');
        document.querySelector('[onclick="selectPayment(\'qris\')"]').classList.add('border-amber-800/50');
    } else if (method === 'qris') {
        cashRadio.classList.add('hidden');
        qrisRadio.classList.remove('hidden');
        qrisContainer.classList.remove('hidden');
        
        document.querySelector('[onclick="selectPayment(\'cash\')"]').classList.remove('border-amber-600');
        document.querySelector('[onclick="selectPayment(\'cash\')"]').classList.add('border-amber-800/50');
        document.querySelector('[onclick="selectPayment(\'qris\')"]').classList.add('border-amber-600');
        document.querySelector('[onclick="selectPayment(\'qris\')"]').classList.remove('border-amber-800/50');
    }
}

function confirmPayment() {
    if (!selectedPayment) {
        alert('Silakan pilih metode pembayaran terlebih dahulu!');
        return;
    }

    const orderData = JSON.parse(localStorage.getItem('kopikitaOrder')) || {};
    const paymentData = {
        ...orderData,
        paymentMethod: selectedPayment,
        status: 'pending',
        confirmedAt: new Date().toISOString(),
        orderId: 'ORD-' + Date.now()
    };

    // Save payment confirmation
    localStorage.setItem('kopikitaPayment', JSON.stringify(paymentData));

    // Show success message
    showSuccessPage(paymentData);
}

function showSuccessPage(paymentData) {
    const main = document.querySelector('main');
    const methodLabel = paymentData.paymentMethod === 'cash' ? '💵 Pembayaran Tunai' : '📱 Pembayaran QRIS';
    const methodDesc = paymentData.paymentMethod === 'cash' 
        ? 'Pembayaran akan dilakukan saat pesanan tiba'
        : 'Pembayaran telah dikonfirmasi melalui QRIS';

    main.innerHTML = `
        <section class="mx-auto max-w-2xl pt-10">
            <div class="rounded-[2rem] border border-amber-900 bg-[#221505]/90 p-8 shadow-2xl shadow-[#000000]/30 text-center">
                <div class="mb-6">
                    <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-500 mb-4">
                        <svg class="w-10 h-10 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                    </div>
                    <h1 class="text-4xl font-bold text-amber-100 mb-2">Pesanan Dikonfirmasi!</h1>
                    <p class="text-amber-200 text-lg">Terima kasih telah memesan di KopiKita Cafe</p>
                </div>

                <div class="rounded-2xl bg-[#2d1509]/50 border border-amber-800/30 p-6 mb-8">
                    <div class="text-left space-y-4">
                        <div class="flex justify-between">
                            <span class="text-amber-200">ID Pesanan:</span>
                            <span class="text-amber-100 font-mono font-bold">${paymentData.orderId}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-amber-200">Nama Pemesan:</span>
                            <span class="text-amber-100 font-semibold">${paymentData.customer.name}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-amber-200">Metode Pembayaran:</span>
                            <span class="text-amber-100 font-semibold">${methodLabel}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-amber-200">Total Pembayaran:</span>
                            <span class="text-amber-100 font-bold text-lg">Rp${(paymentData.items.reduce((total, item) => total + (item.priceNum * item.qty), 0) + (paymentData.shippingType === 'delivery-15' ? 15000 : paymentData.shippingType === 'delivery-25' ? 25000 : 0)).toLocaleString('id-ID')}</span>
                        </div>
                    </div>
                </div>

                <div class="rounded-2xl bg-amber-900/20 border border-amber-700/50 p-6 mb-8">
                    <p class="text-amber-200 mb-3">📌 ${methodDesc}</p>
                    <p class="text-amber-300 text-sm">
                        <strong>Pesanan akan sampai dalam 30-60 menit.</strong><br>
                        Kami akan menghubungi Anda di ${paymentData.customer.phone} untuk konfirmasi pengiriman.
                    </p>
                </div>

                <div class="space-y-3">
                    <a href="menu.html" class="btn-primary inline-flex justify-center rounded-full px-8 py-4 text-base font-semibold text-[#120a04] w-full hover:bg-amber-300">
                        Pesan Lagi
                    </a>
                    <a href="../index.html" class="btn-secondary inline-flex justify-center rounded-full px-8 py-4 text-base font-semibold w-full">
                        Kembali ke Beranda
                    </a>
                </div>
            </div>
        </section>
    `;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadOrderData);
