/* ==========================================================================
   LUTERA TOAST COMPANY - HIGH-ANIMATION JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* 1. INITIALIZE VANILLA TILT 3D CARD EFFECT */
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
            max: 15,
            speed: 400,
            glare: true,
            'max-glare': 0.2,
            scale: 1.02
        });
    }

    /* 2. GSAP REVEAL ANIMATIONS */
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Reveal Animation
    gsap.from('.anim-reveal', {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Scroll Triggered Reveal for Section Titles
    gsap.utils.toArray('.scroll-anim').forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // Staggered Reveal for Gallery Toast Cards
    gsap.from('.scroll-card', {
        scrollTrigger: {
            trigger: '.toast-grid',
            start: 'top 80%',
        },
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.4)'
    });

    /* 3. MAGNETIC BUTTON EFFECT */
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });

    /* 4. SCROLL PROGRESS BAR */
    const progressBar = document.getElementById('progressBar');
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (height > 0) {
            const scrolled = (winScroll / height) * 100;
            if (progressBar) progressBar.style.width = `${scrolled}%`;
        }
    });

    /* 5. CATEGORY TAB FILTERING WITH ANIMATION */
    const filterBtns = document.querySelectorAll('.tab-btn');
    const toastCards = document.querySelectorAll('.toast-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            toastCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    gsap.to(card, {
                        opacity: 1,
                        scale: 1,
                        display: 'block',
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                } else {
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.3,
                        ease: 'power2.in',
                        onComplete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });

    /* 6. INTERACTIVE TOAST BUILDER (IMAGE BASED) */
    const shapeBtns = document.querySelectorAll('#shape-options .opt-btn');
    const colorBtns = document.querySelectorAll('#color-options .opt-btn');
    const previewImg = document.getElementById('toast-preview-img');
    const previewTitle = document.getElementById('preview-title');
    const previewDesc = document.getElementById('preview-desc');
    const orderBtn = document.getElementById('order-toast-btn');

    // Image Mapping for different choices
    const toastImages = {
        'star-shape': 'https://images.unsplash.com/photo-1584776296944-ab6fb57b0bff?w=500&auto=format&fit=crop&q=80',
        'heart-shape': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&auto=format&fit=crop&q=80',
        'diamond-shape': 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500&auto=format&fit=crop&q=80',
        'hexagon-shape': 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=500&auto=format&fit=crop&q=80'
    };

    let currentShape = 'star-shape';
    let currentShapeName = 'Star';
    let currentColor = 'glow-pink';
    let currentColorName = 'Neon Pink';
    let currentFlavor = 'Dragonfruit & Berry';

    function updatePreview() {
        if (!previewImg) return;

        // Pop & Rotate Animation on Image Change
        gsap.to(previewImg, {
            scale: 0.4,
            rotation: -90,
            opacity: 0,
            duration: 0.25,
            ease: 'power2.in',
            onComplete: () => {
                previewImg.src = toastImages[currentShape];
                previewImg.className = `toast-img-visual ${currentColor}`;
                
                if (previewTitle) previewTitle.innerText = `${currentShapeName}-Shaped Toast`;
                if (previewDesc) previewDesc.innerText = `${currentColorName} • ${currentFlavor}`;

                gsap.to(previewImg, {
                    scale: 1,
                    rotation: 0,
                    opacity: 1,
                    duration: 0.4,
                    ease: 'back.out(1.7)'
                });
            }
        });
    }

    shapeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            shapeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentShape = btn.getAttribute('data-shape');
            currentShapeName = btn.getAttribute('data-shape-name');
            updatePreview();
        });
    });

    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            colorBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentColor = btn.getAttribute('data-color');
            currentColorName = btn.getAttribute('data-color-name');
            currentFlavor = btn.getAttribute('data-flavor');
            updatePreview();
        });
    });

    if (orderBtn) {
        orderBtn.addEventListener('click', () => {
            alert(`🚀 Congratulations! Your custom ${currentShapeName} Toast (${currentColorName}) has been added to cart.`);
        });
    }

});
