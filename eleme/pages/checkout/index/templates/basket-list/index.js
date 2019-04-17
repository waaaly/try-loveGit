var t = getApp().services.Cart;

module.exports = {
    data: {
        basketList: {}
    },
    onShow: function() {
        var a = this;
        t.pend().then(function() {
            a.data.basketList = t.getBasket(), a.setData(a.data);
        }).catch(function() {});
    },
    goToRestaurant: function() {
        wx.navigateBack();
    },
    goToHongbao: function() {
        this.data.basketList.hongbao.hongbaoStatus >= 0 && wx.navigateTo({
            url: "/pages/checkout/hongbao/index"
        });
    }
};