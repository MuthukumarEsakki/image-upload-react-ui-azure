// used for jest's polyfill
global.requestAnimationFrame = (callback) => {
    setTimeout(callback, 0);
};

