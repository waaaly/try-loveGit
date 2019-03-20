function t(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e.default = t, e;
}

function e() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
    return new y.default(function(n, r) {
        t > -1 && "" != e ? o("1.9.0").then(function() {
            wx.setTabBarBadge({
                index: t,
                text: e,
                success: function(t) {
                    return n(t);
                },
                fial: function(t) {
                    return r(t);
                }
            });
        }).catch(function(t) {
            r(t);
        }) : r("param err");
    });
}

function n() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1;
    return new y.default(function(e, n) {
        t > -1 ? o("1.9.0").then(function(r) {
            wx.removeTabBarBadge({
                index: t,
                success: function(t) {
                    return e(t);
                },
                fial: function(t) {
                    return n(t);
                }
            });
        }).catch(function(t) {
            e(t);
        }) : n("param err");
    });
}

function r() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1;
    return new y.default(function(e, n) {
        t > -1 ? o("1.9.0").then(function() {
            wx.showTabBarRedDot({
                index: t,
                success: function(t) {
                    return e(t);
                },
                fial: function(t) {
                    return n(t);
                }
            });
        }).catch(function(t) {
            n(t);
        }) : n("param err");
    });
}

function a() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1;
    return new y.default(function(e, n) {
        t > -1 ? o("1.9.0").then(function(r) {
            wx.hideTabBarRedDot({
                index: t,
                success: function(t) {
                    return e(t);
                },
                fial: function(t) {
                    return n(t);
                }
            });
        }).catch(function(t) {
            n(t);
        }) : n("param err");
    });
}

function o(t) {
    var e = void 0;
    B ? e = B : (e = wx.getSystemInfoSync().SDKVersion, B = e);
    var n = i(e, t) >= 0;
    return n ? y.default.resolve(n) : y.default.reject("The current SDKVersion[" + e + "] is too low support this feature");
}

function i(t, e) {
    t = t.split("."), e = e.split(".");
    for (var n = Math.max(t.length, e.length); t.length < n; ) t.push("0");
    for (;e.length < n; ) e.push("0");
    for (var r = 0; r < n; r++) {
        var a = parseInt(t[r]), o = parseInt(e[r]);
        if (a > o) return 1;
        if (a < o) return -1;
    }
    return 0;
}

function u() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", e = arguments[1], n = arguments[2], r = getApp();
    void 0 !== r && (void 0 === r.tabPointList && (r.tabPointList = {}), r.tabPointList["p_" + t + "_" + e] = n);
}

function c() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", e = arguments[1], n = getApp();
    return n && n.tabPointList ? n.tabPointList["p_" + t + "_" + e] : "";
}

function p() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", e = arguments[1], n = getApp();
    n && n.tabPointList && (n.tabPointList["p_" + t + "_" + e] = m.OTHER);
}

function T(t, e, n, r) {
    var a = c(t, e);
    a == m.B ? E.PtagUtils.addPtag(r) : a == m.A && E.PtagUtils.addPtag(n);
}

function s(t, e, n, r) {
    var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "", o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {};
    if (a) {
        var i = getCurrentPages().pop() || "", u = c(t, e);
        u == m.B ? (i.data.ptag = r, A.ReportManager.setCurrentPageAndAddPv(a, R({}, o, {
            ptag: r
        }))) : u == m.A && (i.data.ptag = n, A.ReportManager.setCurrentPageAndAddPv(a, R({}, o, {
            ptag: n
        })));
    }
}

function f(t, e, n) {
    t ? A.ReportManager.addPtagExposure(e) : A.ReportManager.addPtagExposure(n);
}

function _(t) {
    return t && t.ppmsId && t.grayName ? void 0 === b["test_" + t.index + "_" + t.pointQueryType] ? x.getPPMS(t.ppmsId).then(function(e) {
        var n = e.find(function(e) {
            return e.grayName == t.grayName;
        }) || {}, r = "1" === n.grayIsOpen, a = +n.grayFil || 0, o = N.getCookie("visitkey"), i = N.getCookie("jdpin"), u = o.length;
        if (!n || !r || !u) return b["test_" + t.index + "_" + t.pointQueryType] = !1, y.default.resolve(!1);
        var c = +o.slice(o.length - 2), p = n.grayWhiteName.split(",").indexOf(i) > -1, T = 100 === a || a >= c || p;
        return b["test_" + t.index + "_" + t.pointQueryType] = T, y.default.resolve(T);
    }).catch(function(e) {
        return b["test_" + t.index + "_" + t.pointQueryType] = !1, y.default.resolve(!1);
    }) : y.default.resolve(b["test_" + t.index + "_" + t.pointQueryType]) : y.default.resolve(null);
}

