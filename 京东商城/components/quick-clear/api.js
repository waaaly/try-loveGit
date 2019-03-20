function e(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = e[t]);
    return r.default = e, r;
}

function r(e) {
    if (Array.isArray(e)) {
        for (var r = 0, t = Array(e.length); r < e.length; r++) t[r] = e[r];
        return t;
    }
    return Array.from(e);
}

function t(e) {
    var r = e.currentCount;
    return {
        skuCateUpperLimit: +e.maxCount || 120,
        currentSkuCateNum: +r || 0
    };
}

function o() {
    var e = getCurrentPages() || [], r = e.length ? e.pop().route : "";
    return "pages/cart/cart/index" == r || "pages/cart/cart/cart" == r;
}

function n() {
    var e = getCurrentPages() || [];
    return e.length ? e.pop().route : "";
}

function u() {
    var e = this, r = n(), t = o(), a = {
        url: "https://wqdeal1.jd.com/deal/mshopcart/getclearcart",
        timeout: 3e3,
        data: {
            templete: 0
        },
        ump: {
            bizId: T,
            opId: t ? A.CART_GET_QUICK_CLEAR : A.NON_CART_GET_QUICK_CLEAR,
            errOpId: t ? A.CART_GET_QUICK_CLEAR : A.NON_CART_GET_QUICK_CLEAR,
            reportHook: function(e) {
                return {
                    code: +e.errId,
                    message: (e.errMsg || "") + "_curPage:" + r
                };
            }
        }
    };
    return l.request.get(a).then(function(r) {
        var t = r.body, o = 0 == t.errId, n = 13 == t.errId;
        return o ? m.default.resolve(t.clearcart) : n ? g.doLogin().then(u.bind(e)) : m.default.reject(t);
    }, function(e) {
        return m.default.reject(e);
    });
}

function a(e) {
    var r = (4 == e.itemType ? e.suitId + "_" : "") + e.skuId;
    return e.imgUrl = f.getImg(e.imgUrl, 67), e.id = r, e.wxKey = r, delete e.name, 
    delete e.timestamp, e;
}

function i() {
    var e = this, r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = o(), u = n();
    if (!r.length) throw Error("params skus is empty");
    var a = {
        url: "https://wqdeal1.jd.com/deal/mshopcart/removeclearcart",
        data: {
            templete: 0,
            commlist: r.join("$")
        },
        ump: {
            bizId: T,
            opId: t ? A.CART_QUICK_CLEAR : A.NON_CART_QUICK_CLEAR,
            errOpId: t ? A.CART_QUICK_CLEAR : A.NON_CART_QUICK_CLEAR,
            reportHook: function(e) {
                return {
                    code: +e.errId,
                    message: (e.errMsg || "") + "_curPage:" + u
                };
            }
        }
    };
    return l.request.get(a).then(function(t) {
        var o = t.body, n = 0 == o.errId, u = 13 == o.errId;
        return n ? m.default.resolve(o.clearcart) : u ? g.doLogin().then(i.bind(e, r)) : m.default.reject(o);
    }, function(e) {
        return m.default.reject(e);
    });
}

function s(e) {
    return _[e];
}

function d() {
    var e = [];
    return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).forEach(function(r) {
        var t = s(r);
        if (t) {
            var o = c(t);
            e.push(o);
        } else v.error(r, " 未找到");
    }), e;
}

function c(e) {
    var r = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], t = [ 1 == e.itemType ? e.skuId : e.suitId, "", "", "", e.itemType, "", "" ], o = 4 == e.itemType, n = "noStock" == e.groupName;
    return o ? t.push("suitType:" + e.virtualSuit) : t.push(""), t = t.join(","), t += (o ? "@@" : "") + "noStock:" + (r ? 1 : n ? 2 : 0);
}

