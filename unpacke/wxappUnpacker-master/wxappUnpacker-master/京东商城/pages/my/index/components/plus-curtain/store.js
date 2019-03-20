function t(t) {
    if (t && t.__esModule) return t;
    var a = {};
    if (null != t) for (var e in t) Object.prototype.hasOwnProperty.call(t, e) && (a[e] = t[e]);
    return a.default = t, a;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../../api/Ptag/report_manager_wqvue")), e = require("../../../../../common/logger.js"), s = t(require("../../../models/assets_data")), n = t(require("../../../common/js/utils")), u = t(require("../../../../../common/localStorage")), i = new e.Logger("my/indexv2"), r = {
    default: "7155.1.158",
    0: "7155.1.159",
    102: "7155.1.160",
    103: "7155.1.161",
    203: "7155.1.162"
};

exports.default = function() {
    return {
        state: {
            plusWindow: {
                show: !1,
                rurl: "",
                vipStatus: ""
            },
            xmodalImg: ""
        },
        actions: {
            getPpmsPlusConfig: function() {
                var t = this;
                s.getPlusPpmsConfig().then(function(a) {
                    var e = a.filter(function(t) {
                        var a = new Date(), e = new Date(t.startTime);
                        return a <= new Date(t.endTime) && a >= e;
                    });
                    if (0 != e.length) {
                        var s = e = e[0], n = s.link, i = s.img_default, r = s.rate;
                        (-1 == r || 0 == r) && u.remove("plusCurtainShow"), -1 != r && u.get("plusCurtainShow", 0).then(function(a) {
                            a && a == r || t.getPlusInfo(r, n, i, e);
                        });
                    }
                });
            },
            getPlusInfo: function(t, e, o, l) {
                var m = this, g = n.getEnv();
                s.isPlus().then(function(s) {
                    if (s) {
                        if (0 == s.mapingstatus || 102 == s.mapingstatus || 103 == s.mapingstatus || 203 == s.mapingstatus) {
                            var n = "img_" + s.mapingstatus;
                            m.xmodalImg = "https:" + l[n];
                        } else 201 != s.mapingstatus && 101 != s.mapingstatus ? m.xmodalImg = "https:" + o : m.xmodalImg = "";
                        if ("" != m.xmodalImg) {
                            var p = "https:" + e + "?" + [ "s=xcx", "s=wq", "s=wq", "flow_system=myhome&flow_entrance=myhome2&flow_channel=m&sceneval=2" ][g];
                            if (m.showPlusCurtain(p, s.mapingstatus), 0 != t) {
                                var f = t + "d";
                                u.set("plusCurtainShow", t, {
                                    expire: f
                                }).catch(function() {
                                    i.error("my plusCurtainShow写storage失败");
                                });
                            }
                            0 == s.mapingstatus || 102 == s.mapingstatus || 103 == s.mapingstatus || 203 == s.mapingstatus ? a.default.addPtagExposure(r[s.mapingstatus]) : 201 != s.mapingstatus && 101 != s.mapingstatus && a.default.addPtagExposure(r.default);
                        }
                    }
                });
            },
            showPlusCurtain: function(t, a) {
                this.plusWindow = {
                    show: !0,
                    rurl: t,
                    vipStatus: a
                };
            },
            hideXModal: function() {
                a.default.addPtag("7155.1.85"), this.plusWindow.show = !1;
            }
        }
    };
};