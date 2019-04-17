var e = getApp().services.Ubt;

Component({
    properties: {
        ticket: {
            type: Object
        },
        disabled: {
            type: Boolean,
            default: !1
        }
    },
    methods: {
        redirect: function(t) {
            var a = t.target.dataset.ticket, i = "", s = 0;
            "首单专享红包" === a.name ? (s = 3, i = "/pages/newuser/index") : 2 === a.item_type && (s = 1, 
            i = "/pages/shop/shop/index?id=" + a.restaurant_id), e.sendEvent({
                id: 102775,
                params: {
                    type: s
                }
            }), i ? wx.navigateTo({
                url: i
            }) : wx.switchTab({
                url: "/pages/index/index"
            });
        }
    }
});