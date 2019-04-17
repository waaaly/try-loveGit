var e = getApp().services, t = (e.User, e.Ubt), n = require("../../lib/store");

Component({
    properties: {
        redpackList: {
            type: Array,
            observer: function() {
                var e = this.data.redpackList.reduce(function(e, t) {
                    return e + t.amount;
                }, 0);
                this.setData({
                    total: e
                });
            }
        }
    },
    data: {
        total: null,
        Store: n
    },
    ready: function() {
        this.setData({
            Store: n
        });
    },
    methods: {
        order: function() {
            t.sendEvent({
                id: "103451"
            }), wx.switchTab({
                url: "/pages/index/index"
            });
        },
        gotoCouponPage: function() {
            t.sendEvent({
                id: 103453
            }), wx.navigateTo({
                url: "/pages/wechain/pages/coupon/index"
            });
        },
        changeMobile: function() {
            this.triggerEvent("changeMobile");
        }
    }
});