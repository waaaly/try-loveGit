var e = getApp().services, t = e.User, n = e.Ubt;

Component({
    properties: {
        config: {
            type: Object
        },
        contentStyle: {
            type: Number
        }
    },
    methods: {
        gotoCouponPage: function() {
            n.sendEvent({
                id: 103454
            }), wx.navigateTo({
                url: "/pages/wechain/pages/coupon/index"
            });
        },
        withdraw: function() {
            n.sendEvent({
                id: 103455
            });
            var e = "https://h5.ele.me/commend/#/withdraw?ssi=" + t.SID;
            wx.navigateTo({
                url: "/pages/container/index?outlink=retail&&shareLink=" + encodeURIComponent(e)
            });
        },
        close: function() {
            this.triggerEvent("close");
        }
    }
});