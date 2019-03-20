require("../../../1AE77A212546F6CF7C811226C5D4B753.js");

var a = getApp();

Page({
    data: {
        isCover: !0,
        loadlayer: !0,
        userInfo: "",
        index: "",
        choseIndex: "",
        btntext: "获取验证码",
        disabled: !1,
        bankcode: "",
        type: "",
        banks: "",
        bankNumber: "",
        bankname: "",
        userName: ""
    },
    onLoad: function(a) {
        var e = this;
        console.log(a), a.bankcode && e.setData({
            bankcode: a.bankcode
        });
    },
    choseBank: function(a) {
        this.setData({
            choseIndex: a.currentTarget.dataset.inx,
            bankcode: a.currentTarget.dataset.bankcode,
            bankname: a.currentTarget.dataset.bankname
        });
        var e = getCurrentPages();
        e[e.length - 2].setData({
            choseIndex: a.currentTarget.dataset.inx,
            bankcode: a.currentTarget.dataset.bankcode,
            bankname: a.currentTarget.dataset.bankname,
            isChangeBank: !0
        }), wx.navigateBack({});
    },
    onShow: function() {
        this.getBankList();
    },
    getBankList: function() {
        var e = this;
        a.getHttpData(a.vip_bankList, null, "GET", function(a) {
            console.log("银行列表", a), 200 == a.code ? (e.setData({
                banks: a.data,
                loadlayer: !1
            }), console.log(e.data.bankcode), e.data.bankcode ? e.setData({
                choseIndex: e.findIndex(e.data.bankcode, e.data.banks)
            }) : e.setData({
                choseIndex: 0
            })) : (e.setData({
                loadlayer: !1
            }), wx.showToast({
                title: "获取银行列表失败",
                icon: "none"
            }));
        });
    },
    findIndex: function(a, e) {
        var n;
        for (var t in e) a == e[t].bankcode && (n = t);
        return n;
    }
});