var t = /^[0-9]*$/, e = (require("../../../75803BF22546F6CF13E653F5D7E4B753.js"), 
getApp());

Page({
    data: {
        loadlayer: !0,
        tip: "",
        nowUser: "",
        reId: "",
        lookUserInfo: "",
        showType: ""
    },
    onLoad: function(t) {
        var a = this;
        new e.WeToast(), a.indexLoad();
    },
    indexLoad: function() {
        var t = this;
        t.setData({
            tip: "",
            nowUser: "",
            reId: "",
            lookUserInfo: "",
            showType: ""
        }), t.getUser();
    },
    getUser: function() {
        var t = this;
        e.getHttpData(e.myCenter_changeUser, {
            type: 1,
            userId: wx.getStorageSync("userid")
        }, "GET", function(e) {
            console.log(e), 200 == e.code ? (console.log("当前推荐人信息"), t.setData({
                nowUser: e.data,
                loadlayer: !1
            })) : (t.setData({
                loadlayer: !1
            }), e.msg ? t.wetoast.toast({
                title: e.msg,
                duration: 2e3
            }) : t.wetoast.toast({
                title: "未知错误",
                duration: 2e3
            }));
        });
    },
    getUserId: function(t) {
        wx.getStorageSync("userid");
        this.setData({
            reId: t.detail.value
        });
    },
    lookUser: function() {
        var a = this, o = a.data.reId, s = wx.getStorageSync("userid");
        "" == o ? a.wetoast.toast({
            title: "推荐ID不能为空",
            duration: 2e3
        }) : o == s ? a.setData({
            tip: 2
        }) : t.test(o) ? (a.setData({
            tip: ""
        }), wx.showLoading({
            title: "查询中",
            mask: !0
        }), e.getHttpData(e.myCenter_changeUser, {
            type: 2,
            userId: a.data.reId
        }, "GET", function(t) {
            console.log(t), 200 == t.code ? (a.setData({
                lookUserInfo: t.data,
                showType: 1
            }), wx.hideLoading()) : (wx.hideLoading(), a.setData({
                lookUserInfo: "",
                showType: 2
            }));
        })) : a.setData({
            tip: 1
        });
    },
    goBack: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    makeChange: function() {
        var a = this, o = (a.data.reId, wx.getStorageSync("userid"));
        console.log(t.test(a.data.lookUserInfo.id)), t.test(a.data.lookUserInfo.id) && 1 == a.data.showType && (wx.showLoading({
            title: "修改中",
            mask: !0
        }), e.getHttpData(e.myCenter_changeUsers, {
            inviterId: a.data.lookUserInfo.id,
            userId: o
        }, "PUT", function(t) {
            console.log("修改信息", t), 200 == t.code ? (a.setData({
                showType: 3
            }), wx.showToast({
                title: "修改成功",
                mask: !0,
                icon: "none"
            }), setTimeout(function() {
                wx.navigateBack({
                    delta: 1
                });
            }, 2e3), wx.hideLoading()) : (a.setData({
                showType: 1
            }), wx.hideLoading(), a.wetoast.toast({
                title: "修改失败，请重新尝试",
                duration: 2e3
            }));
        }));
    },
    onShow: function() {}
});