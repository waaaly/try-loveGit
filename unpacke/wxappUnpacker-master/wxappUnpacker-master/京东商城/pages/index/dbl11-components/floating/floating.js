function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    return t.default = e, t;
}

function t(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var i = require("../../../../bases/component.js"), n = t(require("../../../../libs/promise.min.js")), a = t(require("../../mall/common-behavior.js")), o = e(require("../../../../common/localStorage.js")), r = e(require("../../utils.js")), u = require("../constant");

new i.JDComponent({
    behaviors: [ a.default ],
    properties: {
        curtainFinish: {
            type: Boolean,
            observer: function(e) {
                e && this.waitCurtainFinishResolve && this.waitCurtainFinishResolve();
            }
        },
        saleConfig: {
            type: Object,
            observer: function(e) {
                this.getPPMSDataResolve && this.getPPMSDataResolve(e);
            }
        },
        indexName: {
            type: "String",
            observer: function(e) {
                this.indexName = e || "";
            }
        }
    },
    data: {
        config: {},
        hideModule: !0,
        hideText: !0,
        anim: !1
    },
    created: function() {
        this.init = this.init.bind(this), getApp().event.on("index_mall_init", this.init);
    },
    detached: function() {
        getApp().event.off("index_mall_init", this.init);
    },
    methods: {
        refresh: function() {
            "wallet" == this.indexName && this.init();
        },
        init: function(e) {
            var t = this;
            if (r.checkTime(u.SALE_BEGIN, u.SALE_END)) {
                var i = "mall" == this.indexName ? e && e.dbl11 && e.dbl11.ppms || {} : this.getPPMSData();
                n.default.all([ i, o.get("dbl11_floating_hide_module", null), o.get("dbl11_floating_hide_text", null) ]).then(function(e) {
                    var i = e[0] && e[0].ad11MainFloating || [], a = e[1], o = e[2];
                    if (a && Date.now() < a) return n.default.reject();
                    var u = null;
                    if (i.some(function(e) {
                        if (r.checkTime(e.begin, e.end)) return u = e, !0;
                    }), !u) return n.default.reject("There is no config");
                    var s = "mall" == t.indexName ? "138067.17.3" : "137889.7.4", l = {
                        image: t.utils.getImg(u.bg, 100, 200),
                        text: u.bubbleText,
                        url: u.href ? t.addPtag(u.href, s) : ""
                    };
                    r.exposureUrlPtag(l.url), t.setData({
                        config: l,
                        hideModule: !1
                    }, function() {
                        t.triggerEvent("showModule");
                    }), o && Date.now() < o ? t.setData({
                        hideText: !0
                    }) : t.data.curtainFinish ? t.showText(u) : t.waitCurtainFinish().then(function() {
                        t.showText(u);
                    });
                }).catch(function(e) {
                    t.setData({
                        hideModule: !0
                    });
                });
            } else this.setData({
                hideModule: !0
            });
        },
        hideModule: function() {
            this.setData({
                hideModule: !0
            }), o.set("dbl11_floating_hide_module", new Date().setHours(24, 0, 0, 0));
        },
        showText: function(e) {
            var t = this, i = e.bubbleShowTime || "3", n = e.bubbleShowStartTime || "", a = e.bubbleShowEndTime || "";
            r.checkTime(n, a) && (this.setData({
                hideText: !1
            }, function() {
                setTimeout(function() {
                    t.setData({
                        anim: !0
                    });
                }, 100);
            }), setTimeout(function() {
                t.setData({
                    anim: !1
                }, function() {
                    setTimeout(function() {
                        t.hideText();
                    }, 1e3);
                });
            }, 1e3 * i));
        },
        hideText: function() {
            this.setData({
                hideText: !0
            }), o.set("dbl11_floating_hide_text", new Date().setHours(24, 0, 0, 0));
        },
        gotoUrl: function(e) {
            var t = e.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: t
            });
        },
        addPtag: function(e, t) {
            if (!e || !t) return e;
            if (e.match(/\?\w+/)) {
                var i = this.utils.getUrlParam("ptag", String(e));
                e = i ? e.replace(i, t) : e + "&ptag=" + t;
            } else e = e + "?ptag=" + t;
            return e;
        },
        waitCurtainFinish: function() {
            var e = this;
            return new n.default(function(t) {
                return e.waitCurtainFinishResolve = t;
            });
        },
        getPPMSData: function() {
            var e = this;
            return new n.default(function(t, i) {
                e.getPPMSDataResolve = t;
            });
        }
    }
});