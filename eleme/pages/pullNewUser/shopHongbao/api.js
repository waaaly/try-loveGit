var e = getApp().services, t = (e.Geohash, e.ApiCreater), a = (e.API, e.User);

exports.getPageMeta = function(e) {
    var a = e.id, r = e.type, n = e.latitude, o = e.longitude, i = e.isExchange, s = {};
    return n && o && (s.latitude = n, s.longitude = o), i ? (s.shop_id = a, s.shop_type = r) : s[1 === r ? "restaurant_id" : "brand_id"] = a, 
    t({
        url: i ? "/marketing/v1/restaurant_exchange/hongbao/meta" : "/marketing/v1/invite_new_users/hongbaos/meta",
        data: s
    });
}, exports.sendVerifyCode = function(e) {
    var a = e.mobile, r = e.captcha_hash, n = e.captcha_value;
    return t({
        url: "/eus/v1/weixin_light_app_login_code",
        method: "POST",
        data: {
            mobile: a,
            captcha_hash: r,
            captcha_value: n
        }
    });
}, exports.getHongbao = function(e) {
    var r = e.id, n = e.type, o = e.longitude, i = e.latitude, s = e.refer, d = e.exchangeCode, u = {
        url: "/marketing/v1/restaurants/" + r + "/invite_new_users/hongbaos",
        method: "POST",
        header: {
            Cookie: "SID=" + a.SID
        },
        data: {
            user_id: a.id,
            phone: a.info.mobile,
            shop_type: n,
            longitude: o,
            latitude: i,
            refer: s,
            scene: wx.getStorageSync("scene") || ""
        }
    };
    return d && (u.url = "/marketing/v1/restaurant_exchange/hongbao", u.data.shop_id = r, 
    u.data.exchange_code = d), t(u);
}, exports.queryHongbaoList = function(e) {
    var a = e.id, r = e.type, n = e.isExchange, o = {};
    return n ? (o.shop_id = a, o.shop_type = r) : o[1 === r ? "restaurant_id" : "brand_id"] = a, 
    t({
        url: n ? "/marketing/v1/restaurant_exchange/hongbao/records" : "/marketing/v1/invite_new_users/hongbaos",
        data: o
    });
}, exports.getCaptchaCode = function(e) {
    return t({
        url: "/eus/v1/captchas/" + e,
        method: "POST"
    });
}, exports.download = function(e) {
    return t({
        url: "/marketing/v1/invite_new_users/sms/download",
        method: "POST",
        header: {
            cookie: "SID=" + a.SID
        },
        data: e
    });
};