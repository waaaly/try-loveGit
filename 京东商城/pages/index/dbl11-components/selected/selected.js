function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}

function t(e) {
    if (Array.isArray(e)) {
        for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
        return r;
    }
    return Array.from(e);
}

var r = require("../../../../bases/component.js"), n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../libs/promise.min.js")), i = e(require("../../model.js")), a = e(require("../../utils.js")), o = require("../constant");

new r.JDComponent({
    properties: {
        scrollTop: {
            type: Number,
            value: 0,
            observer: function(e, t) {
                this.setData({
                    autoplay: e > 300 ? 1 : 0
                });
            }
        }
    },
    data: {
        entries: [],
        swiperIdx: 0,
        isnew: !1,
        hideModule: !0,
        autoplay: 0
    },
    created: function() {
        this.init = this.init.bind(this), getApp().event.on("index_mall_init", this.init);
    },
    detached: function() {
        getApp().event.off("index_mall_init", this.init);
    },
    methods: {
        init: function(e) {
            var r = this;
            n.default.resolve(e).then(function(e) {
                if (!a.checkTime(o.PREHEAT_BEGIN, o.PREHEAT_END)) return r.triggerEvent("componentLoad", r.is), 
                void r.setData({
                    hideModule: !0
                });
                var i = e && e.global || {}, l = i && i.freshmenData && 0 == i.freshmenData.ret && 1 == i.freshmenData.isnew, u = (e && e.dbl11 || {}).ppms;
                n.default.all([ r.getSelectedData(), r.getPingouData(), r.getConfig(u) ]).then(function(e) {
                    if (!e) return n.default.reject();
                    var i = e[0], o = e[1], u = e[2];
                    if (!i || !i.length || !u) return n.default.reject();
                    o && i.splice.apply(i, [ 3, 0 ].concat(t(o))), i.splice(12);
                    for (var g = [], s = 0; s < i.length; s += 4) g.push(i.slice(s, s + 4));
                    i.forEach(function(e) {
                        a.exposureUrlPtag(e.url);
                    }), l && u.newUserHref && a.exposureUrlPtag(u.newUserHref), !l && u.rightEnter && a.exposureUrlPtag(u.rightEnter), 
                    u.leftEnter && a.exposureUrlPtag(u.leftEnter), u.mainEventHref && a.exposureUrlPtag(u.mainEventHref), 
                    r.setData({
                        config: u,
                        entries: g,
                        isnew: l,
                        hideModule: !1
                    }, function() {
                        return r.triggerEvent("componentLoad", r.is);
                    });
                }).catch(function(e) {
                    r.setData({
                        hideModule: !0
                    }), r.triggerEvent("componentLoad", r.is);
                });
            }).catch(function(e) {
                r.setData({
                    hideModule: !0
                }), r.triggerEvent("componentLoad", r.is);
            });
        },
        getConfig: function(e) {
            var t = null, r = e && e.event11Main || [];
            if (!r && !r.length) return t;
            var n = null;
            return r.some(function(e) {
                if (a.checkTime(e.begin, e.end)) return n = e, !0;
            }), n ? t = {
                bg: n.bg ? "background-image: url(" + this.utils.getImg(n.bg) + ")" : "",
                leftText: n.leftText || "",
                leftEnter: n.leftWaEnter ? this.addPtag(n.leftWaEnter, "138067.63.1") : "",
                leftColor: n.leftColor1 && n.leftColor2 ? "background-image: linear-gradient(to right, " + n.leftColor1 + ", " + n.leftColor2 + ")" : "",
                rightText: n.rightText || "",
                rightEnter: n.rightEnter ? this.addPtag(n.rightEnter, "138067.63.2") : "",
                rightColor: n.rightColor1 && n.rightColor2 ? "background-image: linear-gradient(to right, " + n.rightColor1 + ", " + n.rightColor2 + ")" : "",
                newUserBg: this.utils.getImg(n.newUserBg),
                newUserHref: n.newUserHref ? this.addPtag(n.newUserHref, "138067.63.3") : "",
                centerText: n.centerText || "",
                centerColor: n.centerColor ? "color: " + n.centerColor : "",
                itemBg: n.itemColor ? "background-color: " + n.itemColor : "",
                itemColor: n.itemColor ? "color: " + n.itemColor : "",
                mainText: n.mainText || "",
                mainEventHref: n.mainEventHref ? this.addPtag(n.mainEventHref, "138067.63.4") : "",
                mainColor: n.mainColor1 && n.mainColor2 ? "background-image: linear-gradient(to right, " + n.mainColor1 + ", " + n.mainColor2 + ")" : ""
            } : t;
        },
        getSelectedData: function() {
            var e = this, t = [];
            return i.getEntryData(384, 12, {
                interval: 5
            }).then(function(r) {
                if (r && r.length) return t = r.map(function(t) {
                    var r = t.list && t.list[0] || {}, n = t.ext1 || "";
                    return {
                        title: t.martname || "",
                        image: e.utils.getImg(r.img, 140),
                        des: r.content || "",
                        url: r.url ? e.addPtag(r.url, n) : ""
                    };
                }), t = t.filter(function(e) {
                    return e.title && e.image && e.des && e.url;
                });
            }).catch(function(e) {
                return t;
            });
        },
        getPingouData: function() {
            var e = this, t = [];
            return i.getCpcData([ 10787 ], [ 28575 ], {}, Date.now()).then(function(r) {
                var n = r && r[10787] && r[10787][28575] || [];
                return t = n.map(function(t) {
                    var r = t.promotion || "";
                    return {
                        title: t.materialname || "",
                        image: e.utils.getImg(t.material, 128),
                        des: t.materialdesc || "",
                        url: t.sUrl ? e.addPtag(t.sUrl, r) : ""
                    };
                }), t = t.filter(function(e) {
                    return e.title && e.image && e.des && e.url;
                });
            }).catch(function(e) {
                return t;
            });
        },
        onSwiperChange: function(e) {
            this.setData({
                swiperIdx: e.detail.current
            });
        },
        addPtag: function(e, t) {
            if (!e || !t) return e;
            if (e.match(/\?\w+/)) {
                var r = this.utils.getUrlParam("ptag", String(e));
                e = r ? e.replace(r, t) : e + "&ptag=" + t;
            } else e = e + "?ptag=" + t;
            return e;
        },
        gotoUrl: function(e) {
            var t = e.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: t
            });
        }
    }
});