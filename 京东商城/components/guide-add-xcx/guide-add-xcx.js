var e = require("../../bases/component.js"), t = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    return t.default = e, t;
}(require("../../common/fe_report/usability.js")), i = require("../../common/logger.js"), a = require("../../api/Ptag/Ptag_utils.js"), n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./model")), r = new i.Logger("my");

new e.JDComponent({
    properties: {},
    data: {
        ziyuanweiShow: !1,
        layerShow: !1,
        guideLayer: "add_to_my_xcx",
        isclick: 0
    },
    attached: function() {
        this.init();
    },
    methods: {
        init: function() {
            var e = this, t = e.getSceneAndPlatform(), i = t.scene, a = t.platform, o = t.currentVersion;
            return !!(i && a && o) && (!(e.compareVersion(o, "2.3.0") < 0) && void n.default.QueryScene().then(function(t) {
                var r = t.isclick, o = t.scenelist;
                e.data.isclick = r, -1 == (o = Array.isArray(o) ? o : []).indexOf(i) && (o.push(i), 
                n.default.ReportEnterScene(i)), 1 != r ? e.showAddToMyXcx() : -1 == o.indexOf("1001") && -1 == o.indexOf("1089") ? e.showAddToMyXcx() : "android" == a && -1 == o.indexOf("1023") ? e.showAddToDesk() : e.hideZiyuanwei();
            }).catch(function(e) {
                r.error(e);
            }));
        },
        getSceneAndPlatform: function() {
            var e = void 0, i = void 0, a = void 0;
            try {
                var n = getApp();
                e = String(n.scene), i = n.systemInfo.platform, a = n.systemInfo.SDKVersion;
            } catch (e) {
                t.umpBiz({
                    bizid: 985,
                    operation: 1,
                    result: 1,
                    message: e
                });
            }
            return e && i && a ? t.umpBiz({
                bizid: 985,
                operation: 1,
                result: 0,
                message: "success"
            }) : t.umpBiz({
                bizid: 985,
                operation: 1,
                result: 1,
                message: "scene:" + e + " platform:" + i
            }), {
                scene: e,
                platform: i,
                currentVersion: a
            };
        },
        compareVersion: function(e, t) {
            e = e.split("."), t = t.split(".");
            for (var i = Math.max(e.length, t.length); e.length < i; ) e.push("0");
            for (;t.length < i; ) t.push("0");
            for (var a = 0; a < i; a++) {
                var n = parseInt(e[a]), r = parseInt(t[a]);
                if (n > r) return 1;
                if (n < r) return -1;
            }
            return 0;
        },
        showAddToMyXcx: function() {
            !this.data.ziyuanweiShow && a.PtagUtils.addPtag("7414.15.2"), this.setData({
                ziyuanweiShow: !0,
                guideLayer: "add_to_my_xcx"
            });
        },
        showAddToDesk: function() {
            !this.data.ziyuanweiShow && a.PtagUtils.addPtag("7414.15.2"), this.setData({
                ziyuanweiShow: !0,
                guideLayer: "add_to_desk"
            });
        },
        hideZiyuanwei: function() {
            this.setData({
                ziyuanweiShow: !1,
                guideLayer: "add_to_my_xcx"
            });
        },
        clickZiyuanwei: function() {
            this.setData({
                layerShow: !0
            }), a.PtagUtils.addPtag("7414.15.1"), 1 != this.data.isclick && n.default.ReportClick();
        },
        clickLayer: function() {
            this.setData({
                layerShow: !1
            }), this.init();
        },
        iKnow: function() {
            a.PtagUtils.addPtag("7414.15.4");
        },
        disMove: function() {}
    }
});