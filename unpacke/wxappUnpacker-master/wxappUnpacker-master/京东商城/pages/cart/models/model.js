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

function t() {
    var e = w.getUserAddressID();
    return (e = 3 === e.split(/_/).length ? e + "_0" : e).replace(/_/g, "-");
}

function o(e) {
    var r = "", t = "", o = [], n = [];
    return arguments.length > 1 && void 0 !== arguments[1] && arguments[1] || 1 == e.isFactory ? r = "不计重量" : e.weight && 0 != +e.weight && (r = (e.weight / 1e3).toFixed(3) + "kg"), 
    e.color && o.push(e.color), e.size && o.push(e.size), o.length && (t = "" + o.join("，")), 
    r && n.push(r), t && n.push(t), n.join("；");
}

function n() {
    var e = Date.now();
    return U.get({
        url: "https://wq.jd.com/deal/mshopcart/cartview",
        data: {
            templete: 1,
            locationid: t()
        }
    }).then(function(r) {
        P.debug("请求用时", Date.now() - e);
        var t = r.body, o = 0 == t.errId, u = 8994 == t.errId, a = 13 == t.errId;
        return me().umpBiz({
            bizid: ue,
            operation: ae.LIST,
            result: t.errId,
            message: t.errId + "_" + t.errMsg
        }), o ? ((t = V(t, !0)).venders.forEach(function(e) {
            e.list.forEach(function(e) {
                e.products.forEach(function(e) {
                    var r = e.mainSku, t = r.locType, o = r.lsId, n = r.id, u = 1 == t, a = (e.areaStockState || {}).attr_e, s = void 0 === a ? "" : a;
                    u && !se.includes(o) && se.push(o), s && (le[n] = i(s)), e.servicePrjInfo && (de[n] = e.servicePrjInfo);
                });
            });
        }), k.default.resolve(t)) : u ? k.default.resolve(V(ie)) : a ? B.doLogin().then(n) : k.default.reject(new Error(t.errMsg || "哎呀，操作发生点意外，请重新试试 " + (t.errId || "")));
    }, function(e) {
        return me().umpBiz({
            bizid: ue,
            operation: ae.LIST,
            result: e.code,
            message: e.code + "_" + e.message
        }), k.default.reject(e);
    });
}

function i(e) {
    return [ "2", "8", "9", "52", "521" ].includes(e);
}

function u(e) {
    var r = [];
    return (Array.isArray(e) ? e : [ e ]).forEach(function(e) {
        var t = e.isSuit, o = t ? e.polyType == $.SUIT ? e.promotion.pid : e.vSkuId : e.mainSku.id, n = e.num, i = t ? e.polyType == $.SUIT ? e.promotion.pid : e.vSkuId : e.mainSku.id, u = e.ptype, a = e.polyType == $.SUIT || e.polyType == $.MZ_SUIT || e.polyType == $.MF_SUIT ? e.itemId : "", s = e.packId || 0, d = function() {
            if (!e.listSelectGiftPoolGiftIds) return "";
            var r = 28 == e.giftPoolType;
            return (r ? "newgiftpool" : "giftpool") + ":" + e.listSelectGiftPoolGiftIds.map(function(e) {
                return r ? e.id + "|" + e.num : e.id;
            }).join("_");
        }(), c = e.beanOrMemberPromoId || "";
        r.push([ o, "", n, i, u, a, s, d, "", "", "", c ].join(","));
    }), r.join("$");
}

function a(e, r) {
    "product" == r && (e.venders = e.venders.map(function(e) {
        return e.list = e.list.map(function(r) {
            return F(x({
                uuid: [ e.vid, r.polyType, r.itemId ].join("_")
            }, r)) || r;
        }), G(Object.assign({}, e));
    })), "vender" == r && (e.venders = e.venders.map(function(e) {
        return e = G(Object.assign({}, e), !0), e.list = e.list.map(function(e) {
            return F(e) || e;
        }), e;
    }));
    var t = R();
    return e.summary && (e.summary.selectable = J(t)), e.summary && !e.summary.allChecked && (e.summary.checked = Q(t)), 
    re(e.summary), e;
}

