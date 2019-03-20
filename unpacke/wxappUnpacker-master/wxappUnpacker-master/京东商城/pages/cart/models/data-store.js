function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    return t.default = e, t;
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function i(e) {
    if (Array.isArray(e)) {
        for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t];
        return i;
    }
    return Array.from(e);
}

function r(e) {
    return e == x || e == F ? "type_jd" : "-" == e[0] ? "type_multi" : "type_3rd";
}

function n(e, t) {
    var i = {
        index: t,
        icon: r(e.popInfo.vid),
        vid: e.popInfo.vid,
        isVirtual: !1,
        vname: e.popInfo.vname,
        fbpVender: e.popInfo.fbpVender,
        list: [],
        checked: !1,
        editChecked: !1,
        totalWeight: +e.totalWeight,
        cashback: +e.cashback,
        discount: +e.discount,
        freshTotalPrice: +e.freshTotalPrice,
        freshTotalWeight: +e.freshTotalWeight,
        price: +e.price,
        ybprice: +e.ybprice,
        showFactoryShipTag: !1
    };
    if (-1 != i.vid) {
        if (i.vid == x) {
            var n = 0, u = 0, c = 0, a = function(e) {
                return 1 == e.mainSku.isNoZY && 1 == e.mainSku.factoryShip;
            };
            e.sortedItems.forEach(function(e) {
                var t = e.polyItem, i = t.products, r = void 0 === i ? [] : i, n = t.suits, o = void 0 === n ? [] : n;
                u += r.length, c += r.filter(a).length, o.forEach(function(e) {
                    u += e.products.length, c += e.products.filter(a).length;
                });
            }), 1 == (n = c ? u === c ? 1 : 2 : 3) && Object.assign(i, {
                vname: "厂商配送"
            }), 2 == n && Object.assign(i, {
                vname: " 京东自营和厂商配送"
            }), 3 == n && !i.vname && Object.assign(i, {
                vname: "京东自营"
            }), i.showFactoryShipTag = 2 == n;
        }
        i.vid == F && !i.vname && Object.assign(i, {
            vname: "海囤全球自营"
        }), Y[i.vid] && i.vid != x ? Object.assign(i, Y[i.vid]) : Y[i.vid] = {
            vname: i.vname,
            icon: i.icon
        };
    }
    return i;
}

function u(e) {
    var t = e.mainSku, i = "http://img10.360buyimg.com/n4/";
    if (e.giftServiceSku && Object.assign(e.giftServiceSku, {
        image: E.getImg(i + e.giftServiceSku.image),
        promoPrice: (0, C.divide)(e.giftServiceSku.promoPrice, 100)
    }), e.show_price = k(e.price).split(/\./), /^http/i.test(t.image) || (t.image = i + t.image), 
    t.image = E.getImg(t.image, 150), e.selectPromotion.length && (e.selectPromotion = c(e.selectPromotion)), 
    e.showGifts = [], e.showAttachments = [], e.gifts.skus.forEach(function(t) {
        t.image = E.getImg(t.image, 150), 1 == t.type && e.showAttachments.push(t), 2 == t.type && e.showGifts.push(t);
    }), e.gifts.listGiftPools && (e.gifts.listGiftPools = e.gifts.listGiftPools.map(function(e) {
        return e.skus = e.skus.map(function(e) {
            return Object.assign(e, {
                image: E.getImg("http://img10.360buyimg.com/n4/" + e.image, 175)
            });
        }), e;
    })), (t.color || t.size) && J[t.id] > 1 ? t.colorSizeNum = J[t.id] : J[t.id] = t.colorSizeNum, 
    e.areaStockState) {
        var r = e.areaStockState, n = r.attr_a, u = void 0 === n ? "" : n, a = r.attr_c, o = void 0 === a ? "" : a, s = r.attr_e, d = void 0 === s ? "" : s, l = !u && !o && !d, p = X[t.id];
        p || l ? p && !l && (X[t.id] = {
            attr_a: u,
            attr_c: o,
            attr_e: d
        }, Object.assign(p, X[t.id])) : X[t.id] = {
            attr_a: u,
            attr_c: o,
            attr_e: d
        }, p && (e.areaStockState = p);
    }
    return e;
}

function c(e) {
    var t = {
        list: [],
        value: "",
        index: 0
    };
    return (e = e.filter(function(e) {
        return 1 != e.ptype && 4 != e.ptype;
    })).every(function(e, i) {
        return 1 != e.sstate || (t.value = e.pnote, t.index = i, !1);
    }), t.list = e.slice(0, e.length), t;
}

