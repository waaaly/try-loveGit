var e = require("../../../common/services/hosts").crayfishlite, r = getApp().services, t = r.ApiCreater, o = r.User, n = r.paramsToString;

r.Location;

module.exports = {
    getRedpack: function(e) {
        return t({
            url: "/marketing/promotion/weixin/" + o.open_id,
            method: "POST",
            header: {
                cookie: "SID=" + o.SID
            },
            data: e
        });
    },
    queryShareInfo: function(e, r) {
        return t({
            url: "/marketing/v1/users/" + e + "/orders/" + r + "/refer_share_hongbao",
            header: {
                cookie: "SID=" + o.SID
            }
        });
    },
    queryCouponList: function(e) {
        return t({
            url: "/shopping/v1/users/" + o.id + "/share_refer/restaurants?" + n(e),
            header: {
                cookie: "SID=" + o.SID
            }
        });
    },
    getCoupon: function(e, r) {
        return t({
            url: "/promotion/v1/users/" + o.id + "/activities/" + e + "/share_refer_receipt",
            method: "POST",
            header: {
                cookie: "SID=" + o.SID
            },
            data: {
                restaurant_id: r
            }
        });
    },
    getSign: function(e) {
        return t({
            url: "https://waltz.ele.me/weixin/program/userinfo/wxece3a9a4c82f58c9?code=" + e,
            header: {
                "Content-Type": "text/plain"
            }
        });
    },
    geoHierarchy: function(e, r) {
        return t({
            url: "/bgs/geo/hierarchy?latitude=" + e + "&longitude=" + r
        });
    },
    isNewUser: function() {
        return t({
            url: "/eus/v2/users/" + o.id + "/new_user_check",
            header: {
                cookie: "SID=" + o.SID
            }
        });
    },
    crayfishConfig: function() {
        return t({
            url: e + "/wechain"
        });
    },
    shareBonus: function(e, r) {
        return t({
            url: "/marketing/v1/users/" + o.id + "/group_sns/" + e + "/share_bonus",
            header: {
                cookie: "SID=" + o.SID
            },
            method: "POST",
            data: r
        });
    },
    shareBonusAndCoupon: function(e, r) {
        return t({
            url: "/marketing/v1/users/" + o.id + "/activities/" + e + "/share_refer_receipt",
            header: {
                cookie: "SID=" + o.SID
            },
            method: "POST",
            data: r
        });
    },
    queryCash: function(e, r, n) {
        return t({
            url: "/marketing/v1/users/" + o.id + "/group_sns/" + e + "/share_bonus?latitude=" + r + "&longitude=" + n,
            header: {
                cookie: "SID=" + o.SID
            }
        });
    }
};