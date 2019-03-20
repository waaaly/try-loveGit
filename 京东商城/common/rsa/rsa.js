function t(i) {
    this.modulus = d(i), this.k = k(this.modulus) + 1;
    var t = new g();
    t.digits[2 * this.k] = 1, this.mu = K(t, this.modulus), this.bkplus1 = new g(), 
    this.bkplus1.digits[this.k + 1] = 1, this.modulo = s, this.multiplyMod = r, this.powMod = e;
}

function s(i) {
    var t = P(p(P(i, this.k - 1), this.mu), this.k + 1), s = m(x(i, this.k + 1), x(p(t, this.modulus), this.k + 1));
    s.isNeg && (s = w(s, this.bkplus1));
    for (var r = C(s, this.modulus) >= 0; r; ) r = C(s = m(s, this.modulus), this.modulus) >= 0;
    return s;
}

function r(i, t) {
    var s = p(i, t);
    return this.modulo(s);
}

function e(i, t) {
    var s = new g();
    s.digits[0] = 1;
    for (var r = i, e = t; 0 != (1 & e.digits[0]) && (s = this.multiplyMod(s, r)), 0 != (e = z(e, 1)).digits[0] || 0 != k(e); ) r = this.multiplyMod(r, r);
    return s;
}

function n(i) {
    R = i, j = new Array(R);
    for (var t = 0; t < j.length; t++) j[t] = 0;
    _ = new g(), (q = new g()).digits[0] = 1;
}

function g(i) {
    this.digits = "boolean" == typeof i && 1 == i ? null : j.slice(0), this.isNeg = !1;
}

function d(i) {
    var t = new g(!0);
    return t.digits = i.digits.slice(0), t.isNeg = i.isNeg, t;
}

function o(i) {
    for (var t = "", s = i.length - 1; s > -1; --s) t += i.charAt(s);
    return t;
}

function u(i, t) {
    var s = new g();
    s.digits[0] = t;
    for (var r = E(i, s), e = I[r[1].digits[0]]; 1 == C(r[0], _); ) r = E(r[0], s), 
    digit = r[1].digits[0], e += I[r[1].digits[0]];
    return (i.isNeg ? "-" : "") + o(e);
}

function a(t) {
    var s = "";
    for (i = 0; i < 4; ++i) s += J[15 & t], t >>>= 4;
    return o(s);
}

function h(i) {
    for (var t = "", s = (k(i), k(i)); s > -1; --s) t += a(i.digits[s]);
    return t;
}

function f(i) {
    return i >= 48 && 57 >= i ? i - 48 : i >= 65 && 90 >= i ? 10 + i - 65 : i >= 97 && 122 >= i ? 10 + i - 97 : 0;
}

function c(i) {
    for (var t = 0, s = Math.min(i.length, 4), r = 0; s > r; ++r) t <<= 4, t |= f(i.charCodeAt(r));
    return t;
}

function l(i) {
    for (var t = new g(), s = i.length, r = 0; s > 0; s -= 4, ++r) t.digits[r] = c(i.substr(Math.max(s - 4, 0), Math.min(s, 4)));
    return t;
}

function N(i) {
    for (var t = "", s = k(i); s > -1; --s) t += v(i.digits[s]);
    return t;
}

function v(i) {
    var t = String.fromCharCode(255 & i);
    return i >>>= 8, String.fromCharCode(255 & i) + t;
}

function w(i, t) {
    var s;
    if (i.isNeg != t.isNeg) t.isNeg = !t.isNeg, s = m(i, t), t.isNeg = !t.isNeg; else {
        s = new g();
        for (var r, e = 0, n = 0; n < i.digits.length; ++n) r = i.digits[n] + t.digits[n] + e, 
        s.digits[n] = 65535 & r, e = Number(r >= B);
        s.isNeg = i.isNeg;
    }
    return s;
}

