var s = getApp(), d = s.services.Cart;

module.exports = {
    data: {
        address: {}
    },
    onShow: function() {
        var e = this;
        d.loadAddress().then(function(d) {
            var a = d.address;
            e.setData({
                address: a ? s.extend([ {
                    address: a
                }, e.data.address ]) : {
                    address: a
                }
            });
        });
    },
    goToSelectAddress: function(s) {
        wx.navigateTo({
            url: "/pages/address/address"
        });
    }
};