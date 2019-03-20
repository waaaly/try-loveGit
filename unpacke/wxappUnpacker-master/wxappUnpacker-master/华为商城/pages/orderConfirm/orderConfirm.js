function e(e, o, t) {
    return o in e ? Object.defineProperty(e, o, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[o] = t, e;
}

var o = getApp(), t = o.globalData.mp, i = o.globalData.config, a = require("../../plugins/xmldom/dom-parser");

Page({
    data: {
        cdnPath: i.service.cdnPath,
        shoppingConfigVO: {},
        orderReq: {
            orderItemReqArgs: [],
            enablePoint: !1,
            orderSouce: "18",
            couponList: [],
            orderType: "0",
            salePortal: "4",
            carrierInvoiceVOs: [],
            deliveryName: "门店自提",
            deliveryMethod: "999",
            offlineShopAddressInfo: {},
            autoUseCoupon: !0,
            autoMultipleCoupon: !0,
            inutCoupon: 0,
            exchangeCouponCode: ""
        },
        couponReq: {},
        confirmVOLists: [],
        hasAddress: !1,
        userInvoiceInfoVO: {},
        invoiceShowData: {
            invoiceTypeName: "",
            invoiceType: "",
            invoiceTitleTypeName: "",
            invoiceTitleType: ""
        },
        invoiceShowDataString: "{}",
        ucToorder: {
            0: "0",
            1: "1",
            3: "3",
            2: "50"
        },
        orderTouc: {
            0: "0",
            1: "1",
            3: "3",
            50: "2"
        },
        invoiceTypes: [ {
            type: "1",
            invoiceName: "纸质普通发票",
            titleType: ""
        }, {
            type: "50",
            invoiceName: "电子普通发票",
            titleType: ""
        }, {
            type: "3",
            invoiceName: "专用发票"
        }, {
            type: "0",
            invoiceName: "不开发票"
        } ],
        showInvalid: !1,
        userManulCouponCode: "",
        couponTipsClass: "hide",
        couponTips: "优惠券码输入有误，请重新输入",
        needRemoveAll: !1,
        isCreateClicked: !1,
        isCouponSelected: !1,
        isExchangeSelected: !1,
        couponDClicked: !1,
        removeTips: "部分商品暂不可购买",
        goStore: !1,
        goDelivery: !0,
        isDisable: !1,
        offlineShopInfo: {
            province: "",
            city: "",
            district: "",
            street: "",
            address: "",
            shopTelephone: "",
            businessHrs: "",
            shopName: ""
        },
        orderDeliveryAddress: {
            consignee: "",
            mobile: "",
            province: "",
            city: "",
            district: "",
            street: "",
            address: ""
        },
        refreshStatus: !1,
        disableAll: !1,
        disableContent: "",
        isGoToStore: !1,
        supportClickedFlag: !1,
        shopCarrierName: "",
        fromDefaultInvoice: !1,
        showTip: !1,
        templateContent: "",
        teamBuyInfo: {},
        isConfirmBtnClicked: !1,
        needL4Addr: !1,
        toastState: !1,
        needStore: !1,
        isLoadingOrderData: !1,
        isLuckyOrder: !1,
        couponDH: "button-style-1-big-disabled",
        isUsePoint: !1,
        isShowPointRule: !1,
        isSwitchAccount: !1,
        isShowLogin: !1,
        secondAuthTypeIndex: 0,
        sameId: !1,
        pointBlance: 0,
        query: {}
    },
    onLoad: function(e) {
        var i = this;
        wx.hideShareMenu(), i.data.query = e, i.saveProductInfo(e), wx.getStorageSync("isGoToStore") ? i.setData({
            needStore: !0
        }) : i.setData({
            isDisable: !1,
            goStore: !1,
            goDelivery: !0,
            offlineShopInfo: {
                shopName: "华为商城"
            }
        }), o.globalData.paySuccess = !1, t.mpReport(400030001, {
            load: "1"
        });
    },
    onUnload: function() {
        wx.removeStorageSync("invoiceInfoForConfirm"), wx.removeStorageSync("confirmVOList"), 
        wx.removeStorageSync("userInvoiceInfoVO"), wx.removeStorageSync("needRemoveProduct"), 
        wx.removeStorageSync("shoppingConfigId");
    },
    onShow: function() {
        var e = this;
        wx.getStorageSync("needReLoad") ? (wx.setStorageSync("needReLoad", !1), e.optionStorage(), 
        t.mpLogin(o, function(o) {
            o && o.data && o.data.success ? e.cleanAllInfo(function() {
                e.refreshPage();
            }) : wx.showToast({
                title: "帐号切换失败，请稍后重试",
                icon: "none"
            });
        }, !1)) : e.refreshPage();
    },
    refreshPage: function() {
        var e = this, t = !1;
        if (o.globalData.paySuccess) return o.globalData.paySuccess = !1, !1;
        if (e.data.showCoupon) return !1;
        if ("1" == o.globalData.userLoginStatus) {
            var i = wx.getStorageSync("openId") || "", a = wx.getStorageSync("unionId") || "";
            (a = i == a) ? (t = !0, e.setData({
                isShowLogin: !1
            })) : e.setData({
                isShowLogin: !0
            });
        } else e.setData({
            isShowLogin: !1
        });
        e.setData({
            sameId: t
        }), e.buildOrder(), e.queryPoint();
    },
    onHide: function() {
        this.setData({
            fromDefaultInvoice: !1
        });
    },
    saveProductInfo: function(e) {
        var o = JSON.parse(e.nowBuy);
        if (e.teamBuyInfo) {
            var t = JSON.parse(e.teamBuyInfo);
            this.setData({
                teamBuyInfo: t
            }), this.data.orderReq.orderType = 33;
        }
        "LD" == o[0].itemType && (this.data.orderReq.orderType = 39, this.setData({
            isLuckyOrder: !0
        })), this.setData({
            productItems: o
        });
    },
    getStoreAddress: function(e) {
        var o = wx.getStorageSync("orderDeliveryAddress");
        e.setData({
            isGoToStore: !0,
            isDisable: !0,
            goStore: !0,
            goDelivery: !1,
            seCode: o.shopDetailInfo.seCode,
            offlineShopInfo: {
                province: o.shopDetailInfo.shopAddress.provice || "",
                city: o.shopDetailInfo.shopAddress.city || "",
                district: o.shopDetailInfo.shopAddress.district || "",
                street: o.shopDetailInfo.shopAddress.street || "",
                address: o.shopDetailInfo.shopAddress.address || "",
                shopTelephone: o.shopDetailInfo.shopTelephone || "",
                businessHrs: o.shopDetailInfo.businessHrs || "",
                shopName: o.shopDetailInfo.shopName || "",
                consignee: "自提订单",
                mobile: o.shopDetailInfo.shopTelephone || "",
                provinceId: o.shopDetailInfo.shopAddress.proviceId || "",
                cityId: o.shopDetailInfo.shopAddress.cityId || "",
                districtId: o.shopDetailInfo.shopAddress.districtId || "",
                streetId: o.shopDetailInfo.shopAddress.streetId || "",
                provinceName: o.shopDetailInfo.shopAddress.provice || "",
                cityName: o.shopDetailInfo.shopAddress.city || "",
                districtName: o.shopDetailInfo.shopAddress.district || "",
                streetName: o.shopDetailInfo.shopAddress.street || "",
                businessHours: o.shopDetailInfo.businessHrs || ""
            },
            refreshStatus: !0
        });
    },
    toStore: function() {
        this.data.goStore || (this.setData({
            goStore: !0,
            goDelivery: !1,
            needL4Addr: !1,
            needStore: !0
        }), this.buildOrder());
    },
    toDelivery: function() {
        this.data.goDelivery || (this.setData({
            goStore: !1,
            goDelivery: !0,
            needStore: !1
        }), this.buildOrder());
    },
    openCoupon: function(e) {
        this.setData({
            couponTipsClass: "hide",
            couponTips: "",
            userManulCouponCode: "",
            couponDH: "button-style-1-big-disabled"
        });
        var o = this;
        if (o.data.supportClickedFlag) return !1;
        o.setData({
            supportClickedFlag: !0
        }), setTimeout(function() {
            o.setData({
                supportClickedFlag: !1
            });
        }, 400);
        var t = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        o.animation = t, t.translateY(300).step(), 1 == e.currentTarget.dataset.status ? (wx.setStorageSync("couponListForCouponDialog", o.data.orderReq.couponList), 
        o.setData({
            animationData: t.export(),
            showCoupon: !0
        }), setTimeout(function() {
            t.translateY(0).step(), o.setData({
                animationData: t.export()
            });
        }.bind(o), 1)) : 0 == e.currentTarget.dataset.status && (o.data.orderReq.couponList = wx.getStorageSync("couponListForCouponDialog"), 
        o.setData({
            animationData: t.export()
        }), setTimeout(function() {
            t.translateY(0).step(), o.setData({
                animationData: t.export(),
                showCoupon: !1
            });
        }.bind(o), 200), o.setData({
            couponTipsClass: "hide",
            couponTips: "",
            userManulCouponCode: "",
            couponDH: "button-style-1-big-disabled"
        }), o.buildOrder());
    },
    checkboxSelected: function(e) {
        var o = this, t = o.getOrderReq(), i = e.currentTarget.dataset.couponobj, a = -1;
        return i.selectable ? !o.data.isCouponSelected && (o.setData({
            isCouponSelected: !0
        }), o.data.userManulCouponCode && o.setData({
            couponTipsClass: "hide",
            couponTips: "",
            userManulCouponCode: "",
            couponDH: "button-style-1-big-disabled"
        }), o.data.confirmVOLists[0].usedCouponInfos.forEach(function(e, o) {
            e.couponCode == i.couponCode && (a = o);
        }), -1 != a ? "0000" == i.couponCode ? (o.data.confirmVOLists[0].usedCouponInfos = [], 
        t.couponList = [], t.autoUseCoupon = !1, t.autoMultipleCoupon = !1) : (o.data.confirmVOLists[0].usedCouponInfos[a] = "", 
        o.data.confirmVOLists[0].usedCouponInfos = o.data.confirmVOLists[0].usedCouponInfos.filter(function(e) {
            return "" != e;
        }), t.couponList[0].couponCodes[a] = "", t.couponList[0].couponCodes = t.couponList[0].couponCodes.filter(function(e) {
            return "" != e;
        }), 0 == t.couponList[0].couponCodes.length ? (t.couponList = [], t.autoUseCoupon = !1, 
        t.autoMultipleCoupon = !1) : (t.autoUseCoupon = !0, t.autoMultipleCoupon = !0)) : "0000" == i.couponCode ? (o.data.confirmVOLists[0].usedCouponInfos = [ {
            couponCode: "0000"
        } ], t.couponList = [], t.autoUseCoupon = !1, t.autoMultipleCoupon = !1, o.setData({
            couponReq: {}
        })) : (o.data.confirmVOLists[0].usedCouponInfos = o.data.confirmVOLists[0].usedCouponInfos || [], 
        o.data.confirmVOLists[0].usedCouponInfos.push(i), 0 == t.couponList.length ? (o.data.couponReq = {
            carrierCode: o.data.confirmVOLists[0].carrierCode,
            couponCodes: [ i.couponCode ]
        }, t.couponList.push(o.data.couponReq)) : t.couponList[0].couponCodes.push(i.couponCode), 
        t.autoUseCoupon = !0, t.autoMultipleCoupon = !0), o.setData({
            orderReq: t
        }), void this.buildOrder()) : (o.setData({
            "toastOptions.title": "不可与已选优惠券叠加使用"
        }), !1);
    },
    stopDoubleClick: function() {
        var e = this;
        return !!e.data.isCreateClicked || (e.setData({
            isCreateClicked: !0
        }), setTimeout(function() {
            e.setData({
                isCreateClicked: !1
            });
        }, 3e3), !1);
    },
    getCreateOrderReq: function() {
        var e = this, o = e.data.orderReq;
        if (("" == o.addressID || "0" == o.addressID || void 0 == o.addressID) && e.data.goDelivery) return wx.showModal({
            title: "提示",
            content: "请您选择收货地址~",
            showCancel: !1
        }), !1;
        if (0 == o.carrierInvoiceVOs.length || 0 == Object.keys(o.carrierInvoiceVOs[0]).length) return wx.showModal({
            title: "提示",
            content: "请您选择发票信息",
            showCancel: !1
        }), !1;
        if (e.data.couponTips && "" != e.data.userManulCouponCode.trim()) return wx.showModal({
            title: "提示",
            content: "请您选择有效的优惠券",
            showCancel: !1
        }), !1;
        if (o.couponList && o.couponList.length > 0 && o.couponList[0] && "0000" == o.couponList[0].couponCodes[0] && (o.couponList = []), 
        o.couponList && !o.couponList[0] && (o.couponList = []), wx.getStorageSync("cid") && Number(wx.getStorageSync("cid")) && (o.cpsId = wx.getStorageSync("cid"), 
        wx.getStorageSync("wi") && (o.cpsWi = escape(wx.getStorageSync("wi")))), !e.data.goDelivery) {
            var t = e.data.offlineShopInfo;
            o.deliveryMethod = "999", o.deliveryName = "门店自提";
            var i = {
                consignee: "自提订单",
                mobile: t.shopTelephone || "",
                provinceId: t.provinceId || "",
                cityId: t.cityId || "",
                districtId: t.districtId || "",
                streetId: t.streetId || "",
                provinceName: t.province || "",
                cityName: t.city || "",
                districtName: t.district || "",
                streetName: t.street || "",
                address: t.address || "",
                businessHours: t.businessHrs || ""
            };
            o.offlineShopAddressInfo = i;
        }
        return e.data.confirmVOLists[0] && e.data.confirmVOLists[0].singlePrdList && e.data.confirmVOLists[0].singlePrdList[0] && e.data.confirmVOLists[0].singlePrdList[0].giftList && e.data.confirmVOLists[0].singlePrdList[0].giftList.length > 0 && (o.orderItemReqArgs[0].gifts = [], 
        e.data.confirmVOLists[0].singlePrdList[0].giftList.forEach(function(e) {
            o.orderItemReqArgs[0].gifts.push({
                sbomCode: e.giftCode
            });
        })), o;
    },
    restrictedGoodsTip: function(e) {
        var o = this, t = e, i = o.data.orderReq;
        if (!(t[0].needRemoveProduct && t[0].needRemoveProduct.length > 0)) return o.setData({
            showInvalid: !1
        }), wx.showModal({
            title: "提示",
            content: "下单失败，请稍后重试！",
            showCancel: !1
        }), !1;
        o.data.confirmVOLists[0].needRemoveProduct = t[0].needRemoveProduct, o.setData({
            confirmVOLists: o.data.confirmVOLists
        }), wx.setStorageSync("needRemoveProduct", t[0].needRemoveProduct), o.setData({
            showInvalid: !0
        }), t[0].orderItemArg && t[0].orderItemArg.length > 0 ? (i.orderItemReqArgs = t[0].orderItemArg, 
        t[0].orderItemArg[0].gifts && (o.data.productItems[0].gifts = t[0].orderItemArg[0].gifts), 
        o.setData({
            orderReq: i,
            needRemoveAll: !1,
            removeTips: "部分商品暂不可购买",
            productItems: t[0].orderItemArg
        })) : o.setData({
            orderReq: i,
            needRemoveAll: !0,
            removeTips: "下手慢了，全部商品均不可购买"
        });
    },
    orderCreate: function(e) {
        var a = this;
        if (a.stopDoubleClick()) return !1;
        if (e && e.detail && t.mpIsFormIdValid(e.detail.formId) && t.mpReportFormId(o, i, {
            formid: e.detail.formId,
            source: 1
        }), !a.getCreateOrderReq()) return !1;
        var n = a.data.orderReq;
        n = a.getCreateOrderReq(), Object.keys(a.data.teamBuyInfo).length > 0 && (n.teamBuyInfo.formId = e.detail.formId), 
        a.setData({
            orderReq: n
        }), a.data.fromDefaultInvoice ? a.setData({
            showTip: !0
        }) : a.createOrderData();
    },
    needLevelFourModal: function() {
        var e = this;
        return !!this.data.needL4Addr && (this.setData({
            toastState: !0
        }), setTimeout(function() {
            e.setData({
                toastState: !1
            });
        }, 3e3), !0);
    },
    createOrderData: function() {
        var e = this, a = e.data.orderReq;
        if (e.needLevelFourModal()) return !1;
        t.getCsrf(function(n) {
            t.mpPost(i.service.openApiDomain + "/mcp/v1/createOrder", a, {
                successFunc: function(i) {
                    if (i.data && i.data.resultCode && ("10015" == i.data.resultCode || "10017" == i.data.resultCode)) return wx.showModal({
                        title: "提示",
                        content: i.data.info,
                        showCancel: !1
                    }), !1;
                    if (i.data && i.data.resultCode && "10016" == i.data.resultCode) return wx.showModal({
                        title: "提示",
                        content: "此团仅限新用户参与，您已成功或正在参与商城的拼团活动，请将机会留给其他人吧。",
                        showCancel: !1,
                        confirmText: "前往首页",
                        success: function(e) {
                            e.confirm && wx.switchTab({
                                url: "/pages/index/index"
                            });
                        }
                    }), !1;
                    if (i.data && i.data.orderCodes && "null" != i.data.orderCodes) {
                        e.setData({
                            showInvalid: !1
                        }), i.data.teamBuyId ? wx.setStorageSync("teamCode", i.data.teamBuyId) : wx.removeStorageSync("teamCode");
                        var a = i.data.teamBuyId || e.data.teamBuyInfo.teamBuyId;
                        return t.mpGotoPayment(o, i.data.orderCodes, e.data.confirmVOLists[0].cashPay, a), 
                        wx.removeStorageSync("cid"), wx.removeStorageSync("wi"), !1;
                    }
                    if (wx.removeStorageSync("cid"), wx.removeStorageSync("wi"), !i.data.confirmVOLists) return e.setData({
                        showInvalid: !1
                    }), wx.showModal({
                        title: "提示",
                        content: "下单失败，请稍后重试！",
                        showCancel: !1
                    }), !1;
                    e.restrictedGoodsTip(i.data.confirmVOLists);
                }
            }, {
                CsrfToken: n
            });
        }, function() {
            e.showErrorModal(), e.data.isConfirmBtnClicked = !1, e.data.isCreateClicked = !1;
        });
        var n = [];
        a.orderItemReqArgs.forEach(function(e, o) {
            n.push(e.itemId + "," + e.qty);
        }), t.mpReport(400030101, {
            SKUCode: n,
            click: "1"
        });
    },
    goOrder: function(e) {
        var o = this;
        if (t.stopRepeatClick(e, 3e3)) return !1;
        o.setData({
            showTip: !1
        }), o.createOrderData();
    },
    goBack: function() {
        this.setData({
            showTip: !1
        });
    },
    getOrderReq: function() {
        var e = this, o = this.data.productItems, t = this.data.orderReq;
        return t.orderItemReqArgs = o, t.couponList && t.couponList.length > 0 && t.couponList[0] && t.couponList[0].couponCodes && "0000" == t.couponList[0].couponCodes[0] && (t.couponList = []), 
        t.couponList && !t.couponList[0] && (t.couponList = []), e.data.couponDClicked && (t.couponList[0].couponCodes.pop(), 
        e.data.couponDClicked = !1), wx.getStorageSync("shoppingConfigId") && e.data.goDelivery && (t.addressID = wx.getStorageSync("shoppingConfigId")), 
        e.data.goDelivery ? (delete t.deliveryMethod, delete t.deliveryName, delete t.offlineShopAddressInfo) : (delete t.addressID, 
        t.offlineShopAddressInfo = e.data.offlineShopInfo), e.data.goStore && (t.deliveryMethod = "999", 
        t.deliveryName = "门店自提"), "{}" != JSON.stringify(e.data.teamBuyInfo) && (t.teamBuyInfo = e.data.teamBuyInfo), 
        e.data.userManulCouponCode ? (t.exchangeCouponCode = e.data.userManulCouponCode, 
        t.inutCoupon = 1) : (delete t.inutCoupon, delete t.exchangeCouponCode), e.data.orderReq = t, 
        e.data.orderReq;
    },
    handlePrice: function(e) {
        var o = e;
        return o[0].deliveryFee = o[0].deliveryFee.toFixed(2), o[0].discount = o[0].discount.toFixed(2), 
        o[0].subtotal = o[0].subtotal.toFixed(2), o[0].cashPay = o[0].cashPay.toFixed(2), 
        o[0].couponDeduct = o[0].couponDeduct.toFixed(2), o[0].pointPay = o[0].pointPay.toFixed(2), 
        o[0].singlePrdList[0] && (o[0].singlePrdList[0].skuPrice = o[0].singlePrdList[0].skuPrice.toFixed(2), 
        o[0].singlePrdList[0].orderPrice = o[0].singlePrdList[0].orderPrice.toFixed(2)), 
        o;
    },
    handleCoupons: function(e, o) {
        var t = e;
        return t.length > 0 && (t = t.map(function(e) {
            return e.beginDate = n(e.beginDate), e.endDate = n(e.endDate), 1 == e.ruleType ? 1 == e.deliveryFree ? e.frontType = "noPostage" : e.frontType = "coupon" : 2 == e.ruleType && (e.frontType = "discount"), 
            e;
        }), o && t.push({
            frontType: "notSelect",
            couponCode: "0000",
            selectable: !0
        })), t;
    },
    restrictSales: function(e) {
        var o = this;
        if (e.length > 0) {
            var t = !1, i = "";
            e.forEach(function(e, o) {
                12 == e.disableStatus && (t = !0, i = "此商品暂时不支持该地区的销售");
            }), o.setData({
                disableAll: t,
                disableContent: i
            });
        }
    },
    handleConfirmVOLists: function(e) {
        var o = this, t = e;
        if (t.length > 0) {
            (t = o.handlePrice(e))[0] && "VMALL-HUAWEIDEVICE" != t[0].carrierCode && o.data.needStore && o.getStoreAddress(o);
            var i = t[0].effectiveCoupons || [];
            if (t[0].effectiveCoupons = o.handleCoupons(i, !0), t[0].carrierName) o.setData({
                shopCarrierName: t[0].carrierName
            }); else {
                var a = wx.getStorageSync("orderDeliveryAddress");
                o.setData({
                    shopCarrierName: a.shopDetailInfo.shopName
                });
            }
            var n = t[0].invalidCoupons || [];
            t[0].invalidCoupons = o.handleCoupons(n, !1);
            var r = t[0].singlePrdList || [];
            return o.restrictSales(r), t[0].usedCouponInfos = t[0].usedCouponInfos || [ {
                couponCode: "0000"
            } ], o.data.showInvalid && wx.getStorageSync("needRemoveProduct") && (t[0].needRemoveProduct = wx.getStorageSync("needRemoveProduct")), 
            t;
        }
        return t;
    },
    changeOrderReq: function(e) {
        var o = this, t = e, i = o.data.orderReq;
        return t[0].usedCouponInfo && (o.data.couponReq.couponCodes = t[0].usedCouponInfos.map(function(e) {
            return e.couponCode;
        }), t[0].carrierCode && (o.data.couponReq.carrierCode = t[0].carrierCode), 0 == i.couponList.length ? i.couponList.push(o.data.couponReq) : i.couponList[0].couponCodes = t[0].usedCouponInfos.map(function(e) {
            return e.couponCode;
        })), i.couponList.length > 0 ? wx.setStorageSync("usedCouponCodes", i.couponList[0].couponCodes) : wx.setStorageSync("usedCouponCodes", []), 
        o.data.orderReq = i, i;
    },
    getDeliveryAddress: function(e) {
        var o = this;
        e.orderDeliveryAddress ? (o.data.orderReq.addressID = e.orderDeliveryAddress.id, 
        o.setData({
            refreshStatus: !1
        }), o.setData({
            orderDeliveryAddress: e.orderDeliveryAddress,
            hasAddress: !0,
            refreshStatus: !0,
            needL4Addr: !!e.orderDeliveryAddress.needL4Addr && e.orderDeliveryAddress.needL4Addr
        })) : (o.setData({
            refreshStatus: !1
        }), o.setData({
            orderDeliveryAddress: {
                consignee: "",
                mobile: "",
                province: "",
                city: "",
                district: "",
                street: "",
                address: ""
            },
            hasAddress: !1,
            refreshStatus: !0
        }));
    },
    getDefaultInvoiceType: function() {
        var e = this;
        e.data.confirmVOLists[0].defaultInvoiceType = String(wx.getStorageSync("invoiceInfoForConfirm").invoiceType), 
        e.setData({
            confirmVOLists: e.data.confirmVOLists
        }), wx.setStorageSync("confirmVOList", e.data.confirmVOLists[0]);
    },
    showErrorModal: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = this;
        wx.showModal({
            title: "提示",
            content: e.content || "商城火爆销售中，请您稍后再试",
            cancelText: e.cancelText || "重新加载",
            confirmText: e.confirmText || "前往首页",
            success: function(t) {
                t.confirm ? e.okCallback ? e.okCallback() : wx.switchTab({
                    url: e.url || "/pages/index/index"
                }) : t.cancel && (e.cancelCallback ? e.cancelCallback() : o.buildOrder());
            }
        });
    },
    buildOrder: function() {
        var e = this;
        e.data.isCreateClicked = !0, e.data.isLoadingOrderData = !0;
        var o = e.getOrderReq();
        t.getCsrf(function(a) {
            t.mpPost(i.service.openApiDomain + "/mcp/v1/buildOrder", o, {
                successFunc: function(o) {
                    e.data.isLoadingOrderData = !1;
                    var t = o.data;
                    if (!o.data.success) return e.data.isExchangeSelected ? e.setData({
                        couponTipsClass: "",
                        couponDH: "button-style-1-big-disabled",
                        couponTips: t.info
                    }) : (e.showErrorModal({
                        content: t.info
                    }), e.data.isCouponSelected && (e.data.couponDClicked = !0)), e.data.isConfirmBtnClicked = !1, 
                    e.data.isCreateClicked = !1, e.data.isCouponSelected = !1, e.data.isExchangeSelected = !1, 
                    !1;
                    e.data.isConfirmBtnClicked = !1, e.data.isCouponSelected = !1, e.data.isExchangeSelected = !1;
                    var i = o.data.confirmVOLists || [ {} ];
                    i = e.handleConfirmVOLists(i);
                    var a = e.changeOrderReq(i);
                    i[0].usedCouponInfos || (i[0].usedCouponInfos = [], i[0].usedCouponInfos[0] = {
                        couponCode: "0000"
                    }), e.data.goDelivery && e.getDeliveryAddress(t), e.setData({
                        userManulCouponCode: "",
                        couponTipsClass: "hide",
                        confirmVOLists: i,
                        orderReq: a
                    }), wx.setStorageSync("confirmVOList", e.data.confirmVOLists[0]), wx.getStorageSync("invoiceInfoForConfirm") && e.getDefaultInvoiceType(), 
                    e.getInvoiceInfo();
                },
                failFunc: function(o) {
                    e.showErrorModal(), e.data.isConfirmBtnClicked = !1, e.data.isCreateClicked = !1, 
                    e.data.isLoadingOrderData = !1, e.data.isCouponSelected = !1, e.data.isExchangeSelected = !1;
                }
            }, {
                CsrfToken: a
            });
        }, function() {
            e.showErrorModal(), e.data.isConfirmBtnClicked = !1, e.data.isCreateClicked = !1, 
            e.data.isLoadingOrderData = !1, e.data.isCouponSelected = !1, e.data.isExchangeSelected = !1;
        });
    },
    updateInvoiceTypes: function() {
        var e = this, o = e.data.confirmVOLists, t = wx.getStorageSync("userInvoiceInfoVO").invoiceInfoVOList.filter(function(e) {
            return o[0].carrierCode && e.carrierCode ? e.carrierCode == o[0].carrierCode : e;
        }), i = e.data.invoiceTypes;
        t.forEach(function(e) {
            switch (e.invoiceType) {
              case "0":
                break;

              case "1":
                i[0].company = e.company, i[0].taxpayerId = e.taxpayerId;
                break;

              case "3":
                i[2].company = e.company, i[2].taxpayInvoiceInfoVO = e.taxpayInvoiceInfoVO;
                break;

              case "2":
                i[1].company = e.company, i[1].taxpayerId = e.taxpayerId;
            }
        }), e.setData({
            invoiceTypes: i
        });
    },
    updateInvoiceShowData: function(e, o) {
        var t = this, i = t.data.orderReq, a = {}, n = t.data.invoiceTypes, r = n.filter(function(o) {
            return o.type == e.invoiceType;
        });
        if (r[0] && r[0].type) switch (r[0].type) {
          case "0":
            a.invoiceType = "0", a.carrierCode = o[0].carrierCode, t.setData({
                invoiceReq: a
            });
            break;

          case "1":
            a.invoiceType = "1", "2" == e.invoiceTitleType ? (a.invoiceTitle = n[0].company, 
            a.taxpayerIdentityNum = n[0].taxpayerId) : a.invoiceTitle = "个人", a.carrierCode = o[0].carrierCode, 
            t.setData({
                invoiceReq: a
            });
            break;

          case "3":
            a.carrierCode = o[0].carrierCode, a.invoiceType = "3", a.invoiceTitle = n[2].company, 
            a.taxpayerIdentityNum = n[2].taxpayInvoiceInfoVO.taxpayerId, a.vatInvoice = {
                companyName: n[2].company,
                taxpayerIdentityNum: n[2].taxpayInvoiceInfoVO.taxpayerId,
                registeredAddress: n[2].taxpayInvoiceInfoVO.regAddress,
                registeredTelephone: n[2].taxpayInvoiceInfoVO.regTelephone,
                depositBank: n[2].taxpayInvoiceInfoVO.bank,
                bankAccount: n[2].taxpayInvoiceInfoVO.bankAccount
            }, a.vatInvoiceDeliveryAddress = {
                consignee: n[2].taxpayInvoiceInfoVO.checkTaker,
                mobile: n[2].taxpayInvoiceInfoVO.takerMobile,
                provinceId: n[2].taxpayInvoiceInfoVO.takerProvince,
                cityId: n[2].taxpayInvoiceInfoVO.takerCity,
                districtId: n[2].taxpayInvoiceInfoVO.takerDistrict,
                streetId: n[2].taxpayInvoiceInfoVO.takerStreet,
                address: n[2].taxpayInvoiceInfoVO.takerAddress
            }, a.invoiceComment = "", t.setData({
                invoiceReq: a
            });
            break;

          case "50":
            a.invoiceType = "50", "2" == e.invoiceTitleType ? (a.invoiceTitle = n[1].company, 
            a.taxpayerIdentityNum = n[1].taxpayerId) : a.invoiceTitle = "个人", a.carrierCode = o[0].carrierCode, 
            t.setData({
                invoiceReq: a
            });
        }
        i.carrierInvoiceVOs = [ a ], t.setData({
            orderReq: i
        });
    },
    getInvoiceInfo: function() {
        var e = this;
        t.mpGet(i.service.openApiDomain + "/uc/invoice/queryInvoiceList.json", {
            userId: wx.getStorageSync("userId")
        }, {
            successFunc: function(o) {
                var i = o.data, a = e.data.confirmVOLists, n = e.data.invoiceShowData, r = (e.data.ucToorder, 
                []), s = "", c = [], d = e.data.orderTouc, u = a[0].defaultInvoiceType;
                if (i.data && Object.keys(i.data).length > 0 && wx.setStorageSync("userInvoiceInfoVO", i.data), 
                wx.getStorageSync("userInvoiceInfoVO") && wx.getStorageSync("userInvoiceInfoVO").invoiceInfoVOList && e.updateInvoiceTypes(), 
                i.data && Object.keys(i.data).length > 0 && !a[0].invoiceTypeInfo.unsupportedInvoices.includes(u) && a[0].invoiceTypeInfo.supportedInvoices.includes(u)) {
                    var p = i.data.lastInvoiceInfo.filter(function(e, o) {
                        if (e.invoiceType == d[u] && e.carrierCode == a[0].carrierCode) return e;
                    });
                    p[0] && (1 != u && 50 != u || 2 != p[0].titleType || wx.getStorageSync("invoiceInfoForConfirm") || a[0].invoiceTypeInfo.unsupportedInvoices.includes("3") || !a[0].invoiceTypeInfo.supportedInvoices.includes("3") || a[0].invoiceTypeInfo.induceVatInfoList && a[0].invoiceTypeInfo.induceVatInfoList.length > 0 && a[0].carrierCode && i.data.invoiceInfoVOList && i.data.invoiceInfoVOList.length > 0 && (r = i.data.invoiceInfoVOList.filter(function(e, o) {
                        if (e.invoiceType == d[u] && e.carrierCode == a[0].carrierCode) return e;
                    }))[0] && (s = r[0].taxpayerId, a[0].invoiceTypeInfo.induceVatInfoList.forEach(function(e, o) {
                        c.push(e.code);
                    }), c.includes(s) && t.getSystemConfig("INVOICE_CORP_INDUCE_MSG", function(o) {
                        e.setData({
                            templateContent: o.INVOICE_CORP_INDUCE_MSG.systemConfigValue,
                            fromDefaultInvoice: !0
                        });
                    }))), e.setData({
                        userInvoiceInfoVO: i.data
                    }), e.setNearestInvoice();
                } else i.data ? (n.invoiceTypeName = "发票信息", n.invoiceTitleTypeName = "选择发票类型", 
                n.invoiceType = "", n.invoiceTitleType = "", n.carrierCode = a[0].carrierCode) : 1 == u && !a[0].invoiceTypeInfo.unsupportedInvoices.includes("1") && a[0].invoiceTypeInfo.supportedInvoices.includes("1") ? (n.invoiceTypeName = "纸质普通发票", 
                n.invoiceType = "1", n.invoiceTitleTypeName = "个人", n.invoiceTitleType = "1", n.carrierCode = a[0].carrierCode) : "50" == u && !a[0].invoiceTypeInfo.unsupportedInvoices.includes("50") && a[0].invoiceTypeInfo.supportedInvoices.includes("50") ? (n.invoiceTypeName = "电子普通发票", 
                n.invoiceType = "50", n.invoiceTitleTypeName = "个人", n.invoiceTitleType = "1", n.carrierCode = a[0].carrierCode) : (n.invoiceTypeName = "发票信息", 
                n.invoiceTitleTypeName = "选择发票类型", n.invoiceType = "", n.invoiceTitleType = "", 
                n.carrierCode = a[0].carrierCode);
                e.setData({
                    invoiceShowData: n
                }), e.data.isCreateClicked = !1, e.setData({
                    invoiceShowDataString: encodeURIComponent(JSON.stringify(n))
                }), e.updateInvoiceShowData(n, a);
            }
        });
    },
    setNearestInvoice: function() {
        var e = this, o = e.data.confirmVOLists, t = e.data.invoiceShowData, i = e.data.invoiceTypes;
        if (t.invoiceType = o[0].defaultInvoiceType, e.data.userInvoiceInfoVO.lastInvoiceInfo && Object.keys(e.data.userInvoiceInfoVO.lastInvoiceInfo).length > 0) {
            var a = e.data.userInvoiceInfoVO.lastInvoiceInfo.filter(function(e) {
                return o[0].carrierCode && e.carrierCode ? e.carrierCode == o[0].carrierCode : e;
            }).filter(function(t) {
                return e.data.userInvoiceInfoVO.lastInvoiceType ? t.invoiceType == e.data.orderTouc[o[0].defaultInvoiceType] : t;
            });
            a[0] ? a.forEach(function(a) {
                switch (a.invoiceType) {
                  case "0":
                    t.invoiceTypeName = "不开发票", t.invoiceType = a.invoiceType, t.invoiceTitleType = a.titleType, 
                    t.invoiceTitleTypeName = "", t.carrierCode = a.carrierCode || o[0].carrierCode;
                    break;

                  case "1":
                    t.invoiceTypeName = "纸质普通发票", "2" == a.titleType ? t.invoiceTitleTypeName = i[0].company : t.invoiceTitleTypeName = "个人", 
                    t.invoiceType = a.invoiceType, t.invoiceTitleType = a.titleType, t.carrierCode = a.carrierCode || o[0].carrierCode;
                    break;

                  case "3":
                    t.invoiceTypeName = "专用发票", t.invoiceTitleTypeName = i[2].company, t.invoiceType = a.invoiceType, 
                    t.invoiceTitleType = a.titleType, t.carrierCode = a.carrierCode || o[0].carrierCode;
                    break;

                  case "2":
                    t.invoiceTypeName = "电子普通发票", "2" == a.titleType ? t.invoiceTitleTypeName = i[1].company : t.invoiceTitleTypeName = "个人", 
                    t.invoiceType = e.data.ucToorder[a.invoiceType], t.invoiceTitleType = a.titleType, 
                    t.carrierCode = a.carrierCode || o[0].carrierCode;
                }
            }) : "2" == e.data.orderTouc[o[0].defaultInvoiceType] ? (t.invoiceTypeName = "电子普通发票", 
            t.invoiceTitleTypeName = "个人", t.invoiceType = "50", t.invoiceTitleType = "1", t.carrierCode = o[0].carrierCode) : "1" == e.data.orderTouc[o[0].defaultInvoiceType] ? (t.invoiceTypeName = "纸质普通发票", 
            t.invoiceTitleTypeName = "个人", t.invoiceType = "1", t.invoiceTitleType = "1", t.carrierCode = o[0].carrierCode) : "0" == e.data.orderTouc[o[0].defaultInvoiceType] ? (t.invoiceTypeName = "不开发票", 
            t.invoiceType = "0", t.invoiceTitleTypeName = "", t.carrierCode = o[0].carrierCode) : (t.invoiceTypeName = "发票信息", 
            t.invoiceTitleTypeName = "选择发票类型", t.invoiceType = "", t.invoiceTitleType = "", 
            t.carrierCode = o[0].carrierCode);
        } else "2" == e.data.orderTouc[o[0].defaultInvoiceType] ? (t.invoiceTypeName = "电子普通发票", 
        t.invoiceTitleTypeName = "个人", t.invoiceType = "50", t.invoiceTitleType = "1", t.carrierCode = o[0].carrierCode) : "1" == e.data.orderTouc[o[0].defaultInvoiceType] ? (t.invoiceTypeName = "纸质普通发票", 
        t.invoiceTitleTypeName = "个人", t.invoiceType = "1", t.invoiceTitleType = "1", t.carrierCode = o[0].carrierCode) : "0" == e.data.orderTouc[o[0].defaultInvoiceType] ? (t.invoiceTypeName = "不开发票", 
        t.invoiceType = "0", t.invoiceTitleTypeName = "", t.carrierCode = o[0].carrierCode) : (t.invoiceTypeName = "发票信息", 
        t.invoiceTitleTypeName = "选择发票类型", t.invoiceType = "", t.invoiceTitleType = "", 
        t.carrierCode = o[0].carrierCode);
        e.setData({
            invoiceShowData: t
        });
    },
    removeProducts: function() {
        var e = this, o = this, a = o.data.orderReq;
        a.couponList && !a.couponList[0] && (a.couponList = []), o.setData({
            showInvalid: !1,
            isCreateClicked: !1
        }), t.getCsrf(function(n) {
            t.mpPost(i.service.openApiDomain + "/mcp/v1/buildOrder", a, {
                successFunc: function(t) {
                    var i = t.data;
                    if (!t.data.success) return o.setData({
                        couponTipsClass: "",
                        couponTips: t.data.info
                    }), !1;
                    if (o.setData({
                        userManulCouponCode: "",
                        showCoupon: !1,
                        couponTipsClass: "hide"
                    }), t.data.confirmVOLists) {
                        var a = t.data.confirmVOLists, n = a[0].effectiveCoupons || [];
                        (a = o.handlePrice(a))[0].effectiveCoupons = o.handleCoupons(n, !0);
                        var r = a[0].invalidCoupons || [];
                        a[0].invalidCoupons = o.handleCoupons(r, !1), a[0].usedCouponInfos || (a[0].usedCouponInfos = [], 
                        a[0].usedCouponInfos[0] = {
                            couponCode: "0000"
                        }), o.setData({
                            confirmVOLists: t.data.confirmVOLists
                        });
                    }
                    var s = o.data.orderReq;
                    o.data.goDelivery && o.getDeliveryAddress(i), o.data.confirmVOLists[0] && o.data.confirmVOLists[0].usedCouponInfos && (o.data.couponReq.couponCodes = o.data.confirmVOLists[0].usedCouponInfos.map(function(e) {
                        return e.couponCode;
                    }), 0 == s.couponList.length ? s.couponList.push(o.data.couponReq) : s.couponList[0].couponCodes = o.data.couponReq.couponCodes), 
                    t.data.confirmVOLists && t.data.confirmVOLists[0].carrierCode && (o.data.couponReq.carrierCode = t.data.confirmVOLists[0].carrierCode, 
                    0 == s.couponList.length && s.couponList.push(o.data.couponReq)), o.setData({
                        orderReq: s
                    }), wx.setStorageSync("confirmVOList", o.data.confirmVOLists[0]), wx.getStorageSync("invoiceInfoForConfirm") && o.getDefaultInvoiceType(), 
                    e.getInvoiceInfo();
                }
            }, {
                CsrfToken: n
            });
        }, function() {
            o.setData({
                couponTipsClass: ""
            }), wx.showModal({
                title: "提示",
                content: "操作失败，请稍后重试",
                showCancel: !1
            });
        });
    },
    useCouponManual: function(e) {
        return !this.data.isExchangeSelected && "button-style-1-big-disabled" != this.data.couponDH && (this.data.isExchangeSelected = !0, 
        "" == this.data.userManulCouponCode.trim() ? (this.setData({
            couponTipsClass: "",
            couponTips: "请输入优惠券码"
        }), this.data.isExchangeSelected = !1, !1) : void this.buildOrder());
    },
    checkValue: function(e) {
        this.data.userManulCouponCode = e.detail.value, "" == this.data.userManulCouponCode.trim() ? this.setData({
            couponDH: "button-style-1-big-disabled"
        }) : this.setData({
            couponDH: "button-style-1-big"
        });
    },
    changeAddress: function(e) {
        wx.navigateTo({
            url: "../addressList/addressList"
        });
    },
    confirmCoupon: function() {
        wx.setStorageSync("couponListForCouponDialog", this.data.orderReq.couponList);
        var e = this;
        if (e.data.supportClickedFlag) return !1;
        e.data.userManulCouponCode && e.setData({
            userManulCouponCode: ""
        }), e.setData({
            supportClickedFlag: !0
        }), setTimeout(function() {
            e.setData({
                supportClickedFlag: !1
            });
        }, 400);
        var o = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        e.animation = o, o.translateY(300).step(), e.data.orderReq.couponList = wx.getStorageSync("couponListForCouponDialog"), 
        e.setData({
            animationData: o.export()
        }), setTimeout(function() {
            o.translateY(0).step(), e.setData({
                animationData: o.export(),
                showCoupon: !1
            });
        }.bind(e), 200);
    },
    queryPoint: function() {
        var e = this;
        t.mpPromiseGet(getApp().globalData.config.service.openApiDomain + "/mcp/queryUserPointBalanceDetail", {
            country: "CN",
            ifHisDetail: 2,
            lang: "zh-CN",
            pageNum: 1,
            pageSize: 10
        }).then(function(o) {
            o.data.success ? e.setData({
                pointBlance: o.data.pointBlance
            }) : e.setData({
                pointBlance: 0
            });
        }).catch(function() {
            e.setData({
                pointBlance: 0
            });
        });
    },
    pointSwitch: function() {
        var o = this, a = o.getOrderReq(), n = o.data.isUsePoint;
        if (o.data.isLoadingOrderData) return !1;
        a.enablePoint = !n, o.data.isLoadingOrderData = !0, t.getCsrf(function(r) {
            t.mpPost(i.service.openApiDomain + "/mcp/v1/buildOrder", a, {
                successFunc: function(t) {
                    var i, r = t.data;
                    if (!r.success) return o.data.isLoadingOrderData = !1, a.enablePoint = !a.enablePoint, 
                    o.showErrorModal(), !1;
                    o.setData((i = {}, e(i, "confirmVOLists[0].cashPay", r.confirmVOLists[0].cashPay.toFixed(2)), 
                    e(i, "confirmVOLists[0].pointConsumed", r.confirmVOLists[0].pointConsumed), e(i, "confirmVOLists[0].pointPay", r.confirmVOLists[0].pointPay.toFixed(2)), 
                    e(i, "isUsePoint", !n), i)), o.data.isLoadingOrderData = !1;
                },
                failFunc: function(e) {
                    a.enablePoint = !a.enablePoint, o.showErrorModal(), o.data.isLoadingOrderData = !1;
                }
            }, {
                CsrfToken: r
            });
        }, function() {
            a.enablePoint = !a.enablePoint, o.showErrorModal(), o.data.isLoadingOrderData = !1;
        });
    },
    showtips: function() {
        var e = this;
        e.setData({
            isShowPointRule: !e.data.isShowPointRule
        });
    },
    switchAccount: function(e) {
        var o = this;
        if (t.repeatTap.stop(o, e)) return !1;
        o.setData({
            isSwitchAccount: !o.data.isSwitchAccount
        });
    },
    loginHuawei: function(e) {
        var i = this;
        if (t.repeatTap.stop(i, e)) return !1;
        wx.showLoading({
            mask: !0,
            title: ""
        }), i.setData({
            isSwitchAccount: !1
        }), wx.getStorageSync("mpUid") ? t.mpLogin(o, function(e) {
            e && e.data && e.data.success ? (wx.hideLoading(), i.setData({
                isHuaweiLogin: !1
            }), i.cleanAllInfo(function() {
                i.refreshPage();
            })) : wx.showToast({
                title: "帐号切换失败，请稍后重试",
                icon: "none"
            });
        }, !1, "1") : i.getBindStatus();
    },
    getBindStatus: function() {
        var e = this;
        wx.login({
            success: function(i) {
                if (i.code) {
                    var a = wx.getStorageSync("upuuid") || "", n = wx.getStorageSync("uuidEncode") || "";
                    if (a && n) e.ThirdAuth(i.code, a, n); else {
                        var r = t.uuid();
                        t.encryptAESCBC(o, "", r, function(o) {
                            wx.setStorageSync("upuuid", r), wx.setStorageSync("uuidEncode", o.ivbyte + ":" + o.context), 
                            e.ThirdAuth(i.code, r, o.ivbyte + ":" + o.context);
                        }, function() {
                            wx.hideLoading(), wx.showModal({
                                title: "提示",
                                content: "出错了请稍后再试！",
                                showCancel: !1
                            });
                        });
                    }
                }
            }
        });
    },
    ThirdAuth: function(e, o, a) {
        var n = this, r = t.mpBuildAuthReqParam(e, o, a);
        t.mpPostForUP(i.service.upDomain + "/AccountServer/IUserInfoMng/userThirdAuthV2", r, {
            successFunc: function(e) {
                var o = e.header["Set-Cookie"] || e.header["set-cookie"];
                n.setData({
                    loginCookie: o
                }), n.showConectedStatus(e, !1);
            }
        });
    },
    showConectedStatus: function(e, n) {
        var r = this, s = new a.DOMParser().parseFromString(e.data), c = s.getElementsByTagName("result"), d = s.getElementsByTagName("errorDesc").length > 0 ? s.getElementsByTagName("errorDesc")[0].firstChild.nodeValue : "", u = c.length > 0 ? c[0].getAttribute("resultCode") : "";
        if (n && this.setData({
            secondAuthShow: !1
        }), "0" == u) {
            var p = s.getElementsByTagName("userID")[0].firstChild.nodeValue;
            "-1" == p ? wx.navigateTo({
                url: "../linkingAccount/linkingSelect",
                complete: function() {
                    wx.hideLoading();
                }
            }) : (wx.setStorageSync("checkBindStatus", !0), wx.setStorageSync("mpUid", p), t.mpGet(i.service.openApiDomain + "/mcp/account/mpBindUpAccount", {
                mpUid: p
            }, {
                successFunc: function(e) {
                    r.optionStorage(), t.mpLogin(o, function(e) {
                        e && e.data && e.data.success ? (wx.hideLoading(), r.data.authOptionFlag = 1, r.cleanAllInfo(function() {
                            r.refreshPage();
                        })) : wx.showToast({
                            title: "帐号切换失败，请稍后重试",
                            icon: "none"
                        });
                    }, !1);
                }
            }));
            var l = s.getElementsByTagName("thirdAccessToken").length > 0 ? s.getElementsByTagName("thirdAccessToken")[0].firstChild.nodeValue : "", f = s.getElementsByTagName("thirdOpenID").length > 0 ? s.getElementsByTagName("thirdOpenID")[0].firstChild.nodeValue : "";
            l ? (wx.setStorageSync("thirdAccessToken", l), wx.setStorageSync("thirdOpenID", f)) : wx.showModal({
                title: "提示",
                content: "无法获取数据，请稍后重试",
                showCancel: !1
            });
        } else if (wx.hideLoading(), "70002072" != u && "70012072" != u && "70002080" != u || !d || n) wx.showModal({
            title: "提示",
            content: "无法获取数据，请稍后重试",
            showCancel: !1
        }); else {
            var v = JSON.parse(d);
            if (v.authCodeSentList && v.authCodeSentList.length > 0) {
                var y = [], h = [];
                v.authCodeSentList.forEach(function(e, o) {
                    y.push(e.name), h.push(e.accountType);
                }), r.setData({
                    secondAuthTypeArray: y,
                    secondAuthAccountTypeArray: h,
                    secondAuthShow: !0
                });
            }
        }
    },
    nextStep: function(e) {
        var o = this;
        o.data.secondAuthCode = e.detail.secondAuthCode, o.secondUserThirdAuthV2();
    },
    secondUserThirdAuthV2: function() {
        var e = this, o = e.data.secondAuthTypeArray[e.data.secondAuthTypeIndex], a = e.data.secondAuthAccountTypeArray[e.data.secondAuthTypeIndex], n = e.data.secondAuthCode;
        wx.login({
            success: function(r) {
                if (r.code) {
                    var s = wx.getStorageSync("upuuid") || "", c = wx.getStorageSync("uuidEncode") || "";
                    if (s && c) {
                        var d = t.mpBuildAuthSecondReqParam(r.code, s, c, n, a, o);
                        t.mpPostForUP(i.service.upDomain + "/AccountServer/IUserInfoMng/userThirdAuthV2", d, {
                            successFunc: function(o) {
                                e.showConectedStatus(o, !0);
                            }
                        }, {
                            Cookie: e.data.loginCookie.split(";")[0]
                        });
                    }
                }
            }
        });
    },
    toUserAgreement: function(e) {
        var o = this;
        if (t.repeatTap.stop(o, e)) return !1;
        wx.navigateTo({
            url: "/pages/webview/webview?url=" + i.service.webViewDomain + "/mcp/hwyhxy.html&title=华为商城用户协议&comeFrom=person"
        }), t.mpReport(400050104, {
            click: "1"
        });
    },
    toPrivacyAgreement: function(e) {
        var o = this;
        if (t.repeatTap.stop(o, e)) return !1;
        wx.navigateTo({
            url: "/pages/privacyAgreement/privacyAgreement"
        }), t.mpReport(400050103, {
            click: "1"
        });
    },
    optionStorage: function() {
        var e = t.keepIndexTipsState();
        wx.clearStorageSync(), wx.setStorageSync("prdTipsHide", e.prdTipsHide), wx.setStorageSync("maskGuideHide", e.maskGuideHide), 
        wx.setStorageSync("isTipsHadShow", e.isTipsHadShow), wx.setStorageSync("authorizeUserInfo", e.authorizeUserInfo);
    },
    cleanAllInfo: function(e) {
        var o = this;
        o.setData({
            shoppingConfigVO: {},
            orderReq: {
                orderItemReqArgs: [],
                enablePoint: !1,
                orderSouce: "18",
                couponList: [],
                orderType: "0",
                salePortal: "4",
                carrierInvoiceVOs: [],
                deliveryName: "门店自提",
                deliveryMethod: "999",
                offlineShopAddressInfo: {},
                autoUseCoupon: !0,
                autoMultipleCoupon: !0,
                inutCoupon: 0,
                exchangeCouponCode: ""
            },
            couponReq: {},
            confirmVOLists: [],
            hasAddress: !1,
            userInvoiceInfoVO: {},
            invoiceShowData: {
                invoiceTypeName: "",
                invoiceType: "",
                invoiceTitleTypeName: "",
                invoiceTitleType: ""
            },
            invoiceShowDataString: "{}",
            invoiceTypes: [ {
                type: "1",
                invoiceName: "纸质普通发票",
                titleType: ""
            }, {
                type: "50",
                invoiceName: "电子普通发票",
                titleType: ""
            }, {
                type: "3",
                invoiceName: "专用发票"
            }, {
                type: "0",
                invoiceName: "不开发票"
            } ],
            showInvalid: !1,
            userManulCouponCode: "",
            couponTipsClass: "hide",
            couponTips: "优惠券码输入有误，请重新输入",
            needRemoveAll: !1,
            isCreateClicked: !1,
            isCouponSelected: !1,
            isExchangeSelected: !1,
            couponDClicked: !1,
            removeTips: "部分商品暂不可购买",
            goStore: !1,
            goDelivery: !0,
            isDisable: !1,
            offlineShopInfo: {
                province: "",
                city: "",
                district: "",
                street: "",
                address: "",
                shopTelephone: "",
                businessHrs: "",
                shopName: ""
            },
            orderDeliveryAddress: {
                consignee: "",
                mobile: "",
                province: "",
                city: "",
                district: "",
                street: "",
                address: ""
            },
            refreshStatus: !1,
            disableAll: !1,
            disableContent: "",
            isGoToStore: !1,
            supportClickedFlag: !1,
            shopCarrierName: "",
            fromDefaultInvoice: !1,
            showTip: !1,
            templateContent: "",
            teamBuyInfo: {},
            isConfirmBtnClicked: !1,
            needL4Addr: !1,
            toastState: !1,
            needStore: !1,
            isLoadingOrderData: !1,
            isLuckyOrder: !1,
            couponDH: "button-style-1-big-disabled",
            isUsePoint: !1,
            isShowPointRule: !1,
            isSwitchAccount: !1,
            isShowLogin: !1,
            secondAuthTypeIndex: 0,
            sameId: !1,
            pointBlance: 0
        }, function() {
            o.saveProductInfo(o.data.query), wx.removeStorageSync("invoiceInfoForConfirm"), 
            e && e();
        });
    }
});

var n = function(e) {
    return e.split(" ")[0].replace(/-/g, ".");
};