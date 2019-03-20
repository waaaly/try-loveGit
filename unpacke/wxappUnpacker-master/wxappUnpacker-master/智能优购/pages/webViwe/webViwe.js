getApp(), getApp();

Page({
    data: {
        webView: ""
    },
    onLoad: function(e) {
        console.log("load", e);
        var o = decodeURIComponent(e.page);
        console.log("url", o), this.setData({
            webView: o
        });
    }
});