function a(e) {
    var t = [], i = 0, r = 0, n = 0;
    if ([ {
        name: "global",
        text: "海囤全球商品"
    }, {
        name: "otcdrug",
        text: "京东大药房药品"
    } ].forEach(function(u, c) {
        var a = e[u.name];
        a && 0 != a.chkMainSkuNum && (t.push({
            category: u.name,
            text: u.text,
            checkedNum: a.chkMainSkuNum,
            checkedSkuCount: a.checkedSkuCount,
            price: k(a.factPrice),
            checked: !1
        }), i += +a.chkMainSkuNum, r += +a.factPrice, n += +a.checkedSkuCount);
    }), t.length) {
        var u = e.chkMainSkuNum - i, c = e.checkedSkuCount - n;
        u && t.push({
            category: "other",
            text: "其它商品",
            checkedSkuCount: c,
            checkedNum: u,
            price: k(e.factPrice - r),
            checked: !1
        }), t[0].checked = !0;
    }
    return t;
}

function o(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], i = [], r = {}, o = e.cart.partition || {}, g = "", _ = [], T = e.graySwitch || 0;
    return t && h(), y(e.cart.presale), Object.assign(r, {
        editChecked: !1,
        skuNum: e.cart.skuNumAndPrice.mainSkuCount,
        checked: 1 == e.cart.allChecked,
        checkedNum: e.cart.skuNumAndPrice.chkMainSkuNum,
        checkedSkuCount: e.cart.skuNumAndPrice.checkedSkuCount,
        price: k(e.cart.skuNumAndPrice.factPrice),
        cashback: k(e.cart.skuNumAndPrice.cashBack),
        total: k(+e.cart.skuNumAndPrice.factPrice + +e.cart.skuNumAndPrice.cashBack),
        selectable: !0,
        details: a(e.cart.skuNumAndPrice),
        allChecked: 1 == e.cart.allChecked
    }), _ = d(e.cart.freightconfig), S(e.cart.skuNumAndPrice), v(e.cart), e.cart.venderCart.forEach(function(e, t) {
        var r = n(e, t);
        e.sortedItems.forEach(function(e, t) {
            var i = A({
                itemIndex: t,
                itemId: e.itemId,
                polyType: e.polyType
            }, e.polyItem), n = s(i);
            if (W[n] || (W[n] = i), i.factPrice && (i.factPrice = k(i.factPrice)), i.promoPrice && (i.promoPrice = k(i.promoPrice)), 
            -1 == r.vid && Object.assign(r, {
                vid: e.itemId,
                isVirtual: !0
            }), !K[r.vid] && (K[r.vid] = r), r.vname = K[r.vid].vname, i.selectable = !0, i.hidePrice = !1, 
            i.polyType == D.SUIT) {
                i.ptype = i.polyType == D.SINGLE ? B.NORMAL : i.polyType == D.SUIT ? B.SUIT : i.polyType == D.MF_SUIT ? B.PROMO_MF_NORMAL : i.polyType == D.MZ_SUIT ? B.PROMO_MZ_NORMAL : void 0;
                var a = r.vid + "_" + i.polyType + "_" + i.itemId;
                !z[a] && (z[a] = i), Object.assign(i, {
                    uuid: a,
                    editChecked: !1,
                    isSuit: !0,
                    isVirtualSuit: !!i.vSkuId
                });
            }
            i.suits && i.suits.forEach(function(e, t) {
                e.factPrice && (e.factPrice = k(e.factPrice)), e.promoPrice && (e.promoPrice = k(e.promoPrice)), 
                e.selectPromotion = c(e.selectPromotion), e.ptype = i.polyType == D.MF_SUIT ? B.PROMO_MF_VIRTUAL_SUIT : i.polyType == D.MZ_SUIT ? B.PROMO_MZ_VIRTUAL_SUIT : void 0, 
                e.isSuit = !0;
                var n = r.vid + "_" + i.polyType + "_" + i.itemId + "_" + e.vSkuId;
                Object.assign(e, {
                    isSuit: !0,
                    isVirtualSuit: !0,
                    uuid: n,
                    itemIndex: t,
                    polyType: i.polyType,
                    itemId: i.itemId
                }), z[n] ? Object.assign(z[n], e) : z[n] = e, e.selectable = !0, e.hidePrice = !1, 
                e.vSkuId && (e.selectable = I(e.vSkuId)), e.vSkuId && (e.hidePrice = P(e.vSkuId)), 
                e.vSkuId && Q[e.vSkuId] && (e.presale = Q[e.vSkuId]), e.products.forEach(function(t, r, c) {
                    H.push(t.mainSku.id), t = u(t);
                    var a = n + "_" + t.mainSku.id;
                    Object.assign(t, {
                        uuid: a,
                        wxKey: i.polyType + "_" + e.vSkuId + "_" + t.mainSku.id,
                        itemId: e.vSkuId,
                        polyType: i.polyType,
                        isSuit: !0,
                        isVirtualSuit: !0,
                        pid: e.promotion ? e.promotion.pid : 0
                    }), z[a] ? Object.assign(z[a], t) : z[a] = t, t.selectable = I(t.mainSku.id), t.hidePrice = P(t.mainSku.id), 
                    Q[t.mainSku.id] && (t.presale = Q[t.mainSku.id]), e.selectable && (e.selectable = t.selectable), 
                    !e.hidePrice && (e.hidePrice = t.hidePrice);
                });
            }), i.products.forEach(function(e, t, n) {
                H.push(e.mainSku.id), e = u(e);
                var c = r.vid + "_" + i.polyType + "_" + i.itemId + "_" + e.mainSku.id;
                Object.assign(e, {
                    itemIndex: t,
                    uuid: c,
                    wxKey: i.polyType + "_" + i.itemId + "_" + e.mainSku.id,
                    itemId: i.isVirtualSuit ? i.vSkuId : i.itemId,
                    polyType: i.polyType,
                    pid: i.promotion ? i.promotion.pid : 0,
                    isSuit: i.isSuit,
                    isVirtualSuit: i.isVirtualSuit
                }), i.polyType != D.SUIT && (e.ptype = i.polyType == D.SINGLE ? B.NORMAL : i.polyType == D.SUIT ? B.SUIT : i.polyType == D.MF_SUIT ? B.PROMO_MF_NORMAL : i.polyType == D.MZ_SUIT ? B.PROMO_MZ_NORMAL : void 0, 
                Object.assign(e, {
                    editChecked: !1,
                    isSuit: !1
                })), z[c] ? Object.assign(z[c], e) : z[c] = e, e.selectable = I(e.mainSku.id), e.hidePrice = P(e.mainSku.id), 
                Q[e.mainSku.id] && (e.presale = Q[e.mainSku.id]);
            }), i.manGiftSkus && (i.manGiftSkus = i.manGiftSkus.map(function(e) {
                var t = 2 == e.giftSelectState;
                return e.ptype = i.polyType == D.MF_SUIT ? B.PROMO_MF_GIFT : i.polyType == D.MZ_SUIT ? t ? B.PROMO_MZ_REMOVE_GIFT : B.PROMO_MZ_ADD_GIFT : void 0, 
                e.image = E.getImg(e.image, 150), e.price = k(e.price), e.promoPrice = k(e.promoPrice).split(/\./), 
                e;
            })), i.vSkuId && Q[i.vSkuId] && (i.presale = Q[i.vSkuId]), i.vSkuId && (i.selectable = I(i.vSkuId)), 
            i.vSkuId && (i.hidePrice = P(i.vSkuId)), i.selectable && i.isSuit && i.products.length && (i.selectable = i.products.every(function(e) {
                return e.selectable;
            })), !i.hidePrice && i.isSuit && i.products.length && (i.hidePrice = i.products.some(function(e) {
                return e.hidePrice;
            })), i.selectable && i.suits && i.suits.length && (i.selectable = i.suits.some(function(e) {
                return e.selectable;
            })), !i.hidePrice && i.suits && i.suits.length && (i.hidePrice = i.suits.some(function(e) {
                return e.hidePrice;
            })), i.selectable && !i.isSuit && i.products && i.products.length && (i.selectable = i.products.some(function(e) {
                return e.selectable;
            })), !i.hidePrice && !i.isSuit && i.products && i.products.length && (i.hidePrice = i.products.some(function(e) {
                return e.hidePrice;
            })), r.list.push(i);
        }), r.checked = f(r), r.selectable = l(r), i.push(r);
    }), r.selectable = p(i), !r.allChecked && (r.checked = m(i)), +e.cart.skuNumAndPrice.mainSkuCount > w ? (w = e.cart.skuNumAndPrice.mainSkuCount, 
    g = "top") : w = e.cart.skuNumAndPrice.mainSkuCount, b(r), {
        scrollIntoView: g,
        venders: i,
        summary: r,
        freight: _,
        partition: o,
        graySwitch: T
    };
}

