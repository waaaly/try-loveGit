function r(r) {
    if (null === r || void 0 === r) throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(r);
}

var t = Object.getOwnPropertySymbols, e = Object.prototype.hasOwnProperty, n = Object.prototype.propertyIsEnumerable;

module.exports = function() {
    try {
        if (!Object.assign) return !1;
        var r = new String("abc");
        if (r[5] = "de", "5" === Object.getOwnPropertyNames(r)[0]) return !1;
        for (var t = {}, e = 0; e < 10; e++) t["_" + String.fromCharCode(e)] = e;
        if ("0123456789" !== Object.getOwnPropertyNames(t).map(function(r) {
            return t[r];
        }).join("")) return !1;
        var n = {};
        return "abcdefghijklmnopqrst".split("").forEach(function(r) {
            n[r] = r;
        }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, n)).join("");
    } catch (r) {
        return !1;
    }
}() ? Object.assign : function(o, c) {
    for (var a, i, s = r(o), f = 1; f < arguments.length; f++) {
        a = Object(arguments[f]);
        for (var u in a) e.call(a, u) && (s[u] = a[u]);
        if (t) {
            i = t(a);
            for (var b = 0; b < i.length; b++) n.call(a, i[b]) && (s[i[b]] = a[i[b]]);
        }
    }
    return s;
};