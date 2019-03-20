function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}

function r(e) {
    var t = e.dpicon && 0 != e.dpicon.icon && (3 != e.dpicon.icon && e.jp.length >= 4 || e.jp.length >= 5 && 3 == e.dpicon.icon) && 0 != e.paicon, r = e.jp.length > 5 && e.dpicon && 0 != e.dpicon.icon;
    return t || r;
}

function n() {
    for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments[1], n = 0; n < e.length - 1; n += 2) t ? (r(e[n]) && (e[n].hasClsDoublePrice = !0), 
    r(e[n + 1]) && (e[n + 1].hasClsDoublePrice = !0)) : r(e[n]) || r(e[n + 1]) ? (e[n].hasClsDoublePrice = !0, 
    e[n + 1].hasClsDoublePrice = !0) : (e[n].hasClsDoublePrice = !1, e[n + 1].hasClsDoublePrice = !1);
}

function o(e) {
    var t = e.tp, r = e.yd;
    if (t && r) {
        var n = t.s === r.start && t.e === r.end, o = p.default.unix(+t.s).format("M.D") + "-" + p.default.unix(+t.e).format("M.D"), i = p.default.unix(+r.start).format("M.D") + "-" + p.default.unix(+r.end).format("M.D");
        return n ? {
            yd: {
                content: r.content,
                url: s.getImg(r.url)
            },
            tp: {
                c: t.c,
                p: t.p,
                date: o
            }
        } : (0, p.default)().isBetween(p.default.unix(+r.start), p.default.unix(+r.end)) ? {
            yd: {
                content: r.content + "（" + i + "）",
                url: s.getImg(r.url)
            }
        } : {
            tp: {
                c: t.c,
                p: t.p,
                date: o
            }
        };
    }
    if (t && !r) {
        var u = p.default.unix(+t.s).format("M.D") + "-" + p.default.unix(+t.e).format("M.D");
        return {
            tp: {
                c: t.c,
                p: t.p,
                date: u
            }
        };
    }
    if (!t && r) {
        var a = p.default.unix(+r.start).format("M.D") + "-" + p.default.unix(+r.end).format("M.D");
        return {
            yd: {
                content: r.content + "（" + a + "）",
                url: s.getImg(r.url)
            }
        };
    }
    return null;
}

function i(e, t, r) {
    var n = {
        operation: e,
        result: t,
        message: r,
        bizid: 862
    };
    g.umpBiz(n);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getIconConfig = exports.showHaitunGlobal = exports.setClsDoublePrice = exports.getVParams = exports.isCartPage = exports.getRecommendTopic = exports.getRecommendList = exports.getConfig = void 0;

var u = require("../../common/request/request"), s = t(require("../../common/utils")), a = t(require("../../common/fe_helper.js")), c = t(require("../../common/biz")), l = t(require("../../common/cookie-v2/cookie")), p = e(require("../../libs/moment.min")), f = e(require("../../libs/promise.min.js")), g = t(require("../../common/fe_report/usability.js"));

exports.getConfig = function() {
    var e = {
        enable: 0
    }, t = getCurrentPages(), r = t && t.length > 0 ? t.pop().route : "";
    return c.getPPMS(33214).then(function(t) {
        var n = t.find(function(e) {
            return e.page == r;
        }) || e;
        return Object.assign(e, n, {
            cornerMark: s.getImg(n.cornerMark),
            plusImg: s.getImg(n.plusImg)
        }), f.default.resolve(e);
    }, function(e) {
        i(1, -1, "ppms33214请求数据出错"), f.default.reject(e);
    });
}, exports.getRecommendList = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
    return Object.assign(e, {
        hi: "visitkey:" + l.getCookie("visitkey") + ",pin:" + l.getCookie("pin") + ",openid:" + l.getCookie("open_id") + ",page:" + e.pi
    }), u.request.get({
        url: "https://wq.jd.com/mcoss/reclike/getrecinfo",
        data: e
    }).then(function(e) {
        var r = e.body;
        return r.success ? (r.data.forEach(function(e, t) {
            e.img = a.getImg(e.img, 314, 314), e.psp = o(e);
        }), n(r.data, t), f.default.resolve({
            list: r.data,
            impr: r.impr
        })) : (i(2, -2, r.error_msg || "数据请求失败"), f.default.reject(new Error("message:" + r.error_msg)));
    });
}, exports.getRecommendTopic = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    return e = Object.assign({
        callback: "gettopic",
        topn: 2,
        sceneid: 1,
        count: 2,
        offset: 0
    }, e), u.request.get({
        url: "https://wqcoss.jd.com/mcoss/topic/gettopic",
        data: e
    }).then(function(e) {
        var t = e.body;
        return 0 == t.errcode ? f.default.resolve(t.themes) : f.default.reject(new Error("message:" + t.msg));
    });
}, exports.isCartPage = function(e) {
    var t = getCurrentPages(), r = t && t.length > 0 ? t.pop().route : "";
    return "pages/cart/cart/cart" === r || "pages/cart/cart/index" === r;
}, exports.getVParams = function(e, t) {
    var r = t, n = new RegExp(e + "=([^$|&]*)"), o = r.substr(r.indexOf("?") + 1).match(n);
    return null != o ? o[1] : "";
}, exports.setClsDoublePrice = n, exports.showHaitunGlobal = function() {
    return a.getServerTime() >= 15425568e5;
}, exports.getIconConfig = function() {
    return c.getPPMS(35496).then(function(e) {
        var t = e.find(function(e) {
            return "wxapp_reclike_icon" == e.pageKey;
        }) || [], r = {};
        return t.iconList && t.iconList.forEach(function(e) {
            r[e.key + ""] = {
                imgSrc: s.fixProtocol(e.iconImg) || "",
                width: e.width,
                height: e.height
            };
        }), f.default.resolve(r);
    }, function(e) {
        i(1, -1, "ppms35496请求数据出错"), f.default.reject(e);
    });
};