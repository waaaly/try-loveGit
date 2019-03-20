function t(t, e) {
    t.options && (0, y.isNotEmptyObject)(t.options) && (e.options = t.options);
}

function e(t, n) {
    if (t.mixins && t.mixins.length) {
        n.behaviors = [];
        var r = !0, i = !1, c = void 0;
        try {
            for (var u, h = t.mixins[Symbol.iterator](); !(r = (u = h.next()).done); r = !0) {
                var d = u.value, f = {};
                e(d, f), s(d, f), a(d, f), o(d, f, !1), n.behaviors.push(Behavior(f));
            }
        } catch (t) {
            i = !0, c = t;
        } finally {
            try {
                !r && h.return && h.return();
            } finally {
                if (i) throw c;
            }
        }
    }
}

function o(t, e, o) {
    var n = o ? {
        onLoad: [ "created", "created_xcx" ],
        onReady: [ "mounted", "mounted_xcx" ],
        onShow: [ "onShow", "onShow_xcx" ],
        onHide: [ "onHide" ],
        onUnload: [ "destroyed", "destroyed_xcx" ],
        onReachBottom: [ "onReachBottom" ]
    } : {
        attached: [ "created" ],
        ready: [ "mounted" ],
        detached: [ "destroyed" ]
    }, r = !1;
    if (i(n, t)) {
        d(o, t, e, function() {
            t.created && (0, y.bind)(t.created, this).apply(void 0, arguments), t.created_xcx && (0, 
            y.bind)(t.created_xcx, this).apply(void 0, arguments);
        }), r = !0;
        for (var a in n) {
            (function(i) {
                var a = [];
                if (!o && r && "attached" == i) return "continue";
                if (o && r && "onLoad" == i) return "continue";
                var c = !0, s = !1, u = void 0;
                try {
                    for (var h, d = n[i][Symbol.iterator](); !(c = (h = d.next()).done); c = !0) {
                        var f = h.value;
                        t[f] && a.push(f);
                    }
                } catch (t) {
                    s = !0, u = t;
                } finally {
                    try {
                        !c && d.return && d.return();
                    } finally {
                        if (s) throw u;
                    }
                }
                if (0 == a.length) return "continue";
                e[i] = function() {
                    for (var e = this, o = arguments.length, n = Array(o), r = 0; r < o; r++) n[r] = arguments[r];
                    a.forEach(function(o) {
                        t[o] && (0, y.bind)(t[o], e).apply(void 0, n);
                    });
                };
            })(a);
        }
    } else d(o, t, e);
}

function n() {
    this.$nextTickFn = [], this.__proto__.$nextTick = function(t) {
        var e = this;
        if (void 0 === t) {
            if (void 0 === m.default) throw new Error("当前环境不支持Promise！");
            return new m.default(function(t, o) {
                var n = function() {
                    t();
                };
                n.promise = !0, e.$nextTickFn.push(n);
            });
        }
        this.$nextTickFn.push(t);
    };
}

function r(t, e) {
    t.onShareAppMessage && (e.onShareAppMessage = t.onShareAppMessage);
}

function i(t, e) {
    var o = [], n = !1;
    for (var r in t) o = o.concat(t[r]);
    return o.forEach(function(t) {
        if (e.hasOwnProperty(t)) return n = !0, !1;
    }), n;
}

function a(t, e, o) {
    var n = null;
    o ? n = e : (e.methods = {}, n = e.methods);
    for (var r in t.methods) !function(e) {
        n[e] = function() {
            return e && (0, y.bind)(t.methods[e], this).apply(void 0, arguments);
        };
    }(r);
}

function c(t, e) {
    if (t.onPageScroll) {
        e.onPageScroll = (0, y.throttle)(function() {
            t.onPageScroll && (0, y.bind)(t.onPageScroll, this).apply(void 0, arguments);
        }, 400, 800);
    }
}

