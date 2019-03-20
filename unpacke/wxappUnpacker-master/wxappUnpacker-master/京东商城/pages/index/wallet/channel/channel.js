function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t.default = e, t;
}

function t(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var n = function() {
    function e(e, t) {
        var n = [], r = !0, i = !1, a = void 0;
        try {
            for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), 
            !t || n.length !== t); r = !0) ;
        } catch (e) {
            i = !0, a = e;
        } finally {
            try {
                !r && s.return && s.return();
            } finally {
                if (i) throw a;
            }
        }
        return n;
    }
    return function(t, n) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), r = require("../../../../bases/component.js"), i = t(require("../common-behavior.js")), a = t(require("../../../../libs/promise.min.js")), o = e(require("../../../../common/localStorage.js")), s = e(require("../../utils.js"));

new r.JDComponent({
    behaviors: [ i.default ],
    properties: {
        channelConfig: {
            type: Object,
            observer: function(e) {
                this.ppmsPromiseResolve && this.ppmsPromiseResolve(e);
            }
        },
        birthConfig: {
            type: Object,
            observer: function(e) {
                var t = this;
                if (!e.bannerImg) return this.getBirthBannerResolve({});
                o.get("index_birth_icon_decorated", null).then(function(n) {
                    t.getBirthBannerResolve && (n ? t.getBirthBannerResolve({}) : t.getBirthBannerResolve(e));
                });
            }
        }
    },
    data: {
        entries: [],
        hideModule: !1
    },
    attached: function() {},
    detached: function() {},
    methods: {
        refresh: function() {
            var e = this;
            a.default.all([ this.biz.getPPMS(33542), this.getPPMSConfig(), this.getBirthBanner() ]).then(function(t) {
                var r = n(t, 3), i = r[0], a = r[1], o = r[2];
                return e.handleData(i, a, o);
            }).catch(function(t) {
                t.code, t.message;
                e.triggerEvent("componentLoad", e.is), e.setData({
                    hideModule: !0
                });
            });
        },
        handleData: function(e, t, n) {
            var r = this, i = [];
            e.forEach(function(e) {
                -1 != e.link.indexOf("wallet_special.shtml") && "定制频道" == e.title || !s.checkTime(e.begin, e.end) || i.push(r.processData(e));
            });
            i.sort(function(e, t) {
                return e.id - t.id > 0 ? 1 : -1;
            });
            var a = i.slice(0, 5), u = null, c = null;
            n.iconImg && (t.image = n.iconImg, t.type = "cover", o.set("index_birth_icon_decorated", "true", {
                expire: "1d"
            })), t.image && (u = this.utils.getImg(t.image), t.fc && 7 == t.fc.length && "#" == t.fc[0] && (c = t.fc), 
            "cover" === t.type && (a.forEach(function(e) {
                e.image = "";
            }), t.icon && t.iconPos && (a[t.iconPos].coverImage = this.utils.getImg(t.icon, 72)))), 
            n.textColor && 7 == n.textColor.length && "#" == n.textColor[0] && (c = n.textColor), 
            this.setData({
                entries: a,
                bg: u,
                fc: c,
                hideModule: !1
            }, function() {
                return r.triggerEvent("componentLoad", r.is);
            });
        },
        processData: function(e) {
            var t = {
                name: e.title,
                image: this.utils.getImg(e.image, 72),
                id: e.id
            };
            return e.appID && e.appPath ? (t.appID = e.appID, t.appPath = e.appPath, t.appRd = e.appRD) : e.wxappPath ? (t.wxappPath = e.wxappPath, 
            t.wxappRd = e.wxappRD) : s.greyScale(e.percentage, e.whiteList) ? t.url = e.link2 : t.url = e.link, 
            t;
        },
        tapOnItem: function(e) {
            var t = e.currentTarget.dataset, n = t.url, r = t.appId, i = t.appPath, a = t.appRd, o = t.wxappPath, u = t.wxappRd;
            o ? this.$goto(o, {
                ptag: u || ""
            }) : r && i ? (wx.navigateToMiniProgram({
                appId: r,
                path: i
            }), a && s.report(a)) : this.$goto("/pages/h5/index", {
                url: n
            });
        },
        getPPMSConfig: function() {
            var e = this, t = new a.default(function(t, n) {
                e.ppmsPromiseResolve = t;
            });
            return setTimeout(function() {
                1 != t._state && e.ppmsPromiseResolve({});
            }, 5e3), t;
        },
        getBirthBanner: function() {
            var e = this;
            return new a.default(function(t) {
                e.getBirthBannerResolve = t;
            });
        }
    }
});