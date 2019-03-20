function t(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
    return e.default = t, e;
}

function e(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function r(t, e, r) {
    return e in t ? Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = r, t;
}

var n = require("../../../../bases/component.js"), i = e(require("../../mall/common-behavior.js")), a = e(require("../../../../libs/promise.min.js")), l = t(require("../../utils.js")), u = t(require("../../model.js")), o = require("../constant"), s = {
    CENTER_RD: "138067.62.2"
}, c = {
    CENTER_RD: "137889.64.2"
};

new n.JDComponent({
    behaviors: [ i.default ],
    properties: {
        showIndex: {
            type: Number,
            value: 2
        },
        saleConfig: {
            type: Object,
            observer: function(t) {
                this.getPPMSDataResolve && this.getPPMSDataResolve(t);
            }
        }
    },
    data: {
        hideModule: !0,
        swiperIdx: 0
    },
    created: function() {
        2 == this.data.showIndex && (this.renderMall = this.renderMall.bind(this), getApp().event.on("index_mall_init", this.renderMall));
    },
    ready: function() {},
    detached: function() {
        2 == this.data.showIndex && (this.renderMall = this.renderMall.bind(this), getApp().event.off("index_mall_init", this.renderMall));
    },
    methods: {
        refresh: function() {
            1 == this.data.showIndex ? this.renderWallet() : this.renderMall();
        },
        renderMall: function(t) {
            var e = this;
            a.default.resolve(t).then(function(t) {
                if (!l.checkTime(o.CATEGORY_BEGIN, o.CATEGORY_END)) return e.triggerEvent("componentLoad", e.is), 
                void e.setData({
                    hideModule: !0
                });
                var r = t && t.dbl11 && t.dbl11.ppms && t.dbl11.ppms.plBanner || [], n = e.getConfig(r);
                if (!n) return a.default.reject();
                a.default.all([ e.getCpcData(10877, 28789), e.getCenterData(6242, 5), e.getRightCpcData(n.rightBannerVk, 10877, 28790, 28791) ]).then(function(t) {
                    var r = t[0] || {}, i = t[1], l = t[2] || {};
                    if (0 == Object.keys(r).length || 0 == Object.keys(i).length || 0 == Object.keys(l).length) return a.default.reject();
                    var u = {
                        bgImg: n.bg || "",
                        leftTitle: r.title || "",
                        leftPoint: r.des || "",
                        leftHref: r.url || "",
                        leftRd: r.userdata1 || "",
                        rightTitle: l.title || "",
                        rightPoint: l.des || "",
                        rightHref: l.url || "",
                        rightRd: l.userdata1 || "",
                        centerData: i
                    };
                    e.render(u, s);
                }).catch(function(t) {
                    e.setData({
                        hideModule: !0
                    }), e.triggerEvent("componentLoad", e.is);
                });
            }).catch(function(t) {
                e.setData({
                    hideModule: !0
                }), e.triggerEvent("componentLoad", e.is);
            });
        },
        renderWallet: function() {
            var t = this;
            l.checkTime(o.CATEGORY_BEGIN, o.CATEGORY_END) ? a.default.all([ this.getCpcData(10877, 28789), this.getCenterData(6242, 5), this.getWalletRightCpcData(10877, 28790, 28791) ]).then(function(e) {
                var r = e[0] || {}, n = e[1], i = e[2] || {};
                if (0 == Object.keys(r).length || 0 == Object.keys(n).length || 0 == Object.keys(i).length) return a.default.reject();
                var l = {
                    bgImg: t.walletPromoteBg || "",
                    leftTitle: r.title || "",
                    leftPoint: r.des || "",
                    leftHref: r.url || "",
                    leftRd: r.userdata2 || "",
                    rightTitle: i.title || "",
                    rightPoint: i.des || "",
                    rightHref: i.url || "",
                    rightRd: i.userdata2 || "",
                    centerData: n
                };
                t.render(l, c);
            }).catch(function(e) {
                t.setData({
                    hideModule: !0
                }), t.triggerEvent("componentLoad", t.is);
            }) : this.setData({
                hideModule: !0
            }, function() {
                t.triggerEvent("componentLoad", t.is);
            });
        },
        getPPMSData: function() {
            var t = this;
            return new a.default(function(e, r) {
                t.getPPMSDataResolve = e;
            });
        },
        getWalletRightCpcData: function(t, e, r) {
            var n = this;
            return this.getPPMSData().then(function(i) {
                var a = i && i.plBanner || [], l = n.getConfig(a);
                return l ? (n.walletPromoteBg = l.bg, n.getRightCpcData(l.rightBannerVk, t, e, r)) : {};
            });
        },
        getConfig: function(t) {
            if (!t && !t.length) return null;
            var e = null;
            return t.some(function(t) {
                if (l.checkTime(t.begin, t.end)) return e = t, !0;
            }), e;
        },
        getCenterData: function(t, e) {
            var n = this, i = [];
            return u.getEntryIconData([ t ], r({}, t, e)).then(function(t) {
                var e = t && t[0] && t[0].list || [];
                return i = e.map(function(t) {
                    return t.title = t.content && t.content.split("|")[0], {
                        image: n.utils.getImg(t.imgurl, 130),
                        content: t.title || "",
                        url: t.clickurl || ""
                    };
                }), i = i.filter(function(t) {
                    return t.content && t.image;
                });
            }).catch(function(t) {
                return i;
            });
        },
        getRightCpcData: function(t, e, r, n) {
            return l.greyScale(t) ? this.getCpcData(e, n) : this.getCpcData(e, r);
        },
        getCpcData: function(t, e) {
            var r = this, n = [];
            return u.getCpcData([ t ], [ e ], {}, Date.now()).then(function(i) {
                var a = i && i[t] && i[t][e] || [];
                return n = a.map(function(t) {
                    return {
                        title: t.materialname || "",
                        image: r.utils.getImg(t.material, 140),
                        des: t.materialdesc || "",
                        url: t.sUrl,
                        userdata1: t.userdata1 || "",
                        userdata2: t.userdata2 || ""
                    };
                }), (n = n.filter(function(t) {
                    return t.title && t.image && t.des && t.url;
                }))[0];
            }).catch(function(t) {
                return n;
            });
        },
        render: function(t, e) {
            var r = this, n = this.utils.getImg(t.bgImg, 750, 272), i = this.parseDataItem(t.leftTitle, t.leftPoint, t.leftHref, t.leftRd), u = this.parseDataItem(t.rightTitle, t.rightPoint, t.rightHref, t.rightRd);
            if (0 == t.centerData.length) return a.default.reject();
            var o = t.centerData.map(function(t) {
                return r.parseDataItem(t.content, t.image, t.url, e.CENTER_RD);
            });
            o = o.filter(function(t) {
                return t.title && t.point && t.url;
            }), this.setData({
                hideModule: !1,
                bgImg: n,
                leftEntry: i,
                rightEntry: u,
                centerEntry: o
            }, function() {
                r.triggerEvent("componentLoad", r.is);
            }), l.exposureUrlPtag(i.url), l.exposureUrlPtag(u.url), l.exposureUrlPtag(o[0].url), 
            this.hashExposure = {
                0: !0
            };
        },
        parseDataItem: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "", n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
            return {
                title: t,
                point: e,
                url: l.addPtag(r, n)
            };
        },
        onSwiperChange: function(t) {
            var e = this, r = t.detail.current;
            this.setData({
                swiperIdx: r
            }, function() {
                e.hashExposure[r] || (e.hashExposure[r] = !0, l.exposureUrlPtag(e.data.centerEntry[r].url));
            });
        },
        gotoUrl: function(t) {
            var e = t.currentTarget.dataset.url, r = void 0 === e ? "" : e;
            if ("swiper" == r) {
                var n = this.data.centerEntry[this.data.swiperIdx];
                n.url && this.$goto("/pages/h5/index", {
                    url: n.url
                });
            } else r && this.$goto("/pages/h5/index", {
                url: r
            });
        }
    }
});