function s() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "add", r = arguments[1], t = [], o = [], n = [], i = {};
    if (arguments[2].forEach(function(e) {
        "gift_service" == e.type && t.push(e.id), "jd_service" == e.type && o.push(e.id), 
        "ext_service" == e.type && n.push(e.id);
    }), n.length) {
        var u = n.map(function(e) {
            return [ e, "", 1, r.mainSku.id, r.polyType != $.SINGLE ? 7 : 8, r.mainSku.id, 0 == r.pid ? "" : r.pid, 0 ].join(",");
        }).join("$");
        u && Object.assign(i, {
            ybcommlist: u
        });
    }
    if (o.length) {
        var a = r.isVirtualSuit || r.isSuit ? r.itemId : "", s = ("add" == e ? o : [ o.pop() ]).map(function(e) {
            return [ e, "", "", "", "", r.mainSku.id, a, r.isVirtualSuit ? "suitType:1" : "" ].join(",");
        }).join("$");
        s && Object.assign(i, {
            jdhscommlist: s
        });
    }
    if (t.length) {
        var d = t.map(function(t) {
            return [ t, "", "add" === e ? 1 : 0, t, 1, r.mainSku.id, 0, 0 ].join(",");
        }).join("$");
        Object.assign(i, {
            commlist: d
        });
    }
    return i;
}

function d(e) {
    var r = this, o = x({
        templete: 1,
        commlist: "",
        type: 10,
        locationid: t(),
        reg: 1
    }, e);
    return U.get({
        url: "https://wq.jd.com/deal/mshopcart/addCmdy",
        data: o,
        ump: {
            bizId: ue,
            opId: ae.ADD_CMDY
        }
    }).then(function(t) {
        var o = t.body, n = 0 == o.errId, i = 13 == o.errId;
        return n ? k.default.resolve(V(o)) : i ? B.doLogin().then(d.bind(r, e)) : k.default.reject(new Error(j(o.errMsg, o.errId)));
    }, function(e) {
        return k.default.reject(new Error(j("", e.code)));
    });
}

function c(e) {
    var r = this, o = x({
        templete: 1,
        commlist: "",
        type: 10,
        locationid: t(),
        reg: 1
    }, e);
    return U.get({
        url: "https://wq.jd.com/deal/mshopcart/rmvCmdy",
        data: o,
        ump: {
            bizId: ue,
            opId: ae.REMOVE
        }
    }).then(function(t) {
        var o = t.body, n = 0 == o.errId, i = 13 == o.errId;
        return n ? k.default.resolve(V(o)) : i ? B.doLogin().then(c.bind(r, e)) : k.default.reject(new Error(j(o.errMsg, o.errId)));
    }, function(e) {
        return k.default.reject(new Error(j("", e.code)));
    });
}

function l() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : te.NORMAL_ITEM, r = arguments[1], o = u(r = Array.isArray(r) ? r : [ r ]);
    return U.get({
        url: "https://wq.jd.com/deal/mshopcart/addCmdy",
        data: {
            templete: 1,
            commlist: o,
            type: e,
            locationid: t(),
            reg: 1,
            scene: 0
        }
    }).then(function(t) {
        var o = t.body, n = 0 == o.errId, i = 13 == o.errId;
        return n ? (me().umpBiz({
            bizid: ue,
            operation: ae.ADD_CMDY,
            result: ae.SUCCESS,
            message: ""
        }), k.default.resolve(a(V(o), "product"))) : i ? B.doLogin().then(l.bind(null, e, r)) : (me().umpBiz({
            bizid: ue,
            operation: ae.ADD_CMDY,
            result: o.errId,
            message: o.errMsg
        }), k.default.reject(new Error(j(o.errMsg, o.errId))));
    }, function(e) {
        return me().umpBiz({
            bizid: ue,
            operation: ae.ADD_CMDY,
            result: e.code,
            message: e.code + "_" + e.message
        }), k.default.reject(new Error(j("", e.code)));
    });
}

function p(e) {
    var r = u(e);
    return U.get({
        url: "https://wq.jd.com/deal/mshopcart/modifycmdynum",
        data: {
            templete: 1,
            commlist: r,
            type: 0,
            locationid: t(),
            scene: 0,
            reg: 1
        }
    }).then(function(r) {
        var t = r.body, o = 0 == t.errId, n = 13 == t.errId;
        return o ? (me().umpBiz({
            bizid: ue,
            operation: ae.MODIFY_CMDY_NUM,
            result: t.errId,
            message: t.errId + "_" + t.errMsg
        }), t = a(V(t), "product"), k.default.resolve(t)) : n ? B.doLogin().then(function() {
            return p(e);
        }, function(e) {
            return P.error(e), k.default.reject(new Error(j(t.errMsg, t.errId)));
        }) : (me().umpBiz({
            bizid: ue,
            operation: ae.MODIFY_CMDY_NUM,
            result: t.errId,
            message: t.errId + "_" + t.errMsg
        }), k.default.reject(new Error(j(t.errMsg, t.errId))));
    }, function(e) {
        return me().umpBiz({
            bizid: ue,
            operation: ae.MODIFY_CMDY_NUM,
            result: e.code,
            message: e.code + "_" + e.message
        }), k.default.reject(new Error(j("", e.code)));
    });
}

