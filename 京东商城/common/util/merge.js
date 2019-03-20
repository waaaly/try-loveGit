function e(e, o) {
    var r = "string" == typeof e ? e.split(".") : [];
    return "object" === (void 0 === o ? "undefined" : t(o)) ? r.reduce(function(e, o) {
        return "object" === (void 0 === e ? "undefined" : t(e)) ? e[o] : {};
    }, o) : void 0;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

exports.mergeSubArray = function(o, r) {
    return Array.isArray(r) && "string" == typeof o && r.reduce(function(r, n) {
        return n = "object" === (void 0 === n ? "undefined" : t(n)) ? n : {}, r.concat(e(o, n) || []);
    }, []) || [];
}, exports.access = e;