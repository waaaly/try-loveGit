function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = require("../../../../bases/component.js"), i = e(require("../../../../libs/promise.min.js")), n = e(require("../../mall/common-behavior.js")), a = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    return t.default = e, t;
}(require("../../utils.js")), r = require("../constant");

new t.JDComponent({
    behaviors: [ n.default ],
    properties: {
        saleConfig: {
            type: Object,
            observer: function(e) {
                this.getPPMSDataResolve && this.getPPMSDataResolve(e);
            }
        },
        walletSaleConfig: {
            type: Object,
            observer: function(e) {
                this.getWalletPPMSDataResolve && this.getWalletPPMSDataResolve(e);
            }
        },
        indexName: {
            type: "String",
            observer: function(e) {
                this.indexName = e || "";
            }
        }
    },
    data: {
        entries: [],
        config: {},
        hideModule: !0
    },
    created: function() {
        this.init = this.init.bind(this), getApp().event.on("index_mall_init", this.init);
    },
    detached: function() {
        getApp().event.off("index_mall_init", this.init);
    },
    methods: {
        refresh: function() {
            "wallet" == this.indexName && this.init();
        },
        init: function(e) {
            var t = this;
            if (!a.checkTime(r.CATEGORY_BEGIN, r.CATEGORY_END)) return this.triggerEvent("componentLoad", this.is), 
            void this.setData({
                hideModule: !0
            });
            var n = "mall" == this.indexName ? [ e && e.dbl11 && e.dbl11.ppms || {} ] : [ this.getPPMSData(), this.getWalletPPMSData() ], l = "mall" == this.indexName ? "138067.62.4" : "137889.64.4";
            i.default.all(n).then(function(e) {
                var n = e[0] && e[0].plGuideBanner || [];
                if (!n || !n.length) return i.default.reject();
                var r = null;
                if (n.some(function(e) {
                    if (a.checkTime(e.begin, e.end)) return r = e, !0;
                }), !r) return i.default.reject();
                var o = [ {
                    title: r.timeLineText1 || "",
                    des: r.descText1 || ""
                }, {
                    title: r.timeLineText2 || "",
                    des: r.descText2 || ""
                }, {
                    title: r.timeLineText3 || "",
                    des: r.descText3 || ""
                } ], s = {
                    image: r.bg ? "background-image: url(" + t.utils.getImg(r.bg, 750, 88) + ");" : "",
                    url: r.href ? a.addPtag(r.href, l) : ""
                };
                if (!s || !s.image || !o) return i.default.reject();
                t.setData({
                    entries: o,
                    config: s,
                    hideModule: !1
                }, function() {
                    t.triggerEvent("componentLoad", t.is);
                }), s.url && a.exposureUrlPtag(s.url);
            }).catch(function(e) {
                t.setData({
                    hideModule: !0
                }), t.triggerEvent("componentLoad", t.is);
            });
        },
        getPPMSData: function() {
            var e = this;
            return new i.default(function(t, i) {
                e.getPPMSDataResolve = t;
            });
        },
        getWalletPPMSData: function() {
            var e = this;
            return new i.default(function(t, i) {
                e.getWalletPPMSDataResolve = t;
            });
        },
        gotoUrl: function(e) {
            var t = e.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: t
            });
        }
    }
});