function m(e, o, n) {
    var i = "", s = {
        templete: 1,
        commlist: i,
        type: 0,
        all: "all" === o.type ? 1 : 0,
        locationid: t(),
        reg: 1
    };
    if ("all" === o.type) ; else if ("vender" === o.type) {
        var d = [];
        o.list.forEach(function(e) {
            e.polyType == $.SUIT ? d.push(e) : d = e.suits && e.suits.length ? [].concat(r(d), r(e.suits), r(e.products)) : [].concat(r(d), r(e.products));
        }), i = u(d);
    } else "product" === o.type && (i = u(o));
    return U.get({
        url: e,
        data: Object.assign(s, {
            commlist: i
        })
    }).then(function(r) {
        var t = r.body, i = 0 == t.errId, u = 13 == t.errId;
        return i ? (me().umpBiz({
            bizid: ue,
            operation: n,
            result: ae.SUCCESS,
            message: ""
        }), t = "all" == o.type ? V(t, !0) : a(V(t), o.type), k.default.resolve(t)) : u ? B.doLogin().then(function() {
            return m(e, o);
        }, function(e) {
            return P.error(e), k.default.reject(new Error(j(t.errMsg, t.errId)));
        }) : (me().umpBiz({
            bizid: ue,
            operation: n,
            result: t.errId,
            message: t.errId + "_" + t.errMsg
        }), k.default.reject(new Error(j(t.errMsg, t.errId))));
    }, function(e) {
        return me().umpBiz({
            bizid: ue,
            operation: n,
            result: e.code,
            message: e.code + "_" + e.message
        }), k.default.reject(new Error(j("", e.code)));
    });
}

function f(e, r) {
    var o = {
        url: "https://wq.jd.com/deal/mshopcart/replaceitems",
        data: {
            templete: 1,
            commlist: u([ e, r ]),
            type: $.SUIT == r.polyType ? te.VIRTUAL_SUIT : te.NORMAL_ITEM,
            locationid: t(),
            scene: 0,
            reg: w.gUserData().definePin
        }
    };
    return U.get(o).then(function(t) {
        var n = t.body, i = 0 == n.errId, u = 13 == n.errId;
        return i ? (n = Object.assign(a(V(n), "vender"), {
            scrollIntoView: "top"
        }), me().umpBiz({
            bizid: ue,
            operation: ae.REPLACE_ITEMS,
            result: ae.SUCCESS,
            message: ""
        }), k.default.resolve(n)) : u ? B.doLogin().then(function() {
            return f(e, r);
        }, function(e) {
            return P.error(e), k.default.reject(new Error(j(n.errMsg, n.errId)));
        }) : (me().umpBiz({
            bizid: ue,
            operation: ae.REPLACE_ITEMS,
            result: n.errId,
            message: n.errId + "_" + n.errMsg + "_commlist:" + (o.data.commlist.replace(/,/g, ";") || "")
        }), k.default.reject(new Error(j(n.errMsg, n.errId))));
    }, function(e) {
        return me().umpBiz({
            bizid: ue,
            operation: ae.REPLACE_ITEMS,
            result: e.code,
            message: e.code + "_" + e.message
        }), k.default.reject(new Error(j("", e.code)));
    });
}

function g(e) {
    var r = {
        templete: 1,
        commlist: u(e),
        type: te.NORMAL_ITEM,
        checked: 0,
        locationid: t(),
        reg: 1,
        t: Math.random()
    };
    return U.get({
        url: "https://wq.jd.com/deal/mshopcart/rmvCmdy",
        data: r
    }).then(function(r) {
        var t = r.body, o = 8994 == t.errId, n = 0 == t.errId, i = 13 == t.errId;
        return o ? k.default.resolve(V(ie)) : n ? (me().umpBiz({
            bizid: ue,
            operation: ae.REMOVE,
            result: ae.SUCCESS,
            message: ""
        }), t = V(t, !0), k.default.resolve(t)) : i ? B.doLogin().then(function() {
            return g(e);
        }, function(e) {
            return P.error(e), k.default.reject(new Error(j(t.errMsg, t.errId)));
        }) : k.default.reject(new Error(j(t.errMsg, t.errId)));
    }, function(e) {
        return me().umpBiz({
            bizid: ue,
            operation: ae.REMOVE,
            result: e.code,
            message: e.code + "_" + e.message
        }), k.default.reject(new Error(j("", e.code)));
    });
}

