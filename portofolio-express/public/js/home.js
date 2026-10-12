/* ==========================================================
   HOME.JS - AUGUSTO NEVES / JOKER UI
   Versão final: menu mobile + carrossel + revelações
   ========================================================== */

document.addEventListener('DOMContentLoaded', function () {

    /* ========================================================
       0. PROTEÇÃO GLOBAL CONTRA SCROLL LATERAL
       ======================================================== */
    // Garante que o body nunca cria scroll horizontal
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';

    // Bloqueia qualquer gesto que tente mover a tela lateralmente no mobile
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener('touchstart', function (e) {
        if (e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }
    }, { passive: true });

    document.addEventListener('touchmove', function (e) {
        if (e.touches.length === 1) {
            const dx = Math.abs(e.touches[0].clientX - touchStartX);
            const dy = Math.abs(e.touches[0].clientY - touchStartY);

            // Se o movimento for mais horizontal do que vertical, bloqueia
            if (dx > dy && dx > 10) {
                e.preventDefault();
            }
        }
    }, { passive: false });


    /* ========================================================
       1. HERO CAROUSEL
       ======================================================== */
    let currentHeroIndex = 0;
    const heroSlides = document.querySelectorAll('.hero-bg-slide');
    const heroDots = document.querySelectorAll('.carousel-dot');

    const heroTexts = [
        {
            tag: "OUR VISION",
            title: "DESIGN",
            titleOutline: "DIGITAL",
            desc: "O nosso hobby é um <strong>design moderno</strong> e conveniente, a chave para uma comunicação bem-sucedida com o cliente. Criamos <strong>experiências digitais</strong> que transformam marcas."
        },
        {
            tag: "CREATIVE FLOW",
            title: "VISION",
            titleOutline: "FUTURE",
            desc: "Transformamos conceitos abstratos em <strong>identidades visuais</strong> de alto impacto e experiências imersivas que conectam marcas e pessoas."
        },
        {
            tag: "DIGITAL IMPACT",
            title: "FUTURE",
            titleOutline: "TECH",
            desc: "Desenvolvimento focado em <strong>performance extrema</strong>, interações fluidas e usabilidade de classe mundial para produtos digitais."
        },
        {
            tag: "FINAL TOUCH",
            title: "SUCCESS",
            titleOutline: "ELITE",
            desc: "Cada detalhe foi meticulosamente planejado para entregar um <strong>ecossistema digital</strong> pronto para liderar o mercado."
        }
    ];

    const tagEl = document.getElementById('vision-tag-text');
    const titleEl = document.getElementById('hero-title-text');
    const descEl = document.getElementById('hero-desc-text');

    function setHeroSlide(index) {
        if (!heroSlides.length) return;

        heroSlides.forEach(slide => slide.classList.remove('active'));
        heroDots.forEach(dot => dot.classList.remove('active'));

        if (heroSlides[index]) heroSlides[index].classList.add('active');
        if (heroDots[index]) heroDots[index].classList.add('active');

        if (tagEl && heroTexts[index]) tagEl.textContent = heroTexts[index].tag;

        if (titleEl && heroTexts[index]) {
            titleEl.innerHTML =
                '<span class="gradient-line">' + heroTexts[index].title + '</span>' +
                '<span class="outline-text">' + heroTexts[index].titleOutline + '</span>';
        }

        if (descEl && heroTexts[index]) descEl.innerHTML = heroTexts[index].desc;

        currentHeroIndex = index;
    }

    function nextHeroSlide() {
        if (!heroSlides.length) return;
        const next = (currentHeroIndex + 1) % heroSlides.length;
        setHeroSlide(next);
    }

    function prevHeroSlide() {
        if (!heroSlides.length) return;
        const prev = (currentHeroIndex - 1 + heroSlides.length) % heroSlides.length;
        setHeroSlide(prev);
    }

    // Expor funções globais (usadas nos onclick do HTML)
    window.setHeroSlide = setHeroSlide;
    window.nextHeroSlide = nextHeroSlide;
    window.prevHeroSlide = prevHeroSlide;

    // Auto-play do carrossel (só se houver mais de 1 slide)
    if (heroSlides.length > 1) {
        setInterval(() => { nextHeroSlide(); }, 7000);
    }


    /* ========================================================
       2. MENU HAMBURGER MOBILE
       ======================================================== */
    const menuHamburger = document.getElementById('menuHamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    function openMobileMenu() {
        if (!mobileMenu || !menuHamburger) return;

        mobileMenu.classList.add('active');
        menuHamburger.classList.add('active');
        mobileMenu.setAttribute('aria-hidden', 'false');
        menuHamburger.setAttribute('aria-label', 'Fechar menu');

        // Bloquear scroll do body
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        if (!mobileMenu || !menuHamburger) return;

        mobileMenu.classList.remove('active');
        menuHamburger.classList.remove('active');
        mobileMenu.setAttribute('aria-hidden', 'true');
        menuHamburger.setAttribute('aria-label', 'Abrir menu');

        // Restaurar scroll
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    }

    if (menuHamburger && mobileMenu) {

        // Abrir / fechar com clique no hamburger
        menuHamburger.addEventListener('click', function (e) {
            e.stopPropagation();
            if (mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Fechar ao clicar em qualquer link do menu
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                closeMobileMenu();
            });
        });

        // Fechar ao clicar no backdrop (fora dos links)
        mobileMenu.addEventListener('click', function (e) {
            if (e.target === mobileMenu ||
                e.target.classList.contains('mobile-menu-backdrop') ||
                e.target.classList.contains('mobile-menu-bg')) {
                closeMobileMenu();
            }
        });

        // Fechar com tecla ESC
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Fechar automaticamente se redimensionar para desktop
        window.addEventListener('resize', function () {
            if (window.innerWidth > 1024 && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }


    /* ========================================================
       3. ANO ATUAL NO FOOTER
       ======================================================== */
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }


    /* ========================================================
       4. OBSERVER GENÉRICO (FADE REVEAL)
       ======================================================== */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-reveal, .fade-reveal-left, .fade-reveal-right').forEach((el) => {
        revealObserver.observe(el);
    });


    /* ========================================================
       5. CV MATRIX GRID
       ======================================================== */
    const cvObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const blocks = entry.target.querySelectorAll('.cv-block');
                blocks.forEach((block, index) => {
                    setTimeout(() => { block.classList.add('revealed'); }, index * 120);
                });
                cvObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const cvMatrixGrid = document.querySelector('.cv-matrix-grid');
    if (cvMatrixGrid) cvObserver.observe(cvMatrixGrid);


    /* ========================================================
       6. STATS GRID + CONTADOR ANIMADO
       ======================================================== */
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.stat-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('revealed');
                        const numberEl = card.querySelector('.stat-number');
                        if (numberEl && !numberEl.dataset.animated) {
                            numberEl.dataset.animated = 'true';
                            animateCounter(numberEl);
                        }
                    }, index * 150);
                });
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) statObserver.observe(statsGrid);


    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'), 10);
        if (isNaN(target)) return;

        const duration = 2200;
        const startTime = performance.now();
        const startValue = 0;

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentValue = Math.floor(startValue + (target - startValue) * easedProgress);
            element.textContent = currentValue.toLocaleString('pt-PT');

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString('pt-PT');
            }
        }
        requestAnimationFrame(updateCounter);
    }


    /* ========================================================
       7. SKILLS GRID
       ======================================================== */
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.skill-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('revealed');
                        const fill = item.querySelector('.skill-bar-fill');
                        if (fill) {
                            fill.style.width = fill.getAttribute('data-width') + '%';
                        }
                    }, index * 120);
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) skillsObserver.observe(skillsGrid);


    /* ========================================================
       8. SECTION HEADERS (SMALL)
       ======================================================== */
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                headerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.section-header-sm').forEach((el) => {
        headerObserver.observe(el);
    });


    /* ========================================================
       9. INTERESTS GRID
       ======================================================== */
    const interestsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.interest-card');
                cards.forEach((card, index) => {
                    setTimeout(() => { card.classList.add('revealed'); }, index * 80);
                });
                interestsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const interestsGrid = document.querySelector('.interests-grid');
    if (interestsGrid) interestsObserver.observe(interestsGrid);


    /* ========================================================
       10. SERVICES GRID
       ======================================================== */
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.service-card-wrapper');
                cards.forEach((card, index) => {
                    setTimeout(() => { card.classList.add('revealed'); }, index * 120);
                });
                serviceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const serviceGrid = document.querySelector('.services-grid-static');
    if (serviceGrid) serviceObserver.observe(serviceGrid);


    /* ========================================================
       11. PROJECTS GRID
       ======================================================== */
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.project-card');
                cards.forEach((card, index) => {
                    setTimeout(() => { card.classList.add('revealed'); }, index * 120);
                });
                projectObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const projectsGrid = document.querySelector('.projects-grid-6');
    if (projectsGrid) projectObserver.observe(projectsGrid);


    /* ========================================================
       12. PILLS CLOUD
       ======================================================== */
    const pillsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const pills = entry.target.querySelectorAll('.pill');
                pills.forEach((pill, index) => {
                    setTimeout(() => { pill.classList.add('revealed'); }, index * 60);
                });
                pillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const pillsCloud = document.querySelector('.pills-cloud');
    if (pillsCloud) pillsObserver.observe(pillsCloud);


    /* ========================================================
       13. PLANS GRID
       ======================================================== */
    const plansObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.plan-card');
                cards.forEach((card, index) => {
                    setTimeout(() => { card.classList.add('revealed'); }, index * 150);
                });
                plansObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const plansGrid = document.querySelector('.plans-grid');
    if (plansGrid) plansObserver.observe(plansGrid);


    /* ========================================================
       14. GRANDES HEADERS
       ======================================================== */
    const sectionHeaderObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                sectionHeaderObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll(
        '.projects-header, .plans-header, .footer-heading-area, .services-heading-area, .cv-header'
    ).forEach((el) => {
        el.classList.add('fade-reveal');
        sectionHeaderObserver.observe(el);
    });


    /* ========================================================
       15. CONTACT FORM
       ======================================================== */
    const formObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                formObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const contactForm = document.querySelector('.contact-form-container');
    if (contactForm) {
        contactForm.classList.add('fade-reveal');
        formObserver.observe(contactForm);
    }


    /* ========================================================
       16. FOOTER BANNER / GRIDS / FINAL BAR
       ======================================================== */
    const bannerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                bannerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const downloadBanner = document.querySelector('.download-banner-card');
    if (downloadBanner) {
        downloadBanner.classList.add('fade-reveal');
        bannerObserver.observe(downloadBanner);
    }

    const footerBottomGrid = document.querySelector('.footer-bottom-grid');
    if (footerBottomGrid) {
        footerBottomGrid.classList.add('fade-reveal');
        bannerObserver.observe(footerBottomGrid);
    }

    const footerFinalBar = document.querySelector('.footer-final-bar');
    if (footerFinalBar) {
        footerFinalBar.classList.add('fade-reveal');
        bannerObserver.observe(footerFinalBar);
    }


    /* ========================================================
       17. FEATURES BAR
       ======================================================== */
    const featuresBar = document.querySelector('.features-bar-inner');
    if (featuresBar) {
        featuresBar.classList.add('fade-reveal');

        const featuresObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    featuresObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        featuresObserver.observe(featuresBar);
    }


    /* ========================================================
       18. SMOOTH SCROLL PARA PROJECTOS
       ======================================================== */
    const heroProjectsBtn = document.querySelector('.hero-actions-row .btn-hero-primary');
    if (heroProjectsBtn) {
        heroProjectsBtn.addEventListener('click', function () {
            const target = document.querySelector('.projects-matrix-section');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }


    /* ========================================================
       19. SEGURANÇA EXTRA: FORÇAR FECHO DO MENU NO LOAD
       ======================================================== */
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
        mobileMenu.setAttribute('aria-hidden', 'true');
    }
    if (menuHamburger) {
        menuHamburger.classList.remove('active');
    }
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';

}); // FIM DO DOMContentLoaded
