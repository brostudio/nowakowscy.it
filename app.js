/* ================================================
   nowakowscy.it — JavaScript Interactions
   Architecture-First Edition
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------
    // 1. NAVBAR — scroll effect & hamburger
    // ----------------------------------------
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        });
    });

    // ----------------------------------------
    // 2. SMOOTH SCROLL for anchor links
    // ----------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = navbar.offsetHeight + 16;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ----------------------------------------
    // 3. LANGUAGE TABS
    // ----------------------------------------
    const langTabs = document.querySelectorAll('.lang-tab');
    const langPanels = document.querySelectorAll('.lang-panel');

    langTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const lang = tab.dataset.lang;
            langTabs.forEach(t => t.classList.remove('active'));
            langPanels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const panel = document.getElementById('lang-' + lang);
            if (panel) panel.classList.add('active');
        });
    });

    // ----------------------------------------
    // 4. SOFTWARE DEV CURRICULUM TOGGLE
    // ----------------------------------------
    const toggleBtn = document.getElementById('toggle-sw-curriculum');
    const swContent = document.getElementById('sw-curriculum-content');

    if (toggleBtn && swContent) {
        toggleBtn.addEventListener('click', () => {
            const isOpen = toggleBtn.classList.toggle('open');
            if (isOpen) {
                swContent.style.display = 'block';
                swContent.style.animation = 'fadeIn 0.3s ease';
                toggleBtn.childNodes[0].textContent = 'Hide Development Curriculum ';
                // Trigger reveal for newly shown cards
                swContent.querySelectorAll('.module-card').forEach((el, i) => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(16px)';
                    el.style.transition = `opacity 0.4s ease ${i * 0.04}s, transform 0.4s ease ${i * 0.04}s`;
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        });
                    });
                });
            } else {
                swContent.style.display = 'none';
                toggleBtn.childNodes[0].textContent = 'Show Development Curriculum ';
            }
        });
    }

    // ----------------------------------------
    // 5. CONTACT FORM — simulated submit
    // ----------------------------------------
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = 'Sending<span class="sending-dots">...</span>';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            setTimeout(() => {
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
            }, 1200);
        });
    }

    // ----------------------------------------
    // 6. BACK TO TOP BUTTON
    // ----------------------------------------
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ----------------------------------------
    // 7. SCROLL REVEAL — intersection observer
    // ----------------------------------------
    const revealTargets = document.querySelectorAll(
        '.module-card, .pillar-card, .path-card, .feature-item, .contact-item, ' +
        '.featured-course-inner, .lang-panel-inner, .manifesto-card, .shift-table, ' +
        '.lang-context-banner, .arch-diagram'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    revealTargets.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.5s ease ${(index % 12) * 0.06}s, transform 0.5s ease ${(index % 12) * 0.06}s`;
        revealObserver.observe(el);
    });

    // ----------------------------------------
    // 8. HERO STATS — count-up animation
    // ----------------------------------------
    function animateCountUp(el, target, duration, suffix) {
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                start = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(start) + suffix;
        }, 16);
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = document.querySelectorAll('.stat-number');
                const data = [
                    { val: 15, suffix: '+' },
                    { val: 4,  suffix: '' },
                    { val: 41, suffix: '' },
                    { val: 100, suffix: '%' }
                ];
                statNumbers.forEach((el, i) => {
                    if (data[i]) animateCountUp(el, data[i].val, 1400, data[i].suffix);
                });
                statsObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) statsObserver.observe(heroStats);

    // ----------------------------------------
    // 9. ACTIVE NAV LINK highlighting
    // ----------------------------------------
    const sections = document.querySelectorAll('section[id]');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.querySelectorAll('a').forEach(link => {
                    link.classList.remove('nav-active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('nav-active');
                    }
                });
            }
        });
    }, { threshold: 0.25 });

    sections.forEach(sec => navObserver.observe(sec));

    // ----------------------------------------
    // 10. ARCHITECTURE DIAGRAM — animate nodes
    // ----------------------------------------
    const archNodes = document.querySelectorAll('.arch-node');
    archNodes.forEach((node, i) => {
        node.style.opacity = '0';
        node.style.transform = 'scale(0.85)';
        setTimeout(() => {
            node.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            node.style.opacity = '1';
            node.style.transform = 'scale(1)';
        }, i * 150 + 800);
    });

    // ----------------------------------------
    // 11. PATH CARDS — stagger animation on section enter
    // ----------------------------------------
    const pathSection = document.getElementById('arch-paths');
    if (pathSection) {
        const pathObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                document.querySelectorAll('.path-card').forEach((card, i) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, i * 120);
                });
                pathObserver.disconnect();
            }
        }, { threshold: 0.1 });
        pathObserver.observe(pathSection);
    }

    // ----------------------------------------
    // 12. WHY-ARCH shift table — animate rows
    // ----------------------------------------
    const whySection = document.getElementById('why-arch');
    if (whySection) {
        const whyObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                document.querySelectorAll('.shift-row').forEach((row, i) => {
                    row.style.opacity = '0';
                    setTimeout(() => {
                        row.style.transition = 'opacity 0.4s ease';
                        row.style.opacity = '1';
                    }, i * 100 + 300);
                });
                whyObserver.disconnect();
            }
        }, { threshold: 0.2 });
        whyObserver.observe(whySection);
    }

});
