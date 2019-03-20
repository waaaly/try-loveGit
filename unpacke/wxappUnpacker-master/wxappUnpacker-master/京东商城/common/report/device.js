function e(e) {
    var o = [];
    for (var t in e) o.push(encodeURIComponent(t) + ":" + encodeURIComponent(e[t]));
    return {
        contents: o.join("|")
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = "https://wq.jd.com/webmonitor/collect/device.json";

exports.reportDevice = function() {
    wx.getSystemInfo({
        success: function(t) {
            wx.getNetworkType({
                success: function() {
                    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    t.networkType = n.networkType, delete t.errMsg, wx.$.request.post({
                        url: o,
                        data: e(t),
                        priority: "REPORT"
                    }).then(function(e) {
                        return console.log("上报设备信息成功");
                    }).catch(function(e) {
                        return console.error("上报设备信息失败");
                    });
                },
                fail: function(e) {
                    console.error("wx.getNetworkType fail: ", e);
                }
            });
        },
        fail: function(e) {
            console.error("wx.getSystemInfo fail: ", e);
        }
    });
};