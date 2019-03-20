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
}(), o = e(require("../api/Ptag/Ptag_constants")), n = require("../api/Ptag/Ptag_utils"), a = require("../api/Ptag/report_manager"), i = require("../common/wqvue/core/util/index"), s = require("../common/wqvue/core/util/diff"), u = e(require("../common/navigator.js")), p = e(require("../common/biz.js")), c = e(require("../common/toast/toast.js")), l = require("../common/fe_report/speed.js"), d = e(require("../common/fe_report/usability.js")), f = e(require("../common/utils.js")), g = require("../common/pretreatment"), m = function() {
    function e() {
        var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        t(this, e), this.object = r;
    }
    return r(e, [ {
        key: "plugins",
        value: function() {
            return {
                utils: f,
                helper: f,
                biz: p,
                toast: c,
                us: d,
                Speed: l.Speed
            };
        }
    }, {
        key: "methods",
        value: function() {
            return {
                $goto: u.goto,
                $gotoItem: u.gotoItem,
                $setData: this.$setData,
                $report: this.$report,
                $setReportPage: this.$setReportPage,
                $preload: g.Pretreatment.preload,
                speedMark: this.speedMark,
                speedInit: this.speedInit,
                speedReport: this.speedReport
            };
        }
    }, {
        key: "$setData",
        value: function(e, t) {
            (0, i.isPlainObject)(e) || (console.error("$setData参数类型错误"), e = {});
            var r = (0, s.diff)(e, (0, s.getOldData)(e, this.data, this));
            (0, i.isPlainObject)(r) && (0, i.isNotEmptyObject)(r) && this.setData(r, t);
        }
    }, {
        key: "$report",
        value: function(e, t, r) {
            r = r || {}, 2 == arguments.length && "[object Object]" == Object.prototype.toString.call(t) && (r = t, 
            t = !1), t && (e = /[?&]?ptag=([\d.]+)&?/i.exec(t)[1] || e), /^[\d.]+$/.test(e) || (this.PtagMap && (e = this.PtagMap[e]), 
            e = (this.PtagConstants || o)[e]), e && n.PtagUtils.addPtag(e, r);
        }
    }, {
        key: "$setReportPage",
        value: function(e, t) {
            var r = (this.PtagConstants || o)[e];
            if (!r) return console.warn("无效的PV上报！");
            a.ReportManager.setCurrentPageAndAddPv(r, t);
        }
    }, {
        key: "__getRandomID",
        value: function() {
            return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "") + Math.random().toString(36).substring(2, 15);
        }
    }, {
        key: "speedInit",
        value: function(e, t) {
            this._speed = new l.Speed(e, t), t && this._speed.mark(1, t);
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

exports.Base = m;