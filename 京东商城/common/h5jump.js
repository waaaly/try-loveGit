function a(a) {
    if (a && a.__esModule) return a;
    var e = {};
    if (null != a) for (var t in a) Object.prototype.hasOwnProperty.call(a, t) && (e[t] = a[t]);
    return e.default = a, e;
}

function e(a) {
    if (Array.isArray(a)) {
        for (var e = 0, t = Array(a.length); e < a.length; e++) t[e] = a[e];
        return t;
    }
    return Array.from(a);
}

function t(a, e, t) {
    return e in a ? Object.defineProperty(a, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[e] = t, a;
}

function r(a) {
    var e = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).v, t = "https://wq.360buyimg.com/data/ppms/js/ppms.page" + (void 0 === e || e ? "v" : "") + a + ".jsonp";
    return new c.default(function(a, e) {
        (0, u.request)({
            url: t,
            retry: 1
        }).then(function(e) {
            var t = e.body;
            a(t.data);
        }, function(a) {
            e(a);
        });
    });
}

function p() {
    var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
    return a.indexOf("?") === a.lastIndexOf("?") && a.indexOf("#") === a.lastIndexOf("#") && (a.indexOf("?") <= a.indexOf("#") || -1 === a.indexOf("#"));
}

function s(a) {
    if (-1 != a.indexOf("//pro.m.jd.com") || -1 != a.indexOf("//h5.m.jd.com") || -1 != a.indexOf("//h5static.m.jd.com") || -1 != a.indexOf("//sale.jd.com")) {
        var e = void 0, t = void 0, r = void 0;
        r = (e = (a = a.replace("//pro.m.jd.com/wq/", "//pro.m.jd.com/mini/")).split("#"))[1] || "", 
        -1 != (t = (e = e[0].split("?"))[1] || "").indexOf("wxAppName=") ? t = t.replace(/wxAppName=[^&]*/, "wxAppName=jd") : t += (t && "&" != t.substr(-1) ? "&" : "") + "wxAppName=jd", 
        a = e[0] + "?" + t + (r ? "#" + r : "");
    }
    return a;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.addParamsToH5Url = exports.switchUrl = exports.updateCookie = exports.removeH5Params = exports.getWxaUrl = void 0;

var i = function() {
    function a(a, e) {
        var t = [], r = !0, p = !1, s = void 0;
        try {
            for (var i, n = a[Symbol.iterator](); !(r = (i = n.next()).done) && (t.push(i.value), 
            !e || t.length !== e); r = !0) ;
        } catch (a) {
            p = !0, s = a;
        } finally {
            try {
                !r && n.return && n.return();
            } finally {
                if (p) throw s;
            }
        }
        return t;
    }
    return function(e, t) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return a(e, t);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), n = Object.assign || function(a) {
    for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (a[r] = t[r]);
    }
    return a;
}, o = a(require("./utils.js")), l = a(require("./cookie-v2/cookie.js")), u = require("./request/request.js"), c = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}(require("../libs/promise.min.js")), d = require("./url_utils"), g = [ "ptag", "pps" ], m = 2 == l.getCookie("wxapp_type"), h = {
    "wqitem.jd.com/item/view": {
        params: {
            sku: "sku",
            ptag: "ptag",
            channelkey: "channelkey",
            channelvalue: "channelvalue"
        },
        url: "/pages/item/detail/detail"
    },
    "wq.jd.com/mcoss/wxportal/mainentry": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/index/index"
    },
    "wqs.jd.com/portal/wx/seckill_v2/index.shtml": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/seckill/index/index"
    },
    "wqs.jd.com/portal/wx/seckill_v2/category.shtml": {
        params: {
            cgid: "seckill_cgid",
            ptag: "ptag"
        },
        url: "/pages/seckill/category/category"
    },
    "wqs.jd.com/portal/wx/seckill_v2/brand.shtml": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/seckill/brand/brand"
    },
    "wqs.jd.com/portal/wx/seckill_v2/cate.shtml": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/seckill/cate/cate"
    },
    "wqs.jd.com/portal/wx/seckill_v2/branddetail.shtml": {
        params: {
            id: "brandid",
            ptag: "ptag",
            pretime: "pretime",
            ing: "type"
        },
        wxaPrams: {
            pageType: "brand"
        },
        url: "/pages/seckill/detail/detail"
    },
    "wqs.jd.com/portal/wx/seckill_v2/catedetail.shtml": {
        params: {
            id: "brandid",
            ptag: "ptag",
            pretime: "pretime",
            ing: "type"
        },
        wxaPrams: {
            pageType: "cate"
        },
        url: "/pages/seckill/detail/detail"
    },
    "wqs.jd.com/portal/wx/seckill_v3/index.shtml": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/seckill/index/index"
    },
    "wqs.jd.com/portal/wx/seckill_v3/category.shtml": {
        params: {
            cgid: "seckill_cgid",
            ptag: "ptag"
        },
        url: "/pages/seckill/category/category"
    },
    "wqs.jd.com/portal/wx/seckill_v3/brand.shtml": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/seckill/brand/brand"
    },
    "wqs.jd.com/portal/wx/seckill_v3/cate.shtml": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/seckill/cate/cate"
    },
    "wqs.jd.com/portal/wx/seckill_v3/branddetail.shtml": {
        params: {
            id: "brandid",
            ptag: "ptag",
            pretime: "pretime",
            ing: "type"
        },
        wxaPrams: {
            pageType: "brand"
        },
        url: "/pages/seckill/detail/detail"
    },
    "wqs.jd.com/portal/wx/seckill_v3/catedetail.shtml": {
        params: {
            id: "brandid",
            ptag: "ptag",
            pretime: "pretime",
            ing: "type"
        },
        wxaPrams: {
            pageType: "cate"
        },
        url: "/pages/seckill/detail/detail"
    },
    "wqdeal.jd.com/deal/mshopcart/mycart": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/cart/cart/index"
    },
    "wqs.jd.com/portal/wx/category_m.shtml": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/cate/cate"
    },
    "wqs.jd.com/my/coupon/coupon_center_v3_wx.shtml": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/couponv4/index/index"
    },
    "wqsou.jd.com/search/searchn": {
        params: {
            key: "key",
            ptag: "ptag"
        },
        url: "/pages/search/list/list"
    },
    "wq.jd.com/search/searchco": {
        params: {
            coupon_batch: "batch",
            coupon_kind: "kind",
            ptag: "ptag"
        },
        url: "/pages/search/subPackages/coupon/coupon"
    },
    "wqs.jd.com/my/indexv2.shtml": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/my/index/index"
    },
    "wqs.jd.com/order/orderlist_merge.shtml": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/order/list/list"
    },
    "wqs.jd.com/portal/wx/tuan/pingouv3.shtml": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/pingou/index/index"
    },
    "wqs.jd.com/my/coupon/index.shtml": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/my/coupon/coupon"
    },
    "wqs.jd.com/promote/201801/bean/index.html": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/bean/index/index"
    },
    "wi.jd.com/fcgi-bin/goods_view": {
        params: {
            sku: "sku"
        },
        url: "/pages/adpage/item/item"
    },
    "wqdeal.jd.com/deal/confirmorder/adview": {
        params: {
            sku: "sku"
        },
        url: "/pages/aditem/index"
    },
    "wqs.jd.com/pingou/my.shtml": {
        params: {
            ptag: "ptag"
        },
        url: "/pages/pingou/my/my"
    },
    "wqs.jd.com/pingou/tuan99v2.shtml": {
        params: {
            sku: "sku"
        },
        url: "/pages/pingou_second/tuan99v2/tuan99v2"
    },
    "wqs.jd.com/portal/wx/tuan/pingou_list.shtml": {
        params: {
            sku: "sku"
        },
        url: "/pages/pingou_second/bipin/index"
    }
}, v = {
    "/pages/store/index/index": {
        params: {
            venderId: "venderId",
            ptag: "ptag"
        },
        url: "https://wqshop.jd.com/mshop/gethomepage"
    }
}, x = {
    "/pages/pingou/index/index": {
        params: {
            ptag: "ptag",
            cateid: "cateid"
        },
        url: "https://wqs.jd.com/portal/wx/tuan/pingouv3.shtml"
    },
    "/pages/pingou_second/miandanindex/index": {
        params: {
            ptag: "ptag",
            cateid: "cateid"
        },
        url: "https://wqs.jd.com/pingou/free_order/index.shtml"
    },
    "/pages/pingou/rule/index": {
        params: {
            ptag: "ptag",
            skuid: "skuid"
        },
        url: "https://wqs.jd.com/pingou/rule.shtml"
    },
    "/pages/pingou/cate/cate": {
        params: {
            ptag: "ptag"
        },
        url: "https://wqs.jd.com/wxsq_project/wqvue/pingou_cate/cate.html"
    },
    "/pages/pingou_second/miandanrule/index": {
        params: {
            ptag: "ptag"
        },
        url: "https://wqs.jd.com/pingou/pingou_rule_free.shtml"
    },
    "/pages/pingou_second/search/search": {
        params: {
            ptag: "ptag"
        },
        url: "https://wqs.jd.com/wxsq_project/wqvue/pingou_search/search.html"
    },
    "/pages/pingou/my/my": {
        params: {
            ptag: "ptag"
        },
        url: "https://wqs.jd.com/pingou/my.shtml"
    },
    "/pages/pingou/brand/index": {
        params: {
            ptag: "ptag"
        },
        url: "https://wqs.jd.com/portal/wx/tuan/pinggou_pinpaituanV2.shtml"
    },
    "/pages/pingou_second/brand/index": {
        params: {
            ptag: "ptag"
        },
        url: "https://wqs.jd.com/portal/wx/tuan/pinggou_pinpaituanV2.shtml"
    },
    "/pages/pingou/brand/detail": {
        params: {
            ptag: "ptag",
            sku: "sku",
            pps: "pps"
        },
        url: "https://wqs.jd.com/portal/wx/tuan/pingou_branddetail.shtml"
    },
    "/pages/pingou_second/brand/detail": {
        params: {
            ptag: "ptag",
            sku: "sku",
            pps: "pps"
        },
        url: "https://wqs.jd.com/portal/wx/tuan/pingou_branddetail.shtml"
    },
    "/pages/pingou_second/index_sectab/index_sectab": {
        params: {
            ptag: "ptag",
            sku: "sku",
            pps: "pps"
        },
        url: "https://wqs.jd.com/wxsq_project/wqvue/index_sectab/index_sectab.html"
    },
    "/pages/pingou_second/promote/index": {
        params: {
            ptag: "ptag",
            sku: "sku",
            pps: "pps"
        },
        url: "https://wqs.jd.com/portal/wx/tuan/pingou_active.shtml"
    },
    "/pages/pingou_second/bipin/index": {
        params: {
            ptag: "ptag",
            sku: "sku"
        },
        url: "https://wqs.jd.com/portal/wx/tuan/pingou_list.shtml"
    },
    "/pages/pingou/ziying/ziying": {
        params: {
            ptag: "ptag",
            sku: "sku"
        },
        url: "https://wqs.jd.com/portal/wx/tuan/ziyingtuan.shtml"
    },
    "/pages/pingou_second/ziying/ziying": {
        params: {
            ptag: "ptag",
            sku: "sku"
        },
        url: "https://wqs.jd.com/portal/wx/tuan/ziyingtuan.shtml"
    }
}, w = function(a) {
    for (var e in a) {
        var t = a[e].params, r = !0, p = !1, s = void 0;
        try {
            for (var i, n = g[Symbol.iterator](); !(r = (i = n.next()).done); r = !0) {
                var o = i.value;
                o in t || (t[o] = o);
            }
        } catch (a) {
            p = !0, s = a;
        } finally {
            try {
                !r && n.return && n.return();
            } finally {
                if (p) throw s;
            }
        }
    }
};

