function e(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
    return r.default = e, r;
}

function r() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    return Object.keys(e).map(function(r) {
        return r + "=" + (null == e[r] ? "" : e[r]);
    }).join("&");
}

function o(e) {
    var r = t(), o = "", n = Date.now(), u = a.getCookie("visitkey") || "", i = e;
    return o = r.hex_md5(u + n + i), [ "122270672", o, n, n, n, 1 ].join(".");
}

function t() {
    function e(e) {
        for (var r = d.hexcase ? "0123456789ABCDEF" : "0123456789abcdef", o = "", t = 0; t < 4 * e.length; t++) o += r.charAt(e[t >> 2] >> t % 4 * 8 + 4 & 15) + r.charAt(e[t >> 2] >> t % 4 * 8 & 15);
        return o;
    }
    function r(e, r) {
        e[r >> 5] |= 128 << r % 32, e[14 + (r + 64 >>> 9 << 4)] = r;
        for (var o = 1732584193, s = -271733879, c = -1732584194, d = 271733878, l = 0; l < e.length; l += 16) {
            var m = o, h = s, g = c, p = d;
            s = a(s = a(s = a(s = a(s = u(s = u(s = u(s = u(s = n(s = n(s = n(s = n(s = t(s = t(s = t(s = t(s, c = t(c, d = t(d, o = t(o, s, c, d, e[l + 0], 7, -680876936), s, c, e[l + 1], 12, -389564586), o, s, e[l + 2], 17, 606105819), d, o, e[l + 3], 22, -1044525330), c = t(c, d = t(d, o = t(o, s, c, d, e[l + 4], 7, -176418897), s, c, e[l + 5], 12, 1200080426), o, s, e[l + 6], 17, -1473231341), d, o, e[l + 7], 22, -45705983), c = t(c, d = t(d, o = t(o, s, c, d, e[l + 8], 7, 1770035416), s, c, e[l + 9], 12, -1958414417), o, s, e[l + 10], 17, -42063), d, o, e[l + 11], 22, -1990404162), c = t(c, d = t(d, o = t(o, s, c, d, e[l + 12], 7, 1804603682), s, c, e[l + 13], 12, -40341101), o, s, e[l + 14], 17, -1502002290), d, o, e[l + 15], 22, 1236535329), c = n(c, d = n(d, o = n(o, s, c, d, e[l + 1], 5, -165796510), s, c, e[l + 6], 9, -1069501632), o, s, e[l + 11], 14, 643717713), d, o, e[l + 0], 20, -373897302), c = n(c, d = n(d, o = n(o, s, c, d, e[l + 5], 5, -701558691), s, c, e[l + 10], 9, 38016083), o, s, e[l + 15], 14, -660478335), d, o, e[l + 4], 20, -405537848), c = n(c, d = n(d, o = n(o, s, c, d, e[l + 9], 5, 568446438), s, c, e[l + 14], 9, -1019803690), o, s, e[l + 3], 14, -187363961), d, o, e[l + 8], 20, 1163531501), c = n(c, d = n(d, o = n(o, s, c, d, e[l + 13], 5, -1444681467), s, c, e[l + 2], 9, -51403784), o, s, e[l + 7], 14, 1735328473), d, o, e[l + 12], 20, -1926607734), c = u(c, d = u(d, o = u(o, s, c, d, e[l + 5], 4, -378558), s, c, e[l + 8], 11, -2022574463), o, s, e[l + 11], 16, 1839030562), d, o, e[l + 14], 23, -35309556), c = u(c, d = u(d, o = u(o, s, c, d, e[l + 1], 4, -1530992060), s, c, e[l + 4], 11, 1272893353), o, s, e[l + 7], 16, -155497632), d, o, e[l + 10], 23, -1094730640), c = u(c, d = u(d, o = u(o, s, c, d, e[l + 13], 4, 681279174), s, c, e[l + 0], 11, -358537222), o, s, e[l + 3], 16, -722521979), d, o, e[l + 6], 23, 76029189), c = u(c, d = u(d, o = u(o, s, c, d, e[l + 9], 4, -640364487), s, c, e[l + 12], 11, -421815835), o, s, e[l + 15], 16, 530742520), d, o, e[l + 2], 23, -995338651), c = a(c, d = a(d, o = a(o, s, c, d, e[l + 0], 6, -198630844), s, c, e[l + 7], 10, 1126891415), o, s, e[l + 14], 15, -1416354905), d, o, e[l + 5], 21, -57434055), c = a(c, d = a(d, o = a(o, s, c, d, e[l + 12], 6, 1700485571), s, c, e[l + 3], 10, -1894986606), o, s, e[l + 10], 15, -1051523), d, o, e[l + 1], 21, -2054922799), c = a(c, d = a(d, o = a(o, s, c, d, e[l + 8], 6, 1873313359), s, c, e[l + 15], 10, -30611744), o, s, e[l + 6], 15, -1560198380), d, o, e[l + 13], 21, 1309151649), c = a(c, d = a(d, o = a(o, s, c, d, e[l + 4], 6, -145523070), s, c, e[l + 11], 10, -1120210379), o, s, e[l + 2], 15, 718787259), d, o, e[l + 9], 21, -343485551), 
            o = i(o, m), s = i(s, h), c = i(c, g), d = i(d, p);
        }
        return Array(o, s, c, d);
    }
    function o(e, r, o, t, n, u) {
        return i(s(i(i(r, e), i(t, u)), n), o);
    }
    function t(e, r, t, n, u, a, i) {
        return o(r & t | ~r & n, e, r, u, a, i);
    }
    function n(e, r, t, n, u, a, i) {
        return o(r & n | t & ~n, e, r, u, a, i);
    }
    function u(e, r, t, n, u, a, i) {
        return o(r ^ t ^ n, e, r, u, a, i);
    }
    function a(e, r, t, n, u, a, i) {
        return o(t ^ (r | ~n), e, r, u, a, i);
    }
    function i(e, r) {
        var o = (65535 & e) + (65535 & r);
        return (e >> 16) + (r >> 16) + (o >> 16) << 16 | 65535 & o;
    }
    function s(e, r) {
        return e << r | e >>> 32 - r;
    }
    function c(e) {
        for (var r = Array(), o = (1 << d.chrsz) - 1, t = 0; t < e.length * d.chrsz; t += d.chrsz) r[t >> 5] |= (e.charCodeAt(t / d.chrsz) & o) << t % 32;
        return r;
    }
    var d = {};
    return d.hexcase = 0, d.b64pad = "", d.chrsz = 8, d.hex_md5 = function(o) {
        return e(r(c(o), o.length * d.chrsz));
    }, d.binl2hex = e, d.core_md5 = r, d;
}

