var e = getApp(), t = e.globalData.mp, s = e.globalData.config;

Component({
    properties: {
        address: {
            type: Object,
            value: {
                id: "",
                consignee: "",
                mobile: "",
                province: "",
                provinceName: "",
                city: "",
                cityName: "",
                district: "",
                districtName: "",
                street: "",
                streetName: "",
                needL4Addr: !1,
                address: "",
                defaultFlag: 0
            },
            observer: function(e) {
                var t = this, s = t._addressFilter(e), a = t.data.newAddress;
                t._watchAddress(s, a);
            }
        }
    },
    data: {
        newAddress: {
            id: "",
            consignee: "",
            mobile: "",
            province: "",
            provinceName: "",
            city: "",
            cityName: "",
            district: "",
            districtName: "",
            street: "",
            streetName: "",
            needL4Addr: !1,
            address: "",
            defaultFlag: 0
        },
        addressList: [],
        loadStatus: 0,
        selectedIdx: -1,
        isShowAddressPanel: !1,
        transformY: 0,
        animationStyle: ""
    },
    attached: function() {
        var e = this;
        e.data.refreshTimer = null, e._getAddressList(), e.refreshStopClick(), t.pageLifetimes(e, {
            hide: function() {
                setTimeout(function() {
                    "packageRushBuy/pages/rushOrderConfirm/rushOrderConfirm" == getCurrentPages().slice(-1)[0].route && e.setData({
                        isShowAddressPanel: !1
                    });
                }, 20);
            }
        }), e.WxAddressChooserComponent = e.WxAddressChooserComponent || this.selectComponent("#WxAddressChooser");
    },
    detached: function() {
        var e = this;
        e.data.refreshTimer = null, wx.removeStorageSync("shoppingConfigId"), e.refreshStopClick();
    },
    methods: {
        refresh: function() {
            var e = this;
            wx.getStorageSync("shoppingConfigId") && e._checkAndGoLogin().then(function() {
                e._getAddressList();
            }), e.refreshStopClick();
        },
        regain: function() {
            var e = this;
            e.setData({
                loadStatus: 0
            }), e.data.refreshTimer = null, e.data.refreshTimer = setTimeout(function() {
                0 != e.data.loadStatus && 4 != e.data.loadStatus || e.setData({
                    loadStatus: 3
                });
            }, 5e3), e._checkAndGoLogin().then(function() {
                e._getAddressList();
            });
        },
        _checkAndGoLogin: function() {
            return new Promise(function(s, a) {
                t.mpQueryUserStatus(function() {
                    s();
                }, function() {
                    t.mpLogin(e, function() {
                        s();
                    });
                });
            });
        },
        openAddressPanel: function() {
            var e = this;
            e.data.transformY = .8 * wx.getSystemInfoSync().windowHeight || 500, e.setData({
                isShowAddressPanel: !0,
                animationStyle: "transform:translate3d(0," + e.data.transformY + "px,0);"
            }, function() {
                setTimeout(function() {
                    e.setData({
                        animationStyle: "transition:transform 250ms linear 0ms;"
                    });
                }, 30);
            });
        },
        closeAddressPanel: function() {
            var e = this;
            e.setData({
                animationStyle: "transition:transform 250ms linear 0ms;transform:translate3d(0," + e.data.transformY + "px,0);"
            }, function() {
                setTimeout(function() {
                    e.setData({
                        isShowAddressPanel: !1
                    });
                }, 250);
            });
        },
        addAddress: function() {
            var e = this;
            if (e.canStopClick()) return !1;
            wx.navigateTo({
                url: "/pages/addressAdd/addressAdd"
            }), e.closeAddressPanel();
        },
        modifyAddress: function(e) {
            var t = this;
            wx.navigateTo({
                url: "/pages/addressAdd/addressAdd?address=" + encodeURIComponent(JSON.stringify(e.detail.address))
            }), t.closeAddressPanel();
        },
        selectAddress: function(e) {
            var t = this;
            t.setData({
                newAddress: t._addressFilter(e.detail.selectedAddress),
                selectedIdx: e.detail.selectedIdx,
                loadStatus: 1
            }), t.closeAddressPanel(), t._triggerEvent();
        },
        _getAddressList: function() {
            var e = this;
            t.mpGet(s.service.addressDomain + "/address/rlist.json", {}, {
                successFunc: function(t) {
                    if (200 != t.statusCode || !t.data.success || !t.data.shoppingConfigList) return e.setData({
                        loadStatus: 3
                    }), !1;
                    if (!t.data.shoppingConfigList.length) return e.setData({
                        loadStatus: 2
                    }), !1;
                    var s = t.data.shoppingConfigList, a = wx.getStorageSync("shoppingConfigId"), d = -1, i = -1;
                    s.forEach(function(e, t) {
                        e.id && a && e.id == a && (d = t), 1 == e.defaultFlag && (i = t);
                    }), d = d > -1 ? d : i, e.setData({
                        loadStatus: d > -1 ? 1 : 2,
                        selectedIdx: d,
                        addressList: t.data.shoppingConfigList
                    }), e.data.newAddress.id || !e.data.newAddress.consignee || wx.getStorageSync("shoppingConfigId") ? (e.setData({
                        newAddress: e._addressFilter(t.data.shoppingConfigList[d])
                    }), e._triggerEvent()) : e.setData({
                        selectedIdx: -1
                    });
                },
                failFunc: function() {
                    e.setData({
                        loadStatus: 4
                    });
                }
            });
        },
        _addressFilter: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return {
                id: e.id || "",
                consignee: e.consignee || "",
                mobile: e.mobile || "",
                province: e.province || "",
                provinceName: e.provinceName || "",
                city: e.city || "",
                cityName: e.cityName || "",
                district: e.district || "",
                districtName: e.districtName || "",
                street: e.street || "",
                streetName: e.streetName || "",
                needL4Addr: Boolean(e.needL4Addr),
                address: e.address || "",
                defaultFlag: Number(e.defaultFlag)
            };
        },
        _watchAddress: function(e, s) {
            var a = this;
            if (t.isObjectEqual(e, s)) return !1;
            a.setData({
                newAddress: e
            }), !e.id && e.consignee && a.setData({
                selectedIdx: -1,
                loadStatus: 1
            }), a._triggerEvent();
        },
        toWxAddress: function(e) {
            var s = this;
            if (t.repeatTap.stop(s, e)) return !1;
            s.WxAddressChooserComponent && s.WxAddressChooserComponent.getAddress();
        },
        _triggerEvent: function() {
            var e = this;
            e.triggerEvent("changeAddress", {
                address: e.data.newAddress
            });
        },
        canStopClick: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "fnFlag", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3e3, s = this;
            return s.data.isStopClickedObj = s.data.isStopClickedObj || {}, s.data.timerObj = s.data.timerObj || {}, 
            !!s.data.isStopClickedObj[e] || (s.data.isStopClickedObj[e] = !0, s.data.timerObj[e] = setTimeout(function() {
                s.data.isStopClickedObj[e] = !1;
            }, t), !1);
        },
        refreshStopClick: function(e) {
            var s = this;
            return !t.mpIsEmpty(s.data.timerObj) && (e && !t.mpIsEmpty(s.data.timerObj[e]) ? (clearTimeout(s.data.timerObj[e]), 
            delete s.data.timerObj[e], delete s.data.isStopClickedObj[e], !1) : (Object.keys(s.data.timerObj).forEach(function(e) {
                clearTimeout(s.data.timerObj[e]);
            }), s.data.isStopClickedObj = {}, void (s.data.timerObj = {})));
        }
    }
});