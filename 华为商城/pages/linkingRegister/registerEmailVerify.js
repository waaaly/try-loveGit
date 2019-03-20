var e = getApp(), t = e.globalData.mp, n = e.globalData.config, a = require("../../plugins/xmldom/dom-parser"), o = {
    HmacSHA256: require("../../plugins/crypto-js/hmac-sha256.js"),
    enc: {
        Hex: require("../../plugins/crypto-js/enc-hex.js")
    }
};

Page({
    data: {
        mail: "",
        pwd: "",
        phone: "",
        smsCode: "",
        mail2: "",
        uuid: "",
        uuidEncode: "",
        getSMSText: "重新发送",
        getSMSClass: "upA"
    },
    onLoad: function(e) {
        var t = this, n = wx.getStorageSync("mail"), a = wx.getStorageSync("pwd"), o = wx.getStorageSync("phone"), r = wx.getStorageSync("upuuid"), s = wx.getStorageSync("uuidEncode"), c = wx.getStorageSync("smsCode"), i = "**" + n.substring(1);
        t.setData({
            mail: n,
            pwd: a,
            phone: o,
            smsCode: c,
            mail2: i,
            uuid: r,
            uuidEncode: s,
            getSMSText: "重新发送",
            getSMSClass: "upA"
        });
    },
    getMailAuthCode: function() {
        var e = this;
        if ("upA disabled" == e.data.getSMSClass) return !1;
        var o = "<GetActivateEMailURLReq><version>12011</version><accountType>1</accountType><userAccount>" + e.data.mail + "</userAccount><reqClientType>2025</reqClientType><email>" + e.data.mail + "</email><languageCode>zh-CN</languageCode></GetActivateEMailURLReq>";
        e.countDown(), t.mpPostForUP(n.service.upDomain + "/AccountServer/IUserInfoMng/getActivateEMailURL", o, {
            successFunc: function(e) {
                var t = new a.DOMParser().parseFromString(e.data).getElementsByTagName("result");
                "0" == (t.length > 0 ? t[0].getAttribute("resultCode") : "") && wx.showModal({
                    title: "提示",
                    content: "邮件已重新发送!",
                    showCancel: !1
                });
            }
        });
    },
    countDown: function(e) {
        var t = this;
        if ("upA disabled" == t.data.getSMSClass) return !1;
        var n = 60, a = setInterval(function() {
            if (0 == n) return t.setData({
                getSMSText: "重新发送",
                getSMSClass: "upA"
            }), clearInterval(a), a = null, !1;
            t.setData({
                getSMSText: "重新发送（" + n + "）",
                getSMSClass: "upA disabled"
            }), n--;
        }, 1e3);
    },
    toRegisterPassword: function() {
        var e = this;
        "" != e.data.mail && "" != e.data.pwd && e.loginHWAccount();
    },
    toRegisterEnd: function() {
        wx.showModal({
            title: "提示",
            content: "验证邮箱才能完成华为帐号注册，是否以后再验证邮箱地址？",
            success: function(e) {
                e.confirm && wx.switchTab({
                    url: "/pages/personal/personal"
                });
            }
        });
    },
    loginHWAccount: function() {
        var e = this, a = "acT=1&ac=" + e.data.mail + "&pw=" + e.data.pwd + "&dvT=6&dvID=" + e.data.uuid + "&tmT=unknown&clT=26&app=com.vmall.client&ver=12011&uuid=" + e.data.uuidEncode + "&dS=0";
        t.mpPostForUP(n.service.upDomain + "/AccountServer/IUserInfoMng/loginV2", a, {
            successFunc: function(n) {
                var a = t.urlParamToObject(n.data);
                if (a.cookie = n.header["Set-Cookie"] || n.header["set-cookie"], "0" == a.resultCode) e.bindHWAccount(a); else {
                    var o = "帐号绑定失败请重试!";
                    "70002071" == a.resultCode && (o = "帐号还未激活，请先去邮箱激活"), wx.showModal({
                        title: "提示",
                        content: o,
                        showCancel: !1
                    });
                }
            }
        }, {
            "content-type": "application/x-www-form-urlencoded;charset=utf-8"
        });
    },
    bindHWAccount: function(e) {
        var r = this, s = "<BindThird2AcctReq><version>12011</version><userID>" + e.userID + "</userID><reqClientType>2025</reqClientType><accountType>22</accountType><userAccount>" + wx.getStorageSync("thirdOpenID") + "</userAccount><thirdAccessToken>" + wx.getStorageSync("thirdAccessToken") + "</thirdAccessToken><thirdOpenID>" + wx.getStorageSync("thirdOpenID") + "</thirdOpenID><password>" + r.data.pwd + "</password></BindThird2AcctReq>", c = t.mpFormatTime(new Date()) + ":" + t.getRandom(999999999, 1e8), i = e.TGC, u = c + ":bindThird2Acct", d = o.HmacSHA256(u, i).toString(o.enc.Hex).toUpperCase();
        t.mpPostForUP(n.service.upDomain + "/AccountServer/IUserInfoMng/bindThird2Acct", s, {
            successFunc: function(e) {
                var o = new a.DOMParser().parseFromString(e.data), r = o.getElementsByTagName("userID").length > 0 ? o.getElementsByTagName("userID")[0].firstChild.nodeValue : "";
                if ("0" == o.getElementsByTagName("result")[0].getAttribute("resultCode")) {
                    t.mpGet(n.service.openApiDomain + "/mcp/account/mpBindUpAccount", {
                        mpUid: r
                    }, {
                        successFunc: function(e) {}
                    });
                    var s = t.mpGetIndexByPages(getCurrentPages());
                    wx.showModal({
                        title: "提示",
                        content: "帐号绑定成功!",
                        success: function(e) {
                            e.confirm && (wx.setStorageSync("needReLoad", !0), "personal" == s.flag ? wx.switchTab({
                                url: "/pages/personal/personal"
                            }) : "orderConfirm" != s.flag && "IntegrationCenter" != s.flag && "inviteGift" != s.flag || wx.navigateBack({
                                delta: getCurrentPages().length - 1 - s.index
                            }));
                        }
                    });
                } else wx.showModal({
                    title: "提示",
                    content: "绑定失败，请稍后重试",
                    showCancel: !1
                });
            }
        }, {
            Authorization: "user=" + e.userID + ",nonce=" + c + ",response=" + d,
            Cookie: e.cookie.split(";")[0]
        });
    }
});