function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t.default = e, t;
}

function t(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function n(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function r(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function o(e, t) {
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

var a = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), i = function e(t, n, r) {
    null === t && (t = Function.prototype);
    var o = Object.getOwnPropertyDescriptor(t, n);
    if (void 0 === o) {
        var a = Object.getPrototypeOf(t);
        return null === a ? void 0 : e(a, n, r);
    }
    if ("value" in o) return o.value;
    var i = o.get;
    if (void 0 !== i) return i.call(r);
}, s = require("./base.js"), p = t(require("../libs/emitter.js")), u = require("../api/Ptag/Ptag_utils.js"), l = require("../common/jdwebm.js"), g = e(require("../common/h5jump.js")), c = e(require("../common/utils.js")), d = e(require("../common/wdref.js")), h = t(require("../common/report/pps.js")), f = require("../api/Ptag/report_manager.js"), v = e(require("../common/navigator.js")), y = require("../common/pretreatment"), m = {}, b = {}, _ = {}, j = function(e) {
    function t(e) {
        n(this, t);
        var o = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
        o.obj = e, o.obj.pageId = i(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "__getRandomID", o).call(o), 
        o.initPlugins(), o.initComponents(), o.initLifeCircle();
        for (var a = arguments.length, s = Array(a > 1 ? a - 1 : 0), p = 1; p < a; p++) s[p - 1] = arguments[p];
        return Page.apply(void 0, [ e ].concat(s)), y.Pretreatment.register(e), o;
    }
    return o(t, s.Base), a(t, [ {
        key: "initLifeCircle",
        value: function() {
            var e = this, t = [ "onLoad", "onReady", "onShow", "onHide", "onUnload", "onRouteEnd" ], n = this, r = !0, o = !1, a = void 0;
            try {
                for (var i, s = t[Symbol.iterator](); !(r = (i = s.next()).done); r = !0) !function() {
                    var t = i.value, r = e.obj[t];
                    e.obj[t] = function() {
                        for (var e = arguments.length, o = Array(e), a = 0; a < e; a++) o[a] = arguments[a];
                        n[t] && (o = n[t].apply(this, o) || o), r && r.apply(this, o);
                    };
                }();
            } catch (e) {
                o = !0, a = e;
            } finally {
                try {
                    !r && s.return && s.return();
                } finally {
                    if (o) throw a;
                }
            }
        }
    }, {
        key: "initComponents",
        value: function() {
            var e = this.obj.components;
            if (e) {
                this.components = {};
                for (var t in e) this.components[t] = new e[t](this.obj, t);
                _["components" + this.obj.pageId] = this.components;
            }
        }
    }, {
        key: "initPlugins",
        value: function() {
            var e = this;
            b = {
                toast: this.toast,
                helper: this.helper,
                biz: this.biz,
                us: this.us,
                $request: this.$request,
                _events: {},
                $goto: this.$goto,
                $preload: y.Pretreatment.preload
            }, this.obj._events = {}, this.obj.emitter = new p.default(this.obj), Object.getOwnPropertyNames(this.__proto__.__proto__).map(function(n) {
                "constructor" !== n && (e.obj[n] = i(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), n, e));
            });
            var n = [ "on", "emit" ], r = !0, o = !1, a = void 0;
            try {
                for (var s, u = n[Symbol.iterator](); !(r = (s = u.next()).done); r = !0) {
                    var l = s.value;
                    this.obj[l] = this[l];
                }
            } catch (e) {
                o = !0, a = e;
            } finally {
                try {
                    !r && u.return && u.return();
                } finally {
                    if (o) throw a;
                }
            }
            var g = [ "onWrapperTap" ], c = !0, d = !1, h = void 0;
            try {
                for (var f, v = g[Symbol.iterator](); !(c = (f = v.next()).done); c = !0) !function() {
                    var t = f.value, n = e.obj[t] || null;
                    e.obj[t] = function() {
                        for (var r = arguments.length, o = Array(r), a = 0; a < r; a++) o[a] = arguments[a];
                        n && n.apply(e, o), e[t].apply(e, o);
                    };
                }();
            } catch (e) {
                d = !0, h = e;
            } finally {
                try {
                    !c && v.return && v.return();
                } finally {
                    if (d) throw h;
                }
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
            for (var t in b) b.hasOwnProperty(t) && (this[t] = b[t]);
            this.components = _["components" + this.pageId];
            var n = new Date(), r = v.getParams(e), o = m[this.route];
            o && (this.speedInit(o, r && r.navStart), this.speedMark(2, n)), r.pps && (f.ReportManager.setPPS(r.pps), 
            (0, h.default)(r.pps));
            var a = r.ptag;
            a && "string" == typeof a && (u.PtagUtils.addPtag(a), this.setData({
                ptag: a
            })), this.setData({
                __report_props__: r
            });
            var i = r && r.pr || "";
            i && (getApp().pr = i), d.addUrlParams(this.pageId, r), d.onLoadSet(this.pageId), 
            g.updateCookie(r);
            var s = this.events;
            if (s) for (var p in s) this.on(p, this[s[p]]);
            this.$pages = getCurrentPages(), this.$pages.length > 1 && (this.$prev = this.$pages[this.$pages.length - 2]);
            for (var l = arguments.length, c = Array(l > 1 ? l - 1 : 0), y = 1; y < l; y++) c[y - 1] = arguments[y];
            if (r) return [ r ].concat(c);
        }
    }, {
        key: "onUnload",
        value: function() {
            for (var e in this._events) {
                for (var t in this._events[e]) {
                    var n = this._events[e][t];
                    this.emitter.off(e, n);
                }
                delete this._events[e];
            }
            var r = d.getUrlParams(this.pageId, !0);
            "pages/h5/index" == c.getPageUrl().route && r && (r = g.removeH5Params(r), console.log("back: h5 to wxa", r), 
            d.backSet(r));
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
            (0, l.Jdwebm)(), this.manualReportPV ? f.ReportManager.clearPPS() : (f.ReportManager.setCurrentPageAndAddPv(), 
            u.PtagUtils.tabbarReport());
        }
    }, {
        key: "on",
        value: function(e, t) {
            this._events[e] || (this._events[e] = []), t = t.bind(this), this._events[e].push(t), 
            this.emitter.on(e, t);
        }
    }, {
        key: "emit",
        value: function() {
            var e;
            (e = this.emitter).emit.apply(e, arguments);
        }
    }, {
        key: "onWrapperTap",
        value: function(e) {
            if (console.log("in page=======", e), e) {
                var t = e.target.dataset.ptag;
                t && (console.log("====>", t), this.$report(t));
            }
        }
    } ]), t;
}();

m = {
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
    "pages/order/list/list": 608,
    "pages/order/detail/detail": 609,
    "pages/my_pages/ecard/index/index": 775,
    "pages/my_pages/ecard/bind/bind": 776,
    "pages/my_pages/account/account": 786,
    "pages/pingou/item/item": 851,
    "pages/pingou/ziying/ziying": 854,
    "pages/pingou/tuan99/tuan99": 855,
    "pages/pingou/my/my": 856,
    "pages/pingou/index/index": 853,
    "pages/pingou/detail/index": 867,
    "pages/pingou_second/darentuan/darentuan": 1123,
    "pages/pingou/brand/index": 1092,
    "pages/pingou/brand/detail": 1093,
    "pages/specialpay/qianggou/qianggou": 1037,
    "pages/penny/index/index": 1053,
    "pages/penny/item/item": 1054,
    "pages/penny/pay/pay": 1055,
    "pages/penny/detail/detail": 1056,
    "pages/my/index/index": 1102,
    "pages/events/sportshb/index/index": 1214,
    "pages/events/qsq/qsq": 1350
}, exports.JDPage = j;