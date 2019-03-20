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
}, a = require("../../../../common/taro/@tarojs/taro-weapp/index.js"), u = (function(t) {
    t && t.__esModule;
}(a), require("../../../../common/navigator.js")), s = function(r) {
    function s() {
        var o, r, n, i;
        t(this, s);
        for (var a = arguments.length, u = Array(a), c = 0; c < a; c++) u[c] = arguments[c];
        return r = n = e(this, (o = s.__proto__ || Object.getPrototypeOf(s)).call.apply(o, [ this ].concat(u))), 
        n.$usedState = [ "promotion" ], n.$$refs = [], i = r, e(n, i);
    }
    return o(s, a.Component), n(s, [ {
        key: "_constructor",
        value: function(t) {
            i(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "_constructor", this).call(this, t);
        }
    }, {
        key: "handleItemClick",
        value: function(t) {
            var e = t.currentTarget.dataset, o = e.key, r = e.url;
            /\/\//.test(r) && !/key=([^=&]+)/.test(r) ? (0, u.goto)(r) : (0, u.goto)("/pages/search/list/list", {
                key: o
            });
        }
    }, {
        key: "_createData",
        value: function() {
            this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
            var t = this.__props.promotion;
            return t ? (Object.assign(this.__state, {
                promotion: t
            }), this.__state) : null;
        }
    } ]), s;
}();

s.properties = {
    promotion: {
        type: null,
        value: null
    }
}, s.$$events = [ "handleItemClick" ], exports.default = s, new (require("../../../../bases/component.js").JDComponent)(require("../../../../common/taro/@tarojs/taro-weapp/index.js").default.createComponent(s));