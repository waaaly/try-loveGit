var t = getApp();

Page({
    data: {
        isFocus: !0,
        isJd: 1,
        setupdata: {
            id: "",
            userid: "",
            username: "",
            mobile: "",
            adddetails: "",
            provcode: "",
            citycode: "",
            countycode: "",
            towncode: "",
            postalcode: "",
            address: null,
            isdefault: !1
        },
        id: "",
        userid: "",
        userName: "",
        mobile: "",
        detailed: "",
        id_default: !0,
        adres: [],
        city: [],
        area: [],
        town: [],
        provcode: null,
        citycode: null,
        countycode: null,
        towncode: null,
        postalcode: null,
        index: null,
        index2: null,
        index3: null,
        index4: null,
        show2: !1,
        show3: !1,
        show4: !1
    },
    onLoad: function(e) {
        console.log(e), this.setData({
            userid: t.getuserid(),
            "setupdata.userid": t.getuserid()
        }), new t.WeToast(), this.setData({
            isJd: e.type,
            id: e.id || "",
            "setupdata.id": "newAddress" == e.id ? -1 : e.id
        }), console.log(e.id), console.log(this.data.setupdata.id), "newAddress" == e.id ? this.getNewAddress() : this.getOldAddress();
    },
    focusTextarea: function() {
        this.setData({
            isFocus: !0
        });
    },
    getNewAddress: function() {
        var t = this;
        t.getAdderssData("", function(e) {
            t.setData({
                adres: e
            }), console.log(e);
        });
    },
    getOldAddress: function() {
        var t = this;
        this.getOneAdderssData(function(e) {
            console.log(e), t.setData({
                setupdata: {
                    id: e.id,
                    userid: e.userId,
                    userName: e.username,
                    mobile: e.mobile,
                    detailed: e.detailAddress,
                    provcode: e.provinceCode,
                    citycode: e.cityCode,
                    countycode: e.countryCode,
                    towncode: e.townCode,
                    postalcode: e.postcode,
                    isJd: 0 == e.isOutAddress ? 1 : e.isOutAddress,
                    id_default: e.isDefault
                }
            }), t.readAllCity(100, e.provinceCode, function(a, d, s) {
                t.setData({
                    index: d,
                    adres: s
                }), t.readAllCity(a, e.cityCode, function(a, d, s) {
                    t.setData({
                        index2: d,
                        show2: !0,
                        city: s
                    }), t.readAllCity(a, e.countryCode, function(a, d, s) {
                        t.setData({
                            index3: d,
                            show3: !0,
                            area: s
                        }), "" != e.townCode && t.readAllCity(a, e.townCode, function(e, a, d) {
                            console.log("show4"), t.setData({
                                index4: a,
                                show4: !0,
                                town: d
                            });
                        });
                    });
                });
            });
        });
    },
    readAllCity: function(t, e, a) {
        var d = this, s = e;
        console.log("id1111111", e), d.getAdderssData(t, function(t) {
            for (var d = 0; d < t.length; d++) {
                if (console.log("22222222222222", t[d]), t[d].id == e) return void a(t[d].id, d, t);
                if (-1 == s) return void a(t[d].id, -1, t);
            }
        });
    },
    getOneAdderssData: function(e) {
        var a = this, d = t.index_change_byid_get_ads, s = {
            addressId: a.data.id
        };
        t.getHttpData(d, s, "get", function(t, d) {
            var s = t.data;
            a.setData({
                id: s.id,
                userid: s.userId,
                userName: s.username,
                mobile: s.mobile,
                detailed: s.detailAddress,
                provcode: s.provinceCode,
                citycode: s.cityCode,
                countycode: s.countryCode,
                towncode: s.townCode,
                postalcode: s.postcode,
                isJd: s.isOutAddress,
                id_default: s.isDefault ? 1 : 0
            }), e(s), console.log(s);
        });
    },
    getAdderssData: function(e, a) {
        var d = this, s = t.index_change_address_two_class, o = {
            parentId: e || 100,
            regionType: d.data.isJd
        };
        t.getHttpData(s, o, "POST", function(t, e) {
            console.log(t.data), a(t.data);
        });
    },
    bindPickerData: function() {},
    bindPickerChange: function(t) {
        var e = this, a = t.detail.value, d = e.data.adres[a].id;
        e.setData({
            "setupdata.provcode": d,
            "setupdata.citycode": null,
            "setupdata.countycode": null,
            "setupdata.towncode": null,
            index: t.detail.value,
            index2: null,
            index3: null,
            index4: null,
            show3: !1,
            show4: !1
        }), e.getAdderssData(d, function(t) {
            e.setData({
                city: t,
                show2: !0
            });
        });
    },
    bindPickerChange2: function(t) {
        var e = this, a = t.detail.value, d = e.data.city[a].id;
        e.setData({
            "setupdata.citycode": d,
            "setupdata.countycode": null,
            "setupdata.towncode": null,
            index2: t.detail.value,
            index3: null,
            index4: null,
            show4: !1
        }), e.getAdderssData(d, function(t) {
            e.setData({
                area: t,
                show3: !0
            });
        });
    },
    bindPickerChange3: function(t) {
        var e = this, a = t.detail.value, d = e.data.area[a].id;
        e.setData({
            "setupdata.countycode": d,
            "setupdata.towncode": null,
            index3: t.detail.value,
            index4: null
        }), e.getAdderssData(d, function(t) {
            t && t.length > 0 && e.setData({
                town: t,
                show4: !0
            });
        });
    },
    bindPickerChange4: function(t) {
        var e = this, a = t.detail.value, d = (e.data.town[a].parentId, e.data.town[a].id);
        e.setData({
            "setupdata.towncode": d,
            index4: t.detail.value
        });
    },
    bindUserName: function(t) {},
    bindMobile: function(t) {
        var e = t.detail.value.replace(/\s+/g, "");
        this.setData({
            "setupdata.mobile": e
        });
    },
    bindpostalcode: function(t) {
        var e = t.detail.value.replace(/\s+/g, "");
        this.setData({
            "setupdata.postalcode": e
        });
    },
    bindAddress: function(t) {},
    bindsuer: function() {
        var t = this;
        "newAddress" == t.data.id ? t.SubInsert() : t.SubUpdata();
    },
    formSubmit: function(t) {
        var e = this, a = t.detail.value.userName.replace(/\s+/g, ""), d = t.detail.value.address.replace(/\s+/g, "");
        e.setData({
            "setupdata.adddetails": d,
            "setupdata.username": a
        }), "newAddress" == e.data.id ? e.SubInsert() : e.SubUpdata();
    },
    setReg: function(t) {
        var e = this, a = e.data, d = a.index, s = a.index2, o = a.index3, i = a.index4;
        console.log("邮编", a.setupdata.postalcode), "" != a.setupdata.username ? "" != a.setupdata.mobile ? null != a.index && null != a.index2 && null != a.index3 && (1 != a.show4 || null != a.index4) && "" != a.setupdata.adddetails ? /^\d{11}$/.test(a.setupdata.mobile) ? null != a.setupdata.postalcode && "" != a.setupdata.postalcode ? null == a.setupdata.postalcode || "" == a.setupdata.postalcode || /^\d{6}$/.test(a.setupdata.postalcode) ? t({
            id: a.setupdata.id,
            userid: a.setupdata.userid,
            username: a.setupdata.username,
            mobile: a.setupdata.mobile,
            postcode: a.setupdata.postalcode,
            addr: (null != d ? a.adres[d].name : "") + (null != s ? " " + a.city[s].name : "") + (null != o ? " " + a.area[o].name : "") + (null != i ? " " + a.town[i].name : ""),
            detailAddress: a.setupdata.adddetails,
            provinceCode: a.setupdata.provcode || 0,
            cityCode: a.setupdata.citycode || 0,
            countryCode: a.setupdata.countycode || 0,
            townCode: a.setupdata.towncode || 0,
            isdefault: a.id_default,
            isOutAddress: 0 == a.isJd ? 1 : a.isJd
        }) : e.wetoast.toast({
            title: "邮政编码不正确",
            duration: 2e3
        }) : e.wetoast.toast({
            title: "请输入正确的邮政编码",
            duration: 2e3
        }) : e.wetoast.toast({
            title: "联系方式不正确",
            duration: 2e3
        }) : e.wetoast.toast({
            title: "请填写地址",
            duration: 2e3
        }) : e.wetoast.toast({
            title: "请填写联系方式",
            duration: 2e3
        }) : e.wetoast.toast({
            title: "请填写姓名",
            duration: 2e3
        });
    },
    SubInsert: function() {
        this.setReg(function(e) {
            var a = t.index_change_address_add, d = e;
            t.getHttpData(a, d, "put", function(t, e) {
                console.log(t), 200 == t.code ? wx.navigateBack({
                    delta: 1
                }) : wx.showToast({
                    title: "新增失败",
                    icon: "loading"
                });
            });
        });
    },
    SubUpdata: function() {
        var e = this;
        e.setReg(function(a) {
            var d = t.index_change_address_change, s = a;
            t.getHttpData(d, s, "POST", function(t, a) {
                if (200 != t.code) return wx.showToast({
                    title: "保存失败" + t.message
                }), !1;
                t.Data && wx.setStorageSync("defaultOder", e.data.setupdata.id), wx.navigateBack({
                    delta: 1
                });
            });
        });
    },
    binddelet: function() {
        var e = this, a = t.jd_address_delete + "?userId=" + e.data.setupdata.userid + "&id=" + e.data.setupdata.id;
        t.getHttpData(a, null, "get", function(t, e) {
            console.log(t), t.Data && wx.navigateBack({
                changed: !0
            });
        });
    },
    changeDefaultVal: function(t) {
        console.log(t);
        var e = t.detail.value;
        this.setData({
            id_default: e
        });
    }
});