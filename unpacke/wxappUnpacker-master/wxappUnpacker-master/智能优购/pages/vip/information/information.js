var a = require("../../../1AE77A212546F6CF7C811226C5D4B753.js"), e = /^[0-9]{13,19}$/, t = getApp();

Page({
    data: {
        isChangeBank: !1,
        loadlayer: !0,
        userInfo: "",
        index: "",
        choseIndex: "",
        btntext: "获取验证码",
        disabled: !1,
        bankcode: "",
        type: "",
        banks: "",
        bankNumber: "",
        bankname: "",
        userName: ""
    },
    onLoad: function(a) {
        var e = this;
        a.type && e.setData({
            type: a.type
        });
    },
    getBankNumber: function(a) {
        this.setData({
            bankNumber: a.detail.value
        });
    },
    sendCode: function() {
        var a = this;
        console.log(111);
        var e = 60;
        a.setData({
            btntext: "60s后重新发送"
        });
        var t = setInterval(function() {
            a.setData({
                btntext: --e + "s后重新获取"
            }), -1 == e && (clearInterval(t), a.setData({
                btntext: "获取验证码",
                disabled: !1
            }));
        }, 1e3);
    },
    goWithdraw: function() {
        var a = this, t = a.data.bankNumber, n = a.data.bankname;
        a.data.userName;
        console.log(n), console.log(0 == n.length), 0 == n.length ? wx.showToast({
            title: "请选择银行名称",
            icon: "none"
        }) : e.test(a.data.bankNumber) ? a.validateCard(t, n, function() {
            a.submit();
        }) : wx.showToast({
            title: "银行卡号格式有误",
            icon: "none"
        });
    },
    validateCard: function(e, t, n) {
        var o = "https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?cardNo=" + e + "&cardBinCheck=true";
        wx.request({
            url: o,
            method: "GET",
            success: function(e) {
                console.log("[info] in validateCard, res is ", e);
                try {
                    var o = e.data;
                    if (!1 === o.validated) wx.showToast({
                        title: "请输入有效的银行卡号",
                        icon: "none"
                    }); else {
                        var s = a[o.bank];
                        console.log("[info] in validateCard, name is ", s), -1 === s.indexOf(t) ? wx.showToast({
                            title: "您输入的银行卡号属于" + s + "，与您选择的银行不符",
                            icon: "none",
                            duration: 3e3
                        }) : n();
                    }
                } catch (a) {
                    console.error(a), n();
                }
            },
            fail: function(a) {
                console.error(a), n();
            }
        });
    },
    submit: function() {
        var a = this;
        wx.showLoading({
            title: "信息提交中",
            mask: !0
        }), t.getHttpData(t.vip_withdrawInfo, {
            cardNumber: a.data.bankNumber,
            cardBank: a.data.bankname,
            bankCode: a.data.bankcode,
            bankCardAccount: a.data.userName
        }, "PUT", function(e) {
            if (console.log("银行列表", e), 200 == e.code) {
                var n = t.getUserinfoData();
                n.cardNumber = a.data.bankNumber, n.cardBank = a.data.bankname, n.bankCode = a.data.bankcode, 
                t.setUserinfoData(n), wx.showToast({
                    title: "提交成功",
                    icon: "none",
                    mask: !0,
                    duration: 2e3
                }), setTimeout(function() {
                    1 == a.data.type ? wx.redirectTo({
                        url: "/pages/vip/withdraw/withdraw"
                    }) : wx.navigateBack({
                        delta: 1
                    });
                }, 2e3);
            } else wx.showToast({
                title: "信息提交失败，请重新尝试",
                icon: "none",
                duration: 2e3
            });
        });
    },
    showBanks: function() {
        wx.navigateTo({
            url: "/pages/vip/bankList/bankList?bankcode=" + this.data.bankcode
        });
    },
    onShow: function() {
        var a = this, e = t.getUserinfoData();
        2 != a.data.type || a.data.isChangeBank ? 1 == a.data.type ? a.setData({
            userInfo: e,
            userName: e.realname,
            loadlayer: !1
        }) : a.setData({
            loadlayer: !1
        }) : e && (console.log(e), a.setData({
            userInfo: e,
            userName: e.realname,
            bankname: e.cardBank,
            bankNumber: e.cardNumber,
            bankcode: e.bankCode,
            loadlayer: !1
        }));
    },
    updatePersonal: function() {
        t.getUserinfoData().realname;
    }
});