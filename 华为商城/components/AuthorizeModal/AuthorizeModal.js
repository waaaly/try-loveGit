var t = getApp(), e = t.globalData.mp;

t.globalData.config;

Component({
    options: {
        multipleSlots: !1
    },
    properties: {
        showFlag: {
            type: Boolean,
            value: !0,
            observer: "refreshShowByFlag"
        },
        titleTips: {
            type: String,
            value: "",
            observer: "setTitle"
        },
        contentTips: {
            type: String,
            value: "",
            observer: "setContent"
        },
        authWords: {
            type: Object,
            value: {
                title: "",
                content: ""
            },
            observer: "setAuthWords"
        }
    },
    data: {
        showType: "showAll",
        titleTips: "",
        contentTips: "",
        defaultTitle: "欢迎来到华为商城",
        defaultContent: "请授权登录，获得完整购物体验"
    },
    attached: function() {},
    methods: {
        bindGetUserInfo: function(t) {
            var e = this;
            e.closeModal(), t && t.detail && t.detail.userInfo && e.triggerEvent("authSelect", {});
        },
        closeModal: function() {
            var t = this;
            t.setData({
                showType: "showNone",
                showFlag: !1
            }), t.triggerEvent("closeModal", {});
        },
        closeTips: function() {
            var t = this;
            t.setData({
                showType: "showBackground"
            }), t.triggerEvent("showWXModal", {});
        },
        refreshShowByFlag: function(t) {
            var e = this;
            t ? e.setData({
                showType: "showAll"
            }) : e.setData({
                showType: "showNone"
            });
        },
        setTitle: function(t) {
            this.setData({
                titleTips: t
            });
        },
        setContent: function(t) {
            this.setData({
                contentTips: t
            });
        },
        setAuthWords: function(t) {
            var o = this;
            if (!t || e.mpIsEmpty(t) || !t.title || e.mpIsEmpty(t.title) || !t.content || e.mpIsEmpty(t.content)) return o.setData({
                titleTips: o.data.defaultTitle,
                contentTips: o.data.defaultContent
            }), !1;
            o.setData({
                titleTips: t.title,
                contentTips: t.content
            });
        },
        preventD: function(t) {
            return !1;
        }
    }
});