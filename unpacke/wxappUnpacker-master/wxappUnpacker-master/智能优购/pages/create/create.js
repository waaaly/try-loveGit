var e = getApp();

Page({
    data: {
        relation: [ {
            id: "1",
            name: "父母",
            img: "elder"
        }, {
            id: "2",
            name: "对象",
            img: "lover"
        }, {
            id: "3",
            name: "同学",
            img: "ex"
        }, {
            id: "4",
            name: "客户",
            img: "colleague"
        }, {
            id: "5",
            name: "领导",
            img: "friend"
        }, {
            id: "6",
            name: "朋友",
            img: "teacher"
        }, {
            id: "7",
            name: "同事",
            img: "younger"
        }, {
            id: "8",
            name: "亲戚",
            img: "leader"
        } ],
        gender: [ {
            id: "1",
            name: "男",
            img: "male"
        }, {
            id: "2",
            name: "女",
            img: "female"
        } ],
        userInfo: {},
        query: {
            relationID: 1,
            genderID: 1,
            isMore: !1
        }
    },
    changeToName: function(a) {
        var t = a.detail.value;
        t.length > 10 ? this.setData({
            isMore: !0
        }) : this.setData({
            isMore: !1
        }), t || e.setToName(t), this.setData({
            fromNiceName: t
        });
    },
    generate: function(a) {
        e.clearWishes();
        var t = a.detail.value;
        t.toname && e.setToName(t.toname), wx.navigateTo({
            url: "/pages/preview/preview?state=0&relation=" + t.relationID + "&sex=" + t.genderID
        });
    },
    tap_relation: function(e) {
        this.setData({
            "query.relationID": e.currentTarget.dataset.id
        });
    },
    tap_gender: function(e) {
        this.setData({
            "query.genderID": e.currentTarget.dataset.id
        });
    },
    onLoad: function() {
        var a = this;
        this.setData({
            relation1: a.data.relation.slice(0, 4),
            relation2: a.data.relation.slice(4, 8)
        }), e.getUserInfo(function(e) {
            a.setData({
                userInfo: e
            });
        });
    }
});