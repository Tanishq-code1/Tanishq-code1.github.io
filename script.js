
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    // EmailJS configuration (replace with your own)
    const EMAILJS_SERVICE_ID = 'service_yx5in41';
    const EMAILJS_TEMPLATE_ID = 'template_gu23i3u';
    const EMAILJS_USER_ID = '6pZRifn23ZnFy1di0';

    // Initialize EmailJS
    emailjs.init(EMAILJS_USER_ID);

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('expanded');
            } else {
                entry.target.classList.remove('expanded');
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.about-section .scroll-reveal');
    scrollElements.forEach(el => observer.observe(el));

    const typingText = document.getElementById('typing-text');
    const words = ["AI ENGINEER", "BACKEND DEVELOPER", "LLM ARCHITECT", "SYSTEMS BUILDER", "CODER"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 100;
    const deleteSpeed = 60;
    const wordPause = 1500;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? deleteSpeed : typeSpeed;

        if (!isDeleting && charIndex === currentWord.length) {
            speed = wordPause;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 500;
        }

        setTimeout(type, speed);
    }

    if (typingText) {
        // Wait for preloader to finish before starting the hero animation
        if (document.getElementById('preloader')) {
            window.addEventListener('preloaderComplete', type, { once: true });
        } else {
            type();
        }
    }

    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    window.addEventListener('mousemove', function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    const interactables = document.querySelectorAll('a, button, .floating-icon');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovered'));
    });

    const timelineSections = document.querySelectorAll('.timeline');

    timelineSections.forEach(timelineSection => {
        const timelineProgress = timelineSection.querySelector('.timeline-progress');
        const timelineDots = timelineSection.querySelectorAll('.timeline-dot');

        if (timelineProgress) {
            window.addEventListener('scroll', () => {
                const sectionRect = timelineSection.getBoundingClientRect();
                const sectionTop = sectionRect.top;
                const sectionHeight = sectionRect.height;
                const windowHeight = window.innerHeight;

                const startOffset = windowHeight / 2;
                let scrollDistance = startOffset - sectionTop;

                let progressPercentage = (scrollDistance / sectionHeight) * 100;
                progressPercentage = Math.max(0, Math.min(100, progressPercentage));

                timelineProgress.style.height = `${progressPercentage}%`;

                timelineDots.forEach(dot => {
                    const dotRect = dot.getBoundingClientRect();
                    const dotTop = dotRect.top;
                    const lineBottom = timelineProgress.getBoundingClientRect().bottom;

                    if (lineBottom > dotTop) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            });
        }
    });

    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', () => {
            if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
                backToTopBtn.classList.add('bounce');
            } else {
                backToTopBtn.classList.remove('bounce');
            }
        });
    }

    const aboutCard = document.querySelector('.glass-card');
    if (aboutCard) {
        aboutCard.addEventListener('mousemove', (e) => {

            if (!aboutCard.classList.contains('expanded')) return;

            const rect = aboutCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            const title = aboutCard.querySelector('h2');
            const para = aboutCard.querySelector('p');

            if (title) title.style.transform = `translateZ(40px)`;
            if (para) para.style.transform = `translateZ(20px)`;

            aboutCard.style.transition = 'transform 0.1s ease-out';
            aboutCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        aboutCard.addEventListener('mouseleave', () => {
            if (!aboutCard.classList.contains('expanded')) return;

            aboutCard.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            aboutCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';

            const title = aboutCard.querySelector('h2');
            const para = aboutCard.querySelector('p');
            if (title) title.style.transform = 'translateZ(0)';
            if (para) para.style.transform = 'translateZ(0)';

            setTimeout(() => {
                aboutCard.style.transition = '';
            }, 600);
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
            btn.style.opacity = '0.7';
            btn.style.pointerEvents = 'none';

            // Send email using EmailJS
            emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
                .then(() => {
                    showSuccess(btn, contactForm, originalText);
                })
                .catch((error) => {
                    showError(btn, contactForm, originalText, 'Failed to send message via EmailJS');
                });
        });
    }

    function showSuccess(btn, form, originalText) {
        btn.innerHTML = '<span>Message Delivered!</span> <i class="fa-solid fa-check"></i>';
        btn.style.background = 'linear-gradient(90deg, #22c55e, #16a34a, #22c55e)';
        btn.style.borderColor = '#4ade80';
        form.reset();
        if (window.soundSystem) window.soundSystem.playSuccess();
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.borderColor = '';
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'all';
        }, 3000);
    }

    function showError(btn, form, originalText, message) {
        if (message === undefined) message = 'Failed to send message';
        btn.innerHTML = '<span>' + message + '</span> <i class="fa-solid fa-xmark"></i>';
        btn.style.background = 'linear-gradient(90deg, #ef4444, #dc2626, #ef4444)';
        btn.style.borderColor = '#f87171';
        form.reset();
        if (window.soundSystem) window.soundSystem.playError();
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.borderColor = '';
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'all';
        }, 3000);
    }




    // ── Interactive Skill Filtering ──
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card[data-category]');
    let isFiltering = false;

    if (filterBtns.length && skillCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (isFiltering) return;
                isFiltering = true;

                // Play click sound
                if (window.soundSystem) window.soundSystem.playClick();

                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;

                // 1. Sequentially hide all currently visible cards
                const visibleCards = Array.from(skillCards).filter(card => !card.classList.contains('d-none'));

                visibleCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('filter-hide');
                    }, index * 30); // staggered fade out
                });

                // Wait for hide sequence to finish plus a little padding
                const hideDuration = visibleCards.length * 30 + 300;

                setTimeout(() => {
                    // 2. Change layout (display:none vs display:flex) while invisible
                    let cardsToShow = [];
                    skillCards.forEach(card => {
                        const category = card.dataset.category;
                        const shouldShow = filter === 'all' || category === filter;

                        // Force transition off for instant layout update
                        card.style.transition = 'none';

                        if (shouldShow) {
                            card.classList.remove('d-none');
                            card.classList.add('filter-hide'); // stay invisible
                            cardsToShow.push(card);
                        } else {
                            card.classList.add('d-none');
                        }
                    });

                    // Force reflow
                    skillCards.forEach(card => void card.offsetWidth);

                    // Restore transitions
                    skillCards.forEach(card => card.style.transition = '');

                    // Recalculate ScrollTrigger positions & Lenis bounds when layout changes
                    if (window.ScrollTrigger) ScrollTrigger.refresh();
                    if (window.lenis) window.lenis.resize();

                    // 3. Sequentially show new cards
                    cardsToShow.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.remove('filter-hide');
                        }, index * 60); // slightly slower staggered fade in
                    });

                    // 4. Release filtering lock
                    const showDuration = cardsToShow.length * 60 + 400;
                    setTimeout(() => {
                        isFiltering = false;
                        if (window.ScrollTrigger) ScrollTrigger.refresh();
                        if (window.lenis) window.lenis.resize();
                    }, showDuration);

                }, hideDuration);
            });
        });
    }

});

