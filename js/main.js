const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

// Modal and Menu Item State
let currentModalItem = null;
let modalQty = 1;

// Shopping Cart System
let cart = JSON.parse(localStorage.getItem('kopikitaCart')) || [];

function saveCart() {
    localStorage.setItem('kopikitaCart', JSON.stringify(cart));
}

function addToCart(item) {
    const existingItem = cart.find(c => c.title === item.title);
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ ...item, qty: 1, priceNum: parseInt(item.price.replace(/\D/g, '')) });
    }
    saveCart();
    showCartNotification();
}

function removeFromCart(title) {
    cart = cart.filter(c => c.title !== title);
    saveCart();
}

function updateCartQty(title, qty) {
    const item = cart.find(c => c.title === title);
    if (item) {
        item.qty = Math.max(1, qty);
        saveCart();
    }
}

function getCartTotal() {
    return cart.reduce((total, item) => total + (item.priceNum * item.qty), 0);
}

function getCartCount() {
    return cart.reduce((count, item) => count + item.qty, 0);
}

function showCartNotification() {
    const count = getCartCount();
    const notification = document.getElementById('cart-notification');
    if (notification) {
        notification.textContent = count;
        notification.classList.remove('hidden');
    }
}

// Modal Functions
function openMenuModal(item) {
    currentModalItem = item;
    modalQty = 1;
    
    const modal = document.getElementById('menu-modal');
    const modalImage = document.getElementById('modal-image').querySelector('img');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalDescription = document.getElementById('modal-description');
    const modalPrice = document.getElementById('modal-price');
    const modalQtySpan = document.getElementById('modal-qty');
    
    modalImage.src = item.image;
    modalImage.alt = item.title;
    modalTitle.textContent = item.title;
    modalCategory.textContent = item.category;
    modalDescription.textContent = item.description;
    modalPrice.textContent = item.price;
    modalQtySpan.textContent = '1';
    
    modal.classList.remove('hidden');
}

function closeMenuModal() {
    const modal = document.getElementById('menu-modal');
    modal.classList.add('hidden');
    currentModalItem = null;
    modalQty = 1;
}

function increaseQtyModal() {
    modalQty++;
    document.getElementById('modal-qty').textContent = modalQty;
}

function decreaseQtyModal() {
    if (modalQty > 1) {
        modalQty--;
        document.getElementById('modal-qty').textContent = modalQty;
    }
}

function addToCartFromModal() {
    if (!currentModalItem) return;
    
    for (let i = 0; i < modalQty; i++) {
        addToCart(currentModalItem);
    }
    
    closeMenuModal();
    
    // Show success message
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg animate-in fade-in duration-300 z-40';
    notification.textContent = `${currentModalItem.title} × ${modalQty} ditambahkan ke keranjang!`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function initializeNavToggle() {
    if (!navToggle || !navMenu) return;
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('hidden');
        navToggle.classList.toggle('bg-[#1f140c]');
    });
    document.addEventListener('click', (event) => {
        const target = event.target;
        if (!navMenu.contains(target) && !navToggle.contains(target) && !navMenu.classList.contains('hidden')) {
            navMenu.classList.add('hidden');
        }
    });
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const hash = anchor.getAttribute('href');
            const targetElement = document.querySelector(hash);
            if (targetElement) {
                event.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                navMenu.classList.add('hidden');
            }
        });
    });
}

