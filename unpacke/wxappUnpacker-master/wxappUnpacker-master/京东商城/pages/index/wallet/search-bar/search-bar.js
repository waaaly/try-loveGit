function t(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    return e.default = t, e;
}

var e = require("../../../../bases/component.js"), a = t(require("../../model.js")), n = t(require("../../utils.js")), s = require("../../../../common/logger.js"), o = require("../../../../api/Ptag/report_manager.js"), i = new s.Logger("HMMMMMMMMM 京东优选 - 顶部搜索条");

new e.JDComponent({
    properties: {
        scrollTop: {
            type: Number,
            value: 0,
            observer: function(t, e) {
                this.setData({
                    cssModifier: t > 40 ? "scroll" : ""
                });
            }
        },
        loadOthers: {
            type: Boolean,
            observer: function(t) {
                t && this.getKey();
            }
        },
        shakePayload: {
            type: Object,
            observer: function(t) {
                t && t.showEntrance && this.showShakeEntrance(t.config);
            }
        }
    },
    ready: function() {
        n.exposureUrlPtag("137889.1.8", !0);
    },
    data: {
        cssModifier: "",
        menuList: [],
        showMenu: !1,
        searchKey: ""
    },
    methods: {
        toggleMenu: function(t) {
            var e = this.data, a = e.showMenu, n = e.menuList;
            a = void 0 === t ? !a : t, n.length ? this.setData({
                showMenu: a
            }) : (this.data.showMenu = !0, this.loadChannelListData());
        },
        getKey: function() {
            var t = this;
            a.getSearchKey("191").then(function(e) {
                e && e.data && e.data.length && t.setData({
                    searchKey: e.data[0].searchname || ""
                });
            }).catch(function(t) {
                return console.log(t);
            });
        },
        loadChannelListData: function() {
            var t = this;
            this.biz.getPPMS(17311, {
                v: !1
            }).then(function(e) {
                i.log("loadChannelListData --\x3e", e);
                var a = [];
                e.forEach(function(e) {
                    n.checkTime(e.begin, e.end) && a.push({
                        name: e.urlName,
                        icon: t.utils.getImg(e.urlImg, 40),
                        url: e.url
                    });
                }), t.setData({
                    menuList: a,
                    showMenu: t.data.showMenu
                });
            }, function(e) {
                var a = e.message, s = e.code;
                t.triggerEvent("showToast", {
                    content: n.genErrMsg(a, s)
                });
            });
        },
        tapOnCateBtn: function(t) {
            this.toggleMenu();
        },
        tapOnMask: function(t) {
            this.toggleMenu(!1);
        },
        tapOnSearchBar: function() {
            var t = {
                ptag: "137889.1.2"
            };
            this.data.searchKey && (t.searchname = this.data.searchKey), this.$goto("/pages/search/list/list", t);
        },
        tapOnMenuItem: function(t) {
            var e = t.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: e
            }), this.toggleMenu(!1);
        },
        noop: function() {},
        showShakeEntrance: function(t) {
            this.config = t, t.wallet_ptag && o.ReportManager.addPtagExposure(t.wallet_ptag), 
            this.setData({
                shakeEntrance: {
                    image: this.utils.getImg(t.wxappSmallImg),
                    url: n.addPtag(t.link, t.wallet_ptag)
                }
            });
        },
        navigate: function(t) {
            var e = this.config, a = t.currentTarget.dataset.url;
            e.mini_link ? (this.$goto(e.mini_link), this.$report(e.wallet_ptag)) : this.$goto("/pages/h5/index", {
                url: a
            });
        },
        tapOnChannerBtn: function(t) {
            this.$goto("/pages/index/subpack/wallet-channel/index", {
                ptag: "137889.1.8"
            });
        }
    }
});