var t = getApp(), e = t.globalData.mp, a = t.globalData.config;

Page({
    data: {
        couponList: [],
        hideEmptyClass: "hide",
        couponType: "coupon",
        selectIdx: 0,
        pageSize: 5,
        pageNo: 1,
        totalList: !1,
        loadMore: !1,
        hasNextPage: !0,
        initExchangeCode: "",
        exchangeCode: "",
        exchangeModal: {
            isShow: !1,
            title: "",
            content: ""
        }
    },
    onLoad: function() {
        var t = this;
        wx.hideShareMenu(), t.getCouponList();
    },
    opentext: function(t) {
        var e = this, a = t.currentTarget.dataset.idx, o = e.data.couponList;
        e.setData({
            selectIdx: a
        }), o[e.data.selectIdx].openIcon = !o[e.data.selectIdx].openIcon, e.setData({
            couponList: o
        });
    },
    getCouponList: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, n = this;
        e.mpGet(a.service.openApiDomain + "/mcp/queryUserCouponList", {
            pageNo: t,
            pageSize: n.data.pageSize
        }, {
            successFunc: function(e) {
                e.data.success && e.data.couponList && e.data.couponList.length > 0 ? (e.data.couponList = e.data.couponList.map(function(t) {
                    return t.beginDate = t.beginDate.split(" ")[0].replace(/-/g, "."), t.endDate = t.endDate.split(" ")[0].replace(/-/g, "."), 
                    1 == t.deliveryFree ? t.frontType = "noPostage" : t.amount && 0 != t.amount ? t.frontType = "coupon" : t.discount && 0 != t.discount && (t.frontType = "discount"), 
                    t;
                }), n.setData({
                    couponList: 1 == t ? e.data.couponList : n.data.couponList.concat(e.data.couponList),
                    hideEmptyClass: "hide",
                    pageNo: t
                }), e.data.couponList.length == n.data.pageSize ? n.data.hasNextPage = !0 : (n.data.hasNextPage = !1, 
                n.setData({
                    totalList: !0,
                    loadMore: !1
                })), setTimeout(function() {
                    o(n);
                }, 200)) : (n.data.hasNextPage = !1, n.data.couponList.length > 0 ? n.setData({
                    hideEmptyClass: "hide",
                    totalList: !0,
                    loadMore: !1
                }) : n.setData({
                    hideEmptyClass: "",
                    totalList: !1,
                    loadMore: !1
                }));
            },
            failFunc: function() {
                n.data.hasNextPage = !1, n.data.couponList.length > 0 ? n.setData({
                    hideEmptyClass: "hide",
                    totalList: !0,
                    loadMore: !1
                }) : n.setData({
                    hideEmptyClass: "",
                    totalList: !1,
                    loadMore: !1
                });
            },
            completeFunc: function() {
                wx.hideLoading();
            }
        });
    },
    onReachBottom: function() {
        var t = this;
        if (!t.data.hasNextPage) return t.setData({
            totalList: !0,
            loadMore: !1
        }), !1;
        t.setData({
            totalList: !1,
            loadMore: !0
        }), t.getCouponList(t.data.pageNo + 1);
    },
    goUse: function(t) {
        e.stopRepeatClick(t, 3e3);
        var a = t.currentTarget.dataset.couponcode;
        wx.navigateTo({
            url: "../couponGoods/couponGoods?couponCode=" + a
        });
    },
    toChangeExchangeCode: function(t) {
        this.setData({
            exchangeCode: t.detail.value
        });
    },
    validateExChangeCode: function() {
        var t = this, e = t.data.exchangeCode.trim();
        return 0 != t.data.exchangeCode.length && (!(e.length < 16 || e.length > 32) || (wx.showToast({
            title: "券码错误，请重新输入",
            mask: !0,
            icon: "none"
        }), !1));
    },
    toExchangeCoupon: function(t) {
        var o = this;
        return !e.repeatTap.stop(o, t) && (!!o.validateExChangeCode() && void e.mpCheckAndLogin().then(function() {
            return e.getCsrf();
        }).then(function(t) {
            return e.mpPromiseGet(a.service.openApiDomain + "/mcp/coupon/exchangeCoupon", {
                busiCode: o.data.exchangeCode.trim()
            }, {
                CsrfToken: t
            });
        }).then(function(t) {
            if (!t.data.success || !t.data.listExchangeCoupon || !t.data.listExchangeCoupon.length) throw new Error(t.data && t.data.errorTip);
            o.showExchangeModal({
                title: "成功兑换" + t.data.listExchangeCoupon.length + "张优惠券",
                content: t.data.listExchangeCoupon.join("，"),
                confirmText: "我知道了",
                confirmFunc: function() {
                    wx.showLoading({
                        title: "加载中...",
                        mask: !0
                    }), o.setData({
                        exchangeCode: "",
                        initExchangeCode: ""
                    }), o.hideExchangeModal(), o.getCouponList();
                }
            });
        }).catch(function(t) {
            if (!t || !t.message) return wx.showToast({
                title: "被你的热情吓到了，容我缓缓",
                mask: !0,
                icon: "none"
            }), !1;
            o.showExchangeModal({
                title: "兑换失败",
                content: t.message,
                confirmText: "我知道了",
                confirmFunc: function() {
                    o.hideExchangeModal();
                }
            });
        }));
    },
    toComfirmExchangeModal: function() {
        var t = this;
        t.data.exchangeModal.confirmFunc && t.data.exchangeModal.confirmFunc() || t.hideExchangeModal();
    },
    showExchangeModal: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        this.setData({
            exchangeModal: {
                isShow: !0,
                title: t.title || "",
                content: t.content || "",
                confirmText: t.confirmText || "",
                confirmFunc: t.confirmFunc || null
            }
        });
    },
    hideExchangeModal: function() {
        this.setData({
            exchangeModal: {
                isShow: !1,
                title: "",
                content: "",
                confirmText: "",
                confirmFunc: null
            }
        });
    }
});

var o = function(t) {
    var e = t.data.couponList, a = 0;
    wx.createSelectorQuery().select(".c-user").boundingClientRect(function(o) {
        o && o.height && (a = o.height), wx.createSelectorQuery().selectAll(".c-term").boundingClientRect(function(o) {
            o.forEach(function(o, n) {
                o.height > a ? e[n].showIcon = !0 : e[n].showIcon = !1, t.setData({
                    couponList: e
                });
            });
        }).exec();
    }).exec();
};