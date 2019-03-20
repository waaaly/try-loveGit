function e(e) {
    if (Array.isArray(e)) {
        for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
        return r;
    }
    return Array.from(e);
}

var t = function() {
    function e(e, t) {
        var r = [], n = !0, i = !1, a = void 0;
        try {
            for (var o, u = e[Symbol.iterator](); !(n = (o = u.next()).done) && (r.push(o.value), 
            !t || r.length !== t); n = !0) ;
        } catch (e) {
            i = !0, a = e;
        } finally {
            try {
                !n && u.return && u.return();
            } finally {
                if (i) throw a;
            }
        }
        return r;
    }
    return function(t, r) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, r);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), r = require("../../../../bases/component.js"), n = require("../../../../common/img_loader/img_loader.js"), i = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../libs/promise.min.js")), a = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}(require("../../utils.js")), o = require("../../dbl11-components/constant");

new r.JDComponent({
    data: {
        swiperIdx: 0,
        entries: []
    },
    created: function() {
        this.init = this.init.bind(this), getApp().event.on("index_mall_init", this.init);
    },
    detached: function() {
        getApp().event.off("index_mall_init", this.init);
    },
    methods: {
        init: function(r) {
            var u = this;
            i.default.resolve(r).then(function(e) {
                if (!e.carousel) return i.default.reject();
                var t = e.carousel, r = e && e.dbl11 && e.dbl11.ppms && e.dbl11.ppms.themeSet || [];
                return a.checkTime(o.SALE_BEGIN, o.SALE_END) || (r = []), r.forEach(function(e) {
                    e.beginTime = e.begin, e.endTime = e.end;
                }), r = a.getActiveConfig(r) || {}, i.default.all([ u.getCpcData(t.cpc, r), u.getRocketData(t.rocket, r), i.default.resolve(t.fixed) ]);
            }).then(function(r) {
                var a = t(r, 3), o = a[0], l = a[1], s = a[2], c = [];
                if (o.length) {
                    var g = s ? 0 : Math.floor(Math.random() * o.length);
                    c.push(o[g]), o.splice(g, 1);
                }
                if (c = [].concat(e(c), e(o), e(l)), !(c = c.slice(0, 4)).length) return i.default.reject({
                    message: "Data error!"
                });
                u.setData({
                    entries: [ Object.assign({}, c[0], {
                        image: u.utils.getImg(c[0].image, 150)
                    }) ],
                    error: !1
                }, function() {
                    return u.triggerEvent("componentLoad", u.is);
                }), u.imgLoader = new n.ImgLoader(u), u.imgLoader.load(c[0].image, function(e, t) {
                    u.setData({
                        entries: c,
                        swiperCurrent: 0,
                        swiperIdx: 0
                    });
                });
            }).catch(function(e) {
                u.setData({
                    error: !0,
                    entries: []
                }), u.triggerEvent("componentLoad", u.is);
            });
        },
        getCpcData: function(e, t) {
            var r = this, n = [], i = "";
            if (!e || "0" != e.errCode || !e.list || !e.list.length) return n;
            t && t.bannerBg && (i = t.bannerBg || "");
            var a = [];
            return e.list.some(function(e) {
                if (e && "9231" == e.groupid) return a = e.locations || [], !0;
            }), a.length ? (a.forEach(function(e) {
                if (e.plans && e.plans.length) {
                    var t = e.plans[0];
                    n.push({
                        image: r.utils.getImg(t.material, 750),
                        url: t.sUrl,
                        bannerMark: r.utils.getImg(i)
                    });
                }
            }), n) : n;
        },
        getRocketData: function(e, t) {
            var r = this, n = [], i = "";
            return e && "0" == e.errcode && e.data && e.data.length ? (t && t.bannerBg && (i = t.bannerBg || ""), 
            e.data.forEach(function(e, t) {
                var a = "138067.4." + (t + 1), o = e.url.includes("?") ? e.url + "&ptag=" + a : e.url + "?ptag=" + a;
                n.push({
                    image: r.utils.getImg(e.img[0], 750),
                    url: o,
                    bannerMark: r.utils.getImg(i)
                });
            }), n) : n;
        },
        getAdvData: function(e) {
            return i.default.resolve([]);
        },
        onSwiperChange: function(e) {
            this.setData({
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