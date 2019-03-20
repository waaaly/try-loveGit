var e = {
    show: !1,
    price: "",
    memberPrice: "",
    memberPriceType: "",
    promoTag: ""
};

new (require("../../../../bases/component.js").JDComponent)({
    properties: {
        options: {
            type: Object,
            value: e,
            observer: "onOptionsChange"
        }
    },
    data: {
        show: !0
    },
    attached: function() {},
    methods: {
        onOptionsChange: function(t) {
            t = t || e, this.setData(t.show ? {
                show: t.show,
                price: t.price,
                memberPrice: t.memberPrice,
                memberPriceType: t.memberPriceType,
                promoTag: t.promoTag,
                uuid: t.uuid
            } : {
                show: !1
            });
        },
        select: function(e) {
            var t = e.currentTarget.dataset, r = t.checked, o = t.name;
            r || (this.setData({
                promoTag: o
            }), this.triggerEvent("select", e));
        },
        close: function(e) {
            this.triggerEvent("close", e);
        }
    }
});