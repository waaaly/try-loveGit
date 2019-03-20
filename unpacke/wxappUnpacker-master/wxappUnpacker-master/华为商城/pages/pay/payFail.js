var e = getApp();

e.globalData.mp, e.globalData.config;

Page({
    data: {
        orderCode: "",
        cashPay: ""
    },
    onLoad: function(e) {
        this.setData({
            orderCode: e.orderCode,
            cashPay: e.cashPay
        }), wx.hideShareMenu();
    },
    goToIndex: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    goToOrderDetail: function() {
        wx.redirectTo({
            url: "/pages/orderDetail/orderDetail?orderCode=" + this.data.orderCode
        });
    }
});