var e = getApp();

e.globalData.mp, e.globalData.config;

Page({
    data: {
        oldAddress: {},
        fromType: {
            prevPage: "",
            funcType: ""
        }
    },
    onLoad: function(e) {
        var a = this;
        if (wx.hideShareMenu(), void 0 != e.address) {
            var t = JSON.parse(decodeURIComponent(e.address)) || "";
            a.setData({
                oldAddress: t
            });
        }
        a._getFromType();
    },
    _getFromType: function() {
        var e = this, a = getCurrentPages().length > 2 ? getCurrentPages().slice(-2, -1)[0] : "";
        e.setData({
            "fromType.prevPage": a && a.route.replace(/.*\/([^\/]+)$/g, "$1"),
            "fromType.funcType": e.data.oldAddress.id ? "编辑收货人信息" : "添加收货人信息"
        }), wx.setNavigationBarTitle({
            title: e.data.fromType.funcType
        });
    },
    saveAddress: function(e) {
        var a = this, t = 1, s = e.detail.newAddress && e.detail.newAddress.id;
        switch (a.data.fromType.prevPage) {
          case "addressList":
            t = 2, wx.setStorageSync("shoppingConfigId", s);
            break;

          case "rushOrderConfirm":
          case "rushOrderUpdate":
            wx.setStorageSync("shoppingConfigId", s);
        }
        wx.showModal({
            title: "提示",
            content: "保存成功",
            showCancel: !1,
            success: function() {
                wx.navigateBack({
                    delta: t
                });
            }
        });
    }
});