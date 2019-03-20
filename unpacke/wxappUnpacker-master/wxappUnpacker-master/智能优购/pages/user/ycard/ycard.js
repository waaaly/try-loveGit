var t = getApp();

Page({
    data: {
        dataset: {
            tt: "",
            sitename: "chatong"
        },
        submitText: "提交",
        alt: !0
    },
    bindInToTap: function(t) {
        wx.navigateBack({});
    },
    bindSubmitTap: function(a) {
        if (this.data.alt) this.wetoast.toast({
            title: "加载中请稍后..",
            duration: 2e3
        }); else if ("False" == this.data.dataset.checkresult) {
            var e = a.detail.value.realname, o = a.detail.value.cardnumber, n = a.detail.value.cardbank;
            if (console.log(e + "-" + o + "-" + n), "" != e) if ("" != o) if ("" != n) {
                console.log(e + "-" + o + "-" + n);
                var i = {
                    cardnumber: o,
                    realname: e,
                    cardbank: n
                };
                this.setData({
                    submitText: "请稍后.."
                });
                var s = this;
                t.getHttpData(t.domain + "/rebate/UpdateCardInfo", i, "POST", function(t, a) {
                    if ("ok" == t.result) return wx.navigateBack({
                        delta: 1
                    }), void s.wetoast.toast({
                        title: "添加成功",
                        duration: 2e3
                    });
                    "ok" == t.result || s.wetoast.toast({
                        title: t.error,
                        duration: 2e3
                    });
                });
            } else this.wetoast.toast({
                title: "请输入开户行",
                duration: 2e3
            }); else this.wetoast.toast({
                title: "请输入银行卡号",
                duration: 2e3
            }); else this.wetoast.toast({
                title: "请输入姓名",
                duration: 2e3
            });
        }
    },
    loadData: function() {
        var a = this;
        t.getHttpData(t.domain + "/rebate/GetUserWallet", null, "GET", function(t, e) {
            a.setData({
                dataset: t,
                alt: !1
            });
        });
    },
    onLoad: function(a) {
        new t.WeToast(), this.loadData();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});