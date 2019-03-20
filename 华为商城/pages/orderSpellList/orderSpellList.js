var a = getApp(), t = a.globalData.mp, e = a.globalData.config;

Page({
    data: {
        cdnPath: "",
        windowHeight: 0,
        windowWidth: 0,
        scrollTop: 0,
        pageSize: 10,
        currStatus: "1",
        showNoSpell: !1,
        showBottomTab: !1,
        emptyStatus: "进行中",
        emptyContent: {
            emptyContent1: "进行中",
            emptyContent2: "已成团",
            emptyContent3: "已失效"
        },
        tabFlag: {
            tabFlag1: !0,
            tabFlag2: !1,
            tabFlag3: !1
        },
        pageNum: {
            pageNum1: 1,
            pageNum2: 1,
            pageNum3: 1
        },
        dataArr: {
            dataArr1: [],
            dataArr2: [],
            dataArr3: []
        },
        getTabFlag: {
            getTabFlag1: !1,
            getTabFlag2: !1,
            getTabFlag3: !1
        },
        getArrived: {
            getArrived1: !1,
            getArrived2: !1,
            getArrived3: !1
        },
        loadMore: {
            loadMore1: !1,
            loadMore2: !1,
            loadMore3: !1
        },
        totalList: {
            totalList1: !1,
            totalList2: !1,
            totalList3: !1
        },
        isBtnClicked: !1,
        isLoadingData: !1
    },
    onLoad: function(a) {
        var t = this;
        t.setData({
            cdnPath: e.service.cdnPath
        }), t.data.tabFlag.tabFlag1 && t.getTeamBuyList("1", t.data.pageNum.pageNum1);
    },
    onReady: function(a) {
        var t = this;
        wx.getSystemInfo({
            success: function(a) {
                t.setData({
                    windowHeight: a.windowHeight,
                    windowWidth: a.windowWidth
                });
            }
        });
    },
    onShow: function() {
        var a = this;
        a.data.isBtnClicked && (a.data.isBtnClicked = !1);
    },
    onReachBottom: function() {},
    loadSpellMore: function() {
        var a = this;
        return !a.data.getArrived["getArrived" + a.data.currStatus] && (!a.data.isLoadingData && void a.getTeamBuyList(a.data.currStatus, a.data.pageNum["pageNum" + a.data.currStatus]));
    },
    getTeamBuyList: function(a, o) {
        var d = this;
        d.data.isLoadingData = !0, t.mpGet(e.service.openApiDomain + "/mcp/pin/queryUserTeamBuyList", {
            status: a,
            pageNumber: o,
            pageSize: d.data.pageSize
        }, {
            successFunc: function(t) {
                if (d.data.isLoadingData = !1, t.data && t.data.success && t.data.teamInfos) {
                    if (d.data.getTabFlag["getTabFlag" + a] || (d.data.getTabFlag["getTabFlag" + a] = !0), 
                    0 == t.data.teamInfos.length) return 1 == d.data.pageNum["pageNum" + a] ? (d.data.totalList["totalList" + a] = !1, 
                    d.setData({
                        showNoSpell: !0,
                        showBottomTab: !1
                    })) : d.data.totalList["totalList" + a] = !0, d.data.getArrived["getArrived" + a] = !0, 
                    d.data.loadMore["loadMore" + a] = !1, d.setData({
                        loadMore: d.data.loadMore,
                        totalList: d.data.totalList
                    }), !1;
                    var e = t.data.teamInfos;
                    d.data.pageNum["pageNum" + a] += 1, d.data.dataArr["dataArr" + a].length > 0 ? d.data.dataArr["dataArr" + a] = d.data.dataArr["dataArr" + a].concat(e) : d.data.dataArr["dataArr" + a] = e, 
                    e.length < d.data.pageSize ? (d.data.getArrived["getArrived" + a] = !0, d.data.totalList["totalList" + a] = !0, 
                    d.data.loadMore["loadMore" + a] = !1) : (d.data.getArrived["getArrived" + a] = !1, 
                    d.data.totalList["totalList" + a] = !1, d.data.loadMore["loadMore" + a] = !0), d.setData({
                        dataArr: d.data.dataArr,
                        showNoSpell: !1,
                        showBottomTab: !0,
                        totalList: d.data.totalList,
                        loadMore: d.data.loadMore
                    });
                } else d.data.getTabFlag["getTabFlag" + a] = !1, 1 == d.data.pageNum["pageNum" + a] && d.setData({
                    showNoSpell: !0,
                    showBottomTab: !1
                });
            },
            failFunc: function() {
                d.data.isLoadingData = !1, d.data.getTabFlag["getTabFlag" + a] = !1, wx.showToast({
                    title: "数据请求失败",
                    icon: "none"
                });
            }
        });
    },
    gotoSpellDetail: function(a) {
        if (this.stopDoubleClick()) return !1;
        wx.navigateTo({
            url: "../orderSpellDetail/orderSpellDetail?teamCode=" + a.currentTarget.dataset.teamcode
        });
    },
    gotoOrderDetail: function(a) {
        if (this.stopDoubleClick()) return !1;
        wx.navigateTo({
            url: "../orderDetail/orderDetail?orderCode=" + a.currentTarget.dataset.ordercode
        });
    },
    gotoGoodsDetail: function(a) {
        if (this.stopDoubleClick()) return !1;
        var t = a.currentTarget.dataset.prdid, e = a.currentTarget.dataset.skucode;
        wx.navigateTo({
            url: "../goodsDetail/goodsDetail?prdId=" + t + "&skuCode=" + e
        });
    },
    switchTabOption: function(a) {
        var t = this, e = a.currentTarget.dataset.status;
        t.data.currStatus = e, t.data.getTabFlag["getTabFlag" + e] ? t.data.dataArr["dataArr" + e].length > 0 ? t.setData({
            showNoSpell: !1,
            showBottomTab: !0
        }) : t.setData({
            showNoSpell: !0,
            showBottomTab: !1
        }) : (t.setData({
            showNoSpell: !1,
            showBottomTab: !1
        }), t.getTeamBuyList(e, t.data.pageNum["pageNum" + e]));
        for (var o in t.data.tabFlag) t.data.tabFlag[o] = !1;
        t.data.tabFlag["tabFlag" + e] || (t.data.tabFlag["tabFlag" + e] = !0), t.setData({
            tabFlag: t.data.tabFlag,
            scrollTop: 0,
            emptyStatus: t.data.emptyContent["emptyContent" + e]
        });
    },
    stopDoubleClick: function() {
        var a = this;
        return !!a.data.isBtnClicked || (a.setData({
            isBtnClicked: !0
        }), setTimeout(function() {
            a.setData({
                isBtnClicked: !1
            });
        }, 3e3), !1);
    },
    goSpellCenter: function() {
        if (this.stopDoubleClick()) return !1;
        wx.navigateTo({
            url: "/pages/webview/webview?url=https://msale.vmall.com/ptpd.html"
        });
    }
});