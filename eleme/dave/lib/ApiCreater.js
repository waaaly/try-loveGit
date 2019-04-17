Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./config")), r = function(e) {
    var r = e.shopId, t = e.orderId, u = wx.getStorageSync("PLACE"), o = u.latitude, n = u.longitude, s = [];
    return t && s.push("eosid=" + t), r && s.push("shopid=" + r), o && n && s.push("loc=" + n + "," + o), 
    s.join(";");
};

exports.default = function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, u = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return new Promise(function(o, n) {
        t.success = function(e) {
            return o(e);
        }, t.fail = function(e) {
            return n(e);
        }, t.header || (t.header = {});
        var s = r(u);
        s && (t.header["X-Shard"] = s), t.url = (/\/\//.test(t.url) ? "" : e.default.apiHost) + t.url, 
        wx.request(t);
    }).then(function(e) {
        return e.statusCode >= 200 && e.statusCode < 400 ? Promise.resolve(e) : Promise.reject(e);
    });
};