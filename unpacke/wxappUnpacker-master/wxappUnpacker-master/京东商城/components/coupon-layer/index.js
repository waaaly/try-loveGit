new (require("../../bases/component").JDComponent)({
    properties: {
        coupons: Array,
        showCouponLayerFlag: {
            type: Boolean,
            value: !1,
            observer: "observeFlagChange"
        },
        isShowCouponLayerFlag: Boolean,
        showAnim: Boolean
    },
    methods: {
        closeCoupon: function() {
            this.triggerEvent("closeCoupon");
        },
        drawCoupon: function(o) {
            this.triggerEvent("drawCoupon", o);
        },
        gotoBinding: function(o) {
            this.triggerEvent("gotoBinding", o);
        },
        observeFlagChange: function(o) {
            var n = this;
            o ? (this.setData({
                isShowCouponLayerFlag: !0
            }), setTimeout(function() {
                n.setData({
                    showAnim: !0
                });
            }, 100)) : (this.setData({
                showAnim: !1
            }), setTimeout(function() {
                n.setData({
                    isShowCouponLayerFlag: !1
                });
            }, 500));
        },
        noscroll: function() {}
    }
});