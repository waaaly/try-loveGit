function e(e, o, n) {
    "function" == typeof n ? (s.get = t(o), s.set = r.noop) : (s.get = n.get ? !1 !== n.cache ? t(o) : n.get : r.noop, 
    s.set = n.set ? n.set : r.noop), s.set === r.noop && (s.set = function() {
        console.error('Computed property "' + o + '" was assigned to but it has no setter.', this);
    }), Object.defineProperty(e, o, s);
}

function t(e) {
    return function() {
        var t = this._computedWatchers && this._computedWatchers[e];
        if (t) return t.dirty && t.evaluate(), n.Dep.target && t.depend(), t.value;
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.initComputed = function(t, n) {
    var s = t._computedWatchers = t._computedWatchers || Object.create(null);
    for (var p in n) !function(p) {
        e(t, p, n[p]);
        var c = n[p], u = function() {
            var e = "function" == typeof c ? c : c.get, t = e.call(this), o = s[p] && s[p].setDataVal;
            return (!o || o && !(0, r.looseEqual)(o, t)) && (this.store && void 0 !== this.store[p] ? this.store[p] = t : ((0, 
            a.setData)(this, t, p), s[p].setDataVal = (0, r.isPlainObject)(t) ? (0, r.extend)({}, t, !0) : t)), 
            t;
        };
        null == u && console.warn('Getter is missing for computed property "' + p + '".', t), 
        s[p] = new o.Watcher(t, u || r.noop, r.noop, i), p in t ? p in t.data ? console.warn('The computed property "' + p + '" is already defined in data.', t) : t.properties && p in t.properties && console.warn('The computed property "' + p + '" is already defined as a prop.', t) : e(t, p, c);
    }(p);
}, exports.defineComputed = e;

var o = require("./watcher"), r = require("../util/index"), n = require("./dep"), a = require("../instance/xcx/setdata"), i = {
    lazy: !0
}, s = {
    enumerable: !0,
    configurable: !0,
    get: r.noop,
    set: r.noop
};