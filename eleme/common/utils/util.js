function e(e) {
    if (Array.isArray(e)) {
        for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
        return r;
    }
    return Array.from(e);
}

exports.isFloat = function(e) {
    return Number(e) === e && e % 1 != 0;
}, exports.decimalPlaces = function(e) {
    var t = ("" + e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0;
}, exports.maybeToFixed = function(e) {
    return exports.decimalPlaces(e) > 2 ? Number(Number(e).toFixed(2)) : Number(e);
}, exports.obj2query = function(e) {
    return Object.keys(e).reduce(function(t, r, n, o) {
        var a = e[r];
        return null == a ? t : "" + t + r + "=" + encodeURIComponent(a) + (n !== o.length - 1 ? "&" : "");
    }, "");
}, exports.payTimeFormat = function(e) {
    return ~~(e / 60) + "分" + e % 60 + "秒";
}, exports.jsonSize = function(e) {
    var t = JSON.stringify(e);
    return ~-encodeURI(t).split(/%..|./).length;
}, exports.appendTail = function(t, r, n) {
    var o = Math.min(t.length, r.length), a = t.slice(t.length - o).map(function(e) {
        return e[n];
    }), u = 0;
    do {
        r[u] && a.indexOf(r[u][n]) > -1 && delete r[u];
    } while (++u < o);
    return r = r.filter(function(e) {
        return e;
    }), t.push.apply(t, e(r)), t;
}, exports.random = function(e, t) {
    return e = Math.ceil(e), t = Math.floor(t), Math.floor(Math.random() * (t - e + 1)) + e;
}, exports.sameDay = function(e, t) {
    return !!(e && t && e.getDate && t.getDate) && (e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate());
}, exports.isIPhoneX = function() {
    return wx.getSystemInfoSync().model.replace(/\s+/g, "").toLowerCase().indexOf("iphonex") > -1;
}, exports.uParams = function(e) {
    var t = {};
    return e.replace(/([^=?#&]*)=([^?#&]*)/g, function(e, r, n) {
        t[decodeURIComponent(r)] = decodeURIComponent(n);
    }), t;
};