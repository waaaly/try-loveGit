function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = require("../../../../bases/component.js"), n = e(require("../../../../libs/promise.min.js")), r = e(require("../common-behavior.js")), i = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t.default = e, t;
}(require("../../utils.js")), s = require("../../../../api/Ptag/report_manager.js"), a = require("../../dbl11-components/constant"), o = 0, l = [ {
    type: 201,
    rd: "138067.32.5"
}, {
    type: 202,
    rd: "138067.32.4"
}, {
    type: 203,
    rd: "138067.32.1"
}, {
    type: 207,
    rd: "138067.32.3"
}, {
    type: 208,
    rd: "138067.32.8"
}, {
    type: 209,
    rd: "138067.32.9"
}, {
    type: 210,
    rd: "138067.32.10"
}, {
    type: 212,
    rd: "138067.32.11"
}, {
    type: 213,
    rd: "138067.32.25"
}, {
    type: 214,
    rd: "138067.32.26"
}, {
    type: 215,
    rd: "138067.32.28"
}, {
    type: 216,
    rd: "138067.32.29"
}, {
    type: 217,
    rd: "138067.32.30"
}, {
    type: 218,
    rd: ""
}, {
    type: 219,
    rd: "138067.32.35"
}, {
    type: 220,
    rd: "138067.32.36"
}, {
    type: 221,
    rd: "138067.32.37"
}, {
    type: 222,
    rd: "138067.32.38"
}, {
    type: 223,
    rd: "138067.32.40"
}, {
    type: 224,
    rd: "138067.32.41"
}, {
    type: 225,
    rd: "138067.32.42"
}, {
    type: 226,
    rd: "138067.32.43"
} ];

