function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = require("../../../../bases/component.js"), r = t(require("../../../../libs/promise.min.js")), a = t(require("../common-behavior.js")), n = require("../../../../common/cookie-v2/cookie"), i = require("../../model.js"), o = require("../../../../common/utils.js"), c = require("../../utils.js");

new e.JDComponent({
    behaviors: [ a.default ],
    properties: {
        config: {
            type: Object,
            observer: function(t) {
                this.init(t);
            }
        }
    },
    data: {
        entries: [],
        hideModule: !0
    },
    methods: {
        init: function() {
            var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = e.recommendTitle || "", n = e.recommendDes || "", i = e.reviewsTitle || "", o = e.reviewsDes || "", c = e.reviewsUrl || "";
            r.default.all([ this.getEntryData(), this.getCsortData(), this.getRecommendData(a, n), this.getReviewsData(i, o, c), this.getWelfareData() ]).then(function(e) {
                var a = e[0].entries, n = e[1].data, i = e[2].data, o = e[3].data, c = e[4].data;
                if (a.splice(2, 0, n, i), a.splice(5, 0, o, c), !(a = a.filter(function(t) {
                    return t.title && t.cover && t.cover.length;
                })) || !a.length) return r.default.reject("no entries data");
                t.setData({
                    entries: a,
                    hideModule: !1
                }, function() {
                    t.triggerEvent("showModule");
                });
            }).catch(function(e) {
                console.log("quality catch", e), t.setData({
                    hideModule: !0
                });
            });
        },
        getEntryData: function() {
            var t = [];
            return (0, i.getEntryData)(474, 3).then(function(e) {
                if (!e || !e.length) return r.default.reject("no getEntryData data");
                var a = [ {
                    id: "10620",
                    rd: "138067.43.4"
                }, {
                    id: "10621",
                    rd: "138067.43.5"
                }, {
                    id: "10622",
                    rd: "138067.43.8"
                } ];
                return t = e.map(function(t) {
                    var e = t.list && t.list[0] || {}, r = [], n = "";
                    return a.some(function(e) {
                        if (t.id == e.id) return n = e.rd, !0;
                    }), "10620" == t.id && t.list ? t.list.forEach(function(t) {
                        r.push({
                            img: t.img && (0, o.getImg)(t.img, 148) || "",
                            url: t.url && (0, c.addPtag)(t.url, n) || ""
                        });
                    }) : r.push({
                        img: e.img && (0, o.getImg)(e.img, 148) || "",
                        url: e.url && (0, c.addPtag)(e.url, n) || ""
                    }), {
                        id: t.id || "",
                        title: t.martname || "",
                        des: e.content || "",
                        cover: r
                    };
                }), {
                    entries: t
                };
            }).catch(function(e) {
                return console.log("quality catch", e), {
                    entries: t
                };
            });
        },
        getCsortData: function() {
            var t = {};
            return (0, i.getCsortData)(178, 1).then(function(e) {
                if (!e || !e.length) return r.default.reject("no getCsortData data");
                var a = e && e[0] && e[0].c2[0].c3[0].c3item || "", c = (0, n.getCookie)("wq_addr") || "_|19_1601|广东", u = (c = c.split("|") || [])[2].split("_")[0] || "", l = c[1].split("_")[0] || "", s = c[1].split("_")[1] || "";
                return a && l && s ? (0, i.getRankInfoData)(a, l, s).then(function(e) {
                    var a = e && e.rankInfo && e.rankInfo[0] || {};
                    return a ? (t = {
                        id: "3",
                        title: "排行榜",
                        des: u + "热卖榜",
                        cover: [ {
                            img: a.imgPath && (0, o.getImg)(a.imgPath, 148) || "",
                            url: "https://wqs.jd.com/portal/wx/jdrank_v2/hot.shtml?area=" + l + "_" + s + "_" + encodeURIComponent(u) + "&ptag=138067.43.6"
                        } ]
                    }, {
                        data: t
                    }) : r.default.reject("no rankData data");
                }).catch(function(e) {
                    return console.log("quality catch", e), {
                        data: t
                    };
                }) : r.default.reject("no cateId or provinceId or cityId data");
            }).catch(function(e) {
                return console.log("quality catch", e), {
                    data: t
                };
            });
        },
        getRecommendData: function(t, e) {
            var r = [];
            return (0, i.getRecommendList)().then(function(a) {
                var n = a || {}, i = n.skuinfo && n.skuinfo.skupicurl || "", c = n.shareid || "", u = n.pps || "";
                return r = {
                    id: "4",
                    title: t,
                    des: e,
                    cover: [ {
                        img: (0, o.getImg)(i, 148),
                        url: "https://wqs.jd.com/haohuo/index.shtml?shareid=" + c + "&pps=" + u + "&ptag=138067.43.7"
                    } ]
                }, {
                    data: r
                };
            }).catch(function(t) {
                return console.log("quality catch", t), {
                    data: r
                };
            });
        },
        getReviewsData: function(t, e, a) {
            var n = {};
            return (0, i.getRecommendFeedList)(1104, 1).then(function(c) {
                if (!c || !c.length) return r.default.reject("no getRecommendFeedList data");
                var u = c[0].skuid || "", l = c[0].shareid || "", s = c[0].pps || "";
                return (0, i.getSkuInfo)([ u ]).then(function(i) {
                    if (!i || !i[u]) return r.default.reject("no getSkuInfo data");
                    var c = i[u].imagePath && (0, o.getImg)(i[u].imagePath, 148) || "";
                    return n = {
                        id: "6",
                        title: t,
                        des: e,
                        cover: [ {
                            img: c,
                            url: a + "?shareid=" + l + "&pps=" + s + "&ptag=138067.43.9"
                        } ]
                    }, {
                        data: n
                    };
                });
            }).catch(function(t) {
                return console.log("quality catch", t), {
                    data: n
                };
            });
        },
        getWelfareData: function() {
            var t = {};
            return (0, i.getWelfare)().then(function(e) {
                if (!e || !e.active_list || !e.active_list.length) return r.default.reject("getWelfare error");
                var a = e.participation, n = e.active_list[0], i = "";
                if (a && a >= 1e4) {
                    var c = Math.floor(a / 1e4);
                    i = c < 1e3 ? c + "万" : c >= 1e3 && c < 1e4 ? Math.floor(c / 1e3) + "千万" : Math.floor(c / 1e4) + "亿";
                } else i = Math.floor(51 * Math.random() + 30) + "万";
                return t = {
                    id: "7",
                    title: "免费领",
                    des: i + "人玩",
                    cover: [ {
                        img: n.prize_pic_url && (0, o.getImg)(n.prize_pic_url) || "",
                        url: "https://wqs.jd.com/social_cube_centralization/index.html?ptag=138067.43.10"
                    } ]
                }, {
                    data: t
                };
            }).catch(function(e) {
                return console.log("quality catch", e), {
                    data: t
                };
            });
        },
        gotoUrl: function(t) {
            var e = t.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: e
            });
        }
    }
});