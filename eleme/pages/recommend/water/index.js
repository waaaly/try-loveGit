var e = getApp().services, o = e.API, n = e.User, r = e.HashToUrl, t = e.AliLog, a = {};

Page({
    data: {
        nohb: "",
        ishas: !0,
        loaded: !1,
        url: "http://h5.test.ele.me/commend#/",
        sumAmount: 3,
        hongbaoType: "老朋友见面礼",
        hongbao: {
            description: "fdsfdsf",
            source: "",
            is_new_user: !1,
            expireText: "fdsf",
            item_type: 2,
            icon: "fsdfds",
            sum_condition: "fdsfdsfds",
            expire_date: "fdsfdsfdsf"
        },
        restrict: !1,
        expire: !1,
        rules: [ "使用红包时的下单手机号需为抢红包时使用的手机号。", "发放至饿了么账户的红包登录后即可使用。", "红包仅限在线支付时使用，每张订单仅限使用一张红包，红包不找零。", "首单专享红包仅限首单使用，并不与其他优惠叠加使用。", "饿了么保留法律范围内允许的对活动的解释权。" ],
        redirect: !1,
        promotionItems: [],
        phone: 0,
        tips: "红包被领完了",
        newRefer: !0
    },
    onLoad: function(e) {
        var o = e.isAuth, n = e.refer_id, r = e.refer_code, t = e.refer_channel_code, s = e.refer_channel_type;
        console.log(o, n, r, t, s), o ? wx.getStorage({
            key: "shareUrl",
            success: function(e) {
                console.log(e.data);
                var o = e.data;
                a.refer_id = o.refer_id, a.refer_code = o.refer_code, a.refer_channel_code = o.refer_channel_code, 
                a.refer_channel_type = o.refer_channel_type;
            }
        }) : (a.refer_id = n, a.refer_code = r, a.refer_channel_code = t, a.refer_channel_type = s, 
        wx.setStorage({
            key: "shareUrl",
            data: a
        }));
    },
    onShow: function() {
        n.id ? (this.init(), this.setData({
            currentUser: n,
            loaded: !0
        })) : this.setData({
            currentUser: !1,
            loaded: !0
        }), t.sendGoldlog("recommendedprize.SmallProgramsTJYJ_Guest.EXP_RedBagPage", "EXP"), 
        t.sendPv();
    },
    init: function() {
        var e = this;
        o.getNewRefer().then(function(n) {
            console.log("getNewRefer", n), e.setData({
                newRefer: n.data.enabled
            }), e.getHonbbaoPram().then(function(n) {
                console.log("getHonbbaoPram", n), o.getCommendHongbao(n).then(function(o) {
                    console.log("getCommendHongbao", o);
                    var n = o.data;
                    e.setCode(n), e.setSumAmount(n);
                });
            });
        });
    },
    getHonbbaoPram: function() {
        var e = wx.getStorageSync("PLACE"), o = e.latitude, r = e.longitude;
        return this.getwxUser().then(function(e) {
            return {
                user_id: n.id,
                refer_code: a.refer_code,
                refer_user_id: a.refer_id,
                weixin_uid: n.union_id,
                weixin_username: e.userInfo.nickName,
                weixin_avatar: e.userInfo.avatarUrl || "https://cube.elemecdn.com/7/f1/6d2821b893e8e12f7634e55781a13png.png",
                phone: n.info.mobile,
                platform: 3,
                latitude: o,
                longitude: r,
                sns_type: 3,
                restaurant_id: "",
                refer_channel_code: a.refer_channel_code,
                refer_channel_type: a.refer_channel_type
            };
        });
    },
    getwxUser: function() {
        return new Promise(function(e, o) {
            wx.getUserInfo({
                success: function(o) {
                    e(o);
                },
                fail: o
            });
        });
    },
    setSumAmount: function(e) {
        var o = e.promotion_items.reduce(function(e, o) {
            return e + o.amount;
        }, 0);
        this.setData({
            sumAmount: o % 1 != 0 ? o.toFixed(1) : o
        });
    },
    setCode: function(e) {
        4 === e.ret_code && (e.promotion_items.map(function(e) {
            e.restaurant_image_hash && (e.restaurant_image_hash = r(e.restaurant_image_hash));
        }), this.setData({
            nohb: !0,
            promotionItems: e.promotion_items,
            phone: e.account.replace(/(\d{3})\d*(\d{4})/, "$1****$2")
        })), 1 === e.ret_code && this.setData({
            nohb: !1,
            tips: a.refer_id !== n.id ? "红包被领完了" : "自己不能接受自己的邀请哦！"
        }), 2 === e.ret_code && this.setData({
            nohb: !0,
            ishas: !1,
            hongbaoType: "您已经领取过红包啦",
            promotionItems: e.promotion_items,
            phone: e.account.replace(/(\d{3})\d*(\d{4})/, "$1****$2")
        });
    },
    goSomewhere: function(e) {
        var o = e.target.dataset.shopid;
        o ? (t.sendGoldlog("recommendedprize.SmallProgramsTJYJ_Guest.CLK_ModifyPhone", "CLK", "shopid=" + o), 
        wx.navigateTo({
            url: "/pages/shop/shop/index?id=" + o
        })) : (t.sendGoldlog("recommendedprize.SmallProgramsTJYJ_Guest.CLK_ModifyPhone", "CLK"), 
        wx.switchTab({
            url: "/pages/index/index"
        }));
    },
    goRecommend: function() {
        t.sendGoldlog("recommendedprize.SmallProgramsTJYJ_Guest.CLK_EarnCash", "CLK"), wx.redirectTo({
            url: "/pages/recommend/index"
        });
    },
    goLogin: function() {
        wx.navigateTo({
            url: "/pages/auth/index?successUrl=/pages/recommend/water/index?isAuth=true"
        });
    }
});