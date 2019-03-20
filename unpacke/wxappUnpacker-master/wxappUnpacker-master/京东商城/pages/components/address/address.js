var e = require("../../../bases/component"), t = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    return t.default = e, t;
}(require("../../../common/cookie-v2/cookie.js"));

new e.JDComponent({
    properties: {
        isJx: Boolean,
        address: String,
        skuId: {
            type: String,
            observer: "render"
        },
        freight: Object,
        serviceQueryStr: String,
        isOffline: Boolean,
        shopDetail: Object
    },
    ready: function() {
        getApp().event.on("updateChoseShop", this.render.bind(this)), this.render();
    },
    methods: {
        render: function() {
            var e = t.getCookie("choseShop");
            if (e) {
                var o = t.getCookie("choseShopId").split("----");
                if (o && o[1] === this.data.skuId && e) {
                    var r = e.split("----"), n = {
                        addr: r[0],
                        name: r[1],
                        phone: r[2]
                    };
                    this.setData({
                        shopDetail: n
                    });
                } else this.setData({
                    shopDetail: null
                });
            }
        },
        switchAddress: function(e) {
            this.$report("VIEW_FOLD_wADDR"), this.triggerEvent("showAddressLayer");
        },
        chooseShop: function() {
            this.triggerEvent("chooseShop");
        },
        makePhone: function(e) {
            var t = e.currentTarget.dataset.phone;
            wx.makePhoneCall({
                phoneNumber: t
            });
        }
    }
});