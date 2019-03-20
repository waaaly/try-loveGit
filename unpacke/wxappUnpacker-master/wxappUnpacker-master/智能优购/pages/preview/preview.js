var e = require("../../614EDDE22546F6CF0728B5E55C25B753.js"), t = getApp(), a = void 0;

Page({
    data: {
        userInfo: {},
        toname: "",
        relation: 1,
        sex: 1,
        today: "",
        sentday: "",
        sentence: "",
        wishesId: "",
        state: 0,
        showOverlay: !1
    },
    finishCard: function() {
        this.setData({
            state: "1"
        });
    },
    changeOne: function(s) {
        var n = this;
        if (console.log("eee", s), s) e.request({
            path: "WishTemplet",
            relationType: a.relation,
            genderType: a.sex
        }, function(e) {
            200 == e.code && n.setData({
                sentence: e.data.templet
            });
        }); else {
            var o = t.getWishes();
            o ? this.setData({
                sentence: o
            }) : e.request({
                path: "WishTemplet",
                relationType: a.relation,
                genderType: a.sex
            }, function(e) {
                200 == e.code && (console.log("祝福", e), n.setData({
                    sentence: e.data.templet
                }));
            });
        }
    },
    formBlessing: function(e) {
        if (console.log("phoneData", e), 0 == this.data.userInfo.userid) return !1;
        var a = e.iv, s = e.encryptedData, n = this.data.userInfo.nickname, o = this.data.userInfo.pic, i = this.data.sentence, r = t.getSessionKey();
        wx.request({
            url: t.app_wish,
            method: "PUT",
            header: {
                "content-type": "application/json",
                "App-Space": "B0CD0050CF0BF01B",
                "App-Type": "3",
                "App-Extra": "",
                "App-Uid": 0,
                "Api-Version": "1"
            },
            data: {
                iv: a,
                encryptedData: s,
                nickName: n,
                sentence: i,
                sessionKey: r,
                pic: o
            },
            success: function(e) {
                console.log(e.data);
            },
            fail: function(e) {
                console.log("err", e);
            }
        });
    },
    shareTips: function(e) {
        var t = this;
        this.setData({
            showOverlay: !0
        }), setTimeout(function() {
            t.hideOverlay();
        }, 3e3), this.formBlessing(e.detail);
    },
    hideOverlay: function() {
        this.setData({
            showOverlay: !1
        });
    },
    getPhoneNumber: function() {
        wx.navigateTo({
            url: "/pages/create/create"
        });
    },
    gotoActive: function() {
        wx.navigateBack({
            delta: 2
        });
    },
    bindViewTap: function() {
        "0" === this.data.state && (t.setWishes(this.data.sentence), wx.navigateTo({
            url: "/pages/custom/custom?relation=" + this.data.relation + "&sex=" + this.data.sex
        }));
    },
    loadData: function() {
        var e = this;
        t.getHttpData(t.myCenter_index, null, "GET", function(a) {
            wx.stopPullDownRefresh(), console.log(a), e.setData({
                loginName: "登录"
            }), 0 == a.userid && t.removekey(), e.setData({
                userInfo: a
            }), e.setData({
                loadlayer: !1
            });
        });
    },
    onLoad: function(e) {
        console.log("options", e), a = e, this.loadData(), console.log(this.data.userInfo), 
        "0" === a.state && this.changeOne();
    },
    onShow: function() {
        if (console.log("sssssss", this.data), "0" === a.state) {
            console.log("进入制作页面");
            var t = this.data.toname;
            if (!t) {
                var s = getCurrentPages(), n = (s[s.length - 1], s[s.length - 2]), o = n.data;
                if (o.fromNiceName) t = o.fromNiceName; else {
                    var i = (n = (s = getCurrentPages())[s.length - 2]).data, r = parseInt(a.relation) - 1;
                    console.log("prevData", i), console.log(i.relation[r]), t = i.relation[r].name, 
                    console.log("name", t);
                }
            }
            this.setData({
                toname: t,
                state: a.state,
                relation: a.relation,
                sex: a.sex,
                today: e.today()
            });
        }
        "1" === a.state && (console.log(a), console.log("接收贺卡"), this.setData({
            state: a.state,
            toname: a.toname,
            fromname: a.fromname,
            fromavatar: a.fromavatar,
            sentday: a.sentday,
            sentence: a.sentence
        }));
        var l = wx.getStorageSync("preview-custom-hint") || !1;
        this.setData({
            showCustomHint: l
        });
    },
    confirmCustomHint: function() {
        wx.setStorageSync("preview-custom-hint", !0), this.setData({
            showCustomHint: !0
        });
    },
    onHide: function() {}
});