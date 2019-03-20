var t = getApp(), e = t.globalData.mp, a = t.globalData.config;

Component({
    properties: {},
    data: {
        isShowAuthModal: !1,
        canBtnOpenSetting: !1
    },
    attached: function() {
        var t = this;
        e.pageLifetimes(t, {
            show: function() {
                t.hideAuthModal();
            },
            hide: function() {
                t.hideAuthModal();
            }
        }), t.setData({
            canBtnOpenSetting: e.isSDKVerBetween("2.0.7")
        });
    },
    methods: {
        toOpenSetting: function() {
            var t = this;
            t.hideAuthModal(), !t.data.canBtnOpenSetting && wx.openSetting && wx.openSetting({
                success: function(t) {}
            }), wx.openSetting || wx.showModal({
                title: "提示",
                content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
            });
        },
        toHideAuthModal: function() {
            this.hideAuthModal();
        },
        getAddress: function() {
            var t = this;
            e.mpCheckAndLogin().then(function() {
                return e.mpGetWXAddress();
            }).then(function(e) {
                t.matchWXAddress(e);
            }, function() {
                t.showAuthModal();
            }).catch(function(t) {});
        },
        matchWXAddress: function(t) {
            var n = {
                consignee: t.userName || "",
                mobile: t.telNumber || "",
                address: t.detailInfo || ""
            };
            e.mpGet(a.service.addressDomain + "/matchRegion.json", {
                provinceName: t.provinceName || "",
                cityName: t.cityName || "",
                districtName: t.countyName || ""
            }, {
                successFunc: function(t) {
                    if (!t.data.success) return !1;
                    n.province = t.data.provinceId || "", n.provinceName = t.data.provinceName || "", 
                    n.city = t.data.cityId || "", n.cityName = t.data.cityName || "", n.district = t.data.districtId || "", 
                    n.districtName = t.data.districtName || "", n.street = t.data.streetId || "", n.streetName = t.data.streetName || "", 
                    n.needL4Addr = t.data.needL4Addr || !1, wx.navigateTo({
                        url: "/pages/addressAdd/addressAdd?address=" + encodeURIComponent(JSON.stringify(n)) + "&fromType=0"
                    });
                },
                failFunc: function(t) {}
            });
        },
        showAuthModal: function() {
            this.setData({
                isShowAuthModal: !0
            });
        },
        hideAuthModal: function() {
            this.setData({
                isShowAuthModal: !1
            });
        }
    }
});