function d() {
    return new y.default(function(t, r) {
        y.default.all([ _({
            ppmsId: "28656",
            grayName: "wxapp_cart_price_down_red_dot_abtest",
            pointQueryType: "",
            index: 3
        }), O.pointApi.queryCartSkuNum() ]).then(function(r) {
            var a = v(r, 2), o = a[0], i = a[1];
            if (i && i.cartInfo) {
                var c = i.cartInfo, T = c.type, s = c.Num, f = 1 == T ? I.POINT_TEXT.PRICE_DONW : s > 0 ? s + "" : "";
                f ? (u(I.POINT_QUERY_TYPE.REDPOINT_CART, 3, o ? m.A : m.B), g(1 == T ? D.TEXT : D.NUMBER), 
                o ? e(3, f).then(function(e) {
                    return t(o);
                }).catch(function(e) {
                    return t(null);
                }) : t(o)) : (p(I.POINT_QUERY_TYPE.REDPOINT_CART, 3), n(3).then(h).catch(function(e) {
                    return t(null);
                }));
            } else t(null);
        }).catch(function(e) {
            return t(null);
        });
    });
}

function l() {
    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], r = P();
    t && (g(D.NUMBER), r = D.NUMBER), _({
        ppmsId: "28656",
        grayName: "wxapp_cart_price_down_red_dot_abtest",
        pointQueryType: "",
        index: 3
    }).then(function(t) {
        if (D.TEXT == r) f(t, C.CART_RED_POINT_SEITCH_TO_TAB_A, C.CART_RED_POINT_SEITCH_TO_TAB_B); else {
            var a = N.getCookie("cartNum") || "";
            +a ? t && e(3, a + "").catch(function(t) {
                return console.log(t);
            }) : (p(I.POINT_QUERY_TYPE.REDPOINT_CART, 3), n(3).then(h).catch(function(t) {
                return console.log(t);
            }));
        }
    });
}

function g(t) {
    getApp().cartBadgeType = t;
}

function P() {
    return getApp().cartBadgeType || "";
}

function h() {
    delete getApp().cartBadgeType;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.reportTabCart = exports.reportPvCart = exports.getCartBadgeType = exports.updateCartBadge = exports.setCartTabBadge = exports.getPointSatus = exports.clearTabTabBadge = exports.setTabBadge = exports.clearTabRedDot = exports.setTabRedDot = exports.POINT_TEXT = exports.BADGE_TYPE = exports.POINT_CLEAR_TYPE = exports.POINT_QUERY_TYPE = exports.reportPv = exports.exposure = exports.reportTab = exports.Ptag = void 0;

var v = function() {
    function t(t, e) {
        var n = [], r = !0, a = !1, o = void 0;
        try {
            for (var i, u = t[Symbol.iterator](); !(r = (i = u.next()).done) && (n.push(i.value), 
            !e || n.length !== e); r = !0) ;
        } catch (t) {
            a = !0, o = t;
        } finally {
            try {
                !r && u.return && u.return();
            } finally {
                if (a) throw o;
            }
        }
        return n;
    }
    return function(e, n) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), R = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
}, E = require("../../api/Ptag/Ptag_utils.js"), A = require("../../api/Ptag/report_manager.js"), x = t(require("../biz")), y = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../libs/promise.min")), N = t(require("../cookie-v2/cookie")), O = require("./model"), I = require("./constants"), C = t(require("./ptag_constans")), B = "", b = {}, m = {
    A: 1,
    B: -1,
    OTHER: 0
}, D = {
    TEXT: 2,
    NUMBER: 3
}, U = null;

