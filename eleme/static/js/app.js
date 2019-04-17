var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

global.webpackJsonp([ 2 ], {
    10: function(e, t, n) {
        var a = n(18), o = !1, i = n(0)(a.a, null, function(e) {
            o || n(29);
        }, null, null);
        i.options.__file = "src/App.vue", i.esModule && Object.keys(i.esModule).some(function(e) {
            return "default" !== e && "__" !== e.substr(0, 2);
        }) && console.error("named exports are not supported in *.vue files."), t.a = i.exports;
    },
    13: function(e, t, n) {
        n.d(t, "a", function() {
            return c;
        });
        var a = n(4), o = n.n(a), i = n(3), r = n(2), s = new o.a();
        s.config.baseURL = i.a.hosts.cdn;
        var c = function(e) {
            return s.get("/lib/city-list@0.0.3/city_list.json", e).then(r.b);
        };
    },
    14: function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(1), o = n.n(a), i = n(10), r = n(9), s = (n.n(r), n(7)), c = n(8);
        o.a.config.productionTip = !1, i.a.mpType = "app", o.a.prototype.$store = s.a, o.a.use(c.a), 
        new o.a(i.a).$mount(), App.mpvueBridge = {
            $store: s.a
        }, t.default = {
            config: {
                pages: [ "^pages/index/index", "pages/checkout/index/index", "pages/address/address", "pages/checkout/hongbao/index", "pages/checkout/invoice/select/index", "pages/checkout/invoice/add/index", "pages/checkout/invoice/edit/index", "pages/checkout/remark/index", "pages/order/list/order-list", "pages/order/detail/order-detail", "pages/shop/list/shop-list", "pages/shop/shop/index", "pages/shop/detail/index", "pages/shop/rating/index", "pages/sales/index", "pages/profile/index", "pages/search/search", "pages/location/location", "pages/auth/index", "pages/help/index", "pages/help/questions/questions", "pages/share/index", "pages/promotion/hongbao/hongbao", "pages/pullNewUser/shop/index", "pages/pullNewUser/shopHongbao/index", "pages/pullNewUser/shopHongbao/success/index", "pages/ka/index", "pages/newuser/index", "pages/hongbao/index", "pages/commend/index", "pages/commend/rules/index", "pages/invitehongbao/index", "pages/freedinner/index", "pages/container/index", "pages/giftcard/index", "pages/giftcard/buyCard/index", "pages/giftcard/buyCard/cardDetail/index", "pages/giftcard/cardDetail/records/records", "pages/giftcard/cardDetail/info/info", "pages/giftcard/myCards/index", "pages/giftcard/myCards/pages/detail/index", "pages/giftcard/myCards/pages/share/index", "pages/giftcard/cardDetail/index", "pages/wechain/index", "pages/wechain/cashpage/index", "pages/wechain/pages/redpack/index", "pages/wechain/pages/coupon/index", "pages/wechain/pages/rule/index", "pages/pay/index", "pages/luckyhongbao/index", "pages/city/main", "pages/plouto/main", "pages/recommend/index", "pages/recommend/strategy/index", "pages/recommend/water/index" ],
                window: {
                    backgroundTextStyle: "light",
                    navigationBarBackgroundColor: "#0097ff",
                    navigationBarTitleText: "饿了么",
                    navigationBarTextStyle: "white"
                },
                tabBar: {
                    color: "#666",
                    selectedColor: "#0097ff",
                    borderStyle: "black",
                    backgroundColor: "#fff",
                    list: [ {
                        pagePath: "pages/index/index",
                        iconPath: "common/icons/tab_shopping.png",
                        selectedIconPath: "common/icons/tab_shopping_selected.png",
                        text: "外卖"
                    }, {
                        pagePath: "pages/order/list/order-list",
                        iconPath: "common/icons/tab_order.png",
                        selectedIconPath: "common/icons/tab_order_selected.png",
                        text: "订单"
                    }, {
                        pagePath: "pages/profile/index",
                        iconPath: "common/icons/tab_user.png",
                        selectedIconPath: "common/icons/tab_user_selected.png",
                        text: "我的"
                    } ]
                },
                debug: !0,
                navigateToMiniProgramAppIdList: [ "wx336dcaf6a1ecf632" ],
                permission: {
                    "scope.userLocation": {
                        desc: "位置信息将用于展示可为你提供服务的商家"
                    }
                }
            }
        };
    },
    18: function(e, t, n) {
        t.a = {};
    },
    29: function(e, t) {},
    7: function(e, t, n) {
        var a = n(1), o = n.n(a), i = n(6), r = n(13), s = function() {
            function e(e, t) {
                var n = [], a = !0, o = !1, i = void 0;
                try {
                    for (var r, s = e[Symbol.iterator](); !(a = (r = s.next()).done) && (n.push(r.value), 
                    !t || n.length !== t); a = !0) ;
                } catch (e) {
                    o = !0, i = e;
                } finally {
                    try {
                        !a && s.return && s.return();
                    } finally {
                        if (o) throw i;
                    }
                }
                return n;
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
        }();
        o.a.use(i.a), t.a = new i.a.Store({
            state: {
                cityName: "",
                cityList: {},
                geohash: "",
                latitude: "",
                longitude: "",
                locState: 0
            },
            mutations: {
                SET_GEOHASH: function(e, t) {
                    var n = getApp().services.Geohash.decode(t), a = s(n, 2), o = a[0], i = a[1];
                    e.geohash = t, e.latitude = o, e.longitude = i, e.locState = 2;
                },
                SET_CITY: function(e, t) {
                    e.cityName = t.cityName;
                },
                SET_CITY_LIST: function(e, t) {
                    e.cityList = t;
                }
            },
            actions: {
                GET_CITY_LIST: function(e) {
                    var t = e.commit, a = wx.getStorageSync("cityList"), o = !(!a || !a.cityList);
                    (o ? Promise.resolve(a) : n.i(r.a)()).then(function(e) {
                        t("SET_CITY_LIST", e), o || wx.setStorage({
                            key: "cityList",
                            data: e
                        });
                    }).catch(function(e) {});
                }
            }
        });
    },
    8: function(t, n, a) {
        function o() {
            var e = d(this);
            if (e) {
                var t = c(this);
                h(e, t);
            }
        }
        function i() {
            var e = d(this);
            if (e) {
                var t = c(this);
                y(e, t);
            }
        }
        function r(e) {
            return [].concat(Object.keys(e._data || {}), Object.keys(e._props || {}), Object.keys(e._mpProps || {}), Object.keys(e._computedWatchers || {})).reduce(function(t, n) {
                return t[n] = e[n], t;
            }, {});
        }
        function s(e, t) {
            void 0 === t && (t = []);
            var n = (e || {}).$parent;
            return n ? (t.unshift(u(n)), n.$parent ? s(n, t) : t) : t;
        }
        function c(e) {
            var t = s(e).join(","), n = t + (t ? "," : "") + u(e), a = Object.assign(r(e), {
                $k: n,
                $kk: n + ",",
                $p: t
            }), o = {};
            return o["$root." + n] = a, o;
        }
        function p(e, t, n) {
            function a() {
                c = !1 === n.leading ? 0 : Date.now(), s = null, r = e.apply(o, i), s || (o = i = null);
            }
            var o, i, r, s = null, c = 0;
            return n || (n = {}), function(p, d) {
                var u = Date.now();
                c || !1 !== n.leading || (c = u);
                var l = t - (u - c);
                return o = this, i = i ? [ p, Object.assign(i[1], d) ] : [ p, d ], l <= 0 || l > t ? (clearTimeout(s), 
                s = null, c = u, r = e.apply(o, i), s || (o = i = null)) : s || !1 === n.trailing || (s = setTimeout(a, l)), 
                r;
            };
        }
        function d(e) {
            var t = e.$root.$mp || {}, n = t.mpType;
            void 0 === n && (n = "");
            var a = t.page;
            if ("app" !== n && a && "function" == typeof a.setData) return a;
        }
        function u(e) {
            return e && e.$attrs ? e.$attrs.mpcomid : "0";
        }
        function l(e, t, n, a) {
            if (n !== a && void 0 !== n) if (null == n || null == a || (void 0 === n ? "undefined" : f(n)) !== (void 0 === a ? "undefined" : f(a))) e[t] = n; else if (Array.isArray(n) && Array.isArray(a)) if (n.length === a.length) for (var o = 0, i = n.length; o < i; ++o) l(e, t + "[" + o + "]", n[o], a[o]); else e[t] = n; else if ("object" === (void 0 === n ? "undefined" : f(n)) && "object" === (void 0 === a ? "undefined" : f(a))) {
                var r = Object.keys(n), s = Object.keys(a);
                if (r.length !== s.length) e[t] = n; else {
                    for (var c = Object.create(null), p = 0, d = r.length; p < d; ++p) c[r[p]] = !0, 
                    c[s[p]] = !0;
                    if (Object.keys(c).length !== r.length) e[t] = n; else for (var u = 0, g = r.length; u < g; ++u) {
                        var h = r[u];
                        l(e, t + "." + h, n[h], a[h]);
                    }
                }
            } else n !== a && (e[t] = n);
        }
        function g(e, t) {
            for (var n = Object.keys(e), a = {}, o = 0, i = n.length; o < i; ++o) {
                for (var r = n[o], s = r.split("."), c = t[s[0]], p = 1, d = s.length; p < d && void 0 !== c; ++p) c = c[s[p]];
                l(a, r, e[r], c);
            }
            return a;
        }
        var f = "function" == typeof Symbol && "symbol" === e(Symbol.iterator) ? function(t) {
            return void 0 === t ? "undefined" : e(t);
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
        };
        n.a = {
            install: function(e) {
                e.prototype.$updateDataToMP = o, e.prototype.$forceUpdateDataToMP = i;
            }
        };
        var h = p(function(e, t) {
            var n = g(t, e.data);
            0 !== Object.keys(n).length ? e.setData(n) : e.setData(t);
        }, 50), y = p(function(e, t) {
            e.setData(t);
        }, 50);
    }
}, [ 14 ]);