function p(e) {
    var r = n(), t = {
        url: "https://wq.jd.com/fav/comm/FavCommBatchAdd",
        data: {},
        ump: {
            bizId: T,
            opId: A.FAVORITE,
            errOpId: A.FAVORITE,
            reportHook: function(e) {
                return {
                    code: +e.iRet,
                    message: (e.errMsg || "") + "_curPage:" + r
                };
            }
        }
    }, o = [];
    return e.forEach(function(e) {
        var r = e.itemId;
        e.polyType != h.MF_SUIT && e.polyType != h.MZ_SUIT || (r = e.vSkuId || e.mainSku.id), 
        o.push(r);
    }), Object.assign(t.data, {
        callback: "favorite",
        commId: o.join(",")
    }), l.request.get(t).then(function(r) {
        return 0 == r.body.iRet ? m.default.resolve(e) : m.default.reject(new Error("哎呀，收藏商品失败了，请稍后再试~"));
    }, function(e) {
        return m.default.reject(e);
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.add2Favorite = exports.getSkusFromRawData = exports.getRemoveParamsBySkus = exports.remove = exports.findById = exports.groupBy = exports.loadData = void 0;

var m = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../libs/promise.min.js")), l = require("../../common/request/request.js"), f = e(require("../../common/fe_helper.js")), I = require("../../common/logger.js"), g = e(require("../../common/login/login.js")), v = new I.Logger("购物车-快速清理 api"), _ = {}, C = {}, h = {
    SINGLE: 1,
    SUIT: 2,
    MF_SUIT: 3,
    MZ_SUIT: 4
}, T = 616, A = {
    FAVORITE: 15,
    CART_QUICK_CLEAR: 17,
    NON_CART_QUICK_CLEAR: 18,
    CART_GET_QUICK_CLEAR: 19,
    NON_CART_GET_QUICK_CLEAR: 20,
    SUCCESS: 0,
    FAIL: 1
};

exports.loadData = u, exports.groupBy = function(e) {
    _ = {};
    var o = [], n = [ "noStock", "oneYear", "halfYear", "oneMonth", "inAMonth" ], u = {
        noStock: "无货商品",
        oneYear: "一年前加车商品",
        halfYear: "半年前加车商品",
        oneMonth: "一个月前加车商品",
        inAMonth: "一个月内加车商品"
    };
    o.totalNum = 0, n.forEach(function(t) {
        var n = e[t];
        if (n && +n.totalNum) {
            !C[t] && (C[t] = {}), Object.assign(C[t], n);
            var i = [], s = 0;
            n.suits.forEach(function(e) {
                s += e.products.length - 1, e.products.forEach(function(r, t) {
                    0 === t && i.push({
                        timestamp: e.timestamp,
                        itemType: e.itemType,
                        suitId: e.vskuId || e.promoId,
                        skuId: r.skuId,
                        imgUrl: r.imgUrl,
                        virtualSuit: e.vskuId ? 1 : 0
                    });
                });
            }), n.totalNum -= s, delete n.suits;
            var d = [].concat(r(n.products), i).sort(function(e, r) {
                return +e.timestamp - +r.timestamp;
            }).map(function(e) {
                return e.groupName = t, e = a(e), _[e.wxKey] = e, e;
            });
            n.products = d, o.push(Object.assign(n, {
                title: u[t] || "",
                key: t,
                selected: !1
            })), o.totalNum += +n.totalNum;
        }
    });
    var i = t(e), s = i.skuCateUpperLimit, d = i.currentSkuCateNum;
    return o.header = d >= s ? "购物车已满，清理部分商品后才可继续加车" : d >= 80 ? "购物车快要满了，建议及时清理购物车" : "购物车快速清理", 
    o;
}, exports.findById = s, exports.remove = i, exports.getRemoveParamsBySkus = function() {
    return d(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []);
}, exports.getSkusFromRawData = function(e) {
    var r = 4 == e.itemType, t = [], o = r ? C[e.groupName].suits : C[e.groupName].products;
    if (r) {
        var n = o.find(function(r) {
            return r.vskuId == e.suitId || r.promoId == e.suitId;
        });
        n && (t = n.products.map(function(e) {
            return e.skuId;
        }));
    } else (e = o.find(function(r) {
        return r.skuId == e.skuId;
    })) && (t = [ e.skuId ]);
    return t;
}, exports.add2Favorite = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], r = arguments[1];
    return p(e).then(function(e) {
        return i(r);
    });
};