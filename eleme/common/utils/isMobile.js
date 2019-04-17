module.exports.isMobile = function(t) {
    var e = /^1\d{10}$/;
    return e.test(t);
};