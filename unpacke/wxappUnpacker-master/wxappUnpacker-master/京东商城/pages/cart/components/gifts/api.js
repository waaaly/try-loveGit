function e(e, n, r) {
    return n in e ? Object.defineProperty(e, n, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[n] = r, e;
}

function n() {
    return Object.values(o);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.hasChanged = exports.queryById = exports.formatList = exports.formatMainGoods = void 0;

var r = require("../../../../common/logger.js"), t = require("../../../../common/numberp.js"), i = (new r.Logger("赠品组件API"), 
{}), o = {};

exports.formatMainGoods = function(e) {
    var n = (0, t.divide)(e.price, 100).toFixed(2).split(/\./);
    return {
        name: e.name,
        image: e.image,
        num: e.num,
        integer: n[0],
        decimals: n[1]
    };
}, exports.formatList = function(n) {
    return i = {}, o = {}, n.forEach(function(n, r) {
        n.items = n.items.map(function(n, t) {
            var u = n.id;
            return Object.assign(n, {
                grpIndex: r,
                index: t
            }), i[u] = n, n.checked && Object.assign(o, e({}, u, Object.assign({}, n))), n;
        });
    }), n;
}, exports.queryById = function(e) {
    return i[e];
}, exports.hasChanged = function(e) {
    var r = n(), t = !1, i = r.length >= e.length, o = i ? r : e, u = i ? e : r;
    return o.length !== u.length || (o.every(function(e) {
        var n = u.find(function(n) {
            return n.id == e.id;
        });
        return n ? n.num == e.num || (t = !0, !1) : (t = !0, !1);
    }), t);
};