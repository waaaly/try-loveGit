var e = require("../../../../common/utils/image-hash.js"), a = getApp(), t = a.services.User, i = a.services.Cart.invoice;

Page({
    data: {
        imageHash: e,
        loaded: !1
    },
    noInvoice: function(e) {
        i.clear(), wx.navigateBack();
    },
    selectInvoice: function(e) {
        var a = i.loadSync().invoices[e.currentTarget.dataset.index];
        0 === a.is_valid ? wx.showModal({
            title: "完善发票信息提示",
            content: "根据新法规，单位类型发票必须填写税号，否则商家无法开具有效发票",
            cancelColor: "#000",
            confirmColor: "#02bb00",
            confirmText: "去完善",
            success: function(e) {
                e.confirm && (i.edit(a), wx.navigateTo({
                    url: "/pages/checkout/invoice/edit/index"
                }));
            }
        }) : (i.select(a), wx.navigateBack());
    },
    editInvoice: function(e) {
        console.log(e.currentTarget.dataset.index), i.edit(i.loadSync().invoices[e.currentTarget.dataset.index]), 
        wx.navigateTo({
            url: "/pages/checkout/invoice/edit/index"
        });
    },
    goToAddInvoice: function() {
        wx.navigateTo({
            url: "/pages/checkout/invoice/add/index"
        });
    },
    mergeData: function() {
        var e = this;
        i.load(t).then(function(t) {
            e.data = a.extend([ t, e.data ]), e.setData(e.data), e.setData({
                loaded: !0
            });
        });
    },
    onShow: function() {
        this.mergeData();
    }
});