var e = require("../../../dave/dave.js"), a = e.ApiCreater, t = e.User, n = function(e) {
    return new Promise(function(a, t) {
        wx.requestPayment(Object.assign(e, {
            success: a,
            fail: t
        }));
    });
};

module.exports = function(e) {
    return a({
        url: "https://mdc-httpizza.ele.me/base.openservice/card/order/payment",
        method: "POST",
        header: {
            cookie: "SID=" + t.SID
        },
        data: {
            order_id: e,
            app_id: "wxece3a9a4c82f58c9",
            open_id: t.open_id
        }
    }, {
        contract_id: e
    }).then(function(e) {
        var a = e.data.trans_info.payData, t = a.timeStamp, r = a.nonceStr, i = a.signType, c = a.paySign;
        return n({
            timeStamp: t,
            nonceStr: r,
            package: a.package,
            signType: i,
            paySign: c
        });
    });
};