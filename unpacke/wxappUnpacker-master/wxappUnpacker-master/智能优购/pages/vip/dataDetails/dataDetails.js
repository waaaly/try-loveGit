var a = getApp();

Page({
    data: {
        inx: "",
        witchData: "",
        isLoading: !1,
        isEnd: !1,
        nextPage: 1,
        loadlayer: !0,
        totalCount: "0",
        textArr: [ "我服务的市场", "服务VIP", "服务总监" ],
        dataList: []
    },
    onLoad: function(a) {
        var t = this;
        t.setData({
            inx: a.inx
        }), wx.setNavigationBarTitle({
            title: t.data.textArr[t.data.inx]
        }), t.loadIndex();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var a = this;
        a.setData({
            isLoading: !1,
            isEnd: !1,
            nextPage: 1,
            dataList: []
        }), a.getDataList();
    },
    onReachBottom: function() {
        this.getDataList();
    },
    callPhone: function(a) {
        console.log(a);
        var t = a.currentTarget.dataset.phone;
        t > 0 && wx.makePhoneCall({
            phoneNumber: t + ""
        });
    },
    onShareAppMessage: function() {},
    loadIndex: function() {
        var a = this;
        a.setData({
            isEnd: !1,
            nextPage: 1
        }), a.getDataList();
    },
    getDataList: function() {
        var t = this;
        if (!t.data.isLoading && !t.data.isEnd) {
            t.setData({
                isLoading: !0
            }), 0 == t.data.inx ? t.setData({
                witchData: 4
            }) : 1 == t.data.inx ? t.setData({
                witchData: 3
            }) : 2 == t.data.inx && t.setData({
                witchData: 2
            }), console.log(t.data.witchData);
            var n = {
                type: t.data.witchData,
                start: t.data.nextPage,
                limit: 10
            };
            a.getHttpData(a.vip_details, n, "GET", function(a) {
                console.log("领取记录信息", a), t.setData({
                    isLoading: !1
                }), wx.stopPullDownRefresh(), 200 == a.code ? a.data.length < 10 ? (a.data.length, 
                1 == t.data.nextPage && t.setData({
                    totalCount: a.totalCount
                }), t.setData({
                    isLoad: !0,
                    isEnd: !0,
                    dataList: t.data.dataList.concat(a.data),
                    loadlayer: !1
                })) : (1 == t.data.nextPage && t.setData({
                    totalCount: a.totalCount
                }), t.setData({
                    isLoading: !1,
                    dataList: t.data.dataList.concat(a.data),
                    nextPage: t.data.nextPage + 1,
                    loadlayer: !1
                })) : (t.setData({
                    loadlayer: !1,
                    isLoading: !1
                }), wx.showToast({
                    title: "获取信息失败",
                    icon: "none"
                }));
            });
        }
    }
});