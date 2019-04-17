require("../../../../../libs/promise.js");

var e = getApp(), n = e.services.Cart, o = n.countPerson;

module.exports = {
    data: {
        invoice: {},
        remark: {},
        countPerson: {}
    },
    goToInvoice: function() {
        n.invoice.data.isInvoiceAvailable && wx.navigateTo({
            url: "/pages/checkout/invoice/select/index"
        });
    },
    goToRemark: function() {
        wx.navigateTo({
            url: "/pages/checkout/remark/index"
        });
    },
    setCountPerson: function(n) {
        var t = n.detail.value, a = this;
        a.setData({
            countPerson: e.extend([ {
                countPerson: o.save(t)
            }, a.data.countPerson ])
        });
    },
    onShow: function() {
        var e = this;
        n.pend().then(function() {
            e.setData({
                invoice: n.invoice.loadSync(),
                remark: n.remark.loadSync(),
                countPerson: n.countPerson.loadSync()
            });
        });
    }
};