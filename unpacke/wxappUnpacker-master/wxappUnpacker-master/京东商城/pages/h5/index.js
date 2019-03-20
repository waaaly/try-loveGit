function e(e) {
    if (e && e.__esModule) return e;
    var i = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (i[t] = e[t]);
    return i.default = e, i;
}

var i = require("../../bases/page.js"), t = e(require("../../common/h5jump.js")), o = e(require("../../common/cookie-v2/cookie.js")), n = e(require("../../common/fe_report/usability.js")), a = require("../../common/url_utils"), r = getApp();

new i.JDPage({
    data: {
        url: "",
        pageTitle: "",
        shareTitle: "",
        shareSetting: {
            isset: !1,
            url: "",
            rurl: "",
            title: "",
            imgurl: "",
            pageurl: ""
        },
        isPingouApp: 2 == o.getCookie("wxapp_type"),
        showErrorTips: !1,
        isExecShareCb: !1
    },
    callback: null,
    onLoad: function(e) {
        console.log("webview, option: ", e, "url: ", e.url);
        var i = e.url;
        if ("function" == typeof e.onPageUnload && (this.onPageUnload = e.onPageUnload), 
        i) {
            var t = e.token;
            t && o.setCookie({
                data: {
                    wxsearch_token: {
                        value: t,
                        maxAge: 86400
                    }
                }
            }), r.systemInfo && r.systemInfo.SDKVersion && (i = this.addUrlParam(i, {
                wxappver: r.systemInfo.SDKVersion
            })), this.setData({
                url: i,
                shareTitle: this.helper.decode(e.shareTitle || "")
            }), e.pageTitle && wx.setNavigationBarTitle({
                title: this.helper.decode(e.pageTitle)
            }), console.log("webview url: " + this.data.url);
        }
    },
    onShow: function() {
        this.data.url || this.setData({
            showErrorTips: !0
        }), this.data.shareSetting.rurl && this.data.isExecShareCb && (this.$goto("/pages/h5/index", {
            encode_url: encodeURIComponent(this.data.shareSetting.rurl)
        }, "redirectTo"), this.data.shareSetting.rurl = "", this.data.isExecShareCb = !1);
    },
    onMessage: function(e) {
        for (var i = e.detail.data || [], o = null, n = i.length; n >= 0; n--) if (i[n] && i[n].snsset) {
            o = i[n];
            break;
        }
        o && (this.data.shareSetting.isset = !0, this.data.shareSetting.url = o.url || "", 
        this.data.shareSetting.title = o.title || "", this.data.shareSetting.imgurl = o.imgurl || "", 
        this.data.shareSetting.rurl = o.rurl || "", this.data.shareSetting.pageurl = o.pageurl || "");
        var a = {}, r = void 0;
        i.forEach(function(e) {
            for (var i in e) "cookie" == i && (Object.assign(a, e[i]), r = !0);
        }), r && t.updateCookie({
            cookie: a
        }, {
            dataType: "json"
        });
    },
    onUnload: function(e) {
        "function" == typeof this.onPageUnload && this.onPageUnload();
    },
    onShareAppMessage: function(e) {
        var i = e.webViewUrl;
        if (i = (0, a.removeUrlParam)(i, "cookie"), this.data.isExecShareCb = !1, [ "open.weixin.qq.com/connect/oauth2/authorize", "wqlogin1.jd.com/mlogin/wxv3/LoginRedirect", "wqlogin2.jd.com/mlogin/wxv3/LoginRedirect", "wq.jd.com/mlogin/wxv3/LoginRedirect", "open.show.qq.com/cgi-bin/login_state_auth_redirect", "wqlogin1.jd.com/mlogin/h5v1/GetCode", "wqlogin2.jd.com/mlogin/h5v1/GetCode", "wq.jd.com/mlogin/h5v1/GetCode", "wq.jd.com/mlogin/wxv3/login_BJ", "plogin.m.jd.com/cgi-bin/ml/risk", "plogin.m.jd.com/cgi-bin/ml/bind_risk", "plogin.m.jd.com/cgi-bin/ml/sms_risk", "plogin.m.jd.com/cgi-bin/ml/voice_risk", "plogin.m.jd.com/cgi-bin/ml/resetpwd_risk", "plogin.m.jd.com/cgi-bin/ml/jcap_risk", "plogin.m.jd.com/cgi-bin/ml/voicecode_reg", "plogin.m.jd.com/cgi-bin/ml/unionlogin_addition_verify", "ms.jr.jd.com/jrpmobile/btcashier/cashierDeskWap/landingPage" ].some(function(e) {
            return i.indexOf(e) >= 0;
        })) return n.umpBiz({
            bizid: 1002,
            operation: 8,
            result: 1,
            message: getApp().appId
        }), {
            title: "京东购物·多快好省",
            path: this.data.isPingouApp ? "pages/pingou/index/index" : "/pages/index/index",
            success: function(e) {
                wx.showToast({
                    title: "转发成功",
                    icon: "success"
                });
            },
            fail: function() {}
        };
        var t = this.judgeUrlIsRight(i), o = this.judgeSpecialUrl(i);
        if (this.data.shareSetting.isset && t || o.isDreamShoppingOrder) {
            var r = this, s = this.data.shareSetting.rurl, l = {
                title: o.title || this.data.shareSetting.title || this.data.shareTitle || "京东购物·多快好省",
                path: "/pages/h5/index?encode_url=" + encodeURIComponent(o.url || this.data.shareSetting.url || i),
                success: function(e) {
                    s ? r.$goto("/pages/h5/index", {
                        encode_url: encodeURIComponent(s)
                    }, "redirectTo") : wx.showToast({
                        title: "转发成功",
                        icon: "success"
                    });
                },
                fail: function() {}
            };
            return o.isDreamShoppingOrder && o.imageUrl && (l.imageUrl = o.imageUrl), this.data.shareSetting.imgurl && (l.imageUrl = this.data.shareSetting.imgurl), 
            s && (this.data.isExecShareCb = !0), l;
        }
        var d = {
            title: o.title || this.data.shareTitle || "京东购物·多快好省",
            path: (this.data.isPingouApp ? "pages/pingou/index/index?open_url=" : "/pages/index/index?open_url=") + encodeURIComponent(o.url || i),
            success: function(e) {
                wx.showToast({
                    title: "转发成功",
                    icon: "success"
                });
            },
            fail: function() {}
        };
        return o.imageUrl && (d.imageUrl = o.imageUrl), d;
    },
    addUrlParam: function(e, i) {
        var t = e.split("#"), o = t[1];
        e = t[0];
        for (var n in i) {
            var a = new RegExp("([?&])" + n + "=[^&]*(&|$)", "i");
            a.test(e) ? e = e.replace(a, "$1" + n + "=" + i[n] + "$2") : e += (e.indexOf("?") > -1 ? "&" : "?") + n + "=" + i[n];
        }
        return o && (e = e + "#" + o), e;
    },
    judgeUrlIsRight: function(e) {
        var i = this.data.shareSetting.pageurl;
        return !!e && (!!i && (e.indexOf("?") > -1 && (e = e.split("?")[0]), e.indexOf("#") > -1 && (e = e.split("#")[0]), 
        i.indexOf("?") > -1 && (i = i.split("?")[0]), i.indexOf("#") > -1 && (i = i.split("#")[0]), 
        e === i));
    },
    judgeSpecialUrl: function(e) {
        var i = e;
        if (!e) return {
            url: "",
            title: ""
        };
        if (e.indexOf("?") > -1 && (e = e.split("?")[0]), e.indexOf("#") > -1 && (e = e.split("#")[0]), 
        e.indexOf("train.m.jd.com") >= 0) return {
            url: "https://train.m.jd.com",
            title: "京东火车票，光速抢票，助力出行！"
        };
        if (e.indexOf("oilcard.m.jd.com") >= 0) return {
            url: "https://oilcard.m.jd.com/sinopec/sinoPecCardList.action?wxapp_type=1",
            title: ""
        };
        if (i.indexOf("wqs.jd.com/order/n_detail_v2.shtml?dreamShoppingInfo=") >= 0) {
            var t = new RegExp("([?&])dreamShoppingInfo=([^&]*)(&|$)", "i"), o = i.match(t);
            if (null != o) try {
                return o = JSON.parse(decodeURIComponent(o[2])), {
                    isDreamShoppingOrder: !0,
                    url: "https://wqitem.jd.com/item/view?sku=" + o.sku,
                    title: o.title,
                    imageUrl: o.image
                };
            } catch (e) {
                console.log("解析url的参数dreamShoppingInfo出错", e);
            }
        } else if (e.indexOf("m-jiaofei.jd.com") >= 0) return {
            title: "生活缴费|水电煤宽带固话有线电视费",
            url: "https://m-jiaofei.jd.com/index.html?sk=63",
            imageUrl: "https://img11.360buyimg.com/jdphoto/s400x320_jfs/t27094/107/1231465374/21852/63d80305/5bc4540cN65109b70.jpg"
        };
        return {
            url: "",
            title: ""
        };
    },
    goBack: function() {
        wx.navigateBack();
    }
});