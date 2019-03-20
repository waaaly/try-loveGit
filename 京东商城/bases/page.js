function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
    return t.default = e, t;
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function a(e, t) {
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
}), exports.JDPage = void 0;

var n = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var r = t[a];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, a, r) {
        return a && e(t.prototype, a), r && e(t, r), t;
    };
}(), o = function e(t, a, r) {
    null === t && (t = Function.prototype);
    var n = Object.getOwnPropertyDescriptor(t, a);
    if (void 0 === n) {
        var o = Object.getPrototypeOf(t);
        return null === o ? void 0 : e(o, a, r);
    }
    if ("value" in n) return n.value;
    var i = n.get;
    if (void 0 !== i) return i.call(r);
}, i = require("./base.js"), s = e(require("../common/navigator.js")), p = e(require("../common/h5jump.js")), d = e(require("../common/pr.js")), u = e(require("../common/utils.js")), g = e(require("../common/wdref.js")), c = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../common/report/pps.js")), l = e(require("../api/reportGDT.js")), m = require("../api/Ptag/Ptag_utils.js"), f = require("../api/Ptag/report_manager.js"), h = require("../common/jdwebm.js"), y = require("../common/pretreatment"), v = {}, _ = function(e) {
    function _() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        t(this, _);
        var n = a(this, (_.__proto__ || Object.getPrototypeOf(_)).apply(this, arguments));
        return n.object = e, n.object.pageId = o(_.prototype.__proto__ || Object.getPrototypeOf(_.prototype), "__getRandomID", n).call(n), 
        n.attachPlugins(), n.attachMethods(), n.attachActions(), n.mergeModel(), n.lifeCircle(), 
        r ? Component(e) : Page(e), y.Pretreatment.register(e), n;
    }
    return r(_, i.Base), n(_, [ {
        key: "lifeCircle",
        value: function() {
            var e = this, t = this, a = [ "Load", "Ready", "Show", "Hide", "Unload" ], r = !0, n = !1, o = void 0;
            try {
                for (var i, s = a[Symbol.iterator](); !(r = (i = s.next()).done); r = !0) !function() {
                    var a = i.value, r = e.object["on" + a];
                    e.object["on" + a] = function() {
                        for (var e = arguments.length, n = Array(e), o = 0; o < e; o++) n[o] = arguments[o];
                        t["on" + a] && (n = t["on" + a].apply(this, n) || n), r && r.apply(this, n);
                    };
                }();
            } catch (e) {
                n = !0, o = e;
            } finally {
                try {
                    !r && s.return && s.return();
                } finally {
                    if (n) throw o;
                }
            }
        }
    }, {
        key: "mergeModel",
        value: function() {
            if (this.object.hasOwnProperty("model")) {
                var e = this.object.model();
                for (var t in e) void 0 === this.object.data[t] && (this.object.data[t] = e[t]);
            }
        }
    }, {
        key: "attachActions",
        value: function() {
            if (this.object.hasOwnProperty("actions")) {
                var e = this.object.actions;
                for (var t in e) {
                    if (this.object[t]) throw new Error("Prop " + t + " is already exists");
                    this.object[t] = e[t];
                }
            }
        }
    }, {
        key: "attachPlugins",
        value: function() {
            var e = o(_.prototype.__proto__ || Object.getPrototypeOf(_.prototype), "plugins", this).call(this);
            for (var t in e) {
                if (this.object[t]) throw new Error("Prop " + t + " is already exists");
                this.object[t] = e[t];
            }
        }
    }, {
        key: "attachMethods",
        value: function() {
            var e = o(_.prototype.__proto__ || Object.getPrototypeOf(_.prototype), "methods", this).call(this);
            for (var t in e) {
                if (this.object[t]) throw new Error(t + " is already exists");
                this.object[t] = e[t];
            }
        }
    }, {
        key: "onLoad",
        value: function(e) {
            this.pvTime = {
                start: Date.now(),
                end: 0,
                loadTime: 0,
                needRefresh: !1
            };
            var t = new Date(), a = s.getParams(e) || {}, r = v[this.route];
            r && (this.speedInit(r, a.navStart), this.speedMark(2, t)), u.handleQueryScene(e);
            var n = a.platform, o = a.gdt_vid, i = a.gaid, h = a.gsid;
            if (n && l.reportGDT(n, {
                gdt_vid: o,
                gaid: i,
                gsid: h
            }), a.pps && (f.ReportManager.setPPS(a.pps), (0, c.default)(a.pps)), (a.utm_campaign || a.utm_source || a.utm_medium || a.utm_term || a.platform) && (getApp().utmJdvProps = {
                utm_campaign: a.platform ? 1 == a.platform ? "t_256716187_1" : "t_1000072653_1" : a.utm_campaign || "",
                utm_source: a.platform ? "jdzt_wxsq_refer_null" : a.utm_source || "",
                utm_medium: a.platform ? "weixin_shouq" : a.utm_medium || "",
                utm_term: a.platform ? a.gdt_vid || "" : a.utm_term || "",
                platform: a.platform
            }), "pages/h5/index" == u.getPageUrl().route && (a.encode_url && (a.url = u.decode(a.encode_url), 
            delete a.encode_url), a.url)) {
                var y = u.getUrlParam("ptag", a.url);
                y && m.PtagUtils.addPtag(y);
                var _ = getCurrentPages(), x = _.length > 1 ? _[_.length - 2].route : "";
                "pages/h5/index" != x && "pages/gwq/index" != x && -1 == a.url.indexOf("//union-click.jd.com") && (a.url = p.addParamsToH5Url(a.url, a.referer)), 
                d.addPrToH5(a.url, a.pr), delete a.pr;
            }
            var b = a.ptag;
            b && "string" == typeof b && (m.PtagUtils.addPtag(b), this.setData({
                ptag: b
            })), this.setData({
                __report_props__: a
            });
            var j = a.pr || "";
            j && (getApp().pr = j), g.addUrlParams(this.pageId, a), g.onLoadSet(this.pageId), 
            p.updateCookie(a);
            for (var P = arguments.length, w = Array(P > 1 ? P - 1 : 0), O = 1; O < P; O++) w[O - 1] = arguments[O];
            return [ a ].concat(w);
        }
    }, {
        key: "onUnload",
        value: function() {
            var e = g.getUrlParams(this.pageId, !0);
            "pages/h5/index" == u.getPageUrl().route && e && (e = p.removeH5Params(e), console.log("back: h5 to wxa", e), 
            g.backSet(e));
        }
    }, {
        key: "onReady",
        value: function() {
            this.speedMark(3);
        }
    }, {
        key: "onShow",
        value: function() {
            this.pvTime && this.pvTime.needRefresh && (this.pvTime.start = Date.now(), this.pvTime.loadTime = 0), 
            this.manualReportPV ? f.ReportManager.clearPPS() : (f.ReportManager.setCurrentPageAndAddPv(), 
            m.PtagUtils.tabbarReport()), (0, h.Jdwebm)();
        }
    } ]), _;
}();

