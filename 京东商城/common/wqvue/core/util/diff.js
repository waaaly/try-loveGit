function e(e) {
    return Object.prototype.toString.call(e);
}

function t(e, t, n) {
    e[t] = n;
}

function n(t, r) {
    if (!(0, s.looseEqual)(t, r)) {
        var i = e(t), o = e(r);
        if (i == l && o == l) {
            if (Object.keys(t).length >= Object.keys(r).length) for (var f in r) {
                var c = t[f];
                Object.keys(t).indexOf(f) < 0 ? t[f] = null : n(c, r[f]);
            }
        } else i == h && o == h && t.length >= r.length && r.forEach(function(e, r) {
            n(t[r], e);
        });
    }
}

function r(n, i, o, f) {
    if (!(0, s.looseEqual)(n, i)) {
        var c = e(n), a = e(i);
        if (c == l) if (a != l || Object.keys(n).length < Object.keys(i).length) t(f, o, n); else {
            for (var u in n) !function(s) {
                var c = n[s], a = i[s], u = e(c), g = e(a);
                if (u != h && u != l) c !== i[s] && t(f, ("" == o ? "" : o + ".") + s, c); else if (u == h) g != h ? t(f, ("" == o ? "" : o + ".") + s, c) : c.length < a.length ? t(f, ("" == o ? "" : o + ".") + s, c) : c.forEach(function(e, t) {
                    r(e, a[t], ("" == o ? "" : o + ".") + s + "[" + t + "]", f);
                }); else if (u == l) if (g != l || Object.keys(c).length < Object.keys(a).length) t(f, ("" == o ? "" : o + ".") + s, c); else for (var d in c) r(c[d], a[d], ("" == o ? "" : o + ".") + s + "." + d, f);
            }(u);
        } else c == h ? a != h ? t(f, o, n) : n.length < i.length ? t(f, o, n) : n.forEach(function(e, t) {
            r(e, i[t], o + "[" + t + "]", f);
        }) : t(f, o, n);
    }
}

function i(e) {
    for (var t = e.length, n = [], r = "", i = 0, o = !0, f = !1, s = 0; s < t; s++) {
        var l = e[s];
        if ("\\" === l) s + 1 < t && ("." === e[s + 1] || "[" === e[s + 1] || "]" === e[s + 1] || "\\" === e[s + 1]) ? (r += e[s + 1], 
        s++) : r += "\\"; else if ("." === l) r && (n.push(r), r = ""); else if ("[" === l) {
            if (r && (n.push(r), r = ""), 0 === n.length) throw new Error("The path string should not start with []: " + e);
            f = !0, o = !0;
        } else if ("]" === l) {
            if (o) throw new Error("There should be digits inside [] in the path string: " + e);
            f = !1, n.push(i), i = 0;
        } else if (f) {
            if (l < "0" || l > "9") throw new Error("Only digits (0-9) can be put inside [] in the path string: " + e);
            o = !1, i = 10 * i + l.charCodeAt(0) - 48;
        } else r += l;
    }
    if (r && n.push(r), 0 === t) throw new Error("The path string should not be empty");
    return n;
}

function o(e, t) {
    var n = void 0, r = (0, s.extend)({}, t, !0);
    return e.forEach(function(e) {
        n = r ? r[e] : null, r = n;
    }), n;
}

function f(e) {
    e && Object.keys(e).forEach(function(t) {
        void 0 === e[t] && console.error('Setting data field "' + t + '" to undefined is invalid.');
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getPathArr = i, exports.getValByPathArr = o, exports.undefinedWarn = f, 
exports.getOldData = function(e, t) {
    var n = {};
    return Object.keys(e).forEach(function(e) {
        n[e] = o(i(e), t);
    }), n;
}, exports.diff = function(e, t) {
    var i = {};
    return n(e, t), r(e, t, "", i), f(i), i;
};

var s = require("./index"), l = "[object Object]", h = "[object Array]";