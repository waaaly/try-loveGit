function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}

function t(e) {
    if (Array.isArray(e)) {
        for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
        return r;
    }
    return Array.from(e);
}

function r() {
    return {
        wid: "",
        openid: "",
        unionid: "",
        pin: "",
        skey: "",
        wxNickName: "",
        wxAvatarUrl: "",
        avatarUrl: "",
        nickName: "",
        gender: 0,
        province: "",
        city: "",
        country: "",
        userAddressID: "1_72_2819_0",
        userAddress: "北京_朝阳区_三环到四环之间_",
        ou: "",
        isplus: !1,
        jdLevel: 0,
        jdLevelName: "",
        visitkey: "",
        definePin: 0
    };
}

function n(e) {
    Object.assign(j, e), w.set("gUserData", j).then(function(e) {
        A.info(e);
    }).catch(function(e) {
        A.error(e);
    });
}

function o() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", r = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], n = e.split(/,/), o = 2 === n.length ? [ 1 ].concat(t(n)) : n, i = f(o, 3), a = i[0], s = void 0 === a ? 1 : a, d = i[1], u = void 0 === d ? "" : d, c = i[2], l = void 0 === c ? "" : c;
    u = u.trim(), l = l.trim(), "undefined" == u && (u = ""), "undefined" == l && (l = "");
    var p = u && l;
    return r ? p ? s + "," + u + "," + l : "" : p ? u + "," + l : "";
}

function i() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = e.split(/_/).map(function(e) {
        return e || 0;
    }), r = t.length;
    return 4 - r > 0 && (t.length = 4, t = t.fill(0, r)), e = t.join("_");
}

function a(e) {
    var t = "https://wq.jd.com/user/info/QueryJDUserInfo?_=" + Math.round(2147483647 * Math.random());
    v.request.get({
        url: t,
        data: {}
    }).then(function(t) {
        var r = t.body;
        t.header;
        {
            if (13 != r.retcode) return 0 != r.retcode ? (x.umpBiz({
                bizid: "563",
                operation: 2,
                result: r.retcode,
                message: r.msg
            }), void e(r.retcode, {
                code: r.retcode
            })) : void (0 == r.retcode && r.base && (x.umpBiz({
                bizid: "563",
                operation: 2,
                result: 0,
                message: "ret:suc"
            }), j.nickName = r.base.nickname, j.pin = r.base.curPin, j.avatarUrl = r.base.headImageUrl, 
            j.jdLevel = r.base.userLevel, j.jdLevelName = r.base.levelName, j.definePin = r.definePin, 
            j.jdNum = r.base.jdNum, j.jvalue = 90 == j.jdLevel ? 0 : r.base.jvalue, j.pinlist = r.base.pinlist, 
            n(j), m.setCookie({
                data: {
                    pin: r.base.curPin,
                    jdpin: r.base.curPin
                },
                defaultExpires: !0
            }), e && e(r.retcode || 0, r)));
            (0, b.doLogin)().then(function() {
                a(e);
            }).catch(function(e) {
                A.error(e);
            });
        }
    }).catch(function(t) {
        var r = t.code, n = t.message;
        x.umpBiz({
            bizid: "563",
            operation: 2,
            result: r,
            message: n
        }), e && e(r, {
            code: r
        });
    });
}

function s(e) {
    v.request.get({
        url: "https://wq.jd.com/vipplus/GetPlusVerifyStatusInfo",
        data: {
            type: 3,
            scene: "weixin",
            t: Math.round(2147483647 * Math.random())
        }
    }).then(function(t) {
        var r = t.body;
        t.header;
        {
            if (13 != r.retcode) return 0 != r.retcode ? (e(r.retcode, {
                code: r.retcode
            }), void x.umpBiz({
                bizid: "563",
                operation: 16,
                result: r.retcode,
                message: r.msg
            })) : void (0 == r.retcode && r.data && (j.isplus = !0, n({
                isplus: !0
            }), e && e(r.retcode || 0, r), x.umpBiz({
                bizid: "563",
                operation: 16,
                result: 0,
                message: "ret:suc"
            })));
            (0, b.doLogin)().then(function() {
                s(e);
            }).catch(function(e) {
                A.error(e);
            });
        }
    }).catch(function(t) {
        var r = t.code, n = t.message;
        e && e(-1, {
            code: r
        }), x.umpBiz({
            bizid: "563",
            operation: 16,
            result: 999,
            message: n
        });
    });
}

