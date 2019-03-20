function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    return t.default = e, t;
}

function t(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function i(e) {
    if ("string" == typeof e) {
        var t = {
            carousel: 20,
            "channel-nav": 21,
            "promote-banner": 22,
            pingou: 23,
            news: 27
        }, i = e.split("/"), n = i.length;
        return t[n ? i[n - 1] : "none"];
    }
}

var n = require("../../../../bases/component.js"), o = require("../../../../common/fe_report/speed.js"), a = t(require("../../../../libs/promise.min.js")), s = t(require("../../page-behavior.js")), r = e(require("../../model.js")), l = e(require("../../utils.js")), h = e(require("../banner.js")), d = require("../../dbl11-components/constant");

new n.JDComponent({
    behaviors: [ s.default ],
    data: {
        scrollTop: 0,
        reachBottom: 0,
        refreshTime: 0,
        showTime: 0,
        hideTime: 0,
        bannerData: {},
        showQuality: !1,
        showSelected: !1,
        showRecommended: !1,
        hideRecommendModule: !1,
        dbl11Config: {},
        hideFloating: !1
    },
    methods: {
        onLoad: function() {
            this.refresh();
        },
        onShow: function() {
            this.shake && this.shake.start(), this.setData({
                showTime: Date.now()
            });
        },
        onHide: function() {
            this.shake && this.shake.stop(), this.setData({
                hideTime: Date.now()
            });
        },
        detached: function() {},
        refresh: function() {
            var e = this;
            this.shake && this.shake.stop(), this.startTime = Date.now(), this.speedMarks = {}, 
            wx.showNavigationBarLoading(), this.priorCount = 0, this.getMain(), this.getPPMSData(), 
            this.setData({
                refreshTime: Date.now(),
                loadOthers: !1,
                showQuality: !1,
                showSelected: !1,
                showRecommended: !1,
                hideRecommendModule: !1,
                dbl11Config: {},
                hideFloating: !1
            }), setTimeout(function() {
                e.data.loadOthers || (e.setData({
                    loadOthers: !0
                }, function() {
                    return e.getBannerData();
                }), e.triggerEvent("firstScreenLoaded")), wx.stopPullDownRefresh(), wx.hideNavigationBarLoading();
            }, 5e3);
        },
        onComponentLoad: function(e) {
            var t = this;
            console.log("个性化首页 onComponentLoad", this.priorCount, e.detail);
            var n = i(e.detail);
            n && (this.speedMarks["s" + n] = Date.now() - this.startTime), 5 == ++this.priorCount && (console.log("speed point: First screen modules loaded: ", Date.now() - this.startTime), 
            this.triggerEvent("firstScreenLoaded", 7), Math.random() < .2 && o.Speed.reportAlone(1024, this.speedMarks)), 
            5 == this.priorCount && (this.setData({
                loadOthers: !0
            }, function() {
                return t.getBannerData();
            }), wx.stopPullDownRefresh(), wx.hideNavigationBarLoading(), setTimeout(function() {
                t.onIdle();
            }, 2e3));
        },
        onCurtainFinish: function(e) {
            this.setData({
                curtainFinish: !0
            });
        },
        getMain: function() {
            var e = this, t = getApp();
            r.getMallMain(Date.now(), "http").then(function(i) {
                var n = Date.now() - e.startTime;
                if (e.speedMarks.s29 = n, !i) return a.default.reject("get main data fail.");
                t.event.emit("index_mall_init", i), l.checkTime(d.SALE_BEGIN, d.SALE_END) && e.getDbl11Config(i);
                var o = {}, s = {};
                i && i.global && i.global.globalPPMS && i.global.globalPPMS[34242] && i.global.globalPPMS[34242].length && (s = i.global.globalPPMS[34242][0]), 
                o.saleConfig = {
                    data: s,
                    indexName: "mall"
                }, e.initShake(s.shake), e.setData(o);
            }).catch(function(e) {
                return t.event.emit("index_mall_init", {});
            });
        },
        getDbl11Config: function(e) {
            var t = null;
            if ((e && e.global && e.global.globalPPMS && e.global.globalPPMS[31550] || []).some(function(e) {
                if (l.checkTime(e.begin, e.end)) return t = e, !0;
            }), t) {
                var i = {
                    bg_goods: t.goujingxuanBG ? "url(" + this.utils.getImg(t.gouhaowuBG) + ")" : "",
                    bg_quality: t.goupinzhiBG ? "url(" + this.utils.getImg(t.goupinzhiBG) + ")" : "",
                    bg_selected: t.goujingxuanBG ? "url(" + this.utils.getImg(t.goujingxuanBG) + ")" : ""
                };
                this.setData({
                    dbl11Config: i
                });
            }
        },
        getPPMSData: function() {
            var e = this, t = {
                bannerConfig: {},
                qualityConfig: {},
                selectedConfig: {},
                videoConfig: {}
            };
            console.log("speed point: Start to loadPPMS config loaded: ", Date.now() - this.startTime), 
            this.biz.getPPMS([ 35630 ]).then(function(t) {
                var i = t && t[0] || "", n = {};
                if (i) {
                    n.bannerConfig = i.bannerConfig && i.bannerConfig[0] || {}, n.selectedConfig = i.selectedConfig && i.selectedConfig[0] || {};
                    var o = i.qualityConfig && i.qualityConfig[0] || {};
                    n.qualityConfig = {
                        recommendTitle: o.recommendTitle || "",
                        recommendDes: o.recommendDes || "",
                        reviewsTitle: o.reviewsTitle || "",
                        reviewsDes: o.reviewsDes || "",
                        reviewsUrl: o.reviewsUrl || ""
                    };
                    var a = i.videoConfig && i.videoConfig[0] || {};
                    n.videoConfig = {
                        title: a.title || "",
                        moreDesc: a.moreDesc || "",
                        moreUrl: a.moreUrl || "",
                        showCount: !1
                    };
                    var s = i.bannerConfig && i.bannerConfig[0] || {};
                    e.floorRocketVk = s.rocketVk || "";
                } else n.bannerConfig = {}, n.selectedConfig = {}, n.qualityConfig = {
                    recommendTitle: "有好货",
                    recommendDes: "买家推荐",
                    reviewsTitle: "好物评测",
                    reviewsDes: "品质鉴定",
                    reviewsUrl: ""
                }, n.videoConfig = {
                    title: "京东小视频",
                    moreDesc: "更多精彩小视频",
                    moreUrl: "",
                    showCount: !1
                };
                console.log("speed point: PPMS config loaded: ", Date.now() - e.startTime), e.speedMarks.s25 = Date.now() - e.startTime, 
                e.setData(n);
            }).catch(function(i) {
                return e.setData(t);
            });
        },
        getBannerData: function() {
            var e = this;
            h.getBannerData(this.floorRocketVk).then(function(t) {
                var i = t.featuredData, n = t.selectedData;
                e.setData({
                    bannerData: {
                        featured: i,
                        selected: n
                    }
                }), i && i.length && e.setData({
                    showQuality: !0
                }), n && n.length && e.setData({
                    showSelected: !0
                });
            }).catch(function(t) {
                return e.setData({
                    bannerData: {}
                });
            });
        },
        onIdle: function() {
            this.$preload("pages/cate/cate");
        },
        initShake: function(e) {
            var t = this;
            if (e && e.length) {
                var i = void 0;
                e.some(function(e) {
                    if (l.checkTime(e.begin, e.end)) return i = e, !0;
                }), i && "1" == i.usingShake && (this.shake = l.Shake.init(), this.shake.on(function() {
                    if (t.shake.stop(), i.mini_link) t.$goto(i.mini_link), t.$report(i.mall_ptag); else {
                        var e = l.addPtag(i.link, i.mall_ptag);
                        t.$goto("/pages/h5/index", {
                            url: e
                        });
                    }
                }));
            }
        },
        onShakeAnimLoaded: function(e) {
            this.setData({
                shakePayload: e.detail
            });
        },
        showQuality: function() {
            this.setData({
                showQuality: !0
            });
        },
        showSelected: function() {
            this.setData({
                showSelected: !0
            });
        },
        showRecommended: function() {
            this.setData({
                showRecommended: !0
            });
        },
        hideRecommendModule: function() {
            this.setData({
                hideRecommendModule: !0
            });
        },
        hideFloating: function() {
            this.setData({
                hideFloating: !0
            });
        }
    }
});