new t.JDComponent({
    behaviors: [ r.default ],
    data: {
        entries: [],
        classIndex: [],
        hideModule: !0,
        config: {}
    },
    created: function() {
        this.init = this.init.bind(this), getApp().event.on("index_mall_init", this.init);
    },
    detached: function() {
        getApp().event.off("index_mall_init", this.init);
    },
    methods: {
        init: function(e) {
            var t = this;
            n.default.resolve(e).then(function(e) {
                var r = e.global || {};
                if (r && r.freshmenData && 0 == r.freshmenData.ret && 1 == r.freshmenData.isnew) return n.default.reject();
                if (!e.news) return n.default.reject("no news data");
                var o = e.news, u = o.newsPPMS, d = o.newsMsgs;
                if (!d || "0" != d.iRet || !d.data) return n.default.reject("no newsMsgs data");
                var c = d.data || [], p = d.history || [], f = c.concat(p);
                if (!f || !f.length) return n.default.reject("no msgs data");
                var g = [];
                l.forEach(function(e) {
                    g.push(e.type);
                });
                var h = f.filter(function(e) {
                    return -1 != g.indexOf(Number(e.uType)) && e.content && e.content.msgInfo;
                });
                if (!h || !h.length) return n.default.reject("entries no data");
                if (h = h.map(function(e) {
                    var n = e.content.msgInfo[0] || {}, r = e.uType || "", i = n.title || "", s = e.strReserved || "", a = n.mainPicUrl ? t.utils.getImg(n.mainPicUrl.split(",")[0], 90) : "", o = n.skus ? t.utils.getImg(n.skus[0].mainPicUrl, 90) : "", l = n.skusName || "", d = e.content.shopInfo ? e.content.shopInfo.shopName : "", c = n.groupIcon ? t.utils.getImg(n.groupIcon, 80) : "", p = n.groupName ? "购物圈-" + n.groupName.replace("JD", "").replace("京东", "") : "", f = n.friendHeadUrl ? t.utils.getImg(n.friendHeadUrl.split(",")[0], 40) : "", g = n.friendNickName || "", h = e.ulMsgId || "", m = e.strPpsReport || "", y = e.strChannelMsgId || "", v = h && m ? "previewMsgId=" + h + "&previewMsgIdPps=" + m : "", I = "hitChannelMsgId=" + y, _ = "https://wqs.jd.com/my/toutiao.shtml?" + (v ? v + "&" + I : "" + I), w = "", M = "", j = !1;
                    if ("203" != r && "208" != r && "220" != r && "221" != r && "222" != r && "223" != r && "224" != r && "225" != r && "226" != r || (w = d, 
                    j = !0), "209" != r && "210" != r || (w = p, M = c), "212" != r && "214" != r && "215" != r && "216" != r && "217" != r || (w = g, 
                    M = f), "213" == r && (w = g, M = n.friendHeadUrl ? n.friendHeadUrl.split(",").map(function(e) {
                        return t.utils.getImg(e, 40);
                    }) : ""), "214" == r && (i = "" + g + n.desc || ""), "201" == r && (w = "穿搭学院"), 
                    "202" == r && (w = "家居杂志"), "207" == r && (w = "您的专属降价福利"), "203" == r && (i = l), 
                    "220" == r && (a = o), "218" == r && u.headline.forEach(function(r) {
                        n.businessType == r.businesstype && (s = r.cornor || "", i = r.desc.replace(/<[^>]+>/g, "") || "", 
                        w = r.reason || "", a = r.imgUrl ? t.utils.getImg(r.imgUrl, 180) : "", _ = r.jumpUrl + "&" + e.param || "");
                    }), "219" == r) {
                        var P = n.groupId;
                        w = "02963778" == P ? "为你推荐9.9元拼购好货" : "02921541" == P ? "为你推荐今日必拼好货" : "02963830" == P ? "为你推荐每日上新拼购好货" : "";
                    }
                    return {
                        type: r,
                        tag: s,
                        title: i,
                        text: w,
                        logo: M,
                        image: a,
                        url: _,
                        shop: j
                    };
                }), (h = h.filter(function(e) {
                    return e.image && e.title;
                })).splice(3), !h || !h.length) return n.default.reject("no entries data");
                var m = [];
                m = 1 == h.length ? [ "news-slider__item-1" ] : 2 == h.length ? [ "news-slider__item-1", "news-slider__item-2" ] : [ "news-slider__item-1", "news-slider__item-2", "news-slider__item-3" ];
                var y = [];
                h.forEach(function(e) {
                    l.forEach(function(t) {
                        e.type == t.type && "218" != e.type && (e.url = e.url + "&ptag=" + t.rd);
                    }), y.push(t.utils.getUrlParam("ptag", e.url));
                }), s.ReportManager.addPtagExposure("7593.1.1", {
                    ptag_list: y.join("_")
                }), t.setData({
                    entries: h,
                    classIndex: m,
                    hideModule: !1,
                    config: {}
                }, function() {
                    t.triggerEvent("componentLoad", t.is), t.autoplay();
                }), i.checkTime(a.SALE_BEGIN, a.SALE_END) && t.getSaleConfig(e);
            }).catch(function(e) {
                console.log("news catch", e), t.setData({
                    hideModule: !0
                }), t.triggerEvent("componentLoad", t.is);
            });
        },
        getSaleConfig: function(e) {
            var t = this, n = null;
            (e.news && e.news.newsPPMS && e.news.newsPPMS.saleConfig || []).some(function(e) {
                if (i.checkTime(e.begin, e.end)) return n = {
                    icon: t.utils.getImg(e.cornorimg, 60)
                }, !0;
            }), this.setData({
                config: n
            });
        },
        gotoUrl: function(e) {
            var t = e.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: t
            });
        },
        handletouchstart: function(e) {
            this.startX = e.touches[0].pageX, clearInterval(this.t);
        },
        handletouchend: function() {
            o = 0, this.autoplay();
        },
        handletouchmove: function(e) {
            if (0 === o) {
                var t = this.data.classIndex, n = e.touches[0].pageX, r = n - this.startX;
                r < 0 ? this.slideLeft(t) : r > 0 && this.slideRight(t), this.startX = n;
            }
        },
        autoplay: function() {
            var e = this, t = this.data.classIndex;
            clearInterval(this.t), this.t = setInterval(function() {
                e.slideLeft(t), o = 0;
            }, 3e3);
        },
        slideLeft: function(e) {
            o = 1;
            var t = e.pop();
            e.unshift(t), this.setData({
                classIndex: e
            });
        },
        slideRight: function(e) {
            o = -1;
            var t = e.shift();
            e.push(t), this.setData({
                classIndex: e
            });
        }
    }
});