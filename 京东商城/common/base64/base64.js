Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1), e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

exports.base64encode = function(r) {
    var t, a, o, h, c, d;
    for (o = r.length, a = 0, t = ""; a < o; ) {
        if (h = 255 & r.charCodeAt(a++), a == o) {
            t += e.charAt(h >> 2), t += e.charAt((3 & h) << 4), t += "==";
            break;
        }
        if (c = r.charCodeAt(a++), a == o) {
            t += e.charAt(h >> 2), t += e.charAt((3 & h) << 4 | (240 & c) >> 4), t += e.charAt((15 & c) << 2), 
            t += "=";
            break;
        }
        d = r.charCodeAt(a++), t += e.charAt(h >> 2), t += e.charAt((3 & h) << 4 | (240 & c) >> 4), 
        t += e.charAt((15 & c) << 2 | (192 & d) >> 6), t += e.charAt(63 & d);
    }
    return t;
}, exports.base64decode = function(e) {
    var t, a, o, h, c, d, i;
    for (d = e.length, c = 0, i = ""; c < d; ) {
        do {
            t = r[255 & e.charCodeAt(c++)];
        } while (c < d && -1 == t);
        if (-1 == t) break;
        do {
            a = r[255 & e.charCodeAt(c++)];
        } while (c < d && -1 == a);
        if (-1 == a) break;
        i += String.fromCharCode(t << 2 | (48 & a) >> 4);
        do {
            if (61 == (o = 255 & e.charCodeAt(c++))) return i;
            o = r[o];
        } while (c < d && -1 == o);
        if (-1 == o) break;
        i += String.fromCharCode((15 & a) << 4 | (60 & o) >> 2);
        do {
            if (61 == (h = 255 & e.charCodeAt(c++))) return i;
            h = r[h];
        } while (c < d && -1 == h);
        if (-1 == h) break;
        i += String.fromCharCode((3 & o) << 6 | h);
    }
    return i;
};