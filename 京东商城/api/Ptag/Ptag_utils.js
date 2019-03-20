function e(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = e[t]);
    return r.default = e, r;
}

function r(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.PtagUtils = void 0;

var t = Object.assign || function(e) {
    for (var r = 1; r < arguments.length; r++) {
        var t = arguments[r];
        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    }
    return e;
}, n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
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
}(), o = require("./hermes"), i = e(require("../APIs")), u = e(require("../../common/url_utils")), c = require("./report_manager"), s = require("./v"), l = e(require("./Ptag_constants"));

exports.PtagUtils = function() {
    function e() {
        r(this, e);
    }
    return a(e, null, [ {
        key: "addPtag",
        value: function(e, r) {
            (0, s.initAppReport)().then(function(t) {
                r && "object" == (void 0 === r ? "undefined" : n(r)) ? Object.assign(r, t) : r = t;
                var a = c.ReportManager.getCurrentPageUrl(), l = c.ReportManager.getRerrerUrl(), f = new s.ClickV(u.wxaProxy(i.PTAG_URL), a, e, r);
                o.Hermes.reportPtag(f, a, l);
            });
        }
    }, {
        key: "addSearchPageRelatedKWDPtag",
        value: function(r, n, a, o) {
            var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {
                index: -1,
                ss_mtest: "",
                ss_hccid1s: "",
                ss_hccid2s: "",
                ss_hccid3s: ""
            }, u = t({
                search_kwd: r,
                relatedkey: n,
                relatednum: a,
                relatedver: o
            }, i);
            e.addPtag(l.SEARCH_RELATED_KWD, u);
        }
    }, {
        key: "tabbarReport",
        value: function() {
            var r = c.ReportManager.getCurrentPageUrl(), t = c.ReportManager.getRerrerUrl(), n = !1, a = !1, o = "", i = {
                "/pages/index/index": "7574.1.1",
                "/pages/cate/cate": "7574.1.2",
                "/pages/gwq/index": "7574.1.3",
                "/pages/cart/cart/index": "7574.1.4",
                "/pages/my/index/index": "7574.1.5"
            };
            for (var u in i) -1 !== r.indexOf(u) && (n = !0, o = i[u]), -1 !== t.indexOf(u) && (a = !0);
            n && a && o && e.addPtag(o);
        }
    } ]), e;
}();