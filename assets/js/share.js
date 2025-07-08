// Privacy-respecting share functionality
(function() {
    'use strict';
    
    // Initialize share buttons
    function initShare() {
        const shareContainer = document.querySelector('.share-buttons');
        if (!shareContainer) return;
        
        const nativeShareBtn = shareContainer.querySelector('.share-native');
        const copyBtn = shareContainer.querySelector('.share-copy');
        const successMsg = shareContainer.querySelector('.share-success');
        
        // Check for native Web Share API support
        if (navigator.share && nativeShareBtn) {
            nativeShareBtn.style.display = 'inline-flex';
            nativeShareBtn.addEventListener('click', handleNativeShare);
        }
        
        // Copy link functionality
        if (copyBtn) {
            copyBtn.addEventListener('click', handleCopyLink);
        }
    }
    
    // Native share handler
    async function handleNativeShare() {
        const shareData = {
            title: document.title,
            url: window.location.href
        };
        
        try {
            await navigator.share(shareData);
        } catch (err) {
            // User cancelled or error occurred
            console.debug('Share cancelled or failed:', err);
        }
    }
    
    // Copy link handler
    async function handleCopyLink(event) {
        const button = event.currentTarget;
        const url = button.dataset.url || window.location.href;
        const successMsg = document.querySelector('.share-success');
        
        try {
            // Try modern clipboard API first
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(url);
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = url;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }
            
            // Show success message
            if (successMsg) {
                successMsg.style.display = 'block';
                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 2000);
            }
            
            // Update button text temporarily
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = originalText;
            }, 1000);
            
        } catch (err) {
            console.error('Failed to copy link:', err);
            
            // Fallback: show the URL for manual copying
            if (successMsg) {
                successMsg.textContent = `Copy this link: ${url}`;
                successMsg.style.display = 'block';
                setTimeout(() => {
                    successMsg.style.display = 'none';
                    successMsg.textContent = 'Link copied to clipboard!';
                }, 5000);
            }
        }
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initShare);
    } else {
        initShare();
    }
})();