// ══════════════════════════════════════════
//  PRELOADER
// ══════════════════════════════════════════
(function () {
    const preloader = document.getElementById('preloader');
    const sleekFill = document.getElementById('preloaderSleekFill');
    const particlesContainer = document.getElementById('preloaderParticles');
    if (!preloader) return;

    const DURATION = 3500;         // Total animation duration in ms
    const startTime = performance.now();
    let pageLoaded = false;
    let animationDone = false;

    // ── Spawn floating particles ──
    if (particlesContainer) {
        for (let i = 0; i < 100; i++) {
            const p = document.createElement('div');
            p.classList.add('preloader-particle');
            p.style.left = Math.random() * 100 + '%';
            p.style.bottom = -(Math.random() * 20) + '%';

            // Sync with the ~3.5s DURATION. Duration between 2s and 4s, delay up to 1.5s
            p.style.animationDuration = (2 + Math.random() * 2) + 's';
            p.style.animationDelay = (Math.random() * 1.5) + 's';
            p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
            particlesContainer.appendChild(p);
        }
    }

    // ── Smooth linear animation via requestAnimationFrame ──
    function animate(now) {
        const elapsed = now - startTime;
        // Ease-out cubic for a natural deceleration feel
        let t = Math.min(elapsed / DURATION, 1);
        let easedT = 1 - Math.pow(1 - t, 3);

        // If page has loaded and we're past 80%, accelerate to finish
        if (pageLoaded && easedT >= 0.8) {
            easedT = Math.min(easedT + (1 - easedT) * 0.1, 1);
        }

        // Update loading bar
        if (sleekFill) {
            sleekFill.style.width = (easedT * 100) + '%';
        }

        if (easedT < 1) {
            requestAnimationFrame(animate);
        } else {
            // Reached 100%
            if (sleekFill) sleekFill.style.width = '100%';
            animationDone = true;
            tryDismiss();
        }
    }

    requestAnimationFrame(animate);

    // ── Dismiss only when BOTH animation is done AND page is loaded ──
    function tryDismiss() {
        if (!animationDone || !pageLoaded) return;

        setTimeout(() => {
            preloader.classList.add('loaded');
            setTimeout(() => {
                preloader.remove();
                // Dispatch event to tell landing page to start animating
                document.body.classList.add('page-loaded');
                window.dispatchEvent(new Event('preloaderComplete'));
            }, 1000);
        }, 500);
    }

    window.addEventListener('load', () => {
        pageLoaded = true;
        tryDismiss();
    });
})();