function s(e) {
    var t = e.polyType == D.SUIT && e.vSkuId, i = e.itemId;
    return t && e.promotion && (i = e.vSkuId), i;
}

function d() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
    return e.length ? Z = e.map(function(e) {
        return {
            type: 0 == e.sequence ? "zy" : "fresh",
            list: t ? e.basefreightconfig.filter(function(e) {
                return 0 == e.baseAmount;
            }) : e.basefreightconfig
        };
    }) : Z;
}

function l(e) {
    return (e.list || []).some(function(e) {
        return e.selectable;
    });
}

function p() {
    return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).some(function(e) {
        return e.selectable;
    });
}

function m() {
    return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).every(function(e) {
        return e.checked || !e.selectable;
    });
}

function f(e) {
    var t = [];
    K[e.vid].list.forEach(function(r) {
        var n = s(r), u = e.list.find(function(e) {
            var t = s(e);
            return n == t;
        }) || r;
        u.selectable && (u.polyType == D.SINGLE ? t = [].concat(i(t), i(u.products)) : u.polyType == D.SUIT ? t.push(u) : t = [].concat(i(t), i(u.suits || []), i(u.products)));
    });
    var r = t.filter(function(e) {
        return 1 == e.checkType || !e.selectable;
    });
    return t.length == r.length;
}

