function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function e(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" !== (void 0 === e ? "undefined" : o(e)) && "function" != typeof e ? t : e;
}

function n(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === e ? "undefined" : o(e)));
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}

var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, o.key, o);
        }
    }
    return function(e, n, o) {
        return n && t(e.prototype, n), o && t(e, o), e;
    };
}(), r = function t(e, n, o) {
    null === e && (e = Function.prototype);
    var a = Object.getOwnPropertyDescriptor(e, n);
    if (void 0 === a) {
        var r = Object.getPrototypeOf(e);
        return null === r ? void 0 : t(r, n, o);
    }
    if ("value" in a) return a.value;
    var i = a.get;
    if (void 0 !== i) return i.call(o);
}, i = require("../../common/taro/@tarojs/taro-weapp/index.js"), s = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(i), c = require("../../common/navigator.js"), l = require("../../common/fe_report/speed.js"), u = require("../../api/Ptag/Ptag_utils.js"), f = require("../cate/model.js"), p = void 0, d = void 0, h = function(o) {
    function h() {
        var n, o, a, r;
        t(this, h);
        for (var i = arguments.length, s = Array(i), c = 0; c < i; c++) s[c] = arguments[c];
        return o = a = e(this, (n = h.__proto__ || Object.getPrototypeOf(h)).call.apply(n, [ this ].concat(s))), 
        a.$usedState = [ "tabEntries", "curIdx", "bannerConfig", "promotion", "commonWords", "channelInfo", "st1", "st2", "cateEntries", "ptag" ], 
        a.config = {
            navigationBarTitleText: "商品分类"
        }, a.state = {
            tabEntries: [ {
                areaId: "",
                name: "",
                ptag: "",
                loading: !0,
                errMsg: ""
            } ],
            cateEntries: [],
            curIdx: 0,
            st1: 0,
            st2: 0,
            ptag: "138043.1.2"
        }, a.handleTabClick = function(t) {
            var e = t.index, n = t.ptag, o = a.state, r = o.curIdx, i = o.cateEntries;
            e != r && (a.setState({
                curIdx: e,
                st2: 0
            }), i[e] || a.loadData(e), a.scrollToTabItem(e), n && u.PtagUtils.addPtag(n));
        }, a.$$refs = [], r = o, e(a, r);
    }
    return n(h, i.Component), a(h, [ {
        key: "_constructor",
        value: function(t) {
            r(h.prototype.__proto__ || Object.getPrototypeOf(h.prototype), "_constructor", this).call(this, t);
        }
    }, {
        key: "componentWillMount",
        value: function() {
            (d = new l.Speed(605)).mark(2), !p && s.default.getSystemInfo({
                success: function(t) {
                    var e = t && t.windowHeight;
                    e && (p = e - 20 - 44 - 50);
                }
            }), this.loadData();
        }
    }, {
        key: "componentDidMount",
        value: function() {
            d.mark(3);
        }
    }, {
        key: "onShareAppMessage",
        value: function() {
            return {
                title: "京东购物，多·快·好·省",
                path: "/pages/cate/cate"
            };
        }
    }, {
        key: "loadData",
        value: function() {
            var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, n = this.state.tabEntries, o = this.state.cateEntries, a = n[e].areaId;
            n[e].loading = !0, n[e].errMsg = "", this.setState({
                tabEntries: n
            }), (0, f.getData)(a).then(function(t) {
                !a && d.mark(4), t.tabEntries && (n = t.tabEntries), o[e] = t.cateData;
            }).catch(function(t) {
                n[e].errMsg = t.message || t;
            }).then(function() {
                n[e].loading = !1, t.setState({
                    tabEntries: n,
                    cateEntries: o
                }, function() {
                    !a && d.mark(5).report();
                });
            });
        }
    }, {
        key: "handleTapOnSearchBar",
        value: function() {
            (0, c.goto)("/pages/search/list/list"), u.PtagUtils.addPtag("7458.1.1");
        }
    }, {
        key: "handleChannelClick",
        value: function(t) {
            var e = t.currentTarget.dataset.url;
            (0, c.goto)(e);
        }
    }, {
        key: "handleClickRetryBtn",
        value: function() {
            this.loadData(this.state.curIdx);
        }
    }, {
        key: "scrollToTabItem",
        value: function(t) {
            p && this.setState({
                st1: 50 * t - (p - 50) / 2
            });
        }
    }, {
        key: "_createData",
        value: function() {
            this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
            var t = this.__state, e = t.tabEntries, n = t.cateEntries, o = t.curIdx, a = (t.st1, 
            t.st2, void 0), r = void 0, i = void 0, s = void 0;
            return e[o].loading, !e[o].loading && e[o].errMsg || e[o].loading || (a = n[o].extInfo1, 
            r = n[o].level1words_2 && n[o].level1words_2[0] || null, i = n[o].level1words_1, 
            s = n[o].channelInfo || null), Object.assign(this.__state, {
                bannerConfig: a,
                promotion: r,
                commonWords: i,
                channelInfo: s
            }), this.__state;
        }
    } ], [ {
        key: "onPreLoad",
        value: function() {
            (0, f.getInitCateData)();
        }
    } ]), h;
}();

h.properties = {}, h.$$events = [ "handleClickRetryBtn", "handleChannelClick", "handleTapOnSearchBar", "handleTabClick" ], 
exports.default = h, new (require("../../bases/page.taro.js").JDPage)(require("../../common/taro/@tarojs/taro-weapp/index.js").default.createComponent(h, !0), !0);