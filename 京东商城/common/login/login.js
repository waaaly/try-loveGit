function e(e) {
    if (e && e.__esModule) return e;
    var n = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (n[t] = e[t]);
    return n.default = e, n;
}

function n(e, n, t) {
    var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
    h.umpBiz({
        bizid: e,
        operation: n,
        result: t,
        message: r
    });
}

function t() {
    return new _.default(function(e, t) {
        wx.login({
            success: function(t) {
                n(1002, 1, 0, ""), m.info("wx.login 获取 code 成功"), e(t.code);
            },
            fail: function(e) {
                m.error("wx.login 获取 code 失败: " + e.errMsg), e && e.errMsg && -1 !== e.errMsg.indexOf("meet frequency limit") ? (n(1002, 1, 2, e.errMsg), 
                t(D.WX_LOGIN_LIMIT)) : e && e.errMsg && -1 !== e.errMsg.indexOf("fail login no response") ? (n(1002, 1, 3, e.errMsg), 
                t(D.WX_LOGIN_NO_RESPONSE)) : e && e.errMsg && -1 !== e.errMsg.indexOf("login:fail") ? (n(1002, 1, 4, e.errMsg), 
                t(D.WX_LOGIN_WITH_LOGIN_FAIL)) : (n(1002, 1, 1, e.errMsg), t(D.WX_LOGIN_FAIL));
            }
        });
    });
}

function r() {
    var e = require("../../api/Ptag/Ptag_utils").PtagUtils;
    return new _.default(function(t, r) {
        getApp().event.on("getUserInfoSuccess", function(r) {
            e.addPtag("7608.1.3");
            var o = r.errMsg;
            o && -1 !== o.indexOf("auth") && -1 !== o.indexOf("fail") ? getApp().event.emit("getUserInfoFail", "auth deny") : (e.addPtag("7608.1.2"), 
            e.addPtag("7608.1.4"), p(r), n(1002, 2, 0, ""), getApp().event.off("getUserInfoSuccess"), 
            getApp().event.off("getUserInfoFail"), t(r));
        }), getApp().event.on("getUserInfoFail", function(t) {
            e.addPtag("7608.1.2"), E = Date.now(), f(), getApp().event.off("getUserInfoSuccess"), 
            getApp().event.off("getUserInfoFail"), "auth deny" === t ? (e.addPtag("7608.1.5"), 
            n(1002, 2, 1, D.GET_USER_INFO_AUTH_DENY), r(D.GET_USER_INFO_AUTH_DENY)) : (e.addPtag("7608.1.7"), 
            n(1002, 2, 2, D.GIVE_UP_AUTH), r(D.GIVE_UP_AUTH));
        });
    });
}

