var t = require("../../../common/services/hosts").crayfish, e = getApp().services.Ubt;

Page({
    data: {
        questions: [],
        loaded: !1
    },
    onLoad: function(e) {
        var s = this, i = e.question, a = i + "Content";
        wx.request({
            url: t + "/profile/explain",
            success: function(t) {
                var e = t.data[a].split("###").splice(1).map(function(t) {
                    var e = t.split("↵↵")[0].split("\n\n");
                    return e[2] ? {
                        q: e[0],
                        a: e.splice(1)
                    } : e[1] ? {
                        q: e[0],
                        a: e[1].split("\n")
                    } : {
                        q: e[0]
                    };
                });
                wx.setNavigationBarTitle({
                    title: t.data[i + "Caption"]
                }), s.setData({
                    questions: e,
                    loaded: !0
                });
            }
        });
    },
    onShow: function() {
        e.sendPv();
    }
});