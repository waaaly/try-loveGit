function e(e) {
    if (e && e.__esModule) return e;
    var n = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (n[i] = e[i]);
    return n.default = e, n;
}

function n(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var i = require("../../../../bases/component.js"), t = n(require("../../../../libs/promise.min.js")), o = e(require("../../model.js")), a = e(require("../../utils.js")), r = n(require("../../page-behavior.js")), s = require("../../dbl11-components/constant.js"), g = [ "pages/index/wallet/carousel/carousel", "pages/index/wallet/channel/channel", "pages/index/wallet/grid-selected/grid-selected" ].length;

new i.JDComponent({
    behaviors: [ r.default ],
    data: {
        scrollTop: 0,
        reachBottom: 0,
        refreshTime: 0,
        showTime: 0,
        hideTime: 0,
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
        refresh: function() {
            var e = this;
            this.shake && this.shake.stop(), wx.showNavigationBarLoading(), this.priorCount = 0, 
            this.getUserBirthday(), this.ppmsConfigPromise = this.getPPMSConfigPromise(), this.getPageConfig(), 
            this.getFreshmenData(), this.setData({
                refreshTime: Date.now(),
                loadOthers: !1
            }), setTimeout(function() {
                e.data.loadOthers || (e.setData({
                    loadOthers: !0
                }), e.triggerEvent("firstScreenLoaded")), wx.stopPullDownRefresh(), wx.hideNavigationBarLoading();
            }, 5e3);
        },
        onComponentLoad: function(e) {
            console.log("京东优选 onComponentLoad", this.priorCount, e.detail), ++this.priorCount == g && this.triggerEvent("firstScreenLoaded", 5), 
            3 == this.priorCount && (this.setData({
                loadOthers: !0
            }), wx.stopPullDownRefresh(), wx.hideNavigationBarLoading());
        },
        onCurtainFinish: function(e) {
            this.setData({
                curtainFinish: !0
            });
        },
        getUserBirthday: function() {
            var e = this;
            this.getUserBirthdayTimer = setTimeout(function() {
                e.getUserBirthdayTimeout = !0, e.setData({
                    birthConfig: {}
                });
            }, 5e3), o.getUserBirthday().then(function(n) {
                if (!e.getUserBirthdayTimeout) {
                    if (clearTimeout(e.getUserBirthdayTimer), n) return e.ppmsConfigPromise.then(function(n) {
                        var i = void 0;
                        n.birthdayDecorate && n.birthdayDecorate.some(function(e) {
                            if (a.checkTime(e.beginTime, e.endTime)) return i = e, !0;
                        }), e.setData({
                            birthConfig: i || {}
                        });
                    }).catch(function(e) {
                        return console.log(e);
                    });
                    e.setData({
                        birthConfig: {}
                    });
                }
            }).catch(function(e) {
                return console.log(e);
            });
        },
        getPPMSConfigPromise: function() {
            var e = this;
            return new t.default(function(n) {
                e.getPPMSConfigResolve = n;
            });
        },
        getPageConfig: function() {
            var e = this, n = {
                channelConfig: {},
                floatingConfig: {},
                itemConfig: {},
                bannerConfig: {
                    firstBanner: [],
                    secondBanner: []
                },
                gridSelectedConfig: {},
                saleConfig: {},
                walletSaleConfig: {},
                showAdvBanner: "0"
            };
            this.biz.getMultiPPMS([ 33326, 34242, 35062, 35120 ]).then(function(i) {
                var t = i[33326] && i[33326][0] ? i[33326][0] : {}, o = i[34242] && i[34242][0] ? i[34242][0] : {};
                e.getPPMSConfigResolve(t);
                var r = a.getActiveConfig(t.channelConfig), g = a.getActiveConfig(t.floatingConfig), h = {
                    curtainCaptain: t.curtainCaptain || []
                }, f = {
                    saleCurtainConfig: o.curtainConfig || []
                }, d = {
                    titles: t.itemConfig || [],
                    greyScale: t.itemGreyScale && t.itemGreyScale[0]
                }, c = {
                    pintuanConfig: t.pintuan || [],
                    liheConfig: t.liheConfig || [],
                    columnConfig: t.columnConfig || []
                }, u = i[35062] && i[35062][0] ? i[35062][0] : {}, l = i[35120] && i[35120][0] ? i[35120][0] : {}, C = i[34242] && i[34242][0] ? i[34242][0] : {}, m = {
                    showAdvBanner: t.advConfig[0].showAdvBanner || "0",
                    showAdvSecondBanner: t.advConfig[0].showAdvSecondBanner || "0",
                    secondBeginTime: t.advConfig[0].secondBeginTime || "2018/01/01 00:00:00",
                    secondEndTime: t.advConfig[0].secondEndTime || "2018/01/02 00:00:00",
                    showAdvFourthBanner: t.advConfig[0].showAdvFourthBanner || "0",
                    fourthBeginTime: t.advConfig[0].fourthBeginTime || "2018/01/01 00:00:00",
                    fourthEndTime: t.advConfig[0].fourthEndTime || "2018/01/02 00:00:00"
                }, v = {
                    showAdvCurtain: t.advConfig[0].showAdvCurtain || "0",
                    curtainBeginTime: t.advConfig[0].curtainBeginTime || "2018/01/01 00:00:00",
                    curtainEndTime: t.advConfig[0].curtainEndTime || "2018/01/02 00:00:00"
                }, p = null;
                (l.task || []).some(function(e) {
                    if (a.checkTime(e.begin, e.end)) return p = e, !0;
                });
                var w = null;
                p && p.bgImg && a.checkTime(s.CLIMAX_BEGIN, s.CLIMAX_END) && (w = "background-image: url(" + e.utils.getImg(p.bgImg) + ")"), 
                e.setData({
                    channelConfig: r,
                    floatingConfig: g,
                    itemConfig: d,
                    bannerConfig: t.bannerConfig[0] || n.bannerConfig,
                    gridSelectedConfig: t.gridSelectedConfig[0] || n.gridSelectedConfig,
                    gridSelectedBg: w,
                    curtainConfig: h,
                    columnConfig: c,
                    saleCurtainConfig: f,
                    saleConfig: u,
                    walletSaleConfig: l,
                    yaoYiYaoConfig: {
                        data: C,
                        indexName: "wallet"
                    },
                    carouselAdcConfig: m,
                    curtainAdvConfig: v
                }), e.initShake(C.shake);
            }).catch(function(i) {
                return e.setData(n);
            });
        },
        getFreshmenData: function() {
            var e = this;
            o.getFreshmenData().then(function(n) {
                return e.setData({
                    freshmenData: n
                });
            }).catch(function(n) {
                return e.setData({
                    freshmenData: {}
                });
            });
        },
        onIdle: function() {
            this.$preload("pages/cate/cate");
        },
        onShowToast: function(e) {},
        initShake: function(e) {
            var n = this;
            if (e && e.length) {
                var i = void 0;
                e.some(function(e) {
                    if (a.checkTime(e.begin, e.end)) return i = e, !0;
                }), i && "1" == i.usingShake && (this.shake = a.Shake.init(), this.shake.on(function() {
                    if (n.shake.stop(), i.mini_link) n.$goto(i.mini_link), n.$report(i.wallet_ptag); else {
                        var e = a.addPtag(i.link, i.wallet_ptag);
                        n.$goto("/pages/h5/index", {
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
        hideFloating: function() {
            this.setData({
                hideFloating: !0
            });
        }
    }
});