function h() {
    W = {}, z = {}, K = {}, H = [], Q = {};
}

function S(e) {
    R.setCookie({
        data: {
            mainSkuCount: e.mainSkuCount,
            cartNum: e.mainSkuNum
        },
        defaultExpires: !0
    });
}

function k() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t = arguments[1];
    return e = (e / 100).toFixed(2), t ? e.split(".") : e;
}

function v(e) {
    var t = e.currentCount, i = e.maxCount;
    L = +i || 120, V = +t || 0;
}

function y(e) {
    try {
        Q = {};
        for (var t in e) {
            var i = 1 == e[t].hidePrice, r = "", n = 1 == e[t].ableToSubmit, u = "", c = "";
            if (e[t].status == q.PRESALE) 1 == e[t].type && (r = "点击到商品详情页，预约成功才可抢购"), e[t].buyStartTime ? (c = T(e[t].buyStartTime)) > 24 && (u = _(e[t].buyStartTime)) : e[t].endTime && (u = _(e[t].endTime)); else if (e[t].status == q.BEFORE_SNAP_UP) (c = T(e[t].buyStartTime)) > 24 && (u = _(e[t].buyStartTime)); else {
                if (e[t].status != q.SNAP_UP) continue;
                (c = T(e[t].buyEndTime)) > 24 && (u = _(e[t].buyEndTime));
            }
            Q[t] = Object.assign(e[t], {
                hidePrice: i,
                toSkuDetailText: r,
                selectable: n,
                hours: c,
                dateTime: u
            });
        }
    } catch (e) {
        j.error(e);
    }
}

function g(e) {
    return Q[e];
}

function I(e) {
    var t = !0;
    return Q[e] && !Q[e].selectable && (t = !1), t;
}

function P(e) {
    var t = !1;
    return Q[e] && Q[e].hidePrice && (t = !0), t;
}

function _() {
    var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").replace(/-/g, "/"), t = new Date(e);
    return t ? t.getMonth() + 1 + "月" + t.getDate() + "日" : "";
}

function T() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = E.getServerTime() || "", i = e.replace(/-/g, "/") || "";
    i = new Date(i).getTime();
    var r = void 0;
    return t && i && (r = (i - t) / 36e5), r;
}

function b(e) {
    G.checkedSkuCount = e.checkedSkuCount, G.checked = e.checked;
}

