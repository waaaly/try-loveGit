var t = getApp();

Page({
    data: {
        dataset: {},
        inputvalue: "",
        charge: 0,
        rate: 0
    },
    chargeEvent: function(t) {
        var a = t.detail.value, e = this.accMul(a, this.data.rate);
        this.setData({
            charge: e
        });
    },
    accMul: function(t, a) {
        var e = 0, n = t.toString(), o = a.toString();
        try {
            e += n.split(".")[1].length;
        } catch (t) {}
        try {
            e += o.split(".")[1].length;
        } catch (t) {}
        return Number(n.replace(".", "")) * Number(o.replace(".", "")) / Math.pow(10, e);
    },
    goCard: function() {
        wx.navigateTo({
            url: "/pages/user/ycard/ycard"
        });
    },
    bindDuiHuanTap: function(a) {
        var e = this;
        if ("False" != e.data.dataset.checkresult) {
            var n = a.detail.value.grt;
            "" != n ? n < this.data.investment ? this.wetoast.toast({
                title: "兑换金额小于最低额度",
                duration: 2e3
            }) : n % this.data.baseAmount == 0 ? t.getHttpData(t.domain + "/rebate/AddRebate?applyAmount=" + n, null, "GET", function(t, a) {
                "ok" == t.result && (e.wetoast.toast({
                    title: "操作成功",
                    duration: 2e3
                }), e.onLoad(), e.setData({
                    inputvalue: "",
                    charge: 0
                })), "ok" != t.result && e.wetoast.toast({
                    title: t.error,
                    duration: 2e3
                });
            }) : this.wetoast.toast({
                title: "请按规则输入金额",
                duration: 2e3
            }) : this.wetoast.toast({
                title: "请输入兑换金额",
                duration: 2e3
            });
        } else wx.navigateTo({
            url: "/pages/user/ycard/ycard"
        });
    },
    loadData: function() {
        var a = this;
        t.getHttpData(t.domain + "/rebate/GetUserWallet", null, "GET", function(t, e) {
            a.setData({
                dataset: t
            }), console.log(t);
        }), t.getHttpData(t.domain + "/rebate/GetRebateBaseInfo", null, "GET", function(t, e) {
            a.setData({
                baseAmount: t.baseAmount,
                investment: t.investment,
                rate: t.rate
            }), console.log(t);
        });
    },
    onLoad: function(a) {
        new t.WeToast(), this.loadData();
    },
    onShow: function() {
        new t.WeToast(), this.loadData();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});