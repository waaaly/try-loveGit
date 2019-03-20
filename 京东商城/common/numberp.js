function r(r) {
    if (Array.isArray(r)) {
        for (var t = 0, e = Array(r.length); t < r.length; t++) e[t] = r[t];
        return e;
    }
    return Array.from(r);
}

function t(r) {
    var t = r.toString().split(/[eE]/), e = (t[0].split(".")[1] || "").length - +(t[1] || 0);
    return e > 0 ? e : 0;
}

function e(r) {
    if (-1 === r.toString().indexOf("e")) return Number(r.toString().replace(".", ""));
    var e = t(r);
    return e > 0 ? r * Math.pow(10, e) : r;
}

function n(r) {
    (r > Number.MAX_SAFE_INTEGER || r < Number.MIN_SAFE_INTEGER) && console.warn(r + " is beyond boundary when transfer to integer, the results may not be accurate");
}

function o(a, i) {
    for (var u = arguments.length, l = Array(u > 2 ? u - 2 : 0), s = 2; s < u; s++) l[s - 2] = arguments[s];
    if (l.length > 0) return o.apply(void 0, [ o(a, i), l[0] ].concat(r(l.slice(1))));
    var p = e(a), c = e(i), f = t(a) + t(i), h = p * c;
    return n(h), h / Math.pow(10, f);
}

function a(e, n) {
    for (var i = arguments.length, u = Array(i > 2 ? i - 2 : 0), l = 2; l < i; l++) u[l - 2] = arguments[l];
    if (u.length > 0) return a.apply(void 0, [ a(e, n), u[0] ].concat(r(u.slice(1))));
    var s = Math.pow(10, Math.max(t(e), t(n)));
    return (o(e, s) + o(n, s)) / s;
}

function i(e, n) {
    for (var a = arguments.length, u = Array(a > 2 ? a - 2 : 0), l = 2; l < a; l++) u[l - 2] = arguments[l];
    if (u.length > 0) return i.apply(void 0, [ i(e, n), u[0] ].concat(r(u.slice(1))));
    var s = Math.pow(10, Math.max(t(e), t(n)));
    return (o(e, s) - o(n, s)) / s;
}

function u(a, i) {
    for (var l = arguments.length, s = Array(l > 2 ? l - 2 : 0), p = 2; p < l; p++) s[p - 2] = arguments[p];
    if (s.length > 0) return u.apply(void 0, [ u(a, i), s[0] ].concat(r(s.slice(1))));
    var c = e(a), f = e(i);
    return n(c), n(f), o(c / f, Math.pow(10, t(i) - t(a)));
}

function l(r, t) {
    var e = Math.pow(10, t);
    return u(Math.round(o(r, e)), e);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.plus = a, exports.minus = i, exports.times = o, exports.divide = u, 
exports.round = l, exports.digitLength = t, exports.float2Fixed = e, exports.default = {
    plus: a,
    minus: i,
    times: o,
    divide: u,
    round: l,
    digitLength: t,
    float2Fixed: e
};