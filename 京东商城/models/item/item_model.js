function e(e) {
    var t = e && e.message || "活动太火爆了，请稍后重试~", n = {
        url: f.QUERY_PIN_STATUS,
        data: {
            source: 2
        }
    };
    return new i.default(function(e, r) {
        (0, u.getLoginPromise)().then(function(a) {
            (0, o.request)(n).then(function(n) {
                var a = n.body;
                n.header;
                0 == a.errcode && e(a), 13 == a.errcode && ((0, u.doLogin)(), r({
                    code: a.errcode,
                    message: t
                })), r({
                    code: a.errcode,
                    message: a.errmsg
                });
            }).catch(function(e) {
                var t = e.code, n = e.message;
                r({
                    code: t,
                    message: n
                });
            });
        }).catch(function(e) {
            return r({
                code: e,
                message: t
            });
        });
    });
}

function t(e, n) {
    var r = {
        expectPin: (0, c.base64encode)(encodeURIComponent(e)),
        fromtype: "x",
        sceneid: "521392394",
        atk: 9,
        rurl: n
    }, a = {
        url: f.SWITCH_PIN,
        data: r
    };
    return (0, o.request)(a).then(function(e) {
        var n = e.body;
        return 13 == n.retcode ? (0, u.doLogin)().then(function() {
            t();
        }) : 0 == n.retcode ? i.default.resolve({
            code: 0,
            message: "切换成功"
        }) : i.default.reject({
            code: n.retcode,
            message: n.errmsg
        });
    }).catch(function(e) {
        var t = e.code, n = e.message;
        return i.default.reject({
            code: t,
            message: n
        });
    });
}

function n(e) {
    if (null != e) {
        var t = /\d*/i;
        return e.match(t) == e;
    }
    return !1;
}

function r(e, t) {
    var n = [ "日", "一", "二", "三", "四", "五", "六" ], r = function(e, t) {
        for (var n = 0, r = t - (e + "").length; n < r; n++) e = "0" + e;
        return e + "";
    };
    return t.replace(/yyyy|YYYY/, e.getFullYear()).replace(/yy|YY/, r(e.getFullYear() % 100, 2)).replace(/mm|MM/, r(e.getMonth() + 1, 2)).replace(/m|M/g, e.getMonth() + 1).replace(/dd|DD/, r(e.getDate(), 2)).replace(/d|D/g, e.getDate()).replace(/hh|HH/, r(e.getHours(), 2)).replace(/h|H/g, e.getHours()).replace(/ii|II/, r(e.getMinutes(), 2)).replace(/i|I/g, e.getMinutes()).replace(/ss|SS/, r(e.getSeconds(), 2)).replace(/s|S/g, e.getSeconds()).replace(/w/g, e.getDay()).replace(/W/g, n[e.getDay()]);
}

function a(e) {
    switch (e) {
      case -1:
        return "未注册";

      case 50:
      case 59:
        return "注册";

      case 56:
        return "铜牌";

      case 60:
      case 61:
        return "银牌";

      case 62:
        return "金牌";

      case 63:
        return "钻石";

      case 64:
        return "经销商";

      case 110:
        return "VIP";

      case 66:
        return "京东员工";

      case 88:
      case 103:
      case 104:
      case 105:
        return "钻石";

      case 90:
        return "企业";

      case 5001:
      case 5002:
      case 5003:
      case 5004:
      case 5005:
        return "店铺VIP";

      case 6010:
        return "PLUS试用";

      case 6020:
        return "PLUS正式";

      default:
        return "未知";
    }
}

function s(e) {
    if (!e) return !1;
    try {
        return JSON.parse(e.replace("\t", ""));
    } catch (e) {
        return !1;
    }
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.initPromoteData = exports.switchPin = exports.queryPinStatus = exports.checkPinStatus = void 0;

var i = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../libs/promise.min")), o = require("../../common/request/request"), c = require("../../common/base64/base64"), u = require("../../common/login/login"), l = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t.default = e, t;
}(require("../../common/navigator")), f = {
    QUERY_PIN_STATUS: "https://wq.jd.com/pinbind/QueryPinStatus",
    SWITCH_PIN: "https://wq.jd.com/pinbind/switchAccount"
};

