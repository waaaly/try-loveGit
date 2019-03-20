function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
    return t.default = e, t;
}

function t(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var a = require("../../../../bases/component.js"), i = t(require("../common-behavior.js")), n = t(require("../../../../libs/promise.min.js")), r = e(require("../../utils.js")), o = e(require("../../model.js")), u = require("../../dbl11-components/constant");

new a.JDComponent({
    behaviors: [ i.default ],
    properties: {
        freshmenData: {
            type: Object,
            observer: function(e) {
                this.getFreshmenDataResolve && this.getFreshmenDataResolve(e);
            }
        },
        columnConfig: {
            type: Object,
            observer: function(e) {
                this.getPPMSDataResolve && this.getPPMSDataResolve(e);
            }
        },
        saleConfig: {
            type: Object,
            observer: function(e) {
                this.getSalePPMSDataResolve && this.getSalePPMSDataResolve(e);
            }
        }
    },
    data: {
        kanjia: {},
        pintuan: {},
        lihe: {},
        hideKanjia: !0,
        hidePintuan: !0,
        hideLihe: !0,
        idx: 0,
        saleColor: "",
        isSale: !1
    },
    methods: {
        refresh: function() {
            var e = this;
            n.default.all([ this.getPPMSData(), this.getFreshmenData() ]).then(function(t) {
                if (!t) return n.default.reject("no ppms data");
                var a = t[0] || {}, i = t[1] || {}, o = a && a.columnConfig && a.columnConfig[0] || {}, u = o.greyScale || "", c = o.pin || "";
                if (!r.greyScale(u, c)) return n.default.reject("no greyScale");
                var s = a && a.pintuanConfig || [], l = a && a.liheConfig || [], h = i && i.isnew && 1 == i.isnew || !1;
                n.default.all([ e.initKanjia(), e.initLihe(l), e.initPintuan(s, h) ]);
            }).catch(function(t) {
                console.log("column catch", t), e.setData({
                    hideKanjia: !0,
                    hidePintuan: !0,
                    hideLihe: !0
                });
            }), this.getSaleConfig();
        },
        getSaleConfig: function() {
            var e = this;
            this.getSalePPMSData().then(function(t) {
                if (!r.checkTime(u.SALE_BEGIN, u.SALE_END)) return n.default.reject();
                var a = null;
                if ((t && t.task || []).some(function(e) {
                    if (r.checkTime(e.begin, e.end)) return a = e, !0;
                }), !a) return n.default.reject();
                e.setData({
                    saleColor: a.bgColor ? "background-color: " + a.bgColor + ";" : "",
                    isSale: !0
                });
            }).catch(function(t) {
                e.setData({
                    saleColor: "",
                    isSale: !1
                });
            });
        },
        getSalePPMSData: function() {
            var e = this;
            return new n.default(function(t, a) {
                e.getSalePPMSDataResolve = t;
            });
        },
        initKanjia: function() {
            var e = this;
            this.biz.getPPMS(34976).then(function(t) {
                if (!t || !t.length) return n.default.reject("no kanjia ppms data");
                var a = {
                    slideText: [],
                    images: [],
                    url: "https://wqs.jd.com/promote/201809/bargainPage/index.html?ptag=137889.35.1"
                }, i = t[0] && t[0].jrjxname && t[0].jrjxname[0] && t[0].jrjxname[0].id || "";
                if (!i) return n.default.reject();
                var u = i.split(",");
                (u = u.filter(function(e) {
                    return !isNaN(e) && 0 != e;
                })).splice(4), o.getSkuInfo(u).then(function(t) {
                    if (!t) return n.default.reject("no getSkuInfo data");
                    var i = [];
                    for (var o in t) {
                        var u = t[o] && t[o].imagePath && e.utils.getImg(t[o].imagePath, 138) || "";
                        u && i.push(u);
                    }
                    if (!i || !i.length) return n.default.reject("no kanjia images data");
                    for (var c = 0; c < 3; c++) {
                        var s = parseInt(Math.random() * i.length);
                        a.images.push(i[s]), i.splice(s, 1);
                    }
                    e.setData({
                        kanjia: a,
                        hideKanjia: !1
                    }), r.exposureUrlPtag(a.url);
                }).catch(function(t) {
                    console.log("column catch", t), e.setData({
                        hideKanjia: !0
                    });
                }), o.getQueryAggrStat(5).then(function(t) {
                    if (!t || !t.length) return n.default.reject("no getQueryAggrStat data");
                    a.slideText = t.map(function(t) {
                        if (t.ddwNowPrice && t.strItemName && t.strHead) {
                            var a = !isNaN(t.ddwNowPrice) && t.ddwNowPrice / 100;
                            return {
                                name: t.strItemName,
                                image: e.utils.getImg(t.strHead, 40),
                                price: a
                            };
                        }
                    }), e.setData({
                        kanjia: a
                    });
                }).catch(function(e) {
                    console.log("column catch", e);
                });
            }).catch(function(t) {
                console.log("column catch", t), e.setData({
                    hideKanjia: !0
                });
            });
        },
        initLihe: function(e) {
            var t = this;
            if (!e || !e.length) return n.default.reject("no liheConfig data");
            var a = [], i = {};
            e.some(function(e) {
                r.checkTime(e.begin, e.end) && (e.id && a.push(e.id), e.activeId && (i[e.id] = e.activeId));
            });
            var u = {
                active: "",
                image: "",
                face: [],
                url: ""
            };
            o.getQueryPrizeDetails(a).then(function(a) {
                if (!a) return n.default.reject("no getQueryPrizeDetails data");
                var c = [];
                if (a.some(function(e) {
                    0 == e.status && e.prizes && e.prizes.length && e.prizes.some(function(t) {
                        return c.push({
                            active: e.active
                        }), !0;
                    });
                }), !c || !c.length) return n.default.reject("no lihe prizes data");
                var s = 0;
                !function a() {
                    var l = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : c[s];
                    o.getQueryPrizesStatus(l.active).then(function(a) {
                        if (a.some(function(e) {
                            if (e.MaxBingos - e.TotalBingos > 0) return u.active = c[s].active, u.image = c[s].image, 
                            u.activeId = i[c[s].active], !0;
                        }), !u.activeId) return n.default.reject("no lihe activeId data");
                        o.getQueryPrizesImage(u.activeId).then(function(e) {
                            if (!e && !e.mainProcess && !e.mainProcess.giftPrizeList && e.mainProcess.giftPrizeList.length) return n.default.reject("no lihe image data");
                            u.image = t.utils.getImg(e.mainProcess.giftPrizeList[0].image);
                        }).then(function() {
                            e.forEach(function(e) {
                                u.active == e.id && (u.url = r.addPtag(e.url, "137889.35.2"));
                            }), o.getQueryMarquee(u.active, 2).then(function(e) {
                                if (!e || !e.length) return n.default.reject("no getQueryMarquee data");
                                e.forEach(function(e) {
                                    e.pic && u.face.push(t.utils.getImg(e.pic, 40));
                                }), t.setData({
                                    lihe: u,
                                    hideLihe: !1
                                });
                            }).catch(function(e) {
                                console.log("column catch", e), t.setData({
                                    lihe: u,
                                    hideLihe: !1
                                });
                            }), r.exposureUrlPtag(u.url);
                        }).catch(function(e) {
                            t.setData({
                                hideLihe: !0
                            });
                        });
                    }).catch(function(e) {
                        console.log("column catch", e), ++s < c.length ? a() : t.setData({
                            hideLihe: !0
                        });
                    });
                }();
            }).catch(function(e) {
                console.log("column catch", e), t.setData({
                    hideLihe: !0
                });
            });
        },
        initPintuan: function(e, t) {
            var a = this, i = t ? "03603206" : "03862191", u = t ? "https://wqs.jd.com/event/promote/xinyaoxin/index.shtml?ptag=137889.35.3" : "https://wqs.jd.com/event/promote/laoyaoxin/index.shtml?ptag=137889.35.4", c = {
                text: e && e[0] && e[0].text || "",
                list: []
            };
            o.getPingouList(i, 3).then(function(e) {
                if (!e || !e.length) return n.default.reject("no getPingouList data");
                c.list = e.map(function(e) {
                    return {
                        image: a.utils.getImg(e.sPicturesUrl, 138),
                        url: u + "&sku=" + e.ddwSkuId
                    };
                }), a.setData({
                    pintuan: c,
                    hidePintuan: !1
                }), c.list.some(function(e) {
                    return r.exposureUrlPtag(e.url), !0;
                });
            }).catch(function(e) {
                console.log("column catch", e), a.setData({
                    hidePintuan: !0
                });
            });
        },
        onSwiperChange: function(e) {
            var t = e.detail.current;
            this.setData({
                idx: t
            });
        },
        getPPMSData: function() {
            var e = this;
            return new n.default(function(t) {
                e.getPPMSDataResolve = t;
            });
        },
        getFreshmenData: function() {
            var e = this;
            return new n.default(function(t) {
                e.getFreshmenDataResolve = t;
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