function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../../utils/api")), a = e(require("../../js/utils")), n = getApp().services, i = n.User, r = n.weixinAPIs, s = (n.Location, 
n.imageHash), d = n.Ubt;

module.exports = {
    data: {
        locateFailed: !1,
        imageHash: s
    },
    useGiftCard: function() {
        d.sendEvent({
            id: 102316
        }), a.default.useGiftCard({
            card_number: this.data.detail.detail_json.new_card_number
        });
    },
    receiveCard: function() {
        var e = this, a = i.id, n = i.open_id, s = this.data, o = s.cardNum, u = s.content, c = s.token;
        s.detail;
        if (d.sendEvent({
            id: 102315
        }), !a) return wx.redirectTo({
            url: "/pages/auth/index?successUrl=" + encodeURIComponent("/pages/giftcard/myCards/pages/share/index?cardNum=" + o + "&content=" + u + "&token=" + c)
        });
        r.weixinUserInfo().then(function(e) {
            var a = e.nickName, i = e.avatarUrl;
            return t.default.receiveGiftCard({
                user_info: {
                    nick_name: a,
                    avatar_url: i,
                    open_id: n
                },
                card_number: o,
                token: c
            });
        }).then(function(t) {
            e.getDetail(), wx.showToast({
                title: "领取成功"
            });
        }).catch(function() {
            wx.showToast({
                title: "领取失败",
                icon: "none"
            }), e.getDetail();
        });
    }
};