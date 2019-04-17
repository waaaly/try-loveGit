global.webpackJsonp([ 3 ], {
    11: function(t, e, i) {
        var a = i(19), s = i(48), n = !1, c = i(0)(a.a, s.a, function(t) {
            n || (i(30), i(31));
        }, "data-v-2754feea", null);
        c.options.__file = "src/pages/city/index.vue", c.esModule && Object.keys(c.esModule).some(function(t) {
            return "default" !== t && "__" !== t.substr(0, 2);
        }) && console.error("named exports are not supported in *.vue files."), c.options.functional && console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions."), 
        e.a = c.exports;
    },
    15: function(t, e, i) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var a = i(1), s = i.n(a), n = i(11);
        new s.a(n.a).$mount(), e.default = {
            config: {
                navigationBarTitleText: "选择城市"
            }
        };
    },
    19: function(t, e, i) {
        var a = i(6), s = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var i = arguments[e];
                for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (t[a] = i[a]);
            }
            return t;
        }, n = (getApp().services.Geohash, null);
        e.a = {
            name: "city",
            components: {},
            data: function() {
                return {
                    keywords: "",
                    searchResult: [],
                    toView: ""
                };
            },
            computed: s({}, a.a.mapState({
                cityData: "cityList",
                cityName: "cityName"
            })),
            watch: {
                keywords: function(t) {
                    if (t) {
                        var e = n || this.cityData.cityList.reduce(function(t, e) {
                            return t.concat(e.cities);
                        }, []);
                        this.searchResult = e.filter(function(e) {
                            return e.name.includes(t) || e.pinyin.includes(t.toLowerCase());
                        }), n || (n = e);
                    }
                }
            },
            methods: {
                jump: function(t) {
                    this.toView = t;
                },
                back: function() {
                    wx.navigateBack();
                },
                selectCity: function(t) {
                    wx.setStorageSync("SELECTED_CITY", t), wx.navigateBack();
                }
            }
        };
    },
    30: function(t, e) {},
    31: function(t, e) {},
    48: function(t, e, i) {
        var a = function() {
            var t = this, e = t.$createElement, i = t._self._c || e;
            return i("view", {
                staticClass: "page"
            }, [ i("view", {
                staticClass: "inputArea"
            }, [ i("view", {
                staticClass: "searchIcon searchIconBG"
            }), t._v(" "), i("input", {
                directives: [ {
                    name: "model",
                    rawName: "v-model",
                    value: t.keywords,
                    expression: "keywords"
                } ],
                attrs: {
                    type: "text",
                    placeholder: "输入城市名进行搜索",
                    "placeholder-class": "placeholder",
                    eventid: "0"
                },
                domProps: {
                    value: t.keywords
                },
                on: {
                    input: function(e) {
                        e.target.composing || (t.keywords = e.target.value);
                    }
                }
            }) ]), t._v(" "), t.keywords ? i("view", {
                staticClass: "resultContainer"
            }, [ t.searchResult.length ? i("view", t._l(t.searchResult, function(e, a) {
                return i("view", {
                    key: e.id,
                    staticClass: "cityCell column"
                }, [ i("text", {
                    attrs: {
                        eventid: "1-" + a
                    },
                    on: {
                        click: function(i) {
                            t.selectCity(e);
                        }
                    }
                }, [ t._v(t._s(e.name)) ]) ]);
            })) : i("view", {
                staticClass: "noResult"
            }, [ t._v("无结果") ]) ]) : i("scroll-view", {
                staticClass: "content",
                attrs: {
                    "scroll-y": "true",
                    "scroll-into-view": t.toView
                }
            }, [ t.cityName ? i("view", {
                staticClass: "currentCity",
                attrs: {
                    id: "currentCity"
                }
            }, [ i("text", {
                staticClass: "letter"
            }, [ t._v("当前定位城市") ]), t._v(" "), i("view", {
                staticClass: "cityCell"
            }, [ t._v(t._s(t.cityName)) ]) ]) : t._e(), t._v(" "), t.cityData && t.cityData.cityList ? i("view", {
                staticClass: "cityList"
            }, t._l(t.cityData.cityList, function(e, a) {
                return i("view", {
                    key: e.idx,
                    staticClass: "column"
                }, [ i("view", {
                    staticClass: "letter",
                    attrs: {
                        id: e.idx
                    }
                }, [ t._v(t._s(e.idx)) ]), t._v(" "), t._l(e.cities, function(e, s) {
                    return i("view", {
                        key: e.id,
                        staticClass: "cityCell"
                    }, [ i("text", {
                        attrs: {
                            eventid: "2-" + a + "-" + s
                        },
                        on: {
                            click: function(i) {
                                t.selectCity(e);
                            }
                        }
                    }, [ t._v(t._s(e.name)) ]) ]);
                }) ], 2);
            })) : t._e() ]), t._v(" "), t.cityData && t.cityData.alphabet && !t.keywords ? i("view", {
                staticClass: "alphabet"
            }, [ i("view", {
                staticClass: "alphabetContainer"
            }, t._l(t.cityData.alphabet, function(e, a) {
                return i("text", {
                    key: e,
                    attrs: {
                        eventid: "3-" + a
                    },
                    on: {
                        click: function(i) {
                            t.jump(e);
                        }
                    }
                }, [ t._v(t._s(e)) ]);
            })) ]) : t._e() ], 1);
        }, s = [];
        a._withStripped = !0;
        var n = {
            render: a,
            staticRenderFns: s
        };
        e.a = n;
    }
}, [ 15 ]);