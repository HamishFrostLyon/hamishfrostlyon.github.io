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
