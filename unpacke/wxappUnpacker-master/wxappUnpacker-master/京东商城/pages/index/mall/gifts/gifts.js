function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = require("../../../../bases/component.js"), n = t(require("../../../../libs/promise.min.js")), i = t(require("../common-behavior.js")), r = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e.default = t, e;
}(require("../../utils.js")), a = require("../../dbl11-components/constant");

new e.JDComponent({
    behaviors: [ i.default ],
    data: {
        list: [],
        title: {},
        hideModule: !0,
        config: {}
    },
    created: function() {
        this.init = this.init.bind(this), getApp().event.on("index_mall_init", this.init);
    },
    detached: function() {
        getApp().event.off("index_mall_init", this.init);
    },
    methods: {
        init: function(t) {
            var e = this;
            n.default.resolve(t).then(function(t) {
                var i = t.global;
                if (!i || !i.freshmenData || 0 !== i.freshmenData.ret || 1 !== i.freshmenData.isnew) return n.default.reject();
                var a = null;
                return (t.news && t.news.newsPPMS && t.news.newsPPMS.gifts || []).some(function(t) {
                    if (r.checkTime(t.begin, t.end)) return a = {
                        text: t.desc ? t.desc.replace(/<span>/g, '<span class="gifts-title__span">') : "",
                        url: t.link ? e.addPtag(r.fixUrl(t.link), "138067.34.2") : ""
                    }, !0;
                }), a || (a = {
                    text: "新人专享福利商品",
                    url: "https://wqs.jd.com/event/promote/xrpdjq/index.shtml"
                }), {
                    res: t,
                    title: a
                };
            }).then(function(t) {
                var i = t.res, s = t.title, l = i.news && i.news.giftsList || {};
                n.default.all([ e.getCpcData(l.cpc), e.getPingouList(l.pingou) ]).then(function(t) {
                    var l = t[0], o = t[1], u = l.concat(o);
                    if (!u.length) return n.default.reject("list.length < 1");
                    u.splice(4), u.forEach(function(t) {
                        r.exposureUrlPtag(t.url);
                    }), e.setData({
                        title: s,
                        list: u,
                        hideModule: !1,
                        config: {}
                    }), r.checkTime(a.SALE_BEGIN, a.SALE_END) && e.getSaleConfig(i);
                }).catch(function(t) {
                    e.setData({
                        hideModule: !0
                    });
                });
            }).catch(function(t) {
                e.setData({
                    hideModule: !0
                });
            });
        },
        getSaleConfig: function(t) {
            var e = null;
            (t.news && t.news.newsPPMS && t.news.newsPPMS.saleConfig || []).some(function(t) {
                if (r.checkTime(t.begin, t.end)) return e = {
                    color: t.bgcolor ? "background-color: " + t.bgcolor : ""
                }, !0;
            }), this.setData({
                config: e
            });
        },
        getCpcData: function(t) {
            var e = this, n = [];
            if (!t || "0" != t.errCode || !t.list || !t.list.length) return n;
            var i = [];
            return t.list.some(function(t) {
                if (t && "10720" == t.groupid) return i = t.locations || [], !0;
            }), i.length ? (i.forEach(function(t) {
                if (t.plans && t.plans.length) {
                    var i = t.plans[0];
                    n.push({
                        image: e.utils.getImg(i.material, 128),
                        tag: i.materialdesc || "",
                        url: i.sUrl ? e.addPtag(r.fixUrl(i.sUrl), "138067.34.3") : ""
                    });
                }
            }), n = n.filter(function(t) {
                return t.image && t.tag && t.url;
            })) : n;
        },
        getPingouList: function(t) {
            var e = this, n = [];
            return t && "0" == t.errcode && t.data && t.data[0].list ? (n = t.data[0].list.map(function(t) {
                return {
                    image: e.utils.getImg(t.sPicturesUrl, 128),
                    tag: t.dwRealTimePrice ? "￥" + t.dwRealTimePrice : "",
                    url: e.addPtag("https://wqs.jd.com/event/promote/xrpdjq/index.shtml?sku=" + t.ddwSkuId + "&pps=" + t.pps, "138067.34.1")
                };
            }), n = n.filter(function(t) {
                return t.image && t.tag && t.url;
            })) : n;
        },
        addPtag: function(t, e) {
            if (!t || !e) return t;
            if (t.match(/\?\w+/)) {
                var n = this.utils.getUrlParam("ptag", String(t));
                t = n ? t.replace(n, e) : t + "&ptag=" + e;
            } else t = t + "?ptag=" + e;
            return t;
        },
        gotoUrl: function(t) {
            var e = t.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: e
            });
        }
    }
});