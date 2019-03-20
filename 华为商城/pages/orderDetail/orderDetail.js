var e = getApp(), t = e.globalData.mp, r = e.globalData.config, a = "", o = function(e, a) {
    wx.showLoading({
        title: "加载中...",
        mask: !0
    }), t.mpGet(r.service.openApiDomain + "/mcp/queryUserOrderDetail", {
        orderCode: e
    }, {
        successFunc: function(e) {
            a.setData({
                showcontent: !0
            });
            if (50012 == e.data.resultCode && a.setData({
                toastOptions: {
                    title: "抱歉，该订单不存在！",
                    duration: 1500
                }
            }), e.data.success) {
                var r = e.data, o = {
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
                }, d = {
                    0: "不开发票",
                    1: "纸质普通发票",
                    2: "保留（不启用）",
                    3: "增值税专票",
                    50: "电子普通发票",
                    51: "电子增值税专票（不启用)"
                }, s = {
                    1: "已全部支付",
                    2: "未支付",
                    3: "已支付部分",
                    4: "处理中"
                }, n = {
                    1: "支付宝支付",
                    2: "银行卡支付",
                    3: "货到付款",
                    4: "售后换货",
                    5: "快捷支付",
                    7: "财付通",
                    9: "线下支付",
                    13: "PAYPAL",
                    17: "微信支付",
                    50: "预付款",
                    52: "马来M2E",
                    53: "马来FPX",
                    54: "马来FPXE",
                    55: "融资支付RZ",
                    56: "GLOBALPAY",
                    66: "代金券（余额支付）",
                    67: "微信SDK支付",
                    68: "阿联酋(CBRSRC)",
                    69: "沙特(CBRSRC)",
                    70: "印度(NET_BANK)",
                    71: "美国(CBRSRC)"
                }, l = {
                    1: "已支付",
                    2: "待支付"
                };
                if (r.orderDetails && r.orderDetails.orderDetailInfo && r.orderDetails.orderDetailInfo.orderType && a.setData({
                    orderMold: r.orderDetails.orderDetailInfo.orderType
                }), r.orderDetails && r.orderDetails.orderDetailInfo && r.orderDetails.orderDetailInfo.paymentStatus && r.orderDetails.orderDetailInfo.orderStatus) if (t.mpIsEmpty(r.cutdownTime) || "1" == r.orderDetails.orderDetailInfo.paymentStatus || "3" == r.orderDetails.orderDetailInfo.paymentStatus || 7 == r.orderDetails.orderDetailInfo.orderStatus || 8 == r.orderDetails.orderDetailInfo.orderStatus || 12 == r.orderDetails.orderDetailInfo.orderStatus || 3 == r.orderDetails.orderDetailInfo.orderType) a.setData({
                    showCurrentTime: !1
                }); else {
                    var c = r.cutdownTime;
                    i(c, a) ? (c -= 1e3, a.setData({
                        showCurrentTime: !0
                    })) : a.setData({
                        showCurrentTime: !1
                    }), a.data.orderdetailtimer = setInterval(function() {
                        i(c, a) ? c -= 1e3 : (a.setData({
                            showCurrentTime: !1
                        }), clearInterval(a.data.orderdetailtimer));
                    }, 1e3), i(c, a);
                }
                if (r.orderDetails && r.orderDetails.orderDetailInfo && r.orderDetails.orderDeliveryAddress) {
                    var D = r.orderDetails.orderDetailInfo, p = r.orderDetails.orderDeliveryAddress, u = r.orderDetails.orderDeliveryAddress.consignee, f = r.orderDetails.orderDeliveryAddress.mobile, y = r.orderDetails.orderDeliveryAddress.address, m = r.orderDetails.orderDeliveryAddress.province, h = r.orderDetails.orderDeliveryAddress.district, I = r.orderDetails.orderDeliveryAddress.city, S = r.orderDetails.orderDeliveryAddress.street, v = r.orderDetails.orderDetailInfo.cashPay.toFixed(2), T = r.orderDetails.orderDetailInfo.totalOriginalPrice.toFixed(2), C = r.orderDetails.orderDetailInfo.deliveryFee.toFixed(2), g = r.orderDetails.orderDetailInfo.discount.toFixed(2), P = r.orderDetails.orderDetailInfo.pointPay ? r.orderDetails.orderDetailInfo.pointPay.toFixed(2) : 0, w = r.orderDetails.orderDetailInfo.couponDeduct.toFixed(2), b = (parseFloat(g) + parseFloat(w) + parseFloat(P)).toFixed(2);
                    if (a.setData({
                        cashPay: v,
                        deliveryFee: C,
                        discountMount: b,
                        shopName: r.shop.name,
                        shopTelephone: p.mobile,
                        provinceName: p.province,
                        cityName: p.city,
                        districtName: p.district,
                        streetName: p.street,
                        addressName: p.address,
                        totalOriginalPrice: T,
                        consignee: u,
                        mobile: f,
                        address: y,
                        province: m,
                        city: I,
                        district: h,
                        street: S
                    }), r.orderDetails.orderDetailInfo.attribute && a.setData({
                        businessHrs: JSON.parse(D.attribute).businessHours || ""
                    }), r.orderDetails.orderDetailInfo.promoDepositSku) {
                        var L = r.orderDetails.orderDetailInfo.promoDepositSku, O = r.orderDetails.orderDetailInfo.productList, x = L.depositPrice ? "¥" + L.depositPrice.toFixed(2) : "", k = L.balancePrice ? "¥" + L.balancePrice.toFixed(2) : "", F = l[L.depositPayStatus], A = l[L.balancePayStatus], E = r.orderDetails.orderDetailInfo.promoDepositSku.skuCode, M = L.depositPayTime ? "（" + L.depositPayTime.split(" ")[0] + "）" : "", R = L.balanceStartTime ? L.balanceStartTime.split("+")[0].substr(0, L.balanceStartTime.split("+")[0].length - 3) : "", N = L.balanceEndTime ? L.balanceEndTime.split("+")[0].substr(0, L.balanceEndTime.split("+")[0].length - 3) : "", U = L.couldPayBalancePrice;
                        "0" != L.isSurePrice && k || (O.forEach(function(e) {
                            e.skuCode == E && (e.balancePrice = "暂无报价");
                        }), k = "暂无报价"), a.setData({
                            isDepositShow: !0,
                            depositPrice: x,
                            productList: O,
                            depositStatus: F,
                            balanceStatus: A,
                            balancePrice: k,
                            balanceStartTime: R,
                            balanceEndTime: N,
                            depositPayTime: M,
                            couldPayBalancePrice: U
                        });
                    }
                    "999" == r.orderDetails.orderDeliveryAddress.deliveryMethod ? a.setData({
                        isDelivery: !1,
                        shopName: "门店自提"
                    }) : a.setData({
                        isDelivery: !0
                    });
                }
                if (r.orderDetails && r.orderDetails.orderOperatorLogs && r.orderDetails.orderOperatorLogs.length > 0) {
                    var B = r.orderDetails.orderOperatorLogs;
                    a.setData({
                        logisticsList: B
                    });
                }
                if (r.orderDetails && r.orderDetails.paymentList && r.orderDetails.paymentList.length > 0) {
                    var G = r.orderDetails.paymentList, Y = G.length;
                    a.setData({
                        paymentList: G,
                        paymentType: G[Y - 1].paymentType || ""
                    });
                }
                var H = r.orderDetails.orderDetailInfo.invoiceTitle, K = r.orderDetails.orderDetailInfo.orderCode, X = r.orderDetails.orderDetailInfo.orderType, q = r.orderDetails.orderDetailInfo.productList, J = r.orderDetails.orderDetailInfo, Z = "", _ = "";
                if (r.carrierInvoice && r.carrierInvoice.encryptElectronicUrl && (Z = encodeURIComponent(r.carrierInvoice.encryptElectronicUrl)), 
                r.carrierInvoice && r.carrierInvoice.encryptPicUrl && (_ = encodeURIComponent(r.carrierInvoice.encryptPicUrl)), 
                a.setData({
                    invoiceTitle: H,
                    orderCode: K,
                    orderType: X,
                    productList: q,
                    encryptElectronicUrl: Z,
                    encryptPicUrl: _,
                    orderDetailInfo: r.orderDetails.orderDetailInfo,
                    orderStatusData: r.orderDetails.orderDetailInfo.orderStatus
                }), 3 != a.data.orderType && (a.data.orderStatusData <= 3 || 9 == a.data.orderStatusData) && (14 != a.data.orderType || 14 == a.data.orderType && 2 == a.data.paymentType) && 24 != a.data.orderType && a.setData({
                    showCancelOrder: !0
                }), (r.orderDetails.orderDetailInfo.orderType && 33 == r.orderDetails.orderDetailInfo.orderType && r.orderDetails.orderDetailInfo.paymentStatus && 1 == r.orderDetails.orderDetailInfo.paymentStatus && r.orderDetails.orderDetailInfo.orderStatus && 1 == r.orderDetails.orderDetailInfo.orderStatus || r.orderDetails.orderDetailInfo.orderType && 39 == r.orderDetails.orderDetailInfo.orderType && r.orderDetails.orderDetailInfo.orderStatus && 1 == r.orderDetails.orderDetailInfo.orderStatus && r.orderDetails.orderDetailInfo.paymentStatus && 1 == r.orderDetails.orderDetailInfo.paymentStatus) && a.setData({
                    showCancelOrder: !1
                }), a.data.logisticsList.length > 0) {
                    var j = a.data.logisticsList.map(function(e) {
                        return e.time = e.disposeTime ? e.disposeTime.split("+")[0] : "", e;
                    }).reverse();
                    a.setData({
                        logisticsList: j
                    });
                }
                a.setData({
                    orderStatus: o[J.orderStatus],
                    orderStatusNum: J.orderStatus,
                    titleType: d[J.titleType],
                    paymentStatus: s[J.paymentStatus],
                    paymentType: n[a.data.paymentType] || ""
                }), wx.hideLoading(), 1 != r.orderDetails.orderDetailInfo.orderStatus && 3 != r.orderDetails.orderDetailInfo.orderStatus && 4 != r.orderDetails.orderDetailInfo.orderStatus || "3" == r.orderDetails.orderDetailInfo.orderType || "2" == r.orderDetails.orderDetailInfo.paymentStatus && a.setData({
                    goPay: !0,
                    gologistic: !1
                }), "1" != r.orderDetails.orderDetailInfo.paymentStatus || "6" != r.orderDetails.orderDetailInfo.orderStatus && "7" != r.orderDetails.orderDetailInfo.orderStatus && "14" != r.orderDetails.orderDetailInfo.orderStatus || "14" == r.orderDetails.orderDetailInfo.orderType || "28" == r.orderDetails.orderDetailInfo.orderType || "24" == r.orderDetails.orderDetailInfo.orderType || a.setData({
                    goPay: !1,
                    gologistic: !0
                }), "7" == r.orderDetails.orderDetailInfo.orderStatus && 14 != r.orderDetails.orderDetailInfo.orderType && 28 != r.orderDetails.orderDetailInfo.orderType && 24 != r.orderDetails.orderDetailInfo.orderType && a.setData({
                    returnOrexchange: !0
                });
            } else wx.hideLoading(), a.setData({
                toastOptions: {
                    title: "订单获取失败！",
                    duration: 1500
                }
            });
        }
    });
}, i = function(e, t) {
    if (e > 1e3) {
        var r = Math.floor(e / 1e3), a = Math.floor(r / 3600), o = Math.floor((r - 60 * a * 60) / 60), i = r - 60 * a * 60 - 60 * o;
        return t.setData({
            hourSold: a,
            minSold: o,
            seconds: i
        }), !0;
    }
    return !1;
};

