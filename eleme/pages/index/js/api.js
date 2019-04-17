var e = getApp().services, t = e.ApiCreater, r = e.User, o = (e.Location, require("../../../common/services/hosts").crayfishlite);

module.exports = {
    queryNewUserGifts: function(e) {
        return t({
            url: "/marketing/users/" + r.id + "/query_new_user_gifts",
            data: {
                geohash: e
            }
        });
    },
    getNewUserGifts: function(e) {
        return t({
            url: "/marketing/v3/users/" + r.id + "/new_user_gifts",
            data: {
                geohash: e
            },
            header: {
                cookie: "SID=" + r.SID
            }
        });
    },
    fetchHongbaoInfo: function(e, o) {
        return t({
            url: "/marketing/v4/users/" + e + "/startup_hongbao",
            method: "POST",
            header: {
                cookie: "SID=" + r.SID
            },
            data: {
                geohash: o
            }
        });
    },
    callbackHongbao: function(e, o) {
        return t({
            url: "/marketing/users/" + e + "/startup_hongbao/callback",
            method: "POST",
            header: {
                cookie: "SID=" + r.SID
            },
            data: {
                hongbao_sns: o
            }
        });
    },
    getPromotionConfig: function() {
        return t({
            url: o + "/promotion"
        });
    },
    getBanners: function(e) {
        return t({
            url: "/shopping/v2/banners",
            data: e
        });
    },
    getTop: function(e) {
        return t({
            url: "/shopping/v2/entries?templates[]=big_sale_promotion_template",
            data: e
        });
    },
    getFestivalHongbao: function(e) {
        return t({
            url: "https://h5.ele.me/restapi/traffic/sudhana/send",
            data: e,
            method: "POST",
            header: {
                cookie: "SID=" + r.SID
            }
        });
    }
};