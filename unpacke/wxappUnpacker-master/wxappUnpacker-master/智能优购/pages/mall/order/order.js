var t = getApp();

Page({
    data: {
        id: 0,
        oid: 0,
        geshu: 1,
        totalcost: 0,
        post: "",
        dataset: [],
        isload: !1,
        submitText: "提交",
        addrid: 0,
        loadlayer: !0
    },
    bindShareTap: function() {
        wx.navigateTo({
            url: "/pages/index/share/share"
        });
    },
    bindSelectAddress: function() {
        this.selectAddr();
    },
    selectAddr: function() {
        if (!this.data.isload) {
            this.setData({
                isload: !0
            });
            var a = this;
            wx.chooseAddress({
                success: function(e) {
                    var s = e.provinceName + e.cityName + e.countyName + e.detailInfo, d = e.postalCode, i = e.userName, o = e.telNumber;
                    a.setData({
                        "dataset.addrname": i + " " + o,
                        "dataset.addrinfo": s
                    });
                    var n = {
                        address: s,
                        postalcode: d,
                        username: i,
                        mobile: o
                    };
                    t.getHttpData(t.domain + "/user/addaddr", n, "POST", function(t) {
                        console.log(t.id), a.setData({
                            addrid: t.id
                        }), wx.setStorageSync("addrid", t.id);
                    });
                },
                fail: function(t) {
                    console.log(t), console.log(t.errMsg), "chooseAddress:fail auth deny" == t.errMsg && wx.openSetting({
                        success: function(t) {
                            t.authSetting["scope.address"] ? a.selectAddr() : a.wetoast.toast({
                                title: "授权失败",
                                duration: 2e3
                            });
                        }
                    });
                },
                complete: function(t) {
                    console.log(t), a.setData({
                        isload: !1
                    });
                }
            });
        }
    },
    bindBuyNumsTap: function(a) {
        var e = this, s = parseInt(a.currentTarget.dataset.inc), d = this.data.id, i = this.data.geshu, o = parseInt(this.data.geshu);
        if (!((i = o + s) < 1)) {
            this.setData({
                geshu: i
            });
            e = this;
            t.getHttpData(t.domain + "/mall/buynums?id=" + d + "&geshu=" + i, null, "GET", function(t) {
                console.log(t), null == t || "" != t.message ? e.setData({
                    geshu: o
                }) : e.setData({
                    totalcost: t.totalcost
                });
            });
        }
    },
    bindConfirmTab: function(a) {
        if (!this.data.isload) if (0 != this.data.addrid) {
            var e = a.detail.value.textarea, s = {
                id: this.data.id,
                geshu: this.data.geshu,
                text: e,
                addrid: this.data.addrid
            };
            console.log(s), this.setData({
                submitText: "请稍后..."
            });
            var d = this;
            this.setData({
                isload: !0
            }), t.getHttpData(t.domain + "/mall/submit", s, "POST", function(a) {
                if (console.log(a), d.setData({
                    isload: !1
                }), "ok" != a.result) "登录失败" == a.error ? (d.wetoast.toast({
                    title: "登录过期，请重新下单",
                    duration: 2e3
                }), t.removekey(), setTimeout(function() {
                    wx.navigateBack();
                }, 1e3)) : (d.setData({
                    submitText: "提交"
                }), d.wetoast.toast({
                    title: a.error,
                    duration: 2e3
                })); else {
                    var e = "/pages/user/detail/detail?oid=" + a.oid;
                    wx.redirectTo({
                        url: e
                    });
                }
            });
        } else this.wetoast.toast({
            title: "请选择邮寄地址",
            duration: 2e3
        });
    },
    onLoad: function(a) {
        new t.WeToast();
        var e = a.id || 0, s = a.oid || 0, d = a.geshu || 1, i = wx.getStorageSync("addrid") || 0, o = a.main || !1;
        this.setData({
            frommain: o,
            id: e,
            geshu: d,
            addrid: i,
            oid: s
        }), this.loadData();
    },
    loadData: function() {
        var a = this.data.id, e = (this.data.oid, this.data.poid, this.data.addrid), s = (this.data.t, 
        this);
        t.getHttpData(t.domain + "/mall/order/?id=" + a + "&addrid=" + e, null, "GET", function(t) {
            wx.stopPullDownRefresh(), console.log(t), s.setData({
                dataset: t,
                totalcost: t.totalcost,
                post: t.post
            }), s.setData({
                loadlayer: !1
            });
        });
    },
    onPullDownRefresh: function() {
        this.loadData();
    }
});