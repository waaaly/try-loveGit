function e(e) {
    var t = [ 9236 ], a = [];
    return (0, n.getCpcData)(t, a).then(function(e) {
        var a = e[t[0]], n = [];
        for (var c in a) n.push(c);
        var s = [], l = [];
        n.forEach(function(e, t) {
            0 == t ? s.push(a[e][0]) : 1 == t && l.push(a[e][0]);
        });
        var g = [], f = [];
        return s.forEach(function(e) {
            e && g.push({
                image: (0, r.getImg)(e.material, 690, 192),
                url: e.sUrl && (0, u.addPtag)(e.sUrl, i) || ""
            });
        }), l.forEach(function(e) {
            e && f.push({
                image: (0, r.getImg)(e.material, 690, 192),
                url: e.sUrl && (0, u.addPtag)(e.sUrl, o) || ""
            });
        }), {
            featuredData: g,
            selectedData: f
        };
    }).catch(function(e) {
        console.log("banner catch", e);
    });
}

function t() {
    return (0, n.getRocket)([ 8, 10 ], 1).then(function(e) {
        if (!e || !e.length) return a.default.reject("no getRocket data");
        var t = [], n = [];
        return e.some(function(e) {
            if ("8" == e.sceneid) return t.push({
                image: e.img && (0, r.getImg)(e.img[0], 690, 192) || "",
                url: e.url && (0, u.addPtag)(e.url, i) || ""
            }), !0;
        }), e.some(function(e) {
            if ("10" == e.sceneid) return n.push({
                image: e.img && (0, r.getImg)(e.img[0], 690, 192) || "",
                url: e.url && (0, u.addPtag)(e.url, o) || ""
            }), !0;
        }), {
            featuredData: t,
            selectedData: n
        };
    }).catch(function(e) {
        console.log("banner catch", e);
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getBannerData = void 0;

var r = require("../../../common/utils.js"), a = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../libs/promise.min.js")), n = require("../model.js"), u = require("../utils.js"), i = "138067.43.12", o = "138067.41.6";

exports.getBannerData = function(r) {
    return (0, u.greyScale)(r) ? t() : e();
};