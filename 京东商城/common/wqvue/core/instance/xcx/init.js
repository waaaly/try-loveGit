function e() {
    return getCurrentPages().pop();
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.initXcxInCreated = function(p, c, h, u) {
    var l = c._isBehaviors, x = !p && !l, f = c.store && c.store(), g = f ? f.state : c.data;
    h.data = (0, t.extend)({}, g, !0), h[p ? "onLoad" : "created"] = function() {
        var e = this;
        this._isWqVue = !0, this._dataQueue = {}, this._template = c.template;
        var f = (0, s.mountStore)(c, this) || c.data;
        this.$data = (0, t.extend)((0, t.extend)({}, this.$data, !0) || {}, (0, t.extend)({}, f, !0), !0), 
        d.addInstanceId.call(this), l || ((0, o.addXcx$xgoto)(this), (0, n.addSpeApi)(this), 
        (0, o.add$refs)(this), (0, t.bind)(a.nextTick, this)()), (0, r.proxyData)(c, h, this), 
        this.$data && ((0, r.initObserver)(this, c, p), l || (this.$set = function(r, a, o) {
            Object.is(r, e.$data) && (0, t.proxy)(e, e, a, "$data"), (0, i.set)(r, a, o, e);
        }));
        for (var g = arguments.length, v = Array(g), S = 0; S < g; S++) v[S] = arguments[S];
        p && ((0, n.add$query)(this, v[0]), v[0] = (0, n.decodeQuerys)(v[0]), (0, o.addXcxReferrer)(this), 
        (0, o.addXcx$setShare)(c, this)), x && (0, o.addEmit)(this), u && (0, t.bind)(u, this).apply(void 0, v);
    }, x && (h.attached = function() {
        for (var i = this, r = arguments.length, a = Array(r), o = 0; o < r; o++) a[o] = arguments[o];
        this.$root = e(), [ "beforeMount", "attached" ].forEach(function(e) {
            c[e] && (0, t.bind)(c[e], i).apply(void 0, a);
        });
    });
}, exports.parseOptions = function(e, i) {
    e.options && (0, t.isNotEmptyObject)(e.options) && (i.options = e.options);
}, exports.parseAppShare = function(e, t) {
    e.onShareAppMessage && (t.onShareAppMessage = e.onShareAppMessage);
}, exports.registerOnPageScroll = function(e, i) {
    e.onPageScroll && (i.onPageScroll = function() {
        e.onPageScroll && (0, t.bind)(e.onPageScroll, this).apply(void 0, arguments);
    });
};

var t = require("../../util/index"), i = require("../../observer/index"), r = require("./state"), a = require("./nexttick"), o = require("./api"), s = require("../common/store"), n = require("../common/api"), d = require("./instanceid");