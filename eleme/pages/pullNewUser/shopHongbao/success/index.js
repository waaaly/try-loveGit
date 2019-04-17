var t = getApp().services, a = t.Ubt, e = t.HashToUrl, n = t.User, o = require("../api.js");

Page({
    data: {
        hongbao: null,
        logoUrl: "",
        phone: "",
        hongbaosForDisplay: [],
        sendMessageTip: {
            content: "您将收到短信提示，根据提示的链接下载饿了么App",
            confirmText: "知道了"
        },
        showDownloadTip: !1,
        isExchange: !1
    },
    goHongbao: function() {
        a.sendEvent({
            id: 101062
        }), 1 === this.data.type ? wx.navigateTo({
            url: "/pages/shop/shop/index?id=" + this.data.id
        }) : wx.switchTab({
            url: "/pages/index/index"
        });
    },
    onLoad: function(t) {
        var i = this, s = wx.getStorageSync("pullNewUser.data");
        s.total = +s.hongbao.reduce(function(t, a) {
            return a.amount + t;
        }, 0).toFixed(2), s.hongbao.forEach(function(t) {
            return t.varietyString = t.varieties.join("、");
        }), s.isNewUser = (s.hongbao[0] || {}).is_new_user, s.is_exist = s.hongbao[0] && s.hongbao[0].is_exist, 
        s.mobile = n.info.mobile.replace(/(\d{3})(\d{4})(\d{3})/, function(t, a, e, n) {
            return a + "****" + n;
        }), this.setData(s), a.sendPv(), s.is_exist || a.sendEvent({
            id: 100553,
            params: {
                restaurant_id: s.id,
                is_new: s.isNewUser,
                hongbao_menkan: s.hongbao.map(function(t) {
                    return t.sum_condition;
                }),
                total: s.total
            }
        }), o.queryHongbaoList({
            id: this.data.id,
            type: this.data.type,
            isExchange: this.data.isExchange
        }).then(function(t) {
            var a = t.data;
            a.forEach(function(t) {
                return t.avatar = e(t.avatar);
            }), i.setData({
                hongbaosForDisplay: a
            });
        }).catch(function() {}), wx.removeStorageSync("pullNewUser.data");
    },
    downloadAction: function() {
        var t = this;
        a.sendEvent({
            id: 101061
        }), o.download({
            user_id: n.id,
            phone: n.info.mobile
        }).then(function() {
            return t.setData({
                showDownloadTip: !0
            });
        }).catch(function() {
            t.setData({
                sendMessageTip: Object.assign(t.data.sendMessageTip, {
                    content: "请通过应用市场搜索「饿了么」进行下载"
                }),
                showDownloadTip: !0
            });
        });
    },
    relogin: function() {
        n.removeSync(), wx.redirectTo({
            url: "/pages/pullNewUser/shopHongbao/index?id=" + this.data.id + "&type=" + (1 === this.data.type ? "shop" : "grand") + "&wxLogin=false"
        });
    },
    onShareAppMessage: function() {
        return a.sendEvent({
            id: 101063
        }), {
            title: "我在" + this.data.name + "领到了" + this.data.total + "元红包，你也来试试吧",
            path: "/pages/pullNewUser/shopHongbao/index?id=" + this.data.id + "&type=" + (1 === this.data.type ? "shop" : "grand")
        };
    },
    alertConfirmAction: function() {
        this.setData({
            showDownloadTip: !1
        });
    }
});