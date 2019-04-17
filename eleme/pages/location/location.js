var t = function() {
    function t(t, e) {
        var a = [], s = !0, i = !1, n = void 0;
        try {
            for (var r, o = t[Symbol.iterator](); !(s = (r = o.next()).done) && (a.push(r.value), 
            !e || a.length !== e); s = !0) ;
        } catch (t) {
            i = !0, n = t;
        } finally {
            try {
                !s && o.return && o.return();
            } finally {
                if (i) throw n;
            }
        }
        return a;
    }
    return function(e, a) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, a);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), e = require("../../libs/aliLog"), a = (require("../../common/services/hosts.js").apiHost, 
getApp().services), s = a.imageHash, i = a.Ubt, n = a.Geohash, r = a.API, o = a.Cart, c = a.User, d = a.AliLog, u = o.address, g = App.mpvueBridge.$store, l = void 0, h = "";

Page(function(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}({
    data: {
        imageHash: s,
        focus: !1,
        searchString: "",
        locatedFail: !1,
        locating: !0,
        addresslList: {},
        poi: null,
        searched: !1,
        locations: [],
        nearbyAddress: [],
        fromPage: "",
        cityName: ""
    },
    bindKeyInput: function(t) {
        var e = this;
        clearTimeout(l), l = setTimeout(function() {
            e.searchAddress();
        }, 700), this.setData({
            searchString: t.detail.value
        });
    },
    onLoad: function(a) {
        var s = this;
        this.setData({
            showUserAddresses: a.show_user_addresses && !!c.id,
            fromPage: a ? a.from || "" : "",
            showAdd: !a.isAdd
        }), this.data.showUserAddresses && u.load({
            SID: c.SID,
            userId: c.id
        }).then(function(e) {
            var a = e.addresses.map(function(e) {
                var a = n.decode(e.geohash || e.st_geohash), s = t(a, 2), i = s[0], r = s[1];
                return e.latitude = i, e.longitude = r, e;
            });
            s.setData({
                userAddresses: a
            });
        }), h = (0, e.createUrlParams)();
    },
    onShow: function() {
        var t = wx.getStorageSync("SELECTED_CITY"), e = wx.getStorageSync("PLACE");
        if (t) {
            var a = t.latitude, s = t.longitude, n = t.name;
            this.setData({
                cityName: n,
                longitude: s,
                latitude: a
            });
        } else if (e) {
            var r = e.latitude, o = e.longitude;
            this.setData({
                latitude: r,
                longitude: o
            }), this.getCityName({
                latitude: r,
                longitude: o
            });
        }
        this.reLocate(!0), i.sendPv(), d.sendPv();
    },
    onUnload: function() {
        clearTimeout(l);
    },
    getCityName: function(t) {
        var e = this;
        r.getGeohashPosition(t).then(function(t) {
            200 == +t.statusCode && e.setData({
                cityName: t.data.city
            });
        }).catch(function() {});
    },
    reLocate: function(t) {
        var e = this;
        wx.getLocation({
            type: "gcj02",
            success: function(t) {
                var a = t.latitude, s = t.longitude;
                e.getCurrentPosition({
                    latitude: a,
                    longitude: s
                });
            },
            fail: function() {
                if (!0 !== t) return wx.openSetting({
                    success: function(t) {
                        t.authSetting && t.authSetting["scope.userLocation"] && e.reLocate(!0);
                    }
                });
                e.setData({
                    locatedFail: !0,
                    locating: !1
                });
            }
        });
    },
    getCurrentPosition: function(t) {
        var e = this;
        r.getGeohashPosition(t).then(function(t) {
            200 == +t.statusCode ? e.setData({
                poi: t.data,
                locatedFail: !1,
                locating: !1
            }) : e.setData({
                locatedFail: !0,
                locating: !1
            });
        }).catch(function() {
            e.setData({
                locatedFail: !0,
                locating: !1
            });
        });
        var a = n.encode(t.latitude, t.longitude);
        r.getNearbyAddress(a).then(function(t) {
            e.setData({
                nearbyAddress: t.data
            });
        });
    },
    searchAddress: function() {
        var t = this;
        if (this.data.searchString) {
            var e = this.data, a = e.latitude, s = void 0 === a ? "" : a, i = e.longitude, n = void 0 === i ? "" : i, o = {
                keyword: this.data.searchString,
                offset: 0,
                limit: 20
            };
            s && (o.latitude = s), n && (o.longitude = n), r.searchAddress(o).then(function(e) {
                t.setData({
                    locations: e.data
                });
            });
        }
    },
    selectAddress: function(t) {
        var e = getCurrentPages().splice(-2, 1)[0];
        e && /pages\/address\//.test(e.__route__) ? wx.setStorage({
            key: "TEMPORARY_SELECTED_DELIVER_ADDRESS",
            data: {
                address: t.currentTarget.dataset.address + t.currentTarget.dataset.name,
                geohash: t.currentTarget.dataset.geohash,
                st_geohash: t.currentTarget.dataset.geohash
            },
            success: function() {
                wx.navigateBack();
            }
        }) : (wx.setStorageSync("FROM_LOCATION_BACK", !0), wx.setStorage({
            key: "PLACE",
            data: t.currentTarget.dataset,
            success: function() {
                wx.navigateBack();
            },
            fail: function(t) {
                console.log("selectAddress err::", t);
            }
        }));
    },
    selectUserAddress: function(t) {
        var e = t.currentTarget;
        getCurrentPages().splice(-2, 1)[0];
        wx.setStorageSync("FROM_LOCATION_BACK", !0), wx.setStorage({
            key: "PLACE",
            data: e.dataset,
            success: function() {
                wx.navigateBack();
            },
            fail: function(t) {
                console.log("selectUserAddress err::", t);
            }
        });
    },
    useLocatedPlace: function() {
        var t = getCurrentPages().splice(-2, 1)[0];
        t && /pages\/address\//.test(t.__route__) ? wx.setStorage({
            key: "TEMPORARY_SELECTED_DELIVER_ADDRESS",
            data: {
                address: this.data.poi.address + this.data.poi.name,
                geohash: this.data.poi.geohash,
                st_geohash: this.data.poi.geohash
            },
            success: function() {
                wx.navigateBack();
            }
        }) : (wx.setStorageSync("FROM_LOCATION_BACK", !0), wx.setStorage({
            key: "PLACE",
            data: this.data.poi,
            success: function() {
                wx.navigateBack();
            },
            fail: function(t) {
                console.log("useLocatedPlace err::", t);
            }
        }));
    },
    showAddAddress: function() {
        wx.navigateTo({
            url: "/pages/address/address?" + h
        });
    },
    choseCity: function() {
        g.dispatch("GET_CITY_LIST"), g.commit("SET_CITY", {
            cityName: this.data.cityName
        }), wx.navigateTo({
            url: "/pages/city/main"
        });
    }
}, "onUnload", function() {
    wx.removeStorageSync("SELECTED_CITY");
}));