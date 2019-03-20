function e(e) {
    return e.replace("//wq.jd.com/mcoss/", "//wqcoss.jd.com/mcoss/");
}

function r(r) {
    if (!c && 1 != s.open || !r || !t.length) return r;
    for (var i = 0, l = t.length; i < l; i++) {
        var a = t[i];
        if (e(r, "cgi").indexOf(a.cgiUrl) > -1 && (c || "1" == s.recoveryAll || n < a.vk)) try {
            return o(a, r);
        } catch (e) {
            return console.warn("createRecoverUrl:" + e), r;
        }
    }
    return r;
}

function o(e, r) {
    if ("md5" == e.recoveryType) {
        if (!l._coss_cgi_recovery) return r;
        var o = r.split("/"), s = o[o.length - 2], t = o[o.length - 1].split("?")[0], c = decodeURIComponent(r.split("?")[1] || ""), n = {}, u = c.split("&").map(function(r) {
            var o = r.split("=")[0];
            if (e.batchParamKey && e.sep) {
                for (var s = e.batchParamKey.split("|"), t = e.sep.split(""), c = !1, i = 0, l = s.length; i < l; i++) {
                    var a = s[i], u = t[i];
                    if (o == a) {
                        var v = (r.split("=")[1] || "").split(u);
                        n[o] = o + "=" + v.sort().join(u), c = !0;
                        break;
                    }
                }
                !c && (n[o] = r);
            } else n[o] = r;
            return o;
        }), v = a[s] || [];
        (u = u.filter(function(e) {
            var r = !!n[e].split("=")[1], o = v.some(function(r) {
                return e == r;
            });
            return r && o;
        })).sort();
        var p = u.reduce(function(e, r, o) {
            return e + "_" + n[r].replace(/[,:;|\/=]/g, "_");
        }, "mcoss_" + s + "_" + t);
        console.log("[Coss Recovery] md5Str: ", p);
        var d = i.md5.getHash(p), f = (n[e.pKey] || "").split("=")[1], g = f.match(/[;|,]/);
        return g && (f = f.split(g[0])[0]), "seckill" == s && "pingou" == t && (s = "pingou_v0"), 
        "//wqs.jd.com/data/coss/recovery/" + s + "2/" + 1 * f + "/" + d + ".shtml?" + c;
    }
    return r;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getCossRecovery = exports.setPpmsConfigData = exports.setCossConfigData = void 0;

var s = void 0, t = void 0, c = void 0, n = 0, i = {
    md5: {
        getHash: function(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(require("../../libs/md5.js")).default.hexMD5
    }
}, l = {
    _coss_cgi_recovery: null
}, a = void 0;

exports.setCossConfigData = function(e) {
    l._coss_cgi_recovery = e, a = e, console.log("[Coss Recovery] _coss_cgi_recovery: ", e);
}, exports.setPpmsConfigData = function(e) {
    t = (s = e).rules || [], console.log("[Coss Recovery] cgiRule: ", s);
}, exports.getCossRecovery = function(e) {
    if (!a || !s) return e;
    var o = !1, t = e;
    return 0 === (e = r(e)).indexOf("//wqs.jd.com/data/coss/recovery/") && (o = !0, 
    e = "https:" + e, console.log("[Coss Recovery] didRecover, src: " + t + " ; dist: " + e)), 
    {
        url: e,
        didRecover: o
    };
};