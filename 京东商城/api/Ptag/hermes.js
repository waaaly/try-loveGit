function e(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = e[t]);
    return r.default = e, r;
}

function r(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

function t(e, r, t, o, u) {
    var s = p.gUserData().visitkey;
    s ? n(s, e, r, t, o, u) : i().then(function(i) {
        n(i, e, r, t, o, u);
    });
}

function n(e, r, t, n, i, u) {
    var f = {
        t: t,
        m: "MO_J2011-2",
        pin: a.getCookie("pin") || "-",
        sid: e + "|" + r.visit_times,
        url: n,
        ref: i,
        rm: Date.now(),
        v: u ? JSON.stringify(r) : r.toString()
    }, l = new o();
    s.request.get({
        url: c.PTAG_URL,
        data: f,
        dataType: "text",
        priority: "REPORT"
    }).then(function(e) {
        var r = e.body, t = e.header;
        l.success(r, t);
    }, l.fail);
}

function o() {
    this.success = function(e, r) {}, this.fail = function(e) {};
}

function i() {
    return new v.default(function(e, r) {
        l.setVisitKey(f.wxaProxy(c.PTAG_URL), function(t) {
            t ? e(t) : r("");
        });
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Hermes = void 0;

var u = function() {
    function e(e, r) {
        for (var t = 0; t < r.length; t++) {
            var n = r[t];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(r, t, n) {
        return t && e(r.prototype, t), n && e(r, n), r;
    };
}();

exports.visitKeyPromise = i;

var s = require("../../common/request/request.js"), a = e(require("../../common/cookie-v2/cookie.js")), c = e(require("../APIs.js")), f = e(require("../../common/url_utils")), l = e(require("./report")), p = e(require("../../common/user_info")), v = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../libs/promise.min.js"));

exports.Hermes = function() {
    function e() {
        r(this, e);
    }
    return u(e, null, [ {
        key: "reportPtag",
        value: function(e, r, n) {
            t(e, "wg_wx.000001", r, n);
        }
    }, {
        key: "reportPv",
        value: function(e, r, n) {
            t(e, "wg_wx.000000", r, n);
        }
    }, {
        key: "reportSearchExposure",
        value: function(e, r, n) {
            t(e, "wg_wx.000002", r, n, !0);
        }
    }, {
        key: "reportPtagExposure",
        value: function(e, r, n) {
            t(e, "wg_wx.000003", r, n);
        }
    }, {
        key: "reportUserShare",
        value: function(e, r, n) {
            t(e, "wg_wx.000007", r, n);
        }
    } ]), e;
}();