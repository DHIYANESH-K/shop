/* ==========================================
   AURA FASHION - DIWALI SALE 2026 JAVASCRIPT
   ========================================== */

// Product Database (8 Sample Products)
const productsData = [
    {
        id: 1,
        name: "Women's Designer Silk Saree",
        category: "women",
        price: 2499,
        originalPrice: 4999,
        discount: "50% OFF",
        rating: 4.8,
        reviews: 142,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600",
        badge: "Best Seller"
    },
    {
        id: 2,
        name: "Men's Traditional Kurta",
        category: "men",
        price: 1499,
        originalPrice: 2999,
        discount: "50% OFF",
        rating: 4.6,
        reviews: 98,
        image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=600",
        badge: "Trending"
    },
    {
        id: 3,
        name: "Women's Anarkali Dress",
        category: "women",
        price: 2199,
        originalPrice: 3999,
        discount: "45% OFF",
        rating: 4.9,
        reviews: 215,
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600",
        badge: "Diwali Special"
    },
    {
        id: 4,
        name: "Men's Ethnic Jacket Set",
        category: "men",
        price: 2799,
        originalPrice: 4999,
        discount: "44% OFF",
        rating: 4.7,
        reviews: 84,
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600",
        badge: "New Arrival"
    },
    {
        id: 5,
        name: "Kids' Festive Lehenga",
        category: "kids",
        price: 1299,
        originalPrice: 2599,
        discount: "50% OFF",
        rating: 4.9,
        reviews: 76,
        image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=600",
        badge: "Cute & Comfy"
    },
    {
        id: 6,
        name: "Women's Party Wear Gown",
        category: "women",
        price: 1999,
        originalPrice: 3499,
        discount: "42% OFF",
        rating: 4.5,
        reviews: 110,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=600",
        badge: "Trending"
    },
    {
        id: 7,
        name: "Men's Cotton Kurta",
        category: "men",
        price: 999,
        originalPrice: 1999,
        discount: "50% OFF",
        rating: 4.4,
        reviews: 65,
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600",
        badge: "Best Value"
    },
    {
        id: 8,
        name: "Kids' Traditional Kurta Set",
        category: "kids",
        price: 899,
        originalPrice: 1599,
        discount: "43% OFF",
        rating: 4.8,
        reviews: 52,
        image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=600",
        badge: "Festive Pick"
    }
];

