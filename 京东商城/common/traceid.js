function t(t, r) {
    for (var n = parseInt(t, 2), s = "0", a = [], o = Math.pow(2, r) + "", u = o.length - 1; u > -1; u--) {
        var i = o[u];
        a.push(n * i + "");
    }
    for (var g = 0; g < a.length; g++) s = e(s, a[g], g);
    return s;
}

function e(t, e, r) {
    return t.substr(0, t.length - r) / 1 + e / 1 + t.substr(t.length - r);
}

function r(t, e) {
    for (var r = 0, n = [], s = t.length, a = e.length, o = Math.max(s, a), u = 0; u < o; u++) {
        var i = (s - u > 0 ? t.charAt(s - u - 1) / 1 : 0) + (a - u > 0 ? e.charAt(a - u - 1) / 1 : 0) + r;
        i >= 10 ? (r = 1, n.push(i % 10)) : (r = 0, n.push(i));
    }
    return n.reverse().join("");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.genTraceId = function(e) {
    var n = e.operateId, s = e.bizId, a = e.isServer || 0, o = new Date(), u = new Date("2017/01/01"), i = parseInt((o.getTime() - u.getTime()) / 1e3), g = 1e3 * parseInt(100 * Math.random()) + o.getMilliseconds();
    if (!s || !n) return "";
    n &= 2047, s &= 63;
    var h = 1073741823 & i;
    return g = (g &= 32767).toString(2), n = n.toString(2), s = s.toString(2), h = h.toString(2), 
    g = "000000000000000".substr(0, 15 - g.length) + g, n = "00000000000".substr(0, 11 - n.length) + n, 
    s = "000000".substr(0, 6 - s.length) + s, r(t("0" + h, 33), parseInt(a + s + n + g, 2) + "");
};