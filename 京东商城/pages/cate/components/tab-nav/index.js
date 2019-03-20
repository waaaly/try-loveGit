function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function e(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" !== (void 0 === e ? "undefined" : r(e)) && "function" != typeof e ? t : e;
}

function n(t, e) {
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

var o = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, r.key, r);
        }
    }
    return function(e, n, r) {
        return n && t(e.prototype, n), r && t(e, r), e;
    };
}(), a = function t(e, n, r) {
    null === e && (e = Function.prototype);
    var o = Object.getOwnPropertyDescriptor(e, n);
    if (void 0 === o) {
        var a = Object.getPrototypeOf(e);
        return null === a ? void 0 : t(a, n, r);
    }
    if ("value" in o) return o.value;
    var i = o.get;
    if (void 0 !== i) return i.call(r);
}, i = require("../../../../common/taro/@tarojs/taro-weapp/index.js"), u = (function(t) {
    t && t.__esModule;
}(i), function(r) {
    function u() {
        var n, r, o, a;
        t(this, u);
        for (var i = arguments.length, l = Array(i), c = 0; c < i; c++) l[c] = arguments[c];
        return r = o = e(this, (n = u.__proto__ || Object.getPrototypeOf(u)).call.apply(n, [ this ].concat(l))), 
        o.$usedState = [ "st", "curIdx", "tabEntries", "__fn_onTabClick" ], o.handleItemClick = function(t) {
            var e = t.currentTarget.dataset, n = e.index, r = e.ptag;
            o.__triggerPropsFn("onTabClick", [ null ].concat([ {
                index: n,
                ptag: r
            } ]));
        }, o.$$refs = [], a = r, e(o, a);
    }
    return n(u, i.Component), o(u, [ {
        key: "_constructor",
        value: function(t) {
            a(u.prototype.__proto__ || Object.getPrototypeOf(u.prototype), "_constructor", this).call(this, t);
        }
    }, {
        key: "_createData",
        value: function() {
            this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
            var t = this.__props, e = t.tabEntries, n = t.curIdx, r = t.st;
            return Object.assign(this.__state, {
                st: r,
                curIdx: n,
                tabEntries: e
            }), this.__state;
        }
    } ]), u;
}());

u.properties = {
    __fn_onTabClick: {
        type: null,
        value: null
    },
    tabEntries: {
        type: null,
        value: null
    },
    curIdx: {
        type: null,
        value: null
    },
    st: {
        type: null,
        value: null
    }
}, u.$$events = [ "handleItemClick" ], exports.default = u, new (require("../../../../bases/component.js").JDComponent)(require("../../../../common/taro/@tarojs/taro-weapp/index.js").default.createComponent(u));