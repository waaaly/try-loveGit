function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    return t.default = e, t;
}

function t(e, t) {
    var o = t || "", i = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"), u = o.substring(o.indexOf("?") + 1, o.length).match(i);
    return null != u ? u[2] : "";
}

function o(e) {
    var t = s.getCookie("__wga"), o = t ? t.split(".") : [], i = {}, u = o[0] && Date.now() - o[0] <= 18e5;
    i.now = Date.now(), i.now_session_time = u && o[1] ? o[1] : i.now, i.prev_session_time = o[2] ? u ? o[2] : o[1] ? o[1] : i.now : i.now, 
    i.first_session_time = o[3] ? o[3] : i.now, i.page_seq = u && o[4] ? 1 * o[4] + 1 : 1, 
    i.session_seq = o[5] ? u ? o[5] : 1 * o[5] + 1 : 1, o = i.now + "." + i.now_session_time + "." + i.prev_session_time + "." + i.first_session_time + "." + i.page_seq + "." + i.session_seq, 
    s.setCookie({
        data: {
            __wga: {
                value: o,
                maxAge: 3153e3,
                decode: !0
            }
        }
    });
}

function i(e, t) {
    var o = void 0, i = void 0, u = "", a = /PTAG[=,](\d+)\.(\d+)\.(\d+)\D?/gim.exec(e && "ptag=" + e || t);
    if (!(null == a || 4 != a.length || a[1] < 0 || a[2] < 0 || a[3] < 0)) {
        switch (o = a[1] % 1e5, i = a[1] + "." + a[2] + "." + a[3], !0) {
          case o >= 17001 && o < 2e4:
            u = "EA";
            break;

          case o >= 27001 && o < 3e4:
            u = "IA";
            break;

          case o >= 37001 && o < 4e4:
            u = "CT";
            break;

          case o >= 47001 && o < 5e4:
            u = "PD";
            break;

          default:
            u = "";
        }
        u && m(u, i);
    }
}

function u() {
    var e = getApp().scene || "", t = getApp().EA_PTAG || "", o = void 0, i = getApp().referrerInfo || {};
    if ([ 1020, 1035, 1043, "1020", "1035", "1043" ].indexOf(e) > -1) {
        var u = i.appId, a = void 0;
        a = u === c.appidMap.wxdzh ? 1 : u === c.appidMap.wxxzh ? 2 : u && u !== c.appidMap.wxdzh && u !== c.appidMap.wxxzh ? 3 : 0, 
        o = c.appSceneMap[e][a];
    } else if ([ 1036, "1036" ].indexOf(e) > -1) {
        var r = i.appId, n = void 0;
        n = r === c.appidMap.app ? 1 : r && r !== c.appidMap.app ? 2 : 0, o = c.shareCardRDList[n];
    } else o = e && c.SCENE_PTAG_MAP[e] || c.defaultEAPTAG;
    if (t && o && e) {
        var s = t.split("."), _ = o.split(".");
        o = s.length >= 3 && _.length >= 3 && s[0] === _[0] && s[1] === _[1] ? t : o;
    }
    e && o && m("EA", o);
}

function m(e, t) {
    function o(e, t) {
        var o = e + "." + t, i = {
            EA: /EA\.(\d+)\.(\d+)\.(\d+)(\D?)/gim,
            IA: /IA\.(\d+)\.(\d+)\.(\d+)(\D?)/gim,
            CT: /CT\.(\d+)\.(\d+)\.(\d+)(\D?)/gim,
            PD: /PD\.(\d+)\.(\d+)\.(\d+)(\D?)/gim,
            DAP: /DAP\.([^-]*)(-?)/gim,
            FOCUS: /FOCUS\.([^-]*)(-?)/gim,
            MART: /MART\.([^-]*)(-?)/gim,
            QZGDT: /QZGDT\.([^\.\-]+)(-?)/gim,
            QZZTC: /QZZTC\.([^\.\-]+)(-?)/gim,
            ADKEY: /ADKEY\.([^\.\-]+)(-?)/gim,
            UUID: /UUID\.([^\.\-]+)(-?)/gim,
            WDSTAG: /WDSTAG\.([^-]*)(-?)/gim,
            WQVERSION: /WQVERSION\.([^\.\-]+)(-?)/gim,
            GROUP: /GROUP\.([^\.\-]+)(-?)/gim,
            LOGID: /LOGID\.([^-]*)(-?)/gim,
            WQLOGID: /WQLOGID\.([^-]*)(-?)/gim
        }[e];
        i.test(m) ? m = "EA" == e || "IA" == e || "CT" == e || "PD" == e ? m.replace(i, o + "$4") : m.replace(i, o + "$2") : m += 0 == m.length ? o : "-" + o;
    }
    function i() {
        m = m.replace(/-?UUID\.-/g, "-").replace(/^-|-UUID\.$/g, "").replace(/-+/g, "-");
    }
    var u = "object" == (void 0 === e ? "undefined" : n(e)), m = s.getCookie("PPRD_P") || "";
    if (u) {
        for (var a in e) e.hasOwnProperty(a) && o(a, e[a]);
        i(), s.setCookie({
            data: {
                PPRD_P: {
                    value: m,
                    decode: !0,
                    maxAge: 259200
                }
            }
        });
    } else o(e, t), i(), s.setCookie({
        data: {
            PPRD_P: {
                value: m,
                decode: !0,
                maxAge: 259200
            }
        }
    });
}

