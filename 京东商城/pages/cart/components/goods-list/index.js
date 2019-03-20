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

var r = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
    }
    return e;
}, o = function() {
    function e(e, t) {
        var r = [], o = !0, n = !1, i = void 0;
        try {
            for (var a, s = e[Symbol.iterator](); !(o = (a = s.next()).done) && (r.push(a.value), 
            !t || r.length !== t); o = !0) ;
        } catch (e) {
            n = !0, i = e;
        } finally {
            try {
                !o && s.return && s.return();
            } finally {
                if (n) throw i;
            }
        }
        return r;
    }
    return function(t, r) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, r);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), n = t(require("../../common/ptag-constants")), i = t(require("../../models/freight")), a = require("../../../../api/Ptag/report_manager"), s = require("../../../../bases/component"), d = require("../../../../common/logger"), c = e(require("../../../../behaviors/attributes")), l = t(require("../../models/model")), u = e(require("../../../../libs/promise.min")), g = e(require("./actions")), h = getApp(), p = new d.Logger("购物车商品列表");

new s.JDComponent({
    behaviors: [ c.default, g.default ],
    options: {
        multipleSlots: !0
    },
    properties: {
        options: {
            type: Object,
            value: {
                loading: !0,
                viewLoaded: !1,
                venders: [],
                scrollIntoView: "",
                isHeadScreenLoad: !0
            },
            observer: "loadOptions"
        }
    },
    data: {
        editable: !1,
        stock: {},
        spec: {},
        margins: {},
        services: {},
        shopServices: {},
        vendersName: {},
        locShops: {},
        back2topVisabled: !1,
        showQuickNav: !1,
        freight: {},
        pinGouInfos: {}
    },
    ready: function() {
        var e = this._getPageId(), t = [ [ "cart:goodslist:editmode", this._onToggleEditMode ] ], r = !0, n = !1, i = void 0;
        try {
            for (var a, s = t[Symbol.iterator](); !(r = (a = s.next()).done); r = !0) {
                var d = o(a.value, 2), c = d[0], l = d[1], u = c + "_" + e;
                h.event.off(u).on(u, l.bind(this));
            }
        } catch (e) {
            n = !0, i = e;
        } finally {
            try {
                !r && s.return && s.return();
            } finally {
                if (n) throw i;
            }
        }
        this.doAction = this.helper.debounce(this.doAction, 100), this._pageId = e, this.page = getCurrentPages().pop();
    },
    methods: {
        loadOptions: function(e) {
            var t = this, i = e.freight, s = void 0 === i ? [] : i, d = e.venders, c = void 0 === d ? [] : d, u = e.scrollIntoView, g = void 0 === u ? "" : u, h = e.viewLoaded, p = void 0 !== h && h, f = e.isHeadScreenLoad, v = void 0 === f || f, m = e.showRecommend, b = void 0 === m || m, y = e.partition, w = void 0 === y ? {} : y, S = e.graySwitch, _ = void 0 === S ? 0 : S;
            if (this.setData({
                scrollIntoView: g,
                venders: c,
                viewLoaded: p,
                graySwitch: _,
                showRecommend: this.data.showRecommend || b
            }), c.length && !1 !== v) this._getListExtra().then(function(e) {
                var i = o(e, 4), d = i[0], c = i[1], u = i[2], g = i[3], h = g.vendersName, p = g.locShops, f = t._getFreightData(s);
                t.setData(r({
                    stock: d.stock,
                    spec: d.spec,
                    margins: c.margin,
                    services: u,
                    shopServices: l.getShopServices(),
                    vendersName: h,
                    locShops: p
                }, f, {
                    partition: w,
                    pinGouInfos: c.pinGouInfos
                }), function() {
                    t.onRefreshOptionPromo(), t.onUpdateMarginBar();
                }), Object.keys(d.stock).length && a.ReportManager.addPtagExposure(n.CART_SIMILAR), 
                (Object.keys(u.yb).length || Object.keys(u.home).length) && a.ReportManager.addPtagExposure(n.CART_SERVICES), 
                Object.keys(c.pinGouInfos).length && a.ReportManager.addPtagExposure(n.CART_PINGOU);
            }), this._showVenderCoupons(); else {
                var O = this._getFreightData(s), I = l.filterMargin(this.data.margins);
                this.setData(r({}, O, {
                    margins: I
                }), function() {
                    t.onRefreshOptionPromo(), t.onUpdateMarginBar();
                });
            }
        },
        _getListExtra: function() {
            return u.default.all([ l.getStock(), l.getAssist(), l.getYbItems(), l.getVendersName() ]).then(function(e) {
                return u.default.resolve(e);
            }, function(e) {
                p.debug(e);
            });
        },
        _onToggleEditMode: function(e) {
            0 == e && this.onEditCheck({
                currentTarget: {
                    dataset: {}
                },
                target: {
                    dataset: {}
                },
                detail: {
                    type: "all",
                    checked: !0
                }
            }), this.setData({
                editable: e
            });
        },
        _getFreightData: function() {
            var e = {
                freight: arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                venders: l.getVenders()
            };
            return {
                freight: i.calc(e)
            };
        },
        bubble: function(e) {},
        doAction: function(e) {
            var t = r({}, e.currentTarget.dataset, e.target.dataset), o = t.trigger, n = t.action;
            o && h.event.emit(o), this[n] && this[n](e);
        }
    }
});