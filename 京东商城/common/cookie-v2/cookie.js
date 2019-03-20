function e(e) {
    this.key = e.key, this.value = e.value, this.expires = e.expires || s();
}

function o(o) {
    p[o.key] = JSON.parse(JSON.stringify(new e(o)));
}

function t(e) {
    Object.keys(e).forEach(function(t) {
        o(e[t]);
    });
}

function r(e) {
    if (p[e]) return n(e), p[e];
}

function n(e) {
    i(p[e].expires) && (console.log("发现过期的key", e), delete p[e], a(p));
}

function i(e) {
    return "session" !== e && (new Date(e) <= new Date() || void 0);
}

function a(e, o) {
    v.set("cookies", e).then(function(e) {
        o && o(null, e);
    }, function(e) {
        console.error("保存cookie出错", e), o && o(e);
    });
}

function c(e) {
    var o = !1;
    if (Object.keys(e).forEach(function(e) {
        e.match(/\./) && (o = !0);
    }), !o) return e;
    var t = {};
    return Object.keys(e).forEach(function(o) {
        Object.keys(e[o]).forEach(function(r) {
            var n = e[o][r];
            "Invalid Date" == new Date(n.date) && console.warn("cookie convert warning--\x3e", o, r, n), 
            t[r] = {
                key: r,
                expires: n.date,
                value: n.value
            };
        });
    }), console.log("转换后的新版本cookie", t), t;
}

function s(e) {
    var o = e || 31536e6;
    return new Date(new Date().getTime() + o).toGMTString();
}

function u(e) {
    function o(e) {
        r = !0, console.error(e);
    }
    var t = {}, r = !1;
    if (Object.keys(e).forEach(function(r) {
        var n = e[r];
        if (r.match(/\./)) return o("cookie字段名不合法:" + r);
        if (void 0 === n.value) return o("cookie值为undefined:" + r);
        if (n.decode && (n.value = decodeURIComponent(n.value)), n.expires || (n.expires = s()), 
        "Invalid Date" == new Date(n.expires)) return o("cookie的过期时间格式错误:" + r);
        n.maxAge && ("number" == typeof n.maxAge || n.maxAge.match(/\d+/)) && (n.expires = s(1e3 * n.maxAge));
        var i = {};
        i.key = r, i.value = n.value, i.expires = new Date(n.expires).toGMTString(), i.value ? t[r] = i : console.warn("cookie checkAndFormat error,cookie值为空字符串", i.key, i.value);
    }), !r) return t;
}

function f(e) {
    var o = [];
    return Object.keys(e).forEach(function(t) {
        o.push(t + "=" + encodeURIComponent(e[t].value));
    }), o.join(";");
}

function l(e) {
    var o = {};
    return Object.keys(e).forEach(function(t) {
        var r = e[t];
        if ("string" != typeof r && "number" != typeof r) console.warn("setCookie fastFormat error 非法value", r); else {
            var n = {};
            n.key = t, n.value = r, n.expires = s(), o[t] = n;
        }
    }), o;
}

function k(e) {
    if (!e || !e.data) return console.error("setCookie 参数错误:没有数据");
    return (e.defaultExpires ? l(e.data) : u(e.data)) || console.error("setCookie数据错误,数据不合法");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.setCookieInHeader = exports.removeCookie = exports.setCookies = exports.setCookie = exports.getCookie = void 0;

var v = function(e) {
    if (e && e.__esModule) return e;
    var o = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (o[t] = e[t]);
    return o.default = e, o;
}(require("../localStorage.js")), p = function() {
    console.info("初始化cookie，应只在启动应用时执行一次");
    var e;
    try {
        e = v.getSync("cookies");
    } catch (e) {
        console.error("cookie初始化读取失败:", e);
    }
    return e && a(e = c(e), function(e, o) {
        console.log("toLocal", e, o);
    }), e || {};
}(), d = {};

d.getCookie = function(e) {
    if (!e) return f(p);
    if ("string" == typeof e) {
        var o = r(e);
        return o ? o.value : (console.info("获取的cookie字段不存在或已过期:", e), "");
    }
}, d.setCookies = function(e) {
    var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {};
    if ("[object Object]" === Object.prototype.toString.call(e)) return d.setCookie(Object.assign(e, {
        cb: o
    }));
    if (Array.isArray(e)) {
        var r = 0;
        e.forEach(function(e) {
            (e = k(e)) && (t(e), r++);
        }), r && a(p, o);
    }
}, d.setCookie = function(e) {
    var o = k(e);
    o && (t(o), a(p, e.cb));
}, d.setCookieInHeader = function(e) {
    if (e.header && e.header["set-cookie"] && e.header["set-cookie"].length) {
        var o = {};
        e.header["set-cookie"].forEach(function(e) {
            var t = e.split(";"), r = {};
            r.kvs = t.shift();
            var n = r.kvs.split("=");
            if (2 != n.length) return console.error("cookie value error ", r.kvs);
            t.forEach(function(e) {
                return e.match(/^\s*Expires=/i) ? r.expires = new Date(e.split("=")[1]) : e.match(/^\s*Max-age=/i) ? r.maxAge = e.split("=")[1] : void 0;
            }), o[n[0]] = {
                key: n[0],
                value: n[1],
                expires: r.expires,
                maxAge: r.maxAge
            };
        }), d.setCookie({
            data: o,
            cb: e.cb
        });
    }
}, d.removeCookie = function(e) {
    e.forEach(function(e) {
        delete p[e];
    }), a(p);
};

exports.getCookie = d.getCookie, exports.setCookie = d.setCookie, exports.setCookies = d.setCookies, 
exports.removeCookie = d.removeCookie, exports.setCookieInHeader = d.setCookieInHeader;

exports.default = d;