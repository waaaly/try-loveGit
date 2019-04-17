var t = getApp(), i = t.services.User, e = t.services.Cart.invoice;

Page({
    data: {},
    mergeData: function() {
        this.setData({
            invoice: t.extend([ e.loadSync().editingInvoice ])
        });
    },
    onInvoiceNameInput: function(t) {
        var i = t.detail;
        this.data.invoice.invoice_pay_to = i.value, this.setData(this.data);
    },
    onInvoiceTaxNumberInput: function(t) {
        var i = t.detail;
        this.data.invoice.tax_number = i.value, this.setData(this.data);
    },
    removeInvoice: function() {
        wx.showModal({
            title: "删除发票信息",
            content: "确定删除该发票信息吗？",
            cancelColor: "#666",
            confirmColor: "#666",
            success: function(t) {
                t.confirm && e.remove(i, e.loadSync().editingInvoice).then(function() {
                    wx.navigateBack();
                }).catch(function() {
                    wx.showToast({
                        title: "删除失败，请重试"
                    });
                });
            }
        });
    },
    editInvoice: function() {
        var t = this.data.invoice.invoice_pay_to.trim(), a = this.data.invoice.tax_number.trim().length;
        /^.{2,50}$/.test(t) ? 2 !== this.data.invoice.invoice_type || -1 !== [ 15, 18, 20 ].indexOf(a) ? e.update(i, e.loadSync().editingInvoice, this.data.invoice).then(function() {
            wx.navigateBack();
        }).catch(function() {
            wx.showToast({
                title: "删除失败，请重试"
            });
        }) : wx.showToast({
            title: "税号长度为15位、18位或20位"
        }) : wx.showToast({
            title: "抬头名称长度需在2至50个字之间"
        });
    },
    clear: function(t) {
        this.data.invoice[t.target.dataset.content] = "", this.setData(this.data);
    },
    toggleType: function(t) {
        var i = +t.target.dataset.type;
        if (i) {
            if (i === this.data.invoice.invoice_type) return;
            this.data.invoice.invoice_type = i, this.setData(this.data);
        }
    },
    onLoad: function() {
        this.mergeData();
    }
});