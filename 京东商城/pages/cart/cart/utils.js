Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.nextTick = exports.judgeForPageScroll = exports.capitalizeFirstLetter = exports.sequence = void 0;

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../libs/promise.min.js")), t = null;

exports.sequence = function(t) {
    function r(t) {
        return n.push(t), e.default.resolve(n);
    }
    var n = [];
    return t.reduce(function(e, t) {
        return e.then(t).then(r);
    }, e.default.resolve());
}, exports.capitalizeFirstLetter = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
    return e.charAt(0).toUpperCase() + e.slice(1);
}, exports.judgeForPageScroll = function(e) {
    e && (t && (clearTimeout(t), t = null), t = setTimeout(function() {
        t = null, e();
    }, 100));
}, exports.nextTick = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {}, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100;
    wx.nextTick ? wx.nextTick(e) : setTimeout(e, t);
};