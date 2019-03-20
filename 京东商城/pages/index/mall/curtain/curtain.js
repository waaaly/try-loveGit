function t(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    return e.default = t, e;
}

var e = require("../../../../bases/component.js"), i = t(require("../../model.js")), a = t(require("../../utils.js")), n = t(require("../../../../common/localStorage.js")), r = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../libs/promise.min.js")), s = require("../../../../api/Ptag/report_manager.js");

new e.JDComponent({
    properties: {
        showTime: {
            type: Number,
            observer: function() {
                this.triggerCurtainFinishDelay && (this.triggerCurtainFinishDelay = !1, this.triggerEvent("curtainFinish"));
            }
        }
    },
    data: {
        showModule: !1,
        url: "",
        image: "",
        transparent: !1,
        countdown: 5,
        special: !1,
        hideCountdown: !1,
        saleCountdown: 5,
        hideSale: !1,
        hideMould: !1,
        hideSaleCountdown: !1
    },
    created: function() {
        this.init = this.init.bind(this), getApp().event.once("index_mall_init", this.init);
    },
    detached: function() {
        getApp().event.off("index_mall_init", this.init);
    },
    methods: {
        parseMainData: function(t) {
            var e = {}, a = [ 10420, 10818 ], n = [ 27383, 27384, 27382, 28652 ];
            if (!t.curtain || "0" != t.curtain.errCode) return r.default.resolve(e);
            var s = i.parseCpcList(t.curtain.list), u = s[a[0]], o = s[a[1]];
            if (!u) return r.default.resolve(e);
            var l = u[n[0]] && u[n[0]][0] || {}, h = u[n[1]] && u[n[1]][0] || {}, c = u[n[2]] && u[n[2]][0] || {}, g = o[n[3]] && o[n[3]][0] || {};
            return e.curtainData = {
                freshmenGiftData: l,
                freshmenActivitiesData: h,
                activitiesData: c,
                atmosphereData: g
            }, t.global && t.global.freshmenData && 0 == t.global.freshmenData.ret ? e.freshmenData = t.global.freshmenData : e.freshmenData = {
                isnew: -1
            }, t.global && t.global.globalPPMS && t.global.globalPPMS[34242] && (e.curtainData.bapingData = t.global.globalPPMS[34242][0].curtainConfig), 
            r.default.resolve(e);
        },
        init: function(t) {
            var e = this;
            r.default.all([ this.parseMainData(t), this.getCurtainExpire() ]).then(function(t) {
                var i = t[0].freshmenData, n = t[0].curtainData, u = t[1][0], o = t[1][1], l = t[1][2];
                if (!n) return e.triggerEvent("curtainFinish");
                var h = n.freshmenGiftData, c = n.freshmenActivitiesData, g = n.activitiesData, d = n.atmosphereData, f = n.bapingData;
                return r.default.resolve().then(function() {
                    if (!i) return !1;
                    var t = i.isnew, a = i.newgift;
                    return 1 == t && (3 == a ? e.curtainExistsThenShow(c, "freshmen", u).then(function(t) {
                        return t && (s.ReportManager.addPtagExposure("138067.1.3"), e.closePtag = "7593.2.3"), 
                        t;
                    }) : e.curtainExistsThenShow(h, "freshmen", u).then(function(t) {
                        return t && (s.ReportManager.addPtagExposure("138067.1.2"), e.closePtag = "7593.2.2"), 
                        t;
                    }));
                }).then(function(i) {
                    if (i) return i;
                    var n = f, r = t[1][3], u = a.getActiveConfig(n);
                    return u.sUrl = u.link || u.wxappLink, u.img && (u.material = u.img), e.curtainExistsThenShow(u, "sale", r).then(function(t) {
                        return t && s.ReportManager.addPtagExposure(u.mallPtag), t;
                    });
                }).then(function(t) {
                    return t || e.curtainExistsThenShow(d, "special", l);
                }).then(function(t) {
                    return t || e.curtainExistsThenShow(g, "normal", o);
                }).then(function(t) {
                    !t && e.triggerEvent("curtainFinish");
                });
            });
        },
        curtainExistsThenShow: function(t, e, i) {
            var u = this, o = t.sUrl, l = t.material;
            if (i && Date.now() < i) return r.default.resolve(!1);
            if (o && l) {
                if ("sale" === e) {
                    var h = {
                        sale: !0,
                        url: a.addPtag(t.link, t.mallPtag),
                        image: this.utils.getImg(l),
                        rd: t.mallPtag,
                        wxappLink: t.wxappLink
                    };
                    t.wxapp_staticimg && (h.preImage = this.utils.getImg(t.wxapp_staticimg)), this.setData(h), 
                    n.set("saleCurtain_hide_until", new Date().setHours(24, 0, 0, 0)), this.closePtag = "7593.2.6";
                } else "special" === e ? (this.setData({
                    special: !0,
                    showModule: !0,
                    url: o,
                    image: this.utils.getImg(l)
                }), setTimeout(function() {
                    return u.count();
                }, 1e3), n.set("mall_" + e + "Curtain_hide_until", new Date().setHours(24, 0, 0, 0)), 
                s.ReportManager.addPtagExposure("138067.1.4"), this.closePtag = "7593.2.4") : (this.setData({
                    showModule: !0,
                    url: o,
                    image: this.utils.getImg(l)
                }), n.set("mall_" + e + "Curtain_hide_until", new Date().setHours(24, 0, 0, 0)), 
                setTimeout(function() {
                    return u.close();
                }, 5e3), "normal" === e && (s.ReportManager.addPtagExposure("138067.1.1"), this.closePtag = "7593.2.1"));
                return r.default.resolve(!0);
            }
            return r.default.resolve(!1);
        },
        getCurtainExpire: function() {
            return r.default.all([ n.get("mall_freshmenCurtain_hide_until", null), n.get("mall_normalCurtain_hide_until", null), n.get("mall_specialCurtain_hide_until", null), n.get("saleCurtain_hide_until", null) ]);
        },
        close: function(t) {
            var e = this;
            this.data.showModule && (t && this.closePtag && a.report(this.closePtag), this.setData({
                transparent: !0
            }), setTimeout(function() {
                return e.setData({
                    showModule: !1
                }, function() {
                    !e.triggerCurtainFinishDelay && e.triggerEvent("curtainFinish");
                });
            }, 400));
        },
        count: function() {
            var t = this, e = this.data.countdown;
            1 !== e ? (this.setData({
                countdown: e - 1
            }), this.Timer = setTimeout(function() {
                return t.count();
            }, 1e3)) : this.closeSpecial();
        },
        closeSpecial: function(t) {
            var e = this;
            this.data.hideSpecial || (this.Timer && clearTimeout(this.Timer), this.Timer = null, 
            t && this.closePtag && a.report(this.closePtag), this.setData({
                hideSpecial: !0,
                hideCountdown: !0
            }), setTimeout(function() {
                e.setData({
                    showModule: !1
                }), !e.triggerCurtainFinishDelay && e.triggerEvent("curtainFinish");
            }, 1e3));
        },
        navigate: function(t) {
            var e = t.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: e
            }), this.triggerCurtainFinishDelay = !0;
        },
        saleCount: function() {
            var t = this, e = this.data.saleCountdown;
            1 !== e ? (this.setData({
                saleCountdown: e - 1
            }), this.saleTimer = setTimeout(function() {
                return t.saleCount();
            }, 1e3)) : this.closeSale();
        },
        closeSale: function(t) {
            var e = this;
            this.data.hideSale || (this.saleTimer && clearTimeout(this.saleTimer), this.saleTimer = null, 
            t && this.closePtag && a.report(this.closePtag), this.setData({
                hideSale: !0,
                hideSaleCountdown: !0
            }, function() {
                setTimeout(function() {
                    return e.setData({
                        hideMould: !0
                    });
                }, 1e3), !e.triggerCurtainFinishDelay && e.triggerEvent("curtainFinish");
            }));
        },
        saleImageLoaded: function(t) {
            var e = this;
            setTimeout(function() {
                return e.saleCount();
            }, 1e3);
        },
        preventSaleMove: function() {},
        tapOnNavigator: function(t) {
            var e = t.currentTarget.dataset, i = e.rd, a = void 0 === i ? "" : i, n = e.wxappLink, r = void 0 === n ? "" : n, s = e.url, u = void 0 === s ? "" : s;
            r ? (this.$goto(r), this.$report(a)) : this.$goto("/pages/h5/index", {
                url: u
            }), this.triggerCurtainFinishDelay = !0;
        }
    }
});