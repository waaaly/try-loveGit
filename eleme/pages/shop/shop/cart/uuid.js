function e(t) {
    return t ? (t ^ 16 * Math.random() >> t / 4).toString(16) : ([ 1e7 ] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, e);
}

module.exports = e;