var e = function() {
    function e(e, t) {
        var n = [], o = !0, i = !1, a = void 0;
        try {
            for (var r, s = e[Symbol.iterator](); !(o = (r = s.next()).done) && (n.push(r.value), 
            !t || n.length !== t); o = !0) ;
        } catch (e) {
            i = !0, a = e;
        } finally {
            try {
                !o && s.return && s.return();
            } finally {
                if (i) throw a;
            }
        }
        return n;
    }
    return function(t, n) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), t = require("../../libs/aliLog"), n = require("./consts"), o = getApp().services, i = o.Ubt, a = o.AliLog, r = o.API, s = o.User, c = "", u = function(e) {
    var t = new Date(1e3 * e);
    return [ t.getMonth() + 1, ".", t.getDate(), " ", t.getHours(), ":", t.getMinutes(), ":", t.getSeconds() ].join("").replace(/\b\d\b/g, "0$&");
}, l = function() {
    return new Promise(function(e, t) {
        wx.getSetting({
            success: function(n) {
                n.authSetting["scope.userInfo"] ? wx.getUserInfo({
                    success: e,
                    fail: t
                }) : t();
            },
            fail: t
        });
    });
}, d = function() {
    return new Promise(function(e, t) {
        wx.login({
            success: function(n) {
                s.login({
                    authcode: n.code
                }).then(e).catch(t);
            },
            fail: t
        });
    });
};

Page({
    data: {
        hongbaos: [],
        records: [],
        rules: n.rules,
        showLogin: !1,
        loaded: !1
    },
    onLoad: function(e) {
        var n = this;
        console.log(e);
        var o = e.group_sn, i = e.refer_user_id;
        o ? (this.setData({
            group_sn: o,
            refer_user_id: i
        }), d().then(function() {
            n.getHongbao();
        }).catch(function() {
            n.setData({
                showLogin: !0,
                loaded: !0
            });
        })) : (this.setData({
            loaded: !0
        }), wx.showToast({
            title: "参数错误",
            icon: "none"
        })), c = (0, t.createUrlParams)();
    },
    onShow: function() {
        i.sendPv(), a.sendPv();
    },
    getHongbao: function() {
        var t = this, o = wx.getStorageSync("PLACE") || {}, i = o.latitude, c = o.longitude, d = {
            group_sn: this.data.group_sn,
            refer_user_id: this.data.refer_user_id || "",
            weixin_uid: s.open_id,
            phone: s.info.mobile || "",
            user_id: s.id,
            sns_type: 6,
            unionid: s.union_id,
            platform: 0
        };
        i && (d.latitude = i, d.longitude = c);
        var g = wx.getSystemInfoSync().system;
        /ios/i.test(g) ? d.platform = 1 : /android/i.test(g) && (d.platform = 2), l().then(function(e) {
            return console.log(e), Promise.reject(e.userInfo);
        }).catch(function(e) {
            return console.log(e), d.weixin_username = e && e.nickName || "", d.weixin_avatar = e && e.avatarUrl || "", 
            r.getLuckyHongbao(d);
        }).then(function(o) {
            console.log(o), t.setData({
                loaded: !0
            });
            var i = o.data, r = i.promotion_items, s = i.promotion_records, c = i.ret_code;
            r.length ? (r.forEach(function(t) {
                var n = ("" + t.amount).split("."), o = e(n, 2), i = o[0], a = o[1];
                t.integer = i, t.decimal = a;
            }), s.forEach(function(e) {
                e.formatedTime = u(e.created_at);
            }), t.setData({
                hongbaos: r,
                records: s
            }), a.sendGoldlog("eleme-wechatmp.PINSHOUQI_HONGBAO.ELEME-WECHATMP-PINSHOUQI-SUCCESS", "EXP")) : c && t.setData({
                failMsg: n.failText[c] || "领取失败"
            });
        }).catch(function(e) {
            console.log(e), t.setData({
                loaded: !0
            }), e && "SNS_UNIONID_CHECK_FAILED" === e.data.name ? wx.showToast({
                title: "该手机号已绑定其他微信号，请前往app解绑",
                icon: "none"
            }) : wx.showToast({
                title: e && e.data && e.data.message || "领取失败~",
                icon: "none"
            });
        });
    },
    logined: function() {
        console.log("success"), this.setData({
            showLogin: !1
        }), a.sendGoldlog("eleme-wechatmp.PINSHOUQI_HONGBAO.ELEME-WECHATMP-PINSHOUQI-LOGIN", "EXP"), 
        this.getHongbao();
    },
    launchSuccess: function(e) {
        a.sendGoldlog("eleme-wechatmp.PINSHOUQI_HONGBAO.ELEME-WECHATMP-PINSHOUQI-OPENAPP", "CLK", "result=0"), 
        setTimeout(function() {
            wx.switchTab({
                url: "/pages/index/index?source=pinshouqi"
            });
        }, 1e3);
    },
    launchError: function(e) {
        a.sendGoldlog("eleme-wechatmp.PINSHOUQI_HONGBAO.ELEME-WECHATMP-PINSHOUQI-OPENAPP", "CLK", "result=1"), 
        wx.switchTab({
            url: "/pages/index/index?source=pinshouqi"
        });
    }
});