function e(e) {
    if (e && e.__esModule) return e;
    var o = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (o[t] = e[t]);
    return o.default = e, o;
}

function o(e) {
    console.log("getJSToken:");
    var r = i.getCookie("wid"), c = i.getCookie("wq_skey");
    t.get("http://wq.jd.com/pinbind/GetJsFunction?wq_uin=" + r + "&wq_skey=" + c + "&_t=" + Math.round(2147483647 * Math.random()), {}, {
        success: function(t) {
            if (13 == t.retcode) return n.doLogin().then(function() {
                o(e);
            }).catch(function(o, t) {
                "function" == typeof e && e(-1, {});
            }), !1;
            0 == t.retcode ? (console.log(t.func), t.func(t.token), "function" == typeof e && e(0, t)) : "function" == typeof e && e(-1, {});
        },
        fail: function(o) {
            "function" == typeof e && e(-1, {});
        }
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getJSToken = void 0;

var t = e(require("../http_json.js")), n = e(require("../login/login.js")), i = e(require("../cookie-v2/cookie.js"));

exports.getJSToken = o;