w(h);

r(34566).then(function(a) {
    var r = l.getCookie("visitkey").substr(-2);
    if (r) {
        r = +r;
        var p = {}, s = [];
        (a = a.filter(function(a) {
            return a.visitPercent = +a.visitPercent, 0 != a.visitPercent && a.visitPercent >= r;
        })).forEach(function(a) {
            var r = a.url, i = void 0 === r ? "" : r, n = a.key, l = void 0 === n ? "" : n, u = a.wxappUrl, c = void 0 === u ? "" : u;
            l = l.toLowerCase();
            var g = (0, d.parseURL)(i), m = o.querystr(g.query || "").query;
            for (var h in m) h = h.toLowerCase(), s.includes(h) || s.push(h);
            var v = l ? l.split("|").map(function(a) {
                var e = a.split(":");
                return t({}, e[0], e[1]);
            }) : [ {} ], x = s.length ? s.map(function(a) {
                return t({}, a, a);
            }) : [ {} ];
            p[g.host + "/" + g.path] = {
                params: Object.assign.apply(Object, e(x).concat(e(v))),
                url: c
            };
        }), w(p), Object.assign(h, p);
    }
}).catch(function(a) {
    console.error("ppms 34566: ", a);
});

var f = function(a) {
    return a.replace(/^(http:|https:)?\/\//, "");
}, _ = function(a) {
    return a.match(/[^?#]+/)[0];
}, k = function(a) {
    return a.replace(/\/$/, "");
}, j = function(a) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, t = {};
    if (a && e.params) {
        var r = a.match(/([^?]*)\??(.*)/)[2], p = o.querystr(r, null, !0).query;
        for (var s in e.params) p[s] && (t[e.params[s]] = p[s] || "");
    }
    if (a && e.wxaPrams) for (var i in e.wxaPrams) t[i] = e.wxaPrams[i];
    return t;
}, y = function() {
    var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1], t = {};
    if (a && a.params) for (var r in a.params) r in e && (t[a.params[r]] = e[r]);
    return t;
}, q = function() {
    var a = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").split("?")[1] || "";
    return o.querystr(a).query;
}, b = function() {
    return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").split("?")[0] || "";
}, P = exports.getWxaUrl = function() {
    var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
    if (!a) return null;
    var e = k(_(f(a)));
    if (h[e]) {
        var t = j(a, h[e]), r = q(h[e].url);
        return {
            params: Object.assign(t, r),
            url: b(h[e].url)
        };
    }
    return null;
};

exports.removeH5Params = function(a) {
    return a && a.url && [ "cookie", "wdref", "wxa_level" ].forEach(function(e) {
        a.url = (0, d.removeUrlParam)(a.url, e);
    }), a;
}, exports.updateCookie = function(a) {
    var e = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).dataType;
    if (a && a.cookie) {
        var t = void 0, r = {
            visitkey: {},
            __wga: {
                maxAge: 3153e3
            },
            PPRD_P: {
                maxAge: 259200
            },
            __jda: {
                maxAge: 259200
            },
            __jdv: {
                maxAge: 86400
            },
            unpl: {
                maxAge: 1296e3
            },
            wq_addr: {},
            wxapp_type: {},
            cd_eid: {}
        };
        try {
            t = "json" == e ? a.cookie : JSON.parse(decodeURIComponent(a.cookie));
            var p = [];
            for (var s in t) if ("" != t[s] && r[s]) {
                var i = {};
                i[s] = Object.assign(r[s], {
                    value: t[s]
                }), p.push({
                    data: i
                });
            }
            l.setCookies(p);
        } catch (a) {
            console.log("解析url的cookie参数出错", a);
        }
        console.log("parse cookies: ", l);
    }
}, exports.switchUrl = function(a, e) {
    var t = void 0, r = void 0;
    if (m || (v = n({}, v, x)), "/pages/h5/index" == a) if (/^(https?:)?\/\/union-click\.jd\.com/.test(e.url)) a = "/pages/union/proxy/proxy", 
    t = {
        spreadUrl: encodeURIComponent(e.url)
    }; else if (r = /^(?:https?:)?\/\/lp\.jd\.com\/page\/(\d+)\/([^.]+)\.html/.exec(e.url)) {
        var p = i(r, 3), s = (p[0], p[1]), l = p[2];
        if (!l.startsWith("lp_")) {
            var u = o.getUrlParam("lppage", e.url);
            if (!u) return {
                url: a,
                params: e
            };
            l = "lp_" + u;
        }
        a = "/pages/adpage/lp/lp", t = {
            lppage: encodeURIComponent(s + "/" + l)
        };
    } else {
        var c = P(e.url);
        c && (a = c.url, delete e.url, t = Object.assign({}, e, c.params));
    } else if (v[a]) {
        var d = a;
        a = "/pages/h5/index", t = {};
        var g = o.querystr(y(v[d], e));
        t.url = v[d].url + "?" + g;
    }
    return {
        url: a,
        params: t || e
    };
}, exports.addParamsToH5Url = function(a, e) {
    if (!a) return "https://wqs.jd.com/error.shtml?ngx_static_err=44";
    var t = [ l.getCookie("visitkey"), l.getCookie("__wga"), l.getCookie("PPRD_P"), l.getCookie("__jda"), l.getCookie("__jdv"), l.getCookie("unpl"), l.getCookie("wxapp_type"), l.getCookie("wq_addr"), l.getCookie("cd_eid") ], r = t[0], i = t[1], n = t[2], u = t[3], c = t[4], g = t[5], m = t[6], h = t[7], v = t[8], x = [ "cookie=" + encodeURIComponent(JSON.stringify({
        visitkey: r,
        __wga: i,
        PPRD_P: n,
        __jda: u,
        __jdv: c,
        unpl: g,
        wxapp_type: m,
        cd_eid: v
    })) ].join("&"), w = [ "wdref=" + encodeURIComponent(e || o.getPageUrl().vurl), "wxa_level=" + (getCurrentPages().length + 1), "sens=" + encodeURIComponent(JSON.stringify({
        wq_addr: h
    })) ].join("&");
    if (a = a.replace(/^(https?:)?\/\//, "https://"), /wqitem.jd.com/.test(a)) {
        var f = l.getCookie("wxsearch_token");
        getApp() && getApp().isWXSearchScene && f && (a = (0, d.addUrlParam)(a, {
            sosomark: 1
        }));
    }
    if (!p(a)) return a;
    var _ = a.replace(/[?#].*/, ""), k = a.replace(/#.*/, "").split("?")[1] || "", j = a.split("#")[1] || "";
    return a = [ _, "?" + (k ? k + "&" : "") + x, "#" + (j ? j + "&" : "") + w ].join(""), 
    s(a);
};