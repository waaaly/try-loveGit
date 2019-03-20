function e(e) {
    if (Array.isArray(e)) {
        for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
        return r;
    }
    return Array.from(e);
}

function t() {
    var e = getCurrentPages(), t = e[e.length - 1];
    return t ? t.route : "app.js";
}

function r() {
    return Date.now();
}

function n(e) {
    if (!e) return 0;
    var t = ("" + e).match(/^(\d+(?:\.\d+)?)([smhd])$/), n = 0;
    if (t) {
        switch (t[2]) {
          case "m":
            n = 60 * t[1] * 1e3;
            break;

          case "h":
            n = 60 * t[1] * 60 * 1e3;
            break;

          case "d":
            n = 24 * t[1] * 60 * 60 * 1e3;
            break;

          case "s":
          default:
            n = 1e3 * t[1];
        }
        return r() + Math.round(n);
    }
    return 0;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.checkAndClearExpired = exports.checkAndClearAllIfNeeded = exports.getSync = exports.setSync = exports.remove = exports.get = exports.set = void 0;

var o = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../libs/promise.min.js")), c = {
    key: "[localStorage.js]",
    print: function(t, r) {
        var n;
        (n = console)[t].apply(n, [ this.key ].concat(e(r)));
    },
    debug: function() {
        this.print("debug", arguments);
    },
    log: function() {
        this.print("log", arguments);
    },
    info: function() {
        this.print("info", arguments);
    },
    warn: function() {
        this.print("warn", arguments);
    },
    error: function() {
        this.print("error", arguments);
    }
}, a = [ "cookies", "gUserData" ], i = {
    set: function(e, t) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return new o.default(function(o, i) {
            var s = {
                _expire: n(r.expire || "7d"),
                _data: t
            };
            -1 != a.findIndex(function(t) {
                return t == e;
            }) && (s._expire = 987654321e4), wx.setStorage({
                key: e,
                data: s,
                success: function(e) {
                    o(e);
                },
                fail: function(t) {
                    c.log("本地缓存写入失败", e, t), i(t);
                }
            });
        });
    },
    get: function(e, t) {
        return new o.default(function(n, o) {
            e || (t ? n(t) : o({
                errMsg: "key is null"
            })), wx.getStorage({
                key: e,
                success: function(a) {
                    var i = a.data || {}, s = i._expire, u = i._data;
                    s > r() ? n(u) : wx.removeStorage({
                        key: e,
                        success: function(e) {},
                        complete: function() {
                            c.log("本地缓存清除完毕", e), void 0 !== t ? n(t) : o({
                                errMsg: "Storage data expired :("
                            });
                        }
                    });
                },
                fail: function(r) {
                    c.log("本地缓存获取失败", e), void 0 !== t ? n(t) : o(r);
                }
            });
        });
    },
    remove: function(e) {
        return new o.default(function(t, r) {
            wx.removeStorage({
                key: e,
                success: function(e) {
                    t(e);
                },
                fail: function(e) {
                    r(e);
                }
            });
        });
    },
    setSync: function(e, r) {
        var o = {
            _expire: n((arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}).expire || "7d"),
            _data: r
        };
        try {
            wx.setStorageSync(e, o);
        } catch (e) {
            c.warn("wx.setStorageSync failed");
        }
        c.warn("检测到使用同步接口设置本地缓存，请替换为异步的 set 接口！key: " + e + ", page: " + t());
    },
    getSync: function(e) {
        var n = void 0;
        try {
            n = wx.getStorageSync(e);
        } catch (e) {
            c.warn("wx.getStorageSync failed");
        }
        if (c.warn("检测到使用同步接口获取本地缓存，请替换为异步的 get 接口！key: " + e + ", page: " + t()), n) {
            if (n._expire > r()) return n._data;
            try {
                wx.removeStorageSync(e);
            } catch (e) {
                c.warn("wx.removeStorageSync failed");
            }
        }
    },
    checkAndClearAllIfNeeded: function() {
        wx.getStorageInfo({
            success: function(e) {
                e.currentSize > .9 * e.limitSize && (wx.clearStorage(), c.warn("清空本地缓存以防止溢出！", e.currentSize));
            }
        });
    },
    checkAndClearExpired: function() {
        var e = this;
        wx.getStorageInfo({
            success: function(t) {
                c.log("----- 开始清理过期的本地缓存 -----", t.keys), t.keys && "function" == typeof t.keys.forEach && t.keys.forEach(function(t) {
                    e.get(t);
                });
            }
        });
    }
};

exports.set = i.set, exports.get = i.get, exports.remove = i.remove, exports.setSync = i.setSync, 
exports.getSync = i.getSync, exports.checkAndClearAllIfNeeded = i.checkAndClearAllIfNeeded, 
exports.checkAndClearExpired = i.checkAndClearExpired;