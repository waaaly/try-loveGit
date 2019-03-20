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
}), exports.PvUtils = void 0;

var t = function() {
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
}(), n = require("./v"), o = e(require("../../common/url_utils")), a = require("./hermes"), i = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./knicks")), u = e(require("../APIs")), s = e(require("../../common/fe_report/usability"));

exports.PvUtils = function() {
    function e() {
        r(this, e);
    }
    return t(e, null, [ {
        key: "addPv",
        value: function(e, r, t) {
            var i = o.wxaProxy(u.PTAG_URL);
            (0, n.initAppReport)().then(function(u) {
                var s = new n.PageV(i, e, "", u);
                if (t) {
                    for (var p in t) t.hasOwnProperty(p) && (s[p] = t[p]);
                    t.isItem && t.sku_id && (e = o.addUrlParam(e, {
                        sku: t.sku_id
                    }));
                }
                a.Hermes.reportPv(s, e, r);
            });
        }
    }, {
        key: "addSearchExposure",
        value: function(e, r, t) {
            (0, n.initAppReport)().then(function(i) {
                t.sf_url = "http://wq.jd.com/wxapp/pages/index/index";
                var s = o.wxaProxy(u.PTAG_URL);
                Object.assign(t, i);
                var p = new n.SearchExposureV(s, e, t);
                a.Hermes.reportSearchExposure(p, e, r);
            });
        }
    }, {
        key: "addPtagExposure",
        value: function(e, r, t) {
            var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
            (0, n.initAppReport)().then(function(s) {
                var p = o.wxaProxy(u.PTAG_URL);
                Object.assign(i, s);
                var c = new n.ItemExposureV(p, e, t, i);
                a.Hermes.reportPtagExposure(c, e, r);
            });
        }
    }, {
        key: "addGuessyouLikeReport",
        value: function(e, r) {
            var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            if (1 == t.action && t.clk && 1 == t.source) {
                var a = t.clk.replace(/http\b/, "https");
                wx.request({
                    url: a
                }), s.umpBiz({
                    bizid: 749,
                    operation: t.operation || 1,
                    result: 0,
                    message: ""
                }), delete t.operation, delete t.clk;
            } else (0, n.initAppReport)().then(function(a) {
                var s = o.wxaProxy(u.GUESS_YOU_LIKE_URL);
                Object.assign(t, a);
                var p = 0 == t.action ? "rec_common_exp" : "rec_common_clk", c = t.source, l = t.insteadRef;
                0 === t.action && (t.action = "0"), t.m = "MO_J2011-2", t.url = e, t.ref = r, t.hitType = 6, 
                t.type = t.type || "rec." + t.p, delete t.t, delete t.source, delete t.insteadRef;
                var f = new n.GuessyouLikeV(s, e, t);
                i.default.reportGuessyouLike(p, f, c, r, l, t);
            });
        }
    }, {
        key: "addUserShareReport",
        value: function(e, r) {
            var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, i = o.wxaProxy(u.PTAG_URL);
            (0, n.initAppReport)().then(function(o) {
                var u = new n.UserShareV(i, e, o);
                if (t) for (var s in t) t.hasOwnProperty(s) && (u[s] = t[s]);
                u.report_type = "user_share", a.Hermes.reportUserShare(u, e, r);
            });
        }
    } ]), e;
}();