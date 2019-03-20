function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = e(require("../../../../../api/Ptag/report_manager_wqvue")), n = e(require("../../../../../common/wxcontext")), t = function(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (r[n] = e[n]);
    return r.default = e, r;
}(require("../../../../../common/localStorage")), o = new (require("../../../../../common/logger.js").Logger)("my/indexv2");

exports.default = function() {
    return {
        state: {
            newWindow: {
                show: !1,
                sceneid: "",
                rurl: ""
            },
            xmodalImg: ""
        },
        actions: {
            showMyNewCurtain: function(e) {
                var i = e.img, u = e.link, a = e.sceneid, s = e.num, d = e.env;
                if ((-1 == s || 0 == s) && t.remove("newCurtainShow"), -1 != s && -1 !== d.indexOf(n.default.JD.device.scene)) {
                    var c = i, l = u;
                    if (0 === c.indexOf("//") && (c = "https:" + c), 0 === l.indexOf("//") && (l = "https:" + l), 
                    this.xmodalImg = c, this.newWindow = {
                        show: !0,
                        sceneid: a,
                        rurl: l
                    }, 0 != s) {
                        var f = s + "d";
                        t.set("newCurtainShow", s, {
                            expire: f
                        }).catch(function() {
                            o.error("my newCurtainShow写storage失败");
                        });
                    }
                    r.default.addPtagExposure("7155.1.168");
                }
            }
        }
    };
};