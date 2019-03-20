var e = getApp(), a = e.globalData.mp, t = e.globalData.config;

Page({
    data: {
        invoiceTypes: [ {
            type: "1",
            invoiceName: "纸质普通发票",
            className: "",
            contentClass: "hide",
            titleType: "",
            checked: !0
        }, {
            type: "50",
            invoiceName: "电子普通发票",
            className: "",
            contentClass: "hide",
            titleType: "",
            checked: !0
        }, {
            type: "3",
            invoiceName: "专用发票",
            className: "",
            contentClass: "hide"
        }, {
            type: "0",
            invoiceName: "不开发票",
            className: "",
            contentClass: "hide"
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
    onLoad: function(e) {
        wx.hideShareMenu(), this.setData({
            defaultInvoiceInfo: JSON.parse(decodeURIComponent(e.params))
        }), this.initInvoice(), this.getNoticeContent();
    },
    onShow: function() {
        wx.getStorageSync("confirmVOList");
    },
    initInvoice: function() {
        var e = this, a = wx.getStorageSync("confirmVOList"), t = a.carrierCode, i = wx.getStorageSync("userInvoiceInfoVO"), n = (e.data.defaultInvoiceInfo, 
        e.data.invoiceTypes), c = e.data.region;
        e.setData({
            defaultType: a.defaultInvoiceType
        });
        var o = e.data.defaultType;
        switch (o) {
          case "0":
            n[3].contentClass = "", n[3].className = "checked", a.invoiceTypeInfo.unsupportedInvoices.includes("0") && (n[3].className = "disabledandchecked");
            break;

          case "1":
            n[0].contentClass = "", n[0].className = "checked", a.invoiceTypeInfo.unsupportedInvoices.includes("1") && (n[0].className = "disabledandchecked"), 
            n[0].titleType = e.data.defaultInvoiceInfo.invoiceTitleType, "2" == e.data.defaultInvoiceInfo.invoiceTitleType ? n[0].checked = !1 : n[0].checked = !0;
            break;

          case "3":
            n[2].contentClass = "", n[2].className = "checked", a.invoiceTypeInfo.unsupportedInvoices.includes("3") && (n[2].className = "disabledandchecked");
            break;

          case "50":
            n[1].contentClass = "", n[1].className = "checked", a.invoiceTypeInfo.unsupportedInvoices.includes("50") && (n[1].className = "disabledandchecked"), 
            n[1].titleType = e.data.defaultInvoiceInfo.invoiceTitleType, "2" == e.data.defaultInvoiceInfo.invoiceTitleType ? n[1].checked = !1 : n[1].checked = !0;
        }
        e.setData({
            invoiceTypes: n
        }), i && i.invoiceInfoVOList && (i.invoiceInfoVOList = i.invoiceInfoVOList.filter(function(e) {
            return e.carrierCode == t;
        }), i.invoiceInfoVOList.forEach(function(e) {
            switch (e.invoiceType) {
              case "0":
                n[3].carrierCode = a.carrierCode;
                break;

              case "1":
                n[0].company = e.company, n[0].taxpayerId = e.taxpayerId, n[0].carrierCode = a.carrierCode;
                break;

              case "3":
                n[2].company = e.company, n[2].taxpayInvoiceInfoVO = e.taxpayInvoiceInfoVO, n[2].taxpayerId = e.taxpayInvoiceInfoVO.taxpayerId, 
                n[2].regAddress = e.taxpayInvoiceInfoVO.regAddress, n[2].regTelephone = e.taxpayInvoiceInfoVO.regTelephone, 
                n[2].bank = e.taxpayInvoiceInfoVO.bank, n[2].bankAccount = e.taxpayInvoiceInfoVO.bankAccount, 
                n[2].checkTaker = e.taxpayInvoiceInfoVO.checkTaker, n[2].takerMobile = e.taxpayInvoiceInfoVO.takerMobile, 
                n[2].takerAddress = e.taxpayInvoiceInfoVO.takerAddress, n[2].takerProvince = e.taxpayInvoiceInfoVO.takerProvince, 
                n[2].takerCity = e.taxpayInvoiceInfoVO.takerCity, n[2].takerDistrict = e.taxpayInvoiceInfoVO.takerDistrict, 
                n[2].takerStreet = e.taxpayInvoiceInfoVO.takerStreet, n[2].carrierCode = a.carrierCode, 
                c.province = e.taxpayInvoiceInfoVO.takerProvince, c.city = e.taxpayInvoiceInfoVO.takerCity, 
                c.district = e.taxpayInvoiceInfoVO.takerDistrict, c.street = e.taxpayInvoiceInfoVO.takerStreet;
                break;

              case "2":
                n[1].company = e.company, n[1].taxpayerId = e.taxpayerId, n[1].carrierCode = a.carrierCode;
            }
        }), e.setData({
            invoiceTypes: n,
            region: c
        })), n.forEach(function(e, t) {
            switch (e.type) {
              case "0":
                n[3].carrierCode = a.carrierCode, a.invoiceTypeInfo.unsupportedInvoices.includes("0") && "0" != o && (n[3].className = "disabled"), 
                a.invoiceTypeInfo.supportedInvoices.includes("0") || (n[3].className = "hide");
                break;

              case "1":
                n[0].carrierCode = a.carrierCode, a.invoiceTypeInfo.unsupportedInvoices.includes("1") && "1" != o && (n[0].className = "disabled"), 
                a.invoiceTypeInfo.supportedInvoices.includes("1") || (n[0].className = "hide");
                break;

              case "3":
                n[2].carrierCode = a.carrierCode, a.invoiceTypeInfo.unsupportedInvoices.includes("3") && "3" != o && (n[2].className = "disabled"), 
                a.invoiceTypeInfo.supportedInvoices.includes("3") || (n[2].className = "hide");
                break;

              case "50":
                n[1].carrierCode = a.carrierCode, a.invoiceTypeInfo.unsupportedInvoices.includes("50") && "50" != o && (n[1].className = "disabled"), 
                a.invoiceTypeInfo.supportedInvoices.includes("50") || (n[1].className = "hide");
            }
        }), e.setData({
            invoiceTypes: n
        });
    },
    chooseInvoiceType: function(e) {
        var a = this, t = a.data.invoiceTypes;
        return !a.stopTapDoubleClick() && ("disabled" == t[e.currentTarget.dataset.index].className || "disabledandchecked" == t[e.currentTarget.dataset.index].className ? (wx.showModal({
            title: "提示",
            content: "订单包含不支持开" + t[e.currentTarget.dataset.index].invoiceName + "的商品",
            showCancel: !1
        }), !1) : (t.forEach(function(e, a) {
            "disabled" != e.className && "disabledandchecked" != e.className && "hide" != e.className && (e.className = ""), 
            "disabledandchecked" == e.className && (e.className = "disabled"), e.contentClass = "hide";
        }), t[e.currentTarget.dataset.index].className = "checked", t[e.currentTarget.dataset.index].contentClass = "", 
        a.setData({
            invoiceTypes: t
        }), void ("3" != e.currentTarget.dataset.type ? a.setData({
            showOKButton: !0
        }) : a.data.showSpecialNotice ? a.setData({
            showOKButton: !1
        }) : a.setData({
            showOKButton: !0
        }))));
    },
    chooseTitleType: function(e) {
        var a = this, t = a.data.invoiceTypes, i = e.detail.value;
        "1" == i.split("-")[1] ? "sigle" == i.split("-")[0] ? (t[0].checked = !0, t[0].titleType = 1) : (t[0].checked = !1, 
        t[0].titleType = 2) : "sigle" == i.split("-")[0] ? (t[1].checked = !0, t[1].titleType = 1) : (t[1].checked = !1, 
        t[1].titleType = 2), a.setData({
            invoiceTypes: t
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
        var t = this, i = (t.data.invoiceTypes, wx.getStorageSync("confirmVOList")), n = [];
        if (t.stopDoubleClick()) return !1;
        if (this.constructInvoiceData(), t.data.invoiceReq.valid) if (1 != t.data.invoiceReq.invoiceType && 2 != t.data.invoiceReq.invoiceType || 2 != t.data.invoiceReq.titleType || i.invoiceTypeInfo.unsupportedInvoices.includes("3") || !i.invoiceTypeInfo.supportedInvoices.includes("3")) {
            if ("3" == t.data.invoiceReq.invoiceType && t.data.specialHasModify) return t.setData({
                showSpecialNotice: !0,
                showOKButton: !1
            }), !1;
            t.getInvoiceInfo(e);
        } else i.invoiceTypeInfo.induceVatInfoList && i.invoiceTypeInfo.induceVatInfoList.length > 0 ? (i.invoiceTypeInfo.induceVatInfoList.forEach(function(e, a) {
            n.push(e.code);
        }), n.includes(t.data.invoiceReq.taxpayerId) ? a.getSystemConfig("INVOICE_CORP_INDUCE_MSG", function(e) {
            t.setData({
                templateContent: e.INVOICE_CORP_INDUCE_MSG.systemConfigValue,
                showTip: !0
            });
        }) : t.getInvoiceInfo(e)) : t.getInvoiceInfo(e);
    },
    specialAgree: function(e) {
        var t = this;
        if (a.stopRepeatClick(e, 3e3)) return !1;
        t.constructInvoiceData(), t.data.invoiceReq.valid && t.saveInvoiceInfo();
    },
    getInvoiceInfo: function(e) {
        var t = this;
        if (a.stopRepeatClick(e, 3e3)) return !1;
        t.setData({
            showTip: !1
        }), t.data.invoiceReq.valid && t.saveInvoiceInfo();
    },
    saveInvoiceInfo: function() {
        var e = this;
        e.data.invoiceReq.userId = wx.getStorageSync("userId"), a.getCsrf(function(i) {
            a.mpPost(t.service.openApiDomain + "/uc/invoice/updateInvoiceInfo.json", e.data.invoiceReq, {
                successFunc: function(a) {
                    if (a.data) var t = a.data;
                    if ("200000" == t.resultCode) {
                        var i = e.data.invoiceReq;
                        "2" == i.invoiceType && (i.invoiceType = "50"), wx.setStorageSync("invoiceInfoForConfirm", i), 
                        wx.navigateBack();
                    } else e.data.showSpecialNotice && e.setData({
                        showSpecialNotice: !1,
                        specialHasModify: !1
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
        var e = this, a = e.data.invoiceTypes;
        if (e.setData({
            showTip: !1
        }), "disabled" == a[2].className || "disabledandchecked" == a[2].className) return wx.showModal({
            title: "提示",
            content: "订单包含不支持开" + a[2].invoiceName + "的商品",
            showCancel: !1
        }), !1;
        a.forEach(function(e, a) {
            "disabled" != e.className && "disabledandchecked" != e.className && "hide" != e.className && (e.className = ""), 
            "disabledandchecked" == e.className && (e.className = "disabled"), e.contentClass = "hide";
        }), a[2].className = "checked", a[2].contentClass = "", e.setData({
            invoiceTypes: a
        }), e.data.showSpecialNotice ? e.setData({
            showOKButton: !1
        }) : e.setData({
            showOKButton: !0
        });
    },
    constructInvoiceData: function() {
        var e = this, a = e.data.invoiceTypes;
        a.forEach(function(t, i) {
            switch (t.type) {
              case "0":
                if ("checked" == a[3].className) {
                    n = {
                        invoiceType: 0,
                        carrierCode: a[3].carrierCode,
                        valid: !0
                    };
                    e.setData({
                        invoiceReq: n
                    });
                } else if ("disabledandchecked" == a[3].className) {
                    wx.showModal({
                        title: "提示",
                        content: "订单包含不支持开" + a[3].invoiceName + "的商品",
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
                if ("checked" == a[0].className) {
                    if (2 == a[0].titleType) if (e.validCompanyName(a[0])) {
                        n = {
                            company: a[0].company,
                            invoiceType: 1,
                            titleType: 2,
                            carrierCode: a[0].carrierCode,
                            valid: !0
                        };
                        a[0].taxpayerId ? n.taxpayerId = a[0].taxpayerId : n.taxpayerId = "";
                    } else n = {
                        valid: !1
                    }; else n = {
                        invoiceType: 1,
                        titleType: a[0].titleType || 1,
                        carrierCode: a[0].carrierCode,
                        valid: !0
                    };
                    e.setData({
                        invoiceReq: n
                    });
                } else if ("disabledandchecked" == a[0].className) {
                    wx.showModal({
                        title: "提示",
                        content: "订单包含不支持开" + a[0].invoiceName + "的商品",
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
                if ("checked" == a[2].className) {
                    if (e.validSpecialType(a[2])) n = {
                        company: a[2].company,
                        taxpayInvoiceInfoVO: {
                            regAddress: a[2].regAddress,
                            regTelephone: a[2].regTelephone,
                            bank: a[2].bank,
                            bankAccount: a[2].bankAccount,
                            checkTaker: a[2].checkTaker,
                            takerMobile: a[2].takerMobile,
                            takerAddress: a[2].takerAddress,
                            takerProvince: a[2].takerProvince,
                            takerCity: a[2].takerCity,
                            takerDistrict: a[2].takerDistrict,
                            takerStreet: a[2].takerStreet || "",
                            taxpayerId: a[2].taxpayerId
                        },
                        taxpayerId: a[2].taxpayerId,
                        invoiceType: 3,
                        carrierCode: a[2].carrierCode,
                        valid: !0
                    }; else n = {
                        valid: !1
                    };
                    e.setData({
                        invoiceReq: n
                    });
                } else if ("disabledandchecked" == a[2].className) {
                    wx.showModal({
                        title: "提示",
                        content: "订单包含不支持开" + a[2].invoiceName + "的商品",
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
                if ("checked" == a[1].className) {
                    if (2 == a[1].titleType) if (e.validCompanyName(a[1])) n = {
                        company: a[1].company,
                        taxpayerId: a[1].taxpayerId,
                        invoiceType: 2,
                        titleType: 2,
                        carrierCode: a[1].carrierCode,
                        valid: !0
                    }; else n = {
                        valid: !1
                    }; else n = {
                        invoiceType: 2,
                        titleType: a[1].titleType || 1,
                        carrierCode: a[1].carrierCode,
                        valid: !0
                    };
                    e.setData({
                        invoiceReq: n
                    });
                } else if ("disabledandchecked" == a[1].className) {
                    wx.showModal({
                        title: "提示",
                        content: "订单包含不支持开" + a[1].invoiceName + "的商品",
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
        var a = {
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
        if (("input" == e.type && "" != e.detail.value || "" != e.detail.value) && (a[e.currentTarget.id] = "show"), 
        this.setData({
            clearIcons: a
        }), "input" == e.type) {
            var t = this.data.invoiceTypes, i = e.currentTarget.id.split("-");
            1 == i.length && {
                company: "1",
                taxpayerId: "1",
                regAddress: "1",
                regTelephone: "1",
                bank: "1",
                bankAccount: "1"
            }[e.currentTarget.id] && (this.data.specialHasModify = !0), i.length > 1 ? 1 == i[1] ? t[0][i[0]] = e.detail.value : t[1][i[0]] = e.detail.value : t[2][i[0]] = e.detail.value, 
            this.setData({
                invoiceTypes: t
            });
        }
    },
    clearInputValue: function(e) {
        var a = {
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
        }, t = this.data.invoiceTypes, i = e.currentTarget.dataset.contentid.split("-");
        a[e.currentTarget.dataset.contentid] = "", i.length > 1 ? 1 == i[1] ? t[0][i[0]] = "" : t[1][i[0]] = "" : t[2][i[0]] = "", 
        this.setData({
            invoiceTypes: t,
            clearIcons: a
        });
    },
    clearIcon: function(e) {
        var a = {
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
        a[e.currentTarget.id] = "", this.setData({
            clearIcons: a
        });
    },
    toOpenAddress: function() {
        this.setData({
            showRegionPicker: !0
        });
    },
    toChangeRegion: function(e) {
        var a = this, t = e.detail.region, i = a.data.invoiceTypes;
        i[2].takerProvince = t.province, i[2].takerCity = t.city, i[2].takerDistrict = t.district, 
        i[2].takerStreet = t.street, a.setData({
            region: t,
            invoiceTypes: i
        });
    },
    validCompanyName: function(e) {
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
        var t = /^(?!^[a-zA-Z]+$)([0-9A-Z]{15}|[0-9A-Z]{17}|[0-9A-Z]{18}|[0-9A-Z]{20})$/;
        if (/[\*\|\/\+\$\^\\\<\>\{\}%~&-]|[";=']/.test(e.company)) return wx.showModal({
            title: "提示",
            content: "【单位名称】不能包含非法字符",
            showCancel: !1
        }), !1;
        var i = wx.getStorageSync("confirmVOList");
        if (i.invoiceTypeInfo.invoiceLimitCorpList && i.invoiceTypeInfo.invoiceLimitCorpList.length > 0 && -1 != i.invoiceTypeInfo.invoiceLimitCorpList.indexOf(e.company)) return wx.showModal({
            title: "提示",
            content: "单位名称不能为" + e.company + "请重新输入",
            showCancel: !1
        }), !1;
        if (2 == e.titleType) if (void 0 == e.taxpayerId || "" == e.taxpayerId) {
            if (50 == e.type) return wx.showModal({
                title: "提示",
                content: "【纳税人识别号】不能为空",
                showCancel: !1
            }), !1;
        } else if (void 0 != e.taxpayerId && "" != e.taxpayerId && null == e.taxpayerId.match(t)) return wx.showModal({
            title: "提示",
            content: "【纳税人识别号】格式不正确，请输入15,17,18,20位的数字或大写字母+数字",
            showCancel: !1
        }), !1;
        return !0;
    },
    validSpecialType: function(e) {
        if (e.taxpayerId) a = e.taxpayerId.trim(); else var a = "";
        if (e.regAddress) t = e.regAddress.trim(); else var t = "";
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
            taxpayerCode: [ a, /^(?!^[a-zA-Z]+$)([0-9A-Z]{15}|[0-9A-Z]{17}|[0-9A-Z]{18}|[0-9A-Z]{20})$/, "【纳税人识别号】格式不正确，请输入15,17,18,20位的数字或大写字母+数字", "纳税人识别号" ],
            registerAddr: [ t, /^[^\<\>\(\)\\\'\"]+$/, "【注册地址】不能包含非法字符", "注册地址" ],
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
            if (this.getStrLength(t) > 80) return wx.showModal({
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
        for (var a = 0, t = e.length, i = -1, n = 0; n < t; n++) a += (i = e.charCodeAt(n)) >= 0 && i <= 128 ? 1 : 2;
        return a;
    },
    getNoticeContent: function() {
        var e = this;
        a.mpGet(t.service.openApiDomain + "/mcp/queryTemplate", {
            placeholder: "VATINVOICE_DECLARATION"
        }, {
            successFunc: function(a) {
                if (a && a.data && a.data.success && a.data.templateMapping) {
                    var t = a.data.templateMapping.VATINVOICE_DECLARATION || "";
                    if (t && t.content.trim()) {
                        var i = t.content;
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
    onUnload: function() {
        var e = this;
        clearTimeout(e.data.time), clearTimeout(e.data.tapClickTimer);
    }
});