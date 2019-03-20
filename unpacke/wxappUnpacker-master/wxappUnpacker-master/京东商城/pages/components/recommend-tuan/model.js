function e(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
    return r.default = e, r;
}

function r() {
    return n.getUserAddressID() || "19_1607_4773_0";
}

function o(e, r, o) {
    i.report(e, r, o, 586, !1);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getSkuInfo = exports.getRecommendProducts = exports.getTuanPrice = void 0;

var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, n = e(require("../../../common/user_info.js")), c = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../libs/promise.min.js")), u = require("../../../common/request/request.js"), i = e(require("../../../common/fe_report/usability.js")), s = require("../../../common/logger"), a = e(require("../../../common/cookie-v2/cookie")), f = new s.Logger("/model/recommendtuan"), d = {
    recommendTuan: "https://wq.jd.com/pingou_active/QueryPopActivesEx",
    getTuanPrice: "https://wq.jd.com/pingou_core/getskusprice",
    skuInfo: "https://yx.3.cn/service/info.action"
}, l = 5, m = function(e, r) {
    if (!e || "object" != (void 0 === e ? "undefined" : t(e)) || !r || !r.scenario) return e;
    var o = 2 == a.getCookie("wxapp_type") ? "xcx_dl" : "xcx_gw";
    if (!o) return e;
    var n = r.spreadUrl, c = n && "" != n ? o + "_cps_" + r.scenario : o + "_" + r.scenario;
    return e.source = c, e;
};

exports.getTuanPrice = function(e, t) {
    return new c.default(function(n, c) {
        if (e) {
            var i = {
                skuids: e,
                origin: l,
                area: r(),
                businessId: "1000000001",
                callback: "jsonpCBKD"
            };
            i = t ? m(i, t) : i, u.request.get({
                url: d.getTuanPrice,
                data: i
            }).then(function(e) {
                var r = e.body;
                e.header, r && r.length > 0 ? (n(r), o(4, 0, "success")) : (c(), o(4, 1, "fail:" + JSON.stringify(r)));
            }).catch(function(e) {
                var r = e.code, t = e.message;
                c(), o(4, r, "catch Error code:" + r + "message:" + t);
            });
        } else c();
    });
}, exports.getRecommendProducts = function(e, r) {
    return new c.default(function(t, n) {
        if (!e) return n(), !1;
        var c = e.pageNo || 1, i = e.pageSize || 10, s = {
            start_bank: i * (c - 1) + 1,
            end_bank: i * c,
            callback: "getRecommendProductsCb"
        };
        s = r ? m(s, r) : s, u.request.get({
            url: d.recommendTuan,
            data: s
        }).then(function(e) {
            var r = e.body;
            e.header, 0 == r.iRet ? (o(17, 0, "success"), t(r)) : (o(17, r.iRet, "fail: " + r.iRet), 
            n());
        }).catch(function(e) {
            var r = e.code;
            o(17, r, "catch Error code:" + r + "message:" + e.message), n();
        });
    });
}, exports.getSkuInfo = function(e) {
    return f.info("==>>_getSkuInfo"), new c.default(function(t, n) {
        if (e) {
            var c = {
                area: r(),
                u_source: "pingou"
            };
            Array.isArray(e) ? c.ids = e.join(",") : c.id = e, u.request.get({
                url: d.skuInfo,
                encoding: "GBK",
                data: c
            }).then(function(e) {
                var r = e.body;
                e.header, f.info("==>>_getSkuInfo success", r), r ? (t(r), o(22, 0, "success")) : (n(), 
                o(22, 1, "fail"));
            }).catch(function(e) {
                var r = e.code, t = e.message;
                f.info("==>>_getSkuInfo fail", r), n(), o(22, r, "catch Error code:" + r + "message:" + t);
            });
        } else n();
    });
};