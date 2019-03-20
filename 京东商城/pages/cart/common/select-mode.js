function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e) {
    if (Array.isArray(e)) {
        for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
        return r;
    }
    return Array.from(e);
}

function r(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
}

function n(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    if (!e) throw Error("not found uuid");
    var i = f.queryProductByUUID(e);
    if (!i) return b.error("uuid:" + e + "，未找到商品");
    var u = e.split(/_/), o = d(u, 1)[0], s = f.getItemId(i), l = a.call(this, o), h = f.queryItemByItemId(s), v = this[k], y = {};
    return 2 == h.polyType ? (y = r({}, "venders[" + l.index + "].list[" + h.itemIndex + "].editChecked", t), 
    t ? v[h.uuid] = h : delete v[h.uuid], h.editChecked = t, p(h)) : (h.suits && h.suits.forEach(function(n, i) {
        n.uuid == e && (y = r({}, "venders[" + l.index + "].list[" + h.itemIndex + "].suits[" + i + "].editChecked", t), 
        t ? v[n.uuid] = n : delete v[n.uuid], n.editChecked = t, p(h));
    }), h.products.forEach(function(n, i) {
        n.uuid == e && (y = r({}, "venders[" + l.index + "].list[" + h.itemIndex + "].products[" + i + "].editChecked", t), 
        t ? v[n.uuid] = n : delete v[n.uuid], n.editChecked = t, m(n));
    })), n ? y : Object.assign(y, c.call(this));
}

function i(e, i) {
    var u = this, o = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], s = a.call(this, e), l = r({}, "venders[" + s.index + "].editChecked", i);
    return s.editChecked = i, y(s), s.list.forEach(function(e) {
        2 == e.polyType ? Object.assign(l, n.call(u, e.uuid, i, !0)) : [].concat(t(e.suits || []), t(e.products)).forEach(function(e) {
            Object.assign(l, n.call(u, e.uuid, i, !0));
        });
    }), o ? l : Object.assign(l, c.call(this));
}

function u(e) {
    var t = this;
    o.call(this);
    var r = {};
    return this[O].venders.forEach(function(n) {
        Object.assign(r, i.call(t, n.vid, e, !0));
    }), Object.assign(r, c.call(this));
}

function a(e) {
    return o.apply(this), this[O].venders.find(function(t) {
        return t.vid == e;
    });
}

function o() {
    var e = this[O];
    if (!e || !e.venders) throw Error("not venders data");
}

function c() {
    var e = {}, t = this[k], n = this[O], i = s(n), u = !0, a = !1, o = void 0;
    try {
        for (var c, l = Object.entries(t)[Symbol.iterator](); !(u = (c = l.next()).done); u = !0) {
            var f = d(c.value, 1)[0].split(/_/), h = i[d(f, 1)[0]];
            h && (h.checked += 1);
        }
    } catch (e) {
        a = !0, o = e;
    } finally {
        try {
            !u && l.return && l.return();
        } finally {
            if (a) throw o;
        }
    }
    var v = Object.entries(i), y = 0, p = !0, m = !1, b = void 0;
    try {
        for (var g, j = v[Symbol.iterator](); !(p = (g = j.next()).done); p = !0) {
            var x = d(g.value, 2)[1], E = x.sum == x.checked;
            E && y++, Object.assign(e, r({}, "venders[" + x.index + "].editChecked", E));
        }
    } catch (e) {
        m = !0, b = e;
    } finally {
        try {
            !p && j.return && j.return();
        } finally {
            if (m) throw b;
        }
    }
    return n.summary.editChecked = v.length == y, Object.assign(e, {
        summary: n.summary
    }), e;
}

function s(e) {
    var r = {};
    return e.venders.forEach(function(e) {
        r[e.vid] = {
            sum: 0,
            checked: 0,
            index: e.index
        }, e.list.forEach(function(n) {
            2 == n.polyType ? r[e.vid].sum += 1 : [].concat(t(n.suits || []), t(n.products)).forEach(function() {
                r[e.vid].sum += 1;
            });
        });
    }), r;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.SelectMode = void 0;

var l = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), d = function() {
    function e(e, t) {
        var r = [], n = !0, i = !1, u = void 0;
        try {
            for (var a, o = e[Symbol.iterator](); !(n = (a = o.next()).done) && (r.push(a.value), 
            !t || r.length !== t); n = !0) ;
        } catch (e) {
            i = !0, u = e;
        } finally {
            try {
                !n && o.return && o.return();
            } finally {
                if (i) throw u;
            }
        }
        return r;
    }
    return function(t, r) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, r);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), f = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}(require("../models/model")), h = require("../../../common/logger"), v = require("../models/data-store.js"), y = v.DataStore.updateVender, p = v.DataStore.updateItem, m = v.DataStore.updateProduct, b = new h.Logger("购物车编辑模式选择"), g = {
    PRODUCT: "product",
    VENDER: "vender",
    ALL: "all"
}, O = Symbol("rawData"), k = Symbol("selections"), j = function() {
    function t() {
        e(this, t);
    }
    return l(t, null, [ {
        key: "fill",
        value: function(e) {
            this[O] = e, this[k] = {};
        }
    }, {
        key: "clean",
        value: function() {
            this[O] = {};
        }
    }, {
        key: "update",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this[O] && Object.assign(this[O], e);
        }
    }, {
        key: "getSelections",
        value: function() {
            var e = this[k];
            return Object.values(e);
        }
    }, {
        key: "select",
        value: function(e, t, r) {
            return o.apply(this), e == g.PRODUCT ? n.apply(this, [ t, r ]) : e == g.VENDER ? i.apply(this, [ t, r ]) : e == g.ALL ? u.apply(this, [ r ]) : void 0;
        }
    } ]), t;
}();

exports.SelectMode = j;