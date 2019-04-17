var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (t[n] = a[n]);
    }
    return t;
}, e = function() {
    function t(t, e) {
        var a = [], n = !0, i = !1, o = void 0;
        try {
            for (var r, s = t[Symbol.iterator](); !(n = (r = s.next()).done) && (a.push(r.value), 
            !e || a.length !== e); n = !0) ;
        } catch (t) {
            i = !0, o = t;
        } finally {
            try {
                !n && s.return && s.return();
            } finally {
                if (i) throw o;
            }
        }
        return a;
    }
    return function(e, a) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, a);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), a = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("./js/category")), n = require("../../libs/aliLog"), i = require("../../common/utils/util.js"), o = i.appendTail, r = i.uParams, s = (i.sameDay, 
require("../../dave/dave.js"), require("./js/images")), c = (require("../sales/services/scenes").scenes, 
""), d = {
    offset: 0,
    limit: 10
}, l = require("./redirect.js"), u = getApp(), h = u.services, g = h.Geohash, f = h.Ubt, p = h.imageHash, m = h.Location, v = h.API, w = h.HashToUrl, E = h.User, x = h.AliLog, S = require("./js/api"), T = {
    tongcheng: "wx336dcaf6a1ecf632"
}, y = {
    data: {
        imageHash: p,
        place: null,
        latitude: null,
        longitude: null,
        restaurants: [],
        loadedAll: !1,
        weather: !1,
        qrcode: "weixin-default",
        extra: "",
        isNewUser: !1,
        isModalShow: !wx.getStorageSync("NEWUSER_SHOW_POP"),
        images: s,
        fromIndex: !0,
        query: {
            keyword: "",
            extras: [ "activities" ],
            order_by: 0
        },
        arrivalData: [],
        checkedArrival: !1,
        banners: [],
        showGuide: !1,
        topBanners: []
    },
    loadMore: function() {
        this.data.loadedAll || (d.offset += d.limit, this.getRestaurants(d.offset));
    },
    getFrontpage: function() {
        var t = this;
        v.getFrontpage({
            latitude: this.data.place.latitude,
            longitude: this.data.place.longitude,
            group_types: [ 1 ],
            flags: [ "F" ]
        }).then(function(e) {
            var a = (e.data || {}).weather;
            t.setWeather(a);
        }).catch(function(t) {
            wx.showToast({
                title: "获取首页数据失败"
            });
        });
    },
    getEntries: function() {
        var t = this;
        v.getEntriesV2({
            latitude: this.data.place.latitude,
            longitude: this.data.place.longitude,
            platform: 9
        }).then(function(e) {
            for (var n = (0, a.default)(e.data[0].entries), i = []; n.length; ) i.push(n.splice(0, 8));
            t.setData({
                pageData: i
            });
        }).catch(function() {});
    },
    getTop: function() {
        var t = this;
        S.getTop({
            latitude: this.data.place.latitude,
            longitude: this.data.place.longitude,
            platform: 9
        }).then(function(e) {
            var a = e.data.filter(function(t) {
                return "big_sale_promotion_template" === t.template;
            })[0].entries.filter(function(t) {
                return t.link && r(t.link).url;
            }).map(function(t) {
                return t.image_url = w(t.image_hash, 750, 210), t.url = r(t.link).url, t;
            });
            t.setData({
                topBanners: a
            });
        }).catch(function() {});
    },
    getBanners: function() {
        var t = this;
        S.getBanners({
            latitude: this.data.place.latitude,
            longitude: this.data.place.longitude,
            platform: 9
        }).then(function(e) {
            var a = e.data.filter(function(t) {
                return t.url && r(t.url).url;
            }).map(function(t) {
                return t.image_url = w(t.image_hash, 750, 210), t.url = r(t.url).url, t;
            });
            t.setData({
                banners: a
            });
        }).catch(function() {});
    },
    setWeather: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        t.temperature && (t.temperature = t.temperature.toFixed(0)), this.setData({
            weather: t
        });
    },
    goToShop: function(t) {
        f.sendEvent({
            id: 101146,
            params: t.currentTarget.dataset
        }), wx.navigateTo({
            url: "/pages/shop/shop/index?id=" + t.currentTarget.dataset.restaurant_id + "&" + (0, 
            n.createUrlParams)("c05.0")
        });
    },
    toLocation: function() {
        wx.navigateTo({
            url: "/pages/location/location?show_user_addresses=1&" + (0, n.createUrlParams)("c01.0")
        });
    },
    getRestaurants: function(t) {
        var e = this, a = {
            offset: t,
            limit: d.limit,
            latitude: this.data.place.latitude,
            longitude: this.data.place.longitude,
            extras: [ "activities" ],
            extra_filters: "home"
        };
        Object.assign(a, this.data.query), v.getShops(a, "/pizza/v3/restaurants").then(function(t) {
            var a = e.handleRow(t.data.items);
            e.setData({
                restaurants: o(e.data.restaurants, a, "id"),
                loadedAll: t.data.items.length < d.limit || d.offset >= 290,
                loading: !1
            });
        }).catch(function(t) {
            e.setData({
                loading: !1
            }), t.data && /UNAUTHORIZED/.test(t.data.name) && wx.showModal({
                title: "需要登录",
                content: "登录后查看商家",
                confirmText: "去登录",
                success: function(t) {
                    t.confirm && wx.navigateTo({
                        url: "/pages/auth/index?successUrl=/pages/index/index"
                    });
                }
            });
        });
    },
    doLocate: function() {
        var t = this, e = wx.getStorageSync("LOCATE_TIME"), a = +new Date(), n = !e || a - e > 18e5;
        return m(n).then(function(e) {
            t.setData({
                geohash: e.geohash
            }), n && (E.id && t.locateByUserAddress(e.latitude, e.longitude), wx.setStorageSync("LOCATE_TIME", a)), 
            t.initPagaData(e), t.checkNewUser();
        }).catch(function(e) {
            e && "NOT_AUTH" === e.name ? wx.showModal({
                title: "",
                content: "检测到您未打开地理位置权限，是否前往开启",
                confirmText: "前往开启",
                cancelText: "手动定位",
                success: function(e) {
                    e.confirm ? wx.openSetting() : e.cancel && t.toLocation();
                }
            }) : wx.showModal({
                title: "",
                content: "定位失败，请检查网络环境或手机定位权限设置",
                confirmText: "重新定位",
                cancelText: "手动定位",
                success: function(e) {
                    e.confirm ? t.doLocate() : e.cancel && t.toLocation();
                }
            });
        });
    },
    locateByUserAddress: function(t, a) {
        var n = this;
        v.getUserLocation(t, a).then(function(t) {
            var a = t.data;
            if (2 !== a.type) return Promise.reject();
            var i = a.addresses[0], o = g.decode(i.st_geohash), r = e(o, 2), s = r[0], c = r[1];
            i.latitude = s, i.longitude = c, i.name = i.address, i.geohash = i.st_geohash, n.setData({
                place: i
            }), wx.setStorageSync("PLACE", i);
        }).catch(function() {});
    },
    initPagaData: function(t) {
        var e = this;
        this.setData({
            place: t,
            offset: 0,
            limit: 10,
            latitude: t.latitude,
            longitude: t.longitude,
            restaurants: [],
            loadedAll: !1
        }), Object.assign(this.data.query, {
            latitude: t.latitude,
            longitude: t.longitude
        }), this.getFrontpage(), this.getRestaurants(d.offset), this.getFilter(), this.getEntries(), 
        this.getTop(), v.getGiftCardConfig().then(function(t) {
            t.data.showBanner && e.getBanners();
        }).catch(function() {});
    },
    filterShops: function() {
        d.offset = 0, this.setData({
            loadedAll: !1,
            loading: !0,
            restaurants: []
        }), this.getRestaurants(0), f.sendEvent({
            id: 107152,
            params: t({}, this.data.query, {
                type: 1
            })
        }), x.sendGoldlog("eleme-wechatmp.index.ELEME-WECHATMP-INDEX-FILTER", "CLK", "filter_source=1");
    },
    jumpPage: function() {
        f.sendEvent({
            id: 101804
        }), wx.navigateTo({
            url: "../newuser/index?geohash=" + this.data.geohash + "&" + c
        }), this.closeGift();
    },
    closeModal: function() {
        f.sendEvent({
            id: 101911
        }), this.closeGift();
    },
    closeGift: function() {
        this.setData({
            isModalShow: !1
        }), wx.setStorageSync("NEWUSER_SHOW_POP", "close");
    },
    getHongbaos: function(t) {
        var e = this;
        this.data.checkedArrival || (this.setData({
            checkedArrival: !0
        }), S.fetchHongbaoInfo(t, this.data.geohash).then(function(a) {
            var n = a.data.hongbao_list;
            if (0 === n.length) throw new Error("EMPTY");
            var i = n.map(function(t) {
                return Object.assign(t, {
                    amount: t.amount.toFixed(1).split(".")
                });
            });
            return e.setData({
                showArrival: !0,
                arrivalData: i
            }), f.sendEvent({
                id: 107154,
                params: {
                    type: 2
                }
            }), x.sendGoldlog("eleme-wechatmp.index.ELEME-WECHATMP-INDEX-ARRIVAL", "EXP"), S.callbackHongbao(t, n.map(function(t) {
                return t.sn;
            }));
        }).catch(function() {
            wx.getStorageSync("HAS_SHOW_GUIDE") || v.getGiftCardConfig().then(function(t) {
                t.data.showGuide && (f.sendEvent({
                    id: 107063
                }), e.setData({
                    showGuide: !0
                }), wx.setStorageSync("HAS_SHOW_GUIDE", !0), x.sendGoldlog("eleme-wechatmp.index.ELEME-WECHATMP-INDEX-GUIDE", "EXP"));
            }).catch(function() {});
        }));
    },
    goBanner: function(t) {
        var e = t.currentTarget.dataset, a = e.url, i = e.id, o = e.name;
        f.sendEvent({
            id: 107155,
            params: {
                id: i
            }
        }), console.log(a);
        var s = "geohash=" + this.data.place.geohash;
        if (E.id && (s = s + "&ssi=" + E.SID + "&uid=" + E.id), /miniprogram/.test(a)) {
            console.log(r(a));
            var c = r(a), d = c.miniprogram, l = c.wechat_extra, u = c.wechat_name;
            if (u) {
                var h = {
                    appId: T[u]
                };
                "0" !== d && (h.path = d), l && (h.extraData = {
                    extra: l
                }), console.log(h), wx.navigateToMiniProgram(h);
            } else wx.navigateTo({
                url: d
            });
        } else {
            var g = a + (a.indexOf("?") > -1 ? "&" : "?") + s;
            wx.navigateTo({
                url: "/pages/container/index?q=" + encodeURIComponent(g) + "&title=" + o + "&" + (0, 
                n.createUrlParams)("c04." + i)
            });
        }
    },
    checkNewUser: function() {
        var t = this;
        E.id ? v.isNewUser(E.id).then(function(e) {
            var a = e.data;
            a || t.getFestivalHongbao(), t.setData({
                isNewUser: a
            });
        }).catch(function(e) {
            f.sendEvent({
                id: 101910
            }), t.setData({
                isNewUser: !0
            });
        }) : (f.sendEvent({
            id: 101910
        }), this.setData({
            isNewUser: !0
        }));
    },
    getFestivalHongbao: function() {
        var t = this;
        S.getFestivalHongbao({
            lng: this.data.place.longitude,
            lat: this.data.place.latitude,
            userId: E.id,
            channel: "waimaijie_320"
        }).then(function(e) {
            if ("200" !== e.data.code || !e.data.data || !e.data.data.length) return Promise.reject();
            var a = e.data.data;
            a.forEach(function(t) {
                t.amount && (t.amount = +t.amount.toFixed(1)), t.thresholdText = t.threshold ? "满" + t.threshold + "可用" : "无门槛";
            }), a.push({
                title: "迎春季红包",
                amount: "?",
                isShare: !0,
                channel: "waimaijie_321"
            }), t.setData({
                plan: 1,
                showShare: !0,
                showLucky: !0,
                luckyData: a
            }), f.sendEvent({
                id: 107154,
                params: {
                    type: 1
                }
            }), x.sendGoldlog("eleme-wechatmp.index.ELEME-WECHATMP-INDEX-WAIMAIJIEEXP", "CLK", "type=1");
        }).catch(function() {});
    },
    onLoad: function(t) {
        var e = t.qrcode, a = t.source, i = void 0 === a ? "" : a;
        e && this.setData({
            qrcode: e
        }), i && this.setData({
            extra: "source=" + i
        }), wx.setStorageSync("SOURCE", i), l(t), c = (0, n.createUrlParams)();
    },
    onShow: function(t) {
        var e = wx.getStorageSync("PLACE");
        wx.setNavigationBarTitle({
            title: "饿了么"
        }), wx.getStorageSync("FROM_LOCATION_BACK") && e ? (wx.setStorageSync("FROM_LOCATION_BACK", !1), 
        this.setData({
            geohash: e.geohash
        }), this.initPagaData(e)) : this.data.geohash || this.doLocate(), this.data.geohash && this.checkNewUser();
        var a = wx.getStorageSync("SOURCE");
        f.sendPv(a ? "source=" + a : ""), x.sendPv();
    },
    onReachBottom: function() {
        this.data.loadedAll || !this.data.latitude || this.data.loading || (d.offset += d.limit, 
        this.getRestaurants(d.offset));
    },
    redirectSearch: function() {
        wx.navigateTo({
            url: "/pages/search/search?" + (0, n.createUrlParams)("c02.0")
        });
    },
    search: function() {
        f.sendEvent({
            id: 101143
        }), this.redirectSearch();
    },
    onShareAppMessage: function() {
        this.setData({
            showShare: !1
        });
        var t = this.data.plan;
        return x.sendGoldlog("eleme-wechatmp.index.ELEME-WECHATMP-INDEX-WAIMAIJIESHARECLK", "CLK", "type=" + t), 
        {
            title: "饿了么小程序，红包天天领",
            path: "/pages/index/index?qrcode=weixin-share",
            imageUrl: "https://fuss10.elemecdn.com/6/39/64dcfc29cd5c73133282dfc1d8597jpeg.jpeg"
        };
    },
    goToNewUserPage: function() {
        f.sendEvent({
            id: 101892,
            params: {
                type: 0
            }
        }), wx.navigateTo({
            url: "/pages/newuser/index?geohash=" + this.data.geohash + "&" + c
        });
    },
    goToFood: function(t) {
        var e = t.currentTarget.dataset, a = e.restaurantId, i = e.foodId, o = e.restaurantIndex;
        f.sendEvent({
            id: 101894,
            params: {
                index: o,
                restaurant_id: a
            }
        }), wx.navigateTo({
            url: "/pages/shop/shop/index?id=" + a + "&promotion_food=" + i + "&" + (0, n.createUrlParams)("c05.0")
        });
    },
    clickCategory: function(t) {
        var e = t.currentTarget.dataset, a = e.url, i = e.id, o = e.title;
        f.sendEvent({
            id: 106938,
            params: {
                id: i,
                title: o
            }
        }), wx.navigateTo({
            url: a + "&" + (0, n.createUrlParams)("c03." + i)
        });
    },
    guidGet: function() {
        this.setData({
            showGuide: !1
        });
    },
    closeLucky: function(t) {
        this.setData({
            showLucky: !1
        });
        var e = t.detail.formId;
        e && v.formSubmit(e, "form_id");
        var a = this.data, n = a.plan, i = a.showShare;
        x.sendGoldlog("eleme-wechatmp.index.ELEME-WECHATMP-INDEX-WAIMAIJIECLOSECLK", "CLK", "type=" + n + "&shared=" + (i ? 1 : 2));
    },
    getShareHongbao: function(t) {
        console.log(t), f.sendEvent({
            id: 107153,
            params: {
                type: 1
            }
        });
        var e = t.detail.formId;
        e && v.formSubmit(e, "form_id");
        var a = this.data.plan;
        x.sendGoldlog("eleme-wechatmp.index.ELEME-WECHATMP-INDEX-WAIMAIJIEGETCLK", "CLK", "type=" + a);
        var n = t.target.dataset.channel;
        this.getShareFestivalHongbao(n);
    },
    getShareFestivalHongbao: function() {
        var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        S.getFestivalHongbao({
            lng: this.data.place.longitude,
            lat: this.data.place.latitude,
            userId: E.id,
            channel: e
        }).then(function(e) {
            if (console.log(e), "200" === e.data.code && e.data.data && e.data.data.length) {
                var a = e.data.data;
                a.forEach(function(t) {
                    t.amount && (t.amount = +t.amount.toFixed(1)), t.thresholdText = t.threshold ? "满" + t.threshold + "可用" : "无门槛";
                });
                var n = t.data.luckyData;
                n.pop(), n = n.concat(a), t.setData({
                    luckyData: n
                });
            } else wx.showToast({
                title: "今天已经领取过，明天再来~",
                icon: "none"
            });
        }).catch(function() {});
    }
};

Page(u.extend([ y, require("../../common/components/restaurant-row/component.js"), require("../../common/components/restaurant-filter-bars/component.js"), require("./components/Arrival/index.js") ]));