function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../js/statusMap")), a = e(require("../../../utils/api")), n = getApp().services, r = n.weixinAPIs, i = n.User;

n.Ubt;

module.exports = {
    data: {
        statusMap: t.default
    },
    handleInput: function(e) {
        this.setData({
            content: e.detail.value
        });
    },
    onShareAppMessage: function() {
        var e = this, t = this.data, n = t.content, s = void 0 === n ? "大吉大利，今晚吃鸡" : n, u = t.cardNum, o = t.detail, c = i.open_id;
        return {
            title: s,
            path: "pages/giftcard/myCards/pages/share/index?cardNum=" + u + "&content=" + s + "&token=" + o.token,
            success: function() {
                r.weixinUserInfo().then(function(e) {
                    var t = e.nickName, n = e.avatarUrl;
                    return a.default.giveGiftCard({
                        user_info: {
                            nick_name: t,
                            avatar_url: n,
                            openid: c
                        },
                        card_number: u,
                        token: o.token,
                        remark: s
                    });
                }).then(function(t) {
                    e.parseDetail(t);
                }).catch(function() {});
            }
        };
    }
};