// ══════════════════════════════════════════
//  SCROLL PROGRESS BAR
// ══════════════════════════════════════════
(function () {
    const progressBar = document.getElementById('scrollProgressBar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = scrollPercent + '%';
    }, { passive: true });
})();

// ══════════════════════════════════════════
//  FLOATING NAVBAR — Active Section Tracking
// ══════════════════════════════════════════
(function () {
    const nav = document.getElementById('siteNav');
    const indicator = document.getElementById('navIndicator');
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    if (!nav || !indicator || !navLinks.length) return;

    const sectionIds = Array.from(navLinks).map(link => link.dataset.section);
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    let currentActive = 'home';
    let navShown = false;

    // ── Position the sliding indicator ──
    function updateIndicator(activeLink) {
        if (!activeLink) return;
        const pill = nav.querySelector('.nav-pill');
        if (!pill) return;

        const pillRect = pill.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();

        const left = linkRect.left - pillRect.left;
        const width = linkRect.width;

        indicator.style.left = left + 'px';
        indicator.style.width = width + 'px';
    }

    // ── Set active link ──
    function setActive(sectionId) {
        if (sectionId === currentActive) return;
        currentActive = sectionId;

        navLinks.forEach(link => {
            if (link.dataset.section === sectionId) {
                link.classList.add('active');
                updateIndicator(link);
            } else {
                link.classList.remove('active');
            }
        });
    }

    // ── IntersectionObserver for section tracking ──
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActive(entry.target.id);
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // ── Show/hide navbar based on scroll position ──
    const heroSection = document.getElementById('home');
    let heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;

    function checkNavVisibility() {
        const scrollY = window.scrollY;

        if (scrollY > heroHeight * 0.5 && !navShown) {
            nav.classList.add('nav-visible');
            navShown = true;
            // Initial indicator position
            requestAnimationFrame(() => {
                const activeLink = nav.querySelector('.nav-link.active');
                updateIndicator(activeLink);
            });
        } else if (scrollY <= heroHeight * 0.3 && navShown) {
            nav.classList.remove('nav-visible');
            navShown = false;
        }
    }

    window.addEventListener('scroll', checkNavVisibility, { passive: true });

    // ── Update indicator on resize ──
    window.addEventListener('resize', () => {
        heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;
        const activeLink = nav.querySelector('.nav-link.active');
        updateIndicator(activeLink);
    });

    // ── Smooth scroll on nav link click ──
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.dataset.section;
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Initial check
    checkNavVisibility();
})();


