function o(o) {
    if (o && o.__esModule) return o;
    var e = {};
    if (null != o) for (var t in o) Object.prototype.hasOwnProperty.call(o, t) && (e[t] = o[t]);
    return e.default = o, e;
}

var e = Object.assign || function(o) {
    for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (o[i] = t[i]);
    }
    return o;
}, t = require("../../../../bases/component.js"), i = function(o) {
    return o && o.__esModule ? o : {
        default: o
    };
}(require("../../../../behaviors/attributes")), n = require("../../../../common/logger.js"), s = require("../../../../api/Ptag/Ptag_utils.js"), a = require("../../../../api/Ptag/report_manager"), r = o(require("../../common/ptag-constants")), h = o(require("../../../../common/toast/toast")), u = o(require("./api")), g = require("../../../../common/numberp"), l = new n.Logger("购物车-智选精灵");

new t.JDComponent({
    behaviors: [ i.default ],
    properties: {
        hide: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        showTips: !1,
        showAIChoose: !1,
        discount: 0,
        intoView: ""
    },
    ready: function() {
        this.page = getCurrentPages().pop(), this.refresh = this.helper.debounce(this.refresh, 100), 
        this.onViewAIChoose = this.helper.debounce(this.onViewAIChoose, 100), this.onSwitchPromo = this.helper.debounce(this.onSwitchPromo, 100);
    },
    methods: {
        hidePromoTips: function() {
            this.setData({
                discount: 0,
                showTips: !1,
                showAIChoose: !1
            });
        },
        refresh: function() {
            var o = this;
            this.loading = !0, u.getoptimalpromo().then(function(e) {
                o.relationMap = e.relationMapNew;
                var t = (0, g.divide)((0, g.minus)(e.totalFactPrice, e.totalPromoPrice), 100);
                o.setData({
                    discount: t,
                    showTips: t > 0,
                    showAIChoose: !1
                }), t > 0 && a.ReportManager.addPtagExposure(r.CART_OPTION_PROMO), o.loading = !1;
            }, function(e) {
                l.debug(e), o.setData({
                    showTips: !1,
                    showAIChoose: !1
                }), o.loading = !1;
            });
        },
        onClosePromoTips: function() {
            this.setData({
                showTips: !1
            }), this.triggerEvent("close");
        },
        onViewAIChoose: function() {
            var o = this;
            this.loading || (s.PtagUtils.addPtag(r.CART_OPTION_PROMO_TIPS_CLK), this.loading = !0, 
            u.selectoptimalpromo(this.relationMap).then(function(e) {
                var t = e || [];
                o.setData({
                    promotions: t,
                    showAIChoose: t.length
                }), t.length || (h.show({
                    page: o.page,
                    icon: h.ICON.WARNING,
                    content: "哎呀，操作发生点意外，请重新试试"
                }), l.error("selectoptimalpromo接口数据过滤后无促销sku" + JSON.stringify(o.relationMap))), 
                o.loading = !1;
            }, function(e) {
                l.debug(e), h.show({
                    page: o.page,
                    icon: h.ICON.WARNING,
                    content: e.message
                }), o.loading = !1;
            }));
        },
        onCloseAIChoose: function() {
            this.setData({
                showAIChoose: !1,
                intoView: "top"
            });
        },
        onSwitchPromo: function() {
            var o = this;
            this.loading || (this.loading = !0, s.PtagUtils.addPtag(r.CART_OPTION_PROMO_SWITCH_CLK), 
            this._showLoading(), u.batchChangePromo(this.relationMap).then(function(t) {
                o.setData({
                    showTips: !1,
                    showAIChoose: !1
                });
                var i = u.getAllSkuId()[o.relationMap[0].skuId] || [], n = e({}, t);
                i && i.length && Object.assign(n, {
                    uuid: i[0] || ""
                }), o.loading = !1, o.triggerEvent("afterswitchpromo", {
                    data: n
                });
            }, function(e) {
                l.debug(e), o._hideLoading(), h.show({
                    page: o.page,
                    icon: h.ICON.WARNING,
                    content: e.message
                }), o.loading = !1;
            }));
        },
        noscroll: function() {}
    }
});