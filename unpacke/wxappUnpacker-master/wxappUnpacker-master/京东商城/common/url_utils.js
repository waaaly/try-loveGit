function r(r) {
    if (r && r.__esModule) return r;
    var e = {};
    if (null != r) for (var t in r) Object.prototype.hasOwnProperty.call(r, t) && (e[t] = r[t]);
    return e.default = r, e;
}

function e() {
    return "https:";
}

function t(r) {
    return /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/.exec(r);
}

function o(r) {
    var e = t(r);
    return e && {
        source: e[0],
        protocol: e[1],
        slash: e[2],
        host: e[3],
        port: e[4],
        path: e[5],
        query: e[6],
        hash: e[7]
    };
}

function n(r) {
    return "http" == o(r).protocol && (r = r.replace("http", "https")), r;
}

function a(r, e) {
    var t = [];
    for (var o in e) t.push(o + "=" + encodeURIComponent(e[o]));
    return r + (r.indexOf("?") > -1 ? "&" : "?") + t.join("&");
}

function u(r, e) {
    if (!e && getCurrentPages) {
        var t = getCurrentPages();
        return t.length > 0 && t[t.length - 1].$query ? t[t.length - 1].$query[r] : "";
    }
    var o = new RegExp("(^|&)" + r + "=([^&]*)(&|$)", "i"), n = e.substr(e.indexOf("?") + 1).match(o);
    return null != n ? n[2] : "";
}

function s(r, t, u, s) {
    if (r == d.HTTP_CFG_URL) return t == c.default.CHANNEL_HTTP ? r : d.WS_CFG_URL;
    var p = o(r);
    if (p.protocol || (r = e() + r), s || (r = n(r)), t == c.default.CHANNEL_HTTP && s) return "https://wxa.jd.com/api.php?url=" + encodeURIComponent(a(r.replace(/^https/, "http"), u));
    if (f.directHosts.indexOf(p.host) > -1) return r;
    var i = p.host.split(".");
    if (t == c.default.CHANNEL_HTTP) return r.replace(p.host, "wxa.jd.com/" + i[0]);
    var l = "/";
    return "wq.360buyimg.com" === p.host ? l += i[1] : l += i[0], r.replace(new RegExp("http(s)?://" + p.host), l);
}

function p(r) {
    for (var e = 0, t = r.length, o = 5381; e < t; ++e) o += (o << 5) + r.charAt(e).charCodeAt();
    return "0";
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.addUrlParam = exports.addCsrfToken = exports.transToWebsocketUrl = exports.createURL = exports.wxaProxy = exports.removeUrlParam = exports.getUrlParam = exports.getQueryArray = exports.getDomain = exports.changeToHttps = exports.parseURL = void 0;

var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(r) {
    return typeof r;
} : function(r) {
    return r && "function" == typeof Symbol && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
}, f = r(require("./config")), c = function(r) {
    return r && r.__esModule ? r : {
        default: r
    };
}(require("./http_constant")), l = r(require("./cookie-v2/cookie.js")), d = r(require("../api/APIs"));

exports.parseURL = o, exports.changeToHttps = n, exports.getDomain = function(r) {
    return o(r).host;
}, exports.getQueryArray = function(r) {
    var e = void 0, t = o(r).query;
    if (t) {
        e = [];
        for (var n = t.split("&"), a = 0; a < n.length; a++) {
            var u = n[a].indexOf("=");
            e[n[a].substring(0, u)] = n[a].substring(u + 1, n[a].length);
        }
    }
    return e;
}, exports.getUrlParam = u, exports.removeUrlParam = function() {
    for (var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", t = new RegExp("([?#&])" + e + "=[^&#]+([&#]|$)"); t.test(r); ) r = r.replace(t, function(r, e, t) {
        return "&" === t ? e : t;
    });
    return r;
}, exports.wxaProxy = s, exports.createURL = a, exports.transToWebsocketUrl = function(r) {
    if (r.indexOf("api.php") > -1) {
        var e = u("url", r);
        return s(decodeURIComponent(e));
    }
    return r;
}, exports.addCsrfToken = function(r) {
    if ("object" != (void 0 === r ? "undefined" : i(r))) throw new Error("addCsrfToken的'paramObj'参数必须是object");
    var e = l.getCookie("wq_skey");
    e && (r.g_ty = "ls", r.g_tk = p(e));
}, exports.addUrlParam = function(r, e) {
    if (r && e && "object" == (void 0 === e ? "undefined" : i(e))) {
        var t = [];
        for (var o in e) e.hasOwnProperty(o) && t.push(o + "=" + encodeURIComponent(e[o]));
        if (t[0]) {
            var n = t.join("&");
            r = r.indexOf("?") > -1 ? r + "&" + n : r + "?" + n;
        }
    }
    return r;
};