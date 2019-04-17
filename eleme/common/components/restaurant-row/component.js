var e = require("../../services/i18n.js").shopStatus, t = require("../../utils/util.js").maybeToFixed, i = getApp().services.HashToUrl;

module.exports = {
    handleRow: function(s) {
        return s = s.map(function(s) {
            var r = null;
            if (s.aoi_id) {
                (r = s.shop_info).distance >= 1e3 ? r.distance = (r.distance / 1e3).toFixed(1) + "km" : r.distance = r.distance.toFixed(0) + "m", 
                r.id = r.ele_id, r.image_url = i(r.logo_url, 120, 120), r.support_safe = !1, r.support_ticket = r.shop_labels.indexOf("piao") > -1, 
                r.support_ontime = r.shop_labels.indexOf("zhun") > -1, r.support_pei = r.shop_labels.indexOf("pei") > -1, 
                r.fengniao = r.shop_labels.indexOf("feng") > -1, r.is_new = r.shop_labels.indexOf("xin") > -1, 
                r.activities = r.welfare_info.map(function(e) {
                    return e.description = e.msg, e;
                }), r.is_premium = r.is_brand, r.name = r.shop_name, r.miniumFeeText = "￥" + r.takeout_price + "起送", 
                r.deliveryFeeText = "配送费￥" + r.takeout_cost, r.order_lead_time = r.delivery_time, 
                r.recent_order_num = r.saled_month, r.shop_labels.indexOf("feng") > -1 && (r.delivery_mode = {}, 
                r.delivery_mode.id = 1), r.isActivityFolded = !0;
                var n = {
                    1: "休息中",
                    2: "可预订",
                    4: "暂停营业",
                    6: "即将关店"
                };
                r.statusText = n[r.business_status] || "", "" === r.statusText && (r.status = 1), 
                r.rating = r.overall_rating;
            } else {
                s.restaurant ? ((r = s.restaurant).foods = (s.foods || []).slice(0, 3), r.foods.forEach(function(e) {
                    e.imageUrl = i(e.image_path, 240, 240), e.price = +e.price.toFixed(2), e.original_price && (e.original_price = +e.original_price.toFixed(2));
                }), r.searched = !0) : r = s, r.distance >= 1e3 ? r.distance = (r.distance / 1e3).toFixed(1) + "km" : r.distance = r.distance.toFixed(0) + "m", 
                r.image_url = i(r.image_path, 120, 120), r.support_safe = r.supports.filter(function(e) {
                    return 7 === e.id;
                }).length > 0, r.support_ticket = r.supports.filter(function(e) {
                    return 4 === e.id;
                }).length > 0, r.support_ontime = r.supports.filter(function(e) {
                    return 9 === e.id;
                }).length > 0, r.fengniao = r.supports.filter(function(e) {
                    return 1 === e.id;
                }).length > 0, r.statusText = e[r.status];
                var a = r.piecewise_agent_fee.rules;
                r.deliveryFeeText = a.length > 1 ? "配送费约¥" + t(a[1].fee) : "配送费¥" + t(a[0].fee), 
                r.miniumFeeText = "¥" + t(a[0].price) + "起送", r.isActivityFolded = !0;
            }
            return r;
        });
    },
    toggleActivity: function(e) {
        var t = e.currentTarget.dataset.restaurantIndex, i = this.data.restaurants;
        i[t].isActivityFolded = !i[t].isActivityFolded, this.setData({
            restaurants: i
        });
    }
};