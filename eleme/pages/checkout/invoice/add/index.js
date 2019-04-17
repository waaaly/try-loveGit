var t = getApp(), i = t.services.User, a = t.services.Cart.invoice;

Page({
    data: {
        invoice: {
            invoice_pay_to: "",
            tax_number: "",
            invoice_type: 2
        }
    },
    onInvoiceNameInput: function(t) {
        var i = t.detail;
        this.data.invoice.invoice_pay_to = i.value, this.setData(this.data);
    },
    onInvoiceTaxNumberInput: function(t) {
        var i = t.detail;
        this.data.invoice.tax_number = i.value, this.setData(this.data);
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
    addInvoice: function() {
        var t = this.data.invoice.invoice_pay_to.trim(), e = this.data.invoice.tax_number.trim().length;
        /^.{2,50}$/.test(t) ? 2 !== this.data.invoice.invoice_type || -1 !== [ 15, 18, 20 ].indexOf(e) ? a.add(i, this.data.invoice).then(function(t) {
            a.select(t), wx.navigateBack({
                delta: 2
            });
        }).catch(function() {
            wx.showToast({
                title: "添加失败，请重试"
            });
        }) : wx.showToast({
            title: "税号长度为15位、18位或20位"
        }) : wx.showToast({
            title: "抬头名称长度需在2至50个字之间"
        });
    }
});