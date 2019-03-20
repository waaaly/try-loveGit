var t = getApp(), a = getApp();

Page({
    data: {
        dataset: [],
        isLoad: !1,
        lukelayer: !1,
        submitText: "认证",
        identification: !1,
        loadIsEnd: !1,
        loadlayer: !0,
        scoreInfo: {},
        shareShow: !1
    },
    showShareWindow: function() {
        this.setData({
            shareShow: !0
        });
    },
    closeWindow: function() {
        this.setData({
            shareShow: !1
        });
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
        this.data.dataset.userid;
        var t = this.data.dataset.usertype;
    },
    bindDownPriceTap: function() {
        wx.navigateTo({
            url: "/pages/user/refund/refund"
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
            var e = a.detail.value.realname, o = a.detail.value.mobile, n = a.detail.value.cardid;
            if ("" != e) if ("" != o) {
                var i = n.length;
                if (0 != i) if (15 == i || 18 == i) {
                    console.log(e + "-" + o + "-" + n);
                    var s = this, l = {
                        mobile: o,
                        realname: e,
                        cardid: n
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
            var e = this;
            t.getHttpData(a.myCenter_index, null, "GET", function(a) {
                wx.stopPullDownRefresh(), console.log("userData", a), e.setData({
                    loginName: "登录",
                    userType: a.usertype
                }), 0 == a.userid ? t.removekey() : (e.setData({
                    dataset: a
                }), e.getIntegral(), t.getHttpData(t.domain + "/login/CanShare?userid=" + e.data.dataset.userid, null, "GET", function(t) {
                    wx.stopPullDownRefresh(), console.log(t), e.setData({
                        canShare: t.CanShare
                    });
                })), e.setData({
                    loadlayer: !1
                });
            });
        }
    },
    getIntegral: function() {
        var e = this, o = {
            dataFrom: 4,
            userId: e.data.dataset.userid,
            Space: "grt",
            "App-Uid": e.data.dataset.userid
        };
        t.getHttpData(a.app_wallet, null, "GET", function(a) {
            if (wx.stopPullDownRefresh(), a.nofinduser) return console.log("b"), t.removekey(), 
            void wx.navigateBack({});
            console.log(a), e.setData({
                isLoad: !1
            }), e.setData({
                scoreInfo: a.data
            }), e.setData({
                loadlayer: !1
            });
        }, o);
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