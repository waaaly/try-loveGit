var e = getApp().services, t = e.ApiCreater, r = e.User, o = "https://openapi.ele.me", n = require("../../../common/services/hosts").crayfishlite, a = function(e) {
    var t = e.data;
    return 200 === t.code ? t.data : Promise.reject(t.code);
};

module.exports = {
    getCarouselData: function() {
        return t({
            url: o + "/v2/free_relay/carousel/",
            header: {
                cookie: "SID=" + r.SID,
                "content-type": "text/html"
            }
        }).then(a);
    },
    getRecord: function(e, n) {
        return t({
            url: o + "/v2/free_relay/prize/record/?geohash=" + e + "&user_id=" + n + "&limit=10&come_from=0",
            header: {
                cookie: "SID=" + r.SID,
                "content-type": "text/html"
            }
        }).then(a);
    },
    getPrizeStatus: function(e, n) {
        return t({
            url: o + "/v2/free_relay/wechat/gift/?geohash=" + e + "&user_id=" + n + "&come_from=0",
            header: {
                cookie: "SID=" + r.SID,
                "content-type": "text/html"
            },
            method: "POST"
        }).then(a);
    },
    getToken: function(e, n) {
        return t({
            url: o + "/v2/free_relay/assist/token/?geohash=" + e + "&user_id=" + n + "&come_from=0",
            header: {
                cookie: "SID=" + r.SID,
                "content-type": "text/html"
            }
        }).then(a);
    },
    assistFriend: function(e, n, i) {
        return t({
            url: o + "/v2/free_relay/share/assist/",
            method: "POST",
            header: {
                cookie: "SID=" + r.SID,
                "content-type": "application/json; charset=utf-8"
            },
            data: {
                friend_user_id: n,
                token: i,
                geohash: e,
                come_from: 0
            }
        }).then(a);
    },
    acceptHongbao: function(e, n) {
        return t({
            url: o + "/v2/free_relay/hongbao/generate/",
            method: "POST",
            header: {
                cookie: "SID=" + r.SID,
                "content-type": "application/json; charset=utf-8"
            },
            data: {
                user_id: n,
                geohash: e,
                come_from: 0
            }
        }).then(a);
    },
    isAlidayCity: function(e, n) {
        return t({
            url: o + "/v2/free/relay/is_aliday/?geohash=" + e + "&user_id=" + n + "&come_from=0",
            header: {
                cookie: "SID=" + r.SID,
                "content-type": "text/html"
            }
        }).then(a);
    },
    getRules: function() {
        return t({
            url: n + "/freedinner"
        });
    }
};