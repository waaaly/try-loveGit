function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = require("../../../../bases/component.js"), i = t(require("../../../../libs/promise.min.js")), n = t(require("../common-behavior.js")), o = require("../../../../common/fe_helper.js"), r = require("../../model.js"), s = require("../../../../common/utils.js"), a = require("../../utils.js"), u = require("../../../../api/Ptag/report_manager.js");

new e.JDComponent({
    behaviors: [ n.default ],
    properties: {
        config: {
            type: Object,
            observer: function(t) {
                this.init(t);
            }
        }
    },
    data: {
        seckillBeginTime: null,
        seckillGoods: [],
        countdownHour: null,
        countdownMinute: null,
        countdownSecond: null,
        entries: [],
        hideSeckill: !0,
        hideEntries: !0
    },
    methods: {
        init: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this.timer && clearTimeout(this.timer), i.default.all([ this.initSeckill(t), this.initEntries() ]);
        },
        initEntries: function() {
            var t = this;
            return (0, r.getEntryData)(475, 2).then(function(e) {
                if (!e || !e.length) return i.default.reject("no getEntryData data");
                var n = e.map(function(t) {
                    var e = t.list && t.list[0] || [], i = "";
                    return "10623" == t.id ? i = "138067.41.4" : "10624" == t.id && (i = "138067.41.3"), 
                    {
                        title: t.martname || "",
                        des: e && e.content || "",
                        image: e && e.img && (0, s.getImg)(e.img, 148) || "",
                        url: e && e.url && (0, a.addPtag)(e.url, i) || ""
                    };
                });
                if (!(n = n.filter(function(t) {
                    return t.title && t.image;
                })) || !n.length) return i.default.reject("no entries data");
                t.setData({
                    entries: n,
                    hideEntries: !1
                }, function() {
                    t.triggerEvent("showModule");
                });
            }).catch(function(e) {
                console.log("seckill initEntries catch", e), t.setData({
                    hideEntries: !0
                });
            });
        },
        initSeckill: function(t) {
            var e = this;
            (0, r.getSeckillGoods)(114271).then(function(n) {
                var r = n && n.list || [];
                if (!r || !r.length) return i.default.reject("no goodsData");
                var c = [], l = [], d = 2, g = "138067.41.1", h = t && t.seckillRange || "", f = t && t.seckillPin || "";
                (0, a.greyScale)(h, f) && (d = 3, g = "138067.41.7"), u.ReportManager.addPtagExposure(g);
                var m = r.map(function(t) {
                    return {
                        stock: t.stockstate,
                        image: (0, s.getImg)(t.imgbase, 240),
                        price: 0 == t.stockstate ? t.quoteprice : t.chprice,
                        oldPrice: t.pcprice,
                        skuId: t.skuid,
                        pps: t.pps,
                        ptag: g
                    };
                }).forEach(function(t) {
                    var e = parseInt(t.stock);
                    !isNaN(e) && e > 0 ? c.push(t) : l.push(t);
                });
                m = [].concat(c, l).slice(0, d);
                for (var p = [ 0, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24 ], v = (0, o.getServerTime)(), k = new Date(v).getHours(), w = void 0, D = void 0, S = 0; S < p.length - 1; S++) if (k >= p[S] && k < p[S + 1]) {
                    w = p[S], (D = new Date(v)).setHours(p[S + 1]), D.setMinutes(0), D.setSeconds(0);
                    break;
                }
                var M = Math.floor((D.getTime() - v) / 1e3), j = Math.floor(M / 60 / 60), E = Math.floor(M % 3600 / 60), P = M % 60;
                e.setData({
                    seckillBeginTime: w + "",
                    seckillGoods: m,
                    countdownHour: j < 10 ? "0" + j : "" + j,
                    countdownMinute: E < 10 ? "0" + E : "" + E,
                    countdownSecond: P < 10 ? "0" + P : "" + P,
                    hideSeckill: !1,
                    titlePtag: g
                }, function() {
                    e.triggerEvent("showModule");
                }), setTimeout(function() {
                    return e.setCountDown(M - 1);
                }, 1e3);
            }).catch(function(t) {
                console.log(t), e.setData({
                    hideSeckill: !0
                });
            });
        },
        setCountDown: function(t) {
            var e = this;
            if (t < 0) return this.initSeckill();
            var i = Math.floor(t / 60 / 60), n = Math.floor(t % 3600 / 60), o = t % 60;
            this.setData({
                countdownHour: i < 10 ? "0" + i : "" + i,
                countdownMinute: n < 10 ? "0" + n : "" + n,
                countdownSecond: o < 10 ? "0" + o : "" + o
            }), this.timer = setTimeout(function() {
                return e.setCountDown(t - 1);
            }, 1e3);
        },
        tapSeckill: function(t) {
            var e = t.currentTarget.dataset, i = e.sku, n = e.pps, o = e.ptag;
            this.$goto("/pages/seckill/index/index", {
                sku: i,
                pps: n,
                ptag: o
            });
        },
        getPPMSData: function() {
            var t = this;
            return new i.default(function(e) {
                t.getPPMSDataResolve = e;
            });
        },
        gotoUrl: function(t) {
            var e = t.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: e
            });
        }
    }
});