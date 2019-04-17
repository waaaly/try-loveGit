var t = function() {
    function t(t, e) {
        var n = [], i = !0, a = !1, r = void 0;
        try {
            for (var o, s = t[Symbol.iterator](); !(i = (o = s.next()).done) && (n.push(o.value), 
            !e || n.length !== e); i = !0) ;
        } catch (t) {
            a = !0, r = t;
        } finally {
            try {
                !i && s.return && s.return();
            } finally {
                if (a) throw r;
            }
        }
        return n;
    }
    return function(e, n) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), e = getApp().services, n = e.Location, i = e.User, a = e.Ubt, r = e.AliLog, o = require("./js/api.js"), s = {};

Page({
    data: {
        outlink: "",
        geohash: wx.getStorageSync("PLACE").geohash,
        container: {
            shareTitle: "",
            shareImage: ""
        },
        webviewLink: ""
    },
    bindData: function(t) {
        var e = t.detail;
        e.data && (console.log("flag", e), s = e.data[e.data.length - 1]);
    },
    getFulllink: function(t, e) {
        var n = this;
        if (e) return decodeURIComponent(e);
        var i = t.querystring && "" + t.querystring.filter(function(t) {
            return n.data[t];
        }).map(function(t) {
            return t + "=" + n.data[t];
        }).join("&");
        return [ t.link, i ].join("#");
    },
    onLoad: function(e) {
        var a = this, r = e.outlink, s = e.shareLink, d = e.href, l = e.title, u = e.q, c = e.withLoginInfo, h = e.extraInfo;
        if (u) {
            var f = decodeURIComponent(u);
            l = l ? decodeURIComponent(l) : "", f.indexOf("?") > -1 ? f += "&" : f += "?", f += "isminiprogram=1", 
            c && (i.id && (f += "&uid=" + i.id), i.SID && (f += "&SID=" + i.SID)), h ? n().then(function(t) {
                return Promise.reject(t);
            }).catch(function(t) {
                var e = t.geohash;
                e && (f += "&geohash=" + e), i.id && (f += "&uid=" + i.id), i.SID && (f += "&ssi=" + i.SID), 
                a.setData({
                    webviewLink: f,
                    q: u,
                    title: l
                });
            }) : this.setData({
                webviewLink: f,
                q: u,
                title: l
            });
        } else if (d) {
            var g = decodeURIComponent(d);
            l = l ? decodeURIComponent(l) : "", wx.setNavigationBarTitle({
                title: l
            }), n().then(function(e) {
                var n = g.split("#"), a = t(n, 2), r = a[0], o = a[1];
                r.indexOf("?") > -1 ? r += "&" : r += "?", r += "isminiprogram=1&geolat=" + (e.latitude || "") + "&geolng=" + (e.longitude || "") + "&user_sid=" + encodeURIComponent(i.SID) + "&user_id=" + encodeURIComponent(i.id), 
                g = r, o && (g += "#" + o);
            }, function(t) {
                return null;
            }).then(function() {
                a.setData({
                    webviewLink: g
                });
            });
        } else wx.setNavigationBarTitle({
            title: "叫外卖上饿了么 - 饿了么"
        }), o.getWebviewConfig().then(function(t) {
            var e = t.data;
            e[r] && a.setData({
                outlink: r,
                container: e[r],
                webviewLink: a.getFulllink(e[r], s)
            });
        }).catch(function() {});
    },
    onShareAppMessage: function(t) {
        if (s.shareLink || this.data.outlink) {
            var e = s.shareLink ? "&shareLink=" + encodeURIComponent(s.shareLink) : "";
            return console.log("postdata", s, this.data), {
                title: s.shareTitle || this.data.container.shareTitle,
                path: s.shareModel ? "/pages/container/index?href=" + encodeURIComponent(s.shareLink) : "/pages/container/index?outlink=" + this.data.outlink + e,
                imageUrl: s.shareImgUrl || this.data.container.shareImage,
                success: function() {
                    s.ubtData && a.send("EVENT", {
                        id: s.ubtData.id,
                        params: s.ubtData.params
                    });
                }
            };
        }
        return {
            title: this.data.title || "饿了么",
            path: "/pages/container/index?href=" + this.data.q + "&extraInfo=1&title=" + this.data.title
        };
    },
    onShow: function() {
        r.sendPv(), a.sendPv();
    }
});