exports.Ptag = C, exports.reportTab = T, exports.exposure = f, exports.reportPv = s, 
exports.POINT_QUERY_TYPE = I.POINT_QUERY_TYPE, exports.POINT_CLEAR_TYPE = I.POINT_CLEAR_TYPE, 
exports.BADGE_TYPE = D, exports.POINT_TEXT = I.POINT_TEXT, exports.setTabRedDot = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
    return new y.default(function(o, i) {
        (t < 0 || e < 0) && i("param err"), y.default.all([ _(Object.assign(n, {
            pointQueryType: t,
            index: e
        })), O.pointApi.queryUserRedPoint(t) ]).then(function(c) {
            var T = v(c, 2), s = T[0], f = T[1];
            f && f.length > 0 && f[0].num > 0 ? "" == n || "" != n && s ? r(e).then(function(n) {
                u(t, e, m.A), o(!0);
            }) : "" == n || s || (u(t, e, m.B), o(!1)) : a(e).then(function(n) {
                p(t, e), i("the queryUserRedPoint interface returns an empty array");
            }).catch(function(t) {
                return i(t);
            });
        }).catch(function(t) {
            return i(t);
        });
    });
}, exports.clearTabRedDot = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
    return new y.default(function(n, r) {
        (t < 0 || e < 0) && r("param err"), O.pointApi.clearUserRedPoint(t).then(function() {
            p(t, e), a(e).then(function(t) {
                n(t);
            }).catch(function(t) {
                return r(t);
            });
        }).catch(function(t) {
            return r(t);
        });
    });
}, exports.setTabBadge = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1, a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "", o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
    return new y.default(function(i, c) {
        (t < 0 || r < 0) && c("param err"), y.default.all([ _(Object.assign(o, {
            pointQueryType: t,
            index: r
        })), O.pointApi.queryUserRedPoint(t) ]).then(function(T) {
            var s = v(T, 2), f = s[0], _ = s[1];
            _ && _.length > 0 && _[0].num > 0 ? "" == o || "" != o && f ? e(r, a || _[0].num + "").then(function(e) {
                u(t, r, m.A), i(f);
            }) : "" == o || f || (u(t, r, m.B), i(f)) : n(r).then(function(e) {
                p(t, r), c("the queryUserRedPoint interface returns an empty array");
            }).catch(function(t) {
                return c(t);
            });
        }).catch(function(t) {
            return c(t);
        });
    });
}, exports.clearTabTabBadge = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
    return new y.default(function(r, a) {
        (t < 0 || e < 0) && a("param err"), O.pointApi.clearUserRedPoint(t).then(function() {
            p(t, e), n(e).then(function(t) {
                r(t);
            }).catch(function(t) {
                return a(t);
            });
        }).catch(function(t) {
            return a(t);
        });
    });
}, exports.getPointSatus = c, exports.setCartTabBadge = function() {
    d().then(function(t) {
        if (void 0 !== t && null != t) {
            var e = P();
            f(t, e == D.TEXT ? C.CART_RED_POINT_A : C.CART_NUM_RED_POINT_A, e == D.TEXT ? C.CART_RED_POINT_B : C.CART_NUM_RED_POINT_B);
        }
        getApp().event.off("wxapp:switchTab").on("wxapp:switchTab", function() {
            U && clearTimeout(U), U = setTimeout(l, 100);
        });
    });
}, exports.updateCartBadge = l, exports.getCartBadgeType = P, exports.reportPvCart = function() {
    var t = (getCurrentPages().pop() || "").route || "", e = "pages/cart/cart/cart" === t, n = "pages/cart/cart/index" === t ? I.PAGE_URL.TAB_CART : e ? I.PAGE_URL.CART : "";
    if (n && c(I.POINT_QUERY_TYPE.REDPOINT_CART, 3)) {
        var r = P(), a = r == D.TEXT ? C.CART_RED_POINT_A_PV : C.CART_NUM_RED_POINT_A_PV, o = r == D.TEXT ? C.CART_RED_POINT_B_PV : C.CART_NUM_RED_POINT_B_PV;
        s(I.POINT_QUERY_TYPE.REDPOINT_CART, 3, a, o, n);
    }
}, exports.reportTabCart = function() {
    if (c(I.POINT_QUERY_TYPE.REDPOINT_CART, 3)) {
        var t = P(), e = t == D.TEXT ? C.CART_RED_POINT_CART_TAB_A : C.CART_NUM_RED_POINT_CART_TAB_A, n = t == D.TEXT ? C.CART_RED_POINT_CART_TAB_B : C.CART_NUM_RED_POINT_CART_TAB_B;
        T(I.POINT_QUERY_TYPE.REDPOINT_CART, 3, e, n);
    }
};