function a(e, o) {
    function i(e) {
        var t = 1, o = 0, i = void 0;
        if (e) for (t = 0, i = e.length - 1; i >= 0; i--) t = 0 !== (o = 266338304 & (t = (t << 6 & 268435455) + (o = e.charCodeAt(i)) + (o << 14))) ? t ^ o >> 21 : t;
        return t;
    }
    function u() {
        return i(m.replace(/.*?(\w+\.\w+)$/, "$1"));
    }
    var m = _.getDomain(e), a = getApp().scene, n = getApp().utmJdvProps || {}, c = p.SCENE_UTM_MAP[a] || {}, d = getApp().unionJdv, g = !("B" !== c.type || t("utm_source", e) || t("utm_campaign", e) || t("utm_medium", e) || t("utm_term", e)), l = "B" === c.type && n.platform && n.utm_source, f = "direct", v = void 0, h = (s.getCookie("__jdv") || "").split("|"), q = m.replace(/.*?(\w+\.\w+)$/, "$1"), w = o, y = void 0, A = 86400, x = 1 * new Date(), D = !1;
    h.length < 4 ? (y = [ v = u(), "direct", "-", "none", "-", x ].join("|"), s.setCookie({
        data: {
            __jdv: {
                value: y,
                decode: !0,
                maxAge: A
            }
        }
    }), h = [ v, "direct", "-", "none", "-" ]) : h.length > 4 && (v = h[0], f = h[1], 
    h[2], h[3], h[4], "direct" != f && ("direct" == ("A" === c.type ? c.utm_source : l ? n.utm_source : g ? c.utm_source : t("utm_source", e) || r("utm_source")) && (D = !0), 
    d && ("A" === c.type || "A" !== c.type && !l && g) && (D = !0)), g && n && (n.utm_source || n.utm_campaign || n.utm_medium || n.utm_term) && !n.platform && (D = !0));
    var k = [], P = !1, b = "A" === c.type ? c.utm_source : l ? n.utm_source : g ? c.utm_source : t("utm_source", e) || r("utm_source");
    if (!D) if (b) {
        var C = "A" === c.type ? c.utm_campaign : l ? n.utm_campaign : g ? c.utm_campaign : t("utm_campaign", e) || r("utm_campaign"), O = "A" === c.type ? c.utm_medium : l ? n.utm_medium : g ? c.utm_medium : t("utm_medium", e) || r("utm_medium"), I = "A" === c.type ? c.utm_term : l ? n.utm_term : g ? c.utm_term : t("utm_term", e) || r("utm_term");
        k.push(b), k.push(C || "-"), k.push(O || "none"), k.push(I || "-"), P = !0;
    } else {
        var G = "baidu:wd,baidu:word,so.com:q,so.360.cn:q,360so.com:q,360sou.com:q,baidu:q1,m.baidu:word,m.baidu:w,wap.soso:key,m.so:q,page.yicha:key,sz.roboo:q,i.easou:q,wap.sogou:keyword,google:q,soso:w,sogou:query,youdao:q,ucweb:keyword,ucweb:word,114so:kw,yahoo:p,yahoo:q,live:q,msn:q,bing:q,aol:query,aol:q,daum:q,eniro:search_word,naver:query,pchome:q,images.google:q,lycos:query,ask:q,netscape:query,cnn:query,about:terms,mamma:q,voila:rdata,virgilio:qs,alice:qs,yandex:text,najdi:q,seznam:q,search:q,wp:szukaj,onet:qt,szukacz:q,yam:k,kvasir:q,ozu:q,terra:query,rambler:query".split(","), T = !0, E = w && w.split("/")[2];
        if (E && E.indexOf(q) < 0) {
            for (var M = 0; M < G.length; M++) {
                var R = G[M].split(":");
                if (E.indexOf(R[0].toLowerCase()) > -1 && w.indexOf((R[1] + "=").toLowerCase()) > -1) {
                    var j = t(R[1], w);
                    k.push(R[0]), k.push("-"), k.push("organic"), k.push(j || "not set"), T = !1;
                    break;
                }
            }
            T && (E.indexOf("zol.com.cn") > -1 ? (k.push("zol.com.cn"), k.push("-"), k.push("cpc"), 
            k.push("not set")) : (k.push(E), k.push("-"), k.push("referral"), k.push("-")));
        }
        P = k.length > 0 && h.length > 4 && (k[0] !== h[1] || k[1] !== h[2] || k[2] !== h[3]) && "referral" !== k[2];
    }
    P && (y = [ v = h[0] ? h[0] : u(), k[0] || "direct", k[1] || "-", k[2] || "none", k[3] || "-", x ].join("|"), 
    s.setCookie({
        data: {
            __jdv: {
                value: y,
                decode: !0,
                maxAge: A
            }
        }
    }));
}

