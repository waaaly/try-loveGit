function e(e) {
    if (Array.isArray(e)) {
        for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
        return r;
    }
    return Array.from(e);
}

function t() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
    return (e = e.map(function(e) {
        return e.list.sort(function(e, t) {
            return e.rangeSt - t.rangeSt;
        }).map(function(e) {
            return e.calcRangeSt = 100 * e.rangeSt, e.calcRangeEd = 100 * e.rangeEd, e.calcWeight = 1e3 * e.fWeight, 
            e;
        }), e;
    })).length && (w = e), w;
}

function r(e) {
    var t = [ "8888", "1000076153" ], r = [ "603837", "146426", "663284", "667688" ], i = l.getVenders();
    return e = e.filter(function(e) {
        return !r.includes(e.vid) && (t.includes(e.vid) || 1 == e.fbpVender);
    }).map(function(e) {
        var t = i.find(function(t) {
            return e.vid === t.vid;
        });
        if (t) {
            var r = Object.assign({}, t);
            delete r.list, Object.assign(e, r);
        }
        return e;
    });
}

function i(e) {
    var t = "" + e.mainSku.id;
    return l.getLargeCargos()[t];
}

function n(e) {
    var t = e.fresh, r = e.nofresh, i = e.rules, n = i.length ? i[0].list : [], s = !!n.length && n[0], a = s ? "本店商品可与自营非生鲜商品同享满" + s.rangeSt + "元(" + s.fWeight + "kg内)免运费" : "", h = {
        show: !1,
        isFreeShipping: !1,
        overweight: !1,
        category: d.ALL,
        amount: 0,
        weight: 0,
        btmTip: a,
        vids: r.list
    };
    return r.exist ? r.overweight ? Object.assign({
        show: !0,
        overweight: !0,
        nofreshOverweight: !0,
        vids: o(r.list),
        btmTip: r.btmTip
    }) : r.isFreeShipping ? (h.nofreshIsFreeShipping = !0, t.exist ? t.overweight ? Object.assign(h, {
        show: !0,
        overweight: !0,
        vids: o(t.list),
        btmTip: r.btmTip
    }) : t.isFreeShipping ? Object.assign(h, {
        show: !0,
        isFreeShipping: !0,
        vids: o(t.list),
        btmTip: r.btmTip
    }) : Object.assign(h, {
        show: !0,
        vids: o(t.list),
        amount: t.amount,
        weight: t.weight,
        category: d.FRESH,
        btmTip: r.btmTip
    }) : Object.assign(h, {
        show: !0,
        isFreeShipping: !0,
        vids: o(r.list),
        btmTip: r.btmTip
    })) : Object.assign(h, {
        show: !0,
        isFreeShipping: !1,
        category: t.exist ? t.overweight || t.isFreeShipping ? d.NON_FRESH : d.ALL : d.NON_FRESH,
        amount: r.amount,
        weight: r.weight,
        vids: t.exist ? Object.assign({}, o(r.list), o(t.list)) : o(r.list),
        btmTip: r.btmTip
    }) : t.exist ? t.overweight ? Object.assign({
        show: !0,
        overweight: !0,
        vids: o(t.list),
        btmTip: r.btmTip
    }) : t.isFreeShipping ? Object.assign(h, {
        show: !0,
        isFreeShipping: !0,
        vids: o(t.list),
        btmTip: r.btmTip
    }) : Object.assign(h, {
        show: !0,
        vids: o(t.list),
        amount: t.amount,
        weight: t.weight,
        category: d.FRESH,
        btmTip: r.btmTip
    }) : h;
}

function s(e) {
    if (e.show && e.amount > 0) {
        var t = 1 == e.category;
        u.ReportManager.addPtagExposure(p.CART_FREIGHT_ADDON), u.ReportManager.addPtagExposure(t ? p.CART_FREIGHT_ADDON_FRESH : p.CART_FREIGHT_ADDON_NON_FRESH);
        var r = Object.entries(e.vids), i = !0, n = !1, s = void 0;
        try {
            for (var o, a = r[Symbol.iterator](); !(i = (o = a.next()).done); i = !0) {
                var h = g(o.value, 2), f = h[0], c = h[1].skus;
                if (8888 != f && c.length) return u.ReportManager.addPtagExposure(p.CART_FREIGHT_ADDON_FBP_ENTRY);
            }
        } catch (e) {
            n = !0, s = e;
        } finally {
            try {
                !i && a.return && a.return();
            } finally {
                if (n) throw s;
            }
        }
    } else e.show && e.isFreeShipping && (u.ReportManager.addPtagExposure(p.CART_FREIGHT_ADDON_SUCCESS), 
    e.nofreshIsFreeShipping && u.ReportManager.addPtagExposure(p.CART_FREIGHT_ADDON_SUCCESS_NON_FRESH));
}

