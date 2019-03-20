var t = getApp();

Page({
    data: {
        datalist: [],
        showModalStatus: !1,
        dataset: {
            order: {
                poststate: 1
            }
        },
        loadlayer: !0
    },
    goWbv: function() {
        var t = encodeURIComponent("https://v2.live800.com/live800/chatClient/chatbox.jsp?companyID=1101830&configID=127399&jid=9094269650&s=1");
        wx.navigateTo({
            url: "../../webViwe/webViwe?page=" + t
        });
    },
    bindBuyTap: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.redirectTo({
            url: "/pages/shop/content/content?id=" + a
        });
    },
    bindGoBuyTap: function(t) {
        var a = t.currentTarget.dataset.oid, e = t.currentTarget.dataset.id;
        wx.redirectTo({
            url: "/pages/shop/order/order?oid=" + a + "&id=" + e
        });
    },
    bindDeliveryTap: function(a) {
        var e = a.currentTarget.dataset.oid, o = this;
        wx.showModal({
            title: "提示",
            content: "确认收到货了吗？",
            success: function(a) {
                if (a.confirm) {
                    var i = t.domain + "/orders/delivery?oid=" + e;
                    t.getHttpData(i, null, "GET", function(t) {
                        console.log(t), 1 == t.result ? (o.setData({
                            "dataset.order.poststate": 12,
                            "dataset.order.statename": "已签收"
                        }), o.wetoast.toast({
                            title: "操作成功",
                            duration: 2e3
                        })) : o.wetoast.toast({
                            title: "操作失败",
                            duration: 2e3
                        });
                    });
                } else a.cancel;
            }
        });
    },
    calling: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.dataset.service.mobile
        });
    },
    powerDrawer: function(t) {
        var a = t.currentTarget.dataset.statu;
        this.util(a);
    },
    util: function(t) {
        var a = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = a, a.opacity(0).rotateX(-100).step(), this.setData({
            animationData: a.export()
        }), setTimeout(function() {
            a.opacity(1).rotateX(0).step(), this.setData({
                animationData: a
            }), "close" == t && this.setData({
                showModalStatus: !1
            });
        }.bind(this), 200), "open" == t && this.setData({
            showModalStatus: !0
        });
    },
    getExpressData: function(a) {
        var e = this, o = t.jd_order_get_logistics, i = {
            orderId: a
        };
        t.getHttpData(o, i, "get", function(t, a) {
            if (1 == t.State) {
                for (var o = t.Data, i = 0; i < o.length; i++) o[i].OrderLogisticTime = o[i].OrderLogisticTime.split("T")[0] + " " + o[i].OrderLogisticTime.split("T")[1];
                e.setData({
                    datalist: o.reverse()
                });
            }
        });
    },
    onLoad: function(a) {
        new t.WeToast();
        var e = a.oid, o = a.id, i = this;
        t.getHttpData(t.domain + "/orders/detail/?oid=" + e, null, "GET", function(t, a) {
            0 == a && i.wetoast.toast({
                title: t.Message,
                duration: 2e3
            }), console.log(t), console.log(a), i.setData({
                dataset: t
            }), i.setData({
                loadlayer: !1
            });
        }), this.getExpressData(o);
    },
    onPullDownRefresh: function() {
        this.loadData();
    }
});