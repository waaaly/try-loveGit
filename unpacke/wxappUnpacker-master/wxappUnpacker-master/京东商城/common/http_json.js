function e(e) {
    var t = r.parseURL(e);
    return t ? (t.protocol || (e = "https:" + e), r.changeToHttps(e)) : e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getUniqueKey = exports.post = exports.get = exports.getByEncode = exports.ENCODE_UTF8 = exports.ENCODE_GBK = void 0;

var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, r = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}(require("./url_utils")), o = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./http_constant")), u = require("./request/request.js"), n = function(e) {
    return function() {
        return "http_uid_" + new Date().getTime() + "_" + e++;
    };
}(0);

exports.ENCODE_GBK = o.default.ENCODE_GBK, exports.ENCODE_UTF8 = o.default.ENCODE_UTF8;

exports.getByEncode = function(r, o, n, i, l, a) {
    var s = {
        method: "GET"
    };
    "object" === (void 0 === r ? "undefined" : t(r)) ? (s.url = r.url, s.data = r.data, 
    s.uniKey = r.uniqueKey, i = r.callback) : (s.url = r, s.data = o), s.encoding = "GBK", 
    s.url = e(s.url), u.request.get(s).then(function(e) {
        var t = e.body;
        return i.success(t);
    }, i.fail);
}, exports.get = function(r, o, n, i, l) {
    var a = {
        method: "GET"
    };
    "object" === (void 0 === r ? "undefined" : t(r)) ? (a.url = r.url, a.data = r.data, 
    a.uniKey = r.uniqueKey, n = r.callback) : (a.url = r, a.data = o), a.url = e(a.url), 
    console.log("%%%%%%%%%%% url", a.url), 30 == i && (a.priority = "REPORT"), u.request.get(a).then(function(e) {
        var t = e.body;
        return n.success(t);
    }, n.fail);
}, exports.post = function(r, o, n, i, l) {
    var a = {
        method: "POST"
    };
    "object" === (void 0 === r ? "undefined" : t(r)) ? (a.url = r.url, a.data = r.data, 
    a.uniKey = r.uniqueKey, n = r.callback) : (a.url = r, a.data = o), a.url = e(a.url), 
    30 == i && (a.priority = "REPORT"), u.request.post(a).then(function(e) {
        var t = e.body;
        return n.success(t);
    }, n.fail);
}, exports.getUniqueKey = n;