var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, t = require("../plugins/promise/es6-promise.min.js").Promise, n = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "https://m.vmall.com", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
    a["content-type"] = a["content-type"] ? a["content-type"] : "application/json", 
    a.Cookie = a.Cookie ? a.Cookie : "euid=" + wx.getStorageSync("euid") + ";uid=" + wx.getStorageSync("userId") + ";__ukmc=" + wx.getStorageSync("ukmc") + ";userName=" + (null != getApp().globalData.userInfo && "" != getApp().globalData.userInfo.nickName ? encodeURIComponent(getApp().globalData.userInfo.nickName) : "hwsc"), 
    a.userId = a.userId ? a.userId : wx.getStorageSync("userId"), a.UA = a.UA ? a.UA : "VMall-MP 1.1.1.0", 
    t.portal = t.portal ? t.portal : "4", t.lang = t.lang ? t.lang : "zh-CN", t.country = t.country ? t.country : "CN", 
    wx.request({
        url: e,
        data: t,
        header: a,
        success: function(o) {
            if (o.data.euid && wx.setStorageSync("euid", o.data.euid), "50001" == o.data.resultCode || "200916" == o.data.resultCode || "9206" == o.data.code || "用户名不能为空。" == o.data.info) {
                getApp().globalData.continueRequestParams = {
                    url: e,
                    data: t,
                    header: a
                };
                var u = wx.getStorageSync("cid") || "", c = wx.getStorageSync("wi") || "", i = m();
                if (wx.clearStorageSync(o), wx.setStorageSync("prdTipsHide", i.prdTipsHide), wx.setStorageSync("maskGuideHide", i.maskGuideHide), 
                wx.setStorageSync("isTipsHadShow", i.isTipsHadShow), wx.setStorageSync("authorizeUserInfo", i.authorizeUserInfo), 
                u && wx.setStorageSync("cid", u), c) {
                    var p = c.substr(0, 201);
                    wx.setStorageSync("wi", p);
                }
                s(getApp(), function(e) {
                    a.Cookie = "euid=" + wx.getStorageSync("euid") + ";uid=" + wx.getStorageSync("userId") + ";__ukmc=" + wx.getStorageSync("ukmc") + ";userName=" + (null != getApp().globalData.userInfo && "" != getApp().globalData.userInfo.nickName ? encodeURIComponent(getApp().globalData.userInfo.nickName) : "hwsc"), 
                    a.userId = a.userId ? a.userId : wx.getStorageSync("userId"), a.UA = a.UA ? a.UA : "VMall-MP 1.1.1.0", 
                    wx.request({
                        url: getApp().globalData.continueRequestParams.url,
                        data: getApp().globalData.continueRequestParams.data,
                        header: getApp().globalData.continueRequestParams.header,
                        success: function(e) {
                            e.data.euid && wx.setStorageSync("euid", e.data.euid), n.successFunc && r(n.successFunc) && n.successFunc(e);
                        },
                        fail: function(e) {
                            n.failFunc && r(n.failFunc) && n.failFunc(e);
                        },
                        complete: function(e) {
                            n.completeFunc && r(n.completeFunc) && n.completeFunc(e);
                        }
                    });
                });
            } else n.successFunc && r(n.successFunc) && n.successFunc(o);
        },
        fail: function(e) {
            n.failFunc && r(n.failFunc) && n.failFunc(e);
        },
        complete: function(e) {
            n.completeFunc && r(n.completeFunc) && n.completeFunc(e);
        }
    });
}, a = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "https://m.vmall.com", n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "text";
    return new t(function(t, r) {
        a["content-type"] = a["content-type"] ? a["content-type"] : "application/json", 
        a.Cookie = a.Cookie ? a.Cookie : "euid=" + wx.getStorageSync("euid") + ";uid=" + wx.getStorageSync("userId") + ";__ukmc=" + wx.getStorageSync("ukmc") + ";userName=" + (null != getApp().globalData.userInfo && "" != getApp().globalData.userInfo.nickName ? encodeURIComponent(getApp().globalData.userInfo.nickName) : "hwsc"), 
        a.userId = a.userId ? a.userId : wx.getStorageSync("userId"), a.UA = a.UA ? a.UA : "VMall-MP 1.1.1.0", 
        n.portal = n.portal ? n.portal : "4", n.lang = n.lang ? n.lang : "zh-CN", n.country = n.country ? n.country : "CN", 
        wx.request({
            url: e,
            data: n,
            header: a,
            responseType: o,
            success: function(u) {
                if (u.data.euid && wx.setStorageSync("euid", u.data.euid), "50001" == u.data.resultCode || "200916" == u.data.resultCode || "9206" == u.data.code || "用户名不能为空。" == u.data.info) {
                    getApp().globalData.continueRequestParams = {
                        url: e,
                        data: n,
                        header: a,
                        responseType: o
                    };
                    var c = wx.getStorageSync("cid") || "", i = wx.getStorageSync("wi") || "", p = m();
                    if (wx.clearStorageSync(u), wx.setStorageSync("prdTipsHide", p.prdTipsHide), wx.setStorageSync("maskGuideHide", p.maskGuideHide), 
                    wx.setStorageSync("isTipsHadShow", p.isTipsHadShow), wx.setStorageSync("authorizeUserInfo", p.authorizeUserInfo), 
                    c && wx.setStorageSync("cid", c), i) {
                        var g = i.substr(0, 201);
                        wx.setStorageSync("wi", g);
                    }
                    s(getApp(), function(e) {
                        a.Cookie = "euid=" + wx.getStorageSync("euid") + ";uid=" + wx.getStorageSync("userId") + ";__ukmc=" + wx.getStorageSync("ukmc") + ";userName=" + (null != getApp().globalData.userInfo && "" != getApp().globalData.userInfo.nickName ? encodeURIComponent(getApp().globalData.userInfo.nickName) : "hwsc"), 
                        a.userId = a.userId ? a.userId : wx.getStorageSync("userId"), a.UA = a.UA ? a.UA : "VMall-MP 1.1.1.0", 
                        wx.request({
                            url: getApp().globalData.continueRequestParams.url,
                            data: getApp().globalData.continueRequestParams.data,
                            header: getApp().globalData.continueRequestParams.header,
                            responseType: getApp().globalData.continueRequestParams.responseType,
                            success: function(e) {
                                e.data.euid && wx.setStorageSync("euid", e.data.euid), t(e);
                            },
                            fail: function(e) {
                                r(e);
                            }
                        });
                    });
                } else t(u);
            },
            fail: function(e) {
                r(e);
            }
        });
    });
}, o = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "https://m.vmall.com", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {
        "content-type": "application/json"
    };
    a["content-type"] = a["content-type"] ? a["content-type"] : "application/json", 
    a.Cookie = a.Cookie ? a.Cookie : "euid=" + wx.getStorageSync("euid") + ";uid=" + wx.getStorageSync("userId") + ";__ukmc=" + wx.getStorageSync("ukmc") + ";userName=" + (null != getApp().globalData.userInfo && "" != getApp().globalData.userInfo.nickName ? encodeURIComponent(getApp().globalData.userInfo.nickName) : "hwsc"), 
    a.userId = a.userId ? a.userId : wx.getStorageSync("userId"), a.UA = a.UA ? a.UA : "VMall-MP 1.1.1.0", 
    t.portal = t.portal ? t.portal : "4", t.lang = t.lang ? t.lang : "zh-CN", t.country = t.country ? t.country : "CN", 
    wx.request({
        url: e,
        data: t,
        header: a,
        method: "POST",
        success: function(o) {
            if (o.data.euid && wx.setStorageSync("euid", o.data.euid), "50001" == o.data.resultCode || "200916" == o.data.resultCode || "9206" == o.data.code || "用户名不能为空。" == o.data.info) {
                getApp().globalData.continueRequestParams = {
                    url: e,
                    data: t,
                    header: a
                };
                var u = wx.getStorageSync("cid") || "", c = wx.getStorageSync("wi") || "", i = m();
                if (wx.clearStorageSync(o), wx.setStorageSync("prdTipsHide", i.prdTipsHide), wx.setStorageSync("maskGuideHide", i.maskGuideHide), 
                wx.setStorageSync("isTipsHadShow", i.isTipsHadShow), wx.setStorageSync("authorizeUserInfo", i.authorizeUserInfo), 
                u && wx.setStorageSync("cid", u), c) {
                    var p = c.substr(0, 201);
                    wx.setStorageSync("wi", p);
                }
                s(getApp(), function(e) {
                    a.Cookie = "euid=" + wx.getStorageSync("euid") + ";uid=" + wx.getStorageSync("userId") + ";__ukmc=" + wx.getStorageSync("ukmc") + ";userName=" + (null != getApp().globalData.userInfo && "" != getApp().globalData.userInfo.nickName ? encodeURIComponent(getApp().globalData.userInfo.nickName) : "hwsc"), 
                    a.userId = wx.getStorageSync("userId"), a.UA = "VMall-MP 1.1.1.0", wx.request({
                        url: getApp().globalData.continueRequestParams.url,
                        data: getApp().globalData.continueRequestParams.data,
                        header: getApp().globalData.continueRequestParams.header,
                        method: "POST",
                        success: function(e) {
                            e.data.euid && wx.setStorageSync("euid", e.data.euid), n.successFunc && r(n.successFunc) && n.successFunc(e);
                        },
                        fail: function(e) {
                            n.failFunc && r(n.failFunc) && n.failFunc(e);
                        },
                        complete: function(e) {
                            n.completeFunc && r(n.completeFunc) && n.completeFunc(e);
                        }
                    });
                });
            } else n.successFunc && r(n.successFunc) && n.successFunc(o);
        },
        fail: function(e) {
            n.failFunc && r(n.failFunc) && n.failFunc(e);
        },
        complete: function(e) {
            n.completeFunc && r(n.completeFunc) && n.completeFunc(e);
        }
    });
}, r = function(e) {
    return "[object Function]" === Object.prototype.toString.call(e);
}, u = function(e) {
    return void 0 === e || null === e || "" === e || "[],{}".includes(JSON.stringify(e)) && 0 === Object.keys(e).length;
}, c = function(e) {
    return [ e.getFullYear(), e.getMonth() + 1, e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds() ].map(i).join("");
}, i = function(e) {
    return (e = e.toString())[1] ? e : "0" + e;
}, s = function(e, t) {
    var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : -1;
    wx.login({
        success: function(o) {
            var c = "", i = {};
            getApp().globalData.userInfo && (c = getApp().globalData.userInfo.nickName || ""), 
            i = -1 == a ? {
                authCode: o.code,
                nickName: c
            } : {
                authCode: o.code,
                nickName: c,
                loginType: a
            }, e.globalData.mp.mpPost(e.globalData.config.service.openApiDomain + "/mcp/miniProgramLogin", i, {
                successFunc: function(o) {
                    if (o && o.data && o.data.success ? (wx.setStorageSync("openId", o.data.openId), 
                    wx.setStorageSync("unionId", o.data.unionId), wx.setStorageSync("userId", o.data.userId), 
                    wx.setStorageSync("ukmc", o.data.ukmc), wx.setStorageSync("rush_info", o.data.rushInfo || ""), 
                    o.data.mpUid && !u(o.data.mpUid) && "null" != o.data.mpUid && " " != o.data.mpUid ? wx.setStorageSync("mpUid", o.data.mpUid) : wx.setStorageSync("mpUid", ""), 
                    isNaN(parseInt(o.data.loginType)) ? -1 == a && (e.globalData.userLoginStatus = 1) : e.globalData.userLoginStatus = parseInt(o.data.loginType) + 1) : -1 == a && (e.globalData.userLoginStatus = 0, 
                    wx.setStorageSync("mpUid", "")), t && r(t) && t(o), n && wx.hideLoading(), -1 == a) {
                        var c = getCurrentPages(), i = c[c.length - 1].route;
                        getApp().globalData.currentPageUrl = i;
                    }
                },
                failFunc: function(o) {
                    -1 == a && (e.globalData.userLoginStatus = 0, wx.setStorageSync("mpUid", "")), t && r(t) && t(o), 
                    n && wx.hideLoading();
                }
            });
        },
        fail: function(e) {
            t && r(t) && t(e), n && wx.hideLoading();
        },
        timeout: getApp().globalData.loginTimeOut
    });
}, p = function(e) {
    return (e = e.toString())[1] ? e : "0" + e;
}, g = function() {
    for (var e = arguments.length, n = Array(e), o = 0; o < e; o++) n[o] = arguments[o];
    return new t(function(e, t) {
        var o = n[0] || e, r = n[1] || t;
        a(getApp().globalData.config.service.openApiDomain + "/csrftoken.js", {}).then(function(e) {
            if (!e.data || 200 != e.statusCode) return r && r(), !1;
            var t = e.data.replace(/^[\s\S]*csrftoken\s=\s"([a-zA-Z0-9-]+)";[\s\S]*$/g, "$1");
            "" == t ? r && r() : o && o(t);
        }, function() {
            r && r();
        });
    });
}, l = function(e, t) {
    t && Object.keys(t).length > 0 && g(function(n) {
        o(e.globalData.config.service.openApiDomain + "/mcp/hianalytics/reportMarketingData", {
            marketingDataCollection: t
        }, {
            successFunc: function(e) {},
            failFunc: function(e) {}
        }, {
            CsrfToken: n
        });
    }, function() {});
}, d = function t(n, a) {
    if (!n || !a || "object" !== (void 0 === n ? "undefined" : e(n)) || "object" !== (void 0 === a ? "undefined" : e(a))) return !1;
    var o = Object.getOwnPropertyNames(n), r = Object.getOwnPropertyNames(a);
    if (o.length != r.length) return !1;
    for (var u in o) {
        var c = o[u];
        if (a[c] && "object" === e(n[c])) {
            if (!t(n[c], a[c])) return !1;
        } else if ("function" == typeof n[c]) {
            if (!a[c]) return !1;
        } else if (n[c] !== a[c]) return !1;
    }
    return !0;
}, f = function(e, t) {
    var n = this, a = [ "push", "pop", "shift", "unshift", "splice", "sort", "reverse" ], o = Array.prototype, r = Object.create(o);
    a.forEach(function(a) {
        var u = o[a];
        r[a] = function() {
            var a = JSON.parse(JSON.stringify(e)), o = u.apply(this, arguments), r = e;
            return !d(r, a) && t.call(n, r, a), o;
        };
    }), e.__proto__ = r;
}, S = function t(n) {
    var a = n.page, o = n.rootProp, r = n.data, u = n.prop, c = n.watchFun, i = n.deep, s = n.data[n.prop];
    i && null !== s && "object" === (void 0 === s ? "undefined" : e(s)) && Object.keys(s).forEach(function(e) {
        t({
            page: a,
            rootProp: o,
            data: s,
            prop: e,
            watchFun: c,
            deep: i
        });
    }), "[object Array]".includes(Object.prototype.toString.call(s)) && f.call(a, s, c), 
    Object.defineProperty(r, u, {
        configurable: !0,
        enumerable: !0,
        set: function(n) {
            if (s === n || d(n, s)) return !1;
            "[object Array]".includes(Object.prototype.toString.call(s)) && f.call(a, s, c);
            var r = -1 !== "[object Object],[object Array]".indexOf(Object.prototype.toString.call(a.data[o])) ? JSON.parse(JSON.stringify(a.data[o])) : a.data[o];
            s = n;
            var u = -1 !== "[object Object],[object Array]".indexOf(Object.prototype.toString.call(a.data[o])) ? JSON.parse(JSON.stringify(a.data[o])) : a.data[o];
            c.call(a, u, r), i && null !== s && "object" === (void 0 === s ? "undefined" : e(s)) && Object.keys(s).forEach(function(e) {
                t({
                    page: a,
                    rootProp: o,
                    data: s,
                    prop: e,
                    watchFun: c,
                    deep: i
                });
            });
        },
        get: function() {
            return s;
        }
    });
}, m = function() {
    var e = void 0, t = void 0, n = void 0, a = void 0;
    return wx.getStorageSync("prdTipsHide") && (e = wx.getStorageSync("prdTipsHide")), 
    wx.getStorageSync("maskGuideHide") && (t = wx.getStorageSync("maskGuideHide")), 
    wx.getStorageSync("isTipsHadShow") && (n = wx.getStorageSync("isTipsHadShow")), 
    wx.getStorageSync("authorizeUserInfo") && (a = wx.getStorageSync("authorizeUserInfo")), 
    {
        prdTipsHide: e,
        maskGuideHide: t,
        isTipsHadShow: n,
        authorizeUserInfo: a
    };
}, y = function(e) {
    function t() {
        return (n = (9301 * n + 49297) % 233280) / 233280;
    }
    var n = new Date().getTime();
    return function(e) {
        return Math.ceil(t() * e);
    };
}(), w = function(e, t) {
    n(getApp().globalData.config.service.openApiDomain + "/mcp/user/queryUserLoginStatus", {}, {
        successFunc: function(n) {
            n.data.login ? r(e) && e() : r(t) && t();
        },
        failFunc: function(e) {
            r(t) && t();
        }
    });
}, h = {
    stop: function(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1e3, a = e.route || e.is || "", o = t ? a + "::x:" + t.currentTarget.offsetLeft + ",y:" + t.currentTarget.offsetTop + ",id:" + t.currentTarget.id : a;
        return getApp().globalData.stopTappedStore = getApp().globalData.stopTappedStore || {}, 
        !!getApp().globalData.stopTappedStore[o] || (getApp().globalData.stopTappedStore[o] = setTimeout(function() {
            getApp().globalData.stopTappedStore[o] = null;
        }, n), !1);
    },
    reset: function(e, t) {
        var n = e ? e.route : "", a = t ? n + "::x:" + t.currentTarget.offsetLeft + ",y:" + t.currentTarget.offsetTop + ",id:" + t.currentTarget.id : n;
        return !u(getApp().globalData.stopTappedStore) && (a && !u(getApp().globalData.stopTappedStore[a]) ? (clearTimeout(getApp().globalData.stopTappedStore[a]), 
        delete getApp().globalData.stopTappedStore[a], !1) : (Object.keys(getApp().globalData.stopTappedStore).forEach(function(e) {
            clearTimeout(getApp().globalData.stopTappedStore[e]);
        }), void (getApp().globalData.stopTappedStore = {})));
    }
}, x = {
    specialChar: function(e) {
        var t = /[^\d\w\u4e00-\u9fa5\u3002\uff1f\uff01\uff0c\u3001\uff1b\uff1a\uff07\uff02\uff08\uff09\uff3b\uff3d\uff5b\uff5d\u2500\u00b7\uff0e\u300a\u300b\u3008\u3009\uff1c\uff1e\u2014\uff3f\uff0a\u25a1\uff0f\u25b2\u25cf\uff5e\u2026\u2192\uff20\uff03\uffe5\uff05\uff06\uff0d\uff1d\uff3c\u3000\u002e\u003f\u0021\u002c\u003b\u003a\u0027\u0022\u0028\u0029\u005b\u005d\u007b\u007d\u003c\u003e\u005f\u002a\u002f\u007e\u0040\u0023\u0025\u0026\u002d\u003d\u005c\u0020]+/g, n = e.replace(t, "");
        return e !== n && n;
    }
};

