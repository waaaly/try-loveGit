function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, r = Array(t.length); e < t.length; e++) r[e] = t[e];
        return r;
    }
    return Array.from(t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(e, r, a, n) {
    if (0 !== Object.keys(e).length) {
        e.clear_cart && r.clearCart();
        var o = e.add_foods || [], i = a.reduce(function(e, r) {
            return e.concat.apply(e, t(r.foods));
        }, []).reduce(function(e, r) {
            return e.concat.apply(e, t(r.specfoods));
        }, []), c = void 0;
        o.forEach(function(t) {
            !(c = i.filter(function(e) {
                return e.food_id === t.id;
            })[0]) && t.is_flash_sell && ((c = t.specfoods[0]).activity = {
                applicable_quantity: 1,
                quantity_condition: 1,
                max_quantity: 1
            });
            var e = t.is_flash_sell ? {
                is_flash_sell: !0
            } : {};
            r.setEntity(c, t.quantity, n, e);
        }), wx.removeStorage({
            key: "CART_OPERATION"
        });
    }
};