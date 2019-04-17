var e = function() {
    function e(e, t) {
        var i = [], r = !0, a = !1, n = void 0;
        try {
            for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (i.push(o.value), 
            !t || i.length !== t); r = !0) ;
        } catch (e) {
            a = !0, n = e;
        } finally {
            try {
                !r && s.return && s.return();
            } finally {
                if (a) throw n;
            }
        }
        return i;
    }
    return function(t, i) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, i);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), t = getApp(), i = t.services, r = i.imageHash, a = i.Ubt, n = i.HashToUrl, o = require("apis"), s = require("../shop/util").initScore, d = {
    data: {
        imageHash: r,
        shop: null,
        ratings: null,
        ratingList: null,
        safe: {
            results: [ {
                text: "良好",
                color: "#7ed321",
                icon: r.shop_safe_good
            }, {
                text: "一般",
                color: "#fdbb00",
                icon: r.shop_safe_normal
            }, {
                text: "较差",
                color: "#d0021b",
                icon: r.shop_safe_bad
            } ]
        },
        currentImage: !1
    },
    onLoad: function(t) {
        var i = this, r = t.id, a = t.ele_id, d = t.isNewRetail;
        d = parseInt(d), wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 1e4
        });
        var l = wx.getStorageSync("PLACE"), c = l.latitude, u = l.longitude;
        Promise.all([ o.fetchShop(r, {
            latitude: c,
            longitude: u,
            isNewRetail: d
        }), o.fetchRatings(a || r) ]).then(function(t) {
            var r = e(t, 2), a = r[0], l = r[1];
            if (d) {
                var c = a.info;
                return c.isSupportOnTime = c.delivery_mode && c.delivery_mode.tag && "准时达" === c.delivery_mode.tag[0], 
                Promise.all([ o.fetchScore(c.ele_id), o.fetchTags(c.ele_id) ]).then(function(t) {
                    var r = e(t, 2), a = {
                        score: r[0],
                        tags: r[1]
                    };
                    a.score = s(a.score), i.setData({
                        shop: c,
                        ratings: a,
                        ratingList: l.data,
                        isNewRetail: d
                    }), wx.hideToast();
                });
            }
            var u = a, f = l.data, g = u.info, h = u.ratings;
            if (g.image_path = n(g.image_path, 120, 120), g.isSupportOnTime = g.supports.find(function(e) {
                return 9 === e.id;
            }) || !1, h.score = s(h.score), g.identification && g.identification.identificate_date) {
                var p = g.identification.identificate_date.split(/[^0-9]/);
                p = new Date(p[0], p[1] - 1, p[2], p[3], p[4], p[5]), g.identification.identificate_date = p.getFullYear() + "年" + (p.getMonth() + 1) + "月" + p.getDate() + "日";
            }
            i.setData({
                shop: g,
                ratings: h,
                ratingList: f,
                isNewRetail: d
            }), wx.hideToast();
        });
    },
    onShow: function() {
        a.sendPv();
    }
};

Page(t.extend([ {}, d, require("./image-previewer/index"), require("./info/index"), require("./rating/index") ]));