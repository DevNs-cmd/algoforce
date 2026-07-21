/**
 * Throttles a function to run at most once per animation frame (optimal for scroll/resize events).
 * This uses requestAnimationFrame (rAF) to match browser redraw cycles and prevent layout jank.
 * @param {Function} fn - The function to throttle
 * @returns {Function} - Throttled function
 */
export function rafThrottle(fn) {
  let frameId = null;
  let lastArgs;
  let lastThis;

  function throttled(...args) {
    lastArgs = args;
    lastThis = this;
    if (frameId !== null) return;

    frameId = requestAnimationFrame(() => {
      frameId = null;
      fn.apply(lastThis, lastArgs);
      lastArgs = undefined;
      lastThis = undefined;
    });
  }

  throttled.cancel = () => {
    if (frameId !== null) cancelAnimationFrame(frameId);
    frameId = null;
    lastArgs = undefined;
    lastThis = undefined;
  };

  return throttled;
}

/**
 * Standard throttle function with leading/trailing execution support (Token Bucket algorithm variant).
 * @param {Function} func - Function to throttle
 * @param {number} wait - Time in milliseconds to throttle
 * @returns {Function} - Throttled function
 */
export function throttle(func, wait = 100) {
  let timeoutId = null;
  let previous = 0;
  let trailingArgs;
  let trailingThis;

  const invoke = (time) => {
    previous = time;
    timeoutId = null;
    func.apply(trailingThis, trailingArgs);
    trailingArgs = undefined;
    trailingThis = undefined;
  };

  const throttled = function (...args) {
    const now = Date.now();
    const remaining = wait - (now - previous);
    trailingArgs = args;
    trailingThis = this;

    if (remaining <= 0 || remaining > wait) {
      if (timeoutId) clearTimeout(timeoutId);
      invoke(now);
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => invoke(Date.now()), remaining);
    }
  };

  throttled.cancel = () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = null;
    trailingArgs = undefined;
    trailingThis = undefined;
  };

  return throttled;
}
