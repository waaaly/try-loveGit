function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = getApp(), e = require("../../../184D8FB32546F6CF7E2BE7B4F125B753.js").phoneService;

Page({
    data: {
        isClick: !0,
        buyStatus: "0",
        skuCopy: "",
        isGift: !1,
        list1: [ "http://pic0.gzcfe.net/brand/2018/1015/5611611332440998541.jpg", "http://pic0.gzcfe.net/brand/2018/1015/5611611332440998541.jpg", "http://pic0.gzcfe.net/brand/2018/1015/5611611332440998541.jpg" ],
        scroll_top: 0,
        top_list: [],
        content_index: 0,
        id: 0,
        check_buy: !0,
        dataset: [],
        frommain: !1,
        buytype: 0,
        isShare: "2",
        brandtype: "0",
        attrname: [],
        maskShow: !1,
        layclass: "",
        loadlayer: !0,
        btnWidth: "30%",
        shop_num: 1,
        sku: {
            txt: "",
            skuObj: {},
            select: [ -1, -1 ],
            show: !1
        },
        des1: "",
        des2: "",
        skuStr: ""
    },
    is_collection: 0,
    shopNumberAction: function(t) {
        var a = this, e = t.currentTarget.dataset.type, o = this.data.shop_num;
        if (1 == e) {
            if (o - 1 <= 0) return;
            o -= 1;
        } else o += 1;
        a.setData({
            shop_num: o
        });
    },
    bindShareTap: function(t) {
        var e = this;
        a.getuserinfo(t, function(t, a) {
            console.log("res", t), t && a && e.valiDateInfo();
        }, e.data.id, e);
    },
    goWbv: function() {
        var t = encodeURIComponent("https://v2.live800.com/live800/chatClient/chatbox.jsp?companyID=1101830&configID=127399&jid=9094269650&s=1");
        wx.navigateTo({
            url: "../../webViwe/webViwe?page=" + t
        });
    },
    valiDateInfo: function() {
        var t = this;
        a.getHttpData(a.myCenter_index, null, "GET", function(e) {
            wx.stopPullDownRefresh(), 0 == e.userid ? a.removekey() : (console.log("kk", e), 
            t.setData({
                isShare: 1
            }));
        });
    },
    clickProto: function(t) {
        var a = t.currentTarget.dataset.index, e = this.data.sku;
        e.select[(a = a.split(","))[0]] = a[1], this.setData({
            sku: e
        }), this.renderProto();
    },
    judgePhone: function(t) {
        e.getPhone(this.data.id), console.log("判断电话接口e", t), console.log("phone", this.data.id);
    },
    nowBuy: function(t) {
        var o = this;
        if (t.detail.userInfo) {
            if (console.log("我在重复点击"), console.log(t), o.data.isClick) {
                wx.showLoading({
                    title: "处理中",
                    mask: !0
                }), o.setData({
                    isClick: !1
                });
                var s = !1, n = o.data.skuStr, i = o.data.skuCopy.seekGoodsSkuVOS;
                if (console.log("有的id列表", i), console.log("选择的id", n), n) for (var r = 0; r < i.length; r++) i[r].normIds != n || (s = !0); else s = !0;
                if (s) {
                    var d = this.data.sku.skuObj.promotionType;
                    console.log("商品类型", d), a.getuserinfo(t, function(s, n) {
                        console.log("是否登录", s, n), s && !a.globalData.isLogin ? e.getPhone(o.data.id, function(a) {
                            if (console.log("resdata", a), a) return !1;
                            o.gotoOrderPage(t);
                        }) : o.setData({
                            isClick: !0
                        });
                    }, o.data.id, o);
                } else wx.showToast({
                    title: "您选的规格已下架",
                    icon: "none"
                });
            }
        } else o.setData({
            isClick: !0
        });
    },
    gotoOrderPage: function() {
        wx.navigateTo({
            url: "/pages/shop/order/order"
        });
    },
    clickCollection: function(t) {
        console.log("获取手机号", t);
        var e = this;
        a.getuserinfo(t, function(t) {
            e.shopCollectionChange();
        }, e.data.id, e);
    },
    shopCollectionChange: function() {
        var t = this;
        e.getPhone(this.data.id);
        var o = t.data.is_collection, s = a.getuserid(), n = t.data.dataset.goods.goodsId, i = t.data.sku.skuObj;
        if (!n) return !1;
        var r = {
            skuId: i.skuId,
            goodsId: n,
            userId: s
        }, d = {};
        d.collectId = o, wx.showLoading({
            title: "正在操作"
        });
        var l = 0 != o ? a.myCollectionCancel : a.myCollectionAdd;
        console.log(o), console.log("参数收藏data1 : data2", r), console.log("参数收藏data1 : data2", d), 
        a.getHttpData(l, 0 == o ? r : d, "get", function(a, e) {
            if (wx.hideLoading(), console.log(a, e), 200 != a.code) return t.wetoast.toast({
                title: "操作失败",
                duration: 2e3
            }), !1;
            o = 0 != o ? 0 : a.data, t.setData({
                is_collection: o
            }), t.wetoast.toast({
                title: "操作成功",
                duration: 2e3
            });
        });
    },
    defaultProto: function() {
        var t = this, a = this.data.sku, e = this.data.dataset.sku, o = e.seekGoodsSkuVOS, s = e.seekGoodsItemVOS, n = [];
        if (!s.length) return a.skuObj = o[0], this.setData({
            sku: a
        }), !1;
        var i = o[0].normText, r = [];
        (i = JSON.parse(i)).map(function(t) {
            r.push(t.sysIdString);
        });
        for (var d = [], l = 0; l < s.length; l++) !function(t) {
            s[t].norms.map(function(a, e) {
                r[t] == a.sysIdString && (d[t] = e, n.push('"' + a.normName + '"'));
            });
        }(l);
        return a.select = d, a.txt = n.join(","), a.skuObj = o[0], t.setData({
            sku: a
        }), console.log(d), !1;
    },
    renderProto: function() {
        var t = this, a = [], e = this.data.sku, o = this.data.dataset.sku, s = e.select, n = o.seekGoodsSkuVOS, i = o.seekGoodsItemVOS;
        if (!i.length) return e.skuObj = n[0], this.setData({
            sku: e
        }), !1;
        var r = [];
        s.map(function(t, e) {
            r.push(i[e].norms[t].sysIdString), a.push('"' + i[e].norms[t].normName + '"');
        }), console.log(r), console.log(a), r && r.length > 1 ? this.setData({
            skuStr: r[0] + "-" + r[1]
        }) : r && 1 == r.length && this.setData({
            skuStr: r[0]
        }), n.map(function(o, s) {
            var n = o.normIds;
            console.log(n);
            var i = 0;
            return r.map(function(t) {
                if (-1 != n.indexOf(t) && (i++, console.log(i), console.log(r.length), i == r.length)) return e.skuObj = o, 
                !1;
            }), e.txt = a.join("、"), console.log("sku======", e), t.setData({
                sku: e
            }), !1;
        });
    },
    toggleView: function(t) {
        var a = t.currentTarget.dataset.index;
        console.log("click", a), console.log("click", t);
        var e = this.data.top_list;
        if (!e.length) return !1;
        console.log(e), this.setData({
            content_index: a,
            scroll_top: e[a]
        });
    },
    scrollWin: function(t) {
        var a = this, e = t.detail.scrollTop, o = a.data.top_list, s = a.data.content_index, n = wx.getSystemInfoSync();
        e < o[1] - 50 ? s = 0 : e > o[1] && e < o[2] - n.windowHeight ? s = 1 : e > o[2] - n.windowHeight && (s = 2), 
        a.setData({
            content_index: s
        });
    },
    setViewHeight: function() {
        var t = this, a = this;
        setTimeout(function() {
            var e = [ "head", "content", "recommend" ];
            a.data.dataset.goods.datail_imgs.length || e.splice(1, 0), a.data.dataset.list || e.splice(2, 0);
            var o = [], s = wx.createSelectorQuery().in(t);
            e.map(function(t, e) {
                s.select("#" + t).boundingClientRect(function(t) {
                    t && (o[e] = parseInt(t.top - 20), a.setData({
                        top_list: o
                    }));
                }).exec();
            });
        }, 1e3);
    },
    showSku: function() {
        var t = this.data.sku;
        if (!t.skuObj || !t.skuObj.skuId) return console.log("没有SKU"), wx.showToast({
            title: "商品异常"
        }), !1;
        t.show = !0, this.setData({
            sku: t
        });
    },
    hideSku: function() {
        var t = this.data.sku;
        t.show = !1, this.setData({
            sku: t
        });
    },
    getMyInfo: function() {
        return !1;
    },
    onShow: function() {
        this.setData({
            isClick: !0
        }), this.isShare();
    },
    isShare: function() {
        var t = this;
        console.log("进入分享判断", "" == a || !a);
        var a = wx.getStorageSync("userid");
        a ? (t.setData({
            isShare: 1
        }), wx.showShareMenu()) : (t.setData({
            isShare: 2
        }), wx.hideShareMenu());
    },
    bindBuyTap2: function(t) {
        var e = this;
        e.data.seekGoodsSkuVOS;
        a.getuserinfo(t, function(a, o) {
            console.log("ressssssssssss", a), a && (console.log(a), e.bindBuyTap(t));
        }, e.data.id, e);
    },
    bindGoHomeTap: function() {
        this.data.frommain ? wx.navigateBack({}) : wx.switchTab({
            url: "/pages/index/index/index"
        });
    },
    bindBuyTap: function(t) {
        if (this.setData({
            buytype: t.currentTarget.dataset.type
        }), console.log(this.data.buytype + "sss"), console.log(this.data.attrname), t.currentTarget.dataset.attr) {
            var a = this;
            for (var e in this.data.attrname) if ("" == this.data.attrname[e]) return void a.wetoast.toast({
                title: "请选择" + e,
                duration: 2e3
            });
        } else for (var e in this.data.attrname) return void this.setData({
            layclass: "layerin",
            maskShow: !0
        });
        (a = this).goBuy(t);
    },
    bindPinTuanTap2: function(t) {
        var e = this;
        a.getuserinfo(t, function(a, o) {
            a && o && (console.log(a), e.downOrder(t));
        }, e.data.id, e);
    },
    bindPinTuanTap: function(t) {
        if (t.currentTarget.dataset.attr) {
            e = this;
            for (var a in this.data.attrname) if ("" == this.data.attrname[a]) return void e.wetoast.toast({
                title: "请选择" + a,
                duration: 2e3
            });
        } else for (var a in this.data.attrname) return void this.setData({
            layclass: "layerin",
            maskShow: !0
        });
        var e = this, o = t.currentTarget.dataset.oid;
        console.log(o);
        var s = t.currentTarget.dataset.brandtype;
        if (e.data.dataset.goods.isbuy) e.wetoast.toast({
            title: "请勿重复购买",
            duration: 2e3
        }); else {
            var n = "/pages/shop/order/order?id=" + e.data.dataset.goods.id + "&t=1&poid=" + o + "&brandtype=" + s;
            wx.navigateTo({
                url: n
            });
        }
    },
    goBuy: function(t) {
        console.log(this.data.buytype);
        var a = "";
        for (var e in this.data.attrname) a += e + ":" + this.data.attrname[e] + ",";
        a.length > 1 && (a = a.substring(0, a.length - 1)), console.log(this.data.buytype);
        var o = this.data.buytype, s = "/pages/shop/order/order?t=" + o + "&geshu=1&attr=" + a + "&brandtype=" + this.data.brandtype + "&sku_id=" + this.data.sku.skuObj.skuId + "&goods_id=" + this.data.dataset.goods.goodsId;
        console.log(s), 0 == o ? wx.navigateTo({
            url: s
        }) : this.data.dataset.goods.isgroup ? wx.navigateTo({
            url: s
        }) : this.wetoast.toast({
            title: "不支持拼团",
            duration: 2e3
        });
    },
    bindShopTap: function(t) {
        var a = this.data.dataset.goods.shopid;
        wx.navigateTo({
            url: "/pages/shop/seller/seller?shopid=" + a
        });
    },
    bindGoBrandTap: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.redirectTo({
            url: "/pages/shop/content/content?id=" + a
        });
    },
    bindHideBuyTap: function() {
        this.setData({
            layclass: "layerout",
            maskShow: !1
        });
    },
    onLoad: function(t) {
        console.log(t), t.gift && 1 == t.gift ? this.setData({
            isGift: !0
        }) : this.setData({
            isGift: !1
        }), console.log("进入商品详情页带的参数", t), new a.WeToast(), this.getMyInfo();
        var e = t.id || t.scene || 0;
        console.log(e), t && t.shareid;
        var o = t.main || !1;
        this.setData({
            frommain: o,
            id: e
        }), this.loadData();
    },
    getLeftPageUrl: function() {
        var t = getCurrentPages(), a = t[t.length - 1], e = a.route, o = a.options, s = "/" + e + "?";
        for (var n in o) s += n + "=" + o[n] + "&";
        return s = s.substring(0, s.length - 1);
    },
    addHisttory: function() {
        var t = this.data.dataset.goods.goodsId;
        a.getHttpData(a.shop_histiry_add, {
            goodsId: t
        }, "post", function(t) {
            console.log("res", t);
        });
    },
    loadData: function() {
        var t = this.data.id;
        console.log("id", t);
        var e = this;
        a.getHttpData(a.shopDatail + "?id=" + t, null, "GET", function(t) {
            wx.stopPullDownRefresh();
            var a = t.data, o = a.goods, s = a.sku;
            e.setData({
                skuCopy: a.sku,
                buyStatus: a.isCanBuy
            });
            var n = o.proDescription;
            if (n) {
                var i = n.split("?"), r = i[0], d = i[1];
                e.setData({
                    des1: r,
                    des2: d
                });
            }
            wx.setNavigationBarTitle({
                title: o.goodsTitle
            }), e.setData({});
            var l = [];
            s.seekGoodsItemVOS.map(function(t) {
                l.push(0);
            });
            var u = e.data.sku;
            u.select = l;
            var c = "", g = [];
            t.data.goods.seekGoodsImgsVOS.forEach(function(t) {
                1 == t.photoType ? c = t.photoUrl : 3 == t.photoType && g.push(t.photoUrl);
            }), o.datail_imgs = g, console.log("700 dataSet", a), console.log("数贝=============", a), 
            e.setData({
                is_collection: s.collectId,
                dataset: a,
                sku: u,
                brandtype: o.goodsPropery
            }), e.addHisttory(), e.defaultProto(), e.setViewHeight(), e.setData({
                loadlayer: !1
            });
        });
    },
    leftTimer: function(t) {
        t = t.replace(/-/g, "/");
        var a = new Date(t) - new Date(), e = parseInt(a / 1e3 / 60 / 60 / 24, 10), o = parseInt(a / 1e3 / 60 / 60 % 24, 10), s = parseInt(a / 1e3 / 60 % 60, 10), n = parseInt(a / 1e3 % 60, 10);
        return e < 10 && (e = "0" + e), o < 10 && (o = "0" + o), s < 10 && (s = "0" + s), 
        n < 10 && (n = "0" + n), o + ":" + s + ":" + n;
    },
    onPullDownRefresh: function() {
        this.loadData();
    },
    onShareAppMessage: function(t) {
        var e = this.data.dataset.goods.defaultProtourl, o = this.data.dataset.goods.goodsName, s = this.data.dataset.goods.goodsId, n = a.getuserid();
        console.log("商品信息", this.data.dataset.goods), console.log("商品id", s), console.log("分享人id", n);
        var i = "/pages/shop/content/content?id=" + s + "&shareid=" + n;
        return console.log(i), {
            title: o,
            imageUrl: e,
            path: i
        };
    },
    bindCloseWinTap: function() {
        this.setData({
            layclass: "",
            maskShow: !1
        });
    },
    bindSelectAttrTap: function(a) {
        var e = a.currentTarget.dataset.name, o = a.currentTarget.dataset.value;
        this.setData(t({}, "attrname." + e, o));
    },
    onHide: function() {
        wx.hideLoading();
    }
});