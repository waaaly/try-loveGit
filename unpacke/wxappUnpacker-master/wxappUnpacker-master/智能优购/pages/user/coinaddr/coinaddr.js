var t = getApp();

Page({
    data: {
        id: 0,
        dataset: [],
        isload: !1,
        submitText: "提交",
        loadlayer: !0
    },
    bindInToTap: function(t) {
        wx.navigateBack({});
    },
    bindSubmitTap: function(a) {
        if (this.data.isLoad) this.wetoast.toast({
            title: "提交中..",
            duration: 2e3
        }); else {
            var o = this, e = {
                grt: a.detail.value.grt || "",
                tt: a.detail.value.tt || "",
                eth: a.detail.value.eth || ""
            };
            this.setData({
                submitText: "请稍后.."
            }), console.log(e), t.getHttpData(t.domain + "/user/submitcoin", e, "POST", function(t) {
                console.log(t), o.setData({
                    isload: !1
                }), o.setData({
                    submitText: "提交"
                }), t.result && "ok" == t.result ? wx.showModal({
                    title: "提示",
                    content: "提交成功",
                    showCancel: !1,
                    confirmColor: "#357C6E"
                }) : wx.showModal({
                    title: "提示",
                    content: "操作失败，请重试",
                    showCancel: !1,
                    confirmColor: "#357C6E"
                });
            });
        }
    },
    onLoad: function(a) {
        new t.WeToast(), this.loadData();
    },
    loadData: function() {
        var a = this;
        t.getHttpData(t.domain + "/user/coinaddr", null, "GET", function(t) {
            console.log(t), console.log(t.sitename), a.setData({
                dataset: t
            }), a.setData({
                loadlayer: !1
            });
        });
    }
});