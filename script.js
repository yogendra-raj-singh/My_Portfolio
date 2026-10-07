document.addEventListener('DOMContentLoaded', () => {
    const cursorFollower = document.querySelector('.cursor-follower');

    if (window.innerWidth > 768 && cursorFollower) {
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;

        const animateCursor = () => {
            currentX += (mouseX - currentX) * 0.18;
            currentY += (mouseY - currentY) * 0.18;
            cursorFollower.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
            requestAnimationFrame(animateCursor);
        };

        window.addEventListener('pointermove', (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
            cursorFollower.classList.add('visible');
        });

        window.addEventListener('pointerdown', () => {
            cursorFollower.classList.add('cursor-active');
        });

        window.addEventListener('pointerup', () => {
            cursorFollower.classList.remove('cursor-active');
        });

        window.addEventListener('pointerleave', () => {
            cursorFollower.classList.remove('visible');
        });

        document.querySelectorAll('a, button, .skill-pill, .project-card, .btn-primary, .form-input').forEach((element) => {
            element.addEventListener('mouseenter', () => cursorFollower.classList.add('cursor-active'));
            element.addEventListener('mouseleave', () => cursorFollower.classList.remove('cursor-active'));
        });

        animateCursor();
    }

    const animatedElements = document.querySelectorAll('.fade-up, .fade-in');
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const navObserverOptions = {
        root: null,
        threshold: 0,
        rootMargin: '-20% 0px -70% 0px'
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSection = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                const activeLink = document.querySelector(`.nav-link[data-section="${currentSection}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, navObserverOptions);

    sections.forEach(section => navObserver.observe(section));

    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const menuLines = document.querySelectorAll('.menu-line');
    let menuOpen = false;

    menuToggle.addEventListener('click', () => {
        menuOpen = !menuOpen;

        if (menuOpen) {
            mobileMenu.classList.add('open');
            menuLines[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
            menuLines[1].style.opacity = '0';
            menuLines[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
            document.body.style.overflow = 'hidden';
        } else {
            closeMobileMenu();
        }
    });

    function closeMobileMenu() {
        menuOpen = false;
        mobileMenu.classList.remove('open');
        menuLines[0].style.transform = 'none';
        menuLines[1].style.opacity = '1';
        menuLines[2].style.transform = 'none';
        document.body.style.overflow = '';
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.9)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.borderBottom = '1px solid #1f1f1f';
        } else {
            navbar.style.backgroundColor = 'transparent';
            navbar.style.backdropFilter = 'none';
            navbar.style.borderBottom = 'none';
        }

        lastScroll = currentScroll;
    });

    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        console.log('Form submitted:', data);

        contactForm.style.display = 'none';
        formSuccess.classList.remove('hidden');

        setTimeout(() => {
            contactForm.reset();
        }, 500);

        setTimeout(() => {
            formSuccess.classList.add('hidden');
            contactForm.style.display = '';
        }, 5000);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOpen) {
            closeMobileMenu();
        }
    });

    window.addEventListener('load', () => {
        document.querySelectorAll('#home .fade-up, #home .fade-in').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, 100 + (index * 150));
        });
    });
});
