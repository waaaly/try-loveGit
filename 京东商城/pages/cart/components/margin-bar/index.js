function t(t) {
    if (t && t.__esModule) return t;
    var i = {};
    if (null != t) for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (i[a] = t[a]);
    return i.default = t, i;
}

function i(t) {
    if (Array.isArray(t)) {
        for (var i = 0, a = Array(t.length); i < t.length; i++) a[i] = t[i];
        return a;
    }
    return Array.from(t);
}

var a = require("../../../../bases/component"), e = require("../../../../api/Ptag/Ptag_utils.js"), r = require("../../../../api/Ptag/report_manager"), n = t(require("../../common/ptag-constants")), s = t(require("../../models/model"));

new a.JDComponent({
    _marginSkuUuids: [],
    _skuUuid: "",
    properties: {
        hide: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        barClosed: !1,
        showBar: !1,
        index: 0,
        count: 0,
        floating: !1
    },
    ready: function() {
        this.onScrollToUpper = this.helper.debounce(this.onScrollToUpper, 100);
    },
    methods: {
        onUpdateMrginSkuIds: function() {
            var t = [];
            (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).forEach(function(i) {
                t.push(i.id.replace(/margin_/, "") || "");
            }), this._marginSkuUuids = t, this.initMarginBar();
        },
        onUpdateMrgins: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], a = s.getAllSkuId(), e = [];
            (Object.keys(t) || []).forEach(function(t) {
                return a[t] && (e = [].concat(i(e), i(a[t])));
            }), this._marginSkuUuids = e, this.initMarginBar();
        },
        initMarginBar: function() {
            var t = this._marginSkuUuids.length || 0, i = this._skuUuid ? this._marginSkuUuids.indexOf(this._skuUuid) + 1 : 0;
            !this.data.barClosed && !this.data.showBar && t > 0 && 0 == i && r.ReportManager.addPtagExposure(n.CART_MARGIN_BAR_SHOW), 
            this.setData({
                showBar: t > 0,
                count: t,
                index: i,
                floating: this.data.floating && i > 0
            }), this.triggerEvent("fixedupdate", {
                fixed: this.data.floating && i > 0
            });
        },
        onTapBar: function() {
            var t = this.data, i = t.index;
            i >= t.count && (i = 0), this._skuUuid = this._marginSkuUuids[i], this.setData({
                floating: !0,
                index: i + 1
            }), this._skuUuid && this.triggerEvent("click", {
                uuid: this._skuUuid
            }), this.triggerEvent("fixedupdate", {
                fixed: !0
            }), e.PtagUtils.addPtag(n.CART_MARGIN_BAR_CLK);
        },
        closeBar: function() {
            this.setData({
                barClosed: !0
            }), e.PtagUtils.addPtag(n.CART_MARGIN_BAR_CLOSE), this.triggerEvent("fixedupdate", {
                fixed: !1
            });
        },
        onScrollToUpper: function() {
            this._skuUuid = "", this.setData({
                floating: !1,
                index: 0
            }), this.triggerEvent("fixedupdate", {
                fixed: !1
            });
        }
    }
});