Page({
    data: {
        openIcon: !1,
        closeIcon: !1,
        textList: [],
        goToPay: !1,
        goLogis: !1,
        returnOrexchange: !1,
        orderCode: "",
        totalOriginalPrice: "",
        cashPay: "",
        toastOptions: {
            title: "",
            mask: !1,
            duration: 1500
        },
        showcontent: !1,
        isCreateClicked: !1,
        orderStatusData: "",
        checked: !0,
        cancel: [ {
            id: 1,
            value: "不想买了"
        }, {
            id: 2,
            value: "商品选择错误"
        }, {
            id: 3,
            value: "重复下单/误下单"
        }, {
            id: 4,
            value: "忘记使用优惠券、积分等"
        }, {
            id: 5,
            value: "收货信息"
        }, {
            id: 6,
            value: "该商品商城降价了"
        }, {
            id: 7,
            value: "其他商家价格更低"
        }, {
            id: 8,
            value: "发货太慢"
        }, {
            id: 9,
            value: "支付方式有误/无法支付"
        }, {
            id: 10,
            value: "其他原因"
        } ],
        disabled: !0,
        showCancelOrder: !1,
        showBackMoney: !1,
        shopName: "",
        isDelivery: !0,
        supportClickedFlag: !1,
        orderMold: 0,
        orderdetailtimer: "",
        orderStatusNum: "",
        isDepositShow: !1,
        paymentList: [],
        showTip: !1,
        encryptElectronicUrl: "",
        encryptPicUrl: ""
    },
    onLoad: function(e) {
        wx.hideShareMenu(), this.setData({
            cdnPath: r.service.cdnPath,
            orderCode: e.orderCode
        }), t.mpReport(400040001, {
            ordercode: e.orderCode,
            load: "1"
        });
    },
    onShow: function() {
        o(this.data.orderCode, this);
    },
    onHide: function() {
        var e = this;
        clearInterval(e.data.orderdetailtimer);
    },
    onReady: function(e) {
        this.data.textList.length > 1 && this.setData({
            openIcon: !0
        });
    },
    openTip: function() {
        var e = this;
        e.setData({
            showTip: !e.data.showTip
        });
    },
    opentext: function() {
        this.data.openIcon ? this.setData({
            openIcon: !1,
            closeIcon: !0
        }) : this.setData({
            openIcon: !0,
            closeIcon: !1
        });
    },
    goTobuy: function() {
        var r = this;
        if (r.data.isCreateClicked) return !1;
        r.setData({
            isCreateClicked: !0
        }), setTimeout(function() {
            r.setData({
                isCreateClicked: !1
            });
        }, 3e3), 18 == r.data.orderType ? "待支付" == r.data.depositStatus ? t.mpGotoPayment(e, this.data.orderCode, this.data.depositPrice.split("¥")[1]) : "已支付" == r.data.depositStatus && this.data.balancePrice && "暂无报价" != this.data.balancePrice && t.mpGotoPayment(e, this.data.orderCode, this.data.balancePrice.split("¥")[1]) : t.mpGotoPayment(e, this.data.orderCode, this.data.cashPay), 
        t.mpReport(400040101, {
            ordercode: this.data.orderCode,
            click: "1"
        });
    },
    goToLogis: function() {
        t.mpReport(400040102, {
            ordercode: this.data.orderCode,
            click: "1"
        });
    },
    openGoCancel: function(e) {
        var t = this;
        a = "", t.animationOption(t, e), t.data.cancel.forEach(function(e, t) {
            e.checked = !1;
        }), t.setData({
            cancel: t.data.cancel
        }), t.setData({
            disabled: !0
        });
    },
    chooseReason: function(e) {
        var t = this;
        t.data.cancel.forEach(function(t, r) {
            t.id == e.detail.value ? (t.checked = !0, a = t.id) : t.checked = !1;
        }), t.setData({
            cancel: t.data.cancel
        }), t.setData({
            disabled: !1
        });
    },
    submit: function(e) {
        var t = this;
        if ("" == a) return !1;
        t.animationOption(t, e), t.setData({
            showBackMoney: !0
        });
    },
    cancelOrder: function() {
        var e = this;
        e.setData({
            showBackMoney: !1,
            showCancelOrder: !1,
            goPay: !1
        }), t.getCsrf(function(o) {
            t.mpPost(r.service.openApiDomain + "/mcp/v1/cancelOrder", {
                orderCode: e.data.orderCode,
                reasonType: a - 0
            }, {
                successFunc: function(t) {
                    if (0 != t.data.code) wx.showModal({
                        title: "提示",
                        content: t.data.info
                    }), e.setData({
                        showCancelOrder: !0,
                        goPay: !0
                    }); else {
                        var r = getCurrentPages(), a = r[r.length - 2];
                        a.route;
                        if (a.data.userOrderList) {
                            var o = a.data.userOrderList;
                            o.forEach(function(t, r) {
                                t.orderCode == e.data.orderCode && ("未支付" == e.data.paymentStatus ? t.orderStatusStr = "已取消" : t.orderStatusStr = "取消处理中");
                            }), e.setData({
                                userOrderList: o
                            });
                        }
                        e.setData({
                            showCancelOrder: !1,
                            goPay: !1,
                            orderStatus: "未支付" == e.data.paymentStatus ? "已取消" : "取消处理中",
                            showCurrentTime: !1
                        });
                    }
                },
                failFunc: function() {
                    wx.showModal({
                        title: "提示",
                        content: "取消订单失败，请稍后重试"
                    }), e.setData({
                        showCancelOrder: !0,
                        goPay: !0
                    });
                }
            }, {
                CsrfToken: o
            });
        }, function() {
            wx.showModal({
                title: "提示",
                content: "取消订单失败，请稍后重试"
            }), e.setData({
                showCancelOrder: !0,
                goPay: !0
            });
        });
    },
    animationOption: function(e, t) {
        if (e.data.supportClickedFlag) return !1;
        e.setData({
            supportClickedFlag: !0
        }), setTimeout(function() {
            e.setData({
                supportClickedFlag: !1
            });
        }, 400);
        var r = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = r, r.translateY(300).step(), 1 == t.currentTarget.dataset.status ? (this.setData({
            animationData: r.export(),
            showCancel: !0
        }), setTimeout(function() {
            r.translateY(0).step(), this.setData({
                animationData: r.export()
            });
        }.bind(this), 1)) : 0 == t.currentTarget.dataset.status && (this.setData({
            animationData: r.export()
        }), setTimeout(function() {
            r.translateY(0).step(), this.setData({
                animationData: r.export(),
                showCancel: !1
            });
        }.bind(this), 200));
    }
});