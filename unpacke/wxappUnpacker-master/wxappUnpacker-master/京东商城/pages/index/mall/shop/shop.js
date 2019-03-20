function e(e) {
    if (e && e.__esModule) return e;
    var o = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (o[t] = e[t]);
    return o.default = e, o;
}

var o = require("../../../../bases/component.js"), t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../common-behavior.js")), n = e(require("../../model.js")), i = e(require("../../../../common/cookie-v2/cookie")).getCookie;

new o.JDComponent({
    behaviors: [ t.default ],
    data: {
        entries: [],
        hideModule: !1
    },
    methods: {
        refresh: function() {
            this.loadEntryData();
        },
        loadEntryData: function() {
            var e = this, o = i("pin") || "", t = i("open_id") || 0;
            o && (t = ""), n.getShopRecommend(o, t).then(function(o) {
                var t = [], n = [];
                (o.composite_info.data || []).forEach(function(i, r) {
                    var s = "".logo, u = "".name, a = "".spu, c = [], l = [];
                    o.shop_info.forEach(function(o) {
                        o.shopid == i.itemid && (s = e.utils.getImg(o.logo, 120, 40), u = o.name);
                    }), o.spu_name.forEach(function(e) {
                        e.spu == i.spu && (a = e.spu);
                    }), i.subsku.forEach(function(t) {
                        l.push(t.sku), o.sku_img.forEach(function(o) {
                            o.sku == t.sku && (c.push(e.utils.getImg(o.imgUrl, 148)), c.splice(2));
                        });
                    }), n.push(i.spu + "_" + l.join(",")), t.push({
                        url: "https://wqs.jd.com/hawaii/729/dest/release/index.shtml?ptag=138067.15." + (11 + r) + "#type=spu&id=" + a,
                        clk: i.clk,
                        logo: s,
                        name: u,
                        images: c
                    });
                }), e.setData({
                    entries: t
                }), e.triggerEvent("showModule"), wx.$.request.get({
                    url: "https:" + o.composite_info.impr.replace("CATE_ID_SKU_LIST", n.join(";")),
                    priority: "REPORT",
                    dataType: "text"
                }).then(function(e) {
                    e.body, e.header;
                }, function(e) {
                    console.log(e);
                });
            }).catch(function(o) {
                console.log("shop error", o), e.setData({
                    hideModule: !0
                });
            });
        },
        gotoUrl: function(e) {
            var o = e.currentTarget.dataset, t = o.url, n = o.clk;
            n && wx.$.request.get({
                url: "https:" + n,
                priority: "REPORT",
                dataType: "text"
            }).then(function(e) {
                e.body, e.header;
            }, function(e) {
                console.log(e);
            }), this.$goto("/pages/h5/index", {
                url: t
            });
        }
    }
});