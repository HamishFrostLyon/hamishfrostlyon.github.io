// Keyboard navigation enhancements
(function() {
    'use strict';
    
    // Track if user is using keyboard
    let isKeyboardUser = false;
    
    // Detect keyboard usage
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            isKeyboardUser = true;
            document.body.classList.add('keyboard-nav');
        }
    });
    
    // Detect mouse usage
    document.addEventListener('mousedown', function() {
        isKeyboardUser = false;
        document.body.classList.remove('keyboard-nav');
    });
    
    // Enhance skip links
    const skipLinks = document.querySelectorAll('.skip-link');
    skipLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.tabIndex = -1;
                target.focus();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Trap focus in search when open
    const searchWrapper = document.getElementById('search-wrapper');
    const searchInput = document.getElementById('search-input');
    const searchToggle = document.getElementById('search-toggle');
    
    if (searchWrapper && searchInput && searchToggle) {
        searchWrapper.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                searchToggle.click();
                searchToggle.focus();
            }
        });
    }
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Alt + / for search
        if (e.altKey && e.key === '/') {
            e.preventDefault();
            searchToggle.click();
            searchInput.focus();
        }
        
        // Alt + H for home
        if (e.altKey && e.key === 'h') {
            e.preventDefault();
            window.location.href = '/writing';
        }
    });
    
    // Announce keyboard shortcuts on focus
    const keyboardShortcuts = {
        'search-toggle': 'Press Alt + / to open search',
        'theme-toggle': 'Press Space or Enter to toggle theme'
    };
    
    Object.entries(keyboardShortcuts).forEach(([id, message]) => {
        const element = document.getElementById(id);
        if (element) {
            element.setAttribute('aria-description', message);
        }
    });
})();
