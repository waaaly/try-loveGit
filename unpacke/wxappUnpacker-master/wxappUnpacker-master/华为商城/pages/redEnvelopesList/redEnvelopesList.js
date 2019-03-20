var t = getApp(), a = t.globalData.mp, i = t.globalData.config;

Page({
    data: {
        listAggregation: !0
    },
    onLoad: function(t) {
        this.setData({
            activityCode: t.activityCode
        }), this.setData({
            avatarUrl: t.avatarUrl || ""
        }), this.attendAggregationList();
    },
    attendAggregationList: function() {
        var t = this;
        a.mpGet(i.service.openApiDomain + "/ams/aggregationy/queryAttendAggregationList", {
            activityCode: t.data.activityCode
        }, {
            successFunc: function(i) {
                i.data.success ? i.data.listAggregation && i.data.listAggregation.length > 0 ? (i.data.listAggregation.forEach(function(i, e) {
                    i.userCreateTime = a.formatTimeNumber(i.createTime, "Y-M-D h:m:s"), i.activityCode = t.data.activityCode;
                }), t.setData({
                    listAggregation: i.data.listAggregation
                })) : t.setData({
                    listAggregation: !1
                }) : wx.showModal({
                    title: "提示",
                    content: i.data.msg
                });
            }
        });
    }
});