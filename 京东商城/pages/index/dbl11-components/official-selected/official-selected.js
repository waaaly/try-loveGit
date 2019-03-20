function t(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
    return e.default = t, e;
}

function e(t) {
    if (Array.isArray(t)) {
        for (var e = 0, r = Array(t.length); e < t.length; e++) r[e] = t[e];
        return r;
    }
    return Array.from(t);
}

var r = require("../../../../bases/component.js"), n = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../libs/promise.min.js")), i = t(require("../../model.js")), a = t(require("../../utils.js")), l = require("../constant");

new r.JDComponent({
    data: {
        config: {},
        entries1: [],
        entries2: [],
        entries3: [],
        entries3Hide: !0,
        class: [],
        showTab: "1",
        hidenTc: !0,
        hideList1: !1,
        hidenTcStyle: "left: 240rpx"
    },
    created: function() {
        this.init = this.init.bind(this), getApp().event.on("index_mall_init", this.init);
    },
    detached: function() {
        getApp().event.off("index_mall_init", this.init);
    },
    methods: {
        init: function(t) {
            var r = this;
            n.default.resolve(t).then(function(t) {
                if (!a.checkTime(l.CATEGORY_BEGIN, l.CATEGORY_END)) return n.default.reject();
                var i = t && t.dbl11 && t.dbl11.ppms && t.dbl11.ppms.plProIdSet || [];
                if (!i || !i.length) return n.default.reject();
                var s = null;
                if (i.some(function(t) {
                    if (a.checkTime(t.begin, t.end)) return s = t, !0;
                }), !s) return n.default.reject();
                var u = s.plProid || "", o = s.syProid || "", g = s.plSpace || "";
                return n.default.all([ r.getConfig(t), r.getEntryData(u, 4, g), r.getEntryData(o, 6), r.getCpcData(10787, 28801), r.getCpcData(10854, 28733), r.getCpcData(10854, 28734), r.getCpcData(10984, 29132), r.getCpcData(10984, 29133) ]).then(function(t) {
                    if (!t) return n.default.reject();
                    var i = t[0], l = t[1], s = t[2], u = t[3], o = t[4], c = t[5], d = t[6], f = t[7];
                    if (!i) return n.default.reject();
                    var h = s.concat(o, c);
                    h.splice(8);
                    var p = function() {
                        var t;
                        u && (t = l).splice.apply(t, [ 3, 0 ].concat(e(u))), l.splice(4), l.forEach(function(t) {
                            a.exposureUrlPtag(t.url);
                        });
                    };
                    l && l.length ? (p(), r.setData({
                        entries1: l
                    })) : r.getEntryData(413, 4, g).then(function(t) {
                        (l = t).length > 0 && (p(), r.setData({
                            entries1: l
                        }));
                    }).catch(function(t) {
                        r.setData({
                            entries1: l
                        });
                    });
                    var m = !0, v = [];
                    if (d && d.length) {
                        var x = d[0];
                        x.url = a.addPtag(x.url, "138067.63.74"), x.image = r.utils.getImg(x.image, 48), 
                        x.url && x.image && v.push(x);
                    }
                    if (f && f.length) {
                        var T = f[0];
                        T.url = a.addPtag(T.url, "138067.63.75"), T.image = r.utils.getImg(T.image, 48), 
                        T.url && T.image && v.push(T);
                    }
                    return v.length >= 2 && (m = !1, v.forEach(function(t) {
                        a.exposureUrlPtag(t.url);
                    })), r.setData({
                        config: i,
                        entries2: h,
                        entries3: v,
                        entries3Hide: m
                    }, function() {
                        r.autoSlide(h), r.triggerEvent("componentLoad", r.is);
                    }), h.forEach(function(t) {
                        a.exposureUrlPtag(t.url);
                    }), i.leftText && i.leftUrl && a.exposureUrlPtag(i.leftUrl), i.rightText && i.rightUrl && a.exposureUrlPtag(i.rightUrl), 
                    a.exposureUrlPtag("138067.63.3", !0), a.exposureUrlPtag("138067.66.1", !0), i;
                }).catch(function(t) {
                    r.setData({
                        entries1: [],
                        entries2: [],
                        entries3: [],
                        entries3Hide: !0
                    }), r.triggerEvent("componentLoad", r.is);
                });
            }).then(function(t) {
                var e = t.gwqConfig, i = [ e.shareid1, e.shareid2, e.shareid3, e.shareid4 ], l = {};
                l[e.shareid1] = e.txt1, l[e.shareid2] = e.txt2, l[e.shareid3] = e.txt3, l[e.shareid4] = e.txt4, 
                n.default.all([ r.getPingouGoods(), r.getCpcData(10987, 29136), r.getGwqGoods(i) ]).then(function(t) {
                    r.tcExposure = !1;
                    var e = t[0], i = t[1], s = t[2], u = {
                        pg: "",
                        sns: "",
                        gwq: ""
                    };
                    if (e && e.length && (u.pg = e.map(function(t) {
                        return {
                            dwChPrice: t.dwRealTimePrice,
                            dwPCPrice: t.dwRefPrice,
                            url: a.addPtag(t.sUrl, "138067.66.2"),
                            img: r.utils.getImg(t.sPicturesUrl, 140, 140) || ""
                        };
                    })), i && i.length && (u.sns = {
                        des: i[0].des,
                        image: r.utils.getImg(i[0].image, 330, 422),
                        url: a.addPtag(i[0].url, "138067.66.3")
                    }), s && s.length && (u.gwq = s.map(function(t) {
                        var e = t.sharepicurl.split(",")[0] || "";
                        return {
                            desc: l[t.shareid],
                            shareid: t.shareid,
                            url: " https://wqs.jd.com/xcxgwq/detail.html?shareid=" + t.shareid + "&ptag=138067.66.4",
                            img: a.clipImg(r.utils.getImg(e, 150), 150, 150) || ""
                        };
                    })), !u.pg || !u.sns || !u.gwq) return n.default.reject();
                    r.setData({
                        tcLabConfig: u,
                        hidenTc: !0
                    });
                }).catch(function(t) {
                    r.setData({
                        hidenTc: !1,
                        showTab: "1"
                    });
                });
            }).catch(function(t) {
                r.setData({
                    entries1: [],
                    entries2: [],
                    entries3: [],
                    entries3Hide: !0
                }), r.triggerEvent("componentLoad", r.is);
            });
        },
        autoSlide: function(t) {
            var e = this;
            if (t && t.length && !(t.length < 2)) {
                var r = t.map(function(t) {
                    return 0;
                }), n = r.length, i = 0, a = function() {
                    r[i] = 1, 0 == i ? r[n - 1] = 0 : r[i - 1] = 0, ++i > n - 1 && (i = 0), e.setData({
                        class: r
                    });
                };
                a(), clearInterval(this.t), this.t = setInterval(function() {
                    a();
                }, 5e3);
            }
        },
        getConfig: function(t) {
            var e = null, r = t && t.dbl11 && t.dbl11.ppms && t.dbl11.ppms.plEvent || [], n = t && t.dbl11 && t.dbl11.ppms && t.dbl11.ppms.shareConfig || [];
            if (!(r || r.length || n || n.length)) return e;
            var i = null;
            r.some(function(t) {
                if (a.checkTime(t.begin, t.end)) return i = t, !0;
            });
            var l = null;
            return n.some(function(t) {
                if (a.checkTime(t.begin, t.end)) return l = t, !0;
            }), i && l ? e = {
                bg: i.bg ? "background-image: url(" + this.utils.getImg(i.bg) + ");" : "",
                tab1: i.centerText1 || "",
                tab2: i.centerText2 || "",
                gwqTitle: i.gwqFloorTitle || "",
                mfTitle: i.mfFloorTitle || "",
                pgTitle: i.pgFloorTitle || "",
                title: i.centerText || "",
                titleColor: i.centerColor ? "color: " + i.centerColor + ";" : "",
                leftText: i.leftText || "",
                leftUrl: i.leftHref ? a.addPtag(i.leftHref, "138067.63.1") : "",
                rightText: "全部会场",
                rightUrl: "https://wqs.jd.com/portal/promote_navigation/index.shtml?ptag=138067.63.4",
                gwqConfig: l
            } : e;
        },
        getEntryData: function(t, e, r) {
            var l = this, s = [];
            return t ? i.getEntryData(t, e, {
                interval: r,
                pretime: Date.now()
            }).then(function(t) {
                return t && t.length ? (s = t.map(function(t) {
                    var e = t.list && t.list[0] || {}, r = t.ext1 || "";
                    return {
                        title: t.martname || "",
                        image: l.utils.getImg(e.img, 140),
                        des: e.content || "",
                        url: e.url ? a.addPtag(e.url, r) : ""
                    };
                }), s = s.filter(function(t) {
                    return t.title && t.image && t.des && t.url;
                })) : n.default.reject();
            }).catch(function(t) {
                return s;
            }) : s;
        },
        getCpcData: function(t, e) {
            var r = this, n = [];
            return i.getCpcData([ t ], [ e ], {}, Date.now()).then(function(i) {
                var l = i && i[t] && i[t][e] || [];
                return n = l.map(function(t) {
                    var e = t.promotion || "";
                    return {
                        title: t.materialname || "",
                        image: r.utils.getImg(t.material, 140),
                        des: t.materialdesc || "",
                        url: t.sUrl ? a.addPtag(t.sUrl, e) : ""
                    };
                }), n = n.filter(function(t) {
                    return t.title && t.image && t.des && t.url;
                });
            }).catch(function(t) {
                return n;
            });
        },
        getPingouGoods: function() {
            return i.getPingouList("08164599", 4);
        },
        getGwqGoods: function(t) {
            return i.getActiveFeeds(t);
        },
        gotoUrl: function(t) {
            var e = t.currentTarget.dataset, r = e.url, n = e.pg;
            (void 0 === n ? "" : n) ? this.$goto(r) : this.$goto("/pages/h5/index", {
                url: r
            });
        },
        changeTab: function(t) {
            var e = t.currentTarget.dataset.id;
            "2" != e || this.tcExposure || (a.exposureUrlPtag("138067.66.2", !0), a.exposureUrlPtag("138067.66.3", !0), 
            a.exposureUrlPtag("138067.66.4", !0), this.tcExposure = !0), "1" == e ? a.report("138067.63.3") : a.report("138067.66.1"), 
            this.setData({
                showTab: e
            });
        }
    }
});