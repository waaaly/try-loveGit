var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function(n, e) {
    "object" === ("undefined" == typeof exports ? "undefined" : t(exports)) ? module.exports = exports = e() : "function" == typeof define && define.amd ? define([], e) : n.CryptoJS = e();
}(void 0, function() {
    var t = t || function(t, n) {
        var e = Object.create || function() {
            function t() {}
            return function(n) {
                var e;
                return t.prototype = n, e = new t(), t.prototype = null, e;
            };
        }(), i = {}, r = i.lib = {}, o = r.Base = {
            extend: function(t) {
                var n = e(this);
                return t && n.mixIn(t), n.hasOwnProperty("init") && this.init !== n.init || (n.init = function() {
                    n.$super.init.apply(this, arguments);
                }), n.init.prototype = n, n.$super = this, n;
            },
            create: function() {
                var t = this.extend();
                return t.init.apply(t, arguments), t;
            },
            init: function() {},
            mixIn: function(t) {
                for (var n in t) t.hasOwnProperty(n) && (this[n] = t[n]);
                t.hasOwnProperty("toString") && (this.toString = t.toString);
            },
            clone: function() {
                return this.init.prototype.extend(this);
            }
        }, s = r.WordArray = o.extend({
            init: function(t, n) {
                t = this.words = t || [], this.sigBytes = void 0 != n ? n : 4 * t.length;
            },
            toString: function(t) {
                return (t || c).stringify(this);
            },
            concat: function(t) {
                var n = this.words, e = t.words, i = this.sigBytes, r = t.sigBytes;
                if (this.clamp(), i % 4) for (s = 0; s < r; s++) {
                    var o = e[s >>> 2] >>> 24 - s % 4 * 8 & 255;
                    n[i + s >>> 2] |= o << 24 - (i + s) % 4 * 8;
                } else for (var s = 0; s < r; s += 4) n[i + s >>> 2] = e[s >>> 2];
                return this.sigBytes += r, this;
            },
            clamp: function() {
                var n = this.words, e = this.sigBytes;
                n[e >>> 2] &= 4294967295 << 32 - e % 4 * 8, n.length = t.ceil(e / 4);
            },
            clone: function() {
                var t = o.clone.call(this);
                return t.words = this.words.slice(0), t;
            },
            random: function(n) {
                for (var e, i = [], r = function(n) {
                    function e() {
                        return (i = (9301 * i + 49297) % 233280) / 233280;
                    }
                    var i = new Date().getTime();
                    return function(n) {
                        return t.ceil(e() * n);
                    };
                }(), o = 0; o < n; o += 4) {
                    var u = function(t) {
                        var t = t, n = 987654321, e = 4294967295;
                        return function() {
                            var i = ((n = 36969 * (65535 & n) + (n >> 16) & e) << 16) + (t = 18e3 * (65535 & t) + (t >> 16) & e) & e;
                            return i /= 4294967296, (i += .5) * (r(1e3) / 1e3 > .5 ? 1 : -1);
                        };
                    }(4294967296 * (e || r(1e3) / 1e3));
                    e = 987654071 * u(), i.push(4294967296 * u() | 0);
                }
                return new s.init(i, n);
            }
        }), u = i.enc = {}, c = u.Hex = {
            stringify: function(t) {
                for (var n = t.words, e = t.sigBytes, i = [], r = 0; r < e; r++) {
                    var o = n[r >>> 2] >>> 24 - r % 4 * 8 & 255;
                    i.push((o >>> 4).toString(16)), i.push((15 & o).toString(16));
                }
                return i.join("");
            },
            parse: function(t) {
                for (var n = t.length, e = [], i = 0; i < n; i += 2) e[i >>> 3] |= parseInt(t.substr(i, 2), 16) << 24 - i % 8 * 4;
                return new s.init(e, n / 2);
            }
        }, a = u.Latin1 = {
            stringify: function(t) {
                for (var n = t.words, e = t.sigBytes, i = [], r = 0; r < e; r++) {
                    var o = n[r >>> 2] >>> 24 - r % 4 * 8 & 255;
                    i.push(String.fromCharCode(o));
                }
                return i.join("");
            },
            parse: function(t) {
                for (var n = t.length, e = [], i = 0; i < n; i++) e[i >>> 2] |= (255 & t.charCodeAt(i)) << 24 - i % 4 * 8;
                return new s.init(e, n);
            }
        }, f = u.Utf8 = {
            stringify: function(t) {
                try {
                    return decodeURIComponent(escape(a.stringify(t)));
                } catch (t) {
                    throw new Error("Malformed UTF-8 data");
                }
            },
            parse: function(t) {
                return a.parse(unescape(encodeURIComponent(t)));
            }
        }, p = r.BufferedBlockAlgorithm = o.extend({
            reset: function() {
                this._data = new s.init(), this._nDataBytes = 0;
            },
            _append: function(t) {
                "string" == typeof t && (t = f.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes;
            },
            _process: function(n) {
                var e = this._data, i = e.words, r = e.sigBytes, o = this.blockSize, u = r / (4 * o), c = (u = n ? t.ceil(u) : t.max((0 | u) - this._minBufferSize, 0)) * o, a = t.min(4 * c, r);
                if (c) {
                    for (var f = 0; f < c; f += o) this._doProcessBlock(i, f);
                    var p = i.splice(0, c);
                    e.sigBytes -= a;
                }
                return new s.init(p, a);
            },
            clone: function() {
                var t = o.clone.call(this);
                return t._data = this._data.clone(), t;
            },
            _minBufferSize: 0
        }), h = (r.Hasher = p.extend({
            cfg: o.extend(),
            init: function(t) {
                this.cfg = this.cfg.extend(t), this.reset();
            },
            reset: function() {
                p.reset.call(this), this._doReset();
            },
            update: function(t) {
                return this._append(t), this._process(), this;
            },
            finalize: function(t) {
                return t && this._append(t), this._doFinalize();
            },
            blockSize: 16,
            _createHelper: function(t) {
                return function(n, e) {
                    return new t.init(e).finalize(n);
                };
            },
            _createHmacHelper: function(t) {
                return function(n, e) {
                    return new h.HMAC.init(t, e).finalize(n);
                };
            }
        }), i.algo = {});
        return i;
    }(Math);
    return t;
});