function m(i, t) {
    var s;
    if (i.isNeg != t.isNeg) t.isNeg = !t.isNeg, s = w(i, t), t.isNeg = !t.isNeg; else {
        s = new g();
        var r, e;
        e = 0;
        for (n = 0; n < i.digits.length; ++n) r = i.digits[n] - t.digits[n] + e, s.digits[n] = 65535 & r, 
        s.digits[n] < 0 && (s.digits[n] += B), e = 0 - Number(0 > r);
        if (-1 == e) {
            e = 0;
            for (var n = 0; n < i.digits.length; ++n) r = 0 - s.digits[n] + e, s.digits[n] = 65535 & r, 
            s.digits[n] < 0 && (s.digits[n] += B), e = 0 - Number(0 > r);
            s.isNeg = !i.isNeg;
        } else s.isNeg = i.isNeg;
    }
    return s;
}

function k(i) {
    for (var t = i.digits.length - 1; t > 0 && 0 == i.digits[t]; ) --t;
    return t;
}

function M(i) {
    var t, s = k(i), r = i.digits[s], e = (s + 1) * O;
    for (t = e; t > e - O && 0 == (32768 & r); --t) r <<= 1;
    return t;
}

function p(i, t) {
    for (var s, r, e, n, d = new g(), o = k(i), u = k(t), a = 0; u >= a; ++a) {
        for (r = 0, n = a, s = 0; s <= o; ++s, ++n) e = d.digits[n] + i.digits[s] * t.digits[a] + r, 
        d.digits[n] = e & H, r = e >>> D;
        d.digits[a + o + 1] = r;
    }
    return d.isNeg = i.isNeg != t.isNeg, d;
}

function y(i, t) {
    for (var s, r = new g(), e = k(i), n = 0, d = 0; e >= d; ++d) s = r.digits[d] + i.digits[d] * t + n, 
    r.digits[d] = s & H, n = s >>> D;
    return r.digits[1 + e] = n, r;
}

function S(i, t, s, r, e) {
    for (var n = Math.min(t + e, i.length), g = t, d = r; n > g; ++g, ++d) s[d] = i[g];
}

function b(i, t) {
    var s = Math.floor(t / O), r = new g();
    S(i.digits, 0, r.digits, s, r.digits.length - s);
    for (var e = t % O, n = O - e, d = r.digits.length - 1, o = d - 1; d > 0; --d, --o) r.digits[d] = r.digits[d] << e & H | (r.digits[o] & L[e]) >>> n;
    return r.digits[0] = r.digits[d] << e & H, r.isNeg = i.isNeg, r;
}

function z(i, t) {
    var s = Math.floor(t / O), r = new g();
    S(i.digits, s, r.digits, 0, i.digits.length - s);
    for (var e = t % O, n = O - e, d = 0, o = d + 1; d < r.digits.length - 1; ++d, ++o) r.digits[d] = r.digits[d] >>> e | (r.digits[o] & Q[e]) << n;
    return r.digits[r.digits.length - 1] >>>= e, r.isNeg = i.isNeg, r;
}

function A(i, t) {
    var s = new g();
    return S(i.digits, 0, s.digits, t, s.digits.length - t), s;
}

function P(i, t) {
    var s = new g();
    return S(i.digits, t, s.digits, 0, s.digits.length - t), s;
}

function x(i, t) {
    var s = new g();
    return S(i.digits, 0, s.digits, 0, t), s;
}

function C(i, t) {
    if (i.isNeg != t.isNeg) return 1 - 2 * Number(i.isNeg);
    for (var s = i.digits.length - 1; s >= 0; --s) if (i.digits[s] != t.digits[s]) return i.isNeg ? 1 - 2 * Number(i.digits[s] > t.digits[s]) : 1 - 2 * Number(i.digits[s] < t.digits[s]);
    return 0;
}