function d(e) {
    A.info("getAccountInfo"), v.request.get({
        url: "https://wq.jd.com/pinbind/accountInfo",
        data: {}
    }).then(function(t) {
        var r = t.body;
        t.header;
        {
            if (13 != r.retcode) return 0 != r.retcode ? (e(r.retcode, {
                code: r.retcode
            }), void x.umpBiz({
                bizid: "563",
                operation: 17,
                result: r.retcode,
                message: r.errmsg
            })) : void (0 == r.retcode && (e && e(r.errcode || 0, r), x.umpBiz({
                bizid: "563",
                operation: 17,
                result: 0,
                message: "ret:suc"
            })));
            (0, b.doLogin)().then(function() {
                d(e);
            }).catch(function(e) {
                A.error(e);
            });
        }
    }).catch(function(t) {
        var r = t.code, n = t.message;
        e && e(-1, {
            code: r
        }), x.umpBiz({
            bizid: "563",
            operation: 17,
            result: 999,
            message: n
        });
    });
}

function u(e) {
    A.info("getUserAllPinInfo"), v.request.get({
        url: "https://wq.jd.com/user/info/GetUserAllPinInfo",
        data: {}
    }).then(function(t) {
        var r = t.body;
        t.header;
        {
            if (13 != r.errcode) return 0 != r.errcode ? (e(r.errcode, {
                code: r.errcode
            }), void x.umpBiz({
                bizid: "558",
                operation: 2,
                result: r.errcode,
                message: r.msg
            })) : void (0 == r.errcode && r.userdata && (e && e(r.retcode || 0, r), x.umpBiz({
                bizid: "558",
                operation: 2,
                result: 0,
                message: "ret:suc"
            })));
            (0, b.doLogin)().then(function() {
                u(e);
            }).catch(function(e) {
                A.error(e);
            });
        }
    }).catch(function(t) {
        var r = t.code, n = t.message;
        e && e(-1, {
            code: r
        }), x.umpBiz({
            bizid: "558",
            operation: 2,
            result: 999,
            message: "ret:error" + n
        });
    });
}

function c() {
    var e = r(), t = 0, n = e.userAddressID, a = e.userAddress, s = "", d = "116.468369,40.003948", u = m.getCookie("wq_addr"), c = u ? u.split(/\|/) : [];
    if (c.length) {
        var l = f(c, 5);
        t = l[0], n = l[1], a = l[2], s = l[3], d = l[4];
    }
    return {
        addressId: t,
        areaId: i(n),
        areaName: a,
        addressName: s,
        coordinate: o(d),
        coordinateWithType: o(d, !0)
    };
}

