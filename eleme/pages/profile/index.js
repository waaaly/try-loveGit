var e = require("../../libs/aliLog"), t = require("../../dave/dave.js").HashToUrl, a = require("./data.js"), n = getApp().services, o = n.API, i = n.Ubt, s = n.imageHash, c = n.User, r = n.AliLog, l = "";

Page({
    data: {
        imageHash: s,
        loaded: !1,
        extra: "",
        list: a
    },
    onLoad: function(t) {
        var a = t.source;
        a && this.setData({
            extra: "source=" + a
        }), l = (0, e.createUrlParams)();
    },
    onShow: function() {
        c.id && this.refresh(), this.setData({
            loaded: !0
        }), this.checkShowGiftCard(), i.sendPv(this.data.extra), r.sendPv();
    },
    logout: function() {
        var e = this;
        wx.showModal({
            title: "确认退出登录",
            content: "退出登录后您将无法使用此微信账号登录饿了么app",
            success: function(t) {
                t.confirm && o.unbind().then(function() {
                    c.removeSync(), e.setData({
                        user: null
                    }), r.sendGoldlog("eleme-wechatmp.ELEME-WECHATMP-PROFILE.ELEME-WECHATMP-PROFILE-LOGOUT", "CLK", "logout_type=1");
                }).catch(function() {
                    wx.showToast({
                        title: "失败了，请重试"
                    });
                });
            }
        }), r.sendGoldlog("eleme-wechatmp.ELEME-WECHATMP-PROFILE.ELEME-WECHATMP-PROFILE-LOGOUT", "CLK", "logout_type=0");
    },
    refresh: function() {
        var e = this;
        o.getProfile(c.id).then(function(a) {
            var n = a.data;
            n.balance = n.balance, n.mobile = n.mobile.slice(0, 3) + "****" + n.mobile.slice(7), 
            n.avatar && (n.avatar_url = t(n.avatar)), e.setData({
                user: n,
                loaded: !0,
                serverDown: !1
            });
        }).catch(function(t) {
            "UNAUTHORIZED" === t.data.name ? (c.removeSync(), e.setData({
                loaded: !0,
                user: null,
                serverDown: !1
            })) : (e.setData({
                serverDown: !0,
                loaded: !0
            }), wx.showToast({
                title: t.data.message || "服务器君饿晕了"
            }));
        });
    },
    goToItem: function(e) {
        var t = e.currentTarget.dataset, a = t.dataset, n = t.url;
        a && a.ubt && i.sendEvent({
            id: a.ubt
        }), n = n + (n.indexOf("?") > -1 ? "&" : "?") + l, wx.navigateTo({
            url: n
        });
    },
    checkShowGiftCard: function() {
        var e = this, t = {
            title: "我的心意卡",
            icon: "ac_icon_giftcard",
            url: "/pages/giftcard/myCards/index",
            ubt: 102328
        }, n = {
            title: "我的客服",
            icon: "ac_icon_cs",
            url: "/pages/container/index?withLoginInfo=1&q=https%3A%2F%2Fhelp.ele.me%2F%3Fscene%3Dwechat-eleme-applets",
            needLogin: !0
        }, i = {
            title: "规则中心",
            icon: "ac_icon_rule",
            url: "/pages/container/index?q=https%3A%2F%2Fh5.ele.me%2Fservice%2Fagreement%2F%23HEAEDER_SHOW%3D1"
        }, s = [].concat(a);
        o.getGiftCardConfig().then(function(a) {
            a.data.show && s.splice(1, 0, t), a.data.showKefu && s.push(n), s.push(i), e.setData({
                list: s
            }), c.id && e.setList();
        }).catch(function() {});
    },
    goLogin: function() {
        wx.navigateTo({
            url: "/pages/auth/index?scene=login&type=sms&" + l
        });
    },
    goHongbao: function() {
        wx.navigateTo({
            url: "/pages/promotion/hongbao/hongbao?" + l
        });
    },
    setList: function() {
        var e = this;
        o.getNewRefer().then(function(t) {
            if (t.data.enabled) {
                var a = {
                    title: "推荐有奖",
                    icon: "tuijian_icon",
                    url: "/pages/recommend/index?channel=2",
                    needLogin: !c.id
                }, n = [].concat(e.data.list);
                n.splice(1, 0, a), console.log(n), e.setData({
                    list: n
                });
            }
        });
    }
});