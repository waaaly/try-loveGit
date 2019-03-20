function t(t, r, o, a, i) {
    t && Object.keys(t).forEach(function(t) {
        return (0, e.proxy)(r, o, t, a, i);
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.addProxy = t, exports.addAllProxy = function(r, o) {
    var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "$data";
    if (r.store) {
        var i = o[a], n = o.store;
        t(i, o, n, a, !0), n.state = i;
        var s = r.staticData;
        s && (0, e.isNotEmptyObject)(s) && t(s, r, o, "staticData");
    }
}, exports.mountStore = function(e, r) {
    var o = e.store && e.store();
    if (o) {
        var a = o.state || {};
        return o.$this = r, t(o.actions, o, o, "actions"), t(o.actions, o, r, "actions"), 
        o && (r.store = o), a;
    }
}, exports.addInitCreated = function(t) {
    t.created_init = function() {};
};

var e = require("../../util/index");