exports.checkPinStatus = function(n) {
    var r = n.loginText || "您当前登录的是临时账号，为了您的资产安全，请先登录京东账号", a = n.switchText || "您当前登录的是临时账号，为了您的资产安全，先切换至您的京东账号", s = n.sceneId || 521194460, o = n.pageUrl || "/pages/item/detail/detail", c = n.skuId;
    return new i.default(function(n, i) {
        e({
            message: "网络错误，请稍后重试"
        }).then(function(e) {
            1 == e.defaultFlag ? 1 == e.state || 2 == e.state || 4 == e.state ? wx.showModal({
                title: "温馨提示",
                content: r,
                showCancel: !0,
                confirmText: "去登录",
                confirmColor: "#E93B3D",
                success: function(e) {
                    e.confirm ? l.goto("/pages/my_pages/account/account", {
                        sceneid: s
                    }) : e.cancel && i({
                        status: !1
                    });
                },
                fail: function() {
                    i({
                        status: !1
                    });
                }
            }) : 3 == e.state && wx.showModal({
                title: "温馨提示",
                content: a,
                showCancel: !0,
                confirmText: "去切换",
                confirmColor: "#E93B3D",
                success: function(r) {
                    if (r.confirm) {
                        var a = e.pinList.find(function(e) {
                            return 0 == e.defaultFlag;
                        }), s = a ? a.pin : "";
                        t(s, o + "?sku=" + c).then(function(e) {
                            n({
                                status: !0,
                                pin: s
                            });
                        }).catch(function(e) {
                            i({
                                status: !1,
                                message: "切换失败，请稍后重试"
                            });
                        });
                    }
                },
                fail: function() {
                    i({
                        status: !1
                    });
                }
            }) : n({
                status: !0,
                pin: e.pin || ""
            });
        }).catch(function(e) {
            i({
                status: !1,
                message: e.message || ""
            });
        });
    });
}, exports.queryPinStatus = e, exports.switchPin = t, exports.initPromoteData = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    if (e.pis && e.pis.length) {
        var i = [], o = {};
        try {
            for (var c, l, f, g = e.pis, p = {
                1: "会员特价",
                3: "限购",
                4: "京豆优惠购",
                6: "赠券",
                7: "赠京豆",
                9: "限制",
                10: "赠品",
                11: "封顶",
                15: "满减",
                16: "满送",
                17: "加价购",
                18: "满赠",
                19: "多买优惠",
                20: "团购",
                23: "跨店铺满免",
                29: "赠品池",
                36: "跨店铺满折",
                60: "换购",
                80: "PLUS赠品"
            }, d = {
                15: [ "17" ],
                16: [ "2", "25", "26", "30", "31", "32", "34", "35" ],
                17: [ "4", "12", "29" ],
                18: [ "5", "6", "11", "21", "28" ],
                19: [ "23" ],
                23: [ "16" ],
                36: [ "20", "22" ]
            }, m = 0, h = !1, v = 0, S = g.length; v < S; v++) if (c = g[v], l = (c.pid || "").split("_"), 
            !~(f = (c.etg || "").split(",")).indexOf("11")) for (var x in c) {
                if (t.isPingou && n(x)) {
                    if (![ "15", "16", "17", "18", "19", "23", "36", "60", "10" ].includes(x.toString())) break;
                    if (d[x]) {
                        var y = JSON.parse(c.subextinfo);
                        if (c.subextinfo && y && y.subExtType && d[x].includes(y.subExtType.toString())) break;
                    }
                }
                if (n(x) && p[x]) {
                    ~"15,16,17,18,19,23,36,60".indexOf(x) && m++;
                    var P = {}, w = c.adurl, O = p[x], b = (c[x] || "").replace(/(\.00|\.0[^\d])/g, ""), D = ~b.indexOf("!@@!") ? b.split("!@@!") : [];
                    if ("1" == x) {
                        if (D.length > 0) {
                            var I = ~f.indexOf("16"), T = 1 * D[0];
                            u.isLogin ? "1" == e.hit ? (b = "您享受" + a((~" 5001 5002 5003 5004 5005 ".indexOf(" " + T + " ") ? 1 * e.vl : ~" 6010 6020 ".indexOf(" " + T + " ") ? 1 * e.pl : 1 * e.jl) || T) + "会员" + (I ? "专享" : "") + "价：￥" + D[1], 
                            !I || 50 !== T && 59 !== T || (O = "新人专享", b = "您可享受新用户专享价：￥" + D[1])) : b = I ? "未知" : "成为" + a(T) + "会员可享受会员价，最低￥" + D[1] + "起" : b = I ? "请登录 确认是否可享受该优惠" : a(T) + "会员可享受会员价，最低￥" + D[1] + "起";
                        } else b = "未知";
                        ~b.indexOf("PLUS") && (b = "未知");
                    } else if ("10" == x || "29" == x || "80" == x) {
                        if (!(b = s(D.length > 0 ? D[0] : b)) || !b.length) {
                            b = "未知";
                            break;
                        }
                        var _ = b.filter(function(e) {
                            return e && 2 === e.gt && e.num > 0;
                        });
                        if ("10" === x || "80" === x) _.length > 0 ? ("10" === x && c.customtag && JSON.parse(c.customtag)[2] ? P.name = "组套商品" : P.name = O, 
                        P.title = ("80" === x ? "PLUS会员购买即赠热销商品" : "购买即赠热销商品") + _.length + "件" + (D.length > 0 ? " " + D.slice(1).join("，") : "，赠完即止"), 
                        P.content = _) : b = "未知"; else {
                            var q = c.customtag && "1" == JSON.parse(c.customtag).ifg, N = {}, M = 0;
                            if ((_ = _.filter(function(e) {
                                return e.pno;
                            })).length > 0) for (var L, U = 0, Y = _.length; U < Y; U++) N[(L = _[U]).pno] || (N[L.pno] = {
                                pno: L.pno,
                                poolName: L.poolName,
                                list: []
                            }, M++), N[L.pno].list.push(L);
                            if (b = "未知", M > 0) {
                                var k = [];
                                for (var j in N) N.hasOwnProperty(j) && k.push(N[j]);
                                o.poolList = k, o.poolFlag = q;
                            }
                        }
                    } else if ("15" == x || "23" == x || "36" == x) {
                        var C = new Date().getTime();
                        ~f.indexOf({
                            15: "4",
                            23: "9",
                            36: "14"
                        }[x]) && (O = {
                            15: "跨店铺满减",
                            23: "跨店铺满免",
                            36: "跨店铺满折"
                        }[x], b = 1e3 * c.st < C ? "【" + O + "进行中】" + b : r(new Date(1e3 * c.st), "mm月dd日hh:ii") + "该商品参加" + O + "活动，" + b);
                    }
                    for (var H = 0; H < f.length; H++) if (25 == f[H] || 26 == f[H] || 27 == f[H]) {
                        var J = new Date().getTime();
                        O = {
                            25: "跨自营/店铺满减",
                            26: "跨自营/店铺满免",
                            27: "跨自营/店铺满折"
                        }[f[H]], 1e3 * c.st < J ? (c.customtag && JSON.parse(c.customtag).mli && (O = JSON.parse(c.customtag).mli), 
                        b = "【" + O + "进行中】" + b) : b = r(new Date(1e3 * c.st), "mm月dd日hh:ii") + "该商品参加" + O + "活动，" + b, 
                        h = !0;
                        break;
                    }
                    if ("未知" !== b) {
                        if (P.name || (P.name = O, P.content = b), w || (P.sale = h), P.activityId = l[0] || "", 
                        "3" == x) {
                            var E = c.customtag && JSON.parse(c.customtag) || {};
                            P.activityType = l[1] || "", P.price = E.p || "";
                        }
                        i.push(P);
                    }
                }
            }
            return o.count = m, o.promote = i, o;
        } catch (e) {
            return console.log("[商详]", e), !1;
        }
    }
};