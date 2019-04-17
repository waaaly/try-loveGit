var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
    return typeof n;
} : function(n) {
    return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
}, t = new function() {
    var n = Math.round, t = Math.max, e = Math.pow, o = Math.log, a = "0123456789bcdefghjkmnpqrstuvwxyz", r = new RegExp("^[" + a + "]+$"), l = function() {};
    l.prototype = {
        minlat: -90,
        maxlat: 90,
        minlng: -180,
        maxlng: 180,
        halfLat: function() {
            return (this.minlat + this.maxlat) / 2;
        },
        halfLng: function() {
            return (this.minlng + this.maxlng) / 2;
        }
    }, this.encode = function(n, o) {
        if (n instanceof Array && null == o && (o = n[1], n = n[0]), n *= 1, o *= 1, n !== n) throw new Error("Geohash.encode: lat must be a Number");
        if (o !== o) throw new Error("Geohash.encode: lng must be a Number");
        for (var r, i, f = n.toString().length - n.toFixed().length - 2, h = o.toString().length - n.toFixed().length - 2, m = e(10, -t(f, h, 0)) / 2, u = new l(), g = [], s = 180, c = !0, d = 0, x = 4; s >= m; ) if (c ? o > (r = u.halfLng()) ? (d |= 1 << x, 
        u.minlng = r) : u.maxlng = r : n > (r = u.halfLat()) ? (d |= 1 << x, u.minlat = r) : u.maxlat = r, 
        c = !c, x) x--; else {
            if (i = s, s = t(u.maxlng - u.minlng, u.maxlat - u.minlat), i === s) break;
            g.push(a[d]), x = 4, d = 0;
        }
        return g.join("");
    }, this.decode = function(i) {
        if (!r.test(i)) throw new Error("Geohash.decode: hash must be a geohash string");
        for (var f = new l(), h = 90, m = 180, u = 0, g = i.length; u < g; u++) {
            for (var s = a.indexOf(i[u]), c = 1 & u, d = 4; d >= 0; d--) !function(n, t, e) {
                var o = 1 << n;
                !(1 & n) ^ !(1 & e) ? o & t ? f.minlat = f.halfLat() : f.maxlat = f.halfLat() : o & t ? f.minlng = f.halfLng() : f.maxlng = f.halfLng();
            }(d, s, c);
            c ? (h /= 8, m /= 4) : (h /= 4, m /= 8);
        }
        var x = e(10, t(1, -n(o(h) / o(10))) - 1), y = e(10, t(1, -n(o(m) / o(10))) - 1);
        return [ n(f.halfLat() * x) / x, n(f.halfLng() * y) / y ];
    };
}();

"object" === ("undefined" == typeof module ? "undefined" : n(module)) && (module.exports = t);