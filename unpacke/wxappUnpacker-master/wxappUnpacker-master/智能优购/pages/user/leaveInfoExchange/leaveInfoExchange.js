var a = require("../../../75803BF22546F6CF13E653F5D7E4B753.js"), t = /^1\d{10}$/, e = getApp();

Page({
    data: {
        isChange: !0,
        canClick: !0,
        dataset: [],
        dataArr: [],
        integral: "",
        phone: "",
        vali_code: "",
        prevData: {},
        rateNumS: "0.00",
        code: "",
        sec: "60",
        isShow: !1
    },
    onLoad: function() {
        var a = this, t = getCurrentPages(), o = t[t.length - 2].data.dataset;
        console.log(o), this.setData({
            mobile: o
        }), this.kongge_string(o.mobile), a.setData({
            prevData: o
        }), new e.WeToast(), this.loadData();
    },
    onInput: function(a) {
        var t = a.detail.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"), e = a.currentTarget.dataset.val, o = this.data;
        if (o[e] = t, this.setData(o), "integral" == e) {
            var n = (0 == o.dataArr.rateNum ? t : t / o.dataArr.rateNum).toFixed(3);
            console.log(n.substring(0, n.lastIndexOf(".") + 3)), this.setData({
                numbers: t,
                rateNumS: n.substring(0, n.lastIndexOf(".") + 3)
            });
        }
    },
    loadData: function() {
        var a = this;
        e.getHttpData(e.app_wallet_integral_exchangeData, null, "GET", function(t) {
            console.log("数贝Data", t), a.setData({
                dataArr: t.data
            });
        });
    },
    wholeClick: function() {
        console.log(123);
        var a = this.data.dataArr, t = (0 == a.arrrateNum ? a.total : a.total / a.rateNum).toFixed(3);
        this.setData({
            numbers: a.total,
            rateNumS: t.substring(0, t.lastIndexOf(".") + 3)
        });
    },
    getCode: function(a) {
        this.setData({
            code: a.detail.value
        });
    },
    changeClick: function() {
        var a = this;
        if (a.data.isChange) {
            a.setData({
                isChange: !1
            }), console.log(a.data.dataArr.total), console.log(a.data.phone), console.log(a.data.code), 
            console.log(a.data.numbers);
            var o = a.data.dataArr.minExchangeNum;
            if (a.data.numbers < o || "" == a.data.numbers || null == a.data.numbers) return wx.showToast({
                title: "兑换的数贝不能低于" + o,
                duration: 2e3,
                icon: "none",
                mask: !0
            }), a.setData({
                isChange: !0
            }), !1;
            if (!t.test(a.data.phone.replace(/[ ]/g, ""))) return console.log("手机号不合法"), wx.showToast({
                title: "您输入的手机号码有误",
                icon: "none",
                duration: 2e3
            }), a.setData({
                isShow: !1
            }), a.setData({
                isChange: !0
            }), !1;
            if (a.data.dataArr.total < a.data.numbers) return wx.showToast({
                title: "兑换数贝不能超过" + a.data.dataArr.total,
                duration: 2e3,
                icon: "none",
                mask: !0
            }), a.setData({
                isChange: !0
            }), !1;
            if (6 != a.data.code.length) return wx.showToast({
                title: "验证码错误",
                duration: 2e3,
                icon: "none",
                mask: !0
            }), a.setData({
                isChange: !0
            }), !1;
            var n = {
                mobile: a.data.phone.replace(/[ ]/g, ""),
                code: a.data.code,
                convertScore: a.data.numbers
            };
            wx.showLoading({
                title: "兑换中",
                mask: !0
            }), e.getHttpData(e.app_wallet_integral_exchange, n, "POST", function(t) {
                wx.hideLoading(), console.log("立刻兑换", t), 200 == t.code ? (wx.showModal({
                    title: "提示",
                    showCancel: !1,
                    content: t.msg,
                    success: function(a) {
                        a.confirm ? wx.navigateTo({
                            url: "/pages/user/cash/cash"
                        }) : a.cancel;
                    }
                }), a.setData({
                    isChange: !0
                })) : 400 == t.code ? (a.setData({
                    isChange: !0
                }), wx.navigateTo({
                    url: "/pages/user/IETTips/IETTips"
                })) : 500 == t.code ? (a.setData({
                    isChange: !0
                }), wx.showModal({
                    title: "提示",
                    showCancel: !1,
                    content: t.msg,
                    success: function(a) {
                        a.confirm ? wx.navigateBack({
                            delta: 1
                        }) : a.cancel;
                    }
                })) : (a.setData({
                    isChange: !0
                }), wx.showToast({
                    title: t.msg,
                    duration: 2e3,
                    icon: "none",
                    mask: !0
                }));
            });
        }
    },
    kongge_string: function(a) {
        for (var t = a.replace(/\s*/g, ""), e = [], o = 0; o < t.length; o++) 3 == o || 7 == o ? e.push(" " + t.charAt(o)) : e.push(t.charAt(o));
        t = e.join(""), this.setData({
            phone: t
        });
    },
    sendCode: function() {
        var o = this;
        if (o.data.canClick) {
            o.setData({
                canClick: !1
            });
            var n = o.data.sec;
            if (console.log(!t.test(o.data.phone)), console.log(o.data.phone), !t.test(o.data.phone.replace(/[ ]/g, ""))) return console.log("手机号不合法"), 
            o.wetoast.toast({
                title: "您输入的手机号码有误",
                duration: 2e3
            }), o.setData({
                canClick: !0
            }), !1;
            e.getHttpData(e.myCenter_userCodeSend, {
                type: 1,
                phone: o.data.phone.replace(/[ ]/g, "")
            }, "GET", function(t) {
                console.log("验证码发送", t), 200 == t.code ? (o.wetoast.toast({
                    title: "发送成功",
                    duration: 2e3
                }), console.log(o, n), a.getCode(o, n)) : (o.setData({
                    canClick: !0
                }), t.msg && o.wetoast.toast({
                    title: t.msg,
                    duration: 2e3
                }));
            });
        }
    }
});