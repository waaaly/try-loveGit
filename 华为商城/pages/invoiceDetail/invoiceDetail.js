var e = getApp(), a = e.globalData.mp, t = e.globalData.config;

Page({
    data: {
        orderCode: ""
    },
    onLoad: function(e) {
        wx.hideShareMenu();
        var i = this;
        a.mpGet(t.service.openApiDomain + "/mcp/queryUserOrderInvoiceDetail", {
            orderCode: e.orderCode
        }, {
            successFunc: function(e) {
                if (e.data.success) {
                    var a = e.data.deliveryName, t = e.data.deliveryNumber, d = [];
                    e.data.orderLogisticsLogList && (d = e.data.orderLogisticsLogList), i.setData({
                        companyName: e.data.vatInvoice.companyName,
                        taxpayerIdentityNum: e.data.vatInvoice.taxpayerIdentityNum,
                        registeredAddress: e.data.vatInvoice.registeredAddress,
                        registeredTelephone: e.data.vatInvoice.registeredTelephone,
                        depositBank: e.data.vatInvoice.depositBank,
                        bankAccount: e.data.vatInvoice.bankAccount,
                        consignee: e.data.vatInvoiceDeliveryAddress.consignee,
                        mobile: e.data.vatInvoiceDeliveryAddress.mobile,
                        address: e.data.vatInvoiceDeliveryAddress.address,
                        deliveryName: a,
                        deliveryNumber: t,
                        orderLogisticsLogList: d,
                        province: e.data.vatInvoiceDeliveryAddress.province,
                        city: e.data.vatInvoiceDeliveryAddress.city,
                        district: e.data.vatInvoiceDeliveryAddress.district,
                        street: e.data.vatInvoiceDeliveryAddress.street
                    }), d.forEach(function(e, a) {
                        i.setData({
                            timea: e.logTime.split("+")[0].split(" ")[0],
                            timeb: e.logTime.split("+")[0].split(" ")[1]
                        });
                    });
                }
            },
            failFunc: function(e) {}
        });
    }
});