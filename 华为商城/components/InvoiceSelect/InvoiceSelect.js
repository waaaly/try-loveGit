var e = getApp(), t = e.globalData.mp, a = e.globalData.config;

Component({
    properties: {
        query: {
            type: String,
            value: ""
        },
        comeFrom: {
            type: String,
            value: ""
        },
        userInvoiceInfoVO: {
            type: Object,
            value: {}
        },
        confirmVOList: {
            type: Object,
            value: {}
        }
    },
    ready: function() {
        var e = this.properties.comeFrom, t = this.properties.query, a = this.properties.userInvoiceInfoVO, i = this.properties.confirmVOList;
        wx.hideShareMenu(), this.setData({
            comeFrom: e,
            defaultInvoiceInfo: JSON.parse(decodeURIComponent(t)),
            userInvoiceInfoVO: a,
            confirmVOList: JSON.parse(JSON.stringify(i))
        }), "rushOrderConfirm" == e ? this.initRushBuyInvoice() : i && (this.initInvoice(), 
        this.getNoticeContent());
    },
    detached: function() {
        clearTimeout(this.data.time), clearTimeout(this.data.tapClickTimer);
    },
    data: {
        comeFrom: "",
        query: "",
        userInvoiceInfoVO: {},
        confirmVOList: {},
        invoiceTypes: [ {
            type: "1",
            invoiceName: "纸质普通发票",
            className: "",
            contentClass: "hide",
            titleType: "",
            checked: !0,
            isShow: !0
        }, {
            type: "50",
            invoiceName: "电子普通发票",
            className: "",
            contentClass: "hide",
            titleType: "",
            checked: !0,
            isShow: !0
        }, {
            type: "3",
            invoiceName: "专用发票",
            className: "",
            contentClass: "hide",
            isShow: !0
        }, {
            type: "0",
            invoiceName: "不开发票",
            className: "",
            contentClass: "hide",
            isShow: !0
        } ],
        ucToorder: {
            0: "0",
            1: "1",
            3: "3",
            50: "2"
        },
        ucInfo: {},
        orderInfo: {},
        defaultType: "",
        lastClickType: "",
        invoiceReq: {},
        oldAddress: {},
        checkboxImageName: "checkbox.png",
        checkboxImageNameSelected: "checkbox_selected.png",
        setDefault: !0,
        checkItems: [ {
            value: "1",
            checked: "true"
        } ],
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
        isUpdateBtnClicked: !1,
        showSpecialNotice: !1,
        specialContentTitle: "",
        specialContentArr: [],
        specialHasModify: !1,
        showOKButton: !0,
        showTip: !1,
        templateContent: "",
        time: null,
        tapClickTimer: null,
        tapDoubleClick: !1
    },
    methods: {
        initInvoice: function() {
            var e = this, t = e.data.confirmVOList, a = t.carrierCode, i = e.data.userInvoiceInfoVO, n = e.data.defaultInvoiceInfo, c = e.data.invoiceTypes, o = {};
            e.setData({
                defaultType: n.invoiceType
            });
            var s = n.invoiceType;
            switch (s.toString()) {
              case "0":
                c[3].contentClass = "", c[3].className = "checked", t.invoiceTypeInfo.unsupportedInvoices.includes("0") && (c[3].className = "disabledandchecked");
                break;

              case "1":
                c[0].contentClass = "", c[0].className = "checked", t.invoiceTypeInfo.unsupportedInvoices.includes("1") && (c[0].className = "disabledandchecked"), 
                c[0].titleType = e.data.defaultInvoiceInfo.invoiceTitleType, "2" == e.data.defaultInvoiceInfo.invoiceTitleType ? c[0].checked = !1 : c[0].checked = !0;
                break;

              case "3":
                c[2].contentClass = "", c[2].className = "checked", t.invoiceTypeInfo.unsupportedInvoices.includes("3") && (c[2].className = "disabledandchecked");
                break;

              case "50":
                c[1].contentClass = "", c[1].className = "checked", t.invoiceTypeInfo.unsupportedInvoices.includes("50") && (c[1].className = "disabledandchecked"), 
                c[1].titleType = e.data.defaultInvoiceInfo.invoiceTitleType, "2" == e.data.defaultInvoiceInfo.invoiceTitleType ? c[1].checked = !1 : c[1].checked = !0;
            }
            e.setData({
                invoiceTypes: c
            }), i && i.invoiceInfoVOList && (i.invoiceInfoVOList = i.invoiceInfoVOList.filter(function(e) {
                return e.carrierCode == a;
            }), i.invoiceInfoVOList.forEach(function(e) {
                switch (e.invoiceType) {
                  case "0":
                    c[3].carrierCode = t.carrierCode;
                    break;

                  case "1":
                    c[0].company = e.company, c[0].taxpayerId = e.taxpayerId, c[0].carrierCode = t.carrierCode;
                    break;

                  case "3":
                    c[2].company = e.company, c[2].taxpayInvoiceInfoVO = e.taxpayInvoiceInfoVO, c[2].taxpayerId = e.taxpayInvoiceInfoVO.taxpayerId, 
                    c[2].regAddress = e.taxpayInvoiceInfoVO.regAddress, c[2].regTelephone = e.taxpayInvoiceInfoVO.regTelephone, 
                    c[2].bank = e.taxpayInvoiceInfoVO.bank, c[2].bankAccount = e.taxpayInvoiceInfoVO.bankAccount, 
                    c[2].checkTaker = e.taxpayInvoiceInfoVO.checkTaker, c[2].takerMobile = e.taxpayInvoiceInfoVO.takerMobile, 
                    c[2].takerAddress = e.taxpayInvoiceInfoVO.takerAddress, c[2].takerProvince = e.taxpayInvoiceInfoVO.takerProvince, 
                    c[2].takerCity = e.taxpayInvoiceInfoVO.takerCity, c[2].takerDistrict = e.taxpayInvoiceInfoVO.takerDistrict, 
                    c[2].takerStreet = e.taxpayInvoiceInfoVO.takerStreet, c[2].carrierCode = t.carrierCode, 
                    o.province = e.taxpayInvoiceInfoVO.takerProvince, o.city = e.taxpayInvoiceInfoVO.takerCity, 
                    o.district = e.taxpayInvoiceInfoVO.takerDistrict, o.street = e.taxpayInvoiceInfoVO.takerStreet;
                    break;

                  case "2":
                    c[1].company = e.company, c[1].taxpayerId = e.taxpayerId, c[1].carrierCode = t.carrierCode;
                }
            }), e.setData({
                invoiceTypes: c,
                region: o
            })), c.forEach(function(e, a) {
                switch (e.type) {
                  case "0":
                    c[3].carrierCode = t.carrierCode, t.invoiceTypeInfo.unsupportedInvoices.includes("0") && "0" != s && (c[3].className = "disabled"), 
                    t.invoiceTypeInfo.supportedInvoices.includes("0") || (c[3].className = "hide");
                    break;

                  case "1":
                    c[0].carrierCode = t.carrierCode, t.invoiceTypeInfo.unsupportedInvoices.includes("1") && "1" != s && (c[0].className = "disabled"), 
                    t.invoiceTypeInfo.supportedInvoices.includes("1") || (c[0].className = "hide");
                    break;

                  case "3":
                    c[2].carrierCode = t.carrierCode, t.invoiceTypeInfo.unsupportedInvoices.includes("3") && "3" != s && (c[2].className = "disabled"), 
                    t.invoiceTypeInfo.supportedInvoices.includes("3") || (c[2].className = "hide");
                    break;

                  case "50":
                    c[1].carrierCode = t.carrierCode, t.invoiceTypeInfo.unsupportedInvoices.includes("50") && "50" != s && (c[1].className = "disabled"), 
                    t.invoiceTypeInfo.supportedInvoices.includes("50") || (c[1].className = "hide");
                }
            }), e.setData({
                invoiceTypes: c
            });
        },
        initRushBuyInvoice: function() {
            var e = this, t = this.data.defaultInvoiceInfo.invoiceType, a = e.data.userInvoiceInfoVO, i = wx.getStorageSync("rushBuyCarrierCode") || "VMALL-HUAWEIDEVICE", n = [ {
                type: "1",
                invoiceName: "纸质普通发票",
                className: "disabled",
                contentClass: "hide",
                titleType: "",
                checked: !0,
                isShow: !0
            }, {
                type: "50",
                invoiceName: "电子普通发票",
                className: "",
                contentClass: "hide",
                titleType: "",
                checked: !0,
                isShow: !0
            }, {
                type: "3",
                invoiceName: "专用发票",
                className: "disabled",
                contentClass: "hide",
                isShow: !0
            }, {
                type: "0",
                invoiceName: "不开发票",
                className: "",
                contentClass: "hide",
                isShow: !1
            } ];
            switch (this.setData({
                invoiceTypes: n
            }), t) {
              case "50":
                n[1].contentClass = "", n[1].className = "checked", n[1].titleType = e.data.defaultInvoiceInfo.invoiceTitleType, 
                "2" == e.data.defaultInvoiceInfo.invoiceTitleType ? n[1].checked = !1 : n[1].checked = !0;
                break;

              case "1":
                n[0].contentClass = "", n[0].className = "checked", n[0].titleType = e.data.defaultInvoiceInfo.invoiceTitleType, 
                "2" == e.data.defaultInvoiceInfo.invoiceTitleType ? n[0].checked = !1 : n[0].checked = !0;
            }
            e.setData({
                invoiceTypes: n
            }), a && a.invoiceInfoVOList && a.invoiceInfoVOList.filter(function(e, t) {
                return e.carrierCode == i;
            }).forEach(function(e) {
                switch (e.invoiceType) {
                  case "1":
                    n[0].company = e.company, n[0].taxpayerId = e.taxpayerId, n[0].carrierCode = i;
                    break;

                  case "2":
                    n[1].company = e.company, n[1].taxpayerId = e.taxpayerId, n[1].carrierCode = i;
                }
            }), e.setData({
                invoiceTypes: n
            });
        },
        chooseInvoiceType: function(e) {
            var t = this, a = t.data.invoiceTypes;
            return !("rushOrderConfirm" == t.data.comeFrom && "3" == e.currentTarget.dataset.type || "rushOrderConfirm" == t.data.comeFrom && "1" == e.currentTarget.dataset.type || t.stopTapDoubleClick()) && ("disabled" == a[e.currentTarget.dataset.index].className || "disabledandchecked" == a[e.currentTarget.dataset.index].className ? (wx.showModal({
                title: "提示",
                content: "订单包含不支持开" + a[e.currentTarget.dataset.index].invoiceName + "的商品",
                showCancel: !1
            }), !1) : (a.forEach(function(e, t) {
                "disabled" != e.className && "disabledandchecked" != e.className && "hide" != e.className && (e.className = ""), 
                "disabledandchecked" == e.className && (e.className = "disabled"), e.contentClass = "hide";
            }), a[e.currentTarget.dataset.index].className = "checked", a[e.currentTarget.dataset.index].contentClass = "", 
            t.setData({
                invoiceTypes: a
            }), void ("3" != e.currentTarget.dataset.type ? t.setData({
                showOKButton: !0
            }) : t.data.showSpecialNotice ? t.setData({
                showOKButton: !1
            }) : t.setData({
                showOKButton: !0
            }))));
        },
        chooseTitleType: function(e) {
            var t = this, a = t.data.invoiceTypes, i = e.currentTarget.dataset.val;
            "1" == i.split("-")[1] ? "sigle" == i.split("-")[0] ? (a[0].checked = !0, a[0].titleType = 1) : (a[0].checked = !1, 
            a[0].titleType = 2) : "sigle" == i.split("-")[0] ? (a[1].checked = !0, a[1].titleType = 1) : (a[1].checked = !1, 
            a[1].titleType = 2), t.setData({
                invoiceTypes: a
            });
        },
        stopDoubleClick: function() {
            var e = this;
            return !!e.data.isUpdateBtnClicked || (e.setData({
                isUpdateBtnClicked: !0
            }), e.data.time = setTimeout(function() {
                e.setData({
                    isUpdateBtnClicked: !1
                });
            }, 3e3), !1);
        },
        stopTapDoubleClick: function() {
            var e = this;
            return !!e.data.tapDoubleClick || (e.data.tapDoubleClick = !0, e.data.tapClickTimer = setTimeout(function() {
                e.data.tapDoubleClick = !1;
            }, 700), !1);
        },
        updateInvoice: function(e) {
            var a = this, i = (a.data.invoiceTypes, []);
            if (a.stopDoubleClick()) return !1;
            if ("rushOrderConfirm" == a.data.comeFrom) {
                var n = this;
                n.constructInvoiceData(), n.getInvoiceInfo();
            } else {
                var c = a.data.confirmVOList;
                if (this.constructInvoiceData(), a.data.invoiceReq.valid) if (1 != a.data.invoiceReq.invoiceType && 2 != a.data.invoiceReq.invoiceType || 2 != a.data.invoiceReq.titleType || c.invoiceTypeInfo.unsupportedInvoices.includes("3") || !c.invoiceTypeInfo.supportedInvoices.includes("3")) {
                    if ("3" == a.data.invoiceReq.invoiceType && a.data.specialHasModify) return a.setData({
                        showSpecialNotice: !0,
                        showOKButton: !1
                    }), !1;
                    a.getInvoiceInfo(e);
                } else c.invoiceTypeInfo.induceVatInfoList && c.invoiceTypeInfo.induceVatInfoList.length > 0 ? (c.invoiceTypeInfo.induceVatInfoList.forEach(function(e, t) {
                    i.push(e.code);
                }), i.includes(a.data.invoiceReq.taxpayerId) ? t.getSystemConfig("INVOICE_CORP_INDUCE_MSG", function(e) {
                    var t = {
                        templateContent: e.INVOICE_CORP_INDUCE_MSG.systemConfigValue,
                        showTip: !0
                    };
                    a.triggerEvent("tipsChange", t);
                }) : a.getInvoiceInfo(e)) : a.getInvoiceInfo(e);
            }
        },
        specialAgree: function(e) {
            var a = this;
            if (t.stopRepeatClick(e, 3e3)) return !1;
            a.constructInvoiceData(), a.data.invoiceReq.valid && a.saveInvoiceInfo();
        },
        getInvoiceInfo: function(e) {
            var a = this;
            if (t.stopRepeatClick(e, 3e3)) return !1;
            var i = {
                showTip: !1
            };
            a.triggerEvent("tipsChange", i), a.data.invoiceReq.valid && a.saveInvoiceInfo();
        },
        saveInvoiceInfo: function() {
            var e = this;
            e.data.invoiceReq.userId = wx.getStorageSync("userId"), t.getCsrf(function(i) {
                t.mpPost(a.service.openApiDomain + "/uc/invoice/updateInvoiceInfo.json", e.data.invoiceReq, {
                    successFunc: function(t) {
                        if (t.data) var a = t.data;
                        if ("200000" == a.resultCode) {
                            var i = e.data.invoiceReq;
                            "2" == i.invoiceType && (i.invoiceType = "50"), i.hideSelect = !1, e.triggerEvent("confirmShow", i);
                        } else e.data.showSpecialNotice && e.setData({
                            showSpecialNotice: !1,
                            specialHasModify: !1,
                            showOKButton: !0
                        }), wx.showModal({
                            title: "提示",
                            content: "保存发票信息失败",
                            showCancel: !1
                        });
                    }
                }, {
                    CsrfToken: i
                });
            }, function() {
                wx.showModal({
                    title: "提示",
                    content: "操作失败，请稍后重试",
                    showCancel: !1
                });
            });
        },
        changeInvoice: function() {
            var e = this, t = e.data.invoiceTypes, a = {
                showTip: !1
            };
            if (e.triggerEvent("tipsChange", a), "disabled" == t[2].className || "disabledandchecked" == t[2].className) return wx.showModal({
                title: "提示",
                content: "订单包含不支持开" + t[2].invoiceName + "的商品",
                showCancel: !1
            }), !1;
            t.forEach(function(e, t) {
                "disabled" != e.className && "disabledandchecked" != e.className && "hide" != e.className && (e.className = ""), 
                "disabledandchecked" == e.className && (e.className = "disabled"), e.contentClass = "hide";
            }), t[2].className = "checked", t[2].contentClass = "", e.setData({
                invoiceTypes: t
            }), e.data.showSpecialNotice ? e.setData({
                showOKButton: !1
            }) : e.setData({
                showOKButton: !0
            });
        },
        constructInvoiceData: function() {
            var e = this, t = e.data.invoiceTypes;
            t.forEach(function(a, i) {
                switch (a.type) {
                  case "0":
                    if ("checked" == t[3].className) {
                        n = {
                            invoiceType: 0,
                            carrierCode: t[3].carrierCode,
                            valid: !0
                        };
                        e.setData({
                            invoiceReq: n
                        });
                    } else if ("disabledandchecked" == t[3].className) {
                        wx.showModal({
                            title: "提示",
                            content: "订单包含不支持开" + t[3].invoiceName + "的商品",
                            showCancel: !1
                        });
                        n = {
                            valid: !1
                        };
                        e.setData({
                            invoiceReq: n
                        });
                    }
                    break;

                  case "1":
                    if ("checked" == t[0].className) {
                        if (2 == t[0].titleType) if (e.validCompanyName(t[0])) {
                            n = {
                                company: t[0].company,
                                invoiceType: 1,
                                titleType: 2,
                                carrierCode: t[0].carrierCode,
                                valid: !0
                            };
                            t[0].taxpayerId ? n.taxpayerId = t[0].taxpayerId : n.taxpayerId = "";
                        } else n = {
                            valid: !1
                        }; else n = {
                            invoiceType: 1,
                            titleType: t[0].titleType || 1,
                            carrierCode: t[0].carrierCode,
                            valid: !0
                        };
                        e.setData({
                            invoiceReq: n
                        });
                    } else if ("disabledandchecked" == t[0].className) {
                        wx.showModal({
                            title: "提示",
                            content: "订单包含不支持开" + t[0].invoiceName + "的商品",
                            showCancel: !1
                        });
                        n = {
                            valid: !1
                        };
                        e.setData({
                            invoiceReq: n
                        });
                    }
                    break;

                  case "3":
                    if ("checked" == t[2].className) {
                        if (e.validSpecialType(t[2])) n = {
                            company: t[2].company,
                            taxpayInvoiceInfoVO: {
                                regAddress: t[2].regAddress,
                                regTelephone: t[2].regTelephone,
                                bank: t[2].bank,
                                bankAccount: t[2].bankAccount,
                                checkTaker: t[2].checkTaker,
                                takerMobile: t[2].takerMobile,
                                takerAddress: t[2].takerAddress,
                                takerProvince: t[2].takerProvince,
                                takerCity: t[2].takerCity,
                                takerDistrict: t[2].takerDistrict,
                                takerStreet: t[2].takerStreet || "",
                                taxpayerId: t[2].taxpayerId
                            },
                            taxpayerId: t[2].taxpayerId,
                            invoiceType: 3,
                            carrierCode: t[2].carrierCode,
                            valid: !0
                        }; else n = {
                            valid: !1
                        };
                        e.setData({
                            invoiceReq: n
                        });
                    } else if ("disabledandchecked" == t[2].className) {
                        wx.showModal({
                            title: "提示",
                            content: "订单包含不支持开" + t[2].invoiceName + "的商品",
                            showCancel: !1
                        });
                        n = {
                            valid: !1
                        };
                        e.setData({
                            invoiceReq: n
                        });
                    }
                    break;

                  case "50":
                    if ("checked" == t[1].className) {
                        if (2 == t[1].titleType) if (e.validCompanyName(t[1])) n = {
                            company: t[1].company,
                            taxpayerId: t[1].taxpayerId,
                            invoiceType: 2,
                            titleType: 2,
                            carrierCode: t[1].carrierCode,
                            valid: !0
                        }; else n = {
                            valid: !1
                        }; else n = {
                            invoiceType: 2,
                            titleType: t[1].titleType || 1,
                            carrierCode: t[1].carrierCode,
                            valid: !0
                        };
                        e.setData({
                            invoiceReq: n
                        });
                    } else if ("disabledandchecked" == t[1].className) {
                        wx.showModal({
                            title: "提示",
                            content: "订单包含不支持开" + t[1].invoiceName + "的商品",
                            showCancel: !1
                        });
                        var n = {
                            valid: !1
                        };
                        e.setData({
                            invoiceReq: n
                        });
                    }
                }
            });
        },
        checkValue: function(e) {
            var t = {
                "company-1": "",
                "taxpayerId-1": "",
                "company-50": "",
                "taxpayerId-50": "",
                company: "",
                taxpayerId: "",
                regAddress: "",
                regTelephone: "",
                bank: "",
                bankAccount: "",
                checkTaker: "",
                takerMobile: "",
                takerAddress: ""
            };
            if (("input" == e.type && "" != e.detail.value || "" != e.detail.value) && (t[e.currentTarget.id] = "show"), 
            this.setData({
                clearIcons: t
            }), "input" == e.type) {
                var a = this.data.invoiceTypes, i = e.currentTarget.id.split("-");
                1 == i.length && {
                    company: "1",
                    taxpayerId: "1",
                    regAddress: "1",
                    regTelephone: "1",
                    bank: "1",
                    bankAccount: "1"
                }[e.currentTarget.id] && (this.data.specialHasModify = !0), i.length > 1 ? 1 == i[1] ? a[0][i[0]] = e.detail.value : a[1][i[0]] = e.detail.value : a[2][i[0]] = e.detail.value, 
                this.setData({
                    invoiceTypes: a
                });
            }
        },
        clearInputValue: function(e) {
            var t = {
                "company-1": "",
                "taxpayerId-1": "",
                "company-50": "",
                "taxpayerId-50": "",
                company: "",
                taxpayerId: "",
                regAddress: "",
                regTelephone: "",
                bank: "",
                bankAccount: "",
                checkTaker: "",
                takerMobile: "",
                takerAddress: ""
            }, a = this.data.invoiceTypes, i = e.currentTarget.dataset.contentid.split("-");
            t[e.currentTarget.dataset.contentid] = "", i.length > 1 ? 1 == i[1] ? a[0][i[0]] = "" : a[1][i[0]] = "" : a[2][i[0]] = "", 
            this.setData({
                invoiceTypes: a,
                clearIcons: t
            });
        },
        clearIcon: function(e) {
            var t = {
                "company-1": "",
                "taxpayerId-1": "",
                "company-50": "",
                "taxpayerId-50": "",
                company: "",
                taxpayerId: "",
                regAddress: "",
                regTelephone: "",
                bank: "",
                bankAccount: "",
                checkTaker: "",
                takerMobile: "",
                takerAddress: ""
            };
            t[e.currentTarget.id] = "", this.setData({
                clearIcons: t
            });
        },
        toOpenAddress: function() {
            this.setData({
                showRegionPicker: !0
            });
        },
        toChangeRegion: function(e) {
            var t = this, a = e.detail.region, i = t.data.invoiceTypes;
            i[2].takerProvince = a.province, i[2].takerCity = a.city, i[2].takerDistrict = a.district, 
            i[2].takerStreet = a.street, t.setData({
                newRegion: JSON.parse(JSON.stringify(a)),
                region: a,
                invoiceTypes: i
            });
        },
        validCompanyName: function(e) {
            var t = this;
            if (e.company) a = this.getStrLength(e.company); else var a = 0;
            if (0 == a) return wx.showModal({
                title: "提示",
                content: "【单位名称】不能为空",
                showCancel: !1
            }), !1;
            if (a < 3) return wx.showModal({
                title: "提示",
                content: "【单位名称】必须大于2个字符",
                showCancel: !1
            }), !1;
            if (a > 100) return wx.showModal({
                title: "提示",
                content: "【单位名称】不能超过100个字符",
                showCancel: !1
            }), !1;
            var i = /^(?!^[a-zA-Z]+$)([0-9A-Z]{15}|[0-9A-Z]{17}|[0-9A-Z]{18}|[0-9A-Z]{20})$/;
            if (/[\*\|\/\+\$\^\\\<\>\{\}%~&-]|[";=']/.test(e.company)) return wx.showModal({
                title: "提示",
                content: "【单位名称】不能包含非法字符",
                showCancel: !1
            }), !1;
            if ("rushOrderConfirm" != t.data.comeFrom) {
                var n = t.data.confirmVOList;
                if (n.invoiceTypeInfo.invoiceLimitCorpList && n.invoiceTypeInfo.invoiceLimitCorpList.length > 0 && -1 != n.invoiceTypeInfo.invoiceLimitCorpList.indexOf(e.company)) return wx.showModal({
                    title: "提示",
                    content: "单位名称不能为" + e.company + "请重新输入",
                    showCancel: !1
                }), !1;
            }
            if (2 == e.titleType) if (void 0 == e.taxpayerId || "" == e.taxpayerId) {
                if (50 == e.type || 1 == e.type) return wx.showModal({
                    title: "提示",
                    content: "【纳税人识别号】不能为空",
                    showCancel: !1
                }), !1;
            } else if (void 0 != e.taxpayerId && "" != e.taxpayerId && null == e.taxpayerId.match(i)) return wx.showModal({
                title: "提示",
                content: "【纳税人识别号】格式不正确，请输入15,17,18,20位的数字或大写字母+数字",
                showCancel: !1
            }), !1;
            return !0;
        },
        validSpecialType: function(e) {
            if (e.taxpayerId) t = e.taxpayerId.trim(); else var t = "";
            if (e.regAddress) a = e.regAddress.trim(); else var a = "";
            if (e.regTelephone) i = e.regTelephone.trim(); else var i = "";
            if (e.bank) n = e.bank.trim(); else var n = "";
            if (e.bankAccount) c = e.bankAccount.trim(); else var c = "";
            if (e.checkTaker) o = e.checkTaker.trim(); else var o = "";
            if (e.takerProvince) s = String(e.takerProvince).trim(); else var s = "";
            if (e.takerCity) r = String(e.takerCity).trim(); else var r = "";
            if (e.takerDistrict) d = String(e.takerDistrict).trim(); else var d = "";
            if (e.takerAddress) l = e.takerAddress.trim(); else var l = "";
            if (e.takerMobile) p = e.takerMobile.trim(); else var p = "";
            var v = {
                taxpayerCode: [ t, /^(?!^[a-zA-Z]+$)([0-9A-Z]{15}|[0-9A-Z]{17}|[0-9A-Z]{18}|[0-9A-Z]{20})$/, "【纳税人识别号】格式不正确，请输入15,17,18,20位的数字或大写字母+数字", "纳税人识别号" ],
                registerAddr: [ a, /^[^\<\>\(\)\\\'\"]+$/, "【注册地址】不能包含非法字符", "注册地址" ],
                regTelephone: [ i, /^[-\d]{10,20}$/, "【注册电话】格式不正确，请输入10到20位数字或-号", "注册电话" ],
                bankName: [ n.trim(), /^[^\*\/\+\$\^\\\.\<\>\{\}\-%~&";=']+$/, "【开户银行】不能包含非法字符", "开户银行" ],
                bankAccount: [ c.trim(), /^[0-9]{6,50}$/, "【银行账户】格式不正确，请输入6-50位数字", "银行账户" ]
            };
            if (this.validCompanyName(e)) {
                for (var h in v) {
                    if ("" == v[h][0]) return wx.showModal({
                        title: "提示",
                        content: "【" + v[h][3] + "】不能为空",
                        showCancel: !1
                    }), !1;
                    if (!v[h][1].test(v[h][0])) return wx.showModal({
                        title: "提示",
                        content: v[h][2],
                        showCancel: !1
                    }), !1;
                }
                if (this.getStrLength(a) > 80) return wx.showModal({
                    title: "提示",
                    content: "【注册地址】不能超过80个字符",
                    showCancel: !1
                }), !1;
                if (this.getStrLength(n) > 100) return wx.showModal({
                    title: "提示",
                    content: "【开户银行】不能超过100个字符",
                    showCancel: !1
                }), !1;
                var y = {
                    consignee: [ o, /^[\u4E00-\u9FA5\s\u3000A-Za-z]+$/, "【联系人】格式不正确，请输入2-20个中英文字符", "联系人" ],
                    mobile: [ p, /^1[0-9]{10}$/, "请填写正确的11位手机号码，例如：13XXXXXXXXX", "手机号码" ],
                    detailAddress: [ l, new RegExp(void 0), "收货人详细地址中含有非法字符", "详细地址" ]
                };
                for (var u in y) {
                    if ("" == y[u][0]) return wx.showModal({
                        title: "提示",
                        content: "【" + y[u][3] + "】不能为空",
                        showCancel: !1
                    }), !1;
                    if (!y[u][1].test(y[u][0])) return wx.showModal({
                        title: "提示",
                        content: y[u][2],
                        showCancel: !1
                    }), !1;
                }
                return this.getStrLength(l) > 100 ? (wx.showModal({
                    title: "提示",
                    content: "【详细地址】不能超过100个字符",
                    showCancel: !1
                }), !1) : this.getStrLength(o) > 20 || this.getStrLength(o) < 2 ? (wx.showModal({
                    title: "提示",
                    content: "【联系人】格式不正确，请输入2-20个中英文字符",
                    showCancel: !1
                }), !1) : "" == s ? (wx.showModal({
                    title: "提示",
                    content: "请选择省",
                    showCancel: !1
                }), !1) : "" == r ? (wx.showModal({
                    title: "提示",
                    content: "请选择市",
                    showCancel: !1
                }), !1) : "" != d || (wx.showModal({
                    title: "提示",
                    content: "请选择区",
                    showCancel: !1
                }), !1);
            }
        },
        getStrLength: function(e) {
            for (var t = 0, a = e.length, i = -1, n = 0; n < a; n++) t += (i = e.charCodeAt(n)) >= 0 && i <= 128 ? 1 : 2;
            return t;
        },
        getNoticeContent: function() {
            var e = this;
            t.mpGet(a.service.openApiDomain + "/mcp/queryTemplate", {
                placeholder: "VATINVOICE_DECLARATION"
            }, {
                successFunc: function(t) {
                    if (t && t.data && t.data.success && t.data.templateMapping) {
                        var a = t.data.templateMapping.VATINVOICE_DECLARATION || "";
                        if (a && a.content.trim()) {
                            var i = a.content;
                            if ((i = JSON.parse(i)) && i.length > 0) {
                                e.data.specialContentTitle = i[0].title;
                                for (var n = 1; n < i.length; n++) e.data.specialContentArr.push(i[n]["content" + n]);
                            }
                        } else wx.showToast({
                            title: "获取专票须知内容失败!",
                            icon: "none"
                        }), e.data.specialContentTitle = "开具增值税专用发票须知", e.data.specialContentArr = [ "获取专票须知内容失败!" ];
                    } else wx.showToast({
                        title: "获取专票须知内容失败!",
                        icon: "none"
                    }), e.data.specialContentTitle = "开具增值税专用发票须知", e.data.specialContentArr = [ "获取专票须知内容失败!" ];
                    e.setData({
                        specialContentTitle: e.data.specialContentTitle,
                        specialContentArr: e.data.specialContentArr
                    });
                },
                failFunc: function() {
                    wx.showToast({
                        title: "获取专票须知内容失败!",
                        icon: "none"
                    }), e.data.specialContentTitle = "开具增值税专用发票须知", e.data.specialContentArr = [ "获取专票须知内容失败!" ], 
                    e.setData({
                        specialContentTitle: e.data.specialContentTitle,
                        specialContentArr: e.data.specialContentArr
                    });
                }
            });
        },
        invoiceRemindTips: function() {
            this.triggerEvent("invoiceTips", !0);
        }
    }
});