var t = getApp().services, e = (t.webCart, t.HashToUrl), s = t.Ubt, a = require("../../../../common/utils/util.js").maybeToFixed;

module.exports = {
    handleRow: function(t) {
        return t.map(function(t) {
            var s = {
                foodUrl: e(t.image_hash, 180, 180),
                percent: t.stock > t.process_stock ? 100 : t.stock / t.process_stock * 100,
                fixedOriginPrice: a(t.original_price)
            };
            return 0 === t.restaurant_status ? Object.assign(t, s, {
                btnText: "商家休息",
                progress: "待开抢",
                status: "inrest"
            }) : 0 === t.stock ? Object.assign(t, s, {
                btnText: "进店逛逛",
                progress: "今日已抢完",
                status: "finish"
            }) : Object.assign(t, s, {
                btnText: "马上抢",
                progress: "仅剩" + t.stock + "份",
                status: "enable"
            }), t;
        });
    },
    enterRst: function(t) {
        wx.navigateTo({
            url: "/pages/shop/shop/index?id=" + t
        });
    },
    addCart: function(t) {
        var e = {
            food_id: t.id,
            quantity: 1,
            stock: 20,
            name: t.name,
            price: t.price,
            original_price: t.original_price,
            packing_fee: t.packing_fee || 0
        };
        wx.setStorage({
            key: "CART_OPERATION",
            data: {
                clear_cart: !0,
                add_foods: [ {
                    id: e.food_id,
                    quantity: 1,
                    is_flash_sell: !0,
                    specfoods: [ e ]
                } ]
            },
            success: function() {
                wx.navigateTo({
                    url: "/pages/shop/shop/index?id=" + t.restaurant_id + "&loadedCart=true&promotion_food=" + t.id
                });
            }
        });
    },
    clickBtn: function(t) {
        var e = t.currentTarget.dataset, a = e.food, i = e.index, r = e.activatedTab;
        s.sendEvent({
            id: "101938",
            params: {
                index: i,
                restaurant_id: a.restaurant_id,
                title: this.data.scenes[r].text
            }
        }), "enable" === a.status ? this.addCart(a) : "finish" === a.status && this.enterRst(a.restaurant_id);
    }
};