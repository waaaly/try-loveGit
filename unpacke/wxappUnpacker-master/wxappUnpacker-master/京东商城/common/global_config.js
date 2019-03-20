function e() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = f || {};
    for (var o in e) if ("time" !== o) {
        "object" !== n(f[o]) && (f[o] = {}), t[o] = Object.assign({}, f[o]);
        for (var r in e[o]) t[o][r] = Object.assign({}, f[o][r], e[o][r]);
    }
    return t;
}

function t() {
    return s || (s = o()), s;
}

function o() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
    return arguments.length > 1 && void 0 !== arguments[1] && arguments[1] && (l = 0), 
    new r.default(function(o, n) {
        (0, i.request)({
            url: "https://wq.jd.com/wxappconf/GetConf",
            data: {
                UseScope: 0,
                Business: t,
                UpTime: l
            }
        }).then(function(t) {
            var n = t.body;
            console.log("[GLOBAL CONFIG] 配置文件更新成功", n), l = n.time, f = e(n), (0, u.umpBiz)({
                bizid: 777,
                operation: 104,
                result: 0
            }), o();
        }).catch(function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.code, n = e.message, r = e.detail;
            console.warn("[GLOBAL CONFIG] 配置文件拉取失败", e), (0, u.umpBiz)({
                bizid: 777,
                operation: 104,
                result: t || 1,
                message: JSON.stringify(r || n)
            }), o();
        });
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.globalConfigGet = exports.globalConfigUpdate = exports.globalConfigInit = void 0;

var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../libs/promise.min.js")), i = require("request/request.js"), u = require("fe_report/usability.js"), s = void 0, f = {}, l = 0;

exports.globalConfigInit = t, exports.globalConfigUpdate = o, exports.globalConfigGet = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
    return e ? t().then(function() {
        if (!f[e]) return o(e);
    }).then(function() {
        return f[e] || {};
    }) : t().then(function() {
        if (!Object.keys(f).length) return o(e);
    }).then(function() {
        return f;
    });
};