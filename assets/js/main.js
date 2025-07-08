// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeTheme();
});

// Search functionality
function initializeSearch() {
    // Search elements with null checks
    const searchToggle = document.getElementById('search-toggle');
    const searchWrapper = document.getElementById('search-wrapper');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    // Exit if search elements don't exist
    if (!searchToggle || !searchWrapper || !searchInput || !searchResults) {
        console.warn('Search elements not found');
        return;
    }

    // Search data (populated by Jekyll)
    const posts = window.searchData || [];

    // Toggle search visibility
    searchToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const isActive = searchWrapper.classList.toggle('active');
        
        if (isActive) {
            searchInput.focus();
            searchResults.classList.add('active');
        } else {
            closeSearch();
        }
    });

    // Prevent search wrapper clicks from closing search
    searchWrapper.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Close search when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchWrapper.contains(e.target)) {
            closeSearch();
        }
    });

    // Close search with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchWrapper.classList.contains('active')) {
            closeSearch();
            searchToggle.focus(); // Return focus to toggle
        }
    });

    // Debounced search function
    const performSearch = debounce(function() {
        const query = searchInput.value.toLowerCase().trim();
        
        if (query.length < 2) {
            clearSearchResults();
            return;
        }

        const results = posts.filter(post => 
            post.title.toLowerCase().includes(query) || 
            post.excerpt.toLowerCase().includes(query)
        );

        displaySearchResults(results);
        announceSearchResults(results);
    }, 300);

    // Search input handler
    searchInput.addEventListener('input', performSearch);

    // Helper functions
    function closeSearch() {
        searchWrapper.classList.remove('active');
        searchResults.classList.remove('active');
        searchInput.value = '';
        clearSearchResults();
    }

    function clearSearchResults() {
        searchResults.innerHTML = '';
        searchResults.classList.remove('active');
    }

    function displaySearchResults(results) {
        searchResults.classList.add('active');
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">No results found</div>';
        } else {
            searchResults.innerHTML = results.map(post => `
                <div class="search-result">
                    <a href="${post.url}">
                        <div class="search-result-title">${escapeHtml(post.title)}</div>
                        <div class="search-result-date">${post.date}</div>
                    </a>
                </div>
            `).join('');
        }
    }
}

// Theme functionality
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    if (!themeToggle) {
        console.warn('Theme toggle not found');
        return;
    }
    
    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeAria();
    
    // Theme toggle handler
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeAria();
    });
    
    // Update ARIA attributes
    function updateThemeAria() {
        const isDark = html.getAttribute('data-theme') === 'dark';
        const themeState = themeToggle.querySelector('.theme-state');
        
        themeToggle.setAttribute('aria-pressed', isDark.toString());
        if (themeState) {
            themeState.textContent = isDark ? 'on' : 'off';
        }
    }
}

// Announce search results to screen readers
function announceSearchResults(results) {
    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;
    
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

// Utility to escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}