function n(e, r, o) {
    function t(e) {
        var r, o = 1, t = 0;
        if (e) for (o = 0, r = e.length - 1; r >= 0; r--) o = 0 !== (t = 266338304 & (o = (o << 6 & 268435455) + (t = e.charCodeAt(r)) + (t << 14))) ? o ^ t >> 21 : o;
        return o;
    }
    function n() {
        return t(d.replace(/.*?(\w+\.\w+)$/, "$1"));
    }
    var i, c, d = s.getDomain(e), l = "direct", m = (a.getCookie("__jdv") || "").split("|"), h = d.replace(/.*?(\w+\.\w+)$/, "$1"), g = r, p = 86400, _ = 1 * new Date(), f = !1;
    m.length < 4 ? (c = [ i = n(), "direct", "-", "none", "-", _ ].join("|"), a.setCookie({
        data: {
            __jdv: {
                value: c,
                decode: !0,
                maxAge: p
            }
        }
    }), m = [ i, "direct", "-", "none", "-" ]) : m.length > 4 && (i = m[0], l = m[1], 
    m[2], m[3], m[4], "direct" != l && "direct" == (u("utm_source", e) || o.utm_source) && (f = !0));
    var q = [], v = !1, w = u("utm_source", e) || o.utm_source;
    if (!f) if (w) {
        var y = u("utm_campaign", e) || o.utm_campaign, k = u("utm_medium", e) || o.utm_medium, x = u("utm_term", e) || o.utm_term;
        q.push(w), q.push(y || "-"), q.push(k || "none"), q.push(x || "-"), v = !0;
    } else {
        var b = "baidu:wd,baidu:word,so.com:q,so.360.cn:q,360so.com:q,360sou.com:q,baidu:q1,m.baidu:word,m.baidu:w,wap.soso:key,m.so:q,page.yicha:key,sz.roboo:q,i.easou:q,wap.sogou:keyword,google:q,soso:w,sogou:query,youdao:q,ucweb:keyword,ucweb:word,114so:kw,yahoo:p,yahoo:q,live:q,msn:q,bing:q,aol:query,aol:q,daum:q,eniro:search_word,naver:query,pchome:q,images.google:q,lycos:query,ask:q,netscape:query,cnn:query,about:terms,mamma:q,voila:rdata,virgilio:qs,alice:qs,yandex:text,najdi:q,seznam:q,search:q,wp:szukaj,onet:qt,szukacz:q,yam:k,kvasir:q,ozu:q,terra:query,rambler:query".split(","), j = !0, z = g && g.split("/")[2];
        if (z && z.indexOf(h) < 0) {
            for (var C = 0; C < b.length; C++) {
                var A = b[C].split(":");
                if (z.indexOf(A[0].toLowerCase()) > -1 && g.indexOf((A[1] + "=").toLowerCase()) > -1) {
                    var O = u(A[1], g);
                    q.push(A[0]), q.push("-"), q.push("organic"), q.push(O || "not set"), j = !1;
                    break;
                }
            }
            j && (z.indexOf("zol.com.cn") > -1 ? (q.push("zol.com.cn"), q.push("-"), q.push("cpc"), 
            q.push("not set")) : (q.push(z), q.push("-"), q.push("referral"), q.push("-")));
        }
        v = q.length > 0 && m.length > 4 && (q[0] !== m[1] || q[1] !== m[2] || q[2] !== m[3]) && "referral" !== q[2];
    }
    v && (c = [ i = m[0] ? m[0] : n(), q[0] || "direct", q[1] || "-", q[2] || "none", q[3] || "-", _ ].join("|"), 
    a.setCookie({
        data: {
            __jdv: {
                value: c,
                decode: !0,
                maxAge: p
            }
        }
    }));
}

