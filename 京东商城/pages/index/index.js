function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t.default = e, t;
}

function t(e) {
    return Array.isArray(e) ? e : Array.from(e);
}

var n = function() {
    function e(e, t) {
        var n = [], o = !0, i = !1, a = void 0;
        try {
            for (var r, s = e[Symbol.iterator](); !(o = (r = s.next()).done) && (n.push(r.value), 
            !t || n.length !== t); o = !0) ;
        } catch (e) {
            i = !0, a = e;
        } finally {
            try {
                !o && s.return && s.return();
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
}(), o = require("../../bases/page.js"), i = e(require("../../common/localStorage.js")), a = e(require("./utils.js")), r = e(require("../../common/login/login.js"));

new o.JDPage({
    data: {
        onLoad: null,
        onShow: null,
        onRefresh: null,
        onReachBottom: null,
        onPageScroll: null
    },
    onLoad: function(e) {
        var t = e.scene, n = e.showIndex, o = e.open_url, a = getApp() || {}, r = a.scene, s = a.navigateToIndexByCode;
        1034 != r || s || wx.reLaunch({
            url: "/pages/events/nhhb/index/index?cubeId=12379"
        }), t && (t = decodeURIComponent(t), this.handleScene(t)), o && this.$goto(this.utils.decode(o));
        var l = 2, c = "138067.16.1";
        if ("1019" == r || 1 == n) l = 1, c = "138043.1.1", wx.setNavigationBarTitle({
            title: "京东优选"
        }); else {
            var h = i.getSync("index_mall_greyScale");
            h || (h = Math.floor(100 * Math.random()), i.setSync("index_mall_greyScale", h, "30d")), 
            h >= 100 && (l = 1, c = "138043.1.1", wx.setNavigationBarTitle({
                title: "京东优选"
            }));
        }
        this.setData({
            onLoad: {
                timestamp: Date.now()
            },
            showIndex: l,
            ptag: c
        }), this.onPageScroll = this.utils.debounce(this.onPageScroll, 500);
    },
    onUnload: function() {
        r.clearLoginPromise();
    },
    onShow: function() {
        this.setData({
            onShow: {
                timestamp: Date.now()
            }
        }), wx.hideNavigationBarLoading(), delete getApp().navigateToIndexByCode;
    },
    onHide: function() {
        this.setData({
            onHide: {
                timestamp: Date.now()
            }
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            onRefresh: {
                timestamp: Date.now()
            }
        });
    },
    onShareAppMessage: function() {
        var e = this.shareConfig || {}, t = {
            title: e.title || "京东购物，多·快·好·省",
            path: e.path || this.route
        };
        return e.image && (t.imageUrl = a.fixUrl(e.image)), t;
    },
    onReachBottom: function() {
        this.setData({
            onReachBottom: {
                timestamp: Date.now()
            }
        });
    },
    onPageScroll: function(e) {
        this.setData({
            onPageScroll: {
                timestamp: Date.now(),
                scrollTop: e.scrollTop
            }
        });
    },
    initShareConfig: function() {
        var e = this;
        this.shareConfigInited || this.biz.getPPMS(34242).then(function(t) {
            t && t[0] && t[0].shareConfig && t[0].shareConfig[0] && (e.shareConfig = t[0].shareConfig[0], 
            e.shareConfigInited = !0);
        }).catch(function(e) {
            return console.log(e);
        });
    },
    handleScene: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        e = this.parseScene(e), getApp().wxacode = e;
        var t = "", o = null, a = n(e.path, 1)[0];
        switch (e.type) {
          case "shop":
            t = "/pages/offlineStore/index", o = {
                shopId: a
            }, i.set("3c_shop", {
                id: a,
                time: Date.now()
            });
        }
        t && this.$goto(t, Object.assign({}, e.query, o));
    },
    parseScene: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        if (!e) return {};
        var o = e.split("?"), i = n(o, 2), a = i[0], r = i[1], s = void 0 === r ? "" : r, l = t(a.split("/")), c = l[0], h = l.slice(1), u = {};
        return s.split("&").forEach(function(e) {
            var t = e.split("="), o = n(t, 2), i = o[0], a = o[1];
            u[i] = a;
        }), {
            type: c,
            path: h,
            query: u,
            querystring: s
        };
    },
    firstScreenLoaded: function(e) {
        e.detail && this.speedMark(e.detail).speedReport(), this.initShareConfig();
    },
    bindGetUserInfo: function(e) {
        getApp().event.emit("getUserInfoSuccess", e.detail);
    },
    bindHideAuth: function() {
        getApp().event.emit("getUserInfoFail");
    }
});