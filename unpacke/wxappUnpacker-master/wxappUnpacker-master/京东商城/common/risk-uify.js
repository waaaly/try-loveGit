var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

module.exports = function(e) {
    function n(t) {
        if (r[t]) return r[t].exports;
        var i = r[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(i.exports, i, i.exports, n), i.l = !0, i.exports;
    }
    var r = {};
    return n.m = e, n.c = r, n.d = function(t, e, r) {
        n.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: r
        });
    }, n.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, n.t = function(e, r) {
        if (1 & r && (e = n(e)), 8 & r) return e;
        if (4 & r && "object" == (void 0 === e ? "undefined" : t(e)) && e && e.__esModule) return e;
        var i = Object.create(null);
        if (n.r(i), Object.defineProperty(i, "default", {
            enumerable: !0,
            value: e
        }), 2 & r && "string" != typeof e) for (var o in e) n.d(i, o, function(t) {
            return e[t];
        }.bind(null, o));
        return i;
    }, n.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return n.d(e, "a", e), e;
    }, n.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, n.p = "", n(n.s = 7);
}([ function(t, e) {
    t.exports = function(t, e) {
        return t ? (e || (e = {}), new Promise(function(n, r) {
            var i = Object.assign(e, {
                success: function(t) {
                    n(t);
                },
                fail: function(t) {
                    n(null);
                }
            });
            t(i);
        })) : Promise.resolve(null);
    };
}, function(t, e) {
    var n = n || function(t, e) {
        var n = {}, r = n.lib = {}, i = function() {}, o = r.Base = {
            extend: function(t) {
                i.prototype = this;
                var e = new i();
                return t && e.mixIn(t), e.hasOwnProperty("init") || (e.init = function() {
                    e.$super.init.apply(this, arguments);
                }), e.init.prototype = e, e.$super = this, e;
            },
            create: function() {
                var t = this.extend();
                return t.init.apply(t, arguments), t;
            },
            init: function() {},
            mixIn: function(t) {
                for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
                t.hasOwnProperty("toString") && (this.toString = t.toString);
            },
            clone: function() {
                return this.init.prototype.extend(this);
            }
        }, s = r.WordArray = o.extend({
            init: function(t, e) {
                t = this.words = t || [], this.sigBytes = void 0 != e ? e : 4 * t.length;
            },
            toString: function(t) {
                return (t || a).stringify(this);
            },
            concat: function(t) {
                var e = this.words, n = t.words, r = this.sigBytes;
                if (t = t.sigBytes, this.clamp(), r % 4) for (var i = 0; i < t; i++) e[r + i >>> 2] |= (n[i >>> 2] >>> 24 - i % 4 * 8 & 255) << 24 - (r + i) % 4 * 8; else if (65535 < n.length) for (i = 0; i < t; i += 4) e[r + i >>> 2] = n[i >>> 2]; else e.push.apply(e, n);
                return this.sigBytes += t, this;
            },
            clamp: function() {
                var e = this.words, n = this.sigBytes;
                e[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, e.length = t.ceil(n / 4);
            },
            clone: function() {
                var t = o.clone.call(this);
                return t.words = this.words.slice(0), t;
            },
            random: function(e) {
                for (var n = [], r = 0; r < e; r += 4) n.push(4294967296 * t.random() | 0);
                return new s.init(n, e);
            }
        }), c = n.enc = {}, a = c.Hex = {
            stringify: function(t) {
                var e = t.words;
                t = t.sigBytes;
                for (var n = [], r = 0; r < t; r++) {
                    var i = e[r >>> 2] >>> 24 - r % 4 * 8 & 255;
                    n.push((i >>> 4).toString(16)), n.push((15 & i).toString(16));
                }
                return n.join("");
            },
            parse: function(t) {
                for (var e = t.length, n = [], r = 0; r < e; r += 2) n[r >>> 3] |= parseInt(t.substr(r, 2), 16) << 24 - r % 8 * 4;
                return new s.init(n, e / 2);
            }
        }, u = c.Latin1 = {
            stringify: function(t) {
                var e = t.words;
                t = t.sigBytes;
                for (var n = [], r = 0; r < t; r++) n.push(String.fromCharCode(e[r >>> 2] >>> 24 - r % 4 * 8 & 255));
                return n.join("");
            },
            parse: function(t) {
                for (var e = t.length, n = [], r = 0; r < e; r++) n[r >>> 2] |= (255 & t.charCodeAt(r)) << 24 - r % 4 * 8;
                return new s.init(n, e);
            }
        }, f = c.Utf8 = {
            stringify: function(t) {
                try {
                    return decodeURIComponent(escape(u.stringify(t)));
                } catch (t) {
                    throw Error("Malformed UTF-8 data");
                }
            },
            parse: function(t) {
                return u.parse(unescape(encodeURIComponent(t)));
            }
        }, h = r.BufferedBlockAlgorithm = o.extend({
            reset: function() {
                this._data = new s.init(), this._nDataBytes = 0;
            },
            _append: function(t) {
                "string" == typeof t && (t = f.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes;
            },
            _process: function(e) {
                var n = this._data, r = n.words, i = n.sigBytes, o = this.blockSize, c = i / (4 * o);
                if (e = (c = e ? t.ceil(c) : t.max((0 | c) - this._minBufferSize, 0)) * o, i = t.min(4 * e, i), 
                e) {
                    for (var a = 0; a < e; a += o) this._doProcessBlock(r, a);
                    a = r.splice(0, e), n.sigBytes -= i;
                }
                return new s.init(a, i);
            },
            clone: function() {
                var t = o.clone.call(this);
                return t._data = this._data.clone(), t;
            },
            _minBufferSize: 0
        });
        r.Hasher = h.extend({
            cfg: o.extend(),
            init: function(t) {
                this.cfg = this.cfg.extend(t), this.reset();
            },
            reset: function() {
                h.reset.call(this), this._doReset();
            },
            update: function(t) {
                return this._append(t), this._process(), this;
            },
            finalize: function(t) {
                return t && this._append(t), this._doFinalize();
            },
            blockSize: 16,
            _createHelper: function(t) {
                return function(e, n) {
                    return new t.init(n).finalize(e);
                };
            },
            _createHmacHelper: function(t) {
                return function(e, n) {
                    return new l.HMAC.init(t, n).finalize(e);
                };
            }
        });
        var l = n.algo = {};
        return n;
    }(Math);
    !function() {
        var t = n, e = t.lib.WordArray;
        t.enc.Base64 = {
            stringify: function(t) {
                var e = t.words, n = t.sigBytes, r = this._map;
                t.clamp(), t = [];
                for (var i = 0; i < n; i += 3) for (var o = (e[i >>> 2] >>> 24 - i % 4 * 8 & 255) << 16 | (e[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255) << 8 | e[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255, s = 0; 4 > s && i + .75 * s < n; s++) t.push(r.charAt(o >>> 6 * (3 - s) & 63));
                if (e = r.charAt(64)) for (;t.length % 4; ) t.push(e);
                return t.join("");
            },
            parse: function(t) {
                var n = t.length, r = this._map;
                (i = r.charAt(64)) && -1 != (i = t.indexOf(i)) && (n = i);
                for (var i = [], o = 0, s = 0; s < n; s++) if (s % 4) {
                    var c = r.indexOf(t.charAt(s - 1)) << s % 4 * 2, a = r.indexOf(t.charAt(s)) >>> 6 - s % 4 * 2;
                    i[o >>> 2] |= (c | a) << 24 - o % 4 * 8, o++;
                }
                return e.create(i, o);
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        };
    }(), function(t) {
        function e(t, e, n, r, i, o, s) {
            return ((t = t + (e & n | ~e & r) + i + s) << o | t >>> 32 - o) + e;
        }
        function r(t, e, n, r, i, o, s) {
            return ((t = t + (e & r | n & ~r) + i + s) << o | t >>> 32 - o) + e;
        }
        function i(t, e, n, r, i, o, s) {
            return ((t = t + (e ^ n ^ r) + i + s) << o | t >>> 32 - o) + e;
        }
        function o(t, e, n, r, i, o, s) {
            return ((t = t + (n ^ (e | ~r)) + i + s) << o | t >>> 32 - o) + e;
        }
        for (var s = n, c = (u = s.lib).WordArray, a = u.Hasher, u = s.algo, f = [], h = 0; 64 > h; h++) f[h] = 4294967296 * t.abs(t.sin(h + 1)) | 0;
        u = u.MD5 = a.extend({
            _doReset: function() {
                this._hash = new c.init([ 1732584193, 4023233417, 2562383102, 271733878 ]);
            },
            _doProcessBlock: function(t, n) {
                for (var s = 0; 16 > s; s++) {
                    var c = t[h = n + s];
                    t[h] = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8);
                }
                s = this._hash.words;
                var a, u, h = t[n + 0], l = (c = t[n + 1], t[n + 2]), p = t[n + 3], d = t[n + 4], y = t[n + 5], v = t[n + 6], g = t[n + 7], m = t[n + 8], _ = t[n + 9], x = t[n + 10], k = t[n + 11], w = t[n + 12], S = t[n + 13], B = t[n + 14], b = t[n + 15], z = s[0], C = o(C = o(C = o(C = o(C = i(C = i(C = i(C = i(C = r(C = r(C = r(C = r(C = e(C = e(C = e(C = e(C = s[1], u = e(u = s[2], a = e(a = s[3], z = e(z, C, u, a, h, 7, f[0]), C, u, c, 12, f[1]), z, C, l, 17, f[2]), a, z, p, 22, f[3]), u = e(u, a = e(a, z = e(z, C, u, a, d, 7, f[4]), C, u, y, 12, f[5]), z, C, v, 17, f[6]), a, z, g, 22, f[7]), u = e(u, a = e(a, z = e(z, C, u, a, m, 7, f[8]), C, u, _, 12, f[9]), z, C, x, 17, f[10]), a, z, k, 22, f[11]), u = e(u, a = e(a, z = e(z, C, u, a, w, 7, f[12]), C, u, S, 12, f[13]), z, C, B, 17, f[14]), a, z, b, 22, f[15]), u = r(u, a = r(a, z = r(z, C, u, a, c, 5, f[16]), C, u, v, 9, f[17]), z, C, k, 14, f[18]), a, z, h, 20, f[19]), u = r(u, a = r(a, z = r(z, C, u, a, y, 5, f[20]), C, u, x, 9, f[21]), z, C, b, 14, f[22]), a, z, d, 20, f[23]), u = r(u, a = r(a, z = r(z, C, u, a, _, 5, f[24]), C, u, B, 9, f[25]), z, C, p, 14, f[26]), a, z, m, 20, f[27]), u = r(u, a = r(a, z = r(z, C, u, a, S, 5, f[28]), C, u, l, 9, f[29]), z, C, g, 14, f[30]), a, z, w, 20, f[31]), u = i(u, a = i(a, z = i(z, C, u, a, y, 4, f[32]), C, u, m, 11, f[33]), z, C, k, 16, f[34]), a, z, B, 23, f[35]), u = i(u, a = i(a, z = i(z, C, u, a, c, 4, f[36]), C, u, d, 11, f[37]), z, C, g, 16, f[38]), a, z, x, 23, f[39]), u = i(u, a = i(a, z = i(z, C, u, a, S, 4, f[40]), C, u, h, 11, f[41]), z, C, p, 16, f[42]), a, z, v, 23, f[43]), u = i(u, a = i(a, z = i(z, C, u, a, _, 4, f[44]), C, u, w, 11, f[45]), z, C, b, 16, f[46]), a, z, l, 23, f[47]), u = o(u, a = o(a, z = o(z, C, u, a, h, 6, f[48]), C, u, g, 10, f[49]), z, C, B, 15, f[50]), a, z, y, 21, f[51]), u = o(u, a = o(a, z = o(z, C, u, a, w, 6, f[52]), C, u, p, 10, f[53]), z, C, x, 15, f[54]), a, z, c, 21, f[55]), u = o(u, a = o(a, z = o(z, C, u, a, m, 6, f[56]), C, u, b, 10, f[57]), z, C, v, 15, f[58]), a, z, S, 21, f[59]), u = o(u, a = o(a, z = o(z, C, u, a, d, 6, f[60]), C, u, k, 10, f[61]), z, C, l, 15, f[62]), a, z, _, 21, f[63]);
                s[0] = s[0] + z | 0, s[1] = s[1] + C | 0, s[2] = s[2] + u | 0, s[3] = s[3] + a | 0;
            },
            _doFinalize: function() {
                var e = this._data, n = e.words, r = 8 * this._nDataBytes, i = 8 * e.sigBytes;
                n[i >>> 5] |= 128 << 24 - i % 32;
                var o = t.floor(r / 4294967296);
                for (n[15 + (i + 64 >>> 9 << 4)] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), 
                n[14 + (i + 64 >>> 9 << 4)] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8), 
                e.sigBytes = 4 * (n.length + 1), this._process(), n = (e = this._hash).words, r = 0; 4 > r; r++) i = n[r], 
                n[r] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8);
                return e;
            },
            clone: function() {
                var t = a.clone.call(this);
                return t._hash = this._hash.clone(), t;
            }
        }), s.MD5 = a._createHelper(u), s.HmacMD5 = a._createHmacHelper(u);
    }(Math), function() {
        var t, e = n, r = (t = e.lib).Base, i = t.WordArray, o = (t = e.algo).EvpKDF = r.extend({
            cfg: r.extend({
                keySize: 4,
                hasher: t.MD5,
                iterations: 1
            }),
            init: function(t) {
                this.cfg = this.cfg.extend(t);
            },
            compute: function(t, e) {
                for (var n = (c = this.cfg).hasher.create(), r = i.create(), o = r.words, s = c.keySize, c = c.iterations; o.length < s; ) {
                    a && n.update(a);
                    var a = n.update(t).finalize(e);
                    n.reset();
                    for (var u = 1; u < c; u++) a = n.finalize(a), n.reset();
                    r.concat(a);
                }
                return r.sigBytes = 4 * s, r;
            }
        });
        e.EvpKDF = function(t, e, n) {
            return o.create(n).compute(t, e);
        };
    }(), n.lib.Cipher || function(t) {
        var e = (d = n).lib, r = e.Base, i = e.WordArray, o = e.BufferedBlockAlgorithm, s = d.enc.Base64, c = d.algo.EvpKDF, a = e.Cipher = o.extend({
            cfg: r.extend(),
            createEncryptor: function(t, e) {
                return this.create(this._ENC_XFORM_MODE, t, e);
            },
            createDecryptor: function(t, e) {
                return this.create(this._DEC_XFORM_MODE, t, e);
            },
            init: function(t, e, n) {
                this.cfg = this.cfg.extend(n), this._xformMode = t, this._key = e, this.reset();
            },
            reset: function() {
                o.reset.call(this), this._doReset();
            },
            process: function(t) {
                return this._append(t), this._process();
            },
            finalize: function(t) {
                return t && this._append(t), this._doFinalize();
            },
            keySize: 4,
            ivSize: 4,
            _ENC_XFORM_MODE: 1,
            _DEC_XFORM_MODE: 2,
            _createHelper: function(t) {
                return {
                    encrypt: function(e, n, r) {
                        return ("string" == typeof n ? y : p).encrypt(t, e, n, r);
                    },
                    decrypt: function(e, n, r) {
                        return ("string" == typeof n ? y : p).decrypt(t, e, n, r);
                    }
                };
            }
        });
        e.StreamCipher = a.extend({
            _doFinalize: function() {
                return this._process(!0);
            },
            blockSize: 1
        });
        var u = d.mode = {}, f = function(t, e, n) {
            var r = this._iv;
            r ? this._iv = void 0 : r = this._prevBlock;
            for (var i = 0; i < n; i++) t[e + i] ^= r[i];
        }, h = (e.BlockCipherMode = r.extend({
            createEncryptor: function(t, e) {
                return this.Encryptor.create(t, e);
            },
            createDecryptor: function(t, e) {
                return this.Decryptor.create(t, e);
            },
            init: function(t, e) {
                this._cipher = t, this._iv = e;
            }
        })).extend();
        h.Encryptor = h.extend({
            processBlock: function(t, e) {
                var n = this._cipher, r = n.blockSize;
                f.call(this, t, e, r), n.encryptBlock(t, e), this._prevBlock = t.slice(e, e + r);
            }
        }), h.Decryptor = h.extend({
            processBlock: function(t, e) {
                var n = this._cipher, r = n.blockSize, i = t.slice(e, e + r);
                n.decryptBlock(t, e), f.call(this, t, e, r), this._prevBlock = i;
            }
        }), u = u.CBC = h, h = (d.pad = {}).Pkcs7 = {
            pad: function(t, e) {
                for (var n, r = (n = (n = 4 * e) - t.sigBytes % n) << 24 | n << 16 | n << 8 | n, o = [], s = 0; s < n; s += 4) o.push(r);
                n = i.create(o, n), t.concat(n);
            },
            unpad: function(t) {
                t.sigBytes -= 255 & t.words[t.sigBytes - 1 >>> 2];
            }
        }, e.BlockCipher = a.extend({
            cfg: a.cfg.extend({
                mode: u,
                padding: h
            }),
            reset: function() {
                a.reset.call(this);
                var t = (e = this.cfg).iv, e = e.mode;
                if (this._xformMode == this._ENC_XFORM_MODE) var n = e.createEncryptor; else n = e.createDecryptor, 
                this._minBufferSize = 1;
                this._mode = n.call(e, this, t && t.words);
            },
            _doProcessBlock: function(t, e) {
                this._mode.processBlock(t, e);
            },
            _doFinalize: function() {
                var t = this.cfg.padding;
                if (this._xformMode == this._ENC_XFORM_MODE) {
                    t.pad(this._data, this.blockSize);
                    var e = this._process(!0);
                } else e = this._process(!0), t.unpad(e);
                return e;
            },
            blockSize: 4
        });
        var l = e.CipherParams = r.extend({
            init: function(t) {
                this.mixIn(t);
            },
            toString: function(t) {
                return (t || this.formatter).stringify(this);
            }
        }), p = (u = (d.format = {}).OpenSSL = {
            stringify: function(t) {
                var e = t.ciphertext;
                return ((t = t.salt) ? i.create([ 1398893684, 1701076831 ]).concat(t).concat(e) : e).toString(s);
            },
            parse: function(t) {
                var e = (t = s.parse(t)).words;
                if (1398893684 == e[0] && 1701076831 == e[1]) {
                    var n = i.create(e.slice(2, 4));
                    e.splice(0, 4), t.sigBytes -= 16;
                }
                return l.create({
                    ciphertext: t,
                    salt: n
                });
            }
        }, e.SerializableCipher = r.extend({
            cfg: r.extend({
                format: u
            }),
            encrypt: function(t, e, n, r) {
                r = this.cfg.extend(r);
                var i = t.createEncryptor(n, r);
                return e = i.finalize(e), i = i.cfg, l.create({
                    ciphertext: e,
                    key: n,
                    iv: i.iv,
                    algorithm: t,
                    mode: i.mode,
                    padding: i.padding,
                    blockSize: t.blockSize,
                    formatter: r.format
                });
            },
            decrypt: function(t, e, n, r) {
                return r = this.cfg.extend(r), e = this._parse(e, r.format), t.createDecryptor(n, r).finalize(e.ciphertext);
            },
            _parse: function(t, e) {
                return "string" == typeof t ? e.parse(t, this) : t;
            }
        })), d = (d.kdf = {}).OpenSSL = {
            execute: function(t, e, n, r) {
                return r || (r = i.random(8)), t = c.create({
                    keySize: e + n
                }).compute(t, r), n = i.create(t.words.slice(e), 4 * n), t.sigBytes = 4 * e, l.create({
                    key: t,
                    iv: n,
                    salt: r
                });
            }
        }, y = e.PasswordBasedCipher = p.extend({
            cfg: p.cfg.extend({
                kdf: d
            }),
            encrypt: function(t, e, n, r) {
                return n = (r = this.cfg.extend(r)).kdf.execute(n, t.keySize, t.ivSize), r.iv = n.iv, 
                (t = p.encrypt.call(this, t, e, n.key, r)).mixIn(n), t;
            },
            decrypt: function(t, e, n, r) {
                return r = this.cfg.extend(r), e = this._parse(e, r.format), n = r.kdf.execute(n, t.keySize, t.ivSize, e.salt), 
                r.iv = n.iv, p.decrypt.call(this, t, e, n.key, r);
            }
        });
    }(), function() {
        for (var t = n, e = t.lib.BlockCipher, r = t.algo, i = [], o = [], s = [], c = [], a = [], u = [], f = [], h = [], l = [], p = [], d = [], y = 0; 256 > y; y++) d[y] = 128 > y ? y << 1 : y << 1 ^ 283;
        var v = 0, g = 0;
        for (y = 0; 256 > y; y++) {
            var m = (m = g ^ g << 1 ^ g << 2 ^ g << 3 ^ g << 4) >>> 8 ^ 255 & m ^ 99;
            i[v] = m, o[m] = v;
            var _ = d[v], x = d[_], k = d[x], w = 257 * d[m] ^ 16843008 * m;
            s[v] = w << 24 | w >>> 8, c[v] = w << 16 | w >>> 16, a[v] = w << 8 | w >>> 24, u[v] = w, 
            w = 16843009 * k ^ 65537 * x ^ 257 * _ ^ 16843008 * v, f[m] = w << 24 | w >>> 8, 
            h[m] = w << 16 | w >>> 16, l[m] = w << 8 | w >>> 24, p[m] = w, v ? (v = _ ^ d[d[d[k ^ _]]], 
            g ^= d[d[g]]) : v = g = 1;
        }
        var S = [ 0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54 ];
        r = r.AES = e.extend({
            _doReset: function() {
                for (var t = (n = this._key).words, e = n.sigBytes / 4, n = 4 * ((this._nRounds = e + 6) + 1), r = this._keySchedule = [], o = 0; o < n; o++) if (o < e) r[o] = t[o]; else {
                    var s = r[o - 1];
                    o % e ? 6 < e && 4 == o % e && (s = i[s >>> 24] << 24 | i[s >>> 16 & 255] << 16 | i[s >>> 8 & 255] << 8 | i[255 & s]) : (s = i[(s = s << 8 | s >>> 24) >>> 24] << 24 | i[s >>> 16 & 255] << 16 | i[s >>> 8 & 255] << 8 | i[255 & s], 
                    s ^= S[o / e | 0] << 24), r[o] = r[o - e] ^ s;
                }
                for (t = this._invKeySchedule = [], e = 0; e < n; e++) o = n - e, s = e % 4 ? r[o] : r[o - 4], 
                t[e] = 4 > e || 4 >= o ? s : f[i[s >>> 24]] ^ h[i[s >>> 16 & 255]] ^ l[i[s >>> 8 & 255]] ^ p[i[255 & s]];
            },
            encryptBlock: function(t, e) {
                this._doCryptBlock(t, e, this._keySchedule, s, c, a, u, i);
            },
            decryptBlock: function(t, e) {
                var n = t[e + 1];
                t[e + 1] = t[e + 3], t[e + 3] = n, this._doCryptBlock(t, e, this._invKeySchedule, f, h, l, p, o), 
                n = t[e + 1], t[e + 1] = t[e + 3], t[e + 3] = n;
            },
            _doCryptBlock: function(t, e, n, r, i, o, s, c) {
                for (var a = this._nRounds, u = t[e] ^ n[0], f = t[e + 1] ^ n[1], h = t[e + 2] ^ n[2], l = t[e + 3] ^ n[3], p = 4, d = 1; d < a; d++) {
                    var y = r[u >>> 24] ^ i[f >>> 16 & 255] ^ o[h >>> 8 & 255] ^ s[255 & l] ^ n[p++], v = r[f >>> 24] ^ i[h >>> 16 & 255] ^ o[l >>> 8 & 255] ^ s[255 & u] ^ n[p++], g = r[h >>> 24] ^ i[l >>> 16 & 255] ^ o[u >>> 8 & 255] ^ s[255 & f] ^ n[p++];
                    l = r[l >>> 24] ^ i[u >>> 16 & 255] ^ o[f >>> 8 & 255] ^ s[255 & h] ^ n[p++], u = y, 
                    f = v, h = g;
                }
                y = (c[u >>> 24] << 24 | c[f >>> 16 & 255] << 16 | c[h >>> 8 & 255] << 8 | c[255 & l]) ^ n[p++], 
                v = (c[f >>> 24] << 24 | c[h >>> 16 & 255] << 16 | c[l >>> 8 & 255] << 8 | c[255 & u]) ^ n[p++], 
                g = (c[h >>> 24] << 24 | c[l >>> 16 & 255] << 16 | c[u >>> 8 & 255] << 8 | c[255 & f]) ^ n[p++], 
                l = (c[l >>> 24] << 24 | c[u >>> 16 & 255] << 16 | c[f >>> 8 & 255] << 8 | c[255 & h]) ^ n[p++], 
                t[e] = y, t[e + 1] = v, t[e + 2] = g, t[e + 3] = l;
            },
            keySize: 8
        }), t.AES = e._createHelper(r);
    }(), t.exports = n;
}, function(t, e, n) {
    var r = n(1);
    t.exports = {
        cacheKey: "risk-user-ify-config",
        takUrl: "https://tak.jd.com/tak",
        aes: {
            key: r.enc.Utf8.parse("risktrackingconf"),
            iv: r.enc.Utf8.parse("risktrackingconf")
        },
        url: "https://tak.jd.com/config",
        sendUrl: "https://tak.jd.com/tk.gif",
        configExpire: 3e5
    };
}, function(t, e, n) {
    var r = n(0), i = {};
    t.exports = function() {
        return new Promise(function(t) {
            var e = {};
            wx.getSetting ? wx.getSetting({
                success: function(n) {
                    var o = [];
                    n.authSetting["scope.userInfo"] && (i.user ? e.user = i.user : o.push(r(wx.getUserInfo))), 
                    n.authSetting["scope.userLocation"] && (i.location ? e.location = i.location : o.push(r(wx.getLocation))), 
                    Promise.all(o).then(function(n) {
                        n[0] && (e.user = n[0].userInfo), n[1] && (e.location = n[1]), t(e);
                    });
                }
            }) : t(e);
        });
    };
}, function(t, e, n) {
    function r(t) {
        var e = i.aes, n = e.key, r = e.iv, s = o.enc.Utf8.parse(t);
        return o.AES.encrypt(s, n, {
            iv: r,
            mode: o.mode.CBC,
            padding: o.pad.Pkcs7
        }).ciphertext.toString().toUpperCase();
    }
    var i = n(2), o = n(1), s = n(3), c = n(0);
    t.exports = function(t, e) {
        Date.now() - t.timeStamp > i.configExpire && wx.request({
            url: i.url,
            data: {
                biz: t.biz
            },
            success: function(e) {
                200 === e.statusCode && e && e.data && (t.serverConfig = e.data, t.timeStamp = Date.now());
            }
        }), function(t, e) {
            return new Promise(function(n) {
                var r = [], i = getCurrentPages(), o = i[i.length - 1];
                wx.canIUse("getSystemInfo.success.screenWidth") ? r.push({
                    key: "sr",
                    val: t.sys.screenHeight + "*" + t.sys.screenWidth
                }) : r.push({
                    key: "sr",
                    val: "0*0"
                }), r.push({
                    key: "pin",
                    val: t.pin
                }), r.push({
                    key: "sd",
                    val: 24
                }), r.push({
                    key: "ru",
                    val: o.route || o._route || o.__route__ || ""
                }), r.push({
                    key: "cu",
                    val: o.route || o._route || o.__route__ || ""
                }), r.push({
                    key: "c",
                    val: [ [ "c1", "id" ], [ "c2", "clickUrl" ], [ "c3", "x" ], [ "c4", "y" ] ].map(function(t) {
                        return t[0] + "=" + (e[t[1]] || "");
                    }).join(",")
                }), r.push({
                    key: "i",
                    val: [ [ "i1", "inputdata" ], [ "i2", "textareadata" ] ].map(function(t) {
                        return t[0] + "=" + (e[t[1]] || "");
                    }).join(",")
                }), r.push({
                    key: "m",
                    val: [ [ "m1", "mouseMove" ], [ "m2", "mouseScroll" ], [ "m3", "distance" ], [ "m4", "mouseVelocity" ], [ "m5", "distance" ], [ "m6", "avgDistance" ], [ "m7", "numTouches" ], [ "m8", "monitorType" ] ].map(function(t) {
                        return t[0] + "=" + (e[t[1]] || 0);
                    }).join(",")
                }), r.push({
                    key: "t",
                    val: Date.now()
                }), r.push({
                    key: "biz",
                    val: t.biz
                }), Promise.all([ c(wx.getNetworkType), c(wx.getScreenBrightness) ]).then(function(e) {
                    t.brightness = "", t.net = "", e[0] && (t.net = e[0].networkType), e[1] && (t.brightness = e[1].value.toFixed(2));
                }).then(s).then(function(e) {
                    var i = [ t.sys.version, t.sys.system, t.sys.platform, t.sys.model, t.net, t.bluetooth || "", t.wifi || "", t.nfc, t.brightness ].concat(Array.from({
                        length: 6
                    }, function(t) {
                        return "";
                    }));
                    e.user && (i[9] = e.user.nickName, i[10] = e.user.avatarUrl, i[11] = e.user.city, 
                    i[12] = e.user.country), e.location && (i[13] = e.location.latitude, i[14] = e.location.longitude), 
                    r.push({
                        key: "x",
                        val: i.map(function(t, e) {
                            return "x" + (e + 1) + "=" + t;
                        }).join(",")
                    }), n(r);
                });
            });
        }(t, e).then(function(e) {
            var n = {}, o = {};
            e.forEach(function(t) {
                n[t.key] = "pin" === t.key ? encodeURIComponent(t.val) : t.val, o[t.key] = t.val;
            });
            var s = JSON.stringify(n);
            wx.request({
                url: i.sendUrl,
                data: {
                    biz: t.biz,
                    pin: r(t.pin),
                    tak: t.tak,
                    paramsCode: r(s)
                }
            });
        });
    };
}, function(t, e, n) {
    var r = n(4), i = 0, o = 0, s = 0, c = 0, a = 0, u = 0, f = 0, h = "";
    t.exports = {
        tap: function(t, e) {
            if ((!e.serverConfig || 1 == +e.serverConfig.state) && t.changedTouches.length) {
                var n = t.changedTouches[0], l = n.clientX, p = n.clientY;
                i = l.toFixed(2), o = p.toFixed(2), this.distanceArr || (this.distanceArr = []), 
                void 0 !== this.dx && void 0 !== this.dy || (this.dx = l, this.dy = p), this.dt = Date.now();
                var d = l - this.dx, y = p - this.dy;
                (s = Math.sqrt(d * d + y * y)) > 0 && this.distanceArr.push(s), s = s.toFixed(2), 
                this.distanceArr.length > 10 && this.distanceArr.shift(), c = t.changedTouches.length, 
                a = this.distanceArr.length ? (this.distanceArr.reduce(function(t, e) {
                    return t + e;
                }, 0) / this.distanceArr.length).toFixed(2) : 0, Math.abs(this.dx - l) > 20 || Math.abs(this.dy - p) > 20 ? (u = 1, 
                this.dx = l, this.dy = p) : u = 0, h = t.target.id || "", this.lastTime || (this.lastTime = 0), 
                Date.now() - this.lastTime > 500 && (this.lastTime = Date.now(), r(e, {
                    x: i,
                    y: o,
                    distance: s,
                    avgDistance: a,
                    mouseMove: u,
                    mouseVelocity: f,
                    numTouches: c,
                    id: h,
                    mouseScroll: e.mouseScroll,
                    monitorType: 3
                })), f = 0;
            }
        },
        move: function(t, e) {
            if ((!e.serverConfig || 1 == +e.serverConfig.state) && t.changedTouches.length) {
                var n = t.changedTouches[0], r = n.clientX, i = n.clientY;
                this.oldX || (this.oldX = r, this.oldY = i), this.mt || (this.mt = Date.now());
                var o = Date.now() - this.mt;
                if (o > 300) {
                    var s = r - this.oldX, c = i - this.oldY, a = Math.sqrt(s * s + c * c);
                    f = (a / o * 1e3).toFixed(2), this.mt = Date.now(), this.oldX = r, this.oldY = i;
                }
            }
        }
    };
}, function(t, e, n) {
    var r = n(0), i = {};
    t.exports = function() {
        return r(wx.getSystemInfo).then(function(t) {
            i.sys = t;
        }).then(r(wx.getHCEState)).then(function(t) {
            i.nfc = t ? 1 : 0;
        }).then(function() {
            return Promise.resolve(i);
        });
    };
}, function(t, e, n) {
    function r() {
        var t = getApp().$risk_tak;
        return t ? (a.tak = t, Promise.resolve()) : c(wx.request, {
            data: {
                biz: a.biz
            },
            url: o.takUrl
        }).then(function(t) {
            if (200 !== t.statusCode || !t || !t.data) return Promise.reject("获取tak失败");
            a.tak = getApp().$risk_tak = t.data.replace(/[\n\t\r]/g, "");
        });
    }
    function i() {
        return a.nfc = 0, wx.getHCEState && wx.getHCEState({
            success: function() {
                a.nfc = 1;
            },
            fail: function() {
                a.nfc = 0;
            }
        }), wx.getSystemInfo({
            success: function(t) {
                a.sys = t;
            }
        }), "android" === a.sys.platform && wx.startWifi && wx.startWifi({
            success: function() {
                wx.onGetWifiList && wx.onGetWifiList(function(t) {
                    a.wifi = Array.from(new Set(t.wifiList.map(function(t) {
                        return t.SSID;
                    }))).join(","), wx.stopWifi();
                }), wx.getWifiList && wx.getWifiList();
            }
        }), wx.openBluetoothAdapter && wx.openBluetoothAdapter(), wx.getBluetoothDevices && wx.getBluetoothDevices({
            success: function(t) {
                a.bluetooth = t.devices.map(function(t) {
                    return t.name;
                }).join(",");
            }
        }), wx.closeBluetoothAdapter && wx.closeBluetoothAdapter(), Promise.resolve();
    }
    var o = n(2), s = (n(6), n(5)), c = n(0), a = {};
    t.exports = function(t) {
        a.serverConfig = {}, a.tak = "";
        var e = t.pin, n = t.biz;
        return e ? n ? (a.pin = e, a.biz = n, function() {
            var t = getCurrentPages(), e = t[t.length - 1], n = 0;
            e.$riskUifyTap = function(t) {
                a.scrollTop !== n ? (a.scrollTop = n, a.mouseScroll = 1) : a.mouseScroll = 0, s.tap(t, a);
            }, e.$riskUifyMove = function(t) {
                s.move(t, a);
            };
            var r = e.onPageScroll;
            r && (e.onPageScroll = function(t) {
                r(t), n = t.scrollTop;
            });
        }(), void c(wx.request, {
            url: o.url,
            data: {
                biz: a.biz
            }
        }).then(function(t) {
            if (200 !== t.statusCode || !t || !t.data) return Promise.reject("获取config失败");
            a.serverConfig = t.data, a.timeStamp = Date.now();
        }).then(r).then(i).catch(function(t) {})) : console.warn("risk-uify:请传入biz") : console.warn("risk-uify:请传入pin");
    };
} ]);