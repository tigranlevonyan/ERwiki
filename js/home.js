document.addEventListener('DOMContentLoaded', function() {

    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            this.classList.add('active');

            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    gsap.from('.hero-content', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.3
    });
    
    gsap.from('.update-card', {
        opacity: 0,
        y: 50,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.8,
        scrollTrigger: {
            trigger: '.updates-section',
            start: 'top 80%'
        }
    });
    
    gsap.from('.section-card', {
        opacity: 0,
        y: 50,
        duration: 0.5,
        stagger: 0.1,
        delay: 1,
        scrollTrigger: {
            trigger: '.main-sections',
            start: 'top 80%'
        }
    });

    const hero = document.querySelector('.hero-banner');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }
});