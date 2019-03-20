function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e, a = getApp(), s = a.globalData.mp, r = a.globalData.config, i = "1";

Page({
    data: (e = {
        isCanClick: !1,
        isShowModal: !1,
        isChooseStatus: !1,
        cdnPath: r.service.cdnPath,
        loading: !1,
        stateIdx: 0,
        reasonIdx: 0,
        rmaStatus: 0,
        shopTitle: "",
        isChooseReason: !1,
        isReturnExchangeAll: !1,
        isSelectState: !1,
        wordCount: 0,
        totalChooseCount: 0,
        showReasonTitle: "请选择换货商品",
        hasWord: !1,
        hasPrdInfo: !1,
        placeholder: "",
        reasonArray: [],
        repairTypeArr: [],
        reasonTitle: "退货原因",
        orderCode: "",
        applyType: "",
        products: [],
        repairReasonList: [],
        repairType: "0",
        problemDescription: "",
        showRegionPicker: !1,
        region: {
            province: "",
            provinceName: "请选择",
            city: "",
            cityName: "",
            district: "",
            districtName: "",
            street: "",
            streetName: ""
        },
        newAddress: {
            address: "",
            city: "",
            cityName: "",
            consignee: "",
            district: "",
            districtName: "",
            mobile: "",
            needL4Addr: !1,
            needModify: "",
            province: "",
            provinceName: "",
            street: "",
            streetName: ""
        },
        isRepeatClicked: !1,
        clearIcons: {
            consignee: "hide",
            mobile: "hide",
            address: "hide"
        }
    }, t(e, "isRepeatClicked", !1), t(e, "errorinfo", "此订单的商品已全部办理退换货，\n不可重复操作"), t(e, "isIOS", !1), 
    e),
    onLoad: function(t) {
        wx.hideShareMenu();
        var e = this, a = "1" == (i = t.applyType) ? "退货原因" : "换货原因", s = "1" == i ? "请选择退货商品" : "请选择换货商品";
        this.setData({
            orderCode: t.orderCode,
            applyType: t.applyType,
            reasonTitle: a,
            reasonArray: [ "请选择" ],
            showReasonTitle: s,
            repairType: "0"
        }), o(this), wx.getSystemInfo({
            success: function(t) {
                "iOS" == t.system.split(" ")[0] && e.setData({
                    isIOS: !0
                });
            }
        });
    },
    bindProblemDescription: function(t) {
        this.data.problemDescription = t.detail.value, this.setData({
            wordCount: t.detail.value.length,
            hasWord: t.detail.value.length > 0
        });
    },
    bindStatePickerChange: function(t) {
        var e = [], a = [];
        e = this.data.repairReasonList[t.detail.value].repairReasonArr, this.data.repairReasonList[t.detail.value].repairTypeArr && (a = this.data.repairReasonList[t.detail.value].repairTypeArr), 
        e.length > 1 ? this.setData({
            isSelectState: !0,
            isChooseStatus: !0
        }) : this.setData({
            isSelectState: !1,
            isChooseStatus: !1
        }), this.setData({
            isChooseReason: !1,
            reasonIdx: 0,
            reasonArray: e,
            repairTypeArr: a,
            stateIdx: parseInt(t.detail.value),
            isReturnExchangeAll: !1
        }), n(this);
    },
    bindReasonPickerChange: function(t) {
        var e = !0, a = this;
        if (this.data.repairTypeArr[parseInt(t.detail.value)]) s = this.data.repairTypeArr[parseInt(t.detail.value)]; else var s = "0";
        "0" == t.detail.value && (e = !1);
        var r = this.data.products;
        if ("1" == s) r.forEach(function(t, e) {
            t.quantity > 0 && (t.quantity = t.chooseQuantity), t.subProductList && t.subProductList.length > 0 && t.subProductList.forEach(function(t, e) {
                t.quantity > 0 && (t.quantity = t.chooseQuantity);
            });
        }), this.setData({
            isChooseReason: e,
            products: r,
            isReturnExchangeAll: !1,
            reasonIdx: parseInt(t.detail.value),
            repairType: s
        }); else {
            var i = !0;
            r.forEach(function(t, e) {
                if (t.chooseQuantity != t.max || !t.isChecked) return i = !1, !1;
                t.subProductList.forEach(function(t, e) {
                    if (t.chooseQuantity != t.max || !t.isChecked) return i = !1, !1;
                });
            }), i || 0 == t.detail.value ? i ? (r.forEach(function(t, e) {
                t.checked = !0, t.isChecked = !0, t.quantity = t.max, t.chooseQuantity = t.max, 
                t.subProductList && t.subProductList.length > 0 && t.subProductList.forEach(function(t, e) {
                    t.quantity = t.max, t.checked = !0, t.isChecked = !0, t.chooseQuantity = t.max;
                });
            }), a.setData({
                products: r,
                isReturnExchangeAll: 0 != t.detail.value,
                isChooseReason: e,
                reasonIdx: parseInt(t.detail.value),
                repairType: s
            })) : this.setData({
                isChooseReason: e,
                isReturnExchangeAll: 0 != t.detail.value,
                reasonIdx: parseInt(t.detail.value),
                repairType: s
            }) : this.setData({
                detailValue: t.detail.value,
                isShowModal: !0,
                problemDescription: a.data.problemDescription,
                needProducts: r,
                needRepairType: s,
                modelInfo: a.data.repairReasonList[a.data.stateIdx] && a.data.repairReasonList[a.data.stateIdx].msgForSelectAllArr && a.data.repairReasonList[a.data.stateIdx].msgForSelectAllArr[t.detail.value - 1] ? a.data.repairReasonList[a.data.stateIdx].msgForSelectAllArr[t.detail.value - 1] : "请选择全部商品进行退换货"
            });
        }
    },
    pickerChose: function() {
        0 == this.data.isSelectState && wx.showToast({
            title: "请先选择包裹状态！",
            icon: "none"
        });
    },
    cancel: function() {
        var t = this;
        t.setData({
            isShowModal: !1,
            problemDescription: t.data.problemDescription,
            isChooseReason: !1,
            reasonIdx: 0,
            reasonArray: [ "请选择" ],
            isSelectState: !1,
            isChooseStatus: !1,
            repairTypeArr: [],
            stateIdx: 0,
            isReturnExchangeAll: !1
        }), n(t);
    },
    confirm: function() {
        var t = this, e = this.data.needProducts;
        e.forEach(function(t, e) {
            t.checked = !0, t.isChecked = !0, t.quantity = t.max, t.chooseQuantity = t.max, 
            t.subProductList && t.subProductList.length > 0 && t.subProductList.forEach(function(t, e) {
                t.quantity = t.max, t.checked = !0, t.isChecked = !0, t.chooseQuantity = t.max;
            });
        }), t.setData({
            isShowModal: !1,
            problemDescription: t.data.problemDescription,
            products: e,
            isChooseReason: !0,
            isReturnExchangeAll: !0,
            reasonIdx: parseInt(t.data.detailValue),
            repairType: t.data.needRepairType
        }), wx.pageScrollTo && wx.pageScrollTo({
            scrollTop: 0
        }), n(t);
    },
    checkitem: function(t) {
        var e = this, a = e.data.products, s = e.data.totalChooseCount;
        if (e.data.isChooseReason) {
            if ("1" == e.data.repairType && "2" == e.data.applyType) {
                var r = t.currentTarget.dataset.index;
                if ("prd" == t.currentTarget.dataset.type) a[r].isChecked = !a[r].isChecked; else {
                    var i = t.currentTarget.dataset.prdidx, o = t.currentTarget.dataset.index;
                    a[i].subProductList[o].isChecked = !a[i].subProductList[o].isChecked;
                }
                e.setData({
                    products: a,
                    totalChooseCount: s
                });
            }
            if ("1" == e.data.repairType && "1" == e.data.applyType) {
                var d = t.currentTarget.dataset.index;
                "prd" == t.currentTarget.dataset.type && (a[d].isChecked = !a[d].isChecked), a[d].subProductList && a[d].subProductList.length > 0 && a[d].subProductList.forEach(function(t, e) {
                    t.isChecked = a[d].isChecked;
                }), s++, e.setData({
                    products: a,
                    totalChooseCount: s
                });
            }
        } else {
            var c = t.currentTarget.dataset.index;
            if ("prd" == t.currentTarget.dataset.type) a[c].isChecked = !a[c].isChecked, "1" == e.data.applyType && a[c].subProductList && a[c].subProductList.length > 0 && a[c].subProductList.forEach(function(t, e) {
                t.isChecked = a[c].isChecked;
            }); else {
                var u = t.currentTarget.dataset.prdidx, h = t.currentTarget.dataset.index;
                a[u].subProductList[h].isChecked = !a[u].subProductList[h].isChecked;
            }
            e.setData({
                products: a,
                totalChooseCount: s
            });
        }
        n(e);
    },
    minusAmt: function(t) {
        var e = this, a = e.data.products, s = t.currentTarget.dataset.checked;
        if (e.data.isChooseReason) {
            if ("1" == e.data.repairType && "2" == e.data.applyType && s) {
                if ("prd" == t.currentTarget.dataset.type) {
                    var r = t.currentTarget.dataset.index;
                    a[r].quantity > 1 && (a[r].quantity--, a[r].chooseQuantity = a[r].quantity);
                } else {
                    var i = t.currentTarget.dataset.prdidx, o = t.currentTarget.dataset.index;
                    a[i].subProductList[o].quantity > 1 && (a[i].subProductList[o].quantity--, a[i].subProductList[o].chooseQuantity = a[i].subProductList[o].quantity);
                }
                e.setData({
                    products: a
                });
            }
            if ("1" == e.data.repairType && "1" == e.data.applyType && "prd" == t.currentTarget.dataset.type) {
                var d = t.currentTarget.dataset.index;
                a[d].quantity > 1 && (a[d].quantity--, a[d].chooseQuantity = a[d].quantity, a[d].subProductList && a[d].subProductList.length > 0 && a[d].subProductList.forEach(function(t, e) {
                    a[d].quantity < t.max && (t.quantity = a[d].quantity, t.chooseQuantity = a[d].quantity);
                })), e.setData({
                    products: a
                });
            }
        } else if (s) {
            if ("prd" == t.currentTarget.dataset.type) {
                var c = t.currentTarget.dataset.index;
                a[c].chooseQuantity > 1 && a[c].chooseQuantity--, "1" == e.data.applyType && a[c].subProductList && a[c].subProductList.length > 0 && a[c].subProductList.forEach(function(t, e) {
                    a[c].chooseQuantity < t.max && (t.chooseQuantity = a[c].chooseQuantity);
                });
            } else {
                var u = t.currentTarget.dataset.prdidx, h = t.currentTarget.dataset.index;
                a[u].subProductList[h].chooseQuantity > 1 && a[u].subProductList[h].chooseQuantity--;
            }
            e.setData({
                products: a
            });
        }
        n(e);
    },
    addAmt: function(t) {
        var e = this, a = e.data.products, s = t.currentTarget.dataset.checked;
        if (e.data.isChooseReason) {
            if ("1" == e.data.repairType && "2" == e.data.applyType && s) {
                var r = t.currentTarget.dataset.index;
                if ("prd" == t.currentTarget.dataset.type) a[r].quantity < a[r].max && (a[r].quantity++, 
                a[r].chooseQuantity = a[r].quantity); else {
                    var i = t.currentTarget.dataset.prdidx, o = t.currentTarget.dataset.index;
                    a[i].subProductList[o].quantity < a[i].subProductList[o].max && (a[i].subProductList[o].quantity++, 
                    a[i].subProductList[o].chooseQuantity = a[i].subProductList[o].quantity);
                }
                e.setData({
                    products: a
                });
            }
            if ("1" == e.data.repairType && "1" == e.data.applyType) {
                var d = t.currentTarget.dataset.index;
                "prd" == t.currentTarget.dataset.type && (a[d].quantity < a[d].max && (a[d].quantity++, 
                a[d].chooseQuantity = a[d].quantity, a[d].subProductList && a[d].subProductList.length > 0 && a[d].subProductList.forEach(function(t, e) {
                    a[d].quantity <= t.max && (t.quantity = a[d].quantity, t.chooseQuantity = a[d].quantity);
                })), e.setData({
                    products: a
                }));
            }
        } else if (s) {
            var c = t.currentTarget.dataset.index;
            if ("prd" == t.currentTarget.dataset.type) a[c].chooseQuantity < a[c].max && a[c].chooseQuantity++, 
            "1" == e.data.applyType && a[c].subProductList && a[c].subProductList.length > 0 && a[c].subProductList.forEach(function(t, e) {
                a[c].chooseQuantity <= t.max && (t.chooseQuantity = a[c].chooseQuantity);
            }); else {
                var u = t.currentTarget.dataset.prdidx, h = t.currentTarget.dataset.index;
                a[u].subProductList[h].chooseQuantity < a[u].subProductList[h].max && a[u].subProductList[h].chooseQuantity++;
            }
            e.setData({
                products: a
            });
        }
        n(e);
    },
    addReturnExchangeOrder: function() {
        var t = this.data.newAddress;
        t.province = this.data.newAddress.province, t.city = this.data.newAddress.city, 
        t.district = this.data.newAddress.district, t.street = this.data.newAddress.street, 
        t.provinceName = this.data.newAddress.provinceName, t.cityName = this.data.newAddress.cityName, 
        t.districtName = this.data.newAddress.districtName, t.streetName = this.data.newAddress.streetName;
        var e = this;
        this.setData({
            newAddress: t
        });
        var a = [];
        if (this.data.products.forEach(function(t, s) {
            if (e.data.isReturnExchangeAll) {
                if (t.checked && t.quantity > 0 && a.push({
                    skuCode: t.skuCode,
                    orderProductCode: t.orderProductCode,
                    productType: t.productType,
                    quantity: t.max
                }), "2" == e.data.applyType) t.subProductList && t.subProductList.length > 0 && t.subProductList.forEach(function(t, e) {
                    t.checked && a.push({
                        skuCode: t.skuCode,
                        orderProductCode: t.orderProductCode,
                        productType: t.productType,
                        quantity: t.max
                    });
                }); else if (t.subProductList && t.subProductList.length > 0) {
                    if (!a[s]) return !1;
                    a[s].subProductList = [], t.subProductList.forEach(function(t, e) {
                        t.checked && a[s].subProductList.push({
                            skuCode: t.skuCode,
                            orderProductCode: t.orderProductCode,
                            productType: t.productType,
                            quantity: t.max
                        });
                    });
                }
            } else if (t.isChecked && t.quantity > 0 && a.push({
                skuCode: t.skuCode,
                orderProductCode: t.orderProductCode,
                productType: t.productType,
                quantity: e.data.isChooseReason ? t.quantity : t.chooseQuantity
            }), "2" == e.data.applyType) t.subProductList && t.subProductList.length > 0 && t.subProductList.forEach(function(t, s) {
                t.isChecked && a.push({
                    skuCode: t.skuCode,
                    orderProductCode: t.orderProductCode,
                    productType: t.productType,
                    quantity: e.data.isChooseReason ? t.quantity : t.chooseQuantity
                });
            }); else if (t.subProductList && t.subProductList.length > 0 && t.isChecked) {
                if (!a[a.length - 1]) return !1;
                a[a.length - 1].subProductList = [], t.subProductList.forEach(function(e, s) {
                    a[a.length - 1].subProductList.push({
                        skuCode: e.skuCode,
                        orderProductCode: e.orderProductCode,
                        productType: e.productType,
                        quantity: t.quantity
                    });
                });
            }
        }), 0 == a.length && 0 == e.data.isCanClick) return "1" == e.data.applyType ? wx.showModal({
            title: "提示",
            content: "请选择需要退货的商品",
            showCancel: !1
        }) : wx.showModal({
            title: "提示",
            content: "请选择需要换货的商品",
            showCancel: !1
        }), !1;
        var i = {
            consignee: [ this.data.newAddress.consignee, /^[A-Za-z0-9\-\_\u4e00-\u9fa5]{2,10}$/, "联系人只支持中英文、数字、下划线或减号(2-10个字)" ],
            mobile: [ this.data.newAddress.mobile, /^1[0-9]{10}$/, "手机号码格式不正确" ],
            address: [ this.data.newAddress.address.replace(/[\r\n]/g, ""), /^.{2,50}$/, "请输入详细地址(2-50个字)" ]
        };
        if (0 == this.data.stateIdx) return !1;
        if (0 == this.data.reasonIdx) return !1;
        if (this.data.problemDescription.length < 1) return wx.showModal({
            title: "提示",
            content: "请输入问题描述！",
            showCancel: !1
        }), !1;
        if (this.data.problemDescription.length < 5 && this.data.problemDescription.length > 0) return wx.showModal({
            title: "提示",
            content: "请输入问题描述（5-500个字）！",
            showCancel: !1
        }), !1;
        var o = s.vilidateFilter.specialChar(this.data.problemDescription);
        if (!1 !== o) return wx.showModal({
            title: "提示",
            content: "为了客服更好的理解您的诉求，已帮您过滤不能识别的字符",
            showCancel: !1,
            success: function(t) {
                t.confirm && e.setData({
                    problemDescription: o
                });
            }
        }), !1;
        if (this.data.newAddress.consignee.length < 1) return wx.showModal({
            title: "提示",
            content: "联系人请输入2-10个字",
            showCancel: !1
        }), !1;
        if (this.data.newAddress.mobile.length < 1) return wx.showModal({
            title: "提示",
            content: "请输入手机号码",
            showCancel: !1
        }), !1;
        if ("2" == this.data.applyType) {
            if ("" == this.data.newAddress.province) return wx.showModal({
                title: "提示",
                content: "请选择地区！",
                showCancel: !1
            }), !1;
            if (this.data.newAddress.needL4Addr) return wx.showModal({
                title: "提示",
                content: "更完整的收货地址，能让快递小哥跑得更快哦",
                showCancel: !1
            }), !1;
            if (this.data.newAddress.address.length < 1) return wx.showModal({
                title: "提示",
                content: "请输入详细地址",
                showCancel: !1
            }), !1;
        }
        for (var n in i) {
            var d = i[n], c = d[0], u = d[1], h = d[2];
            if (!u.test(c)) return wx.showModal({
                title: "提示",
                content: h,
                showCancel: !1
            }), !1;
        }
        if (this.data.isRepeatClicked) return !1;
        this.setData({
            isRepeatClicked: !0
        }), setTimeout(function() {
            e.setData({
                isRepeatClicked: !1
            });
        }, 3e3);
        var p = "" + (this.data.stateIdx > 0) ? this.data.stateIdx - 1 : 0, l = "" + this.data.repairReasonList[this.data.stateIdx].repairReasonCodeArr[this.data.reasonIdx], y = "" + this.data.repairReasonList[this.data.stateIdx].repairTypeArr[this.data.reasonIdx], f = {
            orderCode: this.data.orderCode,
            applyType: this.data.applyType,
            orderAddressInfo: [ this.data.newAddress ],
            repairReason: l,
            packageStatus: p,
            repairType: y,
            problemDescription: this.data.problemDescription,
            rmaProductList: a
        };
        s.getCsrf(function(t) {
            s.mpPost(r.service.openApiDomain + "/mcp/v1/createRmaOrder", f, {
                successFunc: function(t) {
                    t.data.success ? wx.navigateTo({
                        url: "/pages/returnOrExchange/returnExchangeResult?applyType=" + e.data.applyType
                    }) : wx.showModal({
                        title: "提示",
                        content: t.data.info || t.data.msg,
                        showCancel: !1
                    });
                },
                failFunc: function(t) {
                    wx.showModal({
                        title: "提示",
                        content: "出错了",
                        showCancel: !1
                    });
                }
            }, {
                CsrfToken: t
            });
        }, function() {
            wx.showModal({
                title: "提示",
                content: "出错了",
                showCancel: !1
            });
        });
    },
    checkValue: function(t) {
        var e = {
            consignee: "hide",
            mobile: "hide",
            address: "hide"
        };
        "input" == t.type && "" != t.detail.value || "" != t.detail.value ? e[t.currentTarget.id] = "show" : e[t.currentTarget.id] = "hide", 
        this.setData({
            clearIcons: e
        });
        var a = this.data.newAddress;
        a[t.currentTarget.id] = t.detail.value, this.data.newAddress = a;
    },
    clearInputValue: function(t) {
        var e = this.data.clearIcons, a = this.data.newAddress;
        a[t.currentTarget.dataset.contentid] = "", e[t.currentTarget.dataset.contentid] = "hide", 
        this.setData({
            newAddress: a,
            clearIcons: e
        });
    },
    clearIcon: function(t) {
        var e = {
            consignee: "hide",
            mobile: "hide",
            address: "hide"
        };
        e[t.currentTarget.id] = "hide", this.setData({
            clearIcons: e
        });
    },
    toOpenAddress: function() {
        this.setData({
            showRegionPicker: !0
        });
    },
    toChangeRegion: function(t) {
        var e = this, a = t.detail.region, s = Object.assign(e.data.newAddress, a, {
            needL4Addr: t.detail.needL4Addr
        });
        e.setData({
            region: a,
            newAddress: s
        });
    },
    changeApplyType: function(e) {
        var a, s = this, r = e.currentTarget.dataset.index, i = r, d = "1" == i ? "退货原因" : "换货原因", c = "1" == i ? "请选择退货商品" : "请选择换货商品", u = s.data.products;
        if (i == s.data.applyType) return !1;
        u.forEach(function(t, e) {
            t.isChecked = !1, t.chooseQuantity = 1, t.subProductList && t.subProductList.length > 0 && t.subProductList.forEach(function(t, e) {
                t.isChecked = !1, t.chooseQuantity = 1;
            });
        }), s.setData((a = {
            isChooseReason: !1,
            applyType: r,
            reasonTitle: d
        }, t(a, "reasonTitle", d), t(a, "reasonArray", [ "请选择" ]), t(a, "isSelectState", !1), 
        t(a, "isChooseStatus", !1), t(a, "showReasonTitle", c), t(a, "repairType", "0"), 
        t(a, "isReturnExchangeAll", !1), t(a, "stateIdx", 0), t(a, "reasonIdx", 0), t(a, "totalChooseCount", 0), 
        t(a, "products", u), a)), o(this), n(s);
    }
});

