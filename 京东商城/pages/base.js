function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Base = void 0;

var r = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var o = t[r];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, r, o) {
        return r && e(t.prototype, r), o && e(t, o), t;
    };
}(), o = e(require("../api/Ptag/Ptag_constants")), n = require("../api/Ptag/Ptag_utils"), a = require("../api/Ptag/report_manager"), i = e(require("../common/fe_helper.js")), s = e(require("../common/biz.js")), u = e(require("../common/toast/toast.js")), c = require("../common/fe_report/speed.js"), p = e(require("../common/fe_report/usability.js")), l = require("../common/request/request.js"), d = e(require("../common/navigator.js")), f = function() {
    function e() {
        t(this, e), this.helper = i, this.biz = s, this.toast = u, this.us = p, this.$request = l.request, 
        this.$goto = d.goto;
    }
    return r(e, [ {
        key: "$report",
        value: function(e, t, r) {
            r = r || {}, 2 == arguments.length && "[object Object]" == Object.prototype.toString.call(t) && (r = t, 
            t = !1), t && (e = /[?&]?ptag=([\d.]+)&?/i.exec(t)[1] || e), /^[\d.]+$/.test(e) || (this.PtagMap && (e = this.PtagMap[e]), 
            e = o[e]), e && n.PtagUtils.addPtag(e, r);
        }
    }, {
        key: "$setReportPage",
        value: function(e, t) {
            var r = o[e];
            r && a.ReportManager.setCurrentPageAndAddPv(r, t);
        }
    }, {
        key: "__getRandomID",
        value: function() {
            return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "") + Math.random().toString(36).substring(2, 15);
        }
    }, {
        key: "$gotoCart",
        value: function() {
            this.$goto("/pages/cart/cart/cart", "switchTab");
        }
    }, {
        key: "speedInit",
        value: function(e, t) {
            this._speed = new c.Speed(e, t), t && this._speed.mark(1, t);
        }
    }, {
        key: "speedMark",
        value: function(e, t) {
            return this._speed && this._speed.mark(e, t), this;
        }
    }, {
        key: "speedReport",
        value: function() {
            var e = this;
            setTimeout(function() {
                try {
                    e._speed && (e._speed.report(), delete e._speed);
                } catch (e) {
                    console.warn("speedReport", e);
                }
            }, 0);
        }
    } ]), e;
}();

exports.Base = f;