function O() {
    return G;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.DataStore = void 0;

var M = function() {
    function e(e, t) {
        var i = [], r = !0, n = !1, u = void 0;
        try {
            for (var c, a = e[Symbol.iterator](); !(r = (c = a.next()).done) && (i.push(c.value), 
            !t || i.length !== t); r = !0) ;
        } catch (e) {
            n = !0, u = e;
        } finally {
            try {
                !r && a.return && a.return();
            } finally {
                if (n) throw u;
            }
        }
        return i;
    }
    return function(t, i) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, i);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), N = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var r = t[i];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, i, r) {
        return i && e(t.prototype, i), r && e(t, r), t;
    };
}(), A = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var i = arguments[t];
        for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (e[r] = i[r]);
    }
    return e;
}, U = require("../../../common/logger.js"), E = e(require("../../../common/fe_helper.js")), R = e(require("../../../common/cookie-v2/cookie.js")), C = require("../../../common/numberp.js"), j = new U.Logger("购物车data-store"), x = 8888, F = 8899, w = 0, L = 0, V = 0, G = {
    checkedSkuCount: 0,
    checked: !1
}, Z = [], D = {
    SINGLE: 1,
    SUIT: 2,
    MF_SUIT: 3,
    MZ_SUIT: 4
}, B = {
    NORMAL: 1,
    SUIT: 4,
    PROMO_MF_NORMAL: 11,
    PROMO_MF_GIFT: 10,
    PROMO_MF_VIRTUAL_SUIT: 24,
    PROMO_MF_SUIT: 9,
    PROMO_MZ_NORMAL: 13,
    PROMO_MZ_ADD_GIFT: 15,
    PROMO_MZ_REMOVE_GIFT: 16,
    PROMO_MZ_VIRTUAL_SUIT: 29,
    PROMO_MZ_SUIT: 12
}, q = {
    BEFORE_PRESALE: 1,
    PRESALE: 2,
    BEFORE_SNAP_UP: 3,
    SNAP_UP: 4,
    SNAP_UP_END: 5,
    UNKNONW: -1
}, W = {}, z = {}, K = {}, Y = {}, H = [], J = {}, Q = {}, X = {}, $ = function() {
    function e() {
        t(this, e);
    }
    return N(e, null, [ {
        key: "format",
        value: function(e, t) {
            return o(e, t);
        }
    }, {
        key: "getAllSkuId",
        value: function() {
            var e = {}, t = !0, i = !1, r = void 0;
            try {
                for (var n, u = Object.entries(z)[Symbol.iterator](); !(t = (n = u.next()).done); t = !0) {
                    var c = M(n.value, 2), a = c[0], o = c[1];
                    o.mainSku && (e[o.mainSku.id] ? e[o.mainSku.id].push(a) : e[o.mainSku.id] = [ a ]);
                }
            } catch (e) {
                i = !0, r = e;
            } finally {
                try {
                    !t && u.return && u.return();
                } finally {
                    if (i) throw r;
                }
            }
            return e;
        }
    }, {
        key: "getVenders",
        value: function() {
            return Object.values(K);
        }
    }, {
        key: "getVenderById",
        value: function(e) {
            return K[e];
        }
    }, {
        key: "updateVender",
        value: function(t) {
            var r = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], n = e.getVenderById(t.vid);
            return t = Object.assign({}, t), !!n && (n.list = r ? [].concat(i(t.list)) : n.list.map(function(e) {
                return t.list.find(function(t) {
                    return s(e) == s(t);
                }) || e;
            }), delete t.list, delete t.vname, t.index = n.index, t.checked = f(n), t.selectable = l(n), 
            Object.assign(n, A({}, t)), n);
        }
    }, {
        key: "getSkuCategoryNum",
        value: function() {
            return {
                skuCateUpperLimit: L,
                currentSkuCateNum: V
            };
        }
    }, {
        key: "queryProductByUUID",
        value: function(e) {
            return z[e];
        }
    }, {
        key: "queryItemByItemId",
        value: function(e) {
            return W[e];
        }
    }, {
        key: "updateProduct",
        value: function(e) {
            var t = z[e.uuid];
            return !!t && (t.polyType != D.SUIT && (e.itemIndex = t.itemIndex), Object.assign(e, {
                editChecked: t.editChecked
            }), z[e.uuid] = e, e);
        }
    }, {
        key: "updateItem",
        value: function(t) {
            var i = s(t), r = W[i];
            return !!r && (t.suits && t.suits.forEach(function(t) {
                e.updateProduct(t);
            }), t.products.forEach(function(t) {
                e.updateProduct(t);
            }), t.itemIndex = r.itemIndex, W[i] = t, t.polyType == D.SUIT && e.updateProduct(t), 
            t);
        }
    }, {
        key: "getItemId",
        value: function(e) {
            return s(e);
        }
    }, {
        key: "getVendersNames",
        value: function() {
            return Y;
        }
    }, {
        key: "getSummarySelectable",
        value: function(e) {
            return p(e);
        }
    }, {
        key: "getSummaryChecked",
        value: function(e) {
            return m(e);
        }
    }, {
        key: "filterMargin",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = Object.keys(e), i = this.getAllSkuId(), r = {};
            return t && t.forEach(function(t) {
                i[t] && (r[t] = e[t]);
            }), r;
        }
    }, {
        key: "findPresale",
        value: function(e) {
            return g(e);
        }
    }, {
        key: "getSummaryCache",
        value: function() {
            return O();
        }
    }, {
        key: "updateSummaryCache",
        value: function(e) {
            b(e);
        }
    }, {
        key: "POLY_TYPES",
        get: function() {
            return D;
        }
    } ]), e;
}();

exports.DataStore = $;