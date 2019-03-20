function e(e, r) {
    var o = r.props || r.properties;
    o && Object.keys(o).forEach(function(r) {
        (0, t.defineReactive)(e.properties, r, e.properties[r], void 0, e);
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.initObserver = function(i, a) {
    (0, t.observe)(i.$data, void 0, i), e(i, a), i._watchers = [], (0, r.init$watch)(i), 
    a.computed && (0, o.initComputed)(i, a.computed), a.watch && (0, r.initWatch)(i, a.watch), 
    (0, p.triggerLazyComputed)(i);
}, exports.proxyData = function(e, r, t) {
    var o = t.$data;
    o && ((0, a.addProxy)(o, t, t, "$data", !0), e.staticData = (0, i.extend)({}, e.data, !0), 
    (0, a.addAllProxy)(e, t));
    var p = e.props || e.properties;
    p && Object.keys(t.properties).forEach(function(e) {
        void 0 !== p[e] && (0, i.proxy)(t, t, e, "properties");
    });
}, exports.parseProps = function(e, r) {
    var t = e.props || e.properties;
    if (t) {
        if (e.props) for (var o in t) {
            var a = (0, i.isUndefined)(t[o].default) ? t[o].value : t[o].default;
            !(0, i.isUndefined)(a) && (t[o].value = "function" == typeof a ? a() : a), delete t[o].default;
        }
        r.properties = (0, i.extend)({}, t, !0);
    }
}, exports.parseMethods = function(e, r, t) {
    var o = null;
    t ? o = r : (r.methods = {}, o = r.methods);
    for (var a in e.methods) !function(r) {
        o[r] = function() {
            return r && (0, i.bind)(e.methods[r], this).apply(void 0, arguments);
        };
    }(a);
};

var r = require("../../observer/watcher"), t = require("../../observer/index"), o = require("../../observer/computed"), i = require("../../util/index"), a = require("../common/store"), p = require("./setdata");