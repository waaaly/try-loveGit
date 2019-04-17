Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./ApiCreater")), t = function() {
    return new Promise(function(e, t) {
        wx.getLocation({
            type: "gcj02",
            success: e,
            fail: t
        });
    });
}, n = function() {
    return new Promise(function(e, t) {
        wx.getSetting({
            success: e,
            fail: t
        });
    });
}, r = function(e) {
    return new Promise(function(t, n) {
        var r = wx.getStorageSync("PLACE");
        r && !e ? t(r) : n();
    });
};

exports.default = function() {
    var u = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], i = void 0, o = void 0;
    return r(u).catch(function() {
        return t().then(function(t) {
            return i = t.latitude, o = t.longitude, wx.setStorageSync("PLACE", {
                latitude: i,
                longitude: o
            }), (0, e.default)({
                url: "/bgs/poi/reverse_geo_coding?latitude=" + i + "&longitude=" + o
            });
        }).then(function(e) {
            var t = e.data;
            return t.latitude = i, t.longitude = o, wx.setStorageSync("PLACE", t), t;
        }).catch(function() {
            return n().then(function(e) {
                return e.authSetting["scope.userLocation"] ? Promise.reject() : Promise.reject({
                    name: "NOT_AUTH"
                });
            });
        });
    });
};