var o = function(t) {
    s.getCsrf(function(e) {
        s.mpPost(r.service.openApiDomain + "/mcp/v1/buildRmaOrder", {
            orderCode: t.data.orderCode,
            applyType: t.data.applyType
        }, {
            successFunc: function(e) {
                if ((e = e.data).success) {
                    var a = [], s = {}, r = [];
                    t.setData({
                        showError: !1,
                        hasPrdInfo: !0
                    }), e.products && e.products.length > 0 && (a = e.products).forEach(function(t, e) {
                        t.max = t.quantity, t.chooseQuantity = 1, t.checked = !1, t.isChecked = !1, t.subProductList && t.subProductList.length > 0 && t.subProductList.forEach(function(t, e) {
                            t.checked = !1, t.isChecked = !1, t.max = t.quantity, t.chooseQuantity = 1;
                        });
                    }), e.orderAddressInfo && (s = e.orderAddressInfo), e.repairReasonList && e.repairReasonList.length > 0 && (r = d(e.repairReasonList)).unshift({
                        packageStatus: "",
                        packageStatusDesc: "请选择",
                        repairReason: "请选择",
                        repairReasonArr: [ "请选择" ]
                    }), t.setData({
                        products: a,
                        repairReasonList: r,
                        orderType: e.orderType,
                        newAddress: s,
                        shopCodeInfo: "1" == e.isSelfRun ? "本次服务由华为商城为您提供" : "本次服务由第三方为您提供",
                        rmaStatus: e.rmaStatus,
                        placeholder: "请输入问题描述（不少于5个字）",
                        region: {
                            province: s.province,
                            provinceName: s.provinceName,
                            city: s.city,
                            cityName: s.cityName,
                            district: s.district,
                            districtName: s.districtName,
                            street: s.street,
                            streetName: s.streetName
                        }
                    });
                } else t.setData({
                    showError: !0,
                    hasPrdInfo: !1
                }), "35210" != e.resultCode && t.setData({
                    errorinfo: "退换货失败，请稍后再试"
                });
            },
            failFunc: function() {
                wx.showToast({
                    title: "订单信息获取失败！",
                    icon: "none"
                });
            }
        }, {
            CsrfToken: e
        });
    }, function() {
        wx.showToast({
            title: "订单信息获取失败！",
            icon: "none"
        });
    });
}, n = function(t) {
    var e = 0, a = t.data.products;
    "1" == t.data.applyType ? t.data.isChooseReason && "1" != t.data.repairType ? a.forEach(function(t, a) {
        e += t.quantity, t.subProductList && t.subProductList.length > 0 && t.subProductList.forEach(function(t, a) {
            e += t.quantity;
        });
    }) : t.data.isChooseReason ? a.forEach(function(t, a) {
        t.isChecked && (e += t.quantity, t.subProductList && t.subProductList.length > 0 && t.subProductList.forEach(function(t, a) {
            e += t.quantity;
        }));
    }) : a.forEach(function(t, a) {
        t.isChecked && (e += t.chooseQuantity, t.subProductList && t.subProductList.length > 0 && t.subProductList.forEach(function(t, a) {
            e += t.chooseQuantity;
        }));
    }) : t.data.isChooseReason && "1" != t.data.repairType ? a.forEach(function(t, a) {
        e += t.quantity, t.subProductList.forEach(function(t, a) {
            e += t.quantity;
        });
    }) : t.data.isChooseReason ? a.forEach(function(t, a) {
        t.isChecked && (e += t.quantity), t.subProductList.forEach(function(t, a) {
            t.isChecked && (e += t.quantity);
        });
    }) : a.forEach(function(t, a) {
        t.isChecked && (e += t.chooseQuantity), t.subProductList.forEach(function(t, a) {
            t.isChecked && (e += t.chooseQuantity);
        });
    }), t.setData({
        totalChooseCount: e
    }), t.data.totalChooseCount > 0 ? t.setData({
        isCanClick: !0
    }) : t.setData({
        isCanClick: !1
    });
}, d = function(t) {
    for (var e = [], a = {}, s = 0; s < t.length; s++) if (t[s].repairReasonArr = [], 
    t[s].repairReasonCodeArr = [], t[s].repairTypeArr = [], t[s].msgForSelectAllArr = [], 
    a[t[s].packageStatus]) {
        var r = e.length;
        e[r - 1].repairReasonCodeArr.push(t[s].repairReason), e[r - 1].repairReasonArr.push(t[s].repairReasonDesc), 
        e[r - 1].repairTypeArr.push(t[s].repairType), t[s].msgForSelectAll ? e[r - 1].msgForSelectAllArr.push(t[s].msgForSelectAll) : e[r - 1].msgForSelectAllArr.push("");
    } else a[t[s].packageStatus] = !0, t[s].repairReasonCodeArr.push(""), t[s].repairReasonArr.push("请选择"), 
    t[s].repairTypeArr.push("0"), t[s].repairReasonCodeArr.push(t[s].repairReason), 
    t[s].repairReasonArr.push(t[s].repairReasonDesc), t[s].repairTypeArr.push(t[s].repairType), 
    t[s].msgForSelectAll ? t[s].msgForSelectAllArr.push(t[s].msgForSelectAll) : t[s].msgForSelectAllArr.push(""), 
    e.push(t[s]);
    return e;
};