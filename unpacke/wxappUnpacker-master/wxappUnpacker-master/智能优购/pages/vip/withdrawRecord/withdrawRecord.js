var a = getApp();

Page({
    data: {
        isEnd: !1,
        isLoading: !1,
        withdrawData: "",
        withdrawDataList: [],
        nextPage: 1,
        totalCount: "",
        loadIsEnd: !1,
        isLoad: !1,
        loadlayer: !0,
        totalAmount: ""
    },
    goWithdrawDetails: function(a) {
        console.log(a), wx.navigateTo({
            url: "/pages/vip/WithdrawDetails/WithdrawDetails?amout=" + a.currentTarget.dataset.detail.amout + "&state=" + a.currentTarget.dataset.detail.state + "&sysCreateTime=" + a.currentTarget.dataset.detail.sysCreateTime + "&bankName=" + a.currentTarget.dataset.detail.bankName + "&bankCard=" + a.currentTarget.dataset.detail.bankCard + "&serviceAmount=" + a.currentTarget.dataset.detail.serviceAmount + "&stateDisplay=" + a.currentTarget.dataset.detail.stateDisplay
        });
    },
    getWithdrawRecordData: function() {
        var t = this;
        if (console.log(t.data.isLoad), !t.data.isLoad || !t.data.isEnd) {
            t.setData({
                isLoading: !0
            }), t.setData({
                isLoad: !0,
                isLoading: !0
            });
            var e = {
                pageNum: t.data.nextPage,
                pageSize: 20
            };
            a.getHttpData(a.vip_withdrawRecord, e, "GET", function(a) {
                console.log("领取记录信息", a), t.setData({
                    isLoading: !1
                }), wx.stopPullDownRefresh(), 200 == a.code ? (a.data.length < 20 ? (console.log("进来1"), 
                a.data.length, 1 == t.data.nextPage && t.setData({
                    totalAmount: a.totalAmount
                }), t.setData({
                    isLoad: !0,
                    isEnd: !0,
                    withdrawDataList: t.data.withdrawDataList.concat(a.data)
                })) : (1 == t.data.nextPage && t.setData({
                    totalAmount: a.totalAmount
                }), t.setData({
                    isLoad: !1,
                    withdrawDataList: t.data.withdrawDataList.concat(a.data),
                    nextPage: t.data.nextPage + 1
                })), t.setData({
                    loadlayer: !1
                })) : (t.setData({
                    loadlayer: !1,
                    isLoading: !1
                }), wx.showToast({
                    title: "获取信息失败",
                    icon: "none"
                }));
            });
        }
    },
    onShow: function() {
        this.indexData();
    },
    indexData: function() {
        var a = this;
        a.setData({
            nextPage: 1,
            isLoad: !1,
            isEnd: !1,
            withdrawDataList: []
        }), a.getWithdrawRecordData();
    },
    onReachBottom: function() {
        this.getWithdrawRecordData();
    },
    onPullDownRefresh: function() {
        this.indexData();
    }
});