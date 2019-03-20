function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function o(e) {
    if (e && e.__esModule) return e;
    var o = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (o[t] = e[t]);
    return o.default = e, o;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.fetchBaiTiaoData = exports.removeRedIcon = exports.getRedIcon = exports.getJDGiftCards = exports.loadBalance = exports.couponsFilter = exports.loadCouponData = void 0;

var t = o(require("../../../models/assets_data")), r = e(require("../../../../../libs/promise.min")), n = e(require("../../../../../common/wxcontext")), a = o(require("../../../../../common/login/loginv1.js")), i = require("../../../../../common/request/request.js"), c = t.loadBalance, u = t.getJDGiftCards, s = t.getRedIcon, d = t.removeRedIcon, p = t.fetchBaiTiaoData;

exports.loadCouponData = function e(o) {
    return new r.default(function(t, r) {
        a.getLoginPromise().then(function() {
            i.request.get({
                url: "https://wq.jd.com/activeapi/queryjdcouponlistwithfinance",
                data: {
                    state: o,
                    wxadd: 1
                },
                ump: {
                    bizId: "903",
                    opId: "27",
                    errBizId: "903",
                    errOpId: "28",
                    reportHook: function(e) {
                        return 0 == e.errorCode || 1 == e.errorCode ? {
                            code: 0
                        } : {
                            code: e.errorCode,
                            message: e.errMsg
                        };
                    }
                },
                dataType: n.default.isXCX ? "" : "jsonp",
                jsonpCallback: "QueryJdCouponListCallBack"
            }).then(function(n) {
                var i = n.body;
                if (1 == i.errorCode) a.doLogin().then(function() {
                    e(o).then(function(e) {
                        t(e);
                    }).catch(function(e) {
                        r(e || "获取优惠券列表出错，请稍后再试");
                    });
                }).catch(function(e, o) {
                    r(o || "登录出错，请稍后再试");
                }); else if (0 == i.errorCode) {
                    var c = i.coupon;
                    t(c);
                } else r(i.errMsg || "请求数据出错，请稍后再试");
            }).catch(function(e) {
                r("网络出错，请稍后再试");
            });
        }).catch(function(e, o) {
            r(o || "登录出错，请稍后再试");
        });
    });
}, exports.couponsFilter = function(e) {
    var o = [];
    return !(e instanceof Array) && (e = []), e.forEach(function(e) {
        var t = e.coupontype, r = e.couponStyle;
        e.extInfo && e.extInfo.limit_organization && "[9]" == e.extInfo.limit_organization ? e.couponTypeNum = 6 : e.couponTypeNum = 0 == r && 1 == t ? 1 : 3 == r && 1 == t ? 2 : 0 == r && 0 == t ? 3 : 2 == r && 2 == t ? 4 : 10 == r && 10 == t ? 5 : 12 != r || 300 != t && 301 != t ? 12 == r && 302 == t ? 8 : 0 : 7, 
        [ "1", "2", "3", "4", "5", "6", "7", "8" ].indexOf("" + e.couponTypeNum) >= 0 && o.push(e);
    }), o;
}, exports.loadBalance = c, exports.getJDGiftCards = u, exports.getRedIcon = s, 
exports.removeRedIcon = d, exports.fetchBaiTiaoData = p;