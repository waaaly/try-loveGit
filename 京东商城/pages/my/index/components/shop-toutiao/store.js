function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("./model")), r = t(require("../../../../../libs/promise.min.js")), s = require("../../../../../common/logger.js"), i = t(require("../../../../../api/Ptag/report_manager_wqvue")), n = new s.Logger("my/index");

exports.default = function() {
    return {
        state: {
            scrollMsg: [],
            redNum: 0,
            inlineStyle: ""
        },
        actions: {
            showShopToutiao: function() {
                var t = this, s = e.default.getPpmsDianpuToutiaoConfig(), o = e.default.querynewmsgsnum();
                r.default.all([ s, o ]).then(function(e) {
                    var r = 0, s = [], n = {}, o = {}, a = {};
                    if (e[0].defaultTips && Array.isArray(e[0].defaultTips) && e[0].defaultTips.forEach(function(t) {
                        n[t.tipsType] = t.tips;
                    }), e[0].ownTips && Array.isArray(e[0].ownTips) && e[0].ownTips.forEach(function(t) {
                        o[t.tipsType] = t.tips;
                    }), Object.assign(a, n, o), e[1] && Array.isArray(e[1].data) && Array.isArray(e[1].history)) {
                        var l = e[1].data.length, u = {};
                        e[1].data.concat(e[1].history).reduce(function(t, e) {
                            return u[e.type] || (u[e.type] = !0, t.push(e)), t;
                        }, []).forEach(function(t, e) {
                            a[t.type] && 2 == a[t.type].split("|").length && s.push({
                                tip: a[t.type].split("|")[0],
                                title: a[t.type].split("|")[1]
                            }), r += e < l ? parseInt(t.count) : 0;
                        });
                    }
                    t.redNum = r, t.scrollMsg = s.slice(0, 3), t.scrollMsg[0] && t.scrollMsg.push(t.scrollMsg[0]), 
                    t.scrollMsg.length > 2 && t.scrollInit(t.scrollMsg.length), t.scrollMsg.length && i.default.addPtag("7575.1.17");
                }).catch(function(e) {
                    n.error(e), !t.isXCX && console.error(e);
                });
            },
            scrollInit: function(t) {
                function e() {
                    var t = n % s, a = void 0, l = void 0;
                    n == s ? (n = 0, l = 1, a = "-webkit-transform: translate3d(0,0,0);") : (l = i, 
                    a = "-webkit-transition: transform 0.5s ease-in-out;-webkit-transform: translate3d(0,-" + 55 * t + "px,0);"), 
                    r.inlineStyle = a, n++, clearTimeout(o), o = setTimeout(e, 1e3 * l);
                }
                var r = this, s = t, i = 3, n = 0, o = "";
                e();
            }
        }
    };
};