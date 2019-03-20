function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t() {
    s || wx.getSystemInfo({
        success: function(e) {
            s = e.platform;
        },
        fail: function(e) {
            s = "others";
        }
    }), a || wx.getNetworkType({
        success: function(e) {
            a = e.networkType;
        },
        fail: function(e) {
            a = "unknown";
        }
    });
}

function n() {
    return c = !1;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Speed = void 0;

var r = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), i = require("../request/request.js"), o = (0, require("../debug.js").debug)("Speed 前端测速上报"), u = "https://fd.3.cn/cesu/r", s = "", a = "", c = void 0, f = function() {
    function c(n, r) {
        e(this, c), this.pid = n, this.initTime = r || new Date(), this.points = [], t();
    }
    return r(c, [ {
        key: "mark",
        value: function(e, t) {
            var n = +(t || new Date()) - this.initTime;
            return this.points[e - 1] = Math.max(n, 1), this;
        }
    }, {
        key: "report",
        value: function() {
            if (!n()) {
                var e = {};
                this.points.forEach(function(t, n) {
                    void 0 !== t && (e["s" + (n + 1)] = t);
                });
                var t = Object.assign({
                    pid: this.pid,
                    os: s,
                    apn: a
                }, e);
                o(t), (0, i.request)({
                    method: "GET",
                    url: u,
                    data: t,
                    priority: "REPORT"
                }).then(function(e) {
                    return e.body;
                }).catch(function(e) {
                    return e;
                });
            }
        }
    } ], [ {
        key: "reportAlone",
        value: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (!n()) {
                var r = Object.assign({
                    pid: e,
                    os: s,
                    apn: a
                }, t);
                (0, i.request)({
                    method: "GET",
                    url: u,
                    data: r,
                    priority: "REPORT"
                }).then(function(e) {
                    return e.body;
                }).catch(function(e) {
                    return e;
                }), o(r);
            }
        }
    } ]), c;
}();

exports.Speed = f;