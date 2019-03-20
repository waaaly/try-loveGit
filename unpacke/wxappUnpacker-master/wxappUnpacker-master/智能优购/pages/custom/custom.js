var e = void 0, t = {
    toname: "",
    "best-wishes": "",
    nickName: ""
}, a = function(e, t) {
    n.setTempNickName(t.nickName), n.setToName(t.toname, !0), n.setWishes(t["best-wishes"], !0);
}, n = getApp();

Page({
    data: {
        max_input: 80,
        isRed: !1,
        userInfo: {},
        txtNum: 80,
        wishes: ""
    },
    "more-template": function(e) {
        var n = this;
        setTimeout(function() {
            t.toname = t.toname || n.data.toname, t["best-wishes"] = t["best-wishes"] || n.data.wishes, 
            t.nickName = t.nickName || n.data.userInfo.nickName, a(0, t), wx.navigateTo({
                url: "/pages/more/more?relation=" + n.data.relation + "&sex=" + n.data.sex
            });
        }, 50);
    },
    save: function(e) {
        var t = this, a = getCurrentPages();
        a[a.length - 1];
        a[a.length - 2].setData({
            toname: t.data.toname,
            sentence: t.data.wishes
        }), wx.navigateBack();
    },
    cancel: function(e) {
        n.clearWishes(!0), n.clearTempNickName(), n.clearTempToName(), wx.navigateBack();
    },
    setToName: function(e) {
        this.setData({
            toname: e.detail.value
        });
    },
    setNickName: function(e) {
        t.nickName = e.detail.value;
    },
    bindChangeText: function(e) {
        var t = e.detail.value, a = !1, n = this.data.max_input;
        a = t.length > n, this.setData({
            txtNum: n - t.length,
            wishes: t,
            isRed: a
        });
    },
    loadData: function() {
        var e = this;
        n.getHttpData(n.myCenter_index, null, "GET", function(t) {
            wx.stopPullDownRefresh(), console.log(t), e.setData({
                loginName: "登录"
            }), 0 == t.userid && n.removekey(), e.setData({
                userInfo: t
            }), e.setData({
                loadlayer: !1
            });
        });
    },
    onShow: function() {
        var e = this;
        n.getUserInfo(function(t) {
            var a = Object.assign({}, t);
            a.nickName = n.getTempNickName() || a.nickName, e.setData({
                userInfo: a
            });
        });
        var t = getCurrentPages(), a = (t[t.length - 1], t[t.length - 2].data);
        this.setData({
            relation: a.relation,
            sex: a.sex,
            toname: a.toname,
            wishes: a.sentence
        }), this.validateTxt();
    },
    onLoad: function(t) {
        e = t;
    },
    validateTxt: function() {
        var e = this.data.max_input, t = this.data.wishes, a = e - t.length, n = !1;
        t.length > e && (n = !0), this.setData({
            txtNum: a,
            isRed: n
        });
    }
});