function v(e) {
    var r = {
        url: "https://wq.jd.com/deal/mshopcart/modifyCmdyPromo",
        data: {
            templete: 1,
            commlist: u(e),
            type: 0,
            locationid: t(),
            scene: 0,
            reg: 1
        }
    };
    return U.get(r).then(function(r) {
        var t = r.body, o = 0 == t.errId, n = 13 == t.errId;
        return o ? (me().umpBiz({
            bizid: ue,
            operation: ae.MODIFY_CMDY_PROMO,
            result: ae.SUCCESS,
            message: ""
        }), t = V(t, !0), k.default.resolve(t)) : n ? B.doLogin().then(function() {
            return v(e);
        }, function(e) {
            return P.error(e), k.default.reject(new Error(j(t.errMsg, t.errId)));
        }) : (me().umpBiz({
            bizid: ue,
            operation: ae.MODIFY_CMDY_PROMO,
            result: t.errId,
            message: t.errId + "_" + t.errMsg
        }), k.default.reject(new Error(j(t.errMsg, t.errId))));
    }, function(e) {
        return me().umpBiz({
            bizid: ue,
            operation: ae.MODIFY_CMDY_PROMO,
            result: e.code,
            message: e.code + "_" + e.message
        }), k.default.reject(new Error(j("", e.code)));
    });
}

function I(e) {
    var r = e.isCommonGoodShop, t = e.isCategoryGoodShop;
    return r = 1 == r, t = 1 == t, r && t ? "type_good" : r ? "type_good" : t ? "type_cate_good" : "type_3rd";
}

function S() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : L(), r = [ 2, 8, 9, 52 ], t = [ 34 ], n = {}, i = {}, u = !0, a = !1, s = void 0;
    try {
        for (var d, c = Object.entries(e)[Symbol.iterator](); !(u = (d = c.next()).done); u = !0) !function() {
            var e = M(d.value, 2), u = e[0], a = e[1];
            (void 0 === a ? [] : a).forEach(function(e) {
                var a = H(e);
                if (a && a.areaStockState) {
                    var s = a.areaStockState, d = a.mainSku, c = +s.attr_c, l = +s.attr_a, p = +s.attr_e, m = !t.includes(l);
                    m && (m = -1 == c || c > 0 && +d.lowestBuy < c), i[u] = m ? c : 0, n[u] = o(d, r.includes(p));
                }
            });
        }();
    } catch (e) {
        a = !0, s = e;
    } finally {
        try {
            !u && c.return && c.return();
        } finally {
            if (a) throw s;
        }
    }
    return me().umpBiz({
        bizid: ue,
        operation: ae.STOCK,
        result: ae.SUCCESS,
        message: ""
    }), k.default.resolve({
        spec: n,
        stock: i
    });
}

function h() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
    return S().then(function(r) {
        var t = r.stock, o = L(), n = {};
        return e && e.length && e.forEach(function(e) {
            return e.skuId && o[e.skuId] && t[e.skuId] && !ee(e.skuId) && e.margin && (n[e.skuId] = e.margin);
        }), k.default.resolve(n);
    });
}

function y() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, t = {};
    return e.length && e.forEach(function(e) {
        e.skuId && r[e.skuId] && +e.isPriceValid > 0 && +e.tuanMemberCount > 0 && +e.pinGouPrice > 0 && (t[e.skuId] = {
            tuanMemberCount: e.tuanMemberCount,
            pinGouPrice: (0, N.divide)(e.pinGouPrice, 100).toFixed(2),
            priceDiff: (0, N.divide)((0, N.minus)(+e.cartShowPrice, +e.pinGouPrice), 100)
        });
    }), t;
}

function b() {
    var e = {
        margin: {},
        iou: {},
        balanceBeans: 0,
        flash: {},
        pinGouInfos: {}
    };
    return U.get({
        url: "https://wq.jd.com/deal/mcartassit/getcartassisit",
        data: {
            templete: 1
        }
    }).then(function(r) {
        var t = r.body, o = 0 == t.errId, n = 13 == t.errId;
        return o ? (me().umpBiz({
            bizid: ue,
            operation: ae.MARGIN,
            result: ae.SUCCESS,
            message: t.errMsg
        }), h(t.marginItems).then(function(r) {
            e.margin = r, e.balanceBeans = +t.balanceBeans, ce = e.balanceBeans;
            var o = L();
            return e.pinGouInfos = t.pinGouInfos ? Object.assign({}, y(t.pinGouInfos, o)) : {}, 
            k.default.resolve(e);
        })) : n ? B.doLogin().then(b) : (me().umpBiz({
            bizid: ue,
            operation: ae.MARGIN,
            result: t.errId,
            message: ""
        }), k.default.resolve(e));
    }, function(r) {
        return me().umpBiz({
            bizid: ue,
            operation: ae.MARGIN,
            result: r.code,
            message: r.message
        }), k.default.resolve(e);
    });
}

