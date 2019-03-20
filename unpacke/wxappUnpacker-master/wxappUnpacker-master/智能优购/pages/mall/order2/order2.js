function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = getApp();

Page({
    data: {
        id: 0,
        geshu: 1,
        totalcost: 0,
        post: "",
        dataset: [],
        isload: !1,
        submitText: "提交",
        identification: !1,
        loadlayer: !0
    },
    bindInToTap: function(t) {
        this.setData({
            identification: !1
        });
    },
    bindSubmitTap: function(t) {
        if (this.data.isLoad) this.wetoast.toast({
            title: "提交中..",
            duration: 2e3
        }); else {
            var e = t.detail.value.realname, i = t.detail.value.mobile, s = t.detail.value.cardid;
            if ("" != e) if ("" != i) {
                var o = s.length;
                if (0 != o) if (15 == o || 18 == o) {
                    console.log(e + "-" + i + "-" + s);
                    var d = this, n = {
                        mobile: i,
                        realname: e,
                        cardid: s
                    };
                    this.setData({
                        submitText: "请稍后.."
                    }), a.getHttpData(a.domain + "/mall/ident", n, "POST", function(t) {
                        d.setData({
                            isload: !1
                        }), d.setData({
                            submitText: "认证"
                        }), t.result && "ok" == t.result ? (d.setData({
                            identification: !1
                        }), d.setData({
                            "dataset.identify": !0
                        }), wx.showModal({
                            title: "提示",
                            content: "认证成功",
                            showCancel: !1,
                            confirmColor: "#357C6E"
                        })) : wx.showModal({
                            title: "提示",
                            content: "操作失败，请重试",
                            showCancel: !1,
                            confirmColor: "#357C6E"
                        });
                    });
                } else this.wetoast.toast({
                    title: "身份证号码长度不正确",
                    duration: 2e3
                }); else this.wetoast.toast({
                    title: "请输入身份证号码",
                    duration: 2e3
                });
            } else this.wetoast.toast({
                title: "请输入电话号码",
                duration: 2e3
            }); else this.wetoast.toast({
                title: "请输入姓名",
                duration: 2e3
            });
        }
    },
    bindShareTap: function() {
        wx.navigateTo({
            url: "/pages/index/share/share"
        });
    },
    bindBuyNumsTap: function(t) {
        var e = this, i = parseInt(t.currentTarget.dataset.inc), s = this.data.id, o = this.data.geshu, d = parseInt(this.data.geshu);
        if (!((o = d + i) < 1)) {
            this.setData({
                geshu: o
            });
            e = this;
            a.getHttpData(a.domain + "/mall/buynums?id=" + s + "&geshu=" + o, null, "GET", function(t) {
                console.log(t), null == t || "" != t.message ? e.setData({
                    geshu: d
                }) : e.setData({
                    totalcost: t.totalcost
                });
            });
        }
    },
    bindConfirmTab: function(e) {
        if (!this.data.isload) if (this.data.dataset.identify) if ("" != this.data.dataset.usercoin) {
            var i = e.detail.value.textarea, s = t({
                id: this.data.id,
                geshu: this.data.geshu,
                text: i,
                addrid: "0"
            }, "text", "");
            console.log(s), this.setData({
                submitText: "请稍后..."
            });
            var o = this;
            this.setData({
                isload: !0
            }), a.getHttpData(a.domain + "/mall/submit", s, "POST", function(t) {
                if (console.log(t), o.setData({
                    isload: !1
                }), "ok" != t.result) "登录失败" == t.error ? (o.wetoast.toast({
                    title: "登录过期，请重新下单",
                    duration: 2e3
                }), a.removekey(), setTimeout(function() {
                    wx.navigateBack();
                }, 1e3)) : (o.setData({
                    submitText: "提交"
                }), o.wetoast.toast({
                    title: t.error,
                    duration: 2e3
                })); else {
                    wx.redirectTo({
                        url: "/pages/user/cash/cash"
                    });
                }
            });
        } else wx.redirectTo({
            url: "/pages/user/coinaddr/coinaddr"
        }); else this.setData({
            identification: !0
        });
    },
    onLoad: function(t) {
        new a.WeToast();
        var e = t.id || 0, i = t.oid || 0, s = t.geshu || 1, o = wx.getStorageSync("addrid") || 0, d = t.main || !1;
        this.setData({
            frommain: d,
            id: e,
            geshu: s,
            addrid: o,
            oid: i
        }), this.loadData();
    },
    loadData: function() {
        var t = this.data.id, e = (this.data.oid, this.data.poid, this.data.addrid), i = (this.data.t, 
        this);
        a.getHttpData(a.domain + "/mall/order/?id=" + t + "&addrid=" + e, null, "GET", function(t) {
            wx.stopPullDownRefresh(), console.log(t), i.setData({
                dataset: t,
                totalcost: t.totalcost,
                post: t.post
            }), i.setData({
                loadlayer: !1
            });
        });
    },
    onPullDownRefresh: function() {
        this.loadData();
    }
});