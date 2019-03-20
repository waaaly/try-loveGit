function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
    return t.default = e, t;
}

function t(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

function a() {
    var e = [ {
        name: {
            en: "BRAND",
            ch: "优选大牌"
        },
        id: 1605,
        tabId: "BRAND",
        tabRd: "137889.21.1"
    }, {
        name: {
            en: "HOT",
            ch: "优选热销"
        },
        id: (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).hotId || 1579,
        tabId: "HOT",
        tabRd: "137889.23.1"
    }, {
        name: {
            en: "GOOD",
            ch: "优选好货"
        },
        id: 1606,
        tabId: "QUALITY",
        tabRd: "137889.22.1"
    } ], t = Math.floor(3 * Math.random());
    return e.forEach(function(e) {
        Object.assign(e, {
            list: [],
            curPage: 0,
            loading: !1,
            hasMore: !0
        });
    }), {
        entries: e,
        curIdx: t,
        tabModifier: "",
        shopInfo: {},
        reviewRate: {},
        feedList: {},
        coupons: {},
        errorMsg: "",
        saleIcon: ""
    };
}

var i = require("../../../../bases/component.js"), r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../libs/promise.min.js")), n = e(require("../../model.js")), o = e(require("../../utils.js")), s = require("../../../../common/logger.js"), c = require("../../dbl11-components/constant"), u = new s.Logger("HMMMMMMMMM 京东优选 - 优选Tab 列表"), d = [ 10, 20, 50 ];

new i.JDComponent({
    properties: {
        config: {
            type: Object,
            observer: function(e) {
                var t = void 0;
                if (e.greyScale && e.greyScale.hot && e.greyScale.hot[0]) {
                    var i = e.greyScale.hot[0];
                    t = o.greyScale(i.greyScale, i.whiteList) ? i.testId : i.id;
                }
                var r = a({
                    hotId: t
                });
                r.titles = e.titles, this.setData(r), this.init();
            }
        },
        scrollTop: {
            type: Number,
            observer: function(e, t) {
                this.onScroll(e, t);
            }
        },
        reachBottom: {
            type: Number,
            observer: function() {
                this.loadData();
            }
        },
        saleConfig: {
            type: Object,
            observer: function(e) {
                this.getPPMSDataResolve && this.getPPMSDataResolve(e);
            }
        }
    },
    data: {},
    ready: function() {
        var e = getApp().systemInfo;
        e && "ios" == e.platform && this.setData({
            tabModifier: "sticky"
        });
    },
    methods: {
        init: function() {
            this.uniqueSkuList = [], this.loadData(), o.checkTime(c.SALE_BEGIN, c.SALE_END) && this.getSaleConfig();
        },
        getSaleConfig: function() {
            var e = this;
            this.getPPMSData().then(function(t) {
                var a = null;
                (t && t.logo || []).some(function(e) {
                    if (o.checkTime(e.begin, e.end)) return a = e, !0;
                }), a && e.setData({
                    saleIcon: a.goods ? e.utils.getImg(a.goods) : ""
                });
            });
        },
        getPPMSData: function() {
            var e = this;
            return new r.default(function(t, a) {
                e.getPPMSDataResolve = t;
            });
        },
        loadData: function() {
            var e = this, a = this.data, i = a.entries, r = a.curIdx;
            if (i) {
                var s = i[r];
                if (!(s.loading || !s.hasMore || s.curPage >= d.length)) {
                    var c = 0 == s.curPage;
                    if (this.setData({
                        errorMsg: ""
                    }), c) {
                        i.forEach(function(e) {
                            e.loading = !0;
                        });
                        var g = i.map(function(e) {
                            return e.id;
                        }).join(";"), l = [ d[0], d[0], d[0] ].join(";");
                        u.log("Send request", r, g, "0;0;0", l), n.getSmartData({
                            id: g,
                            offset: "0;0;0",
                            count: l
                        }).then(function(t) {
                            var a = [], r = [], n = [];
                            i.forEach(function(i, o) {
                                var s = e.processSmartData(t[i.id] || [], i.id);
                                switch (i.tabId) {
                                  case "BRAND":
                                    a = a.concat(s.skuIds), n = n.concat(s.venderIds);
                                    break;

                                  case "QUALITY":
                                    r = r.concat(s.skuIds);
                                    break;

                                  case "HOT":
                                    a = a.concat(s.skuIds);
                                }
                                Object.assign(i, {
                                    list: s.list,
                                    curPage: i.curPage + 1,
                                    loading: !1,
                                    hasMore: t[i.id].length >= d[i.curPage] && i.curPage + 1 < d.length,
                                    offset: d[0]
                                });
                            }), e.getShopInfo(n), e.getReviewRate(r), e.getFeedList(r), e.getActiveCoupon(a), 
                            e.setData({
                                entries: i
                            }, function() {
                                e.calcTabRectTop();
                            }), u.log("setData", i), setTimeout(function() {
                                e.triggerEvent("idleTimeArrived");
                            }, 1e3);
                        }).catch(function(t) {
                            var a = t.code, i = t.message;
                            e.setData({
                                "entries[0].loading": !1,
                                "entries[1].loading": !1,
                                "entries[2].loading": !1,
                                errorMsg: o.genErrMsg(i, a)
                            });
                        });
                    } else {
                        s.loading = !0;
                        var f = s.id, h = s.offset, p = d[s.curPage];
                        u.log("Send request", r, f, h, p), n.getSmartData({
                            id: f,
                            offset: h,
                            count: p
                        }).then(function(a) {
                            var i = s, n = e.processSmartData(a[i.id] || [], i.id);
                            switch (i.tabId) {
                              case "BRAND":
                                e.getShopInfo(n.venderIds), e.getActiveCoupon(n.skuIds);
                                break;

                              case "QUALITY":
                                e.getReviewRate(n.skuIds), e.getFeedList(n.skuIds);
                                break;

                              case "HOT":
                                e.getActiveCoupon(n.skuIds);
                            }
                            Object.assign(i, {
                                list: i.list.concat(n.list),
                                curPage: i.curPage + 1,
                                loading: !1,
                                hasMore: a[i.id].length >= d[i.curPage] && i.curPage + 1 < d.length,
                                offset: h + p
                            }), e.setData(t({}, "entries[" + r + "]", i)), u.log("setData", i);
                        }).catch(function(a) {
                            var i, n = a.code, s = a.message;
                            e.setData((i = {}, t(i, "entries[" + r + "].loading", !1), t(i, "errorMsg", o.genErrMsg(s, n)), 
                            i));
                        });
                    }
                }
            }
        },
        processSmartData: function(e, t) {
            var a = this, i = [], r = [], n = [];
            return e.forEach(function(e) {
                var s = t + "_" + e.skuid;
                if (-1 == a.uniqueSkuList.findIndex(function(e) {
                    return e == s;
                })) {
                    a.uniqueSkuList.push(s);
                    var u = "";
                    if (e.promdescext) {
                        var d = JSON.parse(e.promdescext);
                        d && d.some(function(e) {
                            var t = e.subextinfo && JSON.parse(e.subextinfo) || {}, a = e.promtype, i = t.subExtType, r = t && t.subRuleList && t.subRuleList[0] || {};
                            return 15 === Number(a) && 1 === Number(i) || 16 === Number(a) && 2 === Number(i) || 16 === Number(a) && 3 === Number(i) || 15 === Number(a) && 14 === Number(i) ? (u = r.needMoney && r.rewardMoney && "满" + r.needMoney + "-" + r.rewardMoney || "", 
                            !0) : 19 === Number(a) && 19 === Number(i) || 36 === Number(a) && 20 === Number(i) ? (u = r.needNum && r.rebate && r.needNum + "件" + r.rebate + "折" || "", 
                            !0) : void 0;
                        });
                    }
                    var g = void 0;
                    e.refprice - e.price > 0 && (g = ((100 * e.refprice - 100 * e.price) / 100).toFixed(2).replace(/(\.00$)|(0$)/, ""));
                    var l = {
                        uid: s,
                        sku: e.skuid,
                        ziying: 1 == e.itemtype,
                        name: e.fullname,
                        price: e.price,
                        image: a.utils.getImg(e.imgbase, 186),
                        itemUrl: e.url,
                        day: e.dayOflowestprice,
                        catId: e.classid3,
                        priceOff: g,
                        promotion: u,
                        shopId: e.shopid,
                        venderId: e.venderid,
                        pps: e.pps,
                        ispingou: e.ispingou,
                        needcount: e.needcount,
                        refprice: e.refprice
                    };
                    o.checkTime(c.SALE_BEGIN, c.SALE_END) && (16384 & e.property) > 0 && (l.hasSaleIcon = !0), 
                    i.push(l), r.push(e.skuid), ~~e.venderid && n.push(e.venderid);
                }
            }), {
                list: i,
                skuIds: r,
                venderIds: n
            };
        },
        switchTab: function(e) {
            var t = e.currentTarget.dataset, a = t.index, i = t.rd;
            this.setData({
                curIdx: a
            }), this.tabRectTop && this.data.scrollTop > this.tabRectTop && wx.pageScrollTo({
                scrollTop: this.tabRectTop
            });
            var r = this.data;
            0 == r.entries[r.curIdx].list.length && this.loadData(), i && o.report(i);
        },
        gotoH5: function(e) {
            var t = e.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: t
            });
        },
        gotoItem: function(e) {
            var t = e.currentTarget.dataset, a = t.index, i = t.rd, r = this.data, n = r.entries[r.curIdx].list[a];
            this.$goto("/pages/item/detail/detail", {
                sku: n.sku,
                name: n.name,
                price: n.price,
                cover: n.image,
                pps: n.pps || "",
                ptag: i
            });
        },
        onScroll: function(e, t) {
            var a = this.data, i = a.scrollTop, r = a.tabModifier;
            if ("sticky" != r) return !this.tabRectTop && r ? this.setData({
                tabModifier: ""
            }) : void (r && i <= this.tabRectTop ? this.setData({
                tabModifier: ""
            }) : !r && i > this.tabRectTop && this.setData({
                tabModifier: "fixed"
            }));
        },
        calcTabRectTop: function() {
            var e = this, t = wx.createSelectorQuery();
            t && (t.selectViewport().scrollOffset(), t.in(this).select("#tab").boundingClientRect(), 
            t.exec(function(t) {
                t && t[0] && t[1] && (e.tabRectTop = t[0].scrollTop + t[1].top, u.log("calcTabRectTop", e.tabRectTop));
            }));
        },
        getShopInfo: function(e) {
            var t = this;
            e.length && n.getShopInfo(e).then(function(e) {
                var a = t.data.shopInfo;
                Object.assign(a, e), t.setData({
                    shopInfo: a
                });
            });
        },
        getReviewRate: function(e) {
            var t = this;
            n.getReviewRate(e).then(function(e) {
                var a = t.data.reviewRate;
                Object.assign(a, e), t.setData({
                    reviewRate: a
                });
            });
        },
        getActiveCoupon: function(e) {
            var t = this;
            n.getActiveCoupon(e).then(function(e) {
                var a = t.data.coupons;
                Object.assign(a, e), t.setData({
                    coupons: a
                });
            });
        },
        getFeedList: function(e) {
            var t = this;
            n.getFeedList(e).then(function(e) {
                var a = t.data.feedList;
                Object.assign(a, e), t.setData({
                    feedList: a
                });
            });
        }
    }
});