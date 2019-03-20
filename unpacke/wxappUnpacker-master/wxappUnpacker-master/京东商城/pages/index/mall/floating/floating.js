function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
    return t.default = e, t;
}

function t(e) {
    var t = {};
    return e.global && e.global.globalPPMS && e.global.globalPPMS[33870] && e.global.globalPPMS[33870][0] ? (t.ppms = e.global.globalPPMS[33870][0].floating || [], 
    e.global.freshmenData && 0 == e.global.freshmenData.ret ? t.freshmenData = e.global.freshmenData : t.freshmenData = {
        isnew: -1
    }, n.default.resolve(t)) : n.default.resolve(t);
}

var a = require("../../../../bases/component.js"), n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../libs/promise.min.js")), i = e(require("../../../../common/localStorage.js")), l = e(require("../../utils.js"));

new a.JDComponent({
    data: {
        floating: {},
        showFloating: !1
    },
    created: function() {
        this.init = this.init.bind(this), getApp().event.on("index_mall_init", this.init);
    },
    detached: function() {
        getApp().event.off("index_mall_init", this.init);
    },
    methods: {
        init: function(e) {
            var a = this;
            n.default.all([ t(e), i.get("mall_floating_hide_util", null) ]).then(function(e) {
                var t = e[0], i = t.ppms, o = t.freshmenData, r = e[1];
                if (!(r && Date.now() < r)) {
                    if (!i || !i.length) return n.default.reject("Get floating config error");
                    var s = 1 == o.isnew, u = null;
                    i.some(function(e) {
                        if (l.checkTime(e.begin, e.end)) return 2 == e.userType || 0 == e.userType && !s || 1 == e.userType && s ? (u = {
                            image: a.utils.getImg(e.imgUrl),
                            url: e.jumpUrl,
                            wxappId: e.wxappId || "",
                            wxappPath: e.wxappPath || "",
                            wxappRd: e.wxappRd || ""
                        }, !0) : void 0;
                    }), u && a.setData({
                        floating: u
                    });
                }
            }).catch(function(e) {
                return console.log("cjj e", e);
            });
        },
        imageLoaded: function() {
            this.setData({
                showFloating: !0
            });
        },
        hideFloating: function() {
            l.report("7593.2.5"), this.setData({
                showFloating: !1
            }), i.set("mall_floating_hide_util", new Date().setHours(24, 0, 0, 0));
        },
        gotoUrl: function(e) {
            var t = e.currentTarget.dataset, a = t.url, n = t.wxappId, i = t.wxappPath, o = t.wxappRd;
            n && i ? (wx.navigateToMiniProgram({
                appId: n,
                path: i
            }), o && l.report(o)) : this.$goto("/pages/h5/index", {
                url: a
            });
        }
    }
});