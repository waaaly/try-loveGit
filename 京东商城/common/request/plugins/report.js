function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function r(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Report = void 0;

var o = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var o = t[r];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, r, o) {
        return r && e(t.prototype, r), o && e(t, o), t;
    };
}(), n = require("./plugin.js"), i = function(i) {
    function u() {
        return e(this, u), t(this, (u.__proto__ || Object.getPrototypeOf(u)).apply(this, arguments));
    }
    return r(u, n.Plugin), o(u, null, [ {
        key: "response",
        value: function(e, t) {
            t(), "REPORT" != e.priority && (setTimeout(function() {
                wx.JDReport.report(e);
            }, 0), wx.JDReport.reportSpeed(e));
        }
    } ]), u;
}();

exports.Report = i;