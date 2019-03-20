function e(e) {
    var t = e.split(".");
    return 1e4 * t[0] + 100 * t[1] + 1 * t[2];
}

function t() {
    var e = "/pages/common/update/index", t = {};
    if (n) {
        if (s) t.system = s; else {
            if (!d) return;
            t.sdkVersion = d;
        }
        try {
            (0, r.goto)(e, t, {
                method: "reLaunch"
            });
        } catch (o) {
            (0, r.goto)(e, t, {
                method: "redirectTo"
            });
        }
    }
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function() {
    if (n) return t();
    !1 !== n && wx.getSystemInfo({
        success: function() {
            var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, u = r.system || "", a = u.match(/^iOS (\d{1,2})\.\d{1,2}(?:\.\d{1,2})?$/);
            if (a && +a[1] < o) return s = u, n = !0, t();
            var c = r.SDKVersion || "";
            return /^\d{1,2}\.\d{1,2}\.\d{1,2}$/.test(c) ? e(c) < e(i) ? (d = c, n = !0, t()) : void (n = !1) : void 0;
        }
    });
};

var r = require("./navigator"), o = 9, i = "1.6.4", n = void 0, s = "", d = "";