function u(e, r) {
    var o = r || "", t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"), n = o.substring(o.indexOf("?") + 1, o.length).match(t);
    return null != n ? n[2] : "";
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.reportGDT = void 0;

var a = e(require("../common/cookie-v2/cookie.js")), i = require("../common/request/request.js"), s = e(require("../common/url_utils"));

exports.reportGDT = function(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, u = t.gdt_vid, s = t.gaid, c = t.gsid;
    if (e) {
        var d = getCurrentPages(), l = "";
        if (d && !(d.length < 1)) {
            l = d[d.length - 1].route || d[d.length - 1].__route__;
            var m = {
                utm_source: "jdzt_wxsq_refer_null",
                utm_medium: "weixin_shouq",
                utm_campaign: 1 == e ? "t_256716187_1" : "t_1000072653_1",
                utm_term: u || "",
                gaid: s || "",
                gsid: c || ""
            }, h = l + "?" + r(m), g = h, p = a.getCookie("__jda"), _ = a.getCookie("open_id"), f = a.getCookie("pin");
            p || (p = o(l), a.setCookie({
                data: {
                    __jda: {
                        value: p,
                        maxAge: 259200
                    }
                }
            }));
            var q = "";
            d.length >= 2 && (q = d[d.length - 2].__route__), n(h, q, m), i.request.get({
                url: "https://addata.jd.com/fcgi-bin/rpttraceinfo",
                data: {
                    turl: g,
                    gdt_vid: u || "",
                    __jda: p,
                    wxoid: _,
                    upin: f,
                    t: +new Date()
                },
                dataType: "text",
                priority: "REPORT"
            }).then(function(e) {
                var r = e.body;
                console.log("reportGDT return json: "), console.log(r);
            }, function(e) {
                var r = e.code, o = e.message;
                console.log("reportGDT error: "), console.log(r, o);
            });
        }
    }
};