function l(e) {
    function t() {
        return new p.default(function(e, t) {
            getApp().event.on("authSuccess", function(t) {
                var n = t.errMsg;
                n && -1 !== n.indexOf("auth") && -1 !== n.indexOf("fail") ? getApp().event.emit("authFail", "auth deny") : (r(t), 
                a(), e(t));
            }), getApp().event.on("authFail", function(e) {
                o(), "auth deny" === e ? (a(), t("拒绝授权")) : (a(), t(e || "暂不授权"));
            });
        });
    }
    function r(e) {
        if (e && e.userInfo) {
            var t = e.userInfo, r = {
                gender: t.gender,
                province: t.province,
                city: t.city,
                country: t.country,
                wxNickName: t.nickName,
                wxAvatarUrl: t.avatarUrl,
                nickName: t.nickName,
                avatarUrl: t.avatarUrl
            };
            n(r), m.setCookie({
                data: r,
                defaultExpires: !0
            });
        } else o();
    }
    function o() {
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
        n(e), m.setCookie({
            data: e,
            defaultExpires: !0
        });
    }
    function i() {
        var e = getCurrentPages(), t = e[e.length - 1], r = m.getCookie("wxapp_type");
        wx.hideTabBar({
            animation: !0
        }), t.setData({
            authController: {
                showAuth: !0,
                isPingou: 2 === r
            }
        });
    }
    function a() {
        var e = getCurrentPages(), t = e[e.length - 1];
        wx.showTabBar({
            animation: !0
        }), t.setData({
            authController: {
                showAuth: !1
            }
        });
    }
    function s() {
        var e = getCurrentPages(), r = e[e.length - 1], n = r.route;
        return y = Date.now(), r && r.data.isShowAuthMask ? (i(), t()) : ("pages/login/index" !== n && g.goto("/pages/login/index", {
            rurl: n,
            returnData: r.data.__report_props__ || {}
        }), p.default.reject("跳转授权页"));
    }
    return !e && Date.now() - y <= 5e3 ? p.default.reject("5秒内只允许授权一次") : new p.default(function(e, t) {
        wx.getSetting({
            success: function(n) {
                n && n.authSetting && n.authSetting["scope.userInfo"] ? wx.getUserInfo({
                    success: function(t) {
                        r(t), e();
                    },
                    fail: function(r) {
                        console.error(r), s().then(function() {
                            e();
                        }).catch(function(e) {
                            t(e);
                        });
                    }
                }) : s().then(function() {
                    e();
                }).catch(function(e) {
                    t(e);
                });
            },
            fail: function(r) {
                console.error(r), s().then(function() {
                    e();
                }).catch(function(e) {
                    t(e);
                });
            }
        });
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getUserPublicInfo = exports.getWXAuth = exports.getAddress = exports.updateAddress = exports.getPlusUserInfo = exports.getAccountInfo = exports.getUserAllPinInfo = exports.getUserInfo = exports.initUserData = exports.updateUserData = exports.getUserAddressDes = exports.getUserAddressID = exports.gUserData = void 0;

var f = function() {
    function e(e, t) {
        var r = [], n = !0, o = !1, i = void 0;
        try {
            for (var a, s = e[Symbol.iterator](); !(n = (a = s.next()).done) && (r.push(a.value), 
            !t || r.length !== t); n = !0) ;
        } catch (e) {
            o = !0, i = e;
        } finally {
            try {
                !n && s.return && s.return();
            } finally {
                if (o) throw i;
            }
        }
        return r;
    }
    return function(t, r) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, r);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), p = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../libs/promise.min")), g = e(require("./navigator.js")), m = e(require("./cookie-v2/cookie.js")), h = require("./logger.js"), v = require("./request/request.js"), x = e(require("./fe_report/usability.js")), b = require("./login/login.js"), w = e(require("./localStorage.js")), j = null, A = new h.Logger("userinfo"), y = 0;

exports.gUserData = function() {
    return j;
}, exports.getUserAddressID = function() {
    return c().areaId;
}, exports.getUserAddressDes = function() {
    return c().areaName;
};

exports.updateUserData = n, exports.initUserData = function() {
    j || (j = w.getSync("gUserData") ? w.getSync("gUserData") : r());
}, exports.getUserInfo = a, exports.getUserAllPinInfo = u, exports.getAccountInfo = d, 
exports.getPlusUserInfo = s, exports.updateAddress = function(e) {
    (e.jdaddrname || e.jdaddrid) && A.error("请设置 wq_addr 值，字段jdaddrname 和 jdaddrid 已废弃，参见：http://git.jd.com/wxapp/wxapp/wikis/wq_addr_explain");
    var t = r(), a = t.userAddress, s = t.userAddressID, d = e.wq_addr ? e.wq_addr.split(/\|/) : [ e.addressId, e.areaId, e.areaName, e.addressName, e.coordinate ], u = f(d, 5), c = u[0], l = u[1], p = u[2], g = u[3], h = u[4], v = {
        wq_addr: [ c || 0, i(l || s), p || a, g || "", o(h) ].join("|")
    };
    e.jdaddrid && e.jdaddrname && Object.assign(v, {
        jdAddrId: e.jdaddrid,
        jdAddrName: e.jdaddrname
    }), m.setCookie({
        data: v,
        defaultExpires: !0
    }), n(v);
}, exports.getAddress = c, exports.getWXAuth = l, exports.getUserPublicInfo = function(e) {
    var t = m.getCookie("wxNickName"), r = m.getCookie("wxAvatarUrl");
    return t && r && "JD用户" !== t && "https://img11.360buyimg.com/jdphoto/s120x120_jfs/t13840/48/224229347/6400/4eec0fe2/5a0697abN8a425d5c.png" !== r ? (x.umpBiz({
        bizid: 1002,
        operation: 10,
        result: 0,
        message: ""
    }), p.default.resolve({
        wxNickName: t,
        wxAvatarUrl: r
    })) : new p.default(function(t, r) {
        l(e).then(function() {
            x.umpBiz({
                bizid: 1002,
                operation: 10,
                result: 1,
                message: "授权成功"
            }), t({
                wxNickName: m.getCookie("wxNickName"),
                wxAvatarUrl: m.getCookie("wxAvatarUrl")
            });
        }).catch(function(e) {
            "拒绝授权" === e ? x.umpBiz({
                bizid: 1002,
                operation: 10,
                result: 2,
                message: e
            }) : "暂不授权" === e ? x.umpBiz({
                bizid: 1002,
                operation: 10,
                result: 3,
                message: e
            }) : "跳转授权页" === e ? console.log(e) : "5秒内只允许授权一次" === e ? x.umpBiz({
                bizid: 1002,
                operation: 10,
                result: 4,
                message: e
            }) : x.umpBiz({
                bizid: 1002,
                operation: 10,
                result: 5,
                message: e && e.toString()
            }), r(e);
        });
    });
};