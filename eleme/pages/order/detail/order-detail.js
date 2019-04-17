var e = require("../../../libs/aliLog"), r = getApp().services, t = r.User, i = r.AliLog, s = r.Ubt;

Page({
    onLoad: function(r) {
        var i = r.id, s = r.route, a = (0, e.createUrlParams)();
        if (t.id) "rate" === s ? this.setData({
            url: "https://h5.ele.me/order/detail/#/" + i + "/rate?ssi=" + t.SID + "&uid=" + t.id + "&come_from=mp&" + a
        }) : this.setData({
            url: "https://h5.ele.me/order/detail/#/" + i + "?ssi=" + t.SID + "&uid=" + t.id + "&come_from=mp&" + a
        }); else {
            var o = "pages/order/detail/order-detail?id=" + i;
            wx.navigateTo({
                url: "/pages/auth/index?successUrl=" + encodeURIComponent(o) + "&" + a
            });
        }
    },
    onShow: function() {
        i.sendPv(), s.sendPv();
    }
});