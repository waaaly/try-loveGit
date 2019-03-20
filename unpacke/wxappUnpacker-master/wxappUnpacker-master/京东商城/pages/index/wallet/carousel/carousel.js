function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}

function t(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function r(e) {
    if (Array.isArray(e)) {
        for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
        return r;
    }
    return Array.from(e);
}

var n = require("../../../../bases/component.js"), a = t(require("../common-behavior.js")), o = t(require("../../../../libs/promise.min.js")), i = e(require("../../model.js")), u = e(require("../../utils.js")), s = require("../../../../common/img_loader/img_loader.js"), d = e(require("../../../../common/localStorage.js")), l = require("../../dbl11-components/constant"), h = [ 4055, 4054 ], c = "137889.2.11";

new n.JDComponent({
    behaviors: [ a.default ],
    properties: {
        birthConfig: {
            type: Object,
            observer: function(e) {
                var t = this;
                if (!e.bannerImg) return this.getBirthBannerResolve({});
                d.get("index_birth_banner_decorated", null).then(function(r) {
                    t.getBirthBannerResolve && (r ? t.getBirthBannerResolve({}) : t.getBirthBannerResolve(e));
                });
            }
        },
        advConfig: {
            type: Object,
            value: {
                showAdvSecondBanner: "0",
                secondBeginTime: "2018/01/01 00:00:00",
                secondEndTime: "2018/01/02 00:00:00",
                showAdvFourthBanner: "0",
                fourthBeginTime: "2018/01/01 00:00:00",
                fourthEndTime: "2018/01/02 00:00:00"
            }
        },
        saleConfig: {
            type: Object,
            observer: function(e) {
                this.getPPMSDataResolve && this.getPPMSDataResolve(e);
            }
        }
    },
    data: {
        swiperIdx: 0,
        entries: []
    },
    methods: {
        refresh: function() {
            this.loadBannerData();
        },
        loadBannerData: function() {
            var e = this;
            o.default.all([ this.getDb11Banner(), this.getWeatherLocation(), this.getBirthBanner(), this.getAdvData() ]).then(function(t) {
                var n = t[0], a = t[1], o = t[2], i = t[3], s = n.entries.filter(function(e) {
                    return !!e;
                });
                o.bannerImg && (n.shuffle = !0, s.splice(0, 0, {
                    image: e.utils.getImg(o.bannerImg, 750),
                    url: o.bannerUrl
                }), d.set("index_birth_banner_decorated", "true", {
                    expire: "1d"
                }), u.exposureUrlPtag(o.bannerUrl));
                var l = n.shuffle;
                return {
                    entries: [].concat(r(s), r(a)),
                    shuffle: l,
                    adv: i
                };
            }).then(function(t) {
                var r = t.entries, n = t.shuffle, a = t.adv, i = [];
                if (i = n ? [ r[0] ].concat(r.slice(1).sort(function() {
                    return Math.random() > .5;
                })) : r.sort(function() {
                    return Math.random() > .5;
                }), a[h[0]] && "1" == e.data.advConfig.showAdvSecondBanner && u.checkTime(e.data.advConfig.secondBeginTime, e.data.advConfig.secondEndTime) && (e.advSecondCarouselIndex = 1, 
                0 == i.length ? (i.push(a[h[0]]), e.advSecondCarouselIndex = 0) : i.splice(1, 0, a[h[0]]), 
                i[e.advSecondCarouselIndex].url = u.addPtag(i[e.advSecondCarouselIndex].url, c), 
                e.advSecond = !0, e.advSecondExposal = i[e.advSecondCarouselIndex].exposal_url), 
                a[h[1]] && "1" == e.data.advConfig.showAdvFourthBanner && u.checkTime(e.data.advConfig.fourthBeginTime, e.data.advConfig.fourthEndTime) && (e.advFourthCarouselIndex = 3, 
                i.length < 3 ? (2 == i.length ? e.advFourthCarouselIndex = 2 : 1 == i.length ? e.advFourthCarouselIndex = 1 : e.advFourthCarouselIndex = 0, 
                i.push(a[h[1]])) : i.splice(3, 0, a[h[1]]), i[e.advFourthCarouselIndex].url = u.addPtag(i[e.advFourthCarouselIndex].url, "137889.2.12"), 
                e.advFourth = !0, e.advFourthExposal = i[e.advFourthCarouselIndex].exposal_url), 
                e.hashExposal = {
                    advSecond: !1,
                    advFourth: !1
                }, !(i = i.slice(0, 8)).length) return o.default.reject({
                    message: "Data error!"
                });
                1 == i.length && (0 == e.advSecondCarouselIndex && (e.hashExposal.advSecond = !0, 
                u.exposureUrlPtag(c, !0), wx.$.request.get({
                    url: e.advSecondExposal,
                    priority: "REPORT"
                })), 0 == e.advFourthCarouselIndex && (e.hashExposal.advFourth = !0, u.exposureUrlPtag("137889.2.12", !0), 
                wx.$.request.get({
                    url: e.advFourthExposal,
                    priority: "REPORT"
                }))), 2 == i.length && a[h[0]] && "1" == e.data.advConfig.showAdvSecondBanner && a[h[1]] && "1" == e.data.advConfig.showAdvFourthBanner && (e.hashExposal.advSecond = !0, 
                u.exposureUrlPtag(c, !0), wx.$.request.get({
                    url: e.advSecondExposal,
                    priority: "REPORT"
                })), e.setData({
                    entries: [ Object.assign({}, i[0], {
                        image: e.utils.getImg(i[0].image, 150)
                    }) ],
                    error: !1
                }, function() {
                    return e.triggerEvent("componentLoad", e.is);
                }), e.imgLoader = new s.ImgLoader(e), e.imgLoader.load(i[0].image, function(t, r) {
                    e.setData({
                        entries: i,
                        swiperCurrent: 0,
                        swiperIdx: 0
                    });
                });
            }).catch(function(t) {
                console.error(t), e.setData({
                    error: !0
                }), e.triggerEvent("componentLoad", e.is);
            });
        },
        getDb11Banner: function() {
            var e = this;
            return this.getPPMSData().then(function(t) {
                var r = t && t.logo || [];
                return e.getCpcData(r);
            });
        },
        getCpcData: function(e) {
            var t = this, r = [ 9816 ], n = [ 25527, 25528, 25529, 25530, 25531, 25452 ], a = "";
            return u.checkTime(l.SALE_BEGIN, l.SALE_END) || (e = []), e.forEach(function(e) {
                e.beginTime = e.begin, e.endTime = e.end;
            }), (e = u.getActiveConfig(e) || {}) && e.banner && (a = e.banner || ""), i.getCpcData(r, n, {}, new Date()).then(function(e) {
                var i = !1, u = e[r[0]];
                return u ? {
                    entries: n.map(function(e, r) {
                        var n = u[e] && u[e][0];
                        return n ? (0 == r && (i = !0), {
                            image: t.utils.getImg(n.material, 750),
                            url: n.sUrl,
                            bannerMark: t.utils.getImg(a)
                        }) : null;
                    }),
                    shuffle: i
                } : o.default.reject({
                    message: "Fetch cpc data error!"
                });
            }).catch(function(e) {
                return {
                    entries: [],
                    shuffle: !1
                };
            });
        },
        getBirthBanner: function() {
            var e = this;
            return new o.default(function(t) {
                e.getBirthBannerResolve = t;
            });
        },
        getWeatherLocation: function() {
            var e = this;
            return o.default.all([ i.getWeatherLocation(), this.getWeatherPPMS() ]).then(function(t) {
                if (!t[0] || !t[1]) return o.default.reject();
                var r = [], n = t[0].province, a = t[0].weather, i = t[1];
                return a <= 0 || a > 5 ? r : (i.some(function(t) {
                    if (t.provinceid == n) {
                        var o = !0, i = !1, u = void 0;
                        try {
                            for (var s, d = t.conditions[Symbol.iterator](); !(o = (s = d.next()).done); o = !0) {
                                var l = s.value;
                                l.weatherType == a && (l.image = e.utils.getImg(l.img, 750), l.url = l.marketUrl, 
                                r.push(l));
                            }
                        } catch (e) {
                            i = !0, u = e;
                        } finally {
                            try {
                                !o && d.return && d.return();
                            } finally {
                                if (i) throw u;
                            }
                        }
                        return !0;
                    }
                }), r);
            }).catch(function(e) {
                return [];
            });
        },
        getAdvData: function() {
            var e = this, t = h.map(function(e) {
                return e + ":1";
            }).join(",");
            return i.getCubeAdvs(t).then(function(t) {
                var r = {};
                return h.forEach(function(n, a) {
                    var o = t[n];
                    if (o && o.length) {
                        var i = o[0];
                        i.image = u.clipImg(e.utils.getImg(i.image_url, 750), 750, 366), i.url = i.target_url, 
                        r[n] = i;
                    }
                }), r;
            }).catch(function(e) {
                return [];
            });
        },
        getWeatherPPMS: function() {
            return this.biz.getPPMS(33208);
        },
        getPPMSData: function() {
            var e = this;
            return new o.default(function(t, r) {
                e.getPPMSDataResolve = t;
            });
        },
        onSwiperChange: function(e) {
            var t = e.detail.current;
            this.advSecond && t == this.advSecondCarouselIndex && !this.hashExposal.advSecond && (this.hashExposal.advSecond = !0, 
            u.exposureUrlPtag(c, !0), wx.$.request.get({
                url: this.advSecondExposal,
                priority: "REPORT"
            })), this.advFourth && t == this.advFourthCarouselIndex && !this.hashExposal.advFourth && (this.hashExposal.advFourth = !0, 
            u.exposureUrlPtag("137889.2.12", !0), wx.$.request.get({
                url: this.advFourthExposal,
                priority: "REPORT"
            })), this.setData({
                swiperIdx: e.detail.current
            });
        },
        tapOnItem: function(e) {
            var t = e.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: t
            });
        }
    }
});