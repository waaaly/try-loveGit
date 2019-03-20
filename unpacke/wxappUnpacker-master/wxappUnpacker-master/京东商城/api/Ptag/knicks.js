function e(e) {
    if (e && e.__esModule) return e;
    var n = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
    return n.default = e, n;
}

function n(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

function r(e, n, r, i, u, s) {
    var c = a.gUserData().visitkey;
    c ? o(c, e, n, r, i, u, s) : t().then(function(t) {
        o(t, e, n, r, i, u, s);
    });
}

function t() {
    return new d.default(function(e, n) {
        c.setVisitKey(s.wxaProxy(p.PTAG_URL), function(r) {
            r ? e(r) : n("");
        });
    });
}

function o(e, n, r, t, o, u, s) {
    r.pin || (r.pin = l.getCookie("pin") || ""), r.sid || (r.sid = e + "|" + r.visit_times), 
    r.uuid || (r.uuid = e);
    var c = {
        t: n || "",
        v: r.toString(),
        source: void 0 !== t ? t : ""
    }, a = new i();
    f.request.get({
        url: p.GUESS_YOU_LIKE_URL,
        data: c,
        dataType: "text",
        priority: "REPORT"
    }).then(function(e) {
        var n = e.body, r = e.header;
        a.success(n, r);
    }, a.fail);
}

function i() {
    this.success = function(e, n) {
        console.log("#####################################response: [knicks success]-----------\x3e", e, n);
    }, this.fail = function(e) {
        console.log("#####################################response: [knicks error]-----------\x3e", e);
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var u = function() {
    function e(e, n) {
        for (var r = 0; r < n.length; r++) {
            var t = n[r];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(e, t.key, t);
        }
    }
    return function(n, r, t) {
        return r && e(n.prototype, r), t && e(n, t), n;
    };
}(), s = e(require("../../common/url_utils")), c = e(require("./report")), a = e(require("../../common/user_info")), f = require("../../common/request/request.js"), l = e(require("../../common/cookie-v2/cookie.js")), p = e(require("../APIs.js")), d = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../libs/promise.min.js")), v = function() {
    function e() {
        n(this, e);
    }
    return u(e, null, [ {
        key: "reportGuessyouLike",
        value: function(e, n, t, o, i, u) {
            r(e, n, t, o, i, u);
        }
    } ]), e;
}();

exports.default = v;