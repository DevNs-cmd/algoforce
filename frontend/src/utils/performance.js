/**
 * Throttles a function to run at most once per animation frame (optimal for scroll/resize events).
 * This uses requestAnimationFrame (rAF) to match browser redraw cycles and prevent layout jank.
 * @param {Function} fn - The function to throttle
 * @returns {Function} - Throttled function
 */
export function rafThrottle(fn) {
  let ticking = false;
  return function (...args) {
    if (!ticking) {
      requestAnimationFrame(() => {
        fn.apply(this, args);
        ticking = false;
      });
      ticking = true;
    }
  };
}

/**
 * Standard throttle function with leading/trailing execution support (Token Bucket algorithm variant).
 * @param {Function} func - Function to throttle
 * @param {number} wait - Time in milliseconds to throttle
 * @returns {Function} - Throttled function
 */
export function throttle(func, wait = 100) {
  let timeout = null;
  let previous = 0;

  const throttled = function (...args) {
    const now = Date.now();
    const remaining = wait - (now - previous);
    
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(this, args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now();
        timeout = null;
        func.apply(this, args);
      }, remaining);
    }
  };

  return throttled;
}
