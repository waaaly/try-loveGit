function e(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = e[t]);
    return r.default = e, r;
}

function r(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

function t(e) {
    return "string" == typeof e || "boolean" == typeof e || "number" == typeof e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ReportManager = void 0;

var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, a = function() {
    function e(e, r) {
        for (var t = 0; t < r.length; t++) {
            var n = r[t];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(r, t, n) {
        return t && e(r.prototype, t), n && e(r, n), r;
    };
}(), u = e(require("../../common/localStorage")), o = require("./Pv_utils"), i = e(require("./report")), s = e(require("../../common/utils.js")), l = e(require("../../common/cookie-v2/cookie")), g = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../libs/md5")), c = e(require("../../common/url_utils")), f = function() {
    function e(t) {
        r(this, e), this.url = t;
    }
    return a(e, [ {
        key: "setUrl",
        value: function(e) {
            this.url = e;
        }
    }, {
        key: "getUrl",
        value: function() {
            return this.url ? this.url : "";
        }
    }, {
        key: "cleanUp",
        value: function() {
            for (var e in this) this.hasOwnProperty(e) && (this[e] = null);
        }
    } ]), e;
}(), d = function() {
    function e() {
        r(this, e), this.lastPage = new f(), this.currentPage = new f(), this.referrerPage = new f(), 
        this.changeRef = !1, this.pps = "";
    }
    return a(e, null, [ {
        key: "getCurrentPageUrl",
        value: function() {
            return this.currentPage ? this.currentPage.getUrl() : "";
        }
    }, {
        key: "setCurrentPageUrl",
        value: function(e) {
            this.currentPage = new f(e);
        }
    }, {
        key: "getLastPageUrl",
        value: function() {
            return this.lastPage ? this.lastPage.getUrl() : "";
        }
    }, {
        key: "getRerrerUrl",
        value: function() {
            return this.referrerPage ? this.referrerPage.getUrl() : e.getLastPageUrl();
        }
    }, {
        key: "cleanUpLastPageInfo",
        value: function() {
            this.lastPage ? this.lastPage.cleanUp() : this.lastPage = new f();
        }
    }, {
        key: "swapLastAndCurrentPageInfo",
        value: function() {
            var e = this.lastPage;
            this.lastPage = this.currentPage, this.currentPage = e, this.referrerPage = null;
        }
    }, {
        key: "setChangeRef",
        value: function(e) {
            this.changeRef = e;
        }
    }, {
        key: "setPPS",
        value: function(e) {
            this.pps = e;
        }
    }, {
        key: "clearPPS",
        value: function() {
            this.pps = "";
        }
    }, {
        key: "isItemView",
        value: function(e) {
            return e && 1 == e.isItem;
        }
    }, {
        key: "setReportArgs",
        value: function() {
            i.setReportCookies(e.getCurrentPageUrl(), e.getRerrerUrl());
        }
    }, {
        key: "setJda",
        value: function(e) {
            var r = l.getCookie("__jda");
            if (!r) {
                var t = Date.now(), n = l.getCookie("visitkey") || "", a = e;
                r = [ "122270672", g.default.hexMD5(n + t + a), t, t, t, 1 ].join("."), l.setCookie({
                    data: {
                        __jda: {
                            value: r,
                            maxAge: 259200
                        }
                    }
                });
            }
        }
    }, {
        key: "setCurrentPageAndAddPv",
        value: function(r, a) {
            "object" == (void 0 === r ? "undefined" : n(r)) && (a = r, r = "");
            var i = getCurrentPages().length, l = s.getPageUrl().vurl, g = getApp().pr, d = getCurrentPages()[i - 1].data.__report_props__, p = getCurrentPages()[i - 1].data.ptag, P = this;
            if (r = r || l, g && (r = c.addUrlParam(r, {
                pr: g
            }), delete getApp().pr), this.pps && !c.getUrlParam("pps", r) && (r = c.addUrlParam(r, {
                pps: this.pps
            }), this.clearPPS()), p && (r = c.addUrlParam(r, {
                ptag: p
            })), d) {
                var v = {};
                for (var h in d) "cookie" !== h && "wdref" !== h && null !== d[h] && void 0 !== d[h] && !c.getUrlParam(h, r) && t(d[h]) && (v[h] = d[h]);
                r = c.addUrlParam(r, v);
            }
            return /http(s)?:\/\/wq\.jd\.com\/wxapp/.test(r) || (a && a.ignoreUrlFormat ? delete a.ignoreUrlFormat : console.error("pv上报url参数有误，请尽快改为新参数格式-http://wq.jd.com/wxapp/youRouter")), 
            P.currentPage ? (P.currentPage.getUrl() != r || P.changeRef) && (e.cleanUpLastPageInfo(), 
            e.swapLastAndCurrentPageInfo(), P.currentPage.setUrl(r), P.changeRef = !1) : P.currentPage = new f(r), 
            u.get("wdref", e.getLastPageUrl()).then(function(r) {
                P.referrerPage = new f(r), e.setReportArgs(), o.PvUtils.addPv(e.getCurrentPageUrl(), e.getRerrerUrl(), a), 
                u.remove("wdref").then(function(e) {
                    console.log("删除wdref成功" + e);
                });
            }), e.setJda(r), this.currentPage;
        }
    }, {
        key: "addSearchPagePv",
        value: function(r, t, n, a) {
            var u = {
                kwd: t,
                kwd_result: n,
                ss_hccid1s: arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "",
                ss_hccid2s: arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "",
                ss_hccid3s: arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : ""
            };
            a && (u.sf = a), r = r + "?key=" + t, e.setCurrentPageAndAddPv(r, u);
        }
    }, {
        key: "addDetailPagePv",
        value: function(r, t, n, a, u) {
            var o = {
                isItem: 1,
                sku_id: t,
                vender_id: n,
                isQianggou: u ? 1 : 0,
                ptag: a
            };
            e.setCurrentPageAndAddPv(r, o);
        }
    }, {
        key: "addOfflinePagePv",
        value: function(r, t) {
            var n = {
                shopId: t
            };
            e.setCurrentPageAndAddPv(r, n);
        }
    }, {
        key: "addSearchPageExposure",
        value: function(r) {
            r && (e.setReportArgs(), o.PvUtils.addSearchExposure(e.getCurrentPageUrl(), e.getRerrerUrl(), r));
        }
    }, {
        key: "getSearchExposureArgs",
        value: function(e, r, t) {
            if (!r || !r[0]) return null;
            for (var n = r[0].wareid, a = 1; a < r.length; a++) n = n + "_" + r[a].wareid;
            return {
                exp_sku_qtty: r.length,
                search_kwd: t,
                intenid: r[0].catid,
                ss_page: e,
                exp_sku_list: n || "",
                actid: 1
            };
        }
    }, {
        key: "addPtagExposure",
        value: function(r, t) {
            o.PvUtils.addPtagExposure(e.getCurrentPageUrl(), e.getRerrerUrl(), r, t);
        }
    }, {
        key: "guessyouLikeReport",
        value: function(r) {
            o.PvUtils.addGuessyouLikeReport(e.getCurrentPageUrl(), e.getRerrerUrl(), r);
        }
    }, {
        key: "userShareReport",
        value: function(r) {
            o.PvUtils.addUserShareReport(e.getCurrentPageUrl(), e.getRerrerUrl(), r);
        }
    }, {
        key: "exitAppReport",
        value: function() {
            u.set("lastSplash", Date.now());
        }
    } ]), e;
}();

exports.ReportManager = d;