function o(e) {
    return e;
}

function a(e, t, r) {
    var i = !0, n = !1, s = void 0;
    try {
        for (var o, a = Object.entries(e)[Symbol.iterator](); !(i = (o = a.next()).done); i = !0) {
            var h = g(o.value, 1)[0];
            v[h + "_" + r.type] = {
                tip: t,
                rule: r
            }, v[h] = {
                tip: t,
                rule: r
            };
        }
    } catch (e) {
        n = !0, s = e;
    } finally {
        try {
            !i && a.return && a.return();
        } finally {
            if (n) throw s;
        }
    }
}

function h(e, t) {
    var r = {
        fresh: {
            exist: !1,
            amount: 0,
            weight: 0,
            overweight: !1
        },
        nofresh: {
            exist: !1,
            amount: 0,
            weight: 0,
            overweight: !1
        },
        rules: e
    }, i = !0, n = !1, s = void 0;
    try {
        for (var o, h = Object.entries(t)[Symbol.iterator](); !(i = (o = h.next()).done); i = !0) {
            var u = g(o.value, 2), l = u[0], p = u[1];
            if (r[l].list = p.list, "nofresh" === l && p.price) {
                var d = e.find(function(e) {
                    return "zy" === e.type;
                }), v = c(d, p);
                if (v) if (r.nofresh.list = p.list, r.nofresh.rule = d.list, r.nofresh.exist = !0, 
                r.nofresh.total = p.price / 100, r.nofresh.amount = (v.calcRangeSt - p.price) / 100, 
                r.nofresh.weight = p.weight / 1e3, r.nofresh.btmTip = "本店商品可与自营非生鲜商品同享满" + v.rangeSt + "元(" + v.fWeight + "kg内)免运费", 
                p.weight > v.calcWeight) r.nofresh.overweight = !0, r.nofresh.btmTip = "本店商品可与自营非生鲜商品同享满" + v.rangeSt + "元(" + v.fWeight + "kg内)免运费", 
                a(r.nofresh.list, "所选商品重量已超过" + v.fWeight + "kg，需支付续重运费，最终运费以填写订单页为准", d); else {
                    r.nofresh.isFreeShipping = f(v, p), r.nofresh[8888] && (r.nofresh[8888].hasAddon = !r.nofresh.isFreeShipping);
                    var w = r.nofresh.isFreeShipping ? "运费与订单的配送方式及配送地址有关，最终运费以填写订单页为准" : "非生鲜商品满" + v.rangeSt + "元（" + v.fWeight + "kg内）免运费，已选非生鲜商品总重" + p.weight / 1e3 + "kg，还差" + r.nofresh.amount + "元可免运费";
                    a(r.nofresh.list, w, d);
                }
            }
            if ("fresh" === l && p.price) {
                var T = e.find(function(e) {
                    return "fresh" === e.type;
                }), R = c(T, p);
                if (R) if (r.fresh.list = p.list, r.fresh.rule = T.list, r.fresh.exist = !0, r.fresh.total = p.price / 100, 
                r.fresh.amount = (R.calcRangeSt - p.price) / 100, r.fresh.weight = p.weight / 1e3, 
                p.weight > R.calcWeight) r.fresh.overweight = !0, a(r.fresh.list, "所选商品重量已超过" + R.fWeight + "kg，需支付续重运费，最终运费以填写订单页为准", T); else if (r.fresh.isFreeShipping = f(R, p), 
                r.fresh[8888] && (r.fresh[8888].hasAddon = !r.fresh.isFreeShipping), !r.nofresh.exist || r.nofresh.isFreeShipping) {
                    var m = r.fresh.isFreeShipping ? "运费与订单的配送方式及配送地址有关，最终运费以填写订单页为准" : "生鲜商品满" + R.rangeSt + "元（" + R.fWeight + "kg内）免运费，已选生鲜商品总重" + p.weight / 1e3 + "kg，还差" + r.fresh.amount + "元可免运费";
                    a(r.fresh.list, m, T);
                }
            }
        }
    } catch (e) {
        n = !0, s = e;
    } finally {
        try {
            !i && h.return && h.return();
        } finally {
            if (n) throw s;
        }
    }
    return Object.assign(S, r), r;
}

function f(e, t) {
    var r = t.price, i = t.weight;
    return r >= e.calcRangeSt && r <= e.calcRangeEd && i <= e.calcWeight;
}

