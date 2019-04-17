function e(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = i, e;
}

function t(e) {
    return p === "" + e;
}

function i(t) {
    return t ? t.map(function(t) {
        var i;
        return t.dish_activity.map(function(e) {
            var t = "";
            switch (e.rule_form) {
              case "g_maizeng":
                t = "赠" + e.gift_name + e.gift_amount + "份";
                break;

              case "g_jian":
                t = e.rule_desc_notice || "";
                break;

              case "g_reduce":
              case "g_te":
                t = e.discount + "折限" + e.order_limit + "份优惠";
                break;

              case "g_zhe":
                t = e.discount + "折限" + e.order_limit + "份优惠";
            }
            return e.text = t, e;
        }), i = {
            dish_activity: t.dish_activity,
            rating: t.rate,
            rating_count: t.rating_amount,
            is_featured: !1,
            restaurant_id: p,
            display_times: [],
            attrs: [],
            name: t.upc_name || t.name,
            image_path: t.url,
            specfoods: [ {
                price: t.current_price,
                stock: t.left_num
            } ],
            item_id: t.sku_id,
            specifications: [],
            min_purchase: 1,
            limitation: [],
            price: t.current_price,
            original_price: t.sale_price,
            month_sales: t.month_sell,
            satisfy_rate: t.rate
        }, e(i, "limitation", {}), e(i, "stock", t.left_num), e(i, "min_purchase", 1), i;
    }) : [];
}

var r = function() {
    function e(e, t) {
        var i = [], r = !0, n = !1, o = void 0;
        try {
            for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (i.push(a.value), 
            !t || i.length !== t); r = !0) ;
        } catch (e) {
            n = !0, o = e;
        } finally {
            try {
                !r && s.return && s.return();
            } finally {
                if (n) throw o;
            }
        }
        return i;
    }
    return function(t, i) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, i);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), n = require("../../../common/services/hosts"), o = n.apiHost, a = n.apiNewRetailHost, s = getApp().services, u = s.ApiCreater, d = s.HashToUrl, c = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return u(e, t).then(function(e) {
        var t = e.data, i = e.statusCode;
        return i >= 400 || i < 200 ? (console.error(t), null) : t;
    }, function(e) {
        return null;
    });
}, p = void 0;

