var e = getApp();

Page({
    data: {
        dataset: [],
        mainpic: "",
        ddiffertime: "",
        fromshare: 0,
        oid: 0,
        poid: 0,
        id: 0,
        loadlayer: !0
    },
    bindGoHomeTap: function() {
        wx.switchTab({
            url: "/pages/index/index/index"
        });
    },
    bindHelpTap: function() {
        wx.navigateTo({
            url: "/pages/user/integral/integral"
        });
    },
    bindScoreMallTap: function() {
        console.log("a"), wx.navigateTo({
            url: "/pages/mall/index2/index2"
        });
    },
    bindShareTap: function(t) {
        var a = this;
        e.getuserinfo(t, function(e) {
            e ? wx.navigateTo({
                url: "/pages/index/share/share"
            }) : a.wetoast.toast({
                title: "授权失败",
                duration: 2e3
            });
        });
    },
    bindCanTuanTap: function(t) {
        var a = this.data.dataset.order.poid, i = this.data.dataset.brand.id, o = this.data.dataset.order.type;
        e.getuserinfo(t, function(e) {
            e ? (console.log("/pages/shop/order/order?id=" + i + "&poid=" + a + "&t=" + o), 
            wx.redirectTo({
                url: "/pages/shop/order/order?id=" + i + "&poid=" + a + "&t=" + o
            })) : console.log("登录失败");
        });
    },
    bindNewGroupTap: function(t) {
        var a = this.data.dataset.brand.id, i = this.data.dataset.order.type;
        e.getuserinfo(t, function(e) {
            e ? wx.redirectTo({
                url: "/pages/shop/order/order?id=" + a + "&t=" + i
            }) : console.log("登录失败");
        });
    },
    bindGoBrandTap: function(e) {
        var t = e.currentTarget.dataset.id;
        wx.redirectTo({
            url: "/pages/shop/content/content?id=" + t
        });
    },
    calling: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.dataset.service.mobile
        });
    },
    leftTimer: function(e) {
        e = e.replace(/-/g, "/");
        var t = new Date(e) - new Date(), a = parseInt(t / 1e3 / 60 / 60 / 24, 10), i = parseInt(t / 1e3 / 60 / 60 % 24, 10), o = parseInt(t / 1e3 / 60 % 60, 10), n = parseInt(t / 1e3 % 60, 10);
        return a < 10 && (a = "0" + a), i < 10 && (i = "0" + i), o < 10 && (o = "0" + o), 
        n < 10 && (n = "0" + n), i + ":" + o + ":" + n;
    },
    onLoad: function(t) {
        t.shareid && (this.setData({
            fromshare: 1
        }), console.log(t.shareid)), console.log(e.getshareid()), new e.WeToast();
        var a = t.oid, i = t.poid || 0, o = t.id || 0;
        this.setData({
            id: o,
            oid: a,
            poid: i
        }), this.loadData();
    },
    loadData: function() {
        var t = this, a = this.data.oid, i = this.data.poid;
        e.getHttpData(e.domain + "/orders/pinok/?oid=" + a + "&poid=" + i, null, "GET", function(e) {
            console.log(e), wx.setNavigationBarTitle({
                title: e.brand.shorttitle
            }), t.setData({
                mainpic: e.userimg[0]
            }), e.userimg.splice(0, 1), t.setData({
                dataset: e
            }), t.setData({
                loadlayer: !1
            });
            var a = t.leftTimer(e.order.endtime), i = new Date().getMilliseconds();
            a = a + "." + ("" + i).charAt(0), t.setData({
                ddiffertime: a
            }), setInterval(function() {
                a = t.leftTimer(e.order.endtime);
                var i = new Date().getMilliseconds();
                a = a + "." + ("" + i).charAt(0), t.setData({
                    ddiffertime: a
                });
            }, 100);
        });
    },
    onShow: function() {}
});