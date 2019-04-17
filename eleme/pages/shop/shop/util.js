function e(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
}

var t = require("../../../common/utils/util").isFloat;

exports.initScore = function(r) {
    return Object.keys(r).reduce(function(n, o) {
        var i = r[o];
        return Object.assign(n, e({}, o, t(i) ? (i > 1 ? i : 100 * i).toFixed(1) : i));
    }, {});
}, exports.sweetAlert = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "zzz";
    wx.showModal({
        title: "温馨提示",
        content: e,
        showCancel: !1,
        confirmText: "知道了",
        confirmColor: "#0097FF"
    });
};