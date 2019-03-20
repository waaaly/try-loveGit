var t = require("../../614EDDE22546F6CF0728B5E55C25B753.js"), e = getApp();

Page({
    data: {
        checkedID: null
    },
    check: function(t) {
        var e = t.currentTarget.dataset.id;
        this.data.checkedID !== e && this.setData({
            checkedID: e
        });
    },
    save: function() {
        var t = this.data.checkedID, i = this.data.wishList, s = i.findIndex(function(e, i, s) {
            return e.id == t;
        });
        s >= 0 ? (e.setWishes(i[s].wishes, !0), wx.navigateBack()) : console.error("no item with id " + t + " in wishList");
    },
    onLoad: function(i) {
        e.getUserInfo(function(t) {
            console.log(t.nickName);
        });
        var s = this;
        t.request({
            path: "lists",
            relation: i.relation,
            sex: i.sex
        }, function(t) {
            s.setData({
                wishList: t
            });
        });
    }
});