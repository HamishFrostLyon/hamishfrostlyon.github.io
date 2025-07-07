// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    // Search elements
    const searchToggle = document.getElementById('search-toggle');
    const searchWrapper = document.getElementById('search-wrapper');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    // Search data (populated by Jekyll)
    const posts = window.searchData || [];

    searchToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        searchWrapper.classList.toggle('active');
        if (searchWrapper.classList.contains('active')) {
            searchInput.focus();
            searchResults.classList.add('active');
        } else {
            searchInput.blur();
            searchResults.classList.remove('active');
            searchInput.value = '';
            searchResults.innerHTML = '';
        }
    });

    searchWrapper.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    document.addEventListener('click', function(e) {
        if (!searchWrapper.contains(e.target)) {
            searchWrapper.classList.remove('active');
            searchResults.classList.remove('active');
            searchInput.value = '';
            searchResults.innerHTML = '';
        }
    });

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        
        if (query.length < 2) {
            searchResults.innerHTML = '';
            searchResults.classList.remove('active');
            return;
        }

        const results = posts.filter(post => 
            post.title.toLowerCase().includes(query) || 
            post.excerpt.toLowerCase().includes(query)
        );

        searchResults.classList.add('active');
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">No results found</div>';
        } else {
            searchResults.innerHTML = results.map(post => `
                <div class="search-result">
                    <a href="${post.url}">
                        <div class="search-result-title">${post.title}</div>
                        <div class="search-result-date">${post.date}</div>
                    </a>
                </div>
            `).join('');
        }
    });

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
});

// Update theme toggle ARIA
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeState = themeToggle.querySelector('.theme-state');
    
    // Update aria-pressed based on theme
    function updateThemeAria() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        themeToggle.setAttribute('aria-pressed', isDark.toString());
        if (themeState) {
            themeState.textContent = isDark ? 'on' : 'off';
        }
    }
    
    // Initial state
    updateThemeAria();
    
    // Update on theme change
    const originalToggleHandler = themeToggle.onclick;
    themeToggle.onclick = function(e) {
        if (originalToggleHandler) originalToggleHandler.call(this, e);
        updateThemeAria();
    };
});

// Announce search results to screen readers
function announceSearchResults(results) {
    const searchResults = document.getElementById('search-results');
    const announcement = results.length === 0 
        ? 'No search results found' 
        : `${results.length} search result${results.length === 1 ? '' : 's'} found`;
    
    // Create or update live region announcement
    let liveRegion = document.getElementById('search-announcement');
    if (!liveRegion) {
        liveRegion = document.createElement('div');
        liveRegion.id = 'search-announcement';
        liveRegion.className = 'sr-only';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        searchResults.parentNode.insertBefore(liveRegion, searchResults);
    }
    
    liveRegion.textContent = announcement;
}
