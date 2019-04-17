function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, n = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), o = e(require("./config")), s = e(require("./user")), i = {
    trackerUrl: "https://web-ubt.ele.me/collect/log",
    sortIdKey: "ubt-checking-sort-id",
    version: "1.3.3"
}, a = function() {
    for (var e = "", t = 0; t < 4; t++) e += "0000000".concat(Math.floor(2821109907456 * Math.random()).toString(36)).slice(-8);
    return e;
}, u = function() {
    var e = wx.getStorageSync("ubt_ssid");
    if (e) return e;
    var t = new Date(new Date().getTime() + 288e5), r = a() + "_" + [ t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate() ].join("-").replace(/\b\d\b/g, "0$&");
    return wx.setStorageSync("ubt_ssid", r), r;
}, c = function() {
    return new Date().getTime().toString(36);
}, f = function() {
    var e = 0;
    try {
        var t = wx.getStorageSync(i.sortIdKey) || "0";
        (e = parseInt(t, 10)) <= 1e6 ? e += 1 : e = 0, wx.setStorageSync(i.sortIdKey, e.toString());
    } catch (e) {}
    return e;
};

exports.default = new (function() {
    function e() {
        t(this, e), this.ssid = u(), this.pvhash = a(), this.sortId = f(), this.scene = wx.getStorageSync("scene") || "", 
        this.from = wx.getStorageSync("qrcode") || "", this.systemInfo = wx.getSystemInfoSync();
    }
    return n(e, [ {
        key: "send",
        value: function(e) {
            e.ssid = this.ssid, e.timestamp = c(), e.sort_id = this.sortId, e.pvhash = this.pvhash;
            var t = {
                data: [ e ],
                version: i.version
            };
            wx.request({
                url: i.trackerUrl,
                method: "POST",
                header: {
                    "X-Requested-With": "ele.me"
                },
                data: t
            });
        }
    }, {
        key: "sendEvent",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            e.type = "EVENT", "object" !== r(e.params) && (e.params = {}), e.params.scene = e.params.scene || this.scene, 
            e.params.from = e.params.from || this.from, this.send(e);
        }
    }, {
        key: "sendPv",
        value: function(e) {
            var t = getCurrentPages(), r = t[t.length - 1].route;
            this.pvhash = a(), this.send({
                type: "PV",
                resolution: this.systemInfo.windowWidth + "x" + this.systemInfo.windowHeight,
                location: "https://servicewechat.com/" + o.default.appid + "/" + r + "?from=" + this.from + "&scene=" + this.scene + (e ? "&" + e : ""),
                referrer: "",
                platform_user_id: s.default.union_id,
                user_id: s.default.user_id
            });
        }
    } ]), e;
}())();