// ==========================================
//  IN-PAGE RESUME PDF VIEWER (PDF.JS POWERED)
// ==========================================
(function () {
    const resumeModal = document.getElementById('resumeModal');
    const openResumeBtn = document.getElementById('openResumeBtn');
    const closeResumeModalBtn = document.getElementById('closeResumeModalBtn');
    const resumeCanvasWrapper = document.getElementById('resumeCanvasWrapper');
    const resumeCanvasContainer = document.getElementById('resumeCanvasContainer');
    const resumeLoadingSpinner = document.getElementById('resumeLoadingSpinner');
    const resumeIframeFallback = document.getElementById('resumeIframeFallback');
    const resumeZoomIn = document.getElementById('resumeZoomIn');
    const resumeZoomOut = document.getElementById('resumeZoomOut');
    const resumeZoomFit = document.getElementById('resumeZoomFit');
    const resumeZoomLevel = document.getElementById('resumeZoomLevel');

    let pdfDoc = null;
    let pdfScale = 1.0;
    let isRendering = false;
    let pendingScale = null;
    const pdfUrl = 'portfolio_assets/Tanishq_Resume.pdf';

    function calculateFitScale(firstPage) {
        if (!resumeCanvasWrapper || !firstPage) return 1.0;
        const containerWidth = resumeCanvasWrapper.clientWidth - (window.innerWidth < 768 ? 16 : 48);
        const unscaledViewport = firstPage.getViewport({ scale: 1.0 });
        const scale = containerWidth / unscaledViewport.width;
        return Math.max(0.45, Math.min(scale, 1.6));
    }

    function applyZoom(newScale) {
        if (!pdfDoc) return;
        const clamped = Math.min(Math.max(Number(newScale.toFixed(2)), 0.45), 2.75);
        pdfScale = clamped;
        if (isRendering) {
            pendingScale = clamped;
            return;
        }
        renderPdfPages();
    }

    function fitResume() {
        if (!pdfDoc || !resumeCanvasWrapper) return;
        pdfDoc.getPage(1).then(page => {
            const fitScale = calculateFitScale(page);
            applyZoom(fitScale);
        });
    }

    function renderPdfPages() {
        if (!pdfDoc || !resumeCanvasContainer) return;
        isRendering = true;

        let prevScrollRatio = 0;
        if (resumeCanvasWrapper && resumeCanvasWrapper.scrollHeight > 0) {
            prevScrollRatio = resumeCanvasWrapper.scrollTop / resumeCanvasWrapper.scrollHeight;
        }

        resumeCanvasContainer.innerHTML = '';

        if (resumeZoomLevel) {
            resumeZoomLevel.textContent = Math.round(pdfScale * 100) + '%';
        }

        const numPages = pdfDoc.numPages;
        const renderPromises = [];

        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            (function (pNum) {
                const pPromise = pdfDoc.getPage(pNum).then(page => {
                    const viewport = page.getViewport({ scale: pdfScale });
                    const outputScale = Math.min(window.devicePixelRatio || 1, 2);

                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');

                    canvas.width = Math.floor(viewport.width * outputScale);
                    canvas.height = Math.floor(viewport.height * outputScale);
                    canvas.style.width = Math.floor(viewport.width) + 'px';
                    canvas.style.height = Math.floor(viewport.height) + 'px';
                    canvas.setAttribute('role', 'img');
                    canvas.setAttribute('aria-label', 'Resume Document Page ' + pNum);

                    const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

                    const renderContext = {
                        canvasContext: context,
                        transform: transform,
                        viewport: viewport
                    };

                    const pageWrapper = document.createElement('div');
                    pageWrapper.className = 'resume-page-wrapper';
                    pageWrapper.style.position = 'relative';
                    pageWrapper.style.width = Math.floor(viewport.width) + 'px';
                    pageWrapper.style.height = Math.floor(viewport.height) + 'px';

                    pageWrapper.appendChild(canvas);

                    // Render interactive link annotations overlay
                    if (typeof page.getAnnotations === 'function') {
                        page.getAnnotations({ intent: 'display' }).then(annotations => {
                            if (!annotations || !annotations.length) return;
                            const annotLayer = document.createElement('div');
                            annotLayer.className = 'resume-annotation-layer';

                            annotations.forEach(annot => {
                                if (annot.subtype === 'Link' && (annot.url || annot.unsafeUrl)) {
                                    const linkUrl = annot.url || annot.unsafeUrl;
                                    const rect = viewport.convertToViewportRectangle(annot.rect);
                                    const left = Math.min(rect[0], rect[2]);
                                    const top = Math.min(rect[1], rect[3]);
                                    const width = Math.abs(rect[2] - rect[0]);
                                    const height = Math.abs(rect[3] - rect[1]);

                                    const linkElem = document.createElement('a');
                                    linkElem.href = linkUrl;
                                    linkElem.target = '_blank';
                                    linkElem.rel = 'noopener noreferrer';
                                    linkElem.title = linkUrl;
                                    linkElem.className = 'resume-annot-link';
                                    linkElem.style.left = left + 'px';
                                    linkElem.style.top = top + 'px';
                                    linkElem.style.width = width + 'px';
                                    linkElem.style.height = height + 'px';

                                    annotLayer.appendChild(linkElem);
                                }
                            });

                            pageWrapper.appendChild(annotLayer);
                        }).catch(() => {});
                    }

                    resumeCanvasContainer.appendChild(pageWrapper);
                    return page.render(renderContext).promise;
                });
                renderPromises.push(pPromise);
            })(pageNum);
        }

        Promise.all(renderPromises).then(() => {
            isRendering = false;
            if (resumeLoadingSpinner && resumeLoadingSpinner.parentNode) {
                resumeLoadingSpinner.parentNode.removeChild(resumeLoadingSpinner);
            }
            if (resumeCanvasWrapper && prevScrollRatio > 0) {
                resumeCanvasWrapper.scrollTop = Math.round(prevScrollRatio * resumeCanvasWrapper.scrollHeight);
            }
            if (pendingScale !== null) {
                const nextScale = pendingScale;
                pendingScale = null;
                applyZoom(nextScale);
            }
        }).catch(err => {
            console.warn('PDF.js render warning:', err);
            isRendering = false;
            pendingScale = null;
        });
    }

    function loadAndRenderPdf(forceReFit) {
        if (!window.pdfjsLib) {
            if (resumeIframeFallback) resumeIframeFallback.style.display = 'block';
            if (resumeCanvasWrapper) resumeCanvasWrapper.style.display = 'none';
            return;
        }

        if (!window.pdfjsLib.GlobalWorkerOptions.workerSrc) {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }

        if (pdfDoc) {
            if (forceReFit) {
                pdfDoc.getPage(1).then(page => {
                    pdfScale = calculateFitScale(page);
                    renderPdfPages();
                });
            } else {
                renderPdfPages();
            }
            return;
        }

        window.pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
            pdfDoc = pdf;
            return pdf.getPage(1);
        }).then(firstPage => {
            pdfScale = calculateFitScale(firstPage);
            renderPdfPages();
        }).catch(err => {
            console.error('PDF.js loading failed, using iframe fallback:', err);
            if (resumeIframeFallback) resumeIframeFallback.style.display = 'block';
            if (resumeCanvasWrapper) resumeCanvasWrapper.style.display = 'none';
        });
    }

    function openResumeModal() {
        if (!resumeModal) return;
        resumeModal.classList.add('open');
        resumeModal.setAttribute('aria-hidden', 'false');
        document.documentElement.classList.add('modal-open');
        document.body.classList.add('modal-open');
        document.body.style.overflow = 'hidden';

        const cursorDot = document.querySelector('[data-cursor-dot], .cursor-dot');
        const cursorOutline = document.querySelector('[data-cursor-outline], .cursor-outline');
        if (cursorDot) cursorDot.style.display = 'none';
        if (cursorOutline) cursorOutline.style.display = 'none';

        if (window.lenis) {
            window.lenis.stop();
        }

        if (resumeCanvasWrapper) {
            resumeCanvasWrapper.scrollTop = 0;
            resumeCanvasWrapper.scrollLeft = 0;
        }

        setTimeout(() => {
            loadAndRenderPdf(true);
            if (resumeCanvasWrapper) {
                resumeCanvasWrapper.focus();
            }
        }, 60);
    }

    function closeResumeModal() {
        if (!resumeModal) return;
        resumeModal.classList.remove('open');
        resumeModal.setAttribute('aria-hidden', 'true');
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';

        const cursorDot = document.querySelector('[data-cursor-dot], .cursor-dot');
        const cursorOutline = document.querySelector('[data-cursor-outline], .cursor-outline');
        if (cursorDot) cursorDot.style.display = '';
        if (cursorOutline) cursorOutline.style.display = '';

        if (window.lenis) {
            window.lenis.start();
        }
    }

    if (openResumeBtn) {
        openResumeBtn.addEventListener('click', function (e) {
            e.preventDefault();
            openResumeModal();
        });
    }

    if (closeResumeModalBtn) {
        closeResumeModalBtn.addEventListener('click', closeResumeModal);
    }

    if (resumeZoomIn) {
        resumeZoomIn.addEventListener('click', () => applyZoom(pdfScale + 0.25));
    }

    if (resumeZoomOut) {
        resumeZoomOut.addEventListener('click', () => applyZoom(pdfScale - 0.25));
    }

    if (resumeZoomFit) {
        resumeZoomFit.addEventListener('click', fitResume);
    }

    window.addEventListener('resize', () => {
        if (resumeModal && resumeModal.classList.contains('open') && pdfDoc && !isRendering) {
            pdfDoc.getPage(1).then(page => {
                pdfScale = calculateFitScale(page);
                renderPdfPages();
            });
        }
    }, { passive: true });

    if (resumeModal) {
        resumeModal.addEventListener('click', function (e) {
            if (e.target === resumeModal) closeResumeModal();
        });

        resumeModal.addEventListener('wheel', function (e) {
            e.stopPropagation();
            if (resumeCanvasWrapper && !resumeCanvasWrapper.contains(e.target)) {
                e.preventDefault();
                resumeCanvasWrapper.scrollTop += e.deltaY;
                resumeCanvasWrapper.scrollLeft += e.deltaX;
            }
        }, { passive: false });
    }

    if (resumeCanvasWrapper) {
        resumeCanvasWrapper.addEventListener('wheel', function (e) {
            if (e.ctrlKey) {
                e.preventDefault();
                e.stopPropagation();
                const delta = e.deltaY < 0 ? 0.15 : -0.15;
                applyZoom(pdfScale + delta);
                return;
            }

            e.stopPropagation();
            const maxScrollTop = resumeCanvasWrapper.scrollHeight - resumeCanvasWrapper.clientHeight;
            const atTop = resumeCanvasWrapper.scrollTop <= 0 && e.deltaY < 0;
            const atBottom = resumeCanvasWrapper.scrollTop >= maxScrollTop - 1 && e.deltaY > 0;
            if (atTop || atBottom) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    // Drag-to-pan across zoomed document
    let isPanning = false;
    let panStartX = 0;
    let panStartY = 0;
    let panScrollLeft = 0;
    let panScrollTop = 0;

    if (resumeCanvasWrapper) {
        resumeCanvasWrapper.addEventListener('mousedown', function (e) {
            if (e.button !== 0 || e.target.closest('button, a')) return;
            isPanning = true;
            resumeCanvasWrapper.classList.add('is-panning');
            panStartX = e.pageX - resumeCanvasWrapper.offsetLeft;
            panStartY = e.pageY - resumeCanvasWrapper.offsetTop;
            panScrollLeft = resumeCanvasWrapper.scrollLeft;
            panScrollTop = resumeCanvasWrapper.scrollTop;
        });

        window.addEventListener('mousemove', function (e) {
            if (!isPanning || !resumeCanvasWrapper) return;
            e.preventDefault();
            const x = e.pageX - resumeCanvasWrapper.offsetLeft;
            const y = e.pageY - resumeCanvasWrapper.offsetTop;
            resumeCanvasWrapper.scrollLeft = panScrollLeft - (x - panStartX);
            resumeCanvasWrapper.scrollTop = panScrollTop - (y - panStartY);
        });

        window.addEventListener('mouseup', function () {
            if (isPanning && resumeCanvasWrapper) {
                isPanning = false;
                resumeCanvasWrapper.classList.remove('is-panning');
            }
        });
    }

    // Touch pinch-to-zoom
    let touchPinchDist = null;
    let touchPinchStartScale = 1.0;

    function getTouchDistance(touches) {
        if (!touches || touches.length < 2) return 0;
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    if (resumeCanvasWrapper) {
        resumeCanvasWrapper.addEventListener('touchstart', function (e) {
            if (e.touches.length === 2) {
                touchPinchDist = getTouchDistance(e.touches);
                touchPinchStartScale = pdfScale;
            }
        }, { passive: true });

        resumeCanvasWrapper.addEventListener('touchmove', function (e) {
            if (e.touches.length === 2 && touchPinchDist) {
                const currentDist = getTouchDistance(e.touches);
                if (currentDist > 0) {
                    e.preventDefault();
                    const ratio = currentDist / touchPinchDist;
                    applyZoom(touchPinchStartScale * ratio);
                }
            }
        }, { passive: false });

        resumeCanvasWrapper.addEventListener('touchend', function (e) {
            if (e.touches.length < 2) {
                touchPinchDist = null;
            }
        }, { passive: true });
    }

    window.addEventListener('keydown', function (e) {
        if (resumeModal && resumeModal.classList.contains('open')) {
            if (e.key === 'Escape') {
                closeResumeModal();
            } else if (e.key === '+' || e.key === '=') {
                e.preventDefault();
                applyZoom(pdfScale + 0.25);
            } else if (e.key === '-' || e.key === '_') {
                e.preventDefault();
                applyZoom(pdfScale - 0.25);
            } else if (e.key === '0' || e.key.toLowerCase() === 'f') {
                e.preventDefault();
                fitResume();
            } else if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].indexOf(e.key) !== -1) {
                if (resumeCanvasWrapper) {
                    const step = (e.key === 'PageDown' || e.key === ' ') ? resumeCanvasWrapper.clientHeight * 0.8 :
                               (e.key === 'PageUp') ? -resumeCanvasWrapper.clientHeight * 0.8 :
                               (e.key === 'ArrowDown') ? 60 :
                               (e.key === 'ArrowUp') ? -60 :
                               (e.key === 'Home') ? -resumeCanvasWrapper.scrollHeight :
                               (e.key === 'End') ? resumeCanvasWrapper.scrollHeight : 0;
                    if (step !== 0) {
                        e.preventDefault();
                        e.stopPropagation();
                        resumeCanvasWrapper.scrollTop += step;
                    }
                }
            }
        }
    });

    window.openResumeModal = openResumeModal;
})();

