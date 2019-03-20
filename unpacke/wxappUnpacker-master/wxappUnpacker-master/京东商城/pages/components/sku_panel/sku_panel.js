function t(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e.default = t, e;
}

function e(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = n, t;
}

function n(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function o(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != typeof e && "function" != typeof e ? t : e;
}

function r(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}

function a(t) {
    var e = "";
    return "object" == (void 0 === t ? "undefined" : i(t)) ? e = t.message : "string" == typeof t && (e = t), 
    e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.SkuPanel = void 0;

var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, u = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, o.key, o);
        }
    }
    return function(e, n, o) {
        return n && t(e.prototype, n), o && t(e, o), e;
    };
}(), s = require("../../component.js"), c = t(require("./api.js")), l = t(require("../../../common/fe_helper.js")), p = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../libs/promise.min.js")), f = getApp(), h = 1, d = {
    skuProps: [],
    numController: !0,
    info: {
        text: "",
        price: "",
        image: "",
        sku: 0,
        name: ""
    },
    num: {
        total: 1,
        add: !0,
        sub: !1
    },
    newColorSize: [],
    show: !1,
    others: null,
    pool: {},
    canBuy: !0,
    itemTip: ""
}, m = {
    color: "颜色",
    size: "尺寸",
    spec: "规格"
}, k = function(t) {
    function i() {
        n(this, i);
        var t = o(this, (i.__proto__ || Object.getPrototypeOf(i)).apply(this, arguments));
        return t.addFunc("_hideSkuPanel", t.hideSkuPanel), t.addFunc("_confirmSkuPanel", t.confirmSkuPanel), 
        t.addFunc("_changeSku", t.changeSku), t.addFunc("_addNum", t.addNum), t.addFunc("_subNum", t.subNum), 
        t.addFunc("_inputNum", t.inputNum), t;
    }
    return r(i, s.Component), u(i, [ {
        key: "defaultData",
        value: function() {
            return d;
        }
    }, {
        key: "onLoad",
        value: function() {
            f.event.on("showSkuPanel", this.showSkuPanel.bind(this));
        }
    }, {
        key: "onUnload",
        value: function() {
            f.event.off("showSkuPanel");
        }
    }, {
        key: "showSkuPanel",
        value: function(t) {
            var e = this, n = t.sku, o = t.total, r = t.numController, a = t.price, i = t.lowNum, u = t.image, s = t.others;
            if (this.setData({
                numController: r,
                others: s,
                show: !0
            }), a && u && this.setData({
                "info.price": a.split("."),
                "info.image": u
            }), i && "0" != i && (h = +i), s.packList) {
                for (var p = s.fIndex, f = s.sIndex, d = s.suit, k = s.packList[p].poolList[f - 1], v = k.saleProp, y = k.saleNames, P = [], g = {}, S = {}, b = k.colorList.length - 1; b >= 0; b--) if (n == k.colorList[b].skuId) {
                    S = k.colorList[b], g = {
                        color: k.colorList[b].color || "",
                        size: k.colorList[b].size || "",
                        spec: k.colorList[b].spec || ""
                    };
                    break;
                }
                y.forEach(function(t) {
                    var e = {};
                    e.value = v[t], e.name = t, e.text = m[t], e.current = g[t], e.sale = !0, P.push(e);
                });
                var N = d.cartid.split("_"), I = N.shift();
                N[f] = S.skuId;
                var w = N.join(",");
                c.fetchSuitPrice({
                    suitId: I,
                    skuIds: w
                }).then(function(t) {
                    var n = {
                        price: t.suitSkuPriceList[f].finalPrice.toFixed(2).split("."),
                        image: l.getImg(S.skuPicUrl, 160),
                        text: [ g.color, g.size, g.spec ].join(" "),
                        name: S.skuName,
                        sku: S.skuId,
                        choose: ""
                    };
                    e.setData({
                        info: n,
                        skuProps: P,
                        show: !0,
                        pool: k
                    });
                }).catch(function(t) {
                    e.toast.show({
                        icon: e.toast.ICON.WARNING,
                        content: t.message || "网络错误，请稍后重试~"
                    });
                });
            } else this.getSkuInfo(n).then(function(t) {
                var r = {
                    sub: (o = +o || 1) > h,
                    add: o < 200,
                    total: o || 1
                };
                e.setData({
                    num: r
                });
                var a = e.calcSkuForEachProp(t.props), i = e.updateCurrentSelect(t.props).join(""), u = t.skuName, s = [];
                a.forEach(function(t) {
                    s.push(t.current);
                }), s = s.join(" ");
                var c = {
                    price: ("" + t.price).split("."),
                    image: l.getImg(t.image, 160),
                    text: i,
                    name: u,
                    sku: n,
                    choose: s
                };
                e.setData({
                    info: c,
                    skuProps: a
                });
            }).catch(function(t) {
                e.toast.show({
                    icon: e.toast.ICON.WARNING,
                    content: t.message || "网络错误，请稍后重试~"
                });
            });
        }
    }, {
        key: "getSkuInfo",
        value: function(t) {
            var e = this;
            return new p.default(function(n, o) {
                c.initItem(t).then(function(t) {
                    var o = {};
                    o.canBuy = t.canBuy, o.skuId = t.skuId, o.skuName = t.skuName, o.props = t.props, 
                    o.marketPrice = t.marketPrice, o.originPrice = t.originPrice, o.price = t.price, 
                    o.image = t.images[0], ("" + o.price).indexOf(".") < 0 && (o.price = parseFloat(o.price).toFixed(2)), 
                    e.data.newColorSize && !e.data.newColorSize.length && e.setData({
                        newColorSize: t.newColorSize
                    }), n(o);
                }).catch(function(t) {
                    o(t);
                });
            });
        }
    }, {
        key: "getCurrentSelect",
        value: function(t) {
            var e = {};
            return t || (t = this.data.skuProps), t.forEach(function(t) {
                e[t.name] = t.current;
            }), e;
        }
    }, {
        key: "calcSkuForEachProp",
        value: function(t) {
            var n = this.data, o = n.skuProps, r = n.newColorSize, a = o.length ? o : t, i = this.getCurrentSelect(a);
            return Array.isArray(a) && a.forEach(function(t) {
                var n = [];
                t.value.forEach(function(o) {
                    var a = {};
                    Object.assign(a, i, e({}, t.name, o));
                    var u = c.getSpecifySku(a, r);
                    n.push(u.join("|"));
                }), t.sku = n;
            }), a;
        }
    }, {
        key: "updateCurrentSelect",
        value: function(t) {
            var e = [];
            return (t = t || this.data.skuProps).forEach(function(t) {
                t.current && t.value.length >= 1 && e.push(t.current, " ");
            }), e;
        }
    }, {
        key: "hideSkuPanel",
        value: function() {
            this.setData({
                show: !1
            }), this.setData(d);
        }
    }, {
        key: "confirmSkuPanel",
        value: function() {
            if (this.data.canBuy) {
                var t = this.data.info, e = this.data.num.total, n = this.data.others, o = this.data.skuProps, r = this.getCurrentSelect(o);
                this.checkPropSelect(r) ? (this.emit("confirmSkuPanel", {
                    info: t,
                    num: e,
                    others: n
                }), this.hideSkuPanel()) : this.toast.show({
                    icon: this.toast.ICON.WARNING,
                    content: "您未完整选中规格参数"
                });
            }
        }
    }, {
        key: "changeSku",
        value: function(t) {
            var n = this, o = this.data.skuProps, r = t.currentTarget.dataset, i = r.i, u = r.idx, s = r.name, p = t.currentTarget.dataset.val;
            if (o[i].sku) {
                var f = o[i].sku[u];
                if (!f) return;
                var h = this.getCurrentSelect();
                p == h[s] && (p = ""), this.setData(e({}, "skuProps[" + i + "].current", p));
                var d = this.calcSkuForEachProp();
                this.setData({
                    skuProps: d
                }), this.updateCurrentSelect(), h = this.getCurrentSelect(), 1 == f.split("|").length && this.checkPropSelect(h) && f != this.data.info.sku && this.getSkuInfo(f).then(function(t) {
                    void 0 === t.canBuy || t.canBuy ? n.setData({
                        itemTip: "",
                        canBuy: !0
                    }) : n.setData({
                        itemTip: "无货，或此商品不支持配送至该地址",
                        canBuy: !1
                    });
                    var e = n.calcSkuForEachProp(t.props), o = n.updateCurrentSelect(t.props).join(""), r = t.skuName, a = [];
                    e.forEach(function(t) {
                        a.push(t.current);
                    }), a = a.join(" ");
                    var i = {
                        price: ("" + t.price).split("."),
                        image: l.getImg(t.image),
                        text: o,
                        name: r,
                        sku: f,
                        choose: a
                    };
                    n.setData({
                        info: i,
                        skuProps: e
                    });
                }).catch(function(t) {
                    n.toast.show({
                        icon: n.toast.ICON.WARNING,
                        content: a(t) || "网络错误~"
                    });
                });
            } else {
                var m = this.data, k = m.skuProps, v = m.others, y = k[i].value[u], P = v.suit, g = v.sIndex, S = {}, b = this.data.pool, N = b.saleNames, I = null, w = [];
                k[i].current = y, k.forEach(function(t) {
                    S[t.name] = t.current, w.push(t.current);
                }), w = w.join(" ");
                for (var C = b.colorList.length - 1; C >= 0; C--) for (var j = 0, _ = N.length - 1; _ >= 0; _--) S[N[_]] == b.colorList[C][N[_]] && ++j == N.length && (I = b.colorList[C]);
                if (!I) return;
                var x = P.cartid.split("_"), O = x.shift();
                x[g] = I.skuId;
                var D = x.join(",");
                c.fetchSuitPrice({
                    suitId: O,
                    skuIds: D
                }).then(function(t) {
                    var e = t.suitSkuPriceList[g].finalPrice, o = {
                        price: t.packPromotionPrice.toFixed(2),
                        dis: t.packOriginalPrice.toFixed(2),
                        mprice: t.suitDiscount.toFixed(2)
                    }, r = {
                        price: e.toFixed(2).split("."),
                        image: l.getImg(I.skuPicUrl, 160),
                        text: [ S.color, S.size, S.spec ].join(" "),
                        name: I.skuName,
                        sku: I.skuId,
                        choose: w
                    };
                    P.suitPrice = o, n.setData({
                        info: r,
                        skuProps: k,
                        "others.suit": P
                    });
                }).catch(function(t) {
                    n.toast.show({
                        icon: n.toast.ICON.WARNING,
                        content: t.message || "网络错误，请稍后重试~"
                    });
                });
            }
        }
    }, {
        key: "checkPropSelect",
        value: function(t) {
            for (var e in t) if (!t[e]) return !1;
            return !0;
        }
    }, {
        key: "addNum",
        value: function(t) {
            var e = this.data.num.total;
            this.updateNum(+e + 1);
        }
    }, {
        key: "subNum",
        value: function(t) {
            var e = this.data.num.total;
            this.updateNum(+e - 1);
        }
    }, {
        key: "inputNum",
        value: function(t) {
            var e = t.detail.value;
            this.updateNum(parseInt(e) || 1);
        }
    }, {
        key: "updateNum",
        value: function(t) {
            var e = Math.min(200, 999), n = "", o = this.data.num, r = o.add, a = o.sub;
            t <= h ? (t = h, a = !1, h > 1 && (n = "该商品最少需购买" + h + "件")) : t >= e ? (t = e, 
            r = !1, n = 200 == e ? "单款最多可买200件" : "该商品最多可购买" + e + "件") : (r = !0, a = !0), 
            n && this.toast.show({
                icon: this.toast.ICON.WARNING,
                content: n
            }), this.setData({
                "num.total": t,
                "num.add": r,
                "num.sub": a
            });
        }
    } ]), i;
}();

exports.SkuPanel = k;