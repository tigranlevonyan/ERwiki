document.addEventListener('DOMContentLoaded', function() {

    const filterForm = document.getElementById('characters-filter');
    const characterCards = document.querySelectorAll('.character-card');
    const sortSelect = document.getElementById('sort-characters');
    
    if (filterForm) {
        filterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            applyFilters();
        });
        
        filterForm.addEventListener('reset', function() {
            setTimeout(applyFilters, 0);
        });
    }
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            applyFilters();
        });
    }
    
    function applyFilters() {
        const version = document.getElementById('game-version').value;
        const charClass = document.getElementById('character-class').value;
        const faction = document.getElementById('faction').value;
        const searchQuery = document.getElementById('character-search').value.toLowerCase();
        const sortMethod = sortSelect.value;
        
        let visibleCount = 0;
        
        characterCards.forEach(card => {
            const cardVersion = card.getAttribute('data-version');
            const cardClass = card.getAttribute('data-class');
            const cardFaction = card.getAttribute('data-faction');
            const cardName = card.querySelector('h2').textContent.toLowerCase();
            
            const versionMatch = version === 'all' || cardVersion === version;
            const classMatch = charClass === 'all' || cardClass === charClass;
            const factionMatch = faction === 'all' || cardFaction === faction;
            const searchMatch = cardName.includes(searchQuery) || 
                              card.querySelector('.character-desc').textContent.toLowerCase().includes(searchQuery);
            if (versionMatch && classMatch && factionMatch && searchMatch) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        sortCharacters(sortMethod);
        updateStats(visibleCount);
    }
    function sortCharacters(method) {
        const container = document.querySelector('.characters-grid');
        const cards = Array.from(document.querySelectorAll('.character-card'));
        cards.sort((a, b) => {
            const nameA = a.querySelector('h2').textContent.toLowerCase();
            const nameB = b.querySelector('h2').textContent.toLowerCase();
            
            switch(method) {
                case 'name-asc':
                    return nameA.localeCompare(nameB);
                case 'name-desc':
                    return nameB.localeCompare(nameA);
                case 'newest':
                    return b.getAttribute('data-version').localeCompare(a.getAttribute('data-version'));
                case 'oldest':
                    return a.getAttribute('data-version').localeCompare(b.getAttribute('data-version'));
                default: 
                    return 0; 
            }
        });
        container.innerHTML = '';
        cards.forEach(card => container.appendChild(card));
    }
    function updateStats(visibleCount) {
        const statsElement = document.querySelector('.characters-stats .stat-card:first-child .stat-value');
        if (statsElement) {
            statsElement.textContent = visibleCount;
        }
    }
    applyFilters()
    gsap.from('.character-card', {
        opacity: 0,
        y: 50,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.3
    });
});