var t = function() {
    var t = null;
    return {
        setUser: function(r) {
            t = r;
        },
        getUser: function() {
            return t;
        }
    };
}();

module.exports = {
    statics: t
};