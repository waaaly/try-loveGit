function t(t) {
    if (Array.isArray(t)) {
        for (var a = 0, i = Array(t.length); a < t.length; a++) i[a] = t[a];
        return i;
    }
    return Array.from(t);
}

var a = function() {
    function t(t, a) {
        var i = [], n = !0, e = !1, r = void 0;
        try {
            for (var s, o = t[Symbol.iterator](); !(n = (s = o.next()).done) && (i.push(s.value), 
            !a || i.length !== a); n = !0) ;
        } catch (t) {
            e = !0, r = t;
        } finally {
            try {
                !n && o.return && o.return();
            } finally {
                if (e) throw r;
            }
        }
        return i;
    }
    return function(a, i) {
        if (Array.isArray(a)) return a;
        if (Symbol.iterator in Object(a)) return t(a, i);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), i = require("./apis.js"), n = require("../../shop/util").initScore, e = getApp().services, r = (e.Ubt, 
e.HashToUrl), s = {
    data: {
        rating: {
            shopId: null,
            score: {},
            tags: {},
            loading: !1,
            ratingList: {
                loadedAll: !1,
                list: null,
                query: {
                    limit: 10,
                    offset: 0,
                    tag_name: "",
                    has_content: !0
                }
            }
        }
    },
    onRatingViewLoad: function() {
        var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = e.id, s = e.tagName, o = e.isNewRetail, g = wx.getStorageSync("PLACE"), l = g.latitude, u = g.longitude;
        if (o) return Promise.all([ i.fetchScore(r), i.fetchTags(r) ]).then(function(i) {
            var e = a(i, 2), o = e[0], g = e[1], l = t.data.rating.ratingList;
            l.query.tag_name = s || "", t.setData({
                rating: {
                    shopId: r,
                    score: n(o),
                    tags: g,
                    ratingList: l
                }
            }), t.loadMoreRatings(null, r);
        });
        i.fetchShop(r, Object.assign({}, {
            latitude: l,
            longitude: u,
            isNewRetail: o
        })).then(function(a) {
            var i = a.ratings, e = n(i.score), o = i.tags, g = t.data.rating.ratingList;
            g.query.tag_name = s || (o.length > 0 ? o[0].name : ""), t.setData({
                rating: {
                    shopId: r,
                    score: e,
                    tags: o,
                    ratingList: g
                }
            }), t.loadMoreRatings(null, r);
        }).catch(function(t) {});
    },
    loadMoreRatings: function(a, n) {
        var e = this, s = this.data.rating, o = s.ratingList, g = s.loading, l = o.query;
        o.loadedAll || g || (s.loading = !0, this.setData({
            rating: s
        }), n = n || s.shopId, i.fetchRatings(n, Object.assign({}, l)).then(function(i) {
            var n = i.data;
            s.loading = !1, l.offset > 0 && n.length < 10 && (o.loadedAll = !0), o.list = a ? [].concat(t(o.list || []), t(n)) : n, 
            o.list.map(function(t) {
                t.order_images && t.order_images.length && t.order_images.map(function(t) {
                    t.image_url = r(t.image_hash, 180, 180);
                });
            }), o.query.offset += n.length, s.ratingList = o, e.setData({
                rating: s
            });
        }).catch(function() {}));
    },
    selectRatingTag: function() {
        var t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).target.dataset.tagName;
        if (t) {
            var a = this.data.rating, i = a.ratingList.query;
            i.tag_name = t, i.offset = 0, a.ratingList.loadedAll = !1, this.setData({
                rating: a
            }), this.loadMoreRatings();
        }
    },
    filterRatings: function() {
        var t = this.data.rating, a = t.ratingList.query;
        a.has_content = !a.has_content, a.offset = 0, t.ratingList.loadedAll = !1, this.setData({
            rating: t
        }), this.loadMoreRatings();
    }
};

module.exports = s;