exports.checkNewRetailShop = function(e) {
    var t = "" + e;
    return c({
        url: a + "/newretail/api/transbdwidsbyeleids",
        data: {
            ele_ids: t
        }
    }).then(function(e) {
        if (e && e.result) {
            var i = e.result[t];
            if (i && (i = "" + i) !== t) return p = i, i;
        }
        return null;
    });
}, exports.getShop = function(e) {
    var i = e.shopId, r = void 0 === i ? "" : i, n = e.latitude, s = e.longitude, u = e.isTransfer;
    return t(r) || parseInt(u) ? c({
        url: a + "/newretail/shop/getshopinfo",
        data: {
            shop_id: r,
            lat: n,
            lng: s
        }
    }).then(function(e) {
        var t = e.result, i = {};
        return i.info = {}, i.info.id = r, i.info.ele_id = t.ele_id, i.info.activities = Array.isArray(t.activities) ? t.activities.map(function(e) {
            var t = {};
            return t.description = e.description, t.icon_name = e.icon_name, t.icon_color = e.icon_color, 
            t.tips = e.tips || e.description, t.name = e.name, t;
        }) : [], i.info.address = "", i.info.name = t.name, i.info.piecewise_agent_fee = {
            description: "配送费¥" + t.takeout_cost,
            tips: "配送费¥" + t.takeout_cost,
            rules: [ {
                price: t.takeout_price
            } ]
        }, i.info.status = t.business_status, i.info.rating = Math.round(10 * t.shop_score) / 10, 
        i.info.order_lead_time = t.order_lead_time, i.info.distance = t.distance, i.info.promotion_info = t.promotion_info, 
        i.info.delivery_mode = t.delivery_mode, i.info.image_path = t.image_path, i.info.is_premium = !!t.brand_id || !!t.brand, 
        i.ratings = {}, exports.getShop({
            shopId: t.ele_id,
            longitude: s,
            latitude: n
        }).then(function(e) {
            return i.ratings = e.ratings, i;
        });
    }) : c({
        url: o + "/pizza/v1/restaurants/" + r,
        data: {
            extras: [ "activities" ],
            latitude: n,
            longitude: s,
            terminal: "weapp"
        }
    }, {
        shopId: r
    });
}, exports.getMenu = function(e) {
    return t(e) ? Promise.resolve(null) : c({
        url: o + "/pizza/v1/restaurants/" + e + "/menu"
    }, {
        shopId: e
    });
}, exports.getSlicedMenu = function(e, r, n) {
    return t(e) || parseInt(r) ? c({
        url: a + "/newretail/shop/getshopcategoryinfo",
        data: {
            shop_id: e,
            sku_id: n,
            from: "wx"
        }
    }).then(function(e) {
        var t = [], r = 0;
        return e.result.forEach(function(e) {
            var n = e.id, o = e.name, a = e.description, s = e.type, u = e.detail;
            if (Array.isArray(u)) u.forEach(function(e, a) {
                var u = {
                    id: e.id || e.dish_activity_id || e.region_id || n + "##" + a,
                    name: e.region_title || e.activity_name || e.name || o,
                    description: e.region_sub_head || e.description || "",
                    is_activity: !!e.activity_name,
                    is_selected: !1,
                    type: e.type || s,
                    foods: i(e.foods)
                };
                e.is_selected && (r = t.length), t.push(u);
            }); else {
                var d = {
                    id: n,
                    name: o,
                    description: a,
                    type: s,
                    activity: null,
                    is_activity: !1,
                    is_selected: !1,
                    foods: i(e.foods)
                };
                e.is_selected && (r = t.length), t.push(d);
            }
        }), t[r].is_selected = !0, t;
    }) : c({
        url: o + "/shopping/v1/restaurants/" + e + "/menu/categories"
    }, {
        shopId: e
    }).then(function(e) {
        return e.length ? (e[0].foods.forEach(function(e) {
            e.image_hash = e.image_path, e.image_path = d(e.image_path, 120, 120);
        }), e) : [];
    });
}, exports.getFoodsByCategory = function(e, t, r, n) {
    var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 30;
    return c({
        url: a + "/newretail/shop/getfoodsbycategoryforpage",
        data: {
            shop_id: e,
            category_id: t,
            page_num: o,
            type: r,
            page: n
        }
    }).then(function(e) {
        return e.result && e.result.foods && e.result.foods.length ? i(e.result.foods) : [];
    });
}, exports.getCategory = function(e, t, n, s) {
    return s ? function() {
        var o = (t + "").split("##"), s = r(o, 2), u = s[0], d = s[1];
        return c({
            url: a + "/newretail/shop/getfoodsbycategoryforpage",
            data: {
                shop_id: e,
                category_id: u,
                page: 1,
                page_num: 30,
                type: n
            }
        }).then(function(e) {
            var t = e.result, r = {};
            if (d) {
                var n = t.detail[d - 0];
                r.foods = n.foods;
            } else r.foods = t.foods;
            return r.foods || (r.foods = t.foods || t.detail[t.id.split(",").indexOf(u)].foods), 
            r.foods = i(r.foods), r;
        });
    }() : c({
        url: o + "/shopping/v1/restaurants/" + e + "/menu/categories/" + t
    }, {
        shopId: e
    }).then(function(e) {
        return e.foods.forEach(function(e) {
            e.image_hash = e.image_path, e.image_path = d(e.image_path, 120, 120);
        }), e;
    });
}, exports.createCart = function(e) {
    return c({
        url: o + "/booking/v1/carts",
        method: "POST",
        data: e
    });
}, exports.pickFoodForPindan = function(e, t) {
    return c({
        url: o + "/booking/v1/carts/" + e + "/pindan_groups",
        method: "POST",
        data: t
    });
}, exports.getShopMetaData = function(e) {
    return t(e) ? Promise.resolve({
        checkout_mode: 0,
        composition: 0,
        support_pindan: !1
    }) : c({
        url: o + "/shopping/v1/restaurants/" + e + "/metadata"
    }, {
        shopId: e
    });
};