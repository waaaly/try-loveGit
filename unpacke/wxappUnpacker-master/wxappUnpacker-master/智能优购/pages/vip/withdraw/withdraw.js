var e = require("../../../75803BF22546F6CF13E653F5D7E4B753.js"), a = /^\d{6}$/, t = /^1\d{10}$/, o = getApp();

Page({
    data: {
        loadlayer: !0,
        canClick: !0,
        isRe: !1,
        str: "",
        money: "0",
        leastAmount: "",
        serviceFee: "",
        sec: 60,
        code: "",
        moneyInput: "",
        btntext: "获取验证码",
        isShow: !1,
        disabled: !1,
        phone: "",
        bankCode: "",
        bankname: "",
        cardNumber: "",
        realname: "",
        codeIs: !1,
        moneyIs: !1,
        realCardNumber: ""
    },
    sendCode: function() {
        var a = this;
        if (a.data.canClick) {
            a.setData({
                canClick: !1
            });
            var n = a.data.sec;
            if (console.log(!t.test(a.data.phone)), console.log(a.data.phone), !t.test(a.data.phone)) return wx.showToast({
                title: "您输入的手机号码有误",
                icon: "none"
            }), a.setData({
                canClick: !0
            }), !1;
            o.getHttpData(o.myCenter_userCodeSend, {
                type: 3,
                phone: a.data.phone
            }, "GET", function(t) {
                console.log("验证码发送", t), 200 == t.code ? (a.setData({
                    codeIs: !0
                }), wx.showToast({
                    title: "发送成功",
                    icon: "none"
                }), e.getCode(a, n)) : (a.setData({
                    canClick: !0
                }), t.msg && wx.showToast({
                    title: t.msg,
                    icon: "none"
                }));
            });
        }
    },
    goInformation: function() {
        wx.navigateTo({
            url: "/pages/vip/information/information?type=2"
        });
    },
    onShow: function() {
        this.loadIndex();
    },
    loadIndex: function() {
        var e = this, a = o.getUserinfoData();
        e.setData({
            userInfo: a
        }), console.log("用户信息", a);
        var t = a.cardBank, n = a.cardNumber, s = a.realname, i = a.bankCode, d = a.mobile;
        n && (e.setData({
            realCardNumber: n
        }), n = n.slice(-4));
        var c = t + "&nbsp;" + n + "&nbsp;(" + s + ")";
        e.setData({
            str: c,
            bankname: t,
            cardNumber: n,
            realname: s,
            bankCode: i,
            phone: d
        }), e.getMoney();
    },
    getMoney: function() {
        var e = this;
        o.getHttpData(o.vip_withdrawMoney, null, "GET", function(a) {
            console.log("获取领取金额", a), 200 == a.code ? e.setData({
                money: a.data.amount,
                leastAmount: a.data.leastAmount,
                serviceFee: a.data.serviceFee,
                loadlayer: !1
            }) : (e.setData({
                loadlayer: !1
            }), wx.showToast({
                title: "获取领取金额失败",
                icon: "none"
            }));
        });
    },
    getMoneyInput: function(e) {
        this.setData({
            moneyInput: e.detail.value
        });
    },
    getCode: function(e) {
        this.setData({
            code: e.detail.value
        });
    },
    setAllMoney: function() {
        var e = this;
        e.data.money >= e.data.leastAmount ? e.setData({
            moneyInput: 100 * parseInt(e.data.money / 100)
        }) : wx.showToast({
            title: "亲，最少领取金额为" + e.data.leastAmount + "元哦",
            icon: "none"
        });
    },
    withdraw: function() {
        var e = this;
        if (!e.data.isRe) return e.setData({
            isRe: !0
        }), e.data.moneyInput % 100 != 0 ? (wx.showToast({
            title: "领取劳务费只能是100的整数倍哟~",
            icon: "none"
        }), e.setData({
            isRe: !1
        }), !1) : a.test(e.data.code) ? (wx.showLoading({
            title: "提交中",
            mask: !0
        }), void o.getHttpData(o.vip_withdraw, {
            amout: e.data.moneyInput,
            bankCard: e.data.realCardNumber,
            bankCardAccount: e.data.realname,
            bankName: e.data.bankname,
            bankCode: e.data.bankCode,
            phone: e.data.phone,
            code: e.data.code
        }, "POST", function(a) {
            console.log("获取接口", a), wx.hideLoading(), 200 == a.code ? (wx.showToast({
                title: "提交成功",
                icon: "none",
                mask: !0,
                duration: 1500
            }), e.getMoney(), setTimeout(function() {
                e.setData({
                    isRe: !1
                }), wx.redirectTo({
                    url: "/pages/vip/withdrawRecord/withdrawRecord"
                });
            }, 1500)) : (e.setData({
                isRe: !1
            }), a.msg ? wx.showToast({
                title: a.msg,
                icon: "none"
            }) : wx.showToast({
                title: "提交失败",
                icon: "none"
            }));
        })) : (wx.showToast({
            title: "验证码格式不正确",
            icon: "none"
        }), e.setData({
            isRe: !1
        }), !1);
    }
});