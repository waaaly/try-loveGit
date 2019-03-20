function t(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e.default = t, e;
}

var e = require("../../../../bases/component.js"), n = t(require("../../model.js")), i = t(require("../../utils.js")), a = t(require("../../../../common/localStorage.js")), r = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../libs/promise.min.js")), u = require("../../../../api/Ptag/report_manager.js"), s = [ 4053 ];

new e.JDComponent({
    properties: {
        showTime: {
            type: Number,
            observer: function() {
                this.triggerCurtainFinishDelay && (this.triggerCurtainFinishDelay = !1, this.triggerEvent("curtainFinish"));
            }
        },
        freshmenData: {
            type: Object,
            observer: function(t) {
                this.getFreshmenDataResolve && this.getFreshmenDataResolve(t);
            }
        },
        curtainConfig: {
            type: Object,
            observer: function(t) {
                this.getPPMSDataResolve && this.getPPMSDataResolve(t);
            }
        },
        saleCurtainConfig: {
            type: Object,
            observer: function(t) {
                this.getSaleCurtainDataResolve && this.getSaleCurtainDataResolve(t);
            }
        },
        advConfig: {
            type: Object,
            value: {
                showAdvCurtain: "0",
                curtainBeginTime: "2018/01/01 00:00:00",
                curtainEndTime: "2018/01/02 00:00:00"
            }
        }
    },
    data: {
        showModule: !1,
        url: "",
        image: "",
        transparent: !1,
        saleCountdown: 5,
        hideSale: !1,
        hideMould: !1,
        hideSaleCountdown: !1
    },
    attached: function() {
        this.init();
    },
    methods: {
        init: function() {
            var t = this;
            r.default.all([ this.getFreshmenData(), this.loadCurtainData(), this.getPPMSData(), this.getCurtainExpire(), this.getSaleCurtainData(), this.getAdvData() ]).then(function(e) {
                var n = e[0], a = e[1], o = e[2] && e[2].curtainCaptain && i.getActiveConfig(e[2].curtainCaptain), l = e[5], h = e[3][0], c = e[3][1], g = e[3][2], f = e[3][3];
                if (a && o) {
                    var d = a.freshmenGiftData, v = a.freshmenActivitiesData, m = a.activitiesData;
                    return r.default.resolve().then(function() {
                        if (!n) return !1;
                        var e = n.isnew, a = n.newgift;
                        return 1 == e && (3 == a ? t.curtainExistsThenShow(v, "freshmen", h).then(function(e) {
                            return e && (t.closePtag = "137889.7.9", i.exposureUrlPtag(v.sUrl)), e;
                        }) : t.curtainExistsThenShow(d, "freshmen", h).then(function(e) {
                            return e && (t.closePtag = "137889.7.8", i.exposureUrlPtag(d.sUrl)), e;
                        }));
                    }).then(function(n) {
                        if (n) return n;
                        var a = e[4] && e[4].saleCurtainConfig || [], r = e[3][4], s = i.getActiveConfig(a);
                        return s.sUrl = s.link || s.wxappLink, s.img && (s.material = s.img), t.curtainExistsThenShow(s, "sale", r).then(function(t) {
                            return t && u.ReportManager.addPtagExposure(s.walletPtag), t;
                        });
                    }).then(function(e) {
                        if (e) return e;
                        var n = o.actives, a = o.material, r = o.sUrl;
                        return !(!(n && a && r) || g && Date.now() < g) && t.captainQuali(n).then(function(e) {
                            return !!e && t.curtainExistsThenShow(o, "captain");
                        }).then(function(e) {
                            return e && (t.closePtag = "137889.7.14", i.exposureUrlPtag(r)), e;
                        });
                    }).then(function(e) {
                        if (e) return e;
                        if ("0" == t.data.advConfig.showAdvCurtain) return e;
                        if (!i.checkTime(t.data.advConfig.curtainBeginTime, t.data.advConfig.curtainEndTime)) return e;
                        var n = {
                            sUrl: null,
                            material: null
                        };
                        return l[s[0]] && (n = {
                            sUrl: l[s[0]].url || null,
                            material: l[s[0]].image || null
                        }), n.sUrl && (n.sUrl = n.sUrl.includes("?") ? n.sUrl + "&ptag=137889.7.21" : n.sUrl.url + "?ptag=137889.7.21"), 
                        t.curtainExistsThenShow(n, "adv", f).then(function(t) {
                            return t && (i.exposureUrlPtag("137889.7.21", !0), wx.$.request.get({
                                url: l[s[0]].exposal_url,
                                priority: "REPORT"
                            })), t;
                        });
                    }).then(function(e) {
                        return e || t.curtainExistsThenShow(m, "normal", c).then(function(e) {
                            return e && (t.closePtag = "137889.7.10", i.exposureUrlPtag(m.sUrl)), e;
                        });
                    }).then(function(e) {
                        !e && t.triggerEvent("curtainFinish");
                    });
                }
                t.triggerEvent("curtainFinish");
            });
        },
        curtainExistsThenShow: function(t, e, n) {
            var u = this, s = t.sUrl, o = t.material;
            if (n && Date.now() < n) return r.default.resolve(!1);
            if (s && o) {
                if ("sale" === e) {
                    var l = {
                        sale: !0,
                        url: i.addPtag(t.link, t.walletPtag),
                        image: this.utils.getImg(o),
                        rd: t.walletPtag,
                        wxappLink: t.wxappLink
                    };
                    t.wxapp_staticimg && (l.preImage = this.utils.getImg(t.wxapp_staticimg)), this.setData(l), 
                    a.set("saleCurtain_hide_until", new Date().setHours(24, 0, 0, 0)), this.closePtag = "7614.1.1";
                } else this.setData({
                    showModule: !0,
                    url: s,
                    image: this.utils.getImg(o)
                }), a.set("index_" + e + "Curtain_hide_until", new Date().setHours(24, 0, 0, 0)), 
                setTimeout(function() {
                    return u.close();
                }, 5e3);
                return r.default.resolve(!0);
            }
            return r.default.resolve(!1);
        },
        getFreshmenData: function() {
            var t = this;
            return new r.default(function(e) {
                t.getFreshmenDataResolve = e;
            });
        },
        loadCurtainData: function() {
            var t = [ 9191 ], e = [ 23594, 23595, 27169 ];
            return n.getCpcData(t, e, {}, Date.now()).then(function(n) {
                var i = n[t[0]];
                if (i) return {
                    freshmenGiftData: i[e[0]] && i[e[0]][0] || {},
                    freshmenActivitiesData: i[e[1]] && i[e[1]][0] || {},
                    activitiesData: i[e[2]] && i[e[2]][0] || {}
                };
            }).catch(function(t) {});
        },
        getCurtainExpire: function() {
            return r.default.all([ a.get("index_freshmenCurtain_hide_until", null), a.get("index_normalCurtain_hide_until", null), a.get("index_captainCurtain_hide_until", null), a.get("index_advCurtain_hide_until", null), a.get("saleCurtain_hide_until", null) ]);
        },
        captainQuali: function(t) {
            return n.getCaptainQuali(t).then(function(t) {
                return t && +t > 0;
            }).catch(function(t) {
                return !1;
            });
        },
        close: function(t) {
            var e = this;
            this.data.showModule && (t && this.closePtag && i.report(this.closePtag), this.setData({
                transparent: !0
            }), setTimeout(function() {
                return e.setData({
                    showModule: !1
                }, function() {
                    !e.triggerCurtainFinishDelay && e.triggerEvent("curtainFinish");
                });
            }, 400));
        },
        navigate: function(t) {
            var e = t.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: e
            }), this.triggerCurtainFinishDelay = !0;
        },
        getSaleCurtainData: function() {
            var t = this;
            return new r.default(function(e) {
                return t.getSaleCurtainDataResolve = e;
            });
        },
        getPPMSData: function() {
            var t = this;
            return new r.default(function(e) {
                return t.getPPMSDataResolve = e;
            });
        },
        getAdvData: function() {
            var t = this, e = s.map(function(t) {
                return t + ":1";
            }).join(",");
            return n.getCubeAdvs(e).then(function(e) {
                var n = {};
                return s.forEach(function(i, a) {
                    var r = e[i];
                    if (r && r.length) {
                        var u = r[0];
                        u.image = t.utils.getImg(u.image_url), u.url = u.target_url, n[i] = u;
                    }
                }), n;
            }).catch(function(t) {
                return [];
            });
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
            t && this.closePtag && i.report(this.closePtag), this.setData({
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
            var e = t.currentTarget.dataset, n = e.rd, i = void 0 === n ? "" : n, a = e.wxappLink, r = void 0 === a ? "" : a, u = e.url, s = void 0 === u ? "" : u;
            r ? (this.$goto(r), this.$report(i)) : this.$goto("/pages/h5/index", {
                url: s
            }), this.triggerCurtainFinishDelay = !0;
        }
    }
});