module.exports = {
    mpGet: n,
    mpPromiseGet: a,
    mpPost: o,
    mpPromisePost: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "https://m.vmall.com", n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {
            "content-type": "application/json"
        };
        return new t(function(t, o) {
            a["content-type"] = a["content-type"] ? a["content-type"] : "application/json", 
            a.Cookie = a.Cookie ? a.Cookie : "euid=" + wx.getStorageSync("euid") + ";uid=" + wx.getStorageSync("userId") + ";__ukmc=" + wx.getStorageSync("ukmc") + ";userName=" + (null != getApp().globalData.userInfo && "" != getApp().globalData.userInfo.nickName ? encodeURIComponent(getApp().globalData.userInfo.nickName) : "hwsc"), 
            a.userId = a.userId ? a.userId : wx.getStorageSync("userId"), a.UA = a.UA ? a.UA : "VMall-MP 1.1.1.0", 
            n.portal = n.portal ? n.portal : "4", n.lang = n.lang ? n.lang : "zh-CN", n.country = n.country ? n.country : "CN", 
            wx.request({
                url: e,
                data: n,
                header: a,
                method: "POST",
                success: function(r) {
                    if (r.data.euid && wx.setStorageSync("euid", r.data.euid), "50001" == r.data.resultCode || "200916" == r.data.resultCode || "9206" == r.data.code || "用户名不能为空。" == r.data.info) {
                        getApp().globalData.continueRequestParams = {
                            url: e,
                            data: n,
                            header: a
                        };
                        var u = wx.getStorageSync("cid") || "", c = wx.getStorageSync("wi") || "", i = m();
                        if (wx.clearStorageSync(r), wx.setStorageSync("prdTipsHide", i.prdTipsHide), wx.setStorageSync("maskGuideHide", i.maskGuideHide), 
                        wx.setStorageSync("isTipsHadShow", i.isTipsHadShow), wx.setStorageSync("authorizeUserInfo", i.authorizeUserInfo), 
                        u && wx.setStorageSync("cid", u), c) {
                            var p = c.substr(0, 201);
                            wx.setStorageSync("wi", p);
                        }
                        s(getApp(), function(e) {
                            a.Cookie = "euid=" + wx.getStorageSync("euid") + ";uid=" + wx.getStorageSync("userId") + ";__ukmc=" + wx.getStorageSync("ukmc") + ";userName=" + (null != getApp().globalData.userInfo && "" != getApp().globalData.userInfo.nickName ? encodeURIComponent(getApp().globalData.userInfo.nickName) : "hwsc"), 
                            a.userId = a.userId ? a.userId : wx.getStorageSync("userId"), a.UA = a.UA ? a.UA : "VMall-MP 1.1.1.0", 
                            wx.request({
                                url: getApp().globalData.continueRequestParams.url,
                                data: getApp().globalData.continueRequestParams.data,
                                header: getApp().globalData.continueRequestParams.header,
                                method: "POST",
                                success: function(e) {
                                    e.data.euid && wx.setStorageSync("euid", e.data.euid), t(e);
                                },
                                fail: function(e) {
                                    o(e);
                                }
                            });
                        });
                    } else t(r);
                },
                fail: function(e) {
                    o(e);
                }
            });
        });
    },
    mpPostForUP: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "https://m.vmall.com", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
        a["content-type"] = a["content-type"] ? a["content-type"] : "application/xml", a.UA = a.UA ? a.UA : "VMall-MP 1.1.1.0", 
        a.Authorization = a.Authorization ? a.Authorization : c(new Date()), wx.request({
            url: e,
            data: t,
            header: a,
            method: "POST",
            success: function(e) {
                n.successFunc && r(n.successFunc) && n.successFunc(e);
            },
            fail: function(e) {
                n.failFunc && r(n.failFunc) && n.failFunc(e);
            },
            complete: function(e) {
                n.completeFunc && r(n.completeFunc) && n.completeFunc(e);
            }
        });
    },
    mpIsFunction: r,
    mpIsEmpty: u,
    mpFormatTime: c,
    mpEncodeScript: function(e) {
        return e && "" != e && (e = (e = (e = (e = (e = String(e)).replace(new RegExp("&", "gm"), "&amp;")).replace(new RegExp(">", "gm"), "&gt;")).replace(new RegExp("<", "gm"), "&lt;")).replace(new RegExp('"', "gm"), "&quot;")), 
        e;
    },
    mpReport: function(e, t) {
        var n = {
            UNIONID: wx.getStorageSync("unionId"),
            OPENID: wx.getStorageSync("opentId"),
            TIME: c(new Date()),
            CPSID: "",
            CPSWI: "",
            CONTENT: {}
        };
        Object.assign(n, {
            CONTENT: t
        }), wx.reportAnalytics(e, n);
    },
    mpLogin: s,
    mpGotoPayment: function(e, t, a) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
        wx.showLoading({
            mask: !0,
            title: "加载中"
        }), 0 != a ? g(function(u) {
            o(e.globalData.config.service.openApiDomain + "/mcp/v1/paymentProcess", {
                orderCode: t,
                openId: wx.getStorageSync("openId"),
                portal: "4"
            }, {
                successFunc: function(o) {
                    wx.removeStorageSync("invoiceInfoForConfirm"), wx.removeStorageSync("confirmVOList"), 
                    wx.removeStorageSync("userInvoiceInfoVO"), o.data.success ? n(o.data.redirectUrl, o.data.redirectPara, {
                        successFunc: function(o) {
                            wx.hideLoading(), o.data.status && "succ" == o.data.status ? (e.globalData.paySuccess = !0, 
                            wx.requestPayment({
                                timeStamp: o.data.timeStamp,
                                nonceStr: o.data.nonceStr,
                                package: o.data.packageName,
                                signType: o.data.signType,
                                paySign: o.data.paySign,
                                success: function(o) {
                                    if ("requestPayment:ok" == o.errMsg) if (wx.showLoading({
                                        mask: !0,
                                        title: "加载中"
                                    }), r) {
                                        var u = {
                                            teamCode: r
                                        };
                                        !function a(o) {
                                            o < 3 ? setTimeout(function() {
                                                n(e.globalData.config.service.openApiDomain + "/mcp/pin/queryAssignTeamInfo", u, {
                                                    successFunc: function(e) {
                                                        var t = e.data;
                                                        if (!t.groupInfo || !t.groupInfo.isUserAttend || 1 != t.groupInfo.isUserAttend) return a(o + 1);
                                                        t.groupInfo.teamCode && (u.teamCode = t.groupInfo.teamCode), wx.hideLoading(), wx.redirectTo({
                                                            url: "/pages/orderSpellDetail/orderSpellDetail?teamCode=" + u.teamCode
                                                        });
                                                    }
                                                });
                                            }, 450) : (wx.hideLoading(), setTimeout(function() {
                                                wx.redirectTo({
                                                    url: "/pages/orderDetail/orderDetail?orderCode=" + t
                                                });
                                            }, 100));
                                        }(0);
                                    } else wx.hideLoading(), wx.redirectTo({
                                        url: "/pages/pay/paySuccess?orderCode=" + t + "&cashPay=" + a
                                    }); else wx.redirectTo({
                                        url: "/pages/pay/payFail?orderCode=" + t + "&cashPay=" + a
                                    });
                                },
                                fail: function(e) {
                                    wx.redirectTo({
                                        url: "/pages/pay/payFail?orderCode=" + t + "&cashPay=" + a
                                    });
                                }
                            })) : wx.redirectTo({
                                url: "/pages/pay/payFail?orderCode=" + t + "&cashPay=" + a
                            });
                        },
                        failFunc: function(e) {
                            wx.hideLoading(), wx.redirectTo({
                                url: "/pages/pay/payFail?orderCode=" + t + "&cashPay=" + a
                            });
                        }
                    }) : (wx.hideLoading(), wx.redirectTo({
                        url: "/pages/pay/payFail?orderCode=" + t + "&cashPay=" + a
                    }));
                },
                failFunc: function(e) {
                    wx.hideLoading(), wx.redirectTo({
                        url: "/pages/pay/payFail?orderCode=" + t + "&cashPay=" + a
                    });
                }
            }, {
                CsrfToken: u
            });
        }, function() {
            wx.hideLoading(), wx.redirectTo({
                url: "/pages/pay/payFail?orderCode=" + t + "&cashPay=" + a
            });
        }) : wx.redirectTo({
            url: "/pages/pay/paySuccess?orderCode=" + t + "&cashPay=" + a
        });
    },
    formatTime: function(e) {
        var t = e.getFullYear(), n = e.getMonth() + 1, a = e.getDate(), o = e.getHours(), r = e.getMinutes(), u = e.getSeconds();
        return [ t, n, a ].map(i).join("-") + " " + [ o, r, u ].map(i).join(":");
    },
    formatNumber: i,
    formatTimeNumber: function(e, t) {
        var n = [ "Y", "M", "D", "h", "m", "s" ], a = [], o = new Date(e);
        a.push(o.getFullYear()), a.push(p(o.getMonth() + 1)), a.push(p(o.getDate())), a.push(p(o.getHours())), 
        a.push(p(o.getMinutes())), a.push(p(o.getSeconds()));
        for (var r in a) t = t.replace(n[r], a[r]);
        return t;
    },
    urlParamToObject: function(e) {
        for (var t = e.split("&"), n = {}, a = 0; a < t.length; a++) {
            var o = t[a].split("=");
            n[o[0]] = o[1];
        }
        return n;
    },
    uuid: function() {
        for (var e = [], t = 0; t < 36; t++) e[t] = "0123456789abcdef".substr(Math.floor(y(1e4) / 1e4 * 16), 1);
        e[14] = "4", e[19] = "0123456789abcdef".substr(3 & e[19] | 8, 1), e[8] = e[13] = e[18] = e[23] = "-";
        var n = e.join("");
        return n;
    },
    encryptAESCBC: function(e, t, a, o, r) {
        var u = {};
        u = t ? {
            key: t,
            context: a
        } : {
            context: a
        }, n(e.globalData.config.service.openApiDomain + "/mcp/hianalytics/getEncrypt", u, {
            successFunc: function(e) {
                e.data.success ? o(e.data) : r();
            },
            failFunc: function(e) {
                r();
            }
        });
    },
    getRandom: function(e, t) {
        if (e > t && e > 0 && t > 0) return parseInt(y(Math.pow(10, 8)) / Math.pow(10, 8) * (e - t + 1) + t);
    },
    strToHexCharCode: function(e) {
        if ("" === e) return "";
        for (var t = [], n = 0; n < e.length; n++) t.push(e.charCodeAt(n).toString(16));
        return t.join("").toUpperCase();
    },
    mpGetWXLocation: function(e, t) {
        wx.getSetting({
            success: function(n) {
                1 == n.authSetting["scope.userLocation"] ? wx.getLocation({
                    type: "wgs84",
                    success: function(t) {
                        e && e(t);
                    },
                    fail: function() {
                        wx.showModal({
                            title: "未允许使用地理位置",
                            content: "请在系统设置-微信里打开允许微信使用地理位置的开关",
                            showCancel: !1,
                            success: function() {
                                t && t(!1);
                            }
                        });
                    }
                }) : wx.getLocation({
                    type: "wgs84",
                    success: function(t) {
                        e && e(t);
                    },
                    fail: function() {
                        t && t(!0);
                    }
                });
            },
            fail: function() {
                t && t(!1);
            }
        });
    },
    mpGetWXAddress: function() {
        return new t(function(e, t) {
            wx.getSetting({
                success: function(n) {
                    n.authSetting["scope.address"] ? wx.chooseAddress({
                        success: function(t) {
                            e(t);
                        }
                    }) : wx.authorize({
                        scope: "scope.address",
                        success: function() {
                            wx.chooseAddress({
                                success: function(t) {
                                    e(t);
                                }
                            });
                        },
                        fail: function() {
                            t();
                        }
                    });
                },
                fail: function() {
                    t();
                }
            });
        });
    },
    getSystemConfig: function(e, t, n) {
        e && e.length > 0 && a(getApp().globalData.config.service.openApiDomain + "/mcp/querySystemConfig", {
            systemConfigKeys: e
        }).then(function(e) {
            var a = e.data;
            a.success && a.systemConfigInfos ? t && t(a.systemConfigInfos) : n && n();
        }, function(e) {
            n && n();
        });
    },
    mpGetQueryString: function(e, t) {
        var n = e.match(new RegExp("[?&]" + t + "=([^&]+)", "i"));
        return null == n || n.length < 1 ? "" : n[1];
    },
    isWithinDeadline: function(e, t) {
        var n = new Date().getTime();
        return n >= e && n <= t;
    },
    stopRepeatClick: function(e, t) {
        if (e && e.currentTarget && e.currentTarget.id) {
            if (wx.getStorageSync(e.currentTarget.id)) {
                var n = wx.getStorageSync(e.currentTarget.id);
                return n.id == e.currentTarget.id && ("true" == n.isStopClick || (n.isStopClick = "true", 
                wx.setStorageSync(e.currentTarget.id, n), setTimeout(function() {
                    n.isStopClick = "false", wx.setStorageSync(e.currentTarget.id, n);
                }, t), !1));
            }
            var a = {
                id: e.currentTarget.id,
                isStopClick: "true"
            };
            return wx.setStorageSync(e.currentTarget.id, a), setTimeout(function() {
                a.isStopClick = "false", wx.setStorageSync(e.currentTarget.id, a);
            }, t), !1;
        }
        return !1;
    },
    getCsrf: g,
    getTemplateConfig: function(e, t, n) {
        e && e.length > 0 && a(getApp().globalData.config.service.openApiDomain + "/mcp/queryTemplate", {
            placeholder: e
        }).then(function(e) {
            e && e.data && e.data.success && e.data.templateMapping ? t && t(e.data.templateMapping) : n && n();
        }, function(e) {
            n && n();
        });
    },
    mpIsArray: function(e) {
        return "[object Array]" == Object.prototype.toString.call(e);
    },
    mpReportMarketMsg: l,
    mpReportFormId: function(e, t, a) {
        a && Object.keys(a).length > 0 && n(t.service.openApiDomain + "/mcp/user/queryUserLoginStatus", {}, {
            successFunc: function(t) {
                t.data.login && l(e, a);
            },
            failFunc: function(e) {}
        });
    },
    mpIsJSONStr: function(e) {
        if ("string" != typeof e) return !1;
        try {
            var t = JSON.parse(e);
            return !("[object Object]" !== Object.prototype.toString.call(t) || !t);
        } catch (e) {
            return !1;
        }
    },
    mpIsFormIdValid: function(e) {
        return e && e.length > 0 && !(e.indexOf(" ") > -1);
    },
    isObjectEqual: d,
    setWatcher: function(e, t) {
        Object.keys(t).forEach(function(n) {
            S({
                page: e,
                rootProp: n,
                data: e.data,
                prop: n,
                watchFun: t[n].handler || t[n],
                deep: t[n].deep
            });
        });
    },
    keepIndexTipsState: m,
    mpQueryUserStatus: w,
    mpCheckAndLogin: function() {
        return new t(function(e, t) {
            w(function() {
                e();
            }, function() {
                s(getApp(), function(n) {
                    n && n.data && n.data.success ? e() : t();
                });
            });
        });
    },
    mpIsCurrentPage: function(e) {
        return e && e.route == getCurrentPages().slice(-1)[0].route;
    },
    mpAuthorizeAndLogin: function(e, t) {
        wx.getSetting({
            success: function(n) {
                n.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(n) {
                        n.userInfo && (getApp().globalData.userInfo = n.userInfo, wx.setStorageSync("authorizeUserInfo", n.userInfo)), 
                        s(getApp(), function(n) {
                            n && n.data && n.data.success ? e && r(e) ? e(n) : getApp().userInfoReadyCallback && getApp().userInfoReadyCallback(n) : t && r(t) && t(n);
                        });
                    },
                    fail: function(e) {
                        t && r(t) && t(e);
                    }
                });
            },
            fail: function(e) {
                t && r(t) && t(e);
            }
        });
    },
    mpCheckUserAuthStatus: function(e, t) {
        null != getApp().globalData.userInfo ? e && r(e) ? e() : getApp().userInfoReadyCallback && getApp().userInfoReadyCallback(res) : wx.getSetting({
            success: function(n) {
                n.authSetting["scope.userInfo"] ? wx.getUserInfo({
                    success: function(n) {
                        n.userInfo ? (getApp().globalData.userInfo = n.userInfo, wx.setStorageSync("authorizeUserInfo", n.userInfo), 
                        e && r(e) ? e(n) : getApp().userInfoReadyCallback && getApp().userInfoReadyCallback(n)) : t && r(t) && t(n);
                    },
                    fail: function(e) {
                        t && r(t) && t(e);
                    }
                }) : t && r(t) && t(n);
            },
            fail: function(e) {
                t && r(t) && t(e);
            }
        });
    },
    repeatTap: h,
    mpBuildAuthReqParam: function(e, t, n) {
        return '<?xml version="1.0" encoding="UTF-8"?><UserThirdAuthReq><version>12011</version><accountType>22</accountType><authFlag>2</authFlag><userAccount>NULL</userAccount><thirdToken>' + e + "</thirdToken><deviceInfo><deviceType>6</deviceType><deviceID>" + t + "</deviceID><terminalType>unknown</terminalType></deviceInfo><reqClientType>2025</reqClientType><loginChannel>26000005</loginChannel><plmn>00000</plmn><uuid>" + n + "</uuid><appID>com.vmall.client</appID><tokenType>1</tokenType><languageCode>zh-CN</languageCode><deviceSecure>0</deviceSecure><mainAcctLogin>1</mainAcctLogin></UserThirdAuthReq>";
    },
    mpBuildAuthSecondReqParam: function(e, t, n, a, o, r) {
        return '<?xml version="1.0" encoding="UTF-8"?><UserThirdAuthReq><version>12011</version><accountType>22</accountType><authFlag>2</authFlag><userAccount>NULL</userAccount><thirdToken>' + e + "</thirdToken><deviceInfo><deviceType>6</deviceType><deviceID>" + t + "</deviceID><terminalType>unknown</terminalType></deviceInfo><reqClientType>2025</reqClientType><loginChannel>26000005</loginChannel><plmn>00000</plmn><uuid>" + n + "</uuid><appID>com.vmall.client</appID><tokenType>1</tokenType><languageCode>zh-CN</languageCode><deviceSecure>0</deviceSecure><mainAcctLogin>1</mainAcctLogin><twoStepVerifyCode>" + a + "</twoStepVerifyCode><verifyAccountType>" + o + "</verifyAccountType><verifyUserAccount>" + r + "</verifyUserAccount></UserThirdAuthReq>";
    },
    vilidateFilter: x,
    isSDKVerBetween: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "0.0.0", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "99.9999.99999999", n = function(e) {
            var t = 1;
            return Number(e.replace(/(\d+)(?:\.|$)/g, function(e, n) {
                return (t *= 2) <= 8 ? ("" + n + new Array(t).join("0")).slice(0, t) : "";
            }));
        }, a = n(wx.getSystemInfoSync().SDKVersion), o = n(e), r = n(t);
        return !(o > a || r < a);
    },
    pageLifetimes: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = getCurrentPages().slice(-1)[0];
        if (u(t)) return !1;
        Object.keys(t).forEach(function(a) {
            var o = "on" + a.replace(/( |^)[a-z]/g, function(e) {
                return e.toUpperCase();
            }), r = "__mpUitl_" + o + "_page__", c = "__mpUitl_" + o + "_components__";
            n[r] = n[r] || n[o], n[c] = n[c] || {}, n[c][e.is] || (n[c][e.is] = t[a]), n[o] = function() {
                for (var e = arguments.length, t = Array(e), a = 0; a < e; a++) t[a] = arguments[a];
                n[r].apply(n, t), !u(n[c]) && Object.keys(n[c]).forEach(function(e) {
                    n[c][e]();
                });
            };
        });
    },
    getTimestamp: function(e) {
        return new Date(e).getTime();
    },
    mpGetIndexByPages: function(e) {
        var t = e, n = "personal", a = -1;
        if (t.length <= 0) return {
            index: a,
            flag: n
        };
        for (var o = t.length - 1; o >= 0; o--) {
            if (t[o].route.indexOf("orderConfirm") > -1) {
                a = o, n = "orderConfirm";
                break;
            }
            if (t[o].route.indexOf("IntegrationCenter") > -1) {
                a = o, n = "IntegrationCenter";
                break;
            }
            if (t[o].route.indexOf("personal") > -1) {
                a = o, n = "personal";
                break;
            }
            if (t[o].route.indexOf("inviteGift") > -1) {
                a = o, n = "inviteGift";
                break;
            }
        }
        return n = "" == n ? "personal" : n, {
            index: a,
            flag: n
        };
    }
};