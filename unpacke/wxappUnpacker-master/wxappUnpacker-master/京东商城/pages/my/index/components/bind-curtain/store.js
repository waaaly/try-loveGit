function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = e(require("../../../../../api/Ptag/report_manager_wqvue")), i = e(require("../../../../../common/wxcontext")), n = require("../../../../../common/logger.js"), t = function(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (r[i] = e[i]);
    return r.default = e, r;
}(require("../../../../../common/localStorage")), o = new n.Logger("my/indexv2");

exports.default = function() {
    return {
        state: {
            bindWindow: {
                show: !1,
                bindactiveid: "",
                bindlevel: "",
                rurl: ""
            },
            xmodalImg: ""
        },
        actions: {
            showMyBindCurtain: function(e) {
                var n = e.img, a = e.num, d = e.env, u = e.activeid, l = e.level;
                if ((-1 == a || 0 == a) && t.remove("bindCurtainShow"), -1 != a && -1 !== d.indexOf(i.default.JD.device.scene)) {
                    var c = "https:" + n;
                    if (this.xmodalImg = c, this.bindWindow = {
                        show: !0,
                        bindactiveid: u,
                        bindlevel: l,
                        rurl: i.default.isXCX ? "/pages/my/index/index" : location.href
                    }, 0 != a) {
                        var s = a + "d";
                        t.set("bindCurtainShow", a, {
                            expire: s
                        }).catch(function() {
                            o.error("my bindCurtainShow写storage失败");
                        });
                    }
                    r.default.addPtagExposure("7155.1.171");
                }
            }
        }
    };
};