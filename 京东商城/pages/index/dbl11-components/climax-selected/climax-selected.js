function t(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
    return e.default = t, e;
}

var e = require("../../../../bases/component.js"), r = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../libs/promise.min.js")), n = t(require("../../model.js")), i = t(require("../../utils.js")), a = require("../constant");

new e.JDComponent({
    data: {
        config: {},
        entries1: [],
        showTab: "1",
        hidenTc: !0,
        hidenTcStyle: "left: 240rpx"
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
            r.default.resolve(t).then(function(t) {
                return i.checkTime(a.CLIMAX_BEGIN, a.CLIMAX_END) ? r.default.all([ e.getConfig(t), e.getEntryData(482, 6, 3) ]).then(function(n) {
                    if (!n) return r.default.reject();
                    var a = n[0], l = n[1];
                    return a && l.length ? (e.setData({
                        config: a,
                        entries1: l
                    }, function() {
                        e.triggerEvent("componentLoad", e.is);
                    }), l.forEach(function(t) {
                        i.exposureUrlPtag(t.url);
                    }), a.leftText && a.leftUrl && i.exposureUrlPtag(a.leftUrl), a.rightText && a.rightUrl && i.exposureUrlPtag(a.rightUrl), 
                    i.exposureUrlPtag("138067.63.3", !0), i.exposureUrlPtag("138067.66.1", !0), t) : r.default.reject();
                }).catch(function(t) {
                    e.setData({
                        entries1: []
                    }), e.triggerEvent("componentLoad", e.is);
                }) : r.default.reject();
            }).then(function(t) {
                r.default.all([ e.getSkuPrice(t), e.getCpcData(10987, 29136) ]).then(function(t) {
                    e.tcExposure = !1;
                    var n = t[0], a = t[1], l = {
                        pg: "",
                        sns: ""
                    };
                    if (n && n.length && (l.pg = n), a && a.length && (l.sns = {
                        des: a[0].des,
                        image: e.utils.getImg(a[0].image, 330, 422),
                        url: i.addPtag(a[0].url, "138067.66.3")
                    }), !l.pg || !l.sns) return r.default.reject();
                    e.setData({
                        tcLabConfig: l,
                        hidenTc: !0
                    });
                }).catch(function(t) {
                    e.setData({
                        hidenTc: !1,
                        showTab: "1"
                    });
                });
            }).catch(function(t) {
                e.setData({
                    entries1: []
                }), e.triggerEvent("componentLoad", e.is);
            });
        },
        getConfig: function(t) {
            var e = null, r = t && t.dbl11 && t.dbl11.ppms && t.dbl11.ppms.plEvent || [];
            if (!r && !r.length) return e;
            var n = null;
            return r.some(function(t) {
                if (i.checkTime(t.begin, t.end)) return n = t, !0;
            }), n ? e = {
                bg: n.bg ? "background-image: url(" + this.utils.getImg(n.bg) + ");" : "",
                tab1: n.centerText1 || "",
                tab2: n.centerText2 || "",
                gwqTitle: n.gwqFloorTitle || "",
                mfTitle: n.mfFloorTitle || "",
                pgTitle: n.pgFloorTitle || "",
                title: n.centerText || "",
                titleColor: n.centerColor ? "color: " + n.centerColor + ";" : "",
                leftText: n.leftText || "",
                leftUrl: n.leftHref ? i.addPtag(n.leftHref, "138067.63.1") : "",
                rightText: "全部会场",
                rightUrl: "https://wqs.jd.com/portal/promote_navigation/index.shtml?ptag=138067.63.4"
            } : e;
        },
        getEntryData: function(t, e, a) {
            var l = this, u = [];
            return t ? n.getEntryData(t, e, {
                interval: a,
                pretime: Date.now()
            }).then(function(t) {
                return t && t.length ? (u = t.map(function(t) {
                    var e = t.list && t.list[0] || {}, r = t.ext1 || "";
                    return r && (r = r.split("-")[0]), {
                        title: t.martname || "",
                        image: l.utils.getImg(e.img, 140),
                        des: e.content || "",
                        url: e.url ? i.addPtag(e.url, r) : ""
                    };
                }), u = u.filter(function(t) {
                    return t.title && t.image && t.des && t.url;
                })) : r.default.reject();
            }).catch(function(t) {
                return u;
            }) : u;
        },
        getCpcData: function(t, e) {
            var r = this, a = [];
            return n.getCpcData([ t ], [ e ], {}, Date.now()).then(function(n) {
                var l = n && n[t] && n[t][e] || [];
                return a = l.map(function(t) {
                    var e = t.promotion || "";
                    return {
                        title: t.materialname || "",
                        image: r.utils.getImg(t.material, 140),
                        des: t.materialdesc || "",
                        url: t.sUrl ? i.addPtag(t.sUrl, e) : ""
                    };
                }), a = a.filter(function(t) {
                    return t.title && t.image && t.des && t.url;
                });
            }).catch(function(t) {
                return a;
            });
        },
        getSkuPrice: function(t) {
            var e = this, n = null;
            if ((t && t.dbl11 && t.dbl11.ppms && t.dbl11.ppms.yearSCSY || []).some(function(t) {
                if (i.checkTime(t.begin, t.end)) return n = t, !0;
            }), !n) return n;
            var a = [], l = [ 1, 2, 3 ].map(function(t) {
                return a.push(n["mall" + t + "Sku"]), {
                    sku: n["mall" + t + "Sku"],
                    title: n["mall" + t + "Title"],
                    url: i.addPtag(n["mall" + t + "Href"], "138067.66.4"),
                    img: e.utils.getImg(n["mall" + t + "Img"], 100)
                };
            });
            return this.biz.getSkuPrice(a).then(function(t) {
                return l.map(function(e) {
                    return {
                        sku: e.sku,
                        title: e.title,
                        url: e.url,
                        img: e.img,
                        price: t[e.sku].price
                    };
                });
            }).catch(function(t) {
                return r.default.reject();
            });
        },
        gotoUrl: function(t) {
            var e = t.currentTarget.dataset, r = e.url, n = e.pg;
            (void 0 === n ? "" : n) ? this.$goto(r) : this.$goto("/pages/h5/index", {
                url: r
            });
        },
        changeTab: function(t) {
            var e = t.currentTarget.dataset.id;
            "2" != e || this.tcExposure || (i.exposureUrlPtag("138067.66.3", !0), i.exposureUrlPtag("138067.66.4", !0), 
            this.tcExposure = !0), "1" == e ? i.report("138067.63.3") : i.report("138067.66.1"), 
            this.setData({
                showTab: e
            });
        }
    }
});