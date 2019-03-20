function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function e(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" !== (void 0 === e ? "undefined" : r(e)) && "function" != typeof e ? t : e;
}

function o(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === e ? "undefined" : r(e)));
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}

var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function() {
    function t(t, e) {
        for (var o = 0; o < e.length; o++) {
            var r = e[o];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, r.key, r);
        }
    }
    return function(e, o, r) {
        return o && t(e.prototype, o), r && t(e, r), e;
    };
}(), i = function t(e, o, r) {
    null === e && (e = Function.prototype);
    var n = Object.getOwnPropertyDescriptor(e, o);
    if (void 0 === n) {
        var i = Object.getPrototypeOf(e);
        return null === i ? void 0 : t(i, o, r);
    }
    if ("value" in n) return n.value;
    var a = n.get;
    if (void 0 !== a) return a.call(r);
}, a = require("../../../../common/taro/@tarojs/taro-weapp/index.js"), s = (function(t) {
    t && t.__esModule;
}(a), require("../../../../api/Ptag/Ptag_utils.js")), u = require("../../../../common/navigator.js"), p = function(r) {
    function p() {
        var o, r, n, i;
        t(this, p);
        for (var a = arguments.length, c = Array(a), l = 0; l < a; l++) c[l] = arguments[l];
        return r = n = e(this, (o = p.__proto__ || Object.getPrototypeOf(p)).call.apply(o, [ this ].concat(c))), 
        n.$usedState = [ "entries" ], n.handleItemClick = function(t) {
            var e = t.currentTarget.dataset, o = e.key, r = e.cateIdx, i = e.url, a = e.pps, p = n.props.entries;
            /key=([^=&]+)/.test(i) ? (0, u.goto)("/pages/search/list/list", {
                key: o,
                pps: a
            }) : (0, u.goto)(i), s.PtagUtils.addPtag(p[r].ptag);
        }, n.$$refs = [], i = r, e(n, i);
    }
    return o(p, a.Component), n(p, [ {
        key: "_constructor",
        value: function(t) {
            i(p.prototype.__proto__ || Object.getPrototypeOf(p.prototype), "_constructor", this).call(this, t);
        }
    }, {
        key: "_createData",
        value: function() {
            this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
            var t = this.__props.entries, e = void 0 === t ? [] : t;
            return Object.assign(this.__state, {
                entries: e
            }), this.__state;
        }
    } ]), p;
}();

p.properties = {
    entries: {
        type: null,
        value: null
    }
}, p.$$events = [ "handleItemClick" ], exports.default = p, new (require("../../../../bases/component.js").JDComponent)(require("../../../../common/taro/@tarojs/taro-weapp/index.js").default.createComponent(p));