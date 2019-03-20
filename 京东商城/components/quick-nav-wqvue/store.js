function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.storeFn = void 0;

var t = e(require("./model")), n = e(require("../../common/wxcontext"));

exports.storeFn = function() {
    return {
        state: {
            showModule: !1,
            fold: !0,
            showMask: !1,
            navSets: []
        },
        actions: {
            getPPmsData: function(e, o) {
                t.default.getPPMS("30728").then(function(t) {
                    if (t && t.length) {
                        var r = null;
                        t.some(function(t) {
                            if (t.pageName === e) return r = t, !0;
                        }), r && r.navSets.length && (r.navSets.forEach(function(e) {
                            e.wxappImg = n.default.JD.img.getImgUrl(e.wxappImg);
                        }), o.setData({
                            showModule: !0,
                            navSets: r.navSets
                        }));
                    }
                }).catch(function(e) {
                    return console.error(e);
                });
            }
        }
    };
};