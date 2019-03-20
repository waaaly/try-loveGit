function t(t, e, s) {
    return e in t ? Object.defineProperty(t, e, {
        value: s,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = s, t;
}

var e = getApp(), s = e.globalData.mp, a = e.globalData.config;

Page({
    data: {
        pageStatus: 0,
        imageSelectedName: "radio_selected.png",
        imageName: "radio.png",
        addressList: [],
        toastOptions: {
            title: "",
            mask: !1,
            duration: 1500
        }
    },
    onLoad: function() {
        wx.hideShareMenu();
        var t = this;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), t.WxAddressChooserComponent = t.WxAddressChooserComponent || this.selectComponent("#WxAddressChooser");
    },
    onShow: function() {
        this.getLoginStatus(), s.repeatTap.reset();
    },
    onUnload: function() {
        s.repeatTap.reset();
    },
    getLoginStatus: function() {
        var t = this;
        s.mpGet(a.service.openApiDomain + "/mcp/user/queryUserLoginStatus", {}, {
            successFunc: function(s) {
                e.globalData.userInfo && s.data.login ? t.getAddressList() : t.goLogin();
            },
            failFunc: function(e) {
                t.goLogin();
            }
        });
    },
    goLogin: function() {
        var t = this;
        s.mpLogin(e, function(e) {
            t.getAddressList();
        });
    },
    getAddressList: function() {
        var t = this;
        s.getCsrf(function(e) {
            s.mpGet(a.service.addressDomain + "/address/list.json", {}, {
                successFunc: function(e) {
                    return !!s.mpIsCurrentPage(t) && (e && e.data.success && e.data.shoppingConfigList ? e.data.shoppingConfigList.length ? void t.setData({
                        addressList: e.data.shoppingConfigList,
                        pageStatus: 1
                    }) : (t.setData({
                        addressList: [],
                        pageStatus: 2
                    }), !1) : (t.setData({
                        addressList: [],
                        pageStatus: 3
                    }), !1));
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
                CsrfToken: e
            });
        }, function() {
            wx.hideLoading(), t.setData({
                addressList: [],
                pageStatus: 3
            });
        });
    },
    toAdd: function(t) {
        var e = this;
        if (s.repeatTap.stop(e, t)) return !1;
        wx.navigateTo({
            url: "/pages/addressAdd/addressAdd"
        });
    },
    toModify: function(t) {
        var e = this;
        if (s.repeatTap.stop(e, t)) return !1;
        wx.navigateTo({
            url: "/pages/addressAdd/addressAdd?address=" + encodeURIComponent(JSON.stringify(t.currentTarget.dataset.address))
        });
    },
    toDel: function(t) {
        var e = this, n = e.data.addressList, o = t.currentTarget.dataset.id, i = t.currentTarget.dataset.idx;
        wx.showModal({
            title: "提示",
            content: "您确定要删除该地址吗？",
            success: function(t) {
                t.confirm && (wx.showLoading({
                    title: "删除中...",
                    mask: !0
                }), s.getCsrf(function(t) {
                    s.mpPost(a.service.addressDomain + "/address/del/" + o + ".json", {
                        _method: "POST",
                        CsrfToken: t
                    }, {
                        successFunc: function(t) {
                            t.data.success ? (n.splice(i, 1), e.setData({
                                addressList: n,
                                pageStatus: n.length ? 1 : 2
                            })) : e.setData({
                                toastOptions: {
                                    title: "删除失败，请重试"
                                }
                            });
                        },
                        failFunc: function() {
                            e.setData({
                                toastOptions: {
                                    title: "删除失败，请重试"
                                }
                            });
                        },
                        completeFunc: function() {
                            wx.hideLoading();
                        }
                    }, {
                        "content-type": "application/x-www-form-urlencoded"
                    });
                }, function() {
                    wx.hideLoading(), e.setData({
                        toastOptions: {
                            title: "删除失败，请重试"
                        }
                    });
                }));
            }
        });
    },
    toSetDefault: function(e) {
        var n = this, o = e.currentTarget.dataset.idx, i = n.data.addressList[o].id;
        return !s.repeatTap.stop(n, e) && (1 != n.data.addressList[o].defaultFlag && (wx.showLoading({
            title: "加载中...",
            mask: !0
        }), void s.getCsrf(function(d) {
            s.mpPost(a.service.addressDomain + "/address/setDefault.json", {
                id: i,
                _method: "POST",
                CsrfToken: d
            }, {
                successFunc: function(a) {
                    wx.hideLoading(), a.data.success ? (s.repeatTap.reset(n, e), n.data.addressList.forEach(function(e, s) {
                        1 == e.defaultFlag && n.setData(t({}, "addressList[" + s + "].defaultFlag", 0));
                    }), n.setData(t({}, "addressList[" + o + "].defaultFlag", 1))) : n.setData({
                        toastOptions: {
                            title: "设置失败，请重试"
                        }
                    });
                },
                completeFunc: function() {
                    wx.hideLoading();
                }
            }, {
                "content-type": "application/x-www-form-urlencoded"
            });
        }, function() {
            wx.hideLoading(), n.setData({
                toastOptions: {
                    title: "设置失败，请重试"
                }
            });
        })));
    },
    toReload: function() {
        var t = this;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), t.getAddressList();
    },
    toWxAddress: function(t) {
        var e = this;
        if (s.repeatTap.stop(e, t)) return !1;
        e.WxAddressChooserComponent && e.WxAddressChooserComponent.getAddress();
    }
});