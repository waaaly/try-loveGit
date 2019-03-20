function e(e) {
    return "http://wq.jd.com/wxapp/" + e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

exports.addEmit = function(e) {
    e.$emit = e.triggerEvent;
}, exports.add$refs = function(e) {
    e.$refs = new o.default({}, {
        get: function(r, t) {
            return console.error("proxy-polyfill暂不支持新属性，而且某些机型不支持原生proxy，所以$refs暂不可用"), e.selectComponent("#" + t) || {};
        }
    });
}, exports.addXcxReferrer = function(r) {
    var t = getCurrentPages(), o = t.pop();
    r.referrer = e(0 == t.length ? o && o.route : 1 == t.length ? t.pop().route : "");
}, exports.addXcx$xgoto = function(e) {
    e.$xgoto = function() {
        for (var o = arguments.length, n = Array(o), i = 0; i < o; i++) n[i] = arguments[i];
        var p = Array.isArray(n[0]), f = n[0].length, u = void 0;
        if (!p) throw new Error("链接参数类型应为数组");
        if (2 == f) u = n[0].filter(function(e) {
            return e.startsWith("/pages/");
        })[0]; else if (1 == f) {
            var s = n[0][0].replace(/^(http:)?\/\//, "https://");
            s = (0, t.addUrlParam)(s, "object" == r(n[1]) ? n[1] : {}), u = "/pages/h5/index?encode_url=" + encodeURIComponent(s), 
            n[1] = {};
        } else if (0 == f) throw new Error("链接参数数组不能为空");
        n[0] = u, e.$goto.apply(e, n);
    };
}, exports.addXcx$setShare = function(e, r) {
    e.onShareAppMessage && (r.$setShare = function() {});
};

var t = require("../../util/index"), o = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../../libs/proxy.min.js"));