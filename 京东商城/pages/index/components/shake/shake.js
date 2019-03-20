function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    return t.default = e, t;
}

var t = require("../../../../bases/component.js"), i = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../libs/promise.min.js")), n = e(require("../../../../common/localStorage.js")), a = require("../../../../api/Ptag/report_manager.js"), r = e(require("../../utils.js"));

new t.JDComponent({
    properties: {
        config: {
            type: Object,
            observer: function(e) {
                this.getPPMSDataResolve && this.getPPMSDataResolve(e);
            }
        },
        curtainFinish: {
            type: Boolean,
            observer: function(e) {
                e && this.waitCurtainFinishResolve && this.waitCurtainFinishResolve();
            }
        }
    },
    data: {
        showModule: !1,
        image: ""
    },
    attached: function() {
        this.init();
    },
    methods: {
        init: function() {
            var e = this;
            i.default.all([ this.getPPMSData(), this.getShakeAnimExpire(), this.waitCurtainFinish() ]).then(function(t) {
                var n = t[0].data, a = t[1];
                if (!n || !n.shake || !n.shake.length) return i.default.reject("shake:get ppms data error");
                var s = n.shake.find(function(e) {
                    return r.checkTime(e.begin, e.end);
                });
                if (!s) return i.default.reject("shake:no shake config");
                a && Date.now() < a ? e.triggerEvent("shakeAnimLoaded", {
                    config: s,
                    showEntrance: !0
                }) : (e.config = s, e.indexName = t[0].indexName, e.setData({
                    image: e.utils.getImg(s.bigImg)
                }));
            }).catch(function(t) {
                e.triggerEvent("shakeAnimLoaded", {
                    showEntrance: !1
                });
            });
        },
        getPPMSData: function() {
            var e = this;
            return new i.default(function(t) {
                return e.getPPMSDataResolve = t;
            });
        },
        getShakeAnimExpire: function() {
            return n.get("shakeAnim_hide_util", null);
        },
        waitCurtainFinish: function() {
            var e = this;
            return new i.default(function(t) {
                return e.waitCurtainFinishResolve = t;
            });
        },
        onImgLoaded: function(e) {
            this.showAnim(this.config);
        },
        showAnim: function(e) {
            var t = this, i = void 0;
            "mall" === this.indexName ? i = e.mall_ptag : "wallet" === this.indexName && (i = e.wallet_ptag), 
            i && a.ReportManager.addPtagExposure(i), n.set("shakeAnim_hide_util", new Date().setHours(24, 0, 0, 0)), 
            this.setData({
                showModule: !0
            });
            setTimeout(function() {
                t.setData({
                    showModule: !1
                }, function() {
                    return t.triggerEvent("shakeAnimLoaded", {
                        config: e,
                        showEntrance: !0
                    });
                });
            }, 3e3);
        }
    }
});