function t(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    return e.default = t, e;
}

function e(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

var a = require("../../../../bases/component.js"), r = require("../../../../common/logger.js"), n = t(require("api")), o = t(require("draw")), s = new r.Logger("购物车-优惠券弹层"), i = {
    AVAILABLE: "1",
    DISABLED: "2",
    LOADING: "3",
    OVER: "4"
};

new a.JDComponent({
    properties: {
        data: {
            type: Object,
            value: {
                vid: null,
                list: []
            },
            observer: "loadData"
        }
    },
    attached: function() {},
    rawData: {},
    methods: {
        loadData: function(t) {
            var a = this, r = t = t || {
                list: [],
                vid: null
            }, s = r.list, i = r.vid;
            this.rawData = {};
            var u = s.length > 0, c = u ? n.format(s, i) : {}, l = c.gettable, d = void 0 === l ? [] : l, f = c.useable, g = void 0 === f ? [] : f, h = c.skuIds, v = void 0 === h ? [] : h;
            n.getImgUrl(v).then(function(r) {
                a.setData({
                    show: u,
                    gettable: d,
                    useable: g,
                    vid: t.vid || "",
                    imageMap: r
                }), !u && o.hieRealNameMsgBox(), [].concat(e(d)).forEach(function(t) {
                    a.rawData[t.redpacket ? t.couponId : t.encryptedKey] = t;
                });
            });
        },
        setDrawButtonStatus: function(t, e) {
            var a = {};
            a["gettable[" + t + "].status"] = e, this.setData(a);
        },
        draw: function(t) {
            var e = this, a = t.currentTarget.dataset, r = a.key, n = a.index, u = a.couponId, c = this.rawData[u || r];
            c.status != i.LOADING && (this.setDrawButtonStatus(n, i.LOADING), o.draw(c).then(function(a) {
                var r = a.success, o = a.code, s = 34 == o || 54 == o;
                e.setDrawButtonStatus(n, r ? i.DISABLED : s ? i.AVAILABLE : i.OVER), r && e.triggerEvent("drawafter", t);
            }).catch(function(t) {
                s.error(t), e.setDrawButtonStatus(n, i.AVAILABLE), t && e.toast.show({
                    page: getCurrentPages().pop(),
                    icon: e.toast.ICON.WARNING,
                    content: "活动太火爆了，请稍后重试"
                });
            }));
        },
        noscroll: function(t) {},
        close: function(t) {
            this.triggerEvent("close", t);
        },
        show: function(t) {
            this.loadData(t);
        }
    }
});