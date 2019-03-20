var t = getApp();

Page({
    data: {
        start_time: "",
        end_time: "",
        now_date: "",
        dataset: [],
        loadlayer: !0,
        nextPage: 1,
        pageNum: 1,
        pageSize: 20,
        totalCount: 1
    },
    onPullDownRefresh: function() {
        this.setData({
            nextPage: 1,
            dataset: [],
            isLoad: !1,
            loadIsEnd: !1
        }), this.loadData();
    },
    onReachBottom: function() {
        this.loadData();
    },
    bindDetailTap: function(t) {
        return;
    },
    loadData: function() {
        if (console.log(this.data.isLoad), !this.data.isLoad && !this.data.loadIsEnd) {
            this.setData({
                isLoad: !0
            });
            var a = this, e = this.data.start_time, o = this.data.end_time, s = this.data.nextPage, n = this.data.pageSize, i = {
                userId: wx.getStorageSync("userid"),
                pageNum: s,
                pageSize: n,
                startTime: e,
                endTime: o
            };
            console.log(i), t.getHttpData(t.app_user_integral_exchangeDetails, i, "post", function(t) {
                if (wx.stopPullDownRefresh(), console.log("加载数据", t), a.setData({
                    isLoad: !1
                }), null != t) {
                    if (200 == t.code) {
                        var e = a.data.dataset.concat(t.data);
                        console.log(e), a.setData({
                            dataset: e,
                            nextPage: s + 1
                        });
                    }
                    a.setData({
                        loadlayer: !1
                    });
                }
            });
        }
    },
    onLoad: function(t) {
        this.loadData();
    },
    onShow: function() {},
    getNowDate: function() {
        var t = new Date(), a = this.numAddZero(t.getFullYear()) + "-" + this.numAddZero(t.getMonth() + 1) + "-" + this.numAddZero(t.getDate());
        this.setData({
            now_date: a
        });
    },
    numAddZero: function(t) {
        return t > 9 ? t : "0" + t;
    },
    bindDateChange: function(t) {
        var a = t.target.dataset.key, e = t.detail.value;
        console.log("时间事件", t), 1 == a ? this.setData({
            start_time: e
        }) : this.setData({
            end_time: e
        });
    },
    search: function() {
        var t = this.data.start_time, a = this.data.end_time, e = (this.data.pageNum, this.data.pageSize, 
        wx.getStorageSync("userid"), new Date(t.replace("-", "/"))), o = new Date(a.replace("-", "/"));
        "" == t || "" == a ? console.log("开始时间和结束时间不能为空") : e > o ? console.log("开始时间大于结束时间") : (this.setData({
            nextPage: 1,
            dataset: []
        }), this.loadData());
    }
});