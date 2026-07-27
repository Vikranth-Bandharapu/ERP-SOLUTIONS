document.addEventListener('DOMContentLoaded', () => {
    // 1. Page Loader
    const loader = document.getElementById('page-loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 500); // Small delay to let animations setup
    }

    // 2. Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
        });
    }

    // 3. Header Scroll Effect
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('bg-glass', 'shadow-sm');
                header.classList.remove('bg-transparent');
            } else {
                header.classList.remove('bg-glass', 'shadow-sm');
                header.classList.add('bg-transparent');
            }
        });
    }

    // 4. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 5. Scroll to Top Button
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
                scrollTopBtn.classList.add('opacity-100');
            } else {
                scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
                scrollTopBtn.classList.remove('opacity-100');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 6. Custom 404 Routing for dead links
    const allLinks = document.querySelectorAll('a, button');
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // If it's a dummy link
        if (href === '#') {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = '404.html';
            });
        } else if (href && href.startsWith('#') && href.length > 1) {
             // Smooth scroll for anchor links
             const target = document.querySelector(href);
             if(target) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                });
             }
        }
    });
});

// Toast Utility globally available
window.showToast = function(message, type = 'success') {
    if (typeof Toastify !== 'undefined') {
        Toastify({
            text: message,
            duration: 3000,
            gravity: "top", 
            position: "right", 
            style: {
                background: type === 'error' ? "linear-gradient(to right, #EF4444, #B91C1C)" : "linear-gradient(to right, #10B981, #047857)",
            }
        }).showToast();
    } else {
        console.warn('Toastify not loaded: ', message);
    }
}