function C() {
    var e = [];
    return R().reduce(function(t, o) {
        var n = o.isVirtual && -1 != o.vid, i = oe == o.vid, u = ne == o.vid, a = new Set([]);
        if (!n && !i) {
            var s = new Set([ o.vid ]), d = [];
            (function() {
                var e = [];
                return o.list.forEach(function(t) {
                    t.suits && t.suits.forEach(function(t) {
                        var o;
                        (o = e).push.apply(o, r(t.products));
                    }), e = [].concat(r(e), r(t.products));
                }), e;
            })().forEach(function(e) {
                var r = e.mainSku;
                r && d.indexOf(e.itemId) < 0 && a.add([ e.isVirtualSuit ? e.itemId : r.id, r.cid.split(/_/)[2], +r.oversea > 0 ? 1 : 0 ].join("_")), 
                e.isVirtualSuit && d.push(e.itemId), u && r && r.shopId && 0 != r.shopId && s.add(r.shopId);
            }), e.push([ [].concat(r(s)).join("_") ].concat(r(a)));
        }
    }, []), e.join("$");
}

function E() {
    var e = C();
    return e.length ? U.get({
        url: "https://wq.jd.com/deal/couponquery/querycoupon",
        data: {
            commlist: e
        }
    }).then(function(r) {
        var t = r.body, o = 0 == t.errId, n = 13 == t.errId, i = [];
        if (o) {
            me().umpBiz({
                bizid: ue,
                operation: ae.SHOP_COUPON,
                result: ae.SUCCESS,
                message: ""
            });
            var u = t.venderCartV2, a = t.coupoVo, s = t.venderCart;
            return Array.isArray(u) ? u.forEach(function(e) {
                var r = {
                    vid: e.vid,
                    coupoVo: []
                };
                e.couponSku.forEach(function(t) {
                    var o = a.find(function(e) {
                        return !(!+t.couponid || t.couponid != e.couponid) || !(!+t.batchId || 1 != e.couponDo || e.batchId != t.batchId);
                    });
                    if (o) {
                        var n = Object.assign({
                            vcouponType: e.vcouponType
                        }, o);
                        r.coupoVo.push(Object.assign(n, {
                            skuidlist: t.skuidlist
                        }));
                    }
                }), i.push(r);
            }) : Array.isArray(s) && (i = s), k.default.resolve(i);
        }
        return n ? B.doLogin().then(function() {
            return E();
        }, function(e) {
            return P.error(e), k.default.reject(new Error(j(t.errMsg, t.errId)));
        }) : (me().umpBiz({
            bizid: ue,
            operation: ae.SHOP_COUPON,
            result: t.errId,
            message: t.errId + "_" + t.errMsg + "_commlist:" + (e.replace(/,/g, ";") || "")
        }), k.default.reject(new Error(j(t.errMsg, t.errId))));
    }, function(e) {
        return me().umpBiz({
            bizid: ue,
            operation: ae.SHOP_COUPON,
            result: e.code,
            message: e.code + "_" + e.message
        }), k.default.reject(new Error(j("", e.code)));
    }) : k.default.resolve([]);
}

function _() {
    return U.get({
        url: "https://wq.jd.com/deal/recvaddr/getrecvaddrlistV3",
        data: {}
    }).then(function(e) {
        var r = e.body, t = 0 == r.errCode;
        return 13 == r.errCode ? B.doLogin().then(_) : (t ? me().umpBiz({
            bizid: ue,
            operation: ae.ADDRESS_LIST,
            result: ae.SUCCESS,
            message: ""
        }) : me().umpBiz({
            bizid: ue,
            operation: ae.ADDRESS_LIST,
            result: r.errCode,
            message: r.errCode + "_" + r.msg
        }), t ? k.default.resolve(r.list) : k.default.reject(r));
    }, function(e) {
        return me().umpBiz({
            bizid: ue,
            operation: ae.ADDRESS_LIST,
            result: e.code,
            message: e.code + "_" + e.message
        }), k.default.reject(new Error(j("", e.code)));
    });
}

