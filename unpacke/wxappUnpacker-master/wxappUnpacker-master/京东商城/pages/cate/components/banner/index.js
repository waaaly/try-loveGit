function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" !== (void 0 === t ? "undefined" : r(t)) && "function" != typeof t ? e : t;
}

function o(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === t ? "undefined" : r(t)));
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function() {
    function e(e, t) {
        for (var o = 0; o < t.length; o++) {
            var r = t[o];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, o, r) {
        return o && e(t.prototype, o), r && e(t, r), t;
    };
}(), i = function e(t, o, r) {
    null === t && (t = Function.prototype);
    var n = Object.getOwnPropertyDescriptor(t, o);
    if (void 0 === n) {
        var i = Object.getPrototypeOf(t);
        return null === i ? void 0 : e(i, o, r);
    }
    if ("value" in n) return n.value;
    var a = n.get;
    if (void 0 !== a) return a.call(r);
}, a = require("../../../../common/taro/@tarojs/taro-weapp/index.js"), u = (function(e) {
    e && e.__esModule;
}(a), require("../../../../common/navigator.js")), s = require("../../../../common/utils.js"), c = require("../../../cate/model.js"), l = {}, p = function(r) {
    function p() {
        var o, r, n, i;
        e(this, p);
        for (var a = arguments.length, u = Array(a), s = 0; s < a; s++) u[s] = arguments[s];
        return r = n = t(this, (o = p.__proto__ || Object.getPrototypeOf(p)).call.apply(o, [ this ].concat(u))), 
        n.$usedState = [ "entries", "swiperIdx", "config" ], n.handleSlideChange = function(e) {
            n.setState({
                swiperIdx: e.detail.current
            });
        }, n.$$refs = [], i = r, t(n, i);
    }
    return o(p, a.Component), n(p, [ {
        key: "_constructor",
        value: function(e) {
            i(p.prototype.__proto__ || Object.getPrototypeOf(p.prototype), "_constructor", this).call(this, e), 
            this.updateConfig(e.config);
        }
    }, {
        key: "componentWillReceiveProps",
        value: function(e) {
            this.updateConfig(e.config);
        }
    }, {
        key: "updateConfig",
        value: function() {
            var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").split("|"), t = !Number.isNaN(e[0]) && e[0], o = e[1] || "";
            return t ? l[t] ? this.setState({
                entries: l[t],
                swiperIdx: 0
            }) : (this.groupId = t, this.ptag = o, void this.loadData()) : this.setState({
                entries: [],
                swiperIdx: 0
            });
        }
    }, {
        key: "loadData",
        value: function() {
            var e = this;
            (0, c.getCpcData)([ this.groupId ]).then(function(t) {
                var o = t[e.groupId] || {}, r = [];
                for (var n in o) r = r.concat(o[n] || []);
                r = r.map(function(t) {
                    return {
                        image: (0, s.getImg)(t.material, 670),
                        url: (0, c.addPtag)(t.sUrl, e.ptag)
                    };
                }), l[e.groupId] = r, e.setState({
                    entries: r,
                    swiperIdx: 0
                });
            });
        }
    }, {
        key: "handleItemClick",
        value: function(e) {
            var t = e.currentTarget.dataset.url;
            (0, u.goto)(t);
        }
    }, {
        key: "_createData",
        value: function() {
            this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
            var e = this.__state, t = e.entries, o = void 0 === t ? [] : t, r = e.swiperIdx, n = void 0 === r ? 0 : r;
            return o.length ? (Object.assign(this.__state, {
                entries: o,
                swiperIdx: n
            }), this.__state) : null;
        }
    } ]), p;
}();

p.properties = {
    config: {
        type: null,
        value: null
    }
}, p.$$events = [ "handleSlideChange", "handleItemClick" ], exports.default = p, 
new (require("../../../../bases/component.js").JDComponent)(require("../../../../common/taro/@tarojs/taro-weapp/index.js").default.createComponent(p));