v = {
    "pages/index/index": 1024,
    "pages/search/list/list": 1157,
    "pages/cart/cart/index": 600,
    "pages/cart/cart/cart": 1035,
    "pages/item/detail/detail": 601,
    "pages/store/index/index": 602,
    "pages/pay/index/index": 603,
    "pages/coupon/index": 604,
    "pages/cate/cate": 605,
    "pages/my_pages/coupon/coupon": 606,
    "pages/my_pages/coupon_detail/coupon_detail": 900,
    "pages/my_pages/ecard/index/index": 775,
    "pages/my_pages/ecard/bind/bind": 776,
    "pages/my_pages/account/account": 786,
    "pages/pingou/item/item": 851,
    "pages/pingou/ziying/ziying": 854,
    "pages/pingou/tuan99/tuan99": 855,
    "pages/pingou/my/my": 856,
    "pages/pingou/index/index": 853,
    "pages/pingou/detail/index": 867,
    "pages/pingou/account/index": 1485,
    "pages/pingou_second/darentuan/darentuan": 1123,
    "pages/pingou/brand/index": 1092,
    "pages/pingou/brand/detail": 1093,
    "pages/specialpay/qianggou/qianggou": 1037,
    "pages/penny/index/index": 1053,
    "pages/penny/item/item": 1054,
    "pages/penny/pay/pay": 1055,
    "pages/penny/detail/detail": 1056,
    "pages/my/index/index": 1102,
    "pages/aditem/index": 1390,
    "pages/adpage/item/item": 1132,
    "pages/adpage/lp/lp": 1133,
    "pages/search/subPackages/coupon/coupon": 1250,
    "pages/search/subPackages/sales/sales": 1251,
    "pages/pingou_second/signin/index/index": 1241,
    "pages/pingou_second/signin/asset/asset": 1244,
    "pages/events/sportshb/index/index": 1214,
    "pages/couponv4/index/index": 1260,
    "pages/pingou/cate/cate": 1280,
    "pages/pingou_second/search/search": 1285,
    "pages/events/yyzc/index/index": 1290,
    "pages/events/yyzc/active/active": 1291,
    "pages/market/index/index": 1156,
    "pages/item/featured/featured": 1328,
    "pages/events/qsq/qsq": 1350,
    "pages/order/list/list": 1404,
    "pages/order/detail/detail": 1405,
    "pages/events/kj_sksm/index/index": 1408,
    "pages/events/kj_sksm/my/my": 1412,
    "pages/events/pjdsyh/index/index": 1491,
    "pages/events/pjdsyh/index_start/index_start": 1495,
    "pages/events/pjdsyh/my/my": 1499,
    "pages/events/chb_jd/index/index": 1520,
    "pages/events/divide_bean/index/index": 1514,
    "pages/events/divide_bean/my/my": 1515,
    "pages/events/laxin_jd/index/index": 1539,
    "pages/events/ddplf/index/index": 1543
}, exports.JDPage = _;