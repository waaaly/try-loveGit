Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.backSet = exports.onLoadSet = exports.getUrlParams = exports.addUrlParams = void 0;

var e = function(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = e[t]);
    return r.default = e, r;
}(require("./localStorage.js")), r = {}, t = (exports.addUrlParams = function(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
    r[e] = t;
}, exports.getUrlParams = function(e, t) {
    var o = r[e];
    return t && delete r[e], o;
});

exports.onLoadSet = function(r) {
    var o = t(r), a = o && o.wdref || "";
    a && e.set("wdref", a);
}, exports.backSet = function(r) {
    r && r.url && e.set("wdref", r.url);
};