// ==========================================
//  LENIS SMOOTH INERTIA SCROLLING (GSAP SYNC)
// ==========================================
(function () {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

    if (typeof window.Lenis === 'function' && !prefersReducedMotion && !isTouch) {
        try {
            const lenis = new window.Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                direction: 'vertical',
                gestureDirection: 'vertical',
                smooth: true,
                smoothTouch: false,
                touchMultiplier: 1.5,
            });

            if (window.ScrollTrigger) {
                lenis.on('scroll', ScrollTrigger.update);
                gsap.ticker.add((time) => {
                    lenis.raf(time * 1000);
                });
                gsap.ticker.lagSmoothing(0);
            } else {
                function raf(time) {
                    lenis.raf(time);
                    requestAnimationFrame(raf);
                }
                requestAnimationFrame(raf);
            }

            window.lenis = lenis;

            // Hook navbar links to Lenis scrollTo
            const navLinks = document.querySelectorAll('.nav-link[data-section]');
            navLinks.forEach((link) => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.dataset.section;
                    const target = document.getElementById(targetId);
                    if (target && window.lenis) {
                        window.lenis.scrollTo(target, { offset: -20, duration: 1.2 });
                    }
                });
            });

            // Hook Back to Top button
            const backToTopBtn = document.getElementById('backToTop');
            if (backToTopBtn) {
                backToTopBtn.addEventListener('click', (e) => {
                    if (window.lenis) {
                        e.preventDefault();
                        window.lenis.scrollTo(0, { duration: 1.4 });
                    }
                });
            }
        } catch (err) {
            console.warn('Lenis initialization skipped:', err);
        }
    }
})();

