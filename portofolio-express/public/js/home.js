        let currentHeroIndex = 0;
        const heroSlides = document.querySelectorAll('.hero-bg-slide');
        const heroDots = document.querySelectorAll('.carousel-dot');

        const heroTexts = [
            { tag: "OUR VISION", title: "DESIGN", titleOutline: "DIGITAL", desc: "O nosso hobby é um <strong>design moderno</strong> e conveniente, a chave para uma comunicação bem-sucedida com o cliente. Criamos <strong>experiências digitais</strong> que transformam marcas." },
            { tag: "CREATIVE FLOW", title: "VISION", titleOutline: "FUTURE", desc: "Transformamos conceitos abstratos em <strong>identidades visuais</strong> de alto impacto e experiências imersivas que conectam marcas e pessoas." },
            { tag: "DIGITAL IMPACT", title: "FUTURE", titleOutline: "TECH", desc: "Desenvolvimento focado em <strong>performance extrema</strong>, interações fluidas e usabilidade de classe mundial para produtos digitais." },
            { tag: "FINAL TOUCH", title: "SUCCESS", titleOutline: "ELITE", desc: "Cada detalhe foi meticulosamente planejado para entregar um <strong>ecossistema digital</strong> pronto para liderar o mercado." }
        ];

        const tagEl = document.getElementById('vision-tag-text');
        const titleEl = document.getElementById('hero-title-text');
        const descEl = document.getElementById('hero-desc-text');

        function setHeroSlide(index) {
            heroSlides.forEach(slide => slide.classList.remove('active'));
            heroDots.forEach(dot => dot.classList.remove('active'));
            heroSlides[index].classList.add('active');
            heroDots[index].classList.add('active');
            tagEl.textContent = heroTexts[index].tag;
            titleEl.innerHTML = '<span class="gradient-line">' + heroTexts[index].title + '</span><span class="outline-text">' + heroTexts[index].titleOutline + '</span>';
            descEl.innerHTML = heroTexts[index].desc;
            currentHeroIndex = index;
        }

        function nextHeroSlide() {
            let next = (currentHeroIndex + 1) % heroSlides.length;
            setHeroSlide(next);
        }

        function prevHeroSlide() {
            let prev = (currentHeroIndex - 1 + heroSlides.length) % heroSlides.length;
            setHeroSlide(prev);
        }

        setInterval(() => { nextHeroSlide(); }, 7000);

        document.getElementById('current-year').textContent = new Date().getFullYear();

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

        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.skill-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('revealed');
                            const fill = item.querySelector('.skill-bar-fill');
                            if (fill) { fill.style.width = fill.getAttribute('data-width') + '%'; }
                        }, index * 120);
                    });
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        const skillsGrid = document.querySelector('.skills-grid');
        if (skillsGrid) skillsObserver.observe(skillsGrid);

        const headerObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    headerObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.section-header-sm').forEach((el) => { headerObserver.observe(el); });

        const interestsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const cards = entry.target.querySelectorAll('.interest-card');
                    cards.forEach((card, index) => { setTimeout(() => { card.classList.add('revealed'); }, index * 80); });
                    interestsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const interestsGrid = document.querySelector('.interests-grid');
        if (interestsGrid) interestsObserver.observe(interestsGrid);

        const serviceObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const cards = entry.target.querySelectorAll('.service-card-wrapper');
                    cards.forEach((card, index) => { setTimeout(() => { card.classList.add('revealed'); }, index * 120); });
                    serviceObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const serviceGrid = document.querySelector('.services-grid-static');
        if (serviceGrid) serviceObserver.observe(serviceGrid);

        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const cards = entry.target.querySelectorAll('.project-card');
                    cards.forEach((card, index) => { setTimeout(() => { card.classList.add('revealed'); }, index * 120); });
                    projectObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const projectsGrid = document.querySelector('.projects-grid-6');
        if (projectsGrid) projectObserver.observe(projectsGrid);

        const pillsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const pills = entry.target.querySelectorAll('.pill');
                    pills.forEach((pill, index) => { setTimeout(() => { pill.classList.add('revealed'); }, index * 60); });
                    pillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const pillsCloud = document.querySelector('.pills-cloud');
        if (pillsCloud) pillsObserver.observe(pillsCloud);

        const plansObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const cards = entry.target.querySelectorAll('.plan-card');
                    cards.forEach((card, index) => { setTimeout(() => { card.classList.add('revealed'); }, index * 150); });
                    plansObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const plansGrid = document.querySelector('.plans-grid');
        if (plansGrid) plansObserver.observe(plansGrid);

        const sectionHeaderObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    sectionHeaderObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.projects-header, .plans-header, .footer-heading-area, .services-heading-area, .cv-header').forEach((el) => {
            el.classList.add('fade-reveal');
            sectionHeaderObserver.observe(el);
        });

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
