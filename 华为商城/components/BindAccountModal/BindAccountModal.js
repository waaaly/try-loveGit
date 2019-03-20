var e = getApp(), t = e.globalData.mp, o = e.globalData.config, a = require("../../plugins/xmldom/dom-parser");

Component({
    properties: {
        showFlag: {
            type: Boolean,
            value: !1
        },
        accountName: {
            type: Array,
            value: []
        },
        loginCookie: {
            type: String,
            value: ""
        }
    },
    data: {
        getSMSText: "获取验证码",
        getSMSClass: "upA",
        secondAuthTypeIndex: 0,
        secondAuthCode: "",
        toastState: !1,
        toastCont: ""
    },
    methods: {
        bindAuthTypePickerChange: function(e) {
            this.setData({
                secondAuthTypeIndex: e.detail.value
            });
        },
        setSecondAuthCode: function(e) {
            this.setData({
                secondAuthCode: e.detail.value
            });
        },
        getSecondAuthCode: function() {
            var e = this;
            if ("upA disabled" == e.data.getSMSClass) return !1;
            var n = e.data.accountName[e.data.secondAuthTypeIndex], s = t.strToHexCharCode(wx.getStorageSync("unionId") || "");
            if (-1 == n.indexOf("@")) {
                var r = '<?xml version="1.0" encoding="UTF-8"?><SMSAuthCodeReq><version>12011</version><mobilePhone>' + n + "</mobilePhone><smsReqType>6</smsReqType><languageCode>zh-CN</languageCode><reqClientType>26</reqClientType><accountType>22</accountType><userAccount>" + s + "</userAccount></SMSAuthCodeReq>";
                t.mpPostForUP(o.service.upDomain + "/AccountServer/IUserInfoMng/getSMSCodeAfterAuth", r, {
                    successFunc: function(t) {
                        var o = new a.DOMParser().parseFromString(t.data).getElementsByTagName("result");
                        if ("0" == (o.length > 0 ? o[0].getAttribute("resultCode") : "")) e.countDown(); else {
                            wx.showModal({
                                title: "提示",
                                content: "验证码发送失败请重试!",
                                showCancel: !1
                            });
                        }
                    }
                }, {
                    Cookie: e.data.loginCookie.split(";")[0]
                });
            } else {
                var i = '<?xml version="1.0" encoding="UTF-8"?><GetEMailAuthCodeReq><version>12011</version><email>' + n + "</email><emailReqType>6</emailReqType><languageCode>zh-CN</languageCode><reqClientType>26</reqClientType><accountType>22</accountType><userAccount>" + s + "</userAccount></GetEMailAuthCodeReq>";
                t.mpPostForUP(o.service.upDomain + "/AccountServer/IUserInfoMng/getEMailCodeAfterAuth", i, {
                    successFunc: function(t) {
                        var o = new a.DOMParser().parseFromString(t.data).getElementsByTagName("result");
                        if ("0" == (o.length > 0 ? o[0].getAttribute("resultCode") : "")) e.countDown(); else {
                            wx.showModal({
                                title: "提示",
                                content: "验证码发送失败请重试!",
                                showCancel: !1
                            });
                        }
                    }
                }, {
                    Cookie: e.data.loginCookie.split(";")[0]
                });
            }
        },
        countDown: function(e) {
            var t = this;
            if ("upA disabled" == t.data.getSMSClass) return !1;
            var o = 60, a = setInterval(function() {
                if (0 == o) return t.setData({
                    getSMSText: "获取验证码",
                    getSMSClass: "upA"
                }), clearInterval(a), a = null, !1;
                t.setData({
                    getSMSText: "获取验证码（" + o + "）",
                    getSMSClass: "upA disabled"
                }), o--;
            }, 1e3);
        },
        closeSecondAuthDialog: function() {
            this.setData({
                showFlag: !1
            });
        },
        secondUserThirdAuthV2: function(e) {
            var o = this;
            if (t.repeatTap.stop(o, e, 2e3)) return !1;
            var a = o.data.secondAuthCode;
            if ("" == a) return o.setData({
                toastState: !0,
                toastCont: "验证码不能为空"
            }), setTimeout(function() {
                o.setData({
                    toastState: !1
                });
            }, 3e3), !1;
            o.triggerEvent("nextStep", {
                secondAuthCode: a
            });
        }
    }
});