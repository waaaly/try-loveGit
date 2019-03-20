var t = getApp(), e = t.globalData.mp, a = t.globalData.config;

Page({
    data: {
        pageStatus: 0,
        addressList: [],
        selectedIndex: -1,
        canIUseOpenSetting: !1,
        isStopClickedObj: {},
        timerObj: {}
    },
    onLoad: function() {
        wx.hideShareMenu();
        var t = this;
        t.setData({
            canIUseOpenSetting: t.getSysInfo()
        }), t.getAddressList();
    },
    onShow: function() {
        var t = this;
        t.setData({
            showLocationModel: !1
        }), t.refreshStopClick();
    },
    onHide: function() {
        this.setData({
            showLocationModel: !1
        });
    },
    onUnload: function() {
        this.refreshStopClick();
    },
    getAddressList: function() {
        var t = this;
        e.getCsrf(function(s) {
            e.mpGet(a.service.addressDomain + "/address/list.json", {}, {
                successFunc: function(a) {
                    if (!e.mpIsCurrentPage(t)) return !1;
                    if (!a || !a.data.success || !a.data.shoppingConfigList) return t.setData({
                        addressList: [],
                        pageStatus: 3
                    }), !1;
                    if (!a.data.shoppingConfigList.length) return t.setData({
                        addressList: [],
                        pageStatus: 2
                    }), !1;
                    var s = a.data.shoppingConfigList, i = wx.getStorageSync("shoppingConfigId"), n = -1, d = -1;
                    s.forEach(function(t, e) {
                        t.id && i && t.id == i && (n = e), 1 == t.defaultFlag && (d = e);
                    }), t.setData({
                        addressList: a.data.shoppingConfigList,
                        selectedIndex: n > -1 ? n : d,
                        pageStatus: 1
                    });
                },
                failFunc: function() {
                    t.setData({
                        addressList: [],
                        pageStatus: 3
                    });
                },
                completeFunc: function() {
                    wx.hideLoading();
                }
            }, {
                CsrfToken: s
            });
        }, function() {
            wx.hideLoading(), t.setData({
                addressList: [],
                pageStatus: 3
            });
        });
    },
    addAddress: function(t) {
        if (this.canStopClick()) return !1;
        wx.navigateTo({
            url: "/pages/addressAdd/addressAdd"
        });
    },
    modifyAddress: function(t) {
        wx.navigateTo({
            url: "/pages/addressAdd/addressAdd?address=" + encodeURIComponent(JSON.stringify(t.detail.address))
        });
    },
    selectAddress: function() {
        wx.navigateBack();
    },
    towxAddress: function() {
        var i = this;
        e.mpGet(a.service.openApiDomain + "/mcp/user/queryUserLoginStatus", {}, {
            successFunc: function(a) {
                var n = getCurrentPages(), d = n[n.length - 1].route;
                getApp().globalData.currentPageUrl = d, t.globalData.userInfo && a.data.login ? s(i, i.addWXAddress) : e.mpLogin(t, function(t) {
                    s(i, i.addWXAddress);
                });
            },
            failFunc: function(a) {
                var n = getCurrentPages(), d = n[n.length - 1].route;
                getApp().globalData.currentPageUrl = d, e.mpLogin(t, function(t) {
                    s(i, i.addWXAddress);
                });
            }
        });
    },
    toReload: function() {
        var t = this;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), t.getAddressList();
    },
    addWXAddress: function(t) {
        e.mpGet(a.service.addressDomain + "/matchRegion.json", {
            provinceName: t.provinceName,
            cityName: t.cityName,
            districtName: t.countyName
        }, {
            successFunc: function(e) {
                e.data.success ? (e.data.districtId && (t.needL4Addr = e.data.needL4Addr, t.province = e.data.provinceId, 
                t.city = e.data.cityId, t.district = e.data.districtId), t.consignee = t.userName, 
                t.mobile = t.telNumber, t.address = t.detailInfo, t.provinceName = t.provinceName, 
                t.cityName = t.cityName, t.districtName = t.countyName, t.street = "", t.streetName = "", 
                t.addressSelectStatus = "") : (t.consignee = t.userName, t.mobile = t.telNumber, 
                t.address = t.detailInfo, t.provinceName = t.provinceName, t.cityName = t.cityName, 
                t.districtName = t.countyName, t.street = "", t.streetName = "", t.addressSelectStatus = ""), 
                wx.navigateTo({
                    url: "/pages/addressAdd/addressAdd?address=" + encodeURIComponent(JSON.stringify(t))
                });
            },
            failFunc: function(t) {}
        });
    },
    getAuthority: function() {
        this.data.canIUseOpenSetting && wx.openSetting && wx.openSetting({
            success: function(t) {}
        }), wx.openSetting || wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        });
    },
    getSysInfo: function() {
        var t = "";
        wx.getSystemInfo({
            success: function(e) {
                t = e.SDKVersion;
            }
        });
        var e = t.split(".");
        return !!Number(e[0] < 2) || 2 === Number(e[0]) && 0 === Number(e[1]) && Number(e[2]) < 7;
    },
    closeLocationModel: function() {
        this.setData({
            showLocationModel: !1
        });
    },
    canStopClick: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "fnFlag", e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3e3, a = this;
        return a.data.isStopClickedObj = a.data.isStopClickedObj || {}, a.data.timerObj = a.data.timerObj || {}, 
        !!a.data.isStopClickedObj[t] || (a.data.isStopClickedObj[t] = !0, a.data.timerObj[t] = setTimeout(function() {
            a.data.isStopClickedObj[t] = !1;
        }, e), !1);
    },
    refreshStopClick: function(t) {
        var e = this;
        if (t) return Object.keys(e.data.timerObj) && clearTimeout(e.data.timerObj[t]), 
        delete e.data.timerObj[t], delete e.data.isStopClickedObj[t], !1;
        Object.keys(e.data.timerObj) && Object.keys(e.data.timerObj).forEach(function(t) {
            clearTimeout(e.data.timerObj[t]);
        }), e.data.isStopClickedObj = {}, e.data.timerObj = {};
    }
});

var s = function(t, a) {
    wx.getSetting({
        success: function(s) {
            s.authSetting["scope.address"] ? wx.chooseAddress({
                success: function(t) {
                    a && e.mpIsFunction(a) && a(t);
                }
            }) : wx.authorize({
                scope: "scope.address",
                success: function() {
                    wx.chooseAddress({
                        success: function(t) {
                            a && e.mpIsFunction(a) && a(t);
                        }
                    });
                },
                fail: function() {
                    t.setData({
                        showLocationModel: !0
                    });
                }
            });
        }
    });
};