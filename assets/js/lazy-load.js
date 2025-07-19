// Lazy loading for images
(function () {
  'use strict';

  // Check if native lazy loading is supported
  const supportsLazyLoading = 'loading' in HTMLImageElement.prototype;

  // Initialize lazy loading
  function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    if (images.length === 0) return;

    if (supportsLazyLoading) {
      // Use native lazy loading
      images.forEach((img) => {
        img.src = img.dataset.src;
        img.loading = 'lazy';
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }
        img.classList.add('lazy-loaded');
      });
    } else {
      // Use Intersection Observer for older browsers
      const imageObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src;
              if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
              }
              img.classList.add('lazy-loaded');
              observer.unobserve(img);
            }
          });
        },
        {
          rootMargin: '50px 0px',
          threshold: 0.01,
        }
      );

      images.forEach((img) => imageObserver.observe(img));
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLazyLoading);
  } else {
    initLazyLoading();
  }
})();
