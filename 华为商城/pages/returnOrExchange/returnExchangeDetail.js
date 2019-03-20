var t = getApp(), o = t.globalData.mp, a = t.globalData.config;

Page({
    data: {
        hasDetail: !1,
        showError: !1,
        isLiveFlag: 0,
        stateIdx: 0,
        openCont: !1,
        orderCode: "",
        applyType: "",
        rmaCode: "",
        logisticsCompony: "",
        logisticsNo: "",
        logisticsComponyTemp: "",
        logisticsNoTemp: "",
        createDate: "",
        rmaAppAddress: "",
        repairReason: "",
        packageStatus: "",
        status: "",
        prdReturnWay: "",
        contactBy: "",
        contactMobile: "",
        problemDescription: "",
        refundAmt: "",
        processTimeList: [],
        rmaPhotoList: [],
        rmaProductsList: [],
        rmaGiftsList: [],
        supportClickedFlag: !1
    },
    onLoad: function(t) {
        this.setData({
            cdnPath: a.service.cdnPath,
            isLiveFlag: 0,
            orderCode: t.orderCode,
            applyType: t.applyType,
            rmaCode: t.rmaCode,
            logisticsCompony: "",
            logisticsNo: ""
        }), s(this);
    },
    openProgress: function() {
        this.data.openCont ? this.setData({
            openCont: !1
        }) : this.setData({
            openCont: !0
        });
    },
    openModify: function(t) {
        var o = this;
        if (o.data.supportClickedFlag) return !1;
        o.setData({
            supportClickedFlag: !0
        }), setTimeout(function() {
            o.setData({
                supportClickedFlag: !1
            });
        }, 400);
        var a = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        o.animation = a, a.translateY(300).step(), 1 == t.currentTarget.dataset.status ? (o.setData({
            animationData: a.export(),
            showModify: !0
        }), setTimeout(function() {
            a.translateY(0).step(), o.setData({
                animationData: a.export()
            });
        }.bind(o), 1)) : 0 == t.currentTarget.dataset.status && (o.setData({
            animationData: a.export()
        }), setTimeout(function() {
            a.translateY(0).step(), o.setData({
                animationData: a.export(),
                showModify: !1
            });
        }.bind(o), 200));
    },
    changeLogCompony: function(t) {
        this.setData({
            logisticsComponyTemp: t.detail.value
        });
    },
    changeLogNO: function(t) {
        this.setData({
            logisticsNoTemp: t.detail.value
        });
    },
    saveLogisticInfo: function() {
        var t = this;
        return t.data.logisticsComponyTemp.length < 1 ? (wx.showModal({
            title: "提示",
            content: "请填写物流公司",
            showCancel: !1
        }), !1) : t.data.logisticsNoTemp.length < 1 ? (wx.showModal({
            title: "提示",
            content: "请填写物流单号",
            showCancel: !1
        }), !1) : (o.getCsrf(function(s) {
            o.mpPost(a.service.openApiDomain + "/mcp/addRmaLogistics", {
                logisticsName: t.data.logisticsComponyTemp,
                logisticsNumbers: t.data.logisticsNoTemp,
                rmaCode: t.data.rmaCode
            }, {
                successFunc: function(o) {
                    o.data.success ? t.setData({
                        logisticsCompony: t.data.logisticsComponyTemp,
                        logisticsNo: t.data.logisticsNoTemp
                    }) : t.setData({
                        logisticsCompony: "",
                        logisticsNo: ""
                    });
                },
                failFunc: function() {
                    wx.showToast({
                        title: "接口调用失败!",
                        icon: "none"
                    });
                }
            }, {
                CsrfToken: s
            });
        }, function() {
            t.setData({
                logisticsCompony: "",
                logisticsNo: ""
            }), wx.showToast({
                title: "接口调用失败!",
                icon: "none"
            });
        }), void this.setData({
            showModify: !1
        }));
    },
    cancalApply: function() {
        var t = this;
        o.getCsrf(function(e) {
            o.mpPost(a.service.openApiDomain + "/mcp/v1/cancelRmaOrder", {
                rmaCode: t.data.rmaCode
            }, {
                successFunc: function(o) {
                    o.data.success ? s(t) : wx.showToast({
                        title: "取消申请失败!",
                        icon: "none"
                    });
                },
                failFunc: function() {
                    wx.showToast({
                        title: "取消申请失败!",
                        icon: "none"
                    });
                }
            }, {
                CsrfToken: e
            });
        }, function() {
            wx.showToast({
                title: "取消申请失败!",
                icon: "none"
            });
        });
    }
});

var s = function(t) {
    o.mpGet(a.service.openApiDomain + "/mcp/queryRmaDetail", {
        rmaCode: t.data.rmaCode,
        isLive: t.data.isLiveFlag
    }, {
        successFunc: function(a) {
            if ((a = a.data).success && a.rmaDetail) {
                var s = a.rmaDetail;
                t.setData({
                    contactBy: s.contactBy,
                    contactMobile: s.contactMobile,
                    contactPhone: s.contactPhone,
                    createDate: s.createDate,
                    deliveryAddr: s.orderDeliveryAddress,
                    packageStatus: s.packageStatusDis,
                    problemDescription: s.problemDescription,
                    processTimeList: s.processTimeList,
                    repairCredentials: s.repairCredentials,
                    repairReason: s.repairReasonDis,
                    rmaGiftsList: s.rmaGiftsList,
                    rmaPhotoList: s.rmaPhotoList,
                    rmaProductsList: s.rmaProductsList,
                    status: s.status,
                    logisticsCompony: s.logisticsName,
                    logisticsNo: s.logisticsNumbers,
                    hasDetail: !0
                }), t.data.processTimeList.forEach(function(t, a) {
                    t.processtime = o.formatTimeNumber(t.processTime, "Y-M-D h:m:s");
                }), t.setData({
                    processTimeList: t.data.processTimeList.reverse()
                });
            } else wx.showToast({
                title: "网络繁忙，请稍后重试!",
                icon: "none"
            }), t.setData({
                showError: !0
            });
        },
        failFunc: function() {
            wx.showToast({
                title: "网络繁忙，请稍后重试!",
                icon: "none"
            }), t.setData({
                showError: !0
            });
        }
    });
};