function o(e, t) {
    return m.info("微信手Q登录开始: " + e), new _.default(function(o, i) {
        x.get("wqLoginOu", "").then(function(s) {
            var g = {
                code: e,
                ou: s,
                appid: getApp().appId,
                ACRJState: App.ACRJState
            };
            t && (g.encrytData = t.encryptedData, g.signature = t.signature, g.rawData = t.rawData, 
            g.iv = t.iv), I.request.get({
                url: "https://wq.jd.com/mlogin/wxapp/login_lt",
                data: g
            }).then(function(e) {
                var t = e.body, s = t.info;
                if (!s) return n(1002, 3, D.WQ_LOGIN_EMPTY_RES, "wxsq login fail: info is emtpy"), 
                void i(D.WQ_LOGIN_EMPTY_RES);
                var g = {};
                if (g.wid = s.wid, g.open_id = s.wxopenid, g.unionid = s.unionid, g.wq_unionid = s.unionid, 
                g.skey = s.skey, g.pin = s.pin, g.wxapp_openid = s.openid, 200 !== t.retCode && 201 !== t.retCode && 202 !== t.retCode && 203 !== t.retCode && u(g), 
                g.ou = s.ou, x.set("wqLoginOu", s.ou, {
                    expire: "365d"
                }).catch(function() {
                    m.error("wqLogin Ou写 storage 失败");
                }), (0, require("../user_info.js").updateUserData)(g), App.ACRJState = "", [ 0, 100, 101, 102 ].indexOf(t.retCode) >= 0) n(1002, 3, 0, ""), 
                o(D.SUCCESS); else {
                    var d = getCurrentPages();
                    if (!d || 0 === d.length) return n(1002, 3, D.GET_CURRENT_PAGES_FAIL, "get current pages fail"), 
                    void i(D.GET_CURRENT_PAGES_FAIL);
                    var p = d[d.length - 1], f = p.route, _ = 2 == l.getCookie("wxapp_type") ? "pages/pingou/index/index" : "pages/index/index";
                    if (200 === t.retCode && f !== _) {
                        var I = N.base64encode(encodeURIComponent(t.info.pin)), h = f, U = t.info.isDefaultAssets, O = N.base64encode(encodeURIComponent(t.info.otherpin));
                        2 === U ? C.goto("/pages/my_pages/account/account", {
                            rurl: h,
                            sceneid: 521192480,
                            frozen: 2,
                            loginData: g
                        }, "redirectTo") : C.goto("/pages/my_pages/frozenaccount/frozenaccount", {
                            name: I,
                            rurl: h,
                            isDefaultAssets: U,
                            otherPin: O,
                            data: g
                        }, "redirectTo");
                    }
                    if (201 === t.retCode && f !== _) {
                        var A = {
                            rurl: App.accountReturnUrl ? App.accountReturnUrl : 0 == f.indexOf("pages") ? "/" + f : f,
                            sceneid: 521392590,
                            force: 1,
                            loginData: g
                        };
                        if (App.accountReturnUrl = "", "pages/my_pages/account/account" !== f && "pages/h5/index" !== f && 1 !== l.getCookie("wxapp_type")) {
                            var E = "https://wqs.jd.com/my/bindpopupv2/index.shtml";
                            E = w.addUrlParam(E, {
                                returnText: "",
                                returnUrl: f,
                                sceneid: 721394559,
                                ptag: "138268.2.35"
                            }), C.goto("/pages/h5/index", {
                                encode_url: encodeURIComponent(E)
                            });
                        } else "pages/my_pages/account/account" !== f && 1 === l.getCookie("wxapp_type") && C.goto("/pages/my_pages/account/account", A);
                    }
                    if (202 === t.retCode && f !== _) {
                        var y = 0 === f.indexOf("pages") ? "/" + f : f;
                        n(1002, 4, 0, y), App.ACRJState = s.ACRJState;
                        var T = "https://wqs.jd.com/my/towxapp.shtml?rurl=" + y, G = w.addUrlParam(s.ACRJUrl, {
                            returnurl: T
                        });
                        "pages/h5/index" !== f && C.goto("/pages/h5/index", {
                            url: G
                        });
                    }
                    if (203 === t.retCode && f !== _) {
                        var P = s && s.pin || "";
                        P = N.base64encode(encodeURIComponent(P));
                        var R = "https://wqs.jd.com/my/checkaccount.shtml?rurl=" + f + "&wid=" + (s && s.wid || "") + "&sceneid=523394560&curpin=" + P + "&PwdMdfToken=" + (s && s.PwdMdfToken || ""), q = {
                            encode_url: encodeURIComponent(R)
                        };
                        "pages/h5/index" !== f && C.goto("/pages/h5/index", q);
                    }
                    if (28 === t.retCode && (f === _ || "pages/item/detail/detail" === f || p.data.isShowLoginMask)) return n(1002, 3, t.retCode, "wxsq has never auth: " + f), 
                    c(), r().then(function() {
                        return v = null, a();
                    }).then(function(e) {
                        o(e);
                    }).catch(function(e) {
                        i(e);
                    });
                    if (28 !== t.retCode || f === _ || "pages/item/detail/detail" === f || p.data.isShowLoginMask) n(1002, 3, t.retCode, "wxsq login fail"), 
                    i("" + D.WQ_LOGIN_ERROR_CODE + t.retCode); else {
                        n(1002, 3, t.retCode, "wxsq has never auth: " + f), m.info("跳转登录页");
                        var M = getCurrentPages(), S = "pages/h5/index" === f, k = "pages/login/index" === f, j = Date.now() - L > 3e3;
                        j && (L = Date.now()), j && !S && !k && C.goto("/pages/login/index", {
                            rurl: f,
                            returnData: M[M.length - 1].data.__report_props__ || {}
                        }), i("" + D.WQ_LOGIN_ERROR_CODE + t.retCode);
                    }
                }
            }).catch(function(e) {
                var t = e.code, r = e.message;
                n(1002, 3, 999, "wxsq login fail: " + r), m.error(t + ", " + r), i(D.WQ_LOGIN_FAIL);
            });
        });
    });
}

function i(e, r) {
    return Date.now() - E <= 3e3 && !r ? (n(1002, 5, D.BEYOND_MAX_AUTH_DENY_COUNT, "login fail"), 
    _.default.reject(D.BEYOND_MAX_AUTH_DENY_COUNT)) : s() && !e ? (m.info("is login"), 
    _.default.resolve(D.SUCCESS)) : (v || (v = new _.default(function(e, r) {
        m.info("小程序登录开始"), t().then(function(e) {
            return d(e);
        }).then(function(e) {
            return o(e.code, e.userInfo);
        }).then(function(t) {
            n(1002, 5, t, "login success"), g(), m.info("小程序登录成功: " + t), v = null;
            var r = l.getCookie("wxNickName");
            r && "JD用户" !== r ? n(1002, 11, 0, "success") : n(1002, 11, 1, "fail"), (0, O.globalConfigUpdate)("", !0), 
            e(t);
        }).catch(function(e) {
            n(1002, 5, e, "login fail: " + e), n(1002, 9, 5, "error"), g(), m.error("小程序登录失败: " + e), 
            v = null, r(e);
        });
    })), v);
}

function a() {
    if (v) return v;
    var e = Date.now() - A;
    return e < T && y >= G ? (n(1002, 5, D.BEYOND_MAX_LOGIN_COUNT, "login fail: " + D.BEYOND_MAX_LOGIN_COUNT), 
    _.default.reject(D.BEYOND_MAX_LOGIN_COUNT)) : e < T && y < G ? (y += 1, i(!0)) : (A = Date.now(), 
    y = 0, i(!0));
}

