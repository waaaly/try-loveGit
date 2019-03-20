function e(e, n, t) {
    return n in e ? Object.defineProperty(e, n, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[n] = t, e;
}

function n(e) {
    if (isNaN(e)) return "";
    var n = "";
    return e <= 1e5 && e > 0 ? n = e + "人已领取" : e > 1e5 && (n = Math.floor(e / 1e3) / 10 + "万人已领取"), 
    n;
}

var t = require("../../../../bases/component.js"), i = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../libs/promise.min.js")), a = require("../../model.js"), o = require("../../../../common/utils.js"), r = require("../../utils.js");

new t.JDComponent({
    properties: {
        showTime: {
            type: Number,
            observer: function() {
                var e = this;
                this.signing && (this.signing = !1, (0, a.getPingouSignStat)().then(function(n) {
                    return e.sign(n);
                }).catch(function(e) {
                    return console.log(e);
                }));
            }
        }
    },
    data: {
        goods: [],
        appid: "wxca1fe42a16552094",
        path: "/pages/pingou/index/index",
        h5Path: "/pages/h5/index?url=//wqs.jd.com/portal/wx/tuan/pingouv3.shtml",
        hideSign: !1,
        hidePingouBody: !1,
        hideNinePointNine: !1,
        hideYiYuanPin: !1,
        hideKan: !1,
        hideModule: !1,
        sign: {
            hideQiandao: !0
        },
        yiYuanIdx: 0
    },
    created: function() {
        this.init = this.init.bind(this), getApp().event.on("index_mall_init", this.init);
    },
    attached: function() {
        this.firstLoad = !0;
    },
    detached: function() {
        getApp().event.off("index_mall_init", this.init);
    },
    methods: {
        init: function(e) {
            var n = this;
            i.default.resolve(e).then(function(e) {
                var t = e.global, a = e.pingou;
                return n.g = t, a ? (n.sign(a.signStat, t), i.default.all([ n.pingouGoods(a.pingouGoods), n.ninePointNine(a.ninePointNine, t), n.yiYuanPin(a.yiYuanPin, t), n.kan(a.prizeDetail, a.avatars, t) ])) : i.default.reject();
            }).then(function() {
                return n.triggerEvent("componentLoad", n.is);
            }).catch(function(e) {
                n.setData({
                    hideModule: !0
                }), n.triggerEvent("componentLoad", n.is);
            });
        },
        sign: function(e) {
            var t = this, o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.g;
            return i.default.resolve(e).then(function(e) {
                if (!e || 0 != e.iRet && 13 != e.iRet) return i.default.reject();
                if (13 == e.iRet) return (0, a.getPingouSignStat)().then(function(e) {
                    return t.sign(e);
                });
                if (!(o && o.globalPPMS && o.globalPPMS[34242] && "0" == o.globalPPMS[34242][0].qianDaoConfig[0].showQianDao)) {
                    var r = e.haveGetCount, u = e.signSuccTotal, s = 4 - r, d = "", c = "", g = !1;
                    if (s > 0 && s < 4) d = "还可领" + s + "个红包", c = n(u); else if (4 == s) d = "今日红包还未领", 
                    c = n(u); else {
                        if (!(s <= 0)) return i.default.reject();
                        s = 0, d = "已领满4个红包", c = n(u), g = !0;
                    }
                    t.setData({
                        sign: {
                            count: s,
                            desc: d,
                            text: c,
                            empty: g,
                            hideQiandao: !1
                        }
                    });
                }
            }).catch(function(e) {
                o && o.globalPPMS && o.globalPPMS[34242] && "0" == o.globalPPMS[34242][0].qianDaoConfig[0].showQianDao || t.setData({
                    sign: {
                        count: 0,
                        desc: "每日签到领红包",
                        text: "",
                        empty: !1,
                        hideQiandao: !1
                    }
                });
            });
        },
        pingouGoods: function(e) {
            var n = this;
            return i.default.resolve(e).then(function(e) {
                if (!(e && "0" == e.errcode && e.data && e.data[0] && e.data[0].list && e.data[0].list.length)) return i.default.reject("get pingou goods error");
                var t = e.data[0].list;
                if (t = t.map(function(e) {
                    return {
                        sSkuId: e.ddwSkuId,
                        dwChPrice: e.dwRealTimePrice,
                        dwPCPrice: e.dwRefPrice,
                        image: (0, o.getImg)(e.sPicturesUrl, 148),
                        showImage: !n.firstLoad,
                        path: n.data.path + "?todaytopsku=" + e.ddwSkuId + "&pps=" + e.pps,
                        h5Path: "/pages/h5/index?url=https://wqs.jd.com/portal/wx/tuan/pingouv3.shtml&todaytopsku=" + e.ddwSkuId + "&pps=" + e.pps
                    };
                }), e.__subData && e.__subData[0] && 0 == e.__subData[0].iRet && e.__subData[0].pingou_info && e.__subData[0].pingou_info.length) {
                    var a = e.__subData[0].pingou_info, r = new Map();
                    a.forEach(function(e) {
                        return r.set(e.sku_id, e.tuan_member_count);
                    }), t.forEach(function(e) {
                        return e.count = r.get(e.sSkuId);
                    });
                }
                n.firstLoad = !1, n.setData({
                    goods: t,
                    hidePingouBody: !1
                });
            }).catch(function(e) {
                n.setData({
                    hidePingouBody: !0
                });
            });
        },
        ninePointNine: function(e) {
            var n = this, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.g;
            return i.default.resolve(e).then(function(e) {
                if (!(e && "0" == e.errcode && e.data && e.data[0] && e.data[0].list && e.data[0].list.length)) return i.default.reject("get 9.9 goods error");
                var a = e.data[0].list;
                if (a = a.map(function(e) {
                    return {
                        sSkuId: e.ddwSkuId,
                        dwChPrice: e.dwRealTimePrice,
                        dwPCPrice: e.dwRefPrice,
                        image: (0, o.getImg)(e.sPicturesUrl, 148),
                        path: "/pages/pingou_second/tuan99v2/tuan99v2?topskuid=" + e.ddwSkuId + "&pps=" + e.pps,
                        url: "/pages/h5/index?url=https://wqs.jd.com/pingou/tuan99v2.shtml&topskuid=" + e.ddwSkuId + "&pps=" + e.pps
                    };
                }), e.__subData && e.__subData[0] && 0 == e.__subData[0].iRet && e.__subData[0].pingou_info && e.__subData[0].pingou_info.length) {
                    var u = e.__subData[0].pingou_info, s = new Map();
                    u.forEach(function(e) {
                        return s.set(e.sku_id, e.tuan_member_count);
                    }), a.forEach(function(e) {
                        return e.count = s.get(e.sSkuId);
                    });
                }
                var d = "", c = "";
                if (t && t.globalPPMS && t.globalPPMS[34242]) {
                    var g = (t.globalPPMS[34242][0] || {}).ninePointNine || [];
                    g || g.length || i.default.reject("no ninePointNine data");
                    var l = null;
                    g.some(function(e) {
                        if ((0, r.checkTime)(e.begin, e.end)) return l = e, !0;
                    }), l || i.default.reject("no ninePointNine_data data"), d = l.title || "", c = l.desc || "";
                }
                n.setData({
                    ninePointNine: a,
                    ninePointNineTitle: d,
                    ninePointNineDesc: c,
                    hideNinePointNine: !1
                });
            }).catch(function(e) {
                n.setData({
                    hideNinePointNine: !0
                });
            });
        },
        yiYuanPin: function(e) {
            var n = this, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.g;
            return i.default.resolve(e).then(function(e) {
                if (!(e && "0" == e.errcode && e.data && e.data[0] && e.data[0].list && e.data[0].list.length)) return i.default.reject("get pingou goods error");
                var a = "/pages/pingou_second/laoyaoxin/laoyaoxin", r = "138067.37.7", u = "17078.27.48", s = "https://wqs.jd.com/event/promote/laoyaoxin/index.shtml", d = !1;
                t && t.freshmenData && 0 == t.freshmenData.ret && 1 == t.freshmenData.isnew && (a = "/pages/pingou_second/yiyuanxinren/yiyuanxinren", 
                r = "138067.37.5", u = "17078.27.37", s = "https://wqs.jd.com/event/promote/xinyaoxin/index.shtml", 
                d = !0);
                var c = e.data[0].list, g = {
                    isFreshmen: d,
                    yiYuanPinGoods: c = c.map(function(e) {
                        var n = s + "?sku=" + e.ddwSkuId + "&pps=" + e.pps;
                        return {
                            sSkuId: e.ddwSkuId,
                            dwChPrice: e.dwRealTimePrice,
                            dwPCPrice: e.dwRefPrice,
                            image: (0, o.getImg)(e.sPicturesUrl, 148),
                            path: a + "?skuid=" + e.ddwSkuId + "&pps=" + e.pps + "&EA_PTAG=" + u,
                            url: "/pages/h5/index?encode_url=" + encodeURIComponent(n),
                            ptag: r
                        };
                    }),
                    hideYiYuanPin: !1
                }, l = !1;
                if (t && t.globalPPMS && t.globalPPMS[34242]) {
                    var h = t.globalPPMS[34242][0].oneEntryConfig[0];
                    if ("1" == h.showRecovery) {
                        l = !0;
                        var p = "https:" + h.recoveryUrl + "?EA_PTAG=17078.27.48";
                        c = [ {
                            image: (0, o.getImg)(h.recoveryImg, 148),
                            path: h.recoveryMiniPage ? h.recoveryMiniPage + "?EA_PTAG=17078.27.48" : "/pages/h5/index?encode_url=" + encodeURIComponent(p),
                            url: "/pages/h5/index?encode_url=" + encodeURIComponent(p),
                            ptag: h.recoveryPtag
                        } ], g.yiYuanPinGoods = c, g.isShowYiYuanPinRecovery = l, g.yiYuanRecoveryTitle = h.recoveryTitle, 
                        g.yiYuanRecoveryPrice = h.recoveryPrice;
                    }
                }
                n.setData(g);
            }).catch(function(e) {
                n.setData({
                    hideYiYuanPin: !0
                });
            });
        },
        kan: function(e, n) {
            var t = this, a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this.g;
            return i.default.resolve().then(function() {
                var i = "";
                e && 0 == e.retcode && e.result && e.result.length && e.result.some(function(e) {
                    if (0 == e.status && e.prizes && e.prizes[0] && e.prizes[0].PicUrl) return i = (0, 
                    o.getImg)(e.prizes[0].PicUrl), !0;
                });
                var u = [];
                if (n && 0 == n.ret && n.queue && n.queue.length) {
                    var s = n.queue, d = s.length;
                    if (d <= 2) u = s; else for (var c = 0; c < 2; c++) {
                        var g = Math.floor(Math.random() * d--);
                        u.push(s[g]), s.splice(g, 1);
                    }
                    u = u.map(function(e) {
                        return (0, o.getImg)(e);
                    });
                }
                var l = "https://wqs.jd.com/promote/201805/bargain_cen/index.shtml?id=1&EA_PTAG=17078.27.38", h = {
                    hideKan: !1,
                    kanImage: i,
                    kanPath: "/pages/h5/index?encode_url=" + encodeURIComponent(l),
                    kanUrl: "/pages/h5/index?encode_url=" + encodeURIComponent(l),
                    kanPtag: "138067.37.6"
                };
                if (u.length && (h.avatarsList = u), a && a.globalPPMS && a.globalPPMS[34242]) {
                    var p = null;
                    if ((a.globalPPMS[34242][0] || {}).kanEntryConfig.some(function(e) {
                        if ((0, r.checkTime)(e.begin, e.end)) return p = e, !0;
                    }), p && "1" == p.showRecovery) {
                        var f = "https:" + p.recoveryUrl + "?EA_PTAG=17078.27.38";
                        h = {
                            hideKan: !1,
                            kanImage: (0, o.getImg)(p.recoveryImg),
                            kanPath: p.recoveryMiniPage ? p.recoveryMiniPage + "?EA_PTAG=17078.27.38" : "/pages/h5/index?encode_url=" + encodeURIComponent(f),
                            kanUrl: "/pages/h5/index?encode_url=" + encodeURIComponent(f),
                            kanRecovery: !0,
                            kanRecoveryTitle: p.recoveryTitle,
                            kanRecoveryPrice: p.recoveryPrice,
                            kanPtag: p.recoveryPtag
                        };
                    }
                }
                t.setData(h);
            }).catch(function(e) {
                console.log(e), t.setData({
                    hideKan: !0
                });
            });
        },
        onImgLoad: function(n) {
            var t = n.currentTarget.dataset.index;
            if (!(t >= 5)) {
                var i = "goods[" + t + "].showImage";
                this.setData(e({}, i, !0));
            }
        },
        onYiYuanSwiperChange: function(e) {
            var n = e.detail.current;
            this.setData({
                yiYuanIdx: n
            });
        },
        tapOnNavigator: function(e) {
            var n = e.currentTarget.dataset.rd;
            n && (0, r.report)(n);
        },
        tapToSign: function(e) {
            var n = e.currentTarget.dataset.rd;
            n && (0, r.report)(n), this.signing = !0;
        }
    }
});