function E(i, t) {
    var s, r, e = M(i), n = M(t), o = t.isNeg;
    if (n > e) return i.isNeg ? (s = d(q), s.isNeg = !t.isNeg, i.isNeg = !1, t.isNeg = !1, 
    r = m(t, i), i.isNeg = !0, t.isNeg = o) : (s = new g(), r = d(i)), new Array(s, r);
    s = new g(), r = i;
    for (var u = Math.ceil(n / O) - 1, a = 0; t.digits[u] < F; ) t = b(t, 1), ++a, ++n, 
    u = Math.ceil(n / O) - 1;
    r = b(r, a), e += a;
    for (var h = Math.ceil(e / O) - 1, f = A(t, h - u); -1 != C(r, f); ) ++s.digits[h - u], 
    r = m(r, f);
    for (var c = h; c > u; --c) {
        var l = c >= r.digits.length ? 0 : r.digits[c], N = c - 1 >= r.digits.length ? 0 : r.digits[c - 1], v = c - 2 >= r.digits.length ? 0 : r.digits[c - 2], p = u >= t.digits.length ? 0 : t.digits[u], S = u - 1 >= t.digits.length ? 0 : t.digits[u - 1];
        s.digits[c - u - 1] = l == p ? H : Math.floor((l * B + N) / p);
        for (var P = s.digits[c - u - 1] * (p * B + S), x = l * G + (N * B + v); P > x; ) --s.digits[c - u - 1], 
        P = s.digits[c - u - 1] * (p * B | S), x = l * B * B + (N * B + v);
        (r = m(r, y(f = A(t, c - u - 1), s.digits[c - u - 1]))).isNeg && (r = w(r, f), --s.digits[c - u - 1]);
    }
    return r = z(r, a), s.isNeg = i.isNeg != o, i.isNeg && (s = o ? w(s, q) : m(s, q), 
    t = z(t, a), r = m(t, r)), 0 == r.digits[0] && 0 == k(r) && (r.isNeg = !1), new Array(s, r);
}

function K(i, t) {
    return E(i, t)[0];
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var R, j, _, q, D = 16, O = D, B = 65536, F = B >>> 1, G = B * B, H = B - 1;

n(20);

!function(i) {
    var t = new g();
    t.isNeg = 0 > i, i = Math.abs(i);
    for (var s = 0; i > 0; ) t.digits[s++] = i & H, i >>= D;
}(1e15);

var I = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"), J = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"), L = new Array(0, 32768, 49152, 57344, 61440, 63488, 64512, 65024, 65280, 65408, 65472, 65504, 65520, 65528, 65532, 65534, 65535), Q = new Array(0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535), T = {};

T.NoPadding = "NoPadding", T.PKCS1Padding = "PKCS1Padding", T.RawEncoding = "RawEncoding", 
T.NumericEncoding = "NumericEncoding", exports.setMaxDigits = n, exports.RSAKeyPair = function(i, s, r, e) {
    this.e = l(i), this.d = l(s), this.m = l(r), this.chunkSize = "number" != typeof e ? 2 * k(this.m) : e / 8, 
    this.radix = 16, this.barrett = new t(this.m);
}, exports.encryptedString = function(i, t, s, r) {
    var e, n, d, o, a, f, c, l, v, w = new Array(), m = t.length, k = "";
    for (o = "string" == typeof s ? s == T.NoPadding ? 1 : s == T.PKCS1Padding ? 2 : 0 : 0, 
    a = "string" == typeof r && r == T.RawEncoding ? 1 : 0, 1 == o ? m > i.chunkSize && (m = i.chunkSize) : 2 == o && m > i.chunkSize - 11 && (m = i.chunkSize - 11), 
    e = 0, n = 2 == o ? m - 1 : i.chunkSize - 1; m > e; ) o ? w[n] = t.charCodeAt(e) : w[e] = t.charCodeAt(e), 
    e++, n--;
    for (1 == o && (e = 0), n = i.chunkSize - m % i.chunkSize; n > 0; ) {
        if (2 == o) {
            for (f = Math.floor(256 * Math.random()); !f; ) f = Math.floor(256 * Math.random());
            w[e] = f;
        } else w[e] = 0;
        e++, n--;
    }
    for (2 == o && (w[m] = 0, w[i.chunkSize - 2] = 2, w[i.chunkSize - 1] = 0), c = w.length, 
    e = 0; c > e; e += i.chunkSize) {
        for (l = new g(), n = 0, d = e; d < e + i.chunkSize; ++n) l.digits[n] = w[d++], 
        l.digits[n] += w[d++] << 8;
        v = i.barrett.powMod(l, i.e), k += 1 == a ? N(v) : 16 == i.radix ? h(v) : u(v, i.radix);
    }
    return k;
};