// ==========================================
//  RESUME DOWNLOAD CONFETTI CELEBRATION
// ==========================================
(function () {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const downloadBtns = [
        document.getElementById('resumeModalDownloadBtn'),
        document.querySelector('.resume-modal-download-btn')
    ].filter(Boolean);

    function triggerConfetti() {
        if (typeof confetti === 'function' && !prefersReducedMotion) {
            confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.75 },
                colors: ['#36C9B4', '#168F80', '#145B54', '#DCE5E7', '#ffffff'],
                disableForReducedMotion: true
            });
        }
    }

    downloadBtns.forEach((btn) => {
        btn.addEventListener('click', triggerConfetti);
    });

    window.triggerResumeConfetti = triggerConfetti;
})();

// ==========================================
//  ONE-CLICK COPY EMAIL WITH TOAST FEEDBACK
// ==========================================
(function () {
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const emailText = document.getElementById('emailText');
    const copyIcon = document.getElementById('copyIcon');
    const toast = document.getElementById('portfolioToast');
    const toastMsg = document.getElementById('toastMessage');
    let toastTimeout = null;

    function showToast(message) {
        if (!toast) return;
        if (toastMsg) toastMsg.textContent = message || 'Copied to clipboard!';
        toast.classList.add('show');

        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 2600);
    }

    function copyEmailToClipboard() {
        const email = (emailText && emailText.textContent) ? emailText.textContent.trim() : 'tanishqkale007@gmail.com';

        function onSuccess() {
            if (copyEmailBtn) copyEmailBtn.classList.add('copied');
            if (copyIcon) {
                copyIcon.className = 'fa-solid fa-check copy-icon';
            }
            showToast('Email address copied to clipboard!');

            setTimeout(() => {
                if (copyEmailBtn) copyEmailBtn.classList.remove('copied');
                if (copyIcon) {
                    copyIcon.className = 'fa-regular fa-copy copy-icon';
                }
            }, 2200);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(email).then(onSuccess).catch(() => {
                fallbackCopy(email, onSuccess);
            });
        } else {
            fallbackCopy(email, onSuccess);
        }
    }

    function fallbackCopy(text, callback) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            if (callback) callback();
        } catch (err) {
            console.error('Fallback copy failed:', err);
        }
        document.body.removeChild(textArea);
    }

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', (e) => {
            e.preventDefault();
            copyEmailToClipboard();
        });
    }

    window.showPortfolioToast = showToast;
})();

// ==========================================
//  DYNAMIC BROWSER TAB TITLE ON BLUR
// ==========================================
(function () {
    const originalTitle = document.title;
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            document.title = "Come back to Tanishq's Portfolio! 👋";
        } else {
            document.title = originalTitle;
        }
    });
})();
