function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t() {
    for (var e = "", t = 1; t <= 32; t++) e += Math.floor(16 * Math.random()).toString(16), 
    8 != t && 12 != t && 16 != t && 20 != t || (e += "-");
    return e += "-" + Date.parse(new Date()) / 1e3;
}

function o(e, o, n) {
    return n ? (n = n.split("_")[0], o = Number(o + 1), n + "_" + o + "_" + e) : (n = l.default.hexMD5(t())) + "_" + o + "_" + e;
}

function n(e) {
    return "[object Array]" === Object.prototype.toString.call(e);
}

function i(e, t) {
    var o = [];
    return t.forEach(function(t) {
        var i = null;
        i = n(t) ? {
            key: t[0],
            value: n(e[t[1]]) ? e[t[1]].join(";") : e[t[1]] || "unknown"
        } : {
            key: t,
            value: n(e[t]) ? e[t].join(";") : e[t] || "unknown"
        }, o.push(i);
    }), o;
}

function s(e) {
    return new w.default(function(t, o) {
        e.method({
            complete: function(o) {
                var n = i(o, e.infos);
                t(n);
            }
        });
    });
}

function r() {
    return _.filter(function(e) {
        return e.method;
    }).map(function(e) {
        return s(e);
    });
}

function a(e) {
    var o = [ "brand", "model", "pixelRatio", "screenWidth", "screenHeight", "system", "platform" ];
    b || (b = t(), d.setCookie({
        data: {
            shshshfpa: {
                value: b,
                maxAge: 3153e3
            }
        }
    }));
    var n = e.reduce(function(e, t) {
        return o.indexOf(t.key) > -1 ? e + t.value + "," : e + "";
    }, "");
    j = l.default.hexMD5(n.substring(0, n.length - 1)), d.setCookie({
        data: {
            shshshfp: {
                value: j,
                maxAge: 3153e3
            }
        }
    });
}

function u(e) {
    var t = {
        browser_info: j,
        client_time: new Date().getTime(),
        period: 24,
        shshshfpa: b,
        whwswswws: x,
        msdk_version: "2.1.1",
        cookie_pin: y,
        visitkey: d.getCookie("visitkey"),
        wid: d.getCookie("wq_uin"),
        open_id: d.getCookie("open_id"),
        nickName: d.getCookie("nickName"),
        avatarUrl: d.getCookie("avatarUrl")
    };
    e.map(function(e) {
        t[e.key] = e.value;
    }), f({
        appname: "jdwebm_xcx",
        jdkey: "",
        whwswswws: x,
        businness: v,
        body: t
    }, "hf");
}

function h() {
    if (C) {
        var e = Number(C.split("_")[1]);
        C = o(new Date().getTime(), e, C), d.setCookie({
            data: {
                shshshsID: {
                    value: escape(C),
                    maxAge: 1800
                }
            }
        });
    } else C = o(new Date().getTime(), 1), d.setCookie({
        data: {
            shshshsID: {
                value: escape(C),
                maxAge: 1800
            }
        }
    });
    var t = "function" == typeof getCurrentPages ? getCurrentPages() : [], n = t && t.length ? t[t.length - 1].route || t[t.length - 1].__route__ : "pages/index/index", i = {
        sid: C.split("_")[0],
        squence: C.split("_")[1],
        create_time: C.split("_")[2],
        shshshfpa: b,
        whwswswws: x,
        browser_info: j || d.getCookie("shshshfp"),
        page_name: "http://wq.jd.com/" + k + "/" + n,
        msdk_version: "2.1.1",
        cookie_pin: y,
        wid: d.getCookie("wq_uin")
    };
    f({
        appname: "jdwebm_pv",
        jdkey: "",
        whwswswws: x,
        businness: v,
        body: i
    }, "pv");
}

function c(e) {
    a(e), u(e), h();
}

function f(e, t) {
    var o = [ "成功", "无效的接口名称", "网络接收出错", "数据出错", "创建软指纹失败", "无效的软指纹", "空的软指纹" ], n = {
        url: "https://blackhole.m.jd.com/getinfo",
        data: {
            body: JSON.stringify(e)
        },
        method: "POST",
        priority: "REPORT"
    };
    (0, p.request)(n).then(function(e) {
        var n = e.body;
        e.header;
        0 == n.code && ("hf" == t && d.setCookie({
            data: {
                shshshfpb: {
                    value: n.whwswswws,
                    maxAge: 3153e3
                }
            }
        }), "hf" == t && d.setCookie({
            data: {
                hf_time: {
                    value: new Date().getTime(),
                    maxAge: 3153e3
                }
            }
        })), g.info(o[n.code]);
    }, function(e) {
        var t = e.code;
        e.message;
        g.error(t);
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Jdwebm = void 0;

var d = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    return t.default = e, t;
}(require("./cookie-v2/cookie.js")), l = e(require("../libs/md5.js")), p = require("./request/request.js"), w = e(require("../libs/promise.min.js")), g = new (require("./logger.js").Logger)("jdwebm"), m = 2 == d.getCookie("wxapp_type"), v = m ? "wechat_pgxcx" : "wechat_xcx", k = m ? "wxpgapp" : "wxapp", _ = [ {
    method: wx.getScreenBrightness,
    infos: [ [ "screenBrightness", "value" ] ]
}, {
    method: wx.getSystemInfo,
    infos: [ "brand", "model", "pixelRatio", "screenWidth", "screenHeight", "windowWidth", "windowHeight", "language", "version", "system", "platform", "fontSizeSetting", "SDKVersion" ]
}, {
    method: wx.getNetworkType,
    infos: [ "networkType" ]
} ], b = d.getCookie("shshshfpa"), x = d.getCookie("shshshfpb"), y = d.getCookie("jdpin") || d.getCookie("pin"), C = d.getCookie("shshshsID"), j = void 0;

exports.Jdwebm = function() {
    var e = new Date();
    if (e.setHours(0, 0, 0, 0), e = e.getTime(), (d.getCookie("hf_time") || 0) < e) {
        var t = r();
        w.default.all(t).then(function(e) {
            var t = [ {
                key: "bluetooth",
                value: ""
            } ], o = [ {
                key: "beacons",
                value: ""
            } ];
            c((e = e.concat(t, o)).reduce(function(e, t) {
                return e.concat(t);
            }, []));
        }).catch(function(e) {
            console.log(e);
        });
    } else h();
};