const menuData = [
    {
        title: 'Espreso',
        category: 'Kopi',
        description: 'Kopi hitam pekat dengan crema yang sempurna. Murni dan powerful untuk yang serius.',
        price: 'Rp28.000',
        detail: '#',
        order: '#',
        image: '../gambar/minuman/espreso.png'
    },
    {
        title: 'Capucino',
        category: 'Kopi',
        description: 'Kopi susu lembut dengan foam art yang indah. Favorit di setiap pagi.',
        price: 'Rp32.000',
        detail: '#',
        order: '#',
        image: '../gambar/minuman/capucino.png'
    },
    {
        title: 'Hazelnnut',
        category: 'Kopi',
        description: 'Kopi hazelnut yang creamy dan aromatic. Perpaduan sempurna cokelat dan kopi.',
        price: 'Rp38.000',
        detail: '#',
        order: '#',
        image: '../gambar/minuman/hazelnnut.png'
    },
    {
        title: 'Americano',
        category: 'Kopi',
        description: 'Kopi americano simple tapi powerful. Untuk yang suka rasa kopi yang murni.',
        price: 'Rp26.000',
        detail: '#',
        order: '#',
        image: '../gambar/minuman/americano.png'
    },
    {
        title: 'Butterscoth',
        category: 'Kopi',
        description: 'Latte manis dengan butterscotch sauce yang lezat. Chef special recommendation!',
        price: 'Rp34.000',
        detail: '#',
        order: '#',
        image: '../gambar/minuman/butterscoth.png'
    },
    {
        title: 'Caramel Latte',
        category: 'Minuman',
        description: 'Latte premium dengan caramel sauce homemade yang bikin ketagihan.',
        price: 'Rp36.000',
        detail: '#',
        order: '#',
        image: '../gambar/minuman/caramel latte.png'
    },
    {
        title: 'Sandwich Chicken',
        category: 'Makanan',
        description: 'Sandwich ayam panggang dengan lettuce, tomato, dan special sauce. Makan siang sempurna!',
        price: 'Rp45.000',
        detail: '#',
        order: '#',
        image: '../gambar/makanan/sandwich chicken.png'
    },
    {
        title: 'Nasi Goreng',
        category: 'Makanan',
        description: 'Nasi goreng dengan telur ceplok, sayuran, dan bumbu khas. Makanan utama favorit!',
        price: 'Rp43.000',
        detail: '#',
        order: '#',
        image: '../gambar/makanan/nasi goreng.png'
    },
    {
        title: 'Onion Ring',
        category: 'Makanan',
        description: 'Onion ring goreng crispy dengan golden brown crust. Snack yang addictive banget!',
        price: 'Rp32.000',
        detail: '#',
        order: '#',
        image: '../gambar/makanan/onion ring.png'
    },
    {
        title: 'Kentang Goreng',
        category: 'Makanan',
        description: 'Kentang goreng renyah dengan salt and pepper seasoning. Cocok sebagai cemilan atau side dish!',
        price: 'Rp28.000',
        detail: '#',
        order: '#',
        image: '../gambar/makanan/kentang goreng.png'
    }
];

function renderMenu(filter = 'Semua') {
    const grid = document.getElementById('menu-grid');
    const count = document.getElementById('menu-count');
    if (!grid || !count) return;
    const filtered = filter === 'Semua' ? menuData : menuData.filter((item) => item.category === filter);
    grid.innerHTML = filtered.map((item) => `
        <article class="card-box p-6 cursor-pointer hover:shadow-lg hover:shadow-amber-900/50 transition">
            <div class="mb-4 overflow-hidden rounded-3xl bg-[#2d1509]">
                <img src="${item.image}" alt="${item.title}" class="h-52 w-full object-cover">
            </div>
            <div class="space-y-4">
                <div class="flex items-center justify-between gap-3 text-sm text-amber-300">
                    <span class="font-semibold">${item.category}</span>
                    <span class="rounded-full bg-[#2d1509] px-3 py-1 text-amber-100">${item.price}</span>
                </div>
                <h3 class="text-2xl font-semibold text-amber-100">${item.title}</h3>
                <p class="text-amber-200 leading-7">${item.description}</p>
                <div class="flex flex-wrap gap-3">
                    <button data-menu-item="${item.title}" class="btn-secondary inline-flex rounded-full px-4 py-2 text-sm font-semibold">Lihat Detail</button>
                </div>
            </div>
        </article>
    `).join('');
    count.textContent = `${filtered.length} item menu ditampilkan.`;
    
    // Setup menu item click handlers
    document.querySelectorAll('[data-menu-item]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const itemTitle = btn.dataset.menuItem;
            const item = menuData.find(m => m.title === itemTitle);
            if (item) {
                openMenuModal(item);
            }
        });
    });
}

function setupMenuFilters() {
    const buttons = document.querySelectorAll('.menu-filter');
    if (!buttons.length) return;
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            buttons.forEach((item) => item.classList.remove('active'));
            button.classList.add('active');
            renderMenu(button.dataset.filter);
        });
    });
}

function initializeModal() {
    const modal = document.getElementById('menu-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeMenuModal();
            }
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    initializeNavToggle();
    setupSmoothScroll();
    renderMenu();
    setupMenuFilters();
    initializeModal();
});
