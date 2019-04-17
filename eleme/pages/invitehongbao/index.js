var t = getApp(), e = t.services, a = e.Ubt, s = e.User, n = require("./js/images.js"), i = require("./js/status.js"), o = require("./js/rule.js"), r = require("./js/apis.js"), u = t.extend([ {
    data: {
        images: n,
        statusInfo: i,
        phone: "",
        status: 0,
        rule: o,
        verifyCode: "",
        verifyText: "获取验证码",
        counting: !1
    },
    onLoad: function(t) {
        var e = t.referCode;
        e ? this.setData({
            referCode: e
        }) : wx.switchTab({
            url: "/pages/index/index"
        });
    },
    onShow: function() {
        a.sendPv();
    },
    getPhoneNumber: function(t) {
        this.setData({
            phone: t.detail.value
        });
    },
    getVerifyCode: function(t) {
        this.setData({
            verifyCode: t.detail.value
        });
    },
    getHongbao: function() {
        var t = this, e = this.data, n = e.phone, i = e.verifyCode, o = e.referCode;
        if (/^1[3-9]\d{9}$/.test(n)) if (i) {
            this.setData({
                subStatus: 0
            });
            var u = {
                phone: n,
                refer_code: o,
                verify_code: i,
                sns_uid: s.union_id
            };
            r.getHongbao(o, u).then(function(e) {
                0 === e.data.status && t.setData({
                    status: 2
                }), a.sendEvent({
                    id: 102118,
                    params: {
                        result: e.data
                    }
                });
            }).catch(function(e) {
                var s = void 0, n = void 0;
                switch (e.data.name) {
                  case "REFER_NOT_NEW_USER":
                    s = 3;
                    break;

                  case "USER_REFER_NOT_FOUND":
                    s = 4;
                    break;

                  case "REFER_INVALID_QUERY":
                    s = 5;
                    break;

                  case "REFER_INVALID_VERIFY_CODE":
                    n = 3;
                }
                s ? t.setData({
                    status: s,
                    errStatus: 4 === s || 5 === s
                }) : n ? t.setData({
                    subStatus: n
                }) : wx.showModal({
                    title: "领取失败",
                    content: e.data.message,
                    showCancel: !1
                }), a.sendEvent({
                    id: 102118,
                    params: {
                        result: e.data
                    }
                });
            });
        } else this.setData({
            subStatus: 2
        }); else this.setData({
            subStatus: 1
        });
    },
    useHongbao: function() {
        a.sendEvent({
            id: 102119
        }), wx.redirectTo({
            url: "/pages/newuser/index"
        });
    },
    goToInvite: function() {
        a.sendEvent({
            id: 102120
        }), wx.redirectTo({
            url: "/pages/commend/index"
        });
    },
    fetchVerifyCode: function() {
        this.data.counting || (/^1[3-9]\d{9}$/.test(this.data.phone) ? (this.setData({
            counting: !0,
            subStatus: 0
        }), this.countDown(), r.getVerifyCode(this.data.phone).then(function() {}).catch(function() {})) : this.setData({
            subStatus: 1
        }));
    },
    countDown: function() {
        var t = this, e = 30, a = setInterval(function() {
            e > 0 ? t.setData({
                verifyText: "已发送(" + e-- + "S)"
            }) : (clearInterval(a), t.setData({
                verifyText: "重新获取",
                counting: !1
            }));
        }, 1e3);
    }
} ]);

Page(u);