function c(e, t) {
    var r = t.price, i = t.weight;
    if (!e) return !1;
    if (0 == i) return e.list.find(function(e) {
        return r <= e.calcRangeSt || r > e.calcRangeSt && r <= e.calcRangeEd;
    });
    var n = e.list.find(function(e) {
        return r >= e.calcRangeSt && r <= e.calcRangeEd && i <= e.calcWeight;
    });
    return n || ((n = e.list.find(function(e) {
        return r <= e.calcRangeSt && i <= e.calcWeight;
    })) ? n : n = e.list.find(function(e) {
        return r >= e.calcRangeSt && r <= e.calcRangeEd && i >= e.calcWeight;
    }));
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getFreightAddonParams = exports.getFreightTips = exports.calc = void 0;

var g = function() {
    function e(e, t) {
        var r = [], i = !0, n = !1, s = void 0;
        try {
            for (var o, a = e[Symbol.iterator](); !(i = (o = a.next()).done) && (r.push(o.value), 
            !t || r.length !== t); i = !0) ;
        } catch (e) {
            n = !0, s = e;
        } finally {
            try {
                !i && a.return && a.return();
            } finally {
                if (n) throw s;
            }
        }
        return r;
    }
    return function(t, r) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, r);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), u = require("../../../api/Ptag/report_manager"), l = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}(require("./model")), p = {
    CART_FREIGHT_ADDON: "7014.18.57",
    CART_FREIGHT_ADDON_FRESH: "7014.18.48",
    CART_FREIGHT_ADDON_NON_FRESH: "7014.18.85",
    CART_FREIGHT_ADDON_SUCCESS: "7014.18.58",
    CART_FREIGHT_ADDON_SUCCESS_NON_FRESH: "7014.18.83",
    CART_FREIGHT_ADDON_FBP_ENTRY: "7014.18.62"
}, d = {
    ALL: 0,
    FRESH: 1,
    NON_FRESH: 2
}, v = {}, S = {}, w = [];

exports.calc = function(o) {
    var a = o.freight, f = o.venders, c = {
        nofresh: {
            price: 0,
            weight: 0,
            list: {}
        },
        fresh: {
            price: 0,
            weight: 0,
            list: {}
        }
    }, g = {
        fresh: 0,
        nofresh: 0
    }, u = (f = r(f)).find(function(e) {
        return 8888 == e.vid;
    }), l = function() {
        var t = f.filter(function(t) {
            return t.list.filter(function(t) {
                return [].concat(e(t.products), e(t.suits || [])).filter(function(e) {
                    return 1 == e.checkType;
                }).length;
            }).length;
        });
        return 1 == t.length && t.find(function(e) {
            return 1000076153 == e.vid;
        });
    }();
    if (!u || l) {
        var p = {};
        return f.forEach(function(e) {
            p[e.vid] = {};
        }), {
            vids: p,
            btmTip: ""
        };
    }
    f.forEach(function(t) {
        c.fresh.list[t.vid] = {
            skus: []
        }, c.nofresh.list[t.vid] = {
            skus: []
        }, c.nofresh.price += t.price - t.discount - t.freshTotalPrice - t.cashback - t.ybprice, 
        c.fresh.price += t.freshTotalPrice, c.nofresh.weight += t.totalWeight - t.freshTotalWeight, 
        c.fresh.weight += t.freshTotalWeight, t.list.forEach(function(r) {
            var n = [];
            r.suits && r.suits.forEach(function(t) {
                n.push.apply(n, e(t.products));
            });
            var s = [].concat(e(r.products), n);
            s.find(function(e) {
                return 1 == e.checkType;
            }) && s.forEach(function(e) {
                var r = i(e), n = 1 == e.mainSku.isFresh ? "fresh" : "nofresh";
                r && (g[n] += +e.mainSku.weight * +e.num), c[n].list[t.vid].skus.push(e.mainSku.id);
            });
        });
    }), c.nofresh.weight -= g.nofresh;
    var d = h(t(a), c), v = function() {
        var t = f.find(function(e) {
            return 1000076153 == e.vid;
        });
        return !!t && t.list.filter(function(t) {
            return [].concat(e(t.products), e(t.suits || [])).filter(function(e) {
                return 1 == e.checkType;
            }).length;
        }).length > 0;
    }();
    return d = Object.assign(n(d), {
        show1hour: v
    }), s(d), d;
}, exports.getFreightTips = function(e, t) {
    var r = 2 == t ? "zy" : "fresh";
    return t ? v[e + "_" + r] : v[e];
}, exports.getFreightAddonParams = function() {
    return S;
};