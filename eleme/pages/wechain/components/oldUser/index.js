var e = getApp().services, t = e.User, o = e.Ubt, i = require("../../lib/store");

Component({
    properties: {
        redpackList: {
            type: Array
        },
        cash: {
            type: Number,
            default: 0
        },
        receivedCash: {
            type: Number,
            observer: function(e) {
                this.setData({
                    cashPopupConfig: {
                        cash: e
                    }
                });
            }
        },
        status: {
            type: Number
        }
    },
    data: {
        mobile: t.info.mobile,
        cashPopupConfig: {}
    },
    ready: function() {
        this.setData({
            Store: i
        });
    },
    methods: {
        changeMobile: function() {
            this.triggerEvent("changeMobile");
        },
        gotoCouponPage: function() {
            o.sendEvent({
                id: 103453
            }), wx.navigateTo({
                url: "/pages/wechain/pages/coupon/index"
            });
        }
    }
});