function j(e, r) {
    return e || "哎呀，操作发生点意外，请重新试试 (" + r + ")";
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getLocationId = exports.getImgUrlBySkuIds = exports.filterMargin = exports.updateValueAddedServices = exports.queryServiceById = exports.getSummaryChecked = exports.getSummarySelectable = exports.getPPMS = exports.getItemId = exports.updateVender = exports.getVenderById = exports.getCommonList = exports.queryItemByItemId = exports.queryProductByUUID = exports.getShopServices = exports.getLargeCargos = exports.getAssist = exports.getSkuCategoryNum = exports.getAddressList = exports.getBalanceBeans = exports.getVenders = exports.queryCoupon = exports.favorite = exports.replaceProduct = exports.getAllSkuId = exports.getYbItems = exports.getStock = exports.getVendersName = exports.getGiftPool = exports.getManGiftSkus = exports.rmvCmdy = exports.modifyCmdyPromo = exports.modifyCmdyNum = exports.uncheckCmdy = exports.checkCmdy = exports.getCartView = exports.addCmdy = exports.ACTIONS = void 0;

var M = function() {
    function e(e, r) {
        var t = [], o = !0, n = !1, i = void 0;
        try {
            for (var u, a = e[Symbol.iterator](); !(o = (u = a.next()).done) && (t.push(u.value), 
            !r || t.length !== r); o = !0) ;
        } catch (e) {
            n = !0, i = e;
        } finally {
            try {
                !o && a.return && a.return();
            } finally {
                if (n) throw i;
            }
        }
        return t;
    }
    return function(r, t) {
        if (Array.isArray(r)) return r;
        if (Symbol.iterator in Object(r)) return e(r, t);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), x = Object.assign || function(e) {
    for (var r = 1; r < arguments.length; r++) {
        var t = arguments[r];
        for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
}, k = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../libs/promise.min.js")), z = require("../../../common/logger.js"), O = require("../common/inject-requset.js"), w = e(require("../../../common/user_info.js")), B = e(require("../../../common/login/login.js")), D = e(require("../../../common/biz")), T = e(require("../../../common/cookie-v2/cookie")), A = require("./data-store"), N = require("../../../common/numberp"), P = new z.Logger("购物车Model"), U = new O.InjectRequest(616, 4), V = A.DataStore.format, L = A.DataStore.getAllSkuId, R = A.DataStore.getVenders, q = A.DataStore.getVenderById, G = A.DataStore.updateVender, F = A.DataStore.updateItem, Y = A.DataStore.getSkuCategoryNum, H = A.DataStore.queryProductByUUID, K = A.DataStore.queryItemByItemId, $ = A.DataStore.POLY_TYPES, Z = A.DataStore.getItemId, W = A.DataStore.getVendersNames, J = A.DataStore.getSummarySelectable, Q = A.DataStore.getSummaryChecked, X = A.DataStore.filterMargin, ee = A.DataStore.findPresale, re = A.DataStore.updateSummaryCache, te = {
    NORMAL_ITEM: 0,
    GIFT_SUIT: 1,
    SERVICE_CONNTRACT: 2,
    VIRTUAL_SUIT: 3,
    GIFT_3C: 6,
    SERVICE_GIFT: 7
}, oe = 8899, ne = 8888, ie = {
    cart: {
        allChecked: 0,
        skuNumAndPrice: {
            cashBack: 0,
            factPrice: 0,
            chkMainSkuNum: 0,
            mainSkuNum: 0,
            mainSkuCount: 0
        },
        venderCart: []
    }
}, ue = 616, ae = {
    STOCK: 1,
    MARGIN: 2,
    YB_SERVICES: 3,
    LIST: 4,
    ADD_CMDY: 5,
    MODIFY_CMDY_NUM: 6,
    CHECK: 7,
    UNCHECK: 8,
    REPLACE_ITEMS: 9,
    REMOVE: 10,
    MODIFY_CMDY_PROMO: 11,
    VENINFOS: 12,
    SHOP_COUPON: 13,
    ADDRESS_LIST: 14,
    FAVORITE: 15,
    SUCCESS: 0,
    FAIL: 1
}, se = [], de = {}, ce = 0, le = {}, pe = {}, me = function() {};

me = function() {
    var e = getCurrentPages().slice(0).pop().us;
    return me = function() {
        return e;
    }, e;
}, exports.ACTIONS = te, exports.addCmdy = l, exports.getCartView = n, exports.checkCmdy = function(e) {
    return m("https://wq.jd.com/deal/mshopcart/checkcmdy", e, ae.CHECK);
}, exports.uncheckCmdy = function(e) {
    return m("https://wq.jd.com/deal/mshopcart/uncheckcmdy", e, ae.UNCHECK);
}, exports.modifyCmdyNum = p, exports.modifyCmdyPromo = v, exports.rmvCmdy = g, 
exports.getManGiftSkus = function(e) {
    var r = {
        canSelectedGiftNum: 1,
        manGiftSkus: []
    }, t = K(e);
    return t && t.manGiftSkus && (r.canSelectedGiftNum = t.canSelectedGiftNum, r.manGiftSkus = t.manGiftSkus), 
    r;
}, exports.getGiftPool = function(e) {
    return H(e).gifts || {};
}, exports.getVendersName = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], r = W();
    if (!e.length) {
        var t = !0, o = !1, n = void 0;
        try {
            for (var i, u = Object.entries(r)[Symbol.iterator](); !(t = (i = u.next()).done); t = !0) {
                var a = M(i.value, 2), s = a[0], d = a[1], c = d.icon, l = d.loaded;
                !(void 0 !== l && l) && "type_3rd" == c && e.push(s);
            }
        } catch (e) {
            o = !0, n = e;
        } finally {
            try {
                !t && u.return && u.return();
            } finally {
                if (o) throw n;
            }
        }
    }
    var p = {
        url: "https://wq.jd.com/deal/mcartassit/getveninfos",
        data: {
            vid: e.join(","),
            lsids: se.join(",")
        }
    };
    return e.length || se.length ? U.get(p).then(function(e) {
        var t = e.body, o = 0 == t.errId, n = {}, i = {};
        return o ? (me().umpBiz({
            bizid: ue,
            operation: ae.VENINFOS,
            result: ae.SUCCESS,
            message: ""
        }), t.venInfos.forEach(function(e) {
            var t = I(e);
            r[e.vid] && (i[e.vid] = {
                vname: e.shopname || r[e.vid].vname || "店铺" + e.shopid,
                icon: t,
                shopId: e.shopid
            }) && Object.assign(r[e.vid], i[e.vid], {
                loaded: !!e.shopname
            });
        }), t.locShops.forEach(function(e) {
            n[e.id] = e;
        })) : me().umpBiz({
            bizid: ue,
            operation: ae.VENINFOS,
            result: t.errId,
            message: t.errId + "_" + t.errMsg
        }), k.default.resolve({
            vendersName: r,
            locShops: n
        });
    }, function(e) {
        return me().umpBiz({
            bizid: ue,
            operation: ae.VENINFOS,
            result: e.code,
            message: e.code + "_" + e.message
        }), k.default.resolve({
            vendersName: {},
            locShops: {}
        });
    }) : k.default.resolve({
        vendersName: r,
        locShops: {}
    });
}, exports.getStock = S, exports.getYbItems = function() {
    var e = {
        url: "https://wq.jd.com/deal/mcartassit/getybitems",
        data: {
            isnewyb: 1,
            locationid: t()
        }
    }, r = {
        yb: {},
        home: {},
        entries: {}
    }, o = L();
    return Object.keys(o).length ? U.get(e).then(function(e) {
        var t = e.body, n = 0 == t.errId, i = function(e, r) {
            var t = K(e);
            if (t) return t;
            var n = o[r];
            return n && n.every(function(r) {
                var o = H(r);
                return o.pid == e && (t = o, !0);
            }), t;
        };
        return n && (pe = {}, t.platformInfos.forEach(function(e) {
            var t = e.rSuitId ? e.rSuitId + "_" + e.skuId : e.skuId, o = i(e.rSuitId, e.skuId);
            o && o.isSuit && o.pid && (e.rSuitId = o.pid);
            var n = e.rSuitId ? e.rSuitId + "_" + e.skuId : e.skuId;
            !pe[n] && (pe[n] = {
                jd: [],
                ext: []
            }), pe[n].ext.push(e);
            var u = e.platformConfigVOs.filter(function(e) {
                return 1 == e.selected;
            });
            u.length ? u.forEach(function(o) {
                var n = Object.assign(o, {
                    brandName: e.brandName
                });
                r.yb[t] ? r.yb[t].push(n) : r.yb[t] = [ n ];
            }) : r.entries[t] = 1;
        }), t.homeservices && t.homeservices.forEach(function(e) {
            var t = e.vskuId || e.suitPromoId, n = t ? t + "_" + e.skuId : e.skuId, i = o[n];
            !t && i && i.every(function(r) {
                var t = H(r);
                return !(t && !t.isSuit && t.polyType != $.SUIT && t.polyType != $.SINGLE && (n = t.pid + "_" + e.skuId, 
                1));
            }), !pe[n] && (pe[n] = {
                jd: [],
                ext: []
            }), pe[n].jd.push(e);
            var u = !0, a = !1, s = void 0;
            try {
                for (var d, c = e.servicegroups[Symbol.iterator](); !(u = (d = c.next()).done); u = !0) {
                    var l = d.value, p = l.serviceskus, m = l.scName, f = p.find(function(e) {
                        return 1 == e.selected;
                    });
                    if (f) {
                        var g = {
                            scName: m,
                            skuId: f.serviceSkuId,
                            name: f.serviceSkuShortName,
                            price: (f.serviceSkuPrice / 100).toFixed(2)
                        };
                        r.home[n] ? r.home[n].push(g) : r.home[n] = [ g ];
                    } else r.entries[n] = 1;
                }
            } catch (e) {
                a = !0, s = e;
            } finally {
                try {
                    !u && c.return && c.return();
                } finally {
                    if (a) throw s;
                }
            }
        })), me().umpBiz({
            bizid: ue,
            operation: ae.YB_SERVICES,
            result: n ? ae.SUCCESS : ae.FAIL,
            message: n ? "" : "errId:" + t.errId
        }), k.default.resolve(r);
    }, function(e) {
        return me().umpBiz({
            bizid: ue,
            operation: ae.YB_SERVICES,
            result: e.code,
            message: e.message
        }), k.default.resolve({
            yb: {},
            home: {},
            entries: {}
        });
    }) : k.default.resolve(r);
}, exports.getAllSkuId = L, exports.replaceProduct = f, exports.favorite = function(e) {
    var r = {
        url: "https://wq.jd.com/fav/comm/FavCommBatchAdd",
        data: {}
    }, t = [];
    return e.forEach(function(e) {
        var r = e.itemId;
        e.polyType != $.MF_SUIT && e.polyType != $.MZ_SUIT || (r = e.vSkuId || e.mainSku.id), 
        t.push(r);
    }), Object.assign(r.data, {
        callback: "favorite",
        commId: t.join(",")
    }), U.get(r).then(function(r) {
        var t = r.body, o = 0 == t.iRet;
        return o ? me().umpBiz({
            bizid: ue,
            operation: ae.FAVORITE,
            result: ae.SUCCESS,
            message: ""
        }) : me().umpBiz({
            bizid: ue,
            operation: ae.FAVORITE,
            result: t.iRet,
            message: t.iRet + "_" + t.errMsg
        }), o ? k.default.resolve(e) : k.default.reject(new Error("哎呀，收藏商品失败了，请稍后再试~"));
    }, function(e) {
        return me().umpBiz({
            bizid: ue,
            operation: ae.FAVORITE,
            result: e.code,
            message: e.code + "_" + e.message
        }), k.default.reject(new Error(j("", e.code)));
    });
}, exports.queryCoupon = E, exports.getVenders = R, exports.getBalanceBeans = function() {
    return ce;
}, exports.getAddressList = _, exports.getSkuCategoryNum = Y, exports.getAssist = b, 
exports.getLargeCargos = function() {
    return le;
}, exports.getShopServices = function() {
    return de;
}, exports.queryProductByUUID = H, exports.queryItemByItemId = K, exports.getCommonList = u, 
exports.getVenderById = q, exports.updateVender = G, exports.getItemId = Z, exports.getPPMS = function(e) {
    var r = e.ppmsId, t = void 0 === r ? 28656 : r, o = e.grayName, n = void 0 === o ? "" : o, i = e.doABtest, u = void 0 !== i && i;
    return n ? D.getPPMS(t, {
        expire: "5m"
    }).then(function(e) {
        var r = e.find(function(e) {
            return e.grayName == n;
        }) || {}, t = "1" === r.grayIsOpen;
        if (!u) return k.default.resolve(t);
        var o = +r.grayFil || 0, i = T.getCookie("visitkey"), a = T.getCookie("jdpin"), s = i.length;
        if (!r || !t || !s) return k.default.resolve(null);
        var d = +i.slice(i.length - 2), c = r.grayWhiteName.split(",").indexOf(a) > -1, l = 100 === o || o >= d || c;
        return k.default.resolve(l);
    }).catch(function(e) {
        return k.default.resolve(null);
    }) : k.default.resolve(null);
}, exports.getSummarySelectable = J, exports.getSummaryChecked = Q, exports.queryServiceById = function(e) {
    return pe[e] || {
        jd: [],
        ext: []
    };
}, exports.updateValueAddedServices = function(e, r, t, o) {
    if (!e || !r || !o) return k.default.reject(new Error("抱歉，商品未选中合适的服务，请稍候重试"));
    var n = [], i = !1, u = !1, a = !1, l = [];
    if (o.forEach(function(e) {
        var r = t.find(function(r) {
            return e.type === r.type;
        });
        i || (i = !r && "gift_service" == e.type) && l.push(e), u || (u = !r && "jd_service" == e.type) && l.push(e), 
        a || (a = !r && "ext_service" == e.type) && l.push(e);
    }), l.length) {
        var p = s("removed", e, l);
        n.push(c.bind(null, p));
    }
    if (t.length) {
        var m = s("add", e, t);
        n.push(d.bind(null, m));
    }
    return n.reduce(function(e, r) {
        return e.then(r);
    }, k.default.resolve());
}, exports.filterMargin = X, exports.getImgUrlBySkuIds = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
    return e.length ? U.get({
        url: "https://yx.3.cn/service/info.action",
        data: {
            area: t(),
            origin: 5,
            ids: e.join(",")
        }
    }).then(function(e) {
        var r = e.body;
        return k.default.resolve(r);
    }, function(e) {
        return k.default.resolve({});
    }) : k.default.resolve({});
}, exports.getLocationId = t;