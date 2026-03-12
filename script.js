document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll to Top Button
  initScrollToTop();

  // 2. 3D Tilt Effect on Cards
  initTiltEffect();

  // 3. Hero Background Carousel
  initHeroCarousel();
});

/* ═══════════════════════════════════════════
   1. SCROLL TO TOP
   ═══════════════════════════════════════════ */
function initScrollToTop() {
  const scrollBtn = document.getElementById('scrollTopBtn');
  
  if (!scrollBtn) return;

  // Show/Hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  // Smooth scroll to top
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ═══════════════════════════════════════════
   2. 3D TILT EFFECT
   ═══════════════════════════════════════════ */
function initTiltEffect() {
  const cards = document.querySelectorAll('.area-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}

/* ═══════════════════════════════════════════
   3. HERO BACKGROUND CAROUSEL
   ═══════════════════════════════════════════ */
function initHeroCarousel() {
  const carouselContainer = document.querySelector('.hero-carousel');
  if (!carouselContainer) return;

  const images = [
    'assets/images/caca-1',
    'assets/images/caca-2'
  ];

  // Clear existing images to rebuild
  carouselContainer.innerHTML = '';
  
  // Create image elements
  images.forEach((baseName, index) => {
    const img = document.createElement('img');
    // Set src to the largest available original image for fallback
    img.src = `${baseName}.avif`;
    
    // Set srcset for responsive loading
    img.srcset = `
      ${baseName}-sm.avif 640w,
      ${baseName}-md.avif 1024w,
      ${baseName}-lg.avif 1297w,
      ${baseName}.avif 2752w
    `;
    
    // Set sizes to 100vw since it covers the full width
    img.sizes = "100vw";
    
    img.alt = ""; // Decorative image, hidden from screen readers via container aria-hidden
    if (index === 0) img.classList.add('active');
    carouselContainer.appendChild(img);
  });

  let currentIndex = 0;
  const imgElements = carouselContainer.querySelectorAll('img');

  function nextImage() {
    // Remove active class from current
    imgElements[currentIndex].classList.remove('active');
    
    // Update index
    currentIndex = (currentIndex + 1) % imgElements.length;
    
    // Add active class to next
    imgElements[currentIndex].classList.add('active');
  }

  // Auto-play every 5 seconds
  setInterval(nextImage, 5000);
}
