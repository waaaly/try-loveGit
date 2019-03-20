function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function r() {}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Task = void 0;

var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, n = function() {
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
}(), a = e(require("./util.js")), i = e(require("../cookie-v2/cookie.js")), u = 0, c = function() {
    function e(o) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : r;
        return t(this, e), o.id = u++, o.method = o.method || "GET", o.dataType = o.dataType || "json", 
        o.encoding = o.encoding || "UTF8", o.priority = o.priority || "NORMAL", o.retry = o.retry || 1, 
        o.retryNum = o.retry, o.exchange = void 0 === o.exchange || !!o.exchange, o.exchangeFlag = o.exchange, 
        o.responseList = [], o.callback = n, o.handler = {}, o.speed = {}, o.url = this.formatURL(o), 
        o.data = this.formatData(o), o.header = this.getHeader(o), o.referer = e.getReferer(o), 
        o;
    }
    return n(e, [ {
        key: "getToken",
        value: function() {
            var e = i.getCookie("wq_skey");
            return {
                g_ty: "ls",
                g_tk: e ? a.getCSRFToken(e) : ""
            };
        }
    }, {
        key: "formatURL",
        value: function(e) {
            var t = e.url, r = e.method, n = e.data, i = e.noToken ? null : this.getToken(), u = t.indexOf("?") > -1 ? "&" : "?";
            return "GET" == r && "object" === (void 0 === n ? "undefined" : o(n)) ? t + u + a.toFormData(Object.assign({}, n, i || {})) : i ? t + u + a.toFormData(i) : t;
        }
    }, {
        key: "formatData",
        value: function(e) {
            var t = e.method, r = e.data, o = e.header, n = void 0 === o ? {} : o;
            switch (e.rawData = r, t) {
              case "GET":
                return "";

              case "POST":
                return "application/json" === n["Content-Type"] ? r : a.toFormData(r);

              default:
                return r;
            }
        }
    }, {
        key: "getHeader",
        value: function(e) {
            var t = e.method, r = e.header, o = {
                Cookie: i.getCookie()
            };
            return "POST" == t && (o["Content-Type"] = "application/x-www-form-urlencoded"), 
            Object.assign({}, o, r);
        }
    } ], [ {
        key: "getReferer",
        value: function(e) {
            var t = e.useCustomRoute, r = "function" == typeof getCurrentPages && getCurrentPages() || [], o = r[r.length - 1] || {}, n = void 0;
            return t && (n = o.customRoute), n || (n = o.route || o.__route__ || "pages/index/index"), 
            "http://wq.jd.com/wxapp/" + n;
        }
    } ]), e;
}();

exports.Task = c;