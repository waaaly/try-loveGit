function e(e, t, n) {
    var o = "", r = "", a = void 0;
    return (a = -1 !== e.indexOf("#")) && (o = e.substring(a), e = e.substring(0, a)), 
    -1 !== (a = e.indexOf("?")) && (r = e.substring(a + 1), e = e.substring(0, a)), 
    (r = r.split("&").filter(function(e) {
        return e && decodeURIComponent(e.split("=")[0]).toLowerCase() !== t.toLowerCase();
    })).push(encodeURIComponent(t) + "=" + encodeURIComponent(n)), r = r.join("&"), 
    e + "?" + r + o;
}

function t(e) {
    try {
        var t = e.eventId || "", n = new MPing.inputs.Click(t);
        n.event_param = e.eventParam || "", n.event_level = e.eventLevel || "", n.updateEventSeries(), 
        new MPing().send(n);
    } catch (e) {}
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../common/wxcontext")), o = "jdm" == n.default.JD.device.scene || "mobile" == n.default.JD.device.scene, r = "jdapp" == n.default.JD.device.scene;

exports.default = {
    IS_MOBILE: o,
    IS_JDAPP: r,
    getGoodImg: function(e, t) {
        return e ? (/.*wx\.qlogo\.cn.*\/0$/.test(e) && (e = e.replace("/0", "/64")), /^(http(s)?:)?\/\//.test(e) ? n.default.JD.performance.getScaleImg(e.replace(/^(http(s)?:)/, "")) : (t ? isNaN(t) || (t = "s" + t + "x" + t + "_") : t = "s240x240_", 
        e.indexOf("jfs"), n.default.JD.performance.getScaleImg("//img1" + ~~(5 * Math.random()) + ".360buyimg.com/evalpic/" + t + e))) : "";
    },
    getPingouurl: function(e, t) {
        var o = n.default.JD.url.getUrlParam("sku", e), r = n.default.JD.url.getUrlParam("pps", e), a = "//wqs.jd.com/pingou/item.shtml?sku=" + o + (r ? "&pps=" + r : "");
        return t && (a += "&ptag=" + t), a;
    },
    openAppWebview: function(a, i) {
        o && (a = e(a, "sceneval", "2")), r ? (a = 'openapp.jdmobile://virtual?params={"des":"m","category":"jump","url":"https:' + n.default.JD.url.addUrlParam(a, {
            jdshwkon: "1"
        }) + '"}', i ? (t(i), setTimeout(function() {
            window.location.href = a;
        }, 200)) : window.location.href = a) : setTimeout(function() {
            window.location.href = a;
        }, 0);
    }
};