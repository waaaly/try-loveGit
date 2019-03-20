var t = getApp();

Page({
    data: {
        dataset: [],
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
    bindDuiHuanTap: function() {
        console.log("a"), wx.navigateTo({
            url: "/pages/mall/index3/index3"
        });
    },
    bindScoreTap: function() {
        wx.navigateTo({
            url: "/pages/user/integral/integral"
        });
    },
    bindInOutTap: function() {
        wx.navigateTo({
            url: "/pages/user/record/record"
        });
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
    bindDownTap: function() {
        var t = this.data.dataset.userid, a = this.data.dataset.usertype, e = "0";
        1 == a && (e = "2"), 2 == a && (e = "3"), wx.navigateTo({
            url: "/pages/user/referrer2/referrer2?userid=" + t + "&cote=" + e
        });
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
                        console.log(t), s.setData({
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
                            confirmColor: "#AA363E"
                        })) : wx.showModal({
                            title: "提示",
                            content: "操作失败，请重试",
                            showCancel: !1,
                            confirmColor: "#AA363E"
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
        return void wx.switchTab({
            url: "/pages/mall/index/index"
        });
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
                confirmColor: "#AA363E"
            }), e.setData({
                "dataset.recommend.cashcost": 0
            })) : wx.showModal({
                title: "提示",
                content: t.result,
                showCancel: !1,
                confirmColor: "#AA363E"
            });
        });
    },
    loadData: function() {
        if (!this.data.isLoad && !this.data.loadIsEnd) {
            console.log("下拉刷新...."), this.setData({
                isLoad: !0
            });
            var a = this;
            t.getHttpData(t.domain + "/partner/score", null, "GET", function(e) {
                if (wx.stopPullDownRefresh(), e.nofinduser) return console.log("b"), t.removekey(), 
                void wx.navigateBack({});
                console.log(e), a.setData({
                    isLoad: !1
                }), a.setData({
                    dataset: e
                }), a.setData({
                    loadlayer: !1
                });
            });
        }
    },
    onLoad: function(a) {
        new t.WeToast(), this.setData({
            isLoad: !1,
            loadIsEnd: !1
        }), this.loadData();
    },
    onReachBottom: function() {
        this.loadData();
    },
    onPullDownRefresh: function() {
        console.log("下拉刷新...."), this.onLoad();
    }
});