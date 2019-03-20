var t = getApp();

Page({
    data: {
        dataset: [],
        nextPage: 1,
        isLoad: !1,
        lukelayer: !1,
        submitText: "认证",
        identification: !1,
        loadIsEnd: !1,
        loadlayer: !0
    },
    bindRecordTap: function(t) {
        t.currentTarget.dataset.t;
    },
    bindTiXianCaptionTap: function(t) {
        this.setData({
            lukelayer: !0
        });
    },
    bindCopyCodeTap: function() {
        this.setData({
            lukelayer: !1
        }), wx.setStorageSync("isllokrule", "1");
    },
    bindInTojiangliTap: function(t) {
        console.log("in"), wx.navigateTo({
            url: "/pages/partner/caption/caption"
        });
    },
    bindInToTap: function(t) {
        this.setData({
            identification: !1
        });
    },
    bindSubmitTap: function(a) {
        if (this.data.isLoad) this.wetoast.toast({
            title: "提交中..",
            duration: 2e3
        }); else {
            var e = a.detail.value.realname, o = a.detail.value.mobile, i = a.detail.value.cardid;
            if ("" != e) if ("" != o) {
                var n = i.length;
                if (0 != n) if (15 == n || 18 == n) {
                    console.log(e + "-" + o + "-" + i);
                    var s = this, l = {
                        mobile: o,
                        realname: e,
                        cardid: i
                    };
                    this.setData({
                        submitText: "请稍后.."
                    }), t.getHttpData(t.domain + "/partner/ident", l, "POST", function(t) {
                        s.setData({
                            isload: !1
                        }), s.setData({
                            submitText: "认证"
                        }), t.result && "ok" == t.result ? (s.setData({
                            identification: !1
                        }), s.setData({
                            "dataset.recommend.identification": !0
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
    bindTxXianTiShi: function(t) {
        var a = wx.getStorageSync("isllokrule") || "";
        if (console.log(a + "rult"), "" != a || "" == this.data.dataset.recommend.txcaption) if (this.data.isLoad) this.wetoast.toast({
            title: "正在领取中..",
            duration: 2e3
        }); else {
            var e = this, o = this.data.dataset.recommend.cashcost, i = this.data.dataset.recommend.mincash;
            console.log(i), o < i ? wx.showModal({
                title: "提示",
                content: "金额不足",
                showCancel: !1,
                confirmColor: "#357C6E"
            }) : this.data.dataset.recommend.identification ? e.bindTiXianTap(t) : this.setData({
                identification: !0
            });
        } else this.bindTiXianCaptionTap();
    },
    bindTiXianTap: function(a) {
        var e = this, o = this.data.dataset.recommend.cashcost;
        t.getHttpData(t.domain + "/partner/cash?cost=" + o, null, "GET", function(t) {
            e.setData({
                isLoad: !1
            }), "" == t.result ? (wx.showModal({
                title: "提示",
                content: "领取成功",
                showCancel: !1,
                confirmColor: "#357C6E"
            }), e.setData({
                "dataset.recommend.cashcost": 0
            })) : wx.showModal({
                title: "提示",
                content: t.result,
                showCancel: !1,
                confirmColor: "#357C6E"
            });
        });
    },
    loadData: function() {
        if (!this.data.isLoad && !this.data.loadIsEnd) {
            console.log("下拉刷新...."), this.setData({
                isLoad: !0
            });
            var a = this, e = this.data.nextPage;
            t.getHttpData(t.domain + "/partner/record?page=" + e, null, "GET", function(e) {
                if (wx.stopPullDownRefresh(), e.nofinduser) return console.log("b"), t.removekey(), 
                void wx.navigateBack({});
                console.log(e), a.setData({
                    isLoad: !1
                }), null != e && (e.length < 15 && a.setData({
                    loadIsEnd: !0
                }), 1 == a.data.nextPage ? a.setData({
                    dataset: e
                }) : e.length > 0 && a.setData({
                    dataset: a.data.dataset.concat(e)
                }), a.setData({
                    nextPage: a.data.nextPage + 1
                }), a.setData({
                    loadlayer: !1
                }));
            });
        }
    },
    onLoad: function(a) {
        new t.WeToast();
        var e = this;
        this.setData({
            nextPage: 1,
            isLoad: !1,
            loadIsEnd: !1
        }), t.login(function(t) {
            e.loadData();
        });
    },
    onReachBottom: function() {
        console.log("上拉处底...."), this.setData({
            isLoad: !1,
            loadIsEnd: !1
        }), this.loadData();
    },
    onPullDownRefresh: function() {
        console.log("下拉刷新...."), this.onLoad();
    }
});