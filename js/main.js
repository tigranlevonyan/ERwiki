
document.addEventListener('DOMContentLoaded', function() {

    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    
    const header = document.querySelector('.header .container');
    header.prepend(mobileMenuBtn);
    
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('show');
    });

    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('show');
        });
    });
    

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    

    const searchForms = document.querySelectorAll('form[action="search.html"]');
    searchForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const searchInput = this.querySelector('input[type="text"]');
            if (searchInput.value.trim() === '') {
                e.preventDefault();
                searchInput.focus();
            }
        });
    });

    if (window.location.pathname.includes('characters.html')) {
        setTimeout(() => {
            const loading = document.createElement('div');
            loading.className = 'loading';
            loading.textContent = 'Загрузка данных...';
            document.querySelector('.characters-list').appendChild(loading);
 
            setTimeout(() => {
                loading.remove();
            }, 1500);
        }, 500);
    }
});

if (document.querySelector('.character-stats')) {
    tippy('.stat', {
        content: 'Рейтинг основан на данных использования персонажа',
        placement: 'top',
        theme: 'light'
    });
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('characters.html')) {
        document.body.classList.add('characters-page');
    }
});