var t = getApp(), a = t.globalData.mp, e = t.globalData.config, o = [], s = "", i = function(i) {
    wx.showLoading({
        mask: !0,
        title: "加载中..."
    }), a.mpGet(e.service.openApiDomain + "/mcp/queryUserOrderList", {
        pageNo: i.data.pageNo,
        pageSize: i.data.pageSize,
        isLiveFlag: i.data.isLiveFlag,
        dataType: 0,
        orderSourceList: 18
    }, {
        successFunc: function(a) {
            if (a.data.success) {
                var a = a.data, e = {
                    1: "待处理",
                    2: "待审核(保留未用)",
                    3: "审核通过",
                    4: "审核未通过(保留未用)",
                    5: "待发货(全部出库)",
                    6: "已发货",
                    7: "已完成",
                    8: "已取消",
                    9: "正在出库",
                    10: "部分出库",
                    11: "部分发货完成",
                    12: "关闭支付",
                    13: "已取消且已退款",
                    14: "用户拒收",
                    15: "物流丢单",
                    16: "取消处理中",
                    17: "修改处理中"
                }, r = {
                    1: "已支付",
                    2: "未支付",
                    3: "部分支付",
                    4: "处理中"
                };
                if ((o = o.concat(a.userOrderList)).length <= 10 && i.setData({
                    userOrderList: []
                }), null != a.userOrderList && a.userOrderList.length > 0) {
                    if (2 == t.globalData.userLoginStatus && i.setData({
                        isShowText: !0
                    }), i.setData({
                        userOrderList: o
                    }), a.userOrderList.forEach(function(t, a) {
                        if (1 != t.orderStatus && 3 != t.orderStatus && 4 != t.orderStatus || "3" == t.orderType || "2" == t.paymentStatus && (t.goPay = !0, 
                        t.gologistic = !1, s = t.orderCode, t.cash = t.cashPay), "1" != t.paymentStatus || "6" != t.orderStatus && "7" != t.orderStatus && "14" != t.orderStatus || "14" == t.orderType || "28" == t.orderType || "24" == t.orderType || (t.goPay = !1, 
                        t.gologistic = !0), "18" == t.orderType && t.promoDepositSku) {
                            if (t.promoDepositSku.balanceStartTime && t.promoDepositSku.balanceEndTime) {
                                var e = t.promoDepositSku.balanceStartTime.split("+")[0], o = t.promoDepositSku.balanceEndTime.split("+")[0];
                                t.promoDepositSku.balanceStartTime = e.substr(2, e.length - 5), t.promoDepositSku.balanceEndTime = o.substr(2, e.length - 5), 
                                t.promoDepositSku.depositPayStatus && "1" == t.promoDepositSku.depositPayStatus && "3" == t.paymentStatus ? t.showBalanceTime = !0 : t.showBalanceTime = !1;
                            } else t.showBalanceTime = !1;
                            "2" != t.promoDepositSku.depositPayStatus || 1 != t.orderStatus && 3 != t.orderStatus && 4 != t.orderStatus ? t.showPayDeposit = !1 : (t.showPayDeposit = !0, 
                            t.deposit = t.promoDepositSku.depositPrice), "2" != t.couldPayBalancePrice && ("1" != t.couldPayBalancePrice || "1" != t.cashOrderStatus) || "1" != t.promoDepositSku.depositPayStatus || 1 != t.orderStatus && 3 != t.orderStatus && 4 != t.orderStatus ? t.showDisBalance = !1 : t.showDisBalance = !0, 
                            "1" != t.couldPayBalancePrice || "2" != t.cashOrderStatus || "1" == t.paymentStatus || "1" != t.promoDepositSku.depositPayStatus || 1 != t.orderStatus && 3 != t.orderStatus && 4 != t.orderStatus ? t.showBalance = !1 : (t.showBalance = !0, 
                            t.balance = t.promoDepositSku.balancePrice);
                        }
                    }), 10 == a.pageSize) {
                        var n = Math.ceil(a.totalCount / a.pageSize);
                        i.setData({
                            totalPage: n
                        });
                    } else i.setData({
                        totalList: !0
                    });
                    "1" == i.data.isLiveFlag && "0" == a.isLiveFlag && i.setdata({
                        pageNo: 0
                    }), 0 == a.totalCount && (totalPage = 0), i.setData({
                        isLiveFlag: a.isLiveFlag
                    }), o.forEach(function(t, a) {
                        for (var o in e) t.orderStatus == o && (t.orderStatusStr = e[o]);
                        for (var s in r) t.paymentStatus == s && (t.paymentStatusStr = r[s]);
                        t.orderTime = t.orderTime.split("+")[0];
                    });
                } else i.setData({
                    showList: !1
                });
                i.setData({
                    totalCount: a.totalCount,
                    userOrderList: o,
                    pageSize: a.pageSize
                }), wx.hideLoading();
            } else wx.hideLoading(), wx.showToast({
                title: "订单列表获取失败!",
                icon: "none"
            });
        },
        failFunc: function() {
            wx.hideLoading(), wx.showToast({
                title: "订单列表获取失败!",
                icon: "none"
            });
        }
    });
};

Page({
    data: {
        orderList: [],
        showOrderOk: !1,
        pageSize: 10,
        pageNo: 1,
        totalPage: 1,
        showList: !0,
        isLiveFlag: 1,
        totalList: !1,
        loadMore: !1,
        userOrderList: [],
        toastState: !1,
        toastCont: "自定义toast组件",
        isCreateClicked: !1,
        isShowText: !1
    },
    onLoad: function(t) {
        wx.hideShareMenu(), this.setData({
            cdnPath: e.service.cdnPath
        });
    },
    onShow: function() {
        var t = this;
        o = [], t.setData({
            pageSize: 10,
            pageNo: 1,
            totalPage: 1,
            showList: !0
        }), i(t);
    },
    onHide: function() {
        this.setData({
            totalList: !1,
            loadMore: !1
        });
    },
    onReachBottom: function() {
        if (this.data.pageNo == this.data.totalPage || this.data.pageSize < 10) return this.setData({
            loadMore: !1,
            totalList: !0
        }), !1;
        this.setData({
            pageNo: this.data.pageNo + 1,
            loadMore: !0,
            totalList: !1
        }), i(this);
    },
    goTobuy: function(e) {
        var o = this;
        if (o.data.isCreateClicked) return !1;
        o.setData({
            isCreateClicked: !0
        }), setTimeout(function() {
            o.setData({
                isCreateClicked: !1
            });
        }, 3e3), a.mpGotoPayment(t, e.currentTarget.dataset.code, e.currentTarget.dataset.cashpay);
    },
    onUnload: function() {
        o = [];
    }
});