function s(t, e) {
    var o = t.props;
    if (o) {
        for (var n in o) !function(e) {
            var n = o[e].default;
            if (o[e].value = "function" == typeof n ? n() : n, delete o[e].default, t.watch && t.watch[e]) {
                if ("function" != typeof t.watch[e] && "function" != typeof t.watch[e].handler) throw new Error("watch属性中键值应为function！");
                o[e].observer = function(o, n) {
                    (0, y.isPlainObject)(t.watch[e]) ? t.watch[e].handler && (0, y.bind)(t.watch[e].handler, this)(o, n) : t.watch[e] && (0, 
                    y.bind)(t.watch[e], this)(o, n);
                };
            }
        }(n);
        e.properties = (0, y.extend)({}, o, !0);
    }
}

function u(t, e, o) {
    if (t.store) {
        var n = t.store();
        n.state && Object.keys(n.state).forEach(function(e) {
            (0, y.proxy)(n, n, e, "state"), t.computed && t.computed[e] || (0, y.proxy)(n, o, e, "state");
        }), n.actions && Object.keys(n.actions).forEach(function(t) {
            (0, y.proxy)(n, o, t, "actions"), (0, y.proxy)(n, n, t, "actions");
        }), e.store = n;
    }
    t.data && (0, y.isNotEmptyObject)(t.data) && Object.keys(t.data).forEach(function(t) {
        return (0, y.proxy)(o, o, t, "data");
    }), t.props && (0, y.isNotEmptyObject)(t.props) && Object.keys(o.properties).forEach(function(e) {
        t.props[e] && (0, y.proxy)(o, o, e, "properties");
    });
}

function h(t) {
    t.__proto__.$emit = t.triggerEvent;
}

function d(t, e, o, r) {
    o.data = Object.assign({}, e.store ? e.store().state : {}, e.data), o[t ? "onLoad" : "created"] = function() {
        var i = this;
        this._dataQueue = {}, _.addInstanceId.call(this), f(this), (0, y.bind)(n, this)(), 
        u(e, o, this), e.store && (this.store = o.store, l(this, e, t), this.__proto__.$set = function(t, e, o) {
            Object.is(t, i.store.state) && (0, y.proxy)(i.store, i.store, e, "state"), (0, x.set)(t, e, o, i);
        }, this.store.$this = this), t && (this.$query = arguments.length <= 0 ? void 0 : arguments[0]), 
        !t && h(this), t && r && (0, y.bind)(r, this).apply(void 0, arguments);
    }, t || (o.attached = function() {
        this.$root = p(), r && (0, y.bind)(r, this).apply(void 0, arguments);
    });
}

function f(t) {
    t.$xgoto = function() {
        if (y.isXcx) {
            for (var e = arguments.length, o = Array(e), n = 0; n < e; n++) o[n] = arguments[n];
            var r = o[0].filter(function(t) {
                return t.startsWith("/pages/");
            })[0];
            o[0] = r, t.$goto.apply(t, o);
        }
    };
}

function p() {
    return getCurrentPages().pop();
}

function l(t, e, o) {
    o && t.speedMark(11), (0, x.observe)(t.store.state, void 0, t), o && t.speedMark(12), 
    t._watchers = [], (0, b.init$watch)(t), !!e.computed && (0, w.initComputed)(t, e.computed), 
    !!e.watch && (0, b.initWatch)(t, v(e));
}

function v(t) {
    var e = {};
    return Object.keys(t.watch).forEach(function(o) {
        var n = o.split(".")[0];
        t.props && t.props[n] || (e[o] = t.watch[o]);
    }), e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.parse = function(t) {
    if (!t) throw new Error("page option 参数不合法");
    var e = {};
    return a(t, e, !0), o(t, e, !0), c(t, e), r(t, e), e;
}, exports.componentParse = function(n) {
    if (!n) throw new Error("component option 参数不合法");
    var r = {};
    return e(n, r), s(n, r), a(n, r, !1), o(n, r, !1), t(n, r), r;
};

var y = require("../../../util/index"), x = require("../../../observer/index"), b = require("../../../observer/watcher"), w = require("../../../observer/computed"), m = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../../../libs/promise.min")), _ = require("../instanceid");