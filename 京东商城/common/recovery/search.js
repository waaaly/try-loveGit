Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getRecoveryUrl = function(t) {
    if (1 == e) return "https://wqs.jd.com/search/index.shtml?forcewqs=1&key=" + encodeURIComponent(t || "");
}, exports.setStatus = function(t) {
    e = t;
};

var e = void 0;