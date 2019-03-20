var e = getApp(), a = e.globalData.mp, t = e.globalData.config;

Page({
    data: {},
    onLoad: function(e) {
        wx.hideShareMenu();
        var i = this;
        a.mpGet(t.service.openApiDomain + "/mcp/queryUserOrderLogistics", {
            orderCode: e.orderCode,
            alive: "1"
        }, {
            successFunc: function(e) {
                if (e.data.success && (i.setData({
                    deliveryName: e.data.deliveryName,
                    deliveryNumber: e.data.deliveryNumber
                }), e.data.orderLogisticsLogList && 0 != e.data.orderLogisticsLogList.length)) {
                    var a = e.data.orderLogisticsLogList;
                    i.setData({
                        orderLogisticsLogList: a.reverse()
                    }), a.forEach(function(e, t) {
                        e.time = e.logTime.split("+")[0], i.setData({
                            orderLogisticsLogList: a
                        });
                    });
                }
            }
        });
    }
});