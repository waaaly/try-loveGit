var e = getApp(), t = e.globalData.mp, a = e.globalData.config;

Component({
    properties: {
        address: {
            type: Object,
            value: {
                id: "",
                consignee: "",
                mobile: "",
                province: "",
                city: "",
                district: "",
                street: "",
                needL4Addr: !1,
                address: "",
                defaultFlag: 0
            },
            observer: function(e) {
                var t = this, a = t.data.newAddress, d = Object.assign({}, t._addressFilter(e));
                t._watchAddress(d, a);
            }
        }
    },
    data: {
        newAddress: {
            id: "",
            consignee: "",
            mobile: "",
            province: "",
            provinceName: "",
            city: "",
            cityName: "",
            district: "",
            districtName: "",
            street: "",
            streetName: "",
            needL4Addr: !1,
            address: "",
            defaultFlag: 0
        },
        showRegionPicker: !1,
        clearIcons: {
            consignee: "",
            mobile: "",
            address: ""
        },
        onceDefaultShow: !0,
        toastOptions: {
            title: "",
            mask: !1,
            duration: 1500
        },
        funcType: ""
    },
    attached: function() {
        var e = this;
        e.setData({
            funcType: e.data.newAddress.id ? "编辑收货人信息" : "添加收货人信息",
            onceDefaultShow: "1" != e.data.newAddress.defaultFlag
        }), e.data.newAddress.needL4Addr && e.toOpenAddress(), e.refreshStopClick();
    },
    detached: function() {
        this.refreshStopClick();
    },
    methods: {
        _watchAddress: function(e, a) {
            if (t.isObjectEqual(e, a)) return !1;
            var d = this;
            d.setData({
                funcType: e.id ? "编辑收货人信息" : "添加收货人信息",
                onceDefaultShow: "1" != e.defaultFlag,
                newAddress: e
            }), e.needL4Addr && d.toOpenAddress();
        },
        checkValue: function(e) {
            var t = this, a = e.currentTarget.id, d = t.data.clearIcons;
            "" != e.detail.value && (d[a] = "show"), "input" == e.type && (t.data.newAddress[a] = e.detail.value), 
            t.setData({
                clearIcons: d
            });
        },
        clearInputValue: function(e) {
            var t = this, a = e.currentTarget.dataset.contentid, d = t.data.clearIcons, s = t.data.newAddress;
            d[a] = "", s[a] = "", t.setData({
                newAddress: s,
                clearIcons: d
            });
        },
        clearIcon: function(e) {
            var t = this.data.clearIcons;
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
            var t = this, a = t.data.newAddress, d = e.detail.region, s = e.detail.needL4Addr;
            Object.assign(a, d, {
                needL4Addr: s
            }), t.setData({
                region: d,
                newAddress: a
            });
        },
        toSetDefault: function() {
            var e = this, t = e.data.newAddress.defaultFlag;
            t = t && 1 == t ? 0 : 1, e.setData({
                "newAddress.defaultFlag": t
            });
        },
        toSaveAddress: function() {
            var e = this;
            if (e.canStopClick()) return !1;
            var d = {
                consignee: [ e.data.newAddress.consignee, /^[A-Za-z0-9\-\_\u4e00-\u9fa5]{2,10}$/, "收货人只支持中英文、数字、下划线或减号(2-10个字)" ],
                mobile: [ e.data.newAddress.mobile, /^1[0-9]{10}$/, "手机号码格式不正确" ],
                address: [ e.data.newAddress.address.replace(/[\r\n]/g, ""), /^.{2,50}$/, "请输入详细地址(2-50个字)" ]
            };
            if (e.data.newAddress.consignee.length < 1) return wx.showModal({
                title: "提示",
                content: "收货人请输入2-10个字",
                showCancel: !1
            }), !1;
            if (e.data.newAddress.mobile.length < 1) return wx.showModal({
                title: "提示",
                content: "请输入手机号码",
                showCancel: !1
            }), !1;
            if ("" == e.data.newAddress.province) return wx.showModal({
                title: "提示",
                content: "请选择地区！",
                showCancel: !1
            }), !1;
            if (e.data.newAddress.needL4Addr) return e.setData({
                toastOptions: {
                    title: "您的地址信息不全，完善街道地址后才能使用哦",
                    duration: 1500
                }
            }), e.toOpenAddress(), !1;
            if (e.data.newAddress.address.length < 1) return wx.showModal({
                title: "提示",
                content: "请输入详细地址",
                showCancel: !1
            }), !1;
            for (var s in d) {
                var n = d[s], i = n[0], r = n[1], o = n[2];
                if (!r.test(i)) return wx.showModal({
                    title: "提示",
                    content: o,
                    showCancel: !1
                }), !1;
            }
            t.getCsrf(function(d) {
                var s = e.data.newAddress, n = s.id, i = s.consignee, r = s.mobile, o = s.province, c = s.city, l = s.district, u = s.street, f = s.address, w = s.defaultFlag, p = "";
                p = "添加收货人信息" == e.data.funcType ? a.service.addressDomain + "/address/add.json" : a.service.addressDomain + "/address/modify/" + n + ".json", 
                t.mpPost(p, {
                    consignee: i,
                    mobile: r,
                    province: o,
                    city: c,
                    district: l,
                    street: u,
                    address: f,
                    defaultFlag: w,
                    CsrfToken: d
                }, {
                    successFunc: function(t) {
                        t.data.success ? t.data.shoppingConfig && t.data.shoppingConfig.id ? e.triggerEvent("save", {
                            newAddress: t.data.shoppingConfig
                        }) : wx.showModal({
                            title: "提示",
                            content: "保存失败，请稍后再试",
                            showCancel: !1
                        }) : t.data.msg && wx.showModal({
                            title: "提示",
                            content: t.data.msg,
                            showCancel: !1
                        });
                    }
                }, {
                    "content-type": "application/x-www-form-urlencoded"
                });
            }, function() {
                wx.showModal({
                    title: "提示",
                    content: "保存失败，请稍后再试",
                    showCancel: !1
                });
            });
        },
        _addressFilter: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return {
                id: e.id || "",
                consignee: e.consignee || "",
                mobile: e.mobile || "",
                province: e.province || "",
                provinceName: e.provinceName || "",
                city: e.city || "",
                cityName: e.cityName || "",
                district: e.district || "",
                districtName: e.districtName || "",
                street: e.street || "",
                streetName: e.streetName || "",
                needL4Addr: Boolean(e.needL4Addr),
                address: e.address || "",
                defaultFlag: e.defaultFlag || 0
            };
        },
        canStopClick: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "fnFlag", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3e3, a = this;
            return a.data.isStopClickedObj = a.data.isStopClickedObj || {}, a.data.timerObj = a.data.timerObj || {}, 
            !!a.data.isStopClickedObj[e] || (a.data.isStopClickedObj[e] = !0, a.data.timerObj[e] = setTimeout(function() {
                a.data.isStopClickedObj[e] = !1;
            }, t), !1);
        },
        refreshStopClick: function(e) {
            var a = this;
            return !t.mpIsEmpty(a.data.timerObj) && (e && !t.mpIsEmpty(a.data.timerObj[e]) ? (clearTimeout(a.data.timerObj[e]), 
            delete a.data.timerObj[e], delete a.data.isStopClickedObj[e], !1) : (Object.keys(a.data.timerObj).forEach(function(e) {
                clearTimeout(a.data.timerObj[e]);
            }), a.data.isStopClickedObj = {}, void (a.data.timerObj = {})));
        }
    }
});