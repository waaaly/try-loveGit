function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    return e.default = t, e;
}

var i = function() {
    function t(t, e) {
        var i = [], a = !0, s = !1, r = void 0;
        try {
            for (var n, o = t[Symbol.iterator](); !(a = (n = o.next()).done) && (i.push(n.value), 
            !e || i.length !== e); a = !0) ;
        } catch (t) {
            s = !0, r = t;
        } finally {
            try {
                !a && o.return && o.return();
            } finally {
                if (s) throw r;
            }
        }
        return i;
    }
    return function(e, i) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, i);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), a = require("../../bases/component.js"), s = require("../../common/logger.js"), r = e(require("../../common/fe_helper.js")), n = e(require("utils")), o = e(require("../../common/biz")), c = e(require("../../common/toast/toast")), l = t(require("../../behaviors/attributes")), u = require("../../api/Ptag/Ptag_utils.js"), g = e(require("../../common/cookie-v2/cookie.js")), d = require("../../api/Ptag/report_manager"), h = e(require("../../common/url_utils")), p = t(require("../../libs/promise.min.js")), f = new s.Logger("推荐/猜你喜欢组件");

new a.JDComponent({
    behaviors: [ l.default ],
    properties: {
        options: {
            type: Object,
            value: {
                recommendId: "",
                skus: ""
            },
            observer: "_onOptionsChange"
        }
    },
    data: {
        config: {
            loaded: !1
        },
        list: [],
        leftList: [],
        rightList: [],
        curMoreIndex: -1,
        loading: !1,
        error: !1,
        enableWaterfallFlow: !1,
        enableTopic: !1,
        isLoadTopic: !1,
        showHaitunGlobal: !1,
        iconList: {}
    },
    attached: function() {
        var t = this;
        this.options = {}, this.hasAddCart = !1, this.lastPageNum = -1, this.currentPageNum = 0, 
        this.listBuf = [], this.page = getCurrentPages().pop(), this.pageOnPageSrcoll = this.page ? this.page.onPageScroll : null, 
        this.screenHeight = 667, this.listDiff = {
            isLeftShort: !0,
            diffNum: 1
        }, this.setData({
            showHaitunGlobal: n.showHaitunGlobal()
        }), wx.getSystemInfo({
            success: function(e) {
                t.screenHeight = e.screenHeight;
            }
        }), p.default.all([ n.getConfig(), n.getIconConfig() ]).then(function(e) {
            var a = i(e, 2), s = a[0], r = a[1];
            Object.assign(t.data.config, s, {
                loaded: !0
            }, {
                iconList: r || {}
            }), t.pageOnPageSrcoll || !s.enable || "1" != s.enablePagin ? t.load(t.data.config) : f.error("使用猜你喜欢组件分页功能需要注册onPageScroll方法，若猜你喜欢组件在scroll-view内，则scroll-view的scroll事件需要绑定onPageScroll，详细文档可参考:http://git.jd.com/wxapp/wxapp/wikis/components/guess-you-like");
        }).catch(function(t) {
            f.error(t);
        });
    },
    methods: {
        load: function(t) {
            if (!(!+t.enable || +t.pageSize <= 0 || !t.reclist || t.reclist && 0 === t.reclist.length)) {
                var e = g.getCookie("visitkey"), i = g.getCookie("jdpin"), a = !1;
                if ("1" == t.enableWaterfallFlow && (+e.slice(e.length - 2) < +t.grayPercent || t.whiteName.indexOf(i) > -1)) a = !0, 
                d.ReportManager.addPtagExposure("138067.15.2"); else {
                    var s = getCurrentPages();
                    "pages/index/index" == (s && s.length > 0 ? s.pop().route : "") && d.ReportManager.addPtagExposure("138067.15.1");
                }
                "1" == t.isShowTopic && (+e.slice(e.length - 2) < +t.topicGrayPercent || t.topicGrayWhite.indexOf(i) > -1) && (this.data.enableTopic = !0), 
                this.setData({
                    title: t.title,
                    titleBg: this.data.options && this.data.options.titleBg || "",
                    enableAdd2Cart: t.enableAdd2Cart,
                    markBtns: t.markBtns || [],
                    cornerMark: t.cornerMark,
                    enableWaterfallFlow: a,
                    plusImg: t.plusImg,
                    iconList: t.iconList
                }), this.onPageScroll(), t.reclist.length > 1 ? this._onRecommendDataReady() : this._onOptionsChange({
                    recommendId: t.reclist.pop().recid
                });
            }
        },
        onPageScroll: function() {
            var t = this;
            this.page.onPageScroll = function(e) {
                t.pageOnPageSrcoll && t.pageOnPageSrcoll(e), t.onReachBottom();
            };
        },
        setLazyImg: function() {
            var t = this;
            if (this.pageOnPageSrcoll) {
                var e = wx.createSelectorQuery(), i = e ? e.in(this) : null;
                i && i.selectAll(".lazy").boundingClientRect(function(e) {
                    for (var i = {}, a = 0; a < e.length; a++) {
                        var s = e[a], r = s.dataset, n = r.index, o = r.isleft, c = r.actualIndex;
                        s.top < 2 * t.screenHeight && (t.data.enableWaterfallFlow ? 1 != o || t.data.leftList[c].img ? 0 != o || t.data.rightList[c].img || (i["rightList[" + c + "].img"] = t.listBuf[n].img) : i["leftList[" + c + "].img"] = t.listBuf[n].img : t.data.list[c].img || (i["list[" + c + "].img"] = t.listBuf[n].img));
                    }
                    Object.keys(i).length > 0 && t.setData(i);
                }).exec();
            }
        },
        onReachBottom: function() {
            var t = this, e = this.data.config, i = e.enable, a = e.enablePagin, s = e.pageCount;
            if (i && a && this.currentPageNum < s && this.lastPageNum != this.currentPageNum) {
                var r = wx.createSelectorQuery(), n = r ? r.in(this) : null;
                if (this.data.enableWaterfallFlow) {
                    var o = n ? n.selectAll(".last") : null;
                    o && o.boundingClientRect(function(e) {
                        if (e.length >= 2) {
                            var i = e[0].bottom < e[1].bottom ? e[0] : e[1];
                            if (i && i.top < 1.5 * t.screenHeight) {
                                var a = Math.abs(e[0].bottom - e[1].bottom), s = e[0].left < e[1].left ? e[0] : e[1];
                                t.listDiff = {
                                    isLeftShort: s == i,
                                    diffNum: Math.ceil(a / 245)
                                }, t.getMoreData();
                            }
                        }
                    }).exec();
                } else {
                    var c = n ? n.select(".last") : null;
                    c && c.boundingClientRect(function(e) {
                        e && e.top < 1.5 * t.screenHeight && t.getMoreData();
                    }).exec();
                }
            }
        },
        _onRecommendDataReady: function() {
            this.triggerEvent("ready", {
                recList: this.data.config.reclist
            });
        },
        _onOptionsChange: function(t, e) {
            this.hasAddCart ? this.hasAddCart = !1 : (this.options = t || {}, this.getMoreData());
        },
        _render: function(t) {
            var e = this, i = this.data.config, a = i.t, s = i.skus, r = i.expid, n = i.reqsig, o = i.type, c = i.p, l = i.impr;
            if (this.data.enableWaterfallFlow) {
                var u = [], g = [];
                t.forEach(function(t, i) {
                    var a = t.isTopic ? Object.assign(t, {
                        index: e.listBuf.length + i
                    }) : {
                        index: e.listBuf.length + i,
                        dpicon: t.dpicon,
                        hasClsDoublePrice: t.hasClsDoublePrice,
                        icon: t.icon,
                        img: t.img,
                        jp: t.jp,
                        paicon: t.paicon,
                        prom: t.prom,
                        psp: t.psp,
                        sku: t.sku,
                        jpnonshow: t.jpnonshow,
                        source: t.source,
                        t: t.t,
                        tip: t.tips && t.tips.length > 0 ? t.tips[0].v : ""
                    };
                    i < e.listDiff.diffNum ? e.listDiff.isLeftShort ? u.push(a) : g.push(a) : e.listDiff.isLeftShort && (i - e.listDiff.diffNum) % 2 == 0 || !e.listDiff.isLeftShort && (i - e.listDiff.diffNum) % 2 != 0 ? g.push(a) : u.push(a);
                }), this.setData({
                    leftList: this.data.leftList.concat(u),
                    rightList: this.data.rightList.concat(g)
                });
            } else {
                var h = [];
                t.forEach(function(t, i) {
                    var a = t.isTopic ? Object.assign(t, {
                        index: e.listBuf.length + i
                    }) : {
                        index: e.listBuf.length + i,
                        dpicon: t.dpicon,
                        hasClsDoublePrice: t.hasClsDoublePrice,
                        icon: t.icon,
                        img: t.img,
                        jp: t.jp,
                        paicon: t.paicon,
                        prom: t.prom,
                        psp: t.psp,
                        sku: t.sku,
                        jpnonshow: t.jpnonshow,
                        source: t.source,
                        t: t.t,
                        tip: t.tips && t.tips.length > 0 ? t.tips[0].v : ""
                    };
                    h.push(a);
                }), this.setData({
                    list: this.data.list.concat(h)
                });
            }
            this.listBuf = this.listBuf.concat(t);
            var p = [], f = [];
            t.forEach(function(t) {
                f.push(t.source), p.push(t.sku);
            }), d.ReportManager.guessyouLikeReport({
                action: "0",
                t: a,
                expid: r,
                reqsig: n,
                source: f.join(","),
                skus: s,
                type: o,
                p: c,
                impr: l,
                cskus: p.join(",")
            }), this.skuIntersectionObserver();
        },
        getMoreData: function() {
            var t = this, e = this.data.config, i = e.loaded, a = e.enable, s = e.enablePagin, o = e.pageCount, c = e.pageSize, l = e.topicIndex;
            if (!(!i || !this.options.recommendId || "0" == a || "1" == s && +o <= 0 || +c <= 0 || this.lastPageNum == this.currentPageNum) && (this.lastPageNum = this.currentPageNum, 
            0 == this.currentPageNum || "1" == s && this.currentPageNum < o)) {
                var u = {
                    pi: this.currentPageNum + 1,
                    pc: +c + (s ? 0 : 10),
                    recpos: this.options.recommendId,
                    skus: this.options.skus && n.isCartPage() ? this.options.skus : ""
                };
                this._showLoading(!0), n.getRecommendList(u, this.data.enableWaterfallFlow).then(function(e) {
                    Object.assign(t.data.config, {
                        t: r.getUrlParam("t", e.impr),
                        expid: n.getVParams("expid", e.impr),
                        reqsig: n.getVParams("reqsig", e.impr),
                        type: n.getVParams("type", e.impr),
                        p: n.getVParams("p", e.impr),
                        impr: e.impr,
                        skus: u.skus,
                        recpos: u.recpos
                    }), t.currentPageNum++, t.currentPageNum != o && "1" == s || t._showLoading(!1);
                    var i = e.list.splice(0, +c);
                    i.length >= l && t.data.enableTopic && !t.data.isLoadTopic ? n.getRecommendTopic().then(function(e) {
                        var a = !0, s = !1, n = void 0;
                        try {
                            for (var o, c = e[Symbol.iterator](); !(a = (o = c.next()).done); a = !0) {
                                var u = o.value, g = u && u.topicimgs && u.topicimgs[0];
                                if (u && g) {
                                    var h = u.topicname, p = u.topicdesc, f = u.topicid, m = u.pps, P = g.imgurl, b = g.skuid;
                                    if (h && p && f && m && P && b) {
                                        i.splice(l - 1, 0, {
                                            isTopic: !0,
                                            img: r.getImg(P),
                                            title: h,
                                            desp: p,
                                            themeid: f,
                                            pps: m,
                                            skus: b
                                        }), t.data.isLoadTopic = !0, d.ReportManager.addPtagExposure("138433.1.1");
                                        break;
                                    }
                                }
                            }
                        } catch (t) {
                            s = !0, n = t;
                        } finally {
                            try {
                                !a && c.return && c.return();
                            } finally {
                                if (s) throw n;
                            }
                        }
                        t._render(i);
                    }).catch(function(e) {
                        t._render(i);
                    }) : t._render(i), "1" == s && 1 == t.currentPageNum && i.length <= 4 && t.getMoreData();
                }).catch(function(e) {
                    t.lastPageNum = -1, f.error(e), t.setData({
                        loading: !1,
                        error: !0
                    }), t.triggerEvent("loaderror", {
                        error: e,
                        config: {
                            currentPageNum: t.currentPageNum,
                            enablePagin: s,
                            pageCount: o,
                            pageSize: c
                        }
                    });
                });
            }
        },
        gotoDetails: function(t) {
            var e = t.currentTarget.dataset.index, i = this.listBuf[e];
            if (i.isTopic) this.$goto("/pages/h5/index", {
                url: h.addUrlParam("https://wq.jd.com/webportal/channel/theme_page", {
                    PTAG: "138433.1.1",
                    count: 2,
                    sceneid: 1,
                    pps: i.pps,
                    themeid: i.themeid,
                    skus: i.skus
                })
            }); else {
                var a = i.sku, s = i.img, r = i.t, o = i.jp, c = i.pps, l = i.source, g = i.clk, d = i.paicon, p = i.icon, f = this.data.config, m = f.t, P = f.expid, b = f.reqsig, v = f.recpos, k = getCurrentPages();
                "pages/index/index" == (k && k.length > 0 ? k.pop().route : "") && (this.data.enableWaterfallFlow ? u.PtagUtils.addPtag("138067.15.2") : u.PtagUtils.addPtag("138067.15.1")), 
                this._onClick(t);
                var x = n.getVParams("p", g), w = n.getVParams("type", g);
                this._report({
                    action: "1",
                    t: m,
                    csku: a,
                    cskus: "",
                    clk: g,
                    expid: P,
                    reqsig: b,
                    p: x,
                    type: w,
                    index: String(e),
                    source: String(l),
                    operation: v
                }), this.data.config.rd && u.PtagUtils.addPtag(this.data.config.rd), this.$gotoItem({
                    name: r,
                    sku: a,
                    cover: s,
                    price: o / 100,
                    pps: c,
                    ptag: this.data.config.rd || ""
                }, {
                    isPingou: "6" == d,
                    isJx: 11 == p
                });
            }
        },
        add2Cart: function(t) {
            var e = this, i = t.currentTarget.dataset.index, a = this.listBuf[i], s = a.sku, r = a.source, l = a.clk, u = this.data.config, g = u.t, d = u.expid, h = u.reqsig, p = u.recpos, f = n.getVParams("p", l), m = n.getVParams("type", l), P = "gyl_sku_" + s;
            this.hasAddCart = !0, this._onClick(t), this._report({
                action: "1",
                t: g,
                csku: s,
                cskus: "",
                clk: l,
                expid: d,
                p: f,
                type: m,
                reqsig: h,
                index: String(i),
                source: String(r),
                operation: p
            }), wx.showLoading({
                title: "正在加入购物车…",
                mask: !0
            }), o.addCart({
                skuId: s,
                buyNum: 1,
                notifyCartRefresh: !1
            }).then(function(i) {
                wx.hideLoading(), c.show({
                    icon: c.ICON.SUCCESS,
                    content: "成功加入购物车"
                }), e.triggerEvent("afteraddcart", Object.assign(t.detail, {
                    success: !0,
                    domId: P,
                    skuId: s
                }));
            }).catch(function(i) {
                wx.hideLoading(), c.show({
                    icon: c.ICON.ERROR,
                    content: i,
                    duration: 2e3
                }), e.triggerEvent("afteraddcart", Object.assign(t.detail, {
                    success: !1,
                    domId: P,
                    skuId: s
                }));
            });
        },
        onMoreBtnTap: function(t) {
            var e = t.currentTarget.dataset.index;
            this.data.config.morePtag && u.PtagUtils.addPtag(this.data.config.morePtag), this.setData({
                curMoreIndex: e
            });
        },
        onMoreMarkTap: function(t) {
            var e = this, i = t.target.dataset, a = i.type, s = i.ptag, r = i.isleft, o = t.currentTarget.dataset, c = o.sku, l = o.price, g = o.index, d = o.actualIndex, h = (l / 100).toFixed(2);
            switch (a) {
              case "similar":
                s && u.PtagUtils.addPtag(s), this.$goto("/pages/h5/index", {
                    url: "https://wqs.jd.com/search/searchsimilar.shtml?sku=" + c + "&jp=" + h + "&ptag=" + s + "&sceneid=19"
                });
                break;

              case "dislike":
                s && u.PtagUtils.addPtag(s);
                var p = {
                    curMoreIndex: -1
                };
                this.data.enableWaterfallFlow ? (1 == r && this.data.leftList.find(function(t, i) {
                    return t.index == g && (e.data.leftList.splice(i, 1), p.leftList = e.data.leftList), 
                    t.index == g;
                }), 0 == r && this.data.rightList.find(function(t, i) {
                    return t.index == g && (e.data.rightList.splice(i, 1), p.rightList = e.data.rightList), 
                    t.index == g;
                })) : (this.data.list.splice(d, 1), n.setClsDoublePrice(this.data.list), p.list = this.data.list), 
                this.setData(p, function() {
                    e.onReachBottom(), e.setLazyImg();
                });
                break;

              case "close":
                this.setData({
                    curMoreIndex: -1
                });
            }
        },
        onRetry: function(t) {
            this.setData({
                error: !1
            }), this.getMoreData();
        },
        _report: function(t) {
            0 == t.source && delete t.clk, d.ReportManager.guessyouLikeReport(t);
        },
        _onClick: function(t) {
            this.triggerEvent("click", t);
        },
        _showSkuPanel: function(t) {},
        _showLoading: function(t) {
            this.data.loading != t && this.setData({
                loading: t
            });
        },
        skuIntersectionObserver: function() {
            var t = this;
            this.createIntersectionObserver && (this.intersectionObserver && this.intersectionObserver.disconnect(), 
            this.intersectionObserver = this.createIntersectionObserver({
                observeAll: !0,
                thresholds: [ .5 ],
                initialRatio: 0
            }), this.intersectionObserver.relativeToViewport({
                top: 0,
                bottom: 0
            }).observe(".mod_item_scoure1", function(e) {
                var i = "";
                e.intersectionRatio > .5 && e.dataset && t.listBuf[+e.dataset.index] && (i = t.listBuf[+e.dataset.index]), 
                i && i.client_exposal_url && 1 == i.source && t._report({
                    action: "1",
                    clk: i.client_exposal_url,
                    source: String(i.source)
                });
            }));
        }
    }
});