function s() {
    var e = l.getCookie("wq_uin"), n = l.getCookie("wq_skey");
    return e && n;
}

function u(e) {
    e.jdpin = e.pin, e.wq_uin = e.wid, e.wq_skey = e.skey, e.cid = "5", l.setCookie({
        data: e,
        defaultExpires: !0
    });
}

function g() {
    var e = getCurrentPages(), n = e.length > 0 && e[e.length - 1];
    n && (wx.showTabBar({
        animation: !0
    }), n.setData({
        loginController: {
            showLogin: !1,
            hideLoginUnAuth: !1
        }
    }));
}

function c() {
    require("../../api/Ptag/report_manager").ReportManager.addPtagExposure("7608.1.1");
    var e = getCurrentPages(), n = e.length > 0 && e[e.length - 1], t = l.getCookie("wxapp_type");
    n && (wx.hideTabBar({
        animation: !0
    }), n.setData({
        loginController: {
            showLogin: !0,
            isPingou: 2 === t,
            hideLoginUnAuth: !!n.data.isHideUnAuth
        }
    }));
}

function d(e) {
    return new _.default(function(t) {
        wx.getUserInfo({
            success: function(r) {
                r && r.userInfo ? (p(r), m.info("tryGetUserInfo成功: " + e), m.info(r), n(1002, 9, 0)) : (f(), 
                m.error("tryGetUserInfo失败: empty userInfo " + e), m.error(r), n(1002, 9, 1, "empty userInfo")), 
                t({
                    code: e,
                    userInfo: r
                });
            },
            fail: function(r) {
                f(), m.error("tryGetUserInfo失败1: " + e), m.error(r && r.errMsg), n(1002, 9, 2, r && r.errMsg), 
                t({
                    code: e,
                    userInfo: !1
                });
            }
        });
    });
}

function p(e) {
    if (e && e.userInfo) {
        var n = require("../user_info.js").updateUserData, t = e.userInfo, r = {
            gender: t.gender,
            province: t.province,
            city: t.city,
            country: t.country,
            wxNickName: t.nickName,
            wxAvatarUrl: t.avatarUrl,
            nickName: t.nickName,
            avatarUrl: t.avatarUrl
        };
        n(r), l.setCookie({
            data: r,
            defaultExpires: !0
        });
    } else f();
}

function f() {
    var e = {
        gender: 1,
        province: "Guangdong",
        city: "Shenzhen",
        country: "China",
        nickName: "JD用户",
        avatarUrl: "https://img11.360buyimg.com/jdphoto/s120x120_jfs/t13840/48/224229347/6400/4eec0fe2/5a0697abN8a425d5c.png",
        wxNickName: "JD用户",
        wxAvatarUrl: "https://img11.360buyimg.com/jdphoto/s120x120_jfs/t13840/48/224229347/6400/4eec0fe2/5a0697abN8a425d5c.png"
    };
    (0, require("../user_info.js").updateUserData)(e), l.setCookie({
        data: e,
        defaultExpires: !0
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.login = exports.clearLoginPromise = exports.afterLogin = exports.isLogin = exports.doLogin = exports.getLoginPromise = void 0;

var l = e(require("../cookie-v2/cookie.js")), _ = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../libs/promise.min.js")), I = require("../request/request.js"), x = e(require("../localStorage")), h = e(require("../fe_report/usability.js")), U = require("../logger.js"), C = e(require("../navigator.js")), N = e(require("../base64/base64.js")), w = e(require("../../common/url_utils")), O = require("../../common/global_config.js"), m = new U.Logger("login"), v = null, A = 0, E = 0, L = 0, y = 0, D = {
    SUCCESS: 0,
    WX_LOGIN_FAIL: 11,
    WX_LOGIN_LIMIT: 12,
    WX_LOGIN_NO_RESPONSE: 14,
    WX_LOGIN_WITH_LOGIN_FAIL: 15,
    WQ_LOGIN_FAIL: 21,
    WQ_LOGIN_EMPTY_RES: 22,
    WQ_LOGIN_ERROR_CODE: 23,
    BEYOND_MAX_LOGIN_COUNT: 31,
    BEYOND_MAX_AUTH_DENY_COUNT: 32,
    GET_USER_INFO_AUTH_DENY: 41,
    GIVE_UP_AUTH: 42,
    GET_CURRENT_PAGES_FAIL: 51
}, T = 3e3, G = 3;

exports.getLoginPromise = i, exports.doLogin = a, exports.isLogin = s, exports.afterLogin = function(e) {
    for (var n = arguments.length, t = Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++) t[r - 1] = arguments[r];
    return i().then(function(n) {
        return e.apply(void 0, t);
    }).catch(function(n) {
        return 1 != n.code ? _.default.reject(n) : a().then(function(n) {
            return e.apply(void 0, t);
        });
    });
}, exports.clearLoginPromise = function() {
    v = null;
};

exports.login = null;