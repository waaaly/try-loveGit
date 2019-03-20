var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
    return typeof n;
} : function(n) {
    return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
};

!function(t, e) {
    "object" == ("undefined" == typeof exports ? "undefined" : n(exports)) && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Ald = e();
}(void 0, function() {
    function t(n) {
        this.app = n;
    }
    function e(n) {
        H = g(), T = n, this.aldstat = new t(this);
    }
    function o(n) {
        var t;
        t = n.scene != rn, rn = n.scene, B = 0, T = n, Q = n.query.ald_share_src, G = n.query.aldsrc || "", 
        K = n.query.ald_share_src, I = Date.now(), en || (N = !1), en = !1, on || (0 !== U && Date.now() - U > 3e4 ? k = g() : t && (k = g())), 
        0 !== U && Date.now() - U < 3e4 && (X = !0), n.query.ald_share_src && "1044" == n.scene && n.shareTicket ? wx.getShareInfo({
            shareTicket: n.shareTicket,
            success: function(n) {
                W = n, D("event", "ald_share_click", JSON.stringify(n));
            }
        }) : n.query.ald_share_src && D("event", "ald_share_click", 1), "" === $ && wx.getSetting({
            withCredentials: !0,
            success: function(n) {
                n.authSetting["scope.userInfo"] && wx.getUserInfo({
                    withCredentials: !0,
                    success: function(n) {
                        var t = v();
                        $ = n, t.ufo = y(n), E = w(n.userInfo.avatarUrl.split("/")), p(t);
                    }
                });
            }
        }), _("app", "show");
    }
    function r() {
        U = Date.now(), "" === $ && wx.getSetting({
            success: function(n) {
                n.authSetting["scope.userInfo"] && wx.getUserInfo({
                    withCredentials: !0,
                    success: function(n) {
                        $ = n, E = w(n.userInfo.avatarUrl.split("/"));
                        var t = v();
                        t.ufo = y(n), p(t);
                    }
                });
            }
        }), _("app", "hide");
    }
    function i(n) {
        V++, D("event", "ald_error_message", n);
    }
    function s(n) {
        nn = n;
    }
    function a() {
        Y = R ? this.$mp.page.route : this.route, x("page", "show"), X = !1;
    }
    function u() {
        Z = Y;
    }
    function c() {
        Z = Y;
    }
    function f() {
        D("event", "ald_pulldownrefresh", 1);
    }
    function l() {
        D("event", "ald_reachbottom", 1);
    }
    function h(n) {
        on = !0;
        var t = S(n.path), e = {};
        for (var o in T.query) "ald_share_src" === o && (e[o] = T.query[o]);
        var r = "";
        if (r = -1 == n.path.indexOf("?") ? n.path + "?" : n.path.substr(0, n.path.indexOf("?")) + "?", 
        "" !== t) for (var o in t) e[o] = t[o];
        e.ald_share_src ? -1 == e.ald_share_src.indexOf(j) && e.ald_share_src.length < 200 && (e.ald_share_src = e.ald_share_src + "," + j) : e.ald_share_src = j;
        for (var i in e) -1 == i.indexOf("ald") && (r += i + "=" + e[i] + "&");
        return n.path = r + "ald_share_src=" + e.ald_share_src, D("event", "ald_share_status", n), 
        n;
    }
    function d() {
        function n() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
        }
        return n() + n() + n() + n() + n() + n() + n() + n();
    }
    function p(n) {
        B++, n.at = k, n.et = Date.now(), n.uu = j, n.v = L, n.ak = q.app_key.replace(/(\t)|(\s)/g, ""), 
        n.wsr = T, n.ifo = N, n.rq_c = B, n.ls = H, wx.Queue.push(function() {
            return new Promise(function(t, e) {
                wx.request({
                    url: "https://" + P + ".aldwx.com/d.html",
                    data: n,
                    header: {
                        AldStat: "MiniApp-Stat",
                        se: C || "",
                        op: O || "",
                        img: E
                    },
                    method: "GET",
                    success: function(n) {
                        t(200 == n.statusCode ? "" : "status error");
                    },
                    fail: function() {
                        t("fail");
                    }
                });
            });
        });
    }
    function v() {
        var n = {};
        for (var t in z) n[t] = z[t];
        return n;
    }
    function w(n) {
        for (var t = "", e = 0; e < n.length; e++) n[e].length > t.length && (t = n[e]);
        return t;
    }
    function g() {
        return "" + Date.now() + Math.floor(1e7 * Math.random());
    }
    function y(n) {
        var t = {};
        for (var e in n) "rawData" != e && "errMsg" != e && (t[e] = n[e]);
        return t;
    }
    function S(n) {
        if (-1 == n.indexOf("?")) return "";
        var t = {};
        return n.split("?")[1].split("&").forEach(function(n) {
            var e = n.split("=")[1];
            t[n.split("=")[0]] = e;
        }), t;
    }
    function m(t) {
        for (var e in t) if ("object" == n(t[e]) && null !== t[e]) return !0;
        return !1;
    }
    function _(n, t) {
        var e = v();
        e.ev = n, e.life = t, e.ec = V, e.st = Date.now(), e.dr = Date.now() - I, G && (e.qr = G, 
        e.sr = G), Q && (e.usr = Q), p(e);
    }
    function x(n, t) {
        var e = v();
        e.ev = n, e.st = Date.now(), e.life = t, e.pp = Y, e.pc = Z, e.dr = Date.now() - I, 
        on && (e.so = 1), on = !1, nn && "{}" != JSON.stringify(nn) && (e.ag = nn), G && (e.qr = G, 
        e.sr = G), Q && (e.usr = Q), X && (e.ps = 1), F || (tn = Y, F = !0, e.ifp = F, e.fp = Y), 
        p(e);
    }
    function D(n, t, e) {
        var o = v();
        o.ev = n, o.tp = t, o.st = J, o.dr = Date.now() - I, e && (o.ct = e), p(o);
    }
    function A(n, t, e) {
        if (n[t]) {
            var o = n[t];
            n[t] = function(n) {
                e.call(this, n, t), o.call(this, n);
            };
        } else n[t] = function(n) {
            e.call(this, n, t);
        };
    }
    function M(n) {
        var t = {};
        for (var s in n) "onLaunch" !== s && "onShow" !== s && "onHide" !== s && "onError" !== s && (t[s] = n[s]);
        return t.onLaunch = function(t) {
            e.call(this, t), "function" == typeof n.onLaunch && n.onLaunch.call(this, t);
        }, t.onShow = function(t) {
            o.call(this, t), n.onShow && "function" == typeof n.onShow && n.onShow.call(this, t);
        }, t.onHide = function() {
            r.call(this), n.onHide && "function" == typeof n.onHide && n.onHide.call(this);
        }, t.onError = function(t) {
            i.call(this, t), n.onError && "function" == typeof n.onError && n.onError.call(this, t);
        }, t;
    }
    function b(n) {
        var t = {};
        for (var e in n) "onLoad" !== e && "onShow" !== e && "onHide" !== e && "onUnload" !== e && "onPullDownRefresh" !== e && "onReachBottom" !== e && "onShareAppMessage" !== e && (t[e] = n[e]);
        return t.onLoad = function(t) {
            s.call(this, t), "function" == typeof n.onLoad && n.onLoad.call(this, t);
        }, t.onShow = function(t) {
            a.call(this), "function" == typeof n.onShow && n.onShow.call(this, t);
        }, t.onHide = function(t) {
            u.call(this), "function" == typeof n.onHide && n.onHide.call(this, t);
        }, t.onUnload = function(t) {
            c.call(this), "function" == typeof n.onUnload && n.onUnload.call(this, t);
        }, t.onReachBottom = function(t) {
            l(), n.onReachBottom && "function" == typeof n.onReachBottom && n.onReachBottom.call(this, t);
        }, t.onPullDownRefresh = function(t) {
            f(), n.onPullDownRefresh && "function" == typeof n.onPullDownRefresh && n.onPullDownRefresh.call(this, t);
        }, n.onShareAppMessage && "function" == typeof n.onShareAppMessage && (t.onShareAppMessage = function(t) {
            var e = n.onShareAppMessage.call(this, t);
            return void 0 === e ? (e = {}, e.path = this.route) : void 0 === e.path && (e.path = this.route), 
            h.call(this, e);
        }), t;
    }
    void 0 === wx.Queue && (wx.Queue = new function() {
        this.concurrency = 4, this.queue = [], this.tasks = [], this.activeCount = 0;
        var n = this;
        this.push = function(t) {
            this.tasks.push(new Promise(function(e, o) {
                var r = function() {
                    n.activeCount++, t().then(function(n) {
                        e(n);
                    }).then(function() {
                        n.next();
                    });
                };
                n.activeCount < n.concurrency ? r() : n.queue.push(r);
            }));
        }, this.all = function() {
            return Promise.all(this.tasks);
        }, this.next = function() {
            n.activeCount--, n.queue.length > 0 && n.queue.shift()();
        };
    }(), wx.Queue.all());
    var q = require("57BEF8B62546F6CF31D890B1C9B4B753.js"), L = "7.2.2", P = "log", R = !1, k = "", H = "", I = 0, U = 0, C = "", O = "", E = "", B = 0, T = "", N = "", j = function() {
        var n = "";
        try {
            n = wx.getStorageSync("aldstat_uuid");
        } catch (t) {
            n = "uuid_getstoragesync";
        }
        if (n) N = !1; else {
            n = d();
            try {
                wx.setStorageSync("aldstat_uuid", n), N = !0;
            } catch (n) {
                wx.setStorageSync("aldstat_uuid", "uuid_getstoragesync");
            }
        }
        return n;
    }(), J = Date.now(), Q = "", G = "", K = "", V = 0, W = "", $ = "", z = {}, F = !1, X = !1, Y = "", Z = "", nn = "", tn = "", en = !0, on = !1, rn = "";
    wx.request({
        url: "https://" + P + ".aldwx.com/config/app.json",
        header: {
            AldStat: "MiniApp-Stat"
        },
        method: "GET",
        success: function(n) {
            200 === n.statusCode && (L < n.data.version && console.warn("您的SDK不是最新版本，请尽快升级！"), 
            n.data.warn && console.warn(n.data.warn), n.data.error && console.error(n.data.error));
        }
    });
    try {
        var sn = wx.getSystemInfoSync();
        z.br = sn.brand, z.pm = sn.model, z.pr = sn.pixelRatio, z.ww = sn.windowWidth, z.wh = sn.windowHeight, 
        z.lang = sn.language, z.wv = sn.version, z.wvv = sn.platform, z.wsdk = sn.SDKVersion, 
        z.sv = sn.system;
    } catch (n) {}
    return wx.getNetworkType({
        success: function(n) {
            z.nt = n.networkType;
        }
    }), wx.getSetting({
        success: function(n) {
            n.authSetting["scope.userLocation"] ? wx.getLocation({
                type: "wgs84",
                success: function(n) {
                    z.lat = n.latitude, z.lng = n.longitude, z.spd = n.speed;
                }
            }) : q.getLocation && wx.getLocation({
                type: "wgs84",
                success: function(n) {
                    z.lat = n.latitude, z.lng = n.longitude, z.spd = n.speed;
                }
            });
        }
    }), t.prototype.sendEvent = function(t, e) {
        if ("" !== t && "string" == typeof t && t.length <= 255) if ("string" == typeof e && e.length <= 255) D("event", t, e); else if ("object" == (void 0 === e ? "undefined" : n(e))) {
            if (JSON.stringify(e).length >= 255) return void console.error("自定义事件参数不能超过255个字符");
            if (m(e)) return void console.error("事件参数，参数内部只支持Number,String等类型，请参考接入文档");
            D("event", t, JSON.stringify(e));
        } else void 0 === e ? D("event", t, !1) : console.error("事件参数必须为String,Object类型,且参数长度不能超过255个字符"); else console.error("事件名称必须为String类型且不能超过255个字符");
    }, t.prototype.sendSession = function(n) {
        if ("" !== n && n) {
            C = n;
            var t = v();
            t.st = Date.now(), t.tp = "session", t.ct = "session", t.ev = "event", "" === $ ? wx.getSetting({
                success: function(n) {
                    n.authSetting["scope.userInfo"] ? wx.getUserInfo({
                        success: function(n) {
                            t.ufo = y(n), E = w(n.userInfo.avatarUrl.split("/")), "" !== W && (t.gid = W), p(t);
                        }
                    }) : "" !== W && (t.gid = W, p(t));
                }
            }) : (t.ufo = $, "" !== W && (t.gid = W), p(t));
        } else console.error("请传入从后台获取的session_key");
    }, t.prototype.sendOpenid = function(n) {
        if ("" !== n && n) {
            O = n;
            var t = v();
            t.st = Date.now(), t.tp = "openid", t.ev = "event", t.ct = "openid", p(t);
        } else console.error("openID不能为空");
    }, q.plugin ? {
        App: function(n) {
            return App(M(n));
        },
        Page: function(n) {
            return Page(b(n));
        },
        MpvueApp: function(n) {
            return R = !0, M(n);
        },
        MpvuePage: function(n) {
            return b(n);
        }
    } : void function() {
        var n = App, t = Page, d = Component;
        App = function(t) {
            A(t, "onLaunch", e), A(t, "onShow", o), A(t, "onHide", r), A(t, "onError", i), n(t);
        }, Page = function(n) {
            var e = n.onShareAppMessage;
            A(n, "onLoad", s), A(n, "onUnload", c), A(n, "onShow", a), A(n, "onHide", u), A(n, "onReachBottom", l), 
            A(n, "onPullDownRefresh", f), void 0 !== e && null !== e && (n.onShareAppMessage = function(n) {
                if (void 0 !== e) {
                    var t = e.call(this, n);
                    return void 0 === t ? (t = {}, t.path = Y) : void 0 === t.path && (t.path = Y), 
                    h(t);
                }
            }), t(n);
        }, Component = function(n) {
            try {
                var t = n.methods.onShareAppMessage;
                A(n.methods, "onLoad", s), A(n.methods, "onUnload", c), A(n.methods, "onShow", a), 
                A(n.methods, "onHide", u), A(n.methods, "onReachBottom", l), A(n.methods, "onPullDownRefresh", f), 
                void 0 !== t && null !== t && (n.methods.onShareAppMessage = function(n) {
                    if (void 0 !== t) {
                        var e = t.call(this, n);
                        return void 0 === e ? (e = {}, e.path = Y) : void 0 === e.path && (e.path = Y), 
                        h(e);
                    }
                }), d(n);
            } catch (t) {
                d(n);
            }
        };
    }();
});