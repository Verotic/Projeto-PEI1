document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll to Top Button
  initScrollToTop();

  // 2. 3D Tilt Effect on Cards
  initTiltEffect();

  // 3. Hero Background Carousel
  initHeroCarousel();

  // 4. Initialize PI2 Dynamic Animations (GSAP)
  setTimeout(() => {
    initGSAPAnimations();
  }, 100);
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

/* ═══════════════════════════════════════════
   4. PI2 - GSAP & THREE.JS ANIMATIONS (DAVID)
   ═══════════════════════════════════════════ */

/**
 * Initializes GSAP ScrollTrigger animations
 */
function initGSAPAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded.');
    return;
  }
  
  gsap.registerPlugin(ScrollTrigger);

  // 4.1. Fade and slide up sections on scroll
  const sections = document.querySelectorAll('section');
  sections.forEach(sec => {
    gsap.fromTo(sec, 
      { opacity: 0, y: 50 },
      {
        opacity: 1, 
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sec,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // 4.2. Animate statistics counter
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(num => {
    const text = num.innerText;
    // Basic extraction
    const match = text.match(/^([^\d]*)(\d+)([^\d]*)$/);
    
    if (match && match[2]) {
      const prefix = match[1] || '';
      const targetVal = parseInt(match[2], 10);
      const suffix = match[3] || '';

      gsap.fromTo(num, 
        { innerHTML: 0 }, 
        {
          innerHTML: targetVal,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.stats-grid',
            start: 'top 85%',
          },
          onUpdate: function() {
            num.innerHTML = prefix + Math.floor(this.targets()[0].innerHTML) + suffix;
          }
        }
      );
    }
  });

  // 4.3. Stagger animate Area Cards
  gsap.from('.area-card', {
    scrollTrigger: {
      trigger: '.areas-grid',
      start: 'top 80%'
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'back.out(1.2)'
  });
}