function r(e, o) {
    var i = {
        17007: {
            utm_source: "direct",
            utm_medium: "weixin",
            utm_campaign: "t_1000072660_17007_001"
        },
        17003: {
            utm_source: "direct",
            utm_medium: "weixin",
            utm_campaign: "t_1000072661_17003_001"
        },
        17020: {
            utm_source: "direct",
            utm_medium: "weixin",
            utm_campaign: "t_1000072661_17003_001"
        },
        17005: {
            utm_source: "weixin",
            utm_medium: "weixin",
            utm_campaign: "t_1000072662_17005_001"
        },
        17048: {
            utm_source: "weixin",
            utm_medium: "weixin",
            utm_campaign: "t_1000072663_17048_001"
        },
        17012: {
            utm_source: "direct",
            utm_medium: "shouq",
            utm_campaign: "t_1000072675_17012_001"
        },
        17008: {
            utm_source: "direct",
            utm_medium: "shouq",
            utm_campaign: "t_1000072676_17008_001"
        },
        17006: {
            utm_source: "shouq",
            utm_medium: "shouq",
            utm_campaign: "t_1000072677_17006_001"
        },
        17064: {
            utm_source: "shouq",
            utm_medium: "shouq",
            utm_campaign: "t_1000072647_17064_001"
        },
        17036: {
            utm_source: "weixin",
            utm_medium: "weixin",
            utm_campaign: "t_1000072670_17036_001"
        },
        17060: {
            utm_source: "weixin",
            utm_medium: "weixin",
            utm_campaign: "t_1000072670_17036_001"
        },
        17027: {
            utm_source: "shouq",
            utm_medium: "shouq",
            utm_campaign: "t_1000072641_17027_001"
        },
        17050: {
            utm_source: "shouq",
            utm_medium: "shouq",
            utm_campaign: "t_1000072643_17050_001"
        }
    }, u = t("ptag", o) || t("PTAG", o), m = t("mp_channel", o), a = t("mp_sourceid", o), r = /(\d+)\.(\d+)\.(\d+)/gi, n = "";
    if (u) {
        var s = r.exec(u);
        s && s[1] && i[s[1]] && (n = i[s[1]][e] || "");
    } else (m || a) && (n = i[17064][e] || "");
    return n;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.setVisitKey = exports.addPPRD_PWithLOGID = exports.setReportCookies = void 0;

var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, s = e(require("../../common/cookie-v2/cookie.js")), _ = e(require("../../common/url_utils")), c = e(require("./Ptag_constants.js")), p = e(require("./Utm_constants")), d = require("../../common/request/request"), g = "//wq.jd.com/mlogin/pvlog/set_visitkey_new";

exports.setReportCookies = function(e, t) {
    o(), a(e, t), i(null, e), u();
}, exports.addPPRD_PWithLOGID = function() {
    m("LOGID", Date.now() + "." + Math.round(2147483647 * Math.random()));
}, exports.setVisitKey = function(e, o) {
    function i(e) {
        return "" != e && /\d+/.test(e) && e > 4294967295;
    }
    function u(e) {
        s.setCookie({
            data: {
                visitkey: {
                    value: e
                }
            }
        });
    }
    _.getDomain(e);
    var m = "";
    return m = t("visitkey", e), i(m) ? (u(m), o(m)) : (m = s.getCookie("visitkey"), 
    i(m) ? o(m) : void d.request.get({
        url: g,
        data: {
            from_domain: "http://wq.jd.com/wxapp",
            t: Date.now(),
            source: 2
        }
    }).then(function(e) {
        var t = e.body, i = t && t.visitkey ? t.visitkey : "";
        i && (console.log("setVisitkey: " + i), u(i)), o && o(i);
    }).catch(function(e) {
        console.error(e), o && o(null);
    }));
};