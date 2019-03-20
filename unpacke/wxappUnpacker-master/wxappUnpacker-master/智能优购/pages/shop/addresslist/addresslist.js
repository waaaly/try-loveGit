var a = getApp();

Page({
    data: {
        noData: !1,
        isJd: 1,
        list: [],
        is_order: 0,
        page: {
            pageNum: 1,
            pageSize: 20,
            total: 10
        }
    },
    onShow: function() {
        this.loadData();
    },
    onLoad: function(a) {
        this.setData({
            noData: !1
        });
        var t = a.type ? a.type : 1, e = a.sel ? a.sel : 0;
        this.setData({
            isJd: t,
            is_order: e
        }), this.loadData();
    },
    loadData: function() {
        var t = this;
        this.setData({
            userid: a.getuserid()
        }), new a.WeToast(), wx.setStorageSync("onShowOderIndex", 0);
        var e = this, d = e.data.page, s = void 0 == t.data.isJd ? "" : t.data.isJd, i = a.index_change_address, o = {
            page: d.pageNum,
            pageSize: d.pageSize,
            isOutAddress: s
        };
        console.log("获取地址参数", o), a.getHttpData(i, o, "get", function(a, t) {
            console.log("json", a.data), e.setData({
                list: a.data,
                noData: !0
            }), a.totalCount > a.pageNum * a.pageSize && (d.pageNum++, e.setData({
                page: d
            }));
        });
    },
    onReachBottom: function() {
        this.loadData();
    },
    addAddre: function() {
        var a = this;
        wx.navigateTo({
            url: "/pages/shop/addressdetails/addressdetails?id=newAddress&type=" + a.data.isJd
        });
    },
    toModifyAddre: function(a) {
        var t = this, e = a.currentTarget.dataset.id, d = a.currentTarget.dataset.userid;
        console.log(e), console.log(d), wx.navigateTo({
            url: "/pages/shop/addressdetails/addressdetails?id=" + e + "&type=" + t.data.isJd
        });
    },
    toCleanOrder: function(a) {
        if (!this.data.is_order) return !1;
        var t = a.currentTarget.dataset.index, e = a.currentTarget.dataset.id, d = getCurrentPages(), s = this.data.list[t], i = (d[d.length - 1], 
        d[d.length - 2]);
        i.data;
        "pages/shop/order/order" == i.route && (i.setData({
            addressObj: s,
            addrid: e,
            isBack: !0
        }), wx.navigateBack({
            delta: 1
        }));
    },
    address_del_changeDefault: function(t) {
        var e = this, d = t.currentTarget.dataset.index, s = t.currentTarget.dataset.type;
        if (1 == s) wx.showModal({
            title: "确认删除地址",
            content: "删除之后将无法恢复",
            success: function(t) {
                if (t.confirm) {
                    var i = e.data.list[d].id;
                    wx.showLoading({
                        title: "操作中"
                    });
                    var o = void 0;
                    o = 1 == s ? a.index_change_delete_address : a.index_change_default_address, a.getHttpData(o, {
                        id: i
                    }, 1 == s ? "GET" : "POST", function(a, t) {
                        console.log(a.data), wx.hideLoading(), 200 == a.code && (e.wetoast.toast({
                            title: "操作成功",
                            duration: 2e3
                        }), e.loadData());
                    });
                }
            }
        }); else {
            var i = e.data.list[d].id;
            wx.showLoading({
                title: "操作中"
            });
            var o = void 0;
            o = 1 == s ? a.index_change_delete_address : a.index_change_default_address, a.getHttpData(o, {
                id: i
            }, 1 == s ? "GET" : "POST", function(a, t) {
                console.log(a.data), wx.hideLoading(), 200 == a.code && (e.wetoast.toast({
                    title: "操作成功",
                    duration: 2e3
                }), e.loadData());
            });
        }
    },
    newAddress: function() {
        var a = this;
        wx.navigateTo({
            url: "/pages/shop/addressdetails/addressdetails?id=newAddress&type=" + a.data.isJd
        });
    }
});