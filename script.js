// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Menü kapatıldığında hizmetler menüsünü de kapat
    const mobileMenuLinks = mobileMenu.querySelectorAll('a:not(#mobileServicesToggle)');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            
            // Hizmetler menüsünü de kapat
            const mobileServicesMenu = document.getElementById('mobileServicesMenu');
            const mobileServicesToggle = document.getElementById('mobileServicesToggle');
            if (mobileServicesMenu && mobileServicesToggle) {
                mobileServicesMenu.classList.remove('active');
                mobileServicesToggle.classList.remove('active');
            }
        });
    });
}

// Mobile Services Menu
const mobileServicesToggle = document.getElementById('mobileServicesToggle');
const mobileServicesMenu = document.getElementById('mobileServicesMenu');

if (mobileServicesToggle && mobileServicesMenu) {
    mobileServicesToggle.addEventListener('click', (e) => {
        e.preventDefault();
        mobileServicesMenu.classList.toggle('active');
        mobileServicesToggle.classList.toggle('active');
    });

    // Kapatma: Hizmet linkine tıklandığında menüyü kapat
    const serviceLinks = mobileServicesMenu.querySelectorAll('a');
    serviceLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileServicesMenu.classList.remove('active');
            mobileServicesToggle.classList.remove('active');
        });
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Prevent zoom on double tap
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Prevent pinch zoom
document.addEventListener('wheel', (e) => {
    if (e.ctrlKey) {
        e.preventDefault();
    }
}, { passive: false });

console.log('ILGIN GROUP Website Loaded');
