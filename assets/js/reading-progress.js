// Reading progress indicator
(function() {
    'use strict';
    
    // Only show on post pages
    if (!document.querySelector('.post-content')) {
        return;
    }
    
    // Create progress bar element
    function createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.setAttribute('role', 'progressbar');
        progressBar.setAttribute('aria-label', 'Reading progress');
        progressBar.setAttribute('aria-valuemin', '0');
        progressBar.setAttribute('aria-valuemax', '100');
        progressBar.setAttribute('aria-valuenow', '0');
        
        const progressFill = document.createElement('div');
        progressFill.className = 'reading-progress-fill';
        progressBar.appendChild(progressFill);
        
        // Insert at top of page
        document.body.insertBefore(progressBar, document.body.firstChild);
        
        return { bar: progressBar, fill: progressFill };
    }
    
    // Calculate reading progress
    function updateProgress(progressFill, progressBar) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100);
        
        progressFill.style.width = progress + '%';
        progressBar.setAttribute('aria-valuenow', Math.round(progress));
        
        // Hide when at top
        if (progress < 1) {
            progressBar.style.opacity = '0';
        } else {
            progressBar.style.opacity = '1';
        }
    }
    
    // Initialize
    function init() {
        const { bar: progressBar, fill: progressFill } = createProgressBar();
        
        // Update on scroll with throttling
        let ticking = false;
        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateProgress(progressFill, progressBar);
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        // Initial update
        updateProgress(progressFill, progressBar);
        
        // Listen for scroll
        window.addEventListener('scroll', onScroll, { passive: true });
        
        // Update on resize
        window.addEventListener('resize', () => updateProgress(progressFill, progressBar), { passive: true });
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();