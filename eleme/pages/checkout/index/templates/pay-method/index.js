var t = getApp(), a = t.services.Cart, e = a.payMethod;

module.exports = {
    data: {
        payMethod: {}
    },
    onShow: function() {
        var o = this;
        a.pend().then(function() {
            o.setData({
                payMethod: t.extend([ e.loadSync(), o.data.payMethod ])
            });
        });
    },
    toggleShowPayMethods: function() {
        this.data.payMethod.showPayMethods = !this.data.payMethod.showPayMethods, this.setData(this.data);
    }
};