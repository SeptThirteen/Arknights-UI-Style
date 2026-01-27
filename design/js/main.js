document.addEventListener('DOMContentLoaded', () => {
    console.log('System Online // Zyglitch Protocol Initiated');

    // Smooth scroll for "View Projects" button
    const viewProjectsBtn = document.querySelector('.js-scroll-projects');
    if (viewProjectsBtn) {
        viewProjectsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Smooth scroll for "About/Contact" button
    const viewContactBtn = document.querySelector('.js-scroll-contact');
    if (viewContactBtn) {
        viewContactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Search Input Focus Effect
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('focus', () => {
            searchInput.placeholder = '>> INPUT_ACTIVE // WAITING_FOR_KEYSTROKES...';
        });
        searchInput.addEventListener('blur', () => {
            searchInput.placeholder = '>> 检索 zyglitch 的技术栈 (C/C++, Java)... [SEARCH_QUERY]';
        });
    }

    // Load More Button Interaction
    const loadMoreBtn = document.querySelector('.loader-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const originalText = loadMoreBtn.innerText;
            loadMoreBtn.innerText = 'LOADING...';
            loadMoreBtn.style.opacity = '0.7';
            
            setTimeout(() => {
                loadMoreBtn.innerText = 'NO MORE DATA // END_OF_STREAM';
                loadMoreBtn.style.opacity = '1';
                loadMoreBtn.style.borderColor = 'var(--color-primary)';
                loadMoreBtn.style.color = 'var(--color-primary)';
            }, 1500);
        });
    }
});

    // Sidebar Navigation Logic
    const sidebarItems = document.querySelectorAll('.js-sidebar-nav');
    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
             // Remove active class from all
             sidebarItems.forEach(i => i.classList.remove('active'));
             // Add active to current
             item.classList.add('active');

             const target = item.getAttribute('data-target');
             if (target === 'top') {
                 window.scrollTo({ top: 0, behavior: 'smooth' });
             } else if (target === 'search') {
                 const searchSection = document.querySelector('.search-input');
                 if (searchSection) {
                     searchSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                     searchSection.focus();
                 }
             } else {
                 const section = document.getElementById(target);
                 if (section) {
                     section.scrollIntoView({ behavior: 'smooth' });
                 }
             }
        });
    });


    // Theme Toggle Logic
    const themeBtn = document.querySelector('.js-theme-toggle');
    const root = document.documentElement;
    const iconMoon = document.querySelector('.icon-moon');
    const iconSun = document.querySelector('.icon-sun');

    // Check system preference
    const systemPref = window.matchMedia('(prefers-color-scheme: light)');
    
    // Function to set theme
    const setTheme = (theme) => {
        root.setAttribute('data-theme', theme);
        if (theme === 'light') {
            iconMoon.style.display = 'none';
            iconSun.style.display = 'block';
        } else {
            iconMoon.style.display = 'block';
            iconSun.style.display = 'none';
        }
    };

    // Initialize based on system logic
    if (systemPref.matches) {
        setTheme('light');
    } else {
        setTheme('dark');
    }

    // Toggle Click Event with Circular Ripple
    themeBtn.addEventListener('click', (event) => {
        const currentTheme = root.getAttribute('data-theme');
        const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

        // Feature detection for View Transitions API
        if (!document.startViewTransition) {
            setTheme(nextTheme);
            return;
        }

        const x = event.clientX;
        const y = event.clientY;

        // Calculate distance to furthest corner
        const endRadius = Math.hypot(
            Math.max(x, innerWidth - x),
            Math.max(y, innerHeight - y)
        );

        const transition = document.startViewTransition(() => {
            setTheme(nextTheme);
        });

        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
            ];
            
            // Animate the new view expanding
            document.documentElement.animate(
                {
                    clipPath: clipPath,
                },
                {
                    duration: 500,
                    easing: 'ease-in',
                    pseudoElement: '::view-transition-new(root)',
                }
            );
        });
    });


    // Intersection Observer for Entrance Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

