var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (t[o] = a[o]);
    }
    return t;
}, e = getApp();

Page({
    data: {
        type: 1,
        isnull: !1,
        hide: !1,
        tipContent: "",
        showDeleteTxt: "管理",
        det: !1,
        allChecked: !1,
        isReq: !0,
        isEnd: !1,
        resData: {
            pageNum: 1,
            pageSize: 10
        },
        checkArr: [],
        list: [],
        listCopy: [],
        dataset: [],
        isLoad: !1,
        loadIsEnd: !1,
        switchtaping: 0,
        nextPage: 1,
        loadview: !0,
        prompat: !1,
        currentTab: 0,
        scheight: 0,
        loadlayer: !0
    },
    changeType: function() {
        var t = this;
        t.setData({
            isnull: !1,
            hide: !1,
            tipContent: "",
            showDeleteTxt: "管理",
            det: !1,
            allChecked: !1,
            isReq: !0,
            isEnd: !1,
            resData: {
                pageNum: 1,
                pageSize: 10
            },
            checkArr: [],
            list: [],
            listCopy: []
        }), 1 == t.data.type ? t.setData({
            type: 2
        }) : t.setData({
            type: 1
        }), t.loadData();
    },
    goContent: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/shop/content/content?id=" + e
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            tipContent: "",
            showDeleteTxt: "管理",
            det: !1,
            allChecked: !1,
            isReq: !0,
            isEnd: !1,
            resData: {
                pageNum: 1,
                pageSize: 10
            },
            checkArr: [],
            list: [],
            listCopy: [],
            dataset: [],
            isLoad: !1,
            loadIsEnd: !1
        }), this.loadData();
    },
    onReachBottom: function() {
        console.log("b"), this.loadData();
    },
    bindContentTap: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/shop/content/content?id=" + e
        });
    },
    loadData: function() {
        var a = this;
        console.log(a.data.isReq);
        var o = a.data.resData;
        o.type = a.data.type, a.setData(t({}, o)), a.data.isReq && (a.setData({
            isReq: !1
        }), e.getHttpData(e.shop_histiry, a.data.resData, "GET", function(e) {
            if (console.log(e), wx.stopPullDownRefresh(), e.data.length > 0) {
                for (var o = e.data, s = a.data.list, n = a.data.listCopy, i = 0; i < o.length; i++) o[i].isChose = !1;
                if (e.data.length < 10) n = s.concat(o), s = s.concat(o), a.setData({
                    isReq: !1,
                    loadlayer: !1,
                    isEnd: !0,
                    list: s,
                    listCopy: n
                }); else {
                    n = n.concat(o), s = s.concat(o);
                    var l = a.data.resData;
                    l.pageNum++, a.setData(t({
                        isReq: !0,
                        loadlayer: !1,
                        list: s,
                        listCopy: n
                    }, l));
                }
            } else a.setData({
                isReq: !1,
                isEnd: !0,
                loadlayer: !1
            }), 1 == a.data.resData.pageNum && a.setData({
                isnull: !0
            });
        }));
    },
    onLoad: function(t) {
        this.loadData();
    },
    onShow: function() {},
    showDelete: function() {
        var t = this;
        t.data.list.length > 0 ? (t.setData({
            det: !t.data.det,
            hide: !0
        }), console.log("listCopy", t.data.listCopy), t.data.det ? t.setData({
            list: t.data.listCopy,
            showDeleteTxt: "完成"
        }) : t.setData({
            list: t.data.listCopy,
            showDeleteTxt: "管理"
        })) : wx.showToast({
            title: "暂无可管理的足迹~~",
            icon: "none"
        });
    },
    allChecked: function() {
        var t = this;
        t.setData({
            allChecked: !t.data.allChecked
        });
    },
    choseItem: function(t) {
        console.log(t);
        var e = this, a = e.data.list, o = t.currentTarget.dataset.inx, s = t.currentTarget.dataset.id, n = t.currentTarget.dataset.time, i = e.data.checkArr;
        if (console.log(a[o].isChose), a[o].isChose) {
            for (var l = 0; l < i.length; l++) i[l].goodsId === s && i.splice(l, 1);
            a[o].isChose = !a[o].isChose;
        } else {
            a[o].isChose = !a[o].isChose;
            var d = {};
            d.goodsId = s, d.addTime = n, i.push(d);
        }
        console.log("选择的数组", i), e.setData({
            list: a,
            checkArr: i
        });
    },
    deleteFooter: function(t) {
        console.log(t);
        var a = this;
        console.log(a.data.checkArr);
        var o = {}, s = t.currentTarget.dataset.type;
        if (1 == s) {
            if (!(a.data.checkArr.length > 0)) return wx.showToast({
                title: "请选择需要删除的足迹~~",
                icon: "none"
            }), !1;
            a.setData({
                tipContent: "您确定要删除选中的足迹吗？~~"
            }), o.seekGoods = a.data.checkArr;
        } else {
            if (!(a.data.list.length > 0)) return wx.showToast({
                title: "暂无可删除的足迹",
                icon: "none"
            }), !1;
            a.setData({
                tipContent: "您确定要删除全部足迹吗？~~"
            }), o.seekGoods = [];
        }
        o.userId = wx.getStorageSync("userid"), o.type = s - 0, wx.showModal({
            title: "删除提示",
            content: a.data.tipContent,
            success: function(t) {
                t.confirm ? (wx.showLoading({
                    title: "删除中",
                    mask: !0
                }), e.getHttpData(e.myCenter_deleteHistory, o, "POST", function(t) {
                    wx.hideLoading(), console.log(t), 200 == t.code ? (wx.showToast({
                        title: "删除成功",
                        icon: "none"
                    }), a.onPullDownRefresh()) : wx.showToast({
                        title: "删除失败",
                        icon: "none"
                    });
                })) : t.cancel && console.log("用户点击取消");
            }
        });
    }
});