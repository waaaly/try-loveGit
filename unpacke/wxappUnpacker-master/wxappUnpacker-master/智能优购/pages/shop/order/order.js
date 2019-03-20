function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = getApp();

Page({
    data: {
        isNull: !1,
        canChangeAddress: !0,
        isBack: !1,
        o: "",
        goods_id: 0,
        sku_id: 0,
        isChangeNum: !0,
        id: 0,
        oid: 0,
        poid: 0,
        attr: "",
        t: 1,
        geshu: 1,
        totalcost: 0,
        post: "",
        dataset: [],
        isload: !1,
        submitText: "提交",
        addrid: 0,
        brandtype: 0,
        loadlayer: !1,
        limitNum: 0,
        nums: 0,
        coverStatus: !1,
        addressObj: {},
        moneys: {
            express_money: 0,
            shop_money: 0
        },
        shop_num: 1,
        pv_data: {
            goods: {},
            sku: {}
        },
        text111: ""
    },
    getDefaultAds: function() {
        var t = this, e = t.data.pv_data.goods, o = e.goodsPropery;
        o = 2 == e.goodsPropery && 1 == e.channelId ? 2 : 1, console.log("isJD", o);
        var s = {
            isOutAddress: o
        };
        a.getHttpData(a.index_change_default_address, s, "get", function(a, e) {
            console.log("地址", a), 200 == a.code ? t.setData({
                addressObj: a.data,
                isNull: !0
            }) : t.setData({
                addressObj: "",
                isNull: !0
            });
        });
    },
    getOrder: function(e) {
        var o = this, s = e.oid, d = e.id, i = (e.t, e.brandtype), n = {
            oid: s,
            id: d,
            type: i,
            addrid: 0
        };
        wx.showLoading({
            title: "正在加载",
            mask: !0
        }), a.getHttpData(a.order_again_pay, n, "GET", function(a) {
            wx.hideLoading();
            var e = a.data;
            console.log("获取原订单", a);
            var d = {
                goodsId: e.goodsId,
                goodsPropery: e.goodsPropery,
                channelId: e.channelId,
                goodsName: e.goodsName
            }, i = t({
                promotionType: e.buyTypes,
                price: e.price,
                skuId: e.skuId,
                defaultPhotoPath: e.mainPic,
                goodsId: e.goodsId
            }, "promotionType", e.isGroup), n = {
                express_money: e.postCost,
                shop_money: e.totalCost
            }, r = {
                addr: e.addr,
                id: e.addrid,
                detailAddress: e.detailAddress,
                mobile: e.mobile
            };
            console.log("地址", r);
            var l = {
                goods: d,
                sku: i
            };
            o.setData({
                shop_num: e.nums,
                moneys: n,
                oid: s,
                pv_data: l,
                text111: "留言",
                addressObj: r
            });
        });
    },
    onLoad: function(t) {
        wx.hideLoading(), console.log("订单界面的参数", t), new a.WeToast(), console.log("on Load o ", t), 
        this.setData({
            o: t
        });
    },
    addText: function(t) {
        var a = t.detail.value;
        this.setData({
            text111: a
        });
    },
    downOrder: function() {
        var t = this, e = t.data.addressObj, o = t.data.oid;
        if (!e.id) return t.wetoast.toast({
            title: "请选择地址",
            duration: 2e3
        }), !1;
        var s = t.data.pv_data.sku, d = {
            goods_id: t.data.pv_data.goods.goodsId || 0,
            sku_id: s.skuId,
            addrid: e.id,
            oid: o,
            poid: 0,
            text: t.data.text111,
            attr: t.data.text111,
            num: t.data.shop_num,
            type: s.promotionType
        };
        wx.showLoading({
            title: "正在下单",
            mask: !0
        }), console.log("111111111参数11111111", d), a.getHttpData(a.shop_down_order + "?addrid=" + d.addrid + "&num=" + d.num + "&type=" + d.type, d, "POST", function(e, o) {
            if (console.log("下单信息", e), console.log("2222222222222222", e), 500 == e.code) return wx.hideLoading(), 
            t.wetoast.toast({
                title: e.msg,
                duration: 2e3
            }), !1;
            if (200 == e.code) {
                var s = e.data;
                wx.requestPayment({
                    timeStamp: s.TimeStamp,
                    nonceStr: s.NonceStr,
                    package: s.PackAge,
                    signType: "MD5",
                    paySign: s.PaySign,
                    success: function(e) {
                        if (wx.hideLoading(), console.log("支付成功"), t.wetoast.toast({
                            title: "支付成功",
                            duration: 2e3
                        }), console.log(s), s.isGiftOrder) if (0 == a.getUserinfoData().usertype) t.setData({
                            coverStatus: !0
                        }); else {
                            wx.switchTab({
                                url: "/pages/vip/vipIndex/vip"
                            });
                        } else {
                            a.tab = 2, wx.switchTab({
                                url: "/pages/user/order/order"
                            });
                        }
                    },
                    fail: function(a) {
                        console.log("微信请求 fail", a), wx.hideLoading(), t.setData({
                            oid: s.OID,
                            isChangeNum: !1
                        }), t.wetoast.toast({
                            title: "支付失败",
                            duration: 2e3
                        }), t.setData({
                            submitText: "重新支付",
                            canChangeAddress: !1
                        });
                    }
                });
            } else wx.hideLoading(), t.wetoast.toast({
                title: "下单失败",
                duration: 2e3
            });
        });
    },
    shopNumberAction: function(t) {
        var a = this;
        if (a.data.isChangeNum) {
            var e = t.currentTarget.dataset.type, o = this.data.shop_num;
            if (2 == e) {
                if (o - 1 <= 0) return;
                o -= 1;
            } else o += 1;
            console.log("-----------", o), a.updateShopNum(o);
        } else wx.showToast({
            title: "订单已提交，不能修改数量呦，亲！~",
            icon: "none"
        });
    },
    updateShopNum: function(t) {
        var e = this, o = {
            goodsId: e.data.pv_data.goods.goodsId,
            skuId: e.data.pv_data.sku.skuId,
            count: t
        };
        wx.showLoading({
            title: "正在操作",
            mask: !0
        }), a.getHttpData(a.shopDatailMoney, o, "GET", function(t) {
            if (console.log("1111111111", 200 == t.code), wx.hideLoading(), 200 == t.code) {
                var a = t.data, o = {
                    express_money: a.postCost,
                    shop_money: a.totalCost
                };
                e.setData({
                    shop_num: a.count,
                    moneys: o
                });
            }
        });
    },
    gotoAds: function() {
        var t = this.data.pv_data.goods, a = 1;
        2 == t.goodsPropery && 1 == t.channelId && (a = 2), wx.navigateTo({
            url: "/pages/shop/addresslist/addresslist?type=" + a + "&sel=2"
        });
    },
    bindSelectAddress: function() {
        this.selectAddr();
    },
    selectAddr: function() {
        this.data.isload || (this.setData({
            isload: !0
        }), console.log("this.data.brandtype:" + this.data.brandtype), 1 == this.data.brandtype ? (this.setData({
            isload: !1
        }), this.JDAddress()) : (this.setData({
            isload: !0
        }), this.nativeAddress()));
    },
    JDAddress: function() {
        wx.navigateTo({
            url: "/pages/shop/addresslist/addresslist"
        });
    },
    nativeAddress: function() {
        var t = this;
        wx.chooseAddress({
            success: function(e) {
                var o = e.provinceName + e.cityName + e.countyName + e.detailInfo, s = e.postalCode, d = e.userName, i = e.telNumber;
                t.setData({
                    "dataset.addrname": d + " " + i,
                    "dataset.addrinfo": o
                });
                var n = {
                    address: o,
                    postalcode: s,
                    username: d,
                    mobile: i
                };
                a.getHttpData(a.domain + "/user/addaddr", n, "POST", function(a) {
                    console.log(a.id), t.setData({
                        addrid: a.id
                    }), wx.setStorageSync("addrid", a.id);
                });
            },
            fail: function(a) {
                console.log(a), console.log(a.errMsg), "chooseAddress:fail auth deny" == a.errMsg && wx.OpenSetting({
                    success: function(a) {
                        a.authSetting["scope.address"] ? t.selectAddr() : t.wetoast.toast({
                            title: "授权失败",
                            duration: 2e3
                        });
                    }
                });
            },
            complete: function(a) {
                console.log(a), t.setData({
                    isload: !1
                });
            }
        });
    },
    bindBuyNumsTap: function(t) {
        n = this;
        if (this.data.oid > 0) n.wetoast.toast({
            title: "重新支付不能改个数",
            duration: 2e3
        }); else {
            var e = this.data.t;
            if (2 != e) {
                var o = parseInt(t.currentTarget.dataset.inc);
                console.log(o);
                var s = this.data.id, d = this.data.geshu, i = parseInt(this.data.geshu);
                if (!((d = i + o) < 1)) if (this.setData({
                    geshu: d
                }), parseInt(n.data.limitNum) > 0 && d > n.data.limitNum) n.wetoast.toast({
                    title: "限购" + n.data.limitNum + "件",
                    duration: 2e3
                }); else if (d > n.data.nums) n.wetoast.toast({
                    title: "库存不足",
                    duration: 2e3
                }); else {
                    var n = this;
                    a.getHttpData(a.domain + "/orders/buynums?id=" + s + "&geshu=" + d + "&type=" + e, null, "GET", function(t) {
                        console.log(t), null == t || "" != t.message ? n.setData({
                            geshu: i
                        }) : n.setData({
                            totalcost: t.totalcost,
                            post: t.post
                        });
                    });
                }
            } else n.wetoast.toast({
                title: "抽奖限购一件",
                duration: 2e3
            });
        }
    },
    bindConfirmTab: function(t) {
        if (!this.data.isload) if (0 != this.data.addrid) {
            var e = t.detail.value.textarea, o = {
                goods_id: this.data.goods_id,
                sku_id: this.data.sku_id,
                id: this.data.id,
                oid: this.data.oid,
                poid: this.data.poid,
                attr: this.data.attr,
                geshu: this.data.geshu,
                type: this.data.t,
                text: e,
                addrid: this.data.addrid
            };
            console.log("下单"), console.log(o), this.setData({
                submitText: "请稍后..."
            });
            var s = this;
            this.setData({
                isload: !0
            }), a.getHttpData(a.shop_down_order, o, "POST", function(t) {
                console.log(t), s.setData({
                    isload: !1
                }), "ok" != t.result ? "登录失败" == t.error ? (s.wetoast.toast({
                    title: "登录过期，请重新下单",
                    duration: 2e3
                }), a.removekey(), setTimeout(function() {
                    wx.navigateBack();
                }, 1e3)) : (s.setData({
                    submitText: "重新支付"
                }), s.wetoast.toast({
                    title: t.error,
                    duration: 2e3
                })) : wx.requestPayment({
                    timeStamp: t.timeStamp,
                    nonceStr: t.nonceStr,
                    package: t.package,
                    signType: "MD5",
                    paySign: t.paySign,
                    success: function(a) {
                        s.jumpBuyOk(t);
                    },
                    fail: function(a) {
                        s.setData({
                            oid: t.oid
                        }), s.setData({
                            isLoad: !1
                        }), s.wetoast.toast({
                            title: "支付失败",
                            duration: 2e3
                        }), s.setData({
                            submitText: "重新支付"
                        });
                    }
                });
            });
        } else this.wetoast.toast({
            title: "请选择邮寄地址",
            duration: 2e3
        });
    },
    jumpBuyOk: function(t) {
        console.log(t), this.setData({
            submitText: "正在确认交易.."
        });
        var e = this, o = "", s = "";
        0 == parseInt(e.data.t) ? (o = "/pages/user/detail/detail?oid=" + t.oid, s = a.domain + "/orders/confirmorder/?oid=" + t.oid + "&type=0") : (o = "/pages/user/pinok/pinok?oid=" + t.oid + "&poid=" + e.data.poid, 
        s = a.domain + "/orders/confirmorder/?oid=" + t.oid + "&type=1");
        var d = setInterval(function() {
            console.log(s), a.getHttpData(s, null, "GET", function(t) {
                console.log(t), t.state > 0 && (clearInterval(d), wx.redirectTo({
                    url: o
                }));
            });
        }, 1e3);
    },
    onShow: function() {
        var t = this.data.o;
        if (1 == t.isOrderTap && this.setData({
            isChangeNum: !1
        }), t.oid) this.getOrder(t); else {
            var a = getCurrentPages(), e = (a[a.length - 1], a[a.length - 2].data);
            console.log("onLoad  goods", e.dataset.goods), this.setData({
                pv_data: {
                    goods: e.dataset.goods,
                    sku: e.sku.skuObj
                }
            }), this.updateShopNum(e.shop_num), this.data.isBack ? this.setData({
                isBack: !1
            }) : this.getDefaultAds();
        }
    },
    onMyLoad: function(t) {
        new a.WeToast();
        var e = t.brandtype || 0;
        this.setData({
            brandtype: e
        });
        t.goods_id, t.sku_id;
        var o = t.oid || 0, s = t.poid || 0, d = t.t || 0, i = t.geshu || 1, n = t.attr;
        if (this.setData({
            attr: n
        }), console.log("brandtype:"), console.log(e), console.log("options.brandtype:" + e), 
        "1" == e) {
            r = wx.getStorageSync("defaultOder") || 0;
            this.loadJDAddress();
        } else var r = wx.getStorageSync("addrid") || 0;
        var l = t.main || !1;
        this.setData({
            frommain: l,
            id: id,
            t: d,
            geshu: i,
            addrid: r,
            oid: o,
            poid: s
        }), this.loadData();
    },
    loadData: function() {
        var t = this.data.id, e = this.data.oid, o = (this.data.poid, this.data.addrid), s = this.data.t, d = this;
        a.getHttpData(a.domain + "/shop/order/?oid=" + e + "&id=" + t + "&type=" + s + "&addrid=" + o, null, "GET", function(t) {
            wx.stopPullDownRefresh(), console.log(t), d.setData({
                limitNum: t.goLimit,
                nums: t.nums
            }), d.setData({
                dataset: t,
                totalcost: t.totalcost,
                post: t.post,
                brandtype: t.brandtype
            }), t.attr && t.attr.length > 0 && d.setData({
                attr: t.attr
            }), d.setData({
                loadlayer: !1
            });
        });
    },
    loadJDAddress: function() {
        var t = this, e = wx.getStorageSync("defaultOder") || "";
        "" != e && a.getHttpData(a.jd_get_address_by_id + "?id=" + e, null, "GET", function(a) {
            console.log(a), console.log(a.Data), t.setData({
                "dataset.addrname": a.Data.username + " " + a.Data.mobile,
                "dataset.addrinfo": a.Data.address
            }), t.setData({
                addrid: a.Data.id
            }), wx.setStorageSync("defaultOder", a.Data.id);
        });
    },
    onPullDownRefresh: function() {
        this.loadData();
    },
    confirm: function() {
        this.setData({
            coverStatus: !1
        }), wx.switchTab({
            url: "/pages/vip/vipIndex/vip"
        });
    }
});