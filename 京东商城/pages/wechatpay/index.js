function e(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && (r[a] = e[a]);
    return r.default = e, r;
}

var r = e(require("../../models/pay/wechat_pay.js")), a = require("../../bases/page.js"), o = e(require("../../common/url_utils.js")), i = e(require("../../common/cookie-v2/cookie.js"));

new a.JDPage({
    data: {
        loading: !1,
        price: 0,
        dealId: ""
    },
    onLoad: function(e) {
        var a = this, t = e.dealId, s = e.price, d = e.source, n = e.failRedirectUrl, l = e.successRedirectUrl, c = getApp().appId, p = decodeURIComponent(n), g = l ? decodeURIComponent(l) : "/pages/pay_second/done/done", u = t ? p ? "" : "没有传入failRedirectUrl或failRedirectUrl为空" : "没有传入dealId或dealId为空";
        u ? this.setData({
            errMsg: u
        }) : (this.setData({
            price: s || 0,
            loading: !0
        }), "oilcard" == d && "closewindow" != p && (p = o.addUrlParam(p, {
            wxapp_type: i.getCookie("wxapp_type")
        })), this.biz.getPPMS(34620).then(function(e) {
            if (a.setData({
                loading: !1
            }), e && e.length > 0) {
                var o = e[0], i = o.openAll, s = o.supportSources;
                i || s.split("|").indexOf(d) > 0 ? r.requestPay(c, t, function(e, r, o) {
                    if (e || "QB" == o) p && ("closewindow" == p ? wx.navigateBack() : a.$goto("/pages/h5/index", {
                        url: p
                    }, "redirectTo")); else if ("closewindow" == g) wx.navigateBack(); else if (g.indexOf("https://") > -1) a.$goto("/pages/h5/index", {
                        url: g
                    }, "redirectTo"); else {
                        var i = {};
                        if ("/pages/pay_second/done/done" == g) i = {
                            dealId: r,
                            orderType: d || "",
                            orderRedirectUrl: p
                        }; else if (g.indexOf("?") > -1) {
                            var t = g.indexOf("?"), s = g.slice(t + 1).split("&");
                            g = g.slice(0, t);
                            for (var n = 0; n < s.length; n++) {
                                var l = s[n].split("=");
                                i[l[0]] = l[1];
                            }
                        }
                        a.$goto(g, i, "redirectTo");
                    }
                }) : a.setData({
                    errMsg: "source:" + d + "是不支持的来源"
                });
            } else console.error("ppms34620数据异常，请检测配置！"), a.setData({
                loading: !1,
                errMsg: "网络异常，请稍后重试！"
            });
        }).catch(function(e) {
            a.setData({
                loading: !1,
                errMsg: "网络异常，请稍后重试！"
            });
        }));
    }
});