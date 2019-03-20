function e(e) {
    if (Array.isArray(e)) {
        for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
        return n;
    }
    return Array.from(e);
}

function t(e) {
    if (!e) return "";
    var t = e.split("?")[1], n = t ? (0, o.querystr)(t).query : {};
    return n.ptag || n.PTAG;
}

function n(e) {
    var t = e.globalPPMS, n = e.freshmenData, r = {
        themeConfig: {}
    };
    if (t[35490] && t[35490][0] && ((r = t[35490][0]).themeConfig = {}), t[31550]) {
        var i = t[31550];
        i.forEach(function(e) {
            e.beginTime = e.begin, e.endTime = e.end;
        }), r.themeConfig = c.getActiveConfig(i);
    }
    return {
        config: r,
        freshmenData: n
    };
}

var r = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
}, i = require("../../../../bases/component.js"), o = require("../../../../common/utils.js"), a = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../libs/promise.min.js")), s = require("../../../../api/Ptag/report_manager.js"), c = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t.default = e, t;
}(require("../../utils.js")), u = require("../../dbl11-components/constant"), l = /^(https?:)?\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;

new i.JDComponent({
    data: {
        swiperIdx: 0,
        entries: [],
        hideModule: !1
    },
    created: function() {
        this.init = this.init.bind(this), getApp().event.on("index_mall_init", this.init);
    },
    detached: function() {
        getApp().event.off("index_mall_init", this.init);
    },
    methods: {
        init: function(i) {
            var o = this;
            a.default.resolve(i).then(function(i) {
                if (!i.global || !i.channel) return a.default.reject();
                var l = n(i.global), g = l.config, f = l.freshmenData, d = void 0 === f ? {} : f, h = i.channel.floorSort;
                if (!g || !g.biEntry || !g.fixedEntry) return a.default.reject();
                var p = 0 == d.ret && 1 == d.isnew, v = o.processNormal(g.fixedEntry, p), m = o.processBI(g.biEntry, h, v.length), y = [].concat(e(m));
                v.length && v.forEach(function(e) {
                    return y.splice(e.index - 1, 0, e);
                });
                var E = g.themeConfig, x = "", b = {
                    bg: "",
                    textColor: "",
                    hideIcons: !1
                };
                E && (E.entrysBG || E.entrysBgImg || E.entrysColor) && (x = o.utils.getImg(E.entrysBgImg), 
                E.entrysBG && (b.hideIcons = !0, b.bg = o.utils.getImg(E.entrysBG)), b.textColor = E.entrysColor || "");
                var P = {
                    bg: "",
                    textColor: "",
                    hideIcons: !1
                };
                if (E && (E.secondEntrysBG || E.secondEntrysColor) && (E.secondEntrysBG && (P.hideIcons = !0, 
                P.bg = o.utils.getImg(E.secondEntrysBG)), P.textColor = E.secondEntrysColor || ""), 
                !y.length || y.length < 10) return a.default.reject();
                y.forEach(function(e) {
                    e.imgUrl = o.utils.getImg(e.imgUrl);
                    var t = c.getActiveConfig(e.corner, {
                        default: null
                    });
                    e.corner = t && t.content ? t.content : "", e.link = c.addPtag(e.link, e.ptag);
                    var n = e.vkJumpUrl, r = e.vk, i = e.vkWhitelist, a = e.vkPtag;
                    n && r && c.greyScale(r, i) && (e.link = c.addPtag(n, a));
                });
                var I = [ r({}, b, {
                    entries: y.slice(0, 10)
                }) ];
                o.secondPageExposure = !1, y.slice(10, 20).length && (I.push(r({}, P, {
                    entries: y.slice(10, 20)
                })), o.secondPagePtags = I[1].entries.map(function(e) {
                    var n = e.ptag, r = e.link;
                    if (n || r) return t(e.link) || e.ptag || "";
                }).filter(function(e) {
                    return !!e;
                }));
                var k = I[0].entries.map(function(e) {
                    var n = e.ptag, r = e.link;
                    if (n || r) return t(e.link) || e.ptag || "";
                }).filter(function(e) {
                    return !!e;
                });
                s.ReportManager.addPtagExposure("7593.1.1", {
                    ptag_list: k.join("_")
                });
                var C = !0, _ = !1;
                c.checkTime(u.SALE_BEGIN, u.SALE_END) && (C = !1, _ = !0), o.setData({
                    pages: I,
                    bg: x,
                    swiperCurrent: 0,
                    hideModule: !1,
                    showBorderRadius: C,
                    changeDot: _
                }, function() {
                    return o.triggerEvent("componentLoad", o.is);
                });
            }).catch(function(e) {
                o.setData({
                    hideModule: !0
                }), o.triggerEvent("componentLoad", o.is);
            });
        },
        processNormal: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments[1];
            return e.length ? e.filter(function(e) {
                return !!c.checkTime(e.begin, e.end) && (("" != e.link || "" != e.otherLink) && (!("" == e.index || e.index <= 0) && ("showAll" == e.showUser || ("oldUser" == e.showUser && !t || (!("newUser" != e.showUser || !t) || void 0)))));
            }).sort(function(e, t) {
                return e.index - t.index;
            }) : [];
        },
        processBI: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments[1], n = arguments[2];
            if (!e.length) return [];
            var r = e[0], i = r.iconArray, o = r.proid;
            if (!i.length) return [];
            if (!t || !t.length) {
                var a = [];
                return i.forEach(function(e) {
                    c.checkTime(e.begin, e.end) && a.push(e);
                }), a.splice(0, 20 - n);
            }
            var s = t.find(function(e) {
                return e.proid == o;
            }).floor, u = [];
            return (s = s.map(function(e) {
                return e.floorid;
            })).forEach(function(e) {
                var t = i.find(function(t) {
                    return c.checkTime(t.begin, t.end) && t.floorId == e;
                });
                t && u.push(t);
            }), u.splice(0, 20 - n);
        },
        onSwiperChange: function(e) {
            var t = e.detail.current;
            this.setData({
                swiperIdx: t
            }), 1 == t && (c.report("7593.3.1"), this.secondPageExposure || (s.ReportManager.addPtagExposure("7593.1.1", {
                ptag_list: this.secondPagePtags.join("_")
            }), this.secondPageExposure = !0));
        },
        tapOnItem: function(e) {
            var t = e.currentTarget.dataset, n = t.url, r = t.wxappPath, i = t.ptag, o = void 0 === i ? "" : i, a = t.appid;
            a && r ? (wx.navigateToMiniProgram({
                appId: a,
                path: r
            }), o && c.report(o)) : n && (l.test(n) ? this.$goto("/pages/h5/index", {
                url: n
            }) : this.$goto(n, {
                ptag: o
            }));
        }
    }
});