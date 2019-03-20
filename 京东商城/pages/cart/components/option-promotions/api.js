function e(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
    return r.default = e, r;
}

function r() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, u = [];
    return e.forEach(function(e) {
        u.push(e.skuId + "_" + e.promotionId);
    }), a.request.get({
        url: "https://wqdeal2.jd.com/deal/mshopcart/selectoptimalpromo",
        data: {
            templete: 1,
            locationid: (0, n.getLocationId)(),
            skupromolist: u.join(",")
        },
        ump: {
            bizId: s,
            opId: m.SELECT_OPTIMAL_PROMO,
            errOpId: m.SELECT_OPTIMAL_PROMO,
            reportHook: function(e) {
                return {
                    code: +e.errId,
                    message: e.errMsg || ""
                };
            }
        }
    }).then(function(n) {
        var u = n.body, a = 0 == u.errId, l = 13 == u.errId;
        if (a) {
            var s = {};
            u.productPos.forEach(function(e) {
                s[e.promotionId] && s[e.promotionId].skus.push({
                    skuId: e.skuId,
                    imageUrl: i.getImg(e.imageUrl, 150)
                }), !s[e.promotionId] && (s[e.promotionId] = {
                    promoteFlag: e.promoteFlag,
                    promoNote: e.promoNote,
                    promotionId: e.promotionId,
                    skus: [ {
                        skuId: e.skuId,
                        imageUrl: i.getImg(e.imageUrl, 150)
                    } ]
                });
            });
            var m = [], p = [];
            return e.forEach(function(e) {
                !s[e.promotionId] && (1 == e.unitPromoTag || 2 == e.unitPromoTag) && p.push({
                    skuId: e.skuId,
                    imageUrl: i.getImg(e.imgUrl, 150)
                });
            }), p.length && m.push({
                promoteFlag: "",
                promoNote: "切换更优惠的价格",
                promotionId: 0,
                skus: p
            }), (Object.keys(s) || []).forEach(function(e) {
                m.push(s[e]);
            }), t.default.resolve(m);
        }
        return l && o < 2 ? (o += 1, d.doLogin().then(function() {
            return r(e, o);
        }, function(e) {
            return t.default.reject(new Error("哎呀，操作发生点意外，请重新试试"));
        })) : t.default.reject(new Error("哎呀，操作发生点意外，请重新试试"));
    }, function(e) {
        return t.default.reject(new Error("哎呀，操作发生点意外，请重新试试"));
    });
}

function o() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, u = [];
    return e.forEach(function(e) {
        var r = e.skuId + "_" + (e.promotionId || 0), o = "";
        1 == e.unitPromoTag && (o = -1), 2 == e.unitPromoTag && (o = -101), o && (r += "_" + o), 
        u.push(r);
    }), a.request.get({
        url: "https://wqdeal2.jd.com/deal/mshopcart/batchchangepromo",
        data: {
            templete: 1,
            locationid: (0, n.getLocationId)(),
            skupromolist: u.join(",")
        },
        ump: {
            bizId: s,
            opId: m.BATCH_CHANGE_PROMO,
            errOpId: m.BATCH_CHANGE_PROMO,
            reportHook: function(e) {
                return {
                    code: +e.errId,
                    message: e.errMsg || ""
                };
            }
        }
    }).then(function(n) {
        var u = n.body, i = 0 == u.errId, a = 13 == u.errId;
        if (i) {
            var s = l(u, !0);
            return t.default.resolve(s);
        }
        return a && r < 2 ? (r += 1, d.doLogin().then(function() {
            return o(e, r);
        }, function(e) {
            return t.default.reject(new Error("哎呀，操作发生点意外，请重新试试"));
        })) : t.default.reject(new Error("哎呀，操作发生点意外，请重新试试"));
    }, function(e) {
        return t.default.reject(new Error("哎呀，操作发生点意外，请重新试试"));
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getAllSkuId = exports.batchChangePromo = exports.selectoptimalpromo = exports.getoptimalpromo = void 0;

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../libs/promise.min.js")), n = require("../../models/model"), u = require("../../models/data-store"), i = e(require("../../../../common/fe_helper.js")), a = require("../../../../common/request/request.js"), d = e(require("../../../../common/login/login.js")), l = u.DataStore.format, s = 616, m = {
    GET_OPTIMAL_PROMO: 26,
    SELECT_OPTIMAL_PROMO: 27,
    BATCH_CHANGE_PROMO: 28
};

exports.getoptimalpromo = function() {
    return a.request.get({
        url: "https://wqdeal2.jd.com/deal/mcartassit/getoptimalpromo",
        data: {
            templete: 1,
            locationid: (0, n.getLocationId)()
        },
        ump: {
            bizId: s,
            opId: m.GET_OPTIMAL_PROMO,
            errOpId: m.GET_OPTIMAL_PROMO,
            reportHook: function(e) {
                return {
                    code: +e.errId,
                    message: e.errMsg || ""
                };
            }
        }
    }).then(function(e) {
        var r = e.body;
        return 0 == r.errId && "0" == r.hasNonPromotion && r.relationMapNew && r.relationMapNew.length && +r.totalFactPrice > +r.totalPromoPrice ? t.default.resolve(r) : t.default.reject(r);
    }, function(e) {
        return t.default.reject(e);
    });
}, exports.selectoptimalpromo = r, exports.batchChangePromo = o, exports.getAllSkuId = n.getAllSkuId;