// State Management (LocalStorage Integration)
let cart = JSON.parse(localStorage.getItem('aura_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('aura_wishlist')) || [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const filterButtons = document.querySelectorAll('.filter-btn, .filter-trigger, .btn-text');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const cartToggle = document.getElementById('cartToggle');
const closeCart = document.getElementById('closeCart');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartCount = document.getElementById('cartCount');
const cartDrawerCount = document.getElementById('cartDrawerCount');
const cartSubtotalAmount = document.getElementById('cartSubtotalAmount');
const wishlistCount = document.getElementById('wishlistCount');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMobileMenu = document.getElementById('closeMobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const backToTop = document.getElementById('backToTop');
const newsletterForm = document.getElementById('newsletterForm');
const newsletterEmail = document.getElementById('newsletterEmail');
const newsletterMessage = document.getElementById('newsletterMessage');

// Initialize Website
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(productsData);
    updateCartUI();
    updateWishlistUI();
    startDiwaliCountdown();
    setupEventListeners();
});

// Display Products in Grid
function displayProducts(products) {
    if (!productsGrid) return;
    
    if (products.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--accent-gold); margin-bottom: 15px;"></i>
                <h3>No festive products found</h3>
                <p>Try searching with a different keyword or category.</p>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = products.map(product => {
        const isWishlisted = wishlist.includes(product.id);
        return `
            <div class="product-card" data-category="${product.category}">
                <span class="product-badge">${product.badge}</span>
                <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(${product.id})" title="Add to Wishlist">
                    <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
                </button>
                <div class="product-img-wrapper">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-rating">
                        <i class="fas fa-star"></i>
                        <span>${product.rating} (${product.reviews})</span>
                    </div>
                    <div class="product-pricing">
                        <span class="current-price">₹${product.price.toLocaleString()}</span>
                        <span class="original-price">₹${product.originalPrice.toLocaleString()}</span>
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-bag"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Event Listeners Setup
function setupEventListeners() {
    // Category Filtering
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = btn.getAttribute('data-filter');
            
            // Highlight active button if standard filter btn
            if (btn.classList.contains('filter-btn')) {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }

            // Filter products
            if (filter === 'all') {
                displayProducts(productsData);
            } else {
                const filtered = productsData.filter(p => p.category === filter);
                displayProducts(filtered);
            }

            // Smooth scroll to products section if clicked from offers/collections
            if (!btn.classList.contains('filter-btn')) {
                const productsSection = document.getElementById('products');
                if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Search functionality
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') handleSearch();
        });
    }

    // Cart Drawer Toggle
    if (cartToggle) cartToggle.addEventListener('click', toggleCartDrawer);
    if (closeCart) closeCart.addEventListener('click', toggleCartDrawer);
    if (cartOverlay) cartOverlay.addEventListener('click', toggleCartDrawer);

    // Mobile Menu Toggle
    if (hamburger) hamburger.addEventListener('click', () => mobileMenu.classList.add('active'));
    if (closeMobileMenu) closeMobileMenu.addEventListener('click', () => mobileMenu.classList.remove('active'));
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.remove('active'));
    });

    // Back to Top & Scroll Spy
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Newsletter Form Validation
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterEmail.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailRegex.test(email)) {
                newsletterMessage.textContent = "Thank you for subscribing! Check your inbox for festive discount codes.";
                newsletterMessage.className = "newsletter-message success";
                newsletterForm.reset();
            } else {
                newsletterMessage.textContent = "Please enter a valid email address.";
                newsletterMessage.className = "newsletter-message error";
            }
        });
    }

    // Checkout button action
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your shopping bag is empty.');
                return;
            }
            alert('🎉 Thank you for shopping with AURA FASHION! Diwali order simulation successful. Happy Diwali 2026! 🪔');
            cart = [];
            saveCart();
            updateCartUI();
            toggleCartDrawer();
        });
    }
}

// Search Handler
function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) {
        displayProducts(productsData);
        return;
    }
    const filtered = productsData.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
    );
    displayProducts(filtered);
    
    const productsSection = document.getElementById('products');
    if (productsSection) productsSection.scrollIntoView({ behavior: 'smooth' });
}

// Cart Management Functions
function addToCart(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartUI();
    
    // Open cart drawer on add
    if (!cartDrawer.classList.contains('active')) {
        toggleCartDrawer();
    }
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== productId);
    }

    saveCart();
    updateCartUI();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (cartCount) cartCount.textContent = totalCount;
    if (cartDrawerCount) cartDrawerCount.textContent = totalCount;
    if (cartSubtotalAmount) cartSubtotalAmount.textContent = `₹${subtotal.toLocaleString()}`;

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-bag"></i>
                <p>Your shopping bag is empty</p>
            </div>
        `;
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="cart-item-remove" onclick="removeFromCart(${item.id})"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
        </div>
    `).join('');
}

function toggleCartDrawer() {
    cartDrawer.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

// Wishlist Management Functions
function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1);
    } else {
        wishlist.push(productId);
    }

    localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
    
    // Re-render products to update heart icon state
    const activeFilterBtn = document.querySelector('.filter-btn.active');
    const currentCategory = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
    if (currentCategory === 'all') {
        displayProducts(productsData);
    } else {
        displayProducts(productsData.filter(p => p.category === currentCategory));
    }
}

function updateWishlistUI() {
    if (wishlistCount) wishlistCount.textContent = wishlist.length;
}

// Diwali Countdown Timer (Target: November 8, 2026)
function startDiwaliCountdown() {
    const targetDate = new Date('November 8, 2026 00:00:00').getTime();

    const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference < 0) {
            clearInterval(timerInterval);
            const timerContainer = document.getElementById('countdownTimer');
            if (timerContainer) {
                timerContainer.innerHTML = `<h3 style="color: var(--accent-gold); font-size: 1.8rem;">🎉 Diwali Mega Sale Concluded! Stay Tuned for Next Year! 🪔</h3>`;
            }
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }, 1000);
}