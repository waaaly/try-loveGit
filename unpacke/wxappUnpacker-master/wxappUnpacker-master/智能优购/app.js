var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var s = arguments[t];
        for (var n in s) Object.prototype.hasOwnProperty.call(s, n) && (e[n] = s[n]);
    }
    return e;
}, t = require("/BE1D50132546F6CFD87B3814C205B753.js").hostHelper, s = {
    userInfo: null,
    userInfoData: {},
    toname: "",
    wishes: "",
    tempwishes: "",
    temptoname: "",
    tempnickname: ""
}, n = (require("/B29921602546F6CFD4FF496775C4B753.js"), t.getShopHost(1)), i = t.getAppHost(1), o = t.getJdHost(1);

require("/614EDDE22546F6CF0728B5E55C25B753.js");

var a = require("/template/wetoast/wetoast.js").WeToast;

App({
    domain: n,
    WeToast: a,
    app_promotion_window_display: i + "/promotion/window/display",
    app_wish: i + "/wish",
    more: i + "/Goods/",
    active: i + "/Promotion",
    index_change_index: i + "/home/index",
    earn_active_page: i + "/goods/getactivitygoods",
    earn_integral: i + "/goods/score",
    earn_preference: i + "/goods/preference",
    earn_seckill: i + "/goods/seckill",
    earn_not_seckill: i + "/promotion/detail/nonsecondkill",
    class_shop: i + "/Category",
    class_shop_list: i + "/goods/QueryGoodsEntityByCatlaog",
    search_shop: i + "/goods/searchgoodsbyname",
    index_change_address: i + "/address",
    index_change_address_change: i + "/address/post",
    index_change_address_add: i + "/address/put",
    index_change_byid_get_ads: i + "/Address/GetSingle",
    index_change_address_two_class: i + "/address/GetRegionList",
    index_change_default_address: i + "/address/default",
    index_change_delete_address: i + "/address/delete",
    myCenter_index: i + "/user/personal/display?m=2",
    myCenter_leave: i + "/user/upgrade",
    myCenter_myInvitation: i + "/user/invites/list",
    app_wallet: i + "/Wallet",
    app_wallet_integral_exchangeData: i + "/wallet/integral/exchangeData",
    app_wallet_integral_exchange: i + "/wallet/integral/exchange",
    app_user_integral_exchangeDetails: i + "/user/integral/exchangeDetails",
    app_user_AppRegistAuthentication: i + "/user/AppRegistAuthentication",
    app_user_AppRegistAuthentications: i + "/user/AppRegistAuthentication1",
    myCenter_deleteHistory: i + "/user/deleteMyFootprints",
    myCenter_getagentanduserinfo: i + "/user/getagentanduserinfo1",
    myCenter_IsInvitationCodeEnable: i + "/user/IsInvitationCodeEnable1",
    myCenter_DeleteOrder: n + "/NewOrders/DeleteOrder",
    myCenter_userAuthentication: i + "/User/UserAuthentication",
    myCenter_userCodeSend: i + "/sms/send",
    myCenter_VerificationCode: i + "/user/VerificationCode",
    myCenter_UpdateMobile: i + "/user/UpdateMobile",
    myCenter_changeUser: i + "/User/GetReferrerName",
    myCenter_changeUsers: i + "/User/UpdateReferrer",
    vip_index: i + "/ShoppingGuide/GetShoppingGuideIndex",
    vip_promote: i + "/ShoppingGuide/UserIdentityUpgrade",
    vip_details: i + "/ShoppingGuide/GetSecondPageList",
    vip_giftBagActivationconfig: i + "/config/giftBagActivationconfig",
    vip_withdrawRecord: i + "/wallet/withdraw/list",
    vip_withdrawRecords: i + "/Wallet/GetCashLog",
    vip_withdrawNum: i + "/Wallet/GetActionResult",
    vip_bankList: i + "/config/bank/list",
    vip_withdrawInfo: i + "/user/card",
    vip_withdrawMoney: i + "/wallet/amount/rest",
    vip_withdraw: i + "/wallet/withdraw",
    shopDatail: i + "/goods",
    shopDatailMoney: i + "/Goods/GoodsAmount",
    shop_histiry: i + "/user/GetMyFootprintList",
    shop_histiry_add: i + "/user/SaveMyFootprint",
    shop_down_order: n + "/NewOrders/MiniSubmit",
    myCollection: i + "/GoodsCollection/GetGoodsList",
    myCollectionAdd: i + "/GoodsCollection/GetGoodsStart",
    myCollectionCancel: i + "/GoodsCollection/GetGoodsCancel",
    user_is_authentication1: i + "/user/IsAuthentication1/",
    you_link: i + "/home/GuessYouLike",
    order_again_pay: n + "/shop/MiniOrder",
    rank_list: i + "/PackageRanking/RankingQuery",
    rank_list_new: i + "/PackageRanking/NewRankingQuery",
    order_success_return: i + "/order/vipguider/success/data",
    optimization_list: i + "/promotion/detail/nonsecondkill",
    jd_address_delete: o + "/Address/DeleteAddress",
    jd_get_address_by_id: o + "/Address/GetJDAddressById",
    jd_order_get_logistics: o + "/Order/GetJDOrderLogistics",
    app_get_sessionKey: i + "/user/wechat/sessionKey",
    app_login: i + "/user/wechat/loginnew",
    name: "智融优购",
    version: 18,
    screen: {},
    device: {},
    userid: 0,
    tab: "0",
    goodShopId: {},
    userInfoData: "",
    showLoad: function(e) {
        wx.showLoading({
            title: e,
            mask: !0
        });
    },
    hideLoad: function() {
        wx.hideLoading();
    },
    onLaunch: function(e) {
        console.log("初始化分享信息onLaunch", e), console.log = function() {}, this.getScreenPar();
    },
    getSessionKey: function() {
        var e = new Date(), t = "sessionkey" + e.getFullYear() + e.getMonth();
        return wx.getStorageSync(t) || "";
    },
    clearSessionKey: function() {
        wx.setStorageSync("sessionkey", "");
    },
    getshareid: function() {
        return wx.getStorageSync("shareid") || 0;
    },
    setshareid: function(e) {
        return wx.setStorageSync("shareid", e);
    },
    getuserid: function() {
        return wx.getStorageSync("userid") || 0;
    },
    setuserid: function(e) {
        return wx.setStorageSync("userid", e);
    },
    getstatus: function() {
        return wx.getStorageSync("status") || 0;
    },
    setstatus: function(e) {
        return wx.setStorageSync("status", e);
    },
    getScreenPar: function() {
        try {
            var e = wx.getSystemInfoSync();
            this.screen.width = e.windowWidth || 0, this.screen.height = e.windowHeight || 0, 
            this.device.terminal = e.model || 0, this.device.language = e.language || "", this.device.version = e.version || "", 
            this.device.system = e.system || "", this.device.platform = e.platform || "";
            var t = 750 / this.screen.width;
            this.screen.rpxheight = t * this.screen.height;
        } catch (e) {}
    },
    checkSession: function() {
        wx.checkSession({
            success: function() {},
            fail: function() {}
        });
    },
    getHttpData: function(t, s, n, i) {
        var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {}, a = this;
        wx.request({
            url: t,
            data: s || {},
            method: n,
            header: e({
                "App-Space": "B0CD0050CF0BF01B",
                "App-Type": "3",
                "App-Extra": "",
                "App-Uid": a.getuserid(),
                "Api-Version": "1",
                "content-type": "application/json",
                sessionkey: a.getSessionKey(),
                version: a.version
            }, o),
            success: function(e) {
                if (200 !== e.statusCode) return i(e.data, !1), void console.log(e);
                e.data.Message ? i(e.data, !1) : i(e.data, !0), 401 == e.data.code && (a.globalData.isLogin = !0);
            },
            fail: function(e) {
                console.warn("fail", e), i(null, !1);
            },
            complete: function(e) {}
        });
    },
    removekey: function() {},
    getuserinfo: function(e, t, n, i) {
        var o = this;
        e ? wx.login({
            success: function(e) {
                if (e.code) {
                    var a = e.code;
                    wx.getUserInfo({
                        success: function(e) {
                            console.log(e), s.userInfo = e.userInfo;
                            var r = {};
                            r.encryptedData = e.encryptedData, r.shareid = o.getshareid(), r.iv = e.iv, r.code = a, 
                            console.log("dataSource", r), o.getHttpData(o.app_login, r, "POST", function(e) {
                                var s = !0;
                                if (o.setuserid(e.userid), wx.setStorageSync("userinfo", "1"), o.setstatus(e.status), 
                                e.sessionKey) {
                                    var a = new Date(), r = "sessionkey" + a.getFullYear() + a.getMonth();
                                    wx.setStorageSync(r, e.sessionKey), o.globalData.isLogin = !1, i.setData({
                                        isLogin: !1
                                    });
                                } else o.globalData.isLogin = !0, i.setData({
                                    isLogin: !0
                                });
                                null != e.status && 0 == e.status && (s = !1, wx.redirectTo({
                                    url: "/pages/user/phone/phone?type=" + n
                                })), t(!0, s);
                            });
                        },
                        fail: function() {
                            wx.showToast({
                                title: "获取用户信息失败",
                                icon: "none",
                                mask: !0
                            });
                        }
                    });
                }
            }
        }) : wx.showToast({
            title: "获取用户信息失败",
            icon: "none",
            mask: !0
        });
    },
    addListener: function(e, t) {
        this.callback || (this.callback = new Array()), this.callback[e] = t;
    },
    setChangedData: function(e, t, s) {
        this.callback && this.callback[e] && this.callback[e](t, s);
    },
    onShow: function(e) {
        console.log(e), wx.setStorageSync("scence", e.scene);
        this.getSessionKey();
        console.log("初始化分享信息onShow", e), "1047" == e.scene || "1048" == e.scene ? e && e.query.scene ? this.setshareid(e.query.scene) : this.setshareid(0) : e && e.query.shareid ? this.setshareid(e.query.shareid) : this.setshareid(0);
        var t = "{";
        t += '"terminal":"' + this.device.terminal + '",', t += '"version":"' + this.device.version + '",', 
        t += '"language":"' + this.device.language + '",', t += '"width":"' + this.screen.width + '",', 
        t += '"height":"' + this.screen.height + '",', t += '"system":"' + this.device.system + '",', 
        t += '"platform":"' + this.device.platform + '",', t += '"sessionkey":"' + this.getSessionKey() + '",', 
        e && (t += '"scent":"' + (e.scene || "") + '",', t += '"path":"' + (e.path || "") + '",');
        var s = this;
        s.getSessionKey() ? wx.checkSession({
            success: function() {
                console.log("不过期"), s.globalData.isLogin = !1;
            },
            fail: function() {
                console.log("过期"), s.globalData.isLogin = !0, wx.clearStorage();
            }
        }) : s.globalData.isLogin = !0, wx.getNetworkType({
            success: function(e) {},
            complete: function(e) {
                t += '"networktype":"' + (e.networkType || "") + '"', t += "}", s.getHttpData(s.domain + "/receive/clientinfo", t, "POST", function(e) {}), 
                console.log(111, t);
            }
        });
    },
    onError: function(e) {
        var t = "{";
        t += '"terminal":"' + this.device.terminal + '",', t += '"version":"' + this.device.version + '",', 
        t += '"language":"' + this.device.language + '",', t += '"width":"' + this.screen.width + '",', 
        t += '"height":"' + this.screen.height + '",', t += '"system":"' + this.device.system + '",', 
        t += '"platform":"' + this.device.platform + '",', t += '"message":' + e, t += "}", 
        this.getHttpData(this.domain + "/receive/errorinfo", t, "POST", function(e) {}), 
        console.log(e);
    },
    getUserInfo: function(e) {
        s.userInfo && "function" == typeof e && e(s.userInfo);
    },
    setUserInfo: function(e) {
        var t = this;
        s.userInfo ? s.userInfo = e : t.getUserInfo();
    },
    getTempNickName: function() {
        return s.tempnickname;
    },
    setTempNickName: function(e) {
        s.tempnickname = e;
    },
    clearTempNickName: function() {
        s.tempnickname = "";
    },
    getToName: function(e) {
        return e ? s.temptoname : s.toname;
    },
    setToName: function(e, t) {
        t ? s.temptoname = e : s.toname = e;
    },
    clearTempToName: function() {
        s.temptoname = "";
    },
    setWishes: function(e, t) {
        t ? s.tempwishes = e : s.wishes = e;
    },
    getWishes: function(e) {
        return e ? s.tempwishes : s.wishes;
    },
    clearWishes: function(e) {
        e ? s.tempwishes = "" : s.wishes = "";
    },
    setUserinfoData: function(e) {
        e && (s.userInfoData = e);
    },
    getUserinfoData: function() {
        return s.userInfoData;
    },
    updataUserInfo: function(e) {
        var t = this;
        t.getHttpData(t.myCenter_index, {}, "GET", function(s) {
            if (null == s) return !1;
            0 == s.userid ? t.removekey() : (t.setUserinfoData(s), e());
        });
    },
    globalData: {
        shareId: "0",
        isLogin: !0
    }
});