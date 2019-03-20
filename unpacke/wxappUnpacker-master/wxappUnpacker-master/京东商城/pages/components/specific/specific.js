function t(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i, t;
}

var e = require("../../../bases/component"), i = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    return e.default = t, e;
}(require("./api"));

new e.JDComponent({
    properties: {
        isJx: Boolean,
        skuId: {
            type: String,
            observer: "init"
        },
        skuType: String,
        slideImages: Array,
        category: String,
        globalType: String,
        description: String,
        isZiying: Boolean,
        isPlus: Boolean,
        skuItem: Object,
        expAttr: Object,
        upgradeGlobal: Boolean
    },
    data: {
        isBookOrDisk: !1,
        tab: {
            index: 0,
            intro: {
                tips: "努力加载中...",
                contents: [],
                notices: [],
                images: []
            },
            specs: {
                tips: "努力加载中...",
                packInfo: "",
                specific: []
            },
            service: {
                content: ""
            },
            minHeight: 0
        }
    },
    ready: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                e.windowHeight && t.setData({
                    "tab.minHeight": e.windowHeight - 60 + "px"
                });
            }
        });
    },
    methods: {
        init: function() {
            var t = this.data, e = t.skuId, i = t.skuType, a = t.slideImages, n = t.category, r = t.globalType, s = t.description, o = t.isPlus, c = t.skuItem, h = t.expAttr;
            this.imageSizeInfo || (this.imageSizeInfo = {}), this.renderSpecific(e, i, c, h), 
            this.renderDetailContent({
                skuId: e,
                skuType: i,
                slideImages: a,
                category: n,
                globalType: r,
                description: s,
                isPlus: o
            });
        },
        switchTab: function(t) {
            var e = t.currentTarget.dataset.tab;
            switch (e) {
              case 0:
                this.$report("DETAIL_TAB_INTRO");
                break;

              case 1:
                this.$report("DETAIL_TAB_SPECS");
                break;

              case 2:
                this.$report("DETAIL_TAB_AFTER_SALE");
            }
            this.setData({
                "tab.index": e
            });
        },
        renderSpecific: function(t, e, a, n) {
            var r = this;
            i.getSpec(t, e, a, n, function(e, i) {
                e ? console.log("^^^^^^ 商详-包装清单、商品参数拉取失败", e) : r.setData({
                    "tab.specs.packInfo": i.packInfo,
                    "tab.specs.specific": i.specific.slice(),
                    "tab.service.content": i.afterSale
                });
                var a = r.data.tab.specs.specific;
                a.push({
                    title: a.length ? "其他" : "",
                    content: [ [ "商品编号", t ] ]
                }), r.setData({
                    "tab.specs.specific": a,
                    "tab.specs.tips": ""
                });
            });
        },
        renderDetailContent: function(t) {
            var e = this, a = t.skuId, n = t.skuType, r = t.slideImages, s = t.category, o = t.globalType, c = t.description, h = t.isPlus;
            s && o && i.getGlobalNotice(s, o).then(function(t) {
                var i = [];
                t.forEach(function(t) {
                    t.forEach(function(t) {
                        t = e.helper.getImg(t), i.push(t);
                    });
                }), i = i.map(function(t, i) {
                    var a = e.helper.getImg(t), n = e.imageSizeInfo[a] || {};
                    return {
                        url: a,
                        width: n.width ? n.width + "rpx" : 0,
                        height: n.height ? n.height + "rpx" : 0
                    };
                }), e.setData({
                    "tab.intro.notices": i
                });
            }).catch(function(t) {}), i.getInfo(a, n, c, h).then(function(t) {
                e.setData({
                    isBookOrDisk: "2" == n || "3" == n
                });
                var i = [];
                t && t.length ? e.data.isBookOrDisk ? (t.forEach(function(t) {
                    t.content.forEach(function(t) {
                        "image" == t.type && (i.push(t.value), t.imgIdx = i.length - 1);
                    });
                }), e.setData({
                    "tab.intro.contents": t
                })) : i = t : i = r.slice(), i = i.map(function(t, i) {
                    var a = e.helper.getImg(t), n = e.imageSizeInfo[a] || {};
                    return {
                        url: a,
                        width: n.width ? n.width + "rpx" : 0,
                        height: n.height ? n.height + "rpx" : 0
                    };
                }), e.setData({
                    "tab.intro.images": i,
                    "tab.intro.tips": ""
                });
            }).catch(function(t) {
                var i = r.map(function(t, i) {
                    var a = e.helper.getImg(t), n = e.imageSizeInfo[a] || {};
                    return {
                        url: a,
                        width: n.width ? n.width + "rpx" : 0,
                        height: n.height ? n.height + "rpx" : 0
                    };
                });
                e.setData({
                    "tab.intro.images": i,
                    "tab.intro.tips": ""
                });
            });
        },
        imageDidLoad: function(e) {
            var i = e.target.dataset.idx, a = e.target.dataset.src, n = e.target.dataset.type, r = e.detail.width, s = e.detail.height;
            if (r > 400) {
                var o;
                this.imageSizeInfo[a] = {
                    width: 750,
                    height: Math.round(750 * s / r)
                }, this.setData((o = {}, t(o, "tab.intro." + n + "[" + i + "].url", a), t(o, "tab.intro." + n + "[" + i + "].width", this.imageSizeInfo[a].width + "rpx"), 
                t(o, "tab.intro." + n + "[" + i + "].height", this.imageSizeInfo[a].height + "rpx"), 
                o));
            }
        }
    }
});