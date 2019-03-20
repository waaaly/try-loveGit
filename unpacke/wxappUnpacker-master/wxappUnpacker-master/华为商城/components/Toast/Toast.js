var t = getApp(), a = t.globalData.mp;

t.globalData.config;

Component({
    options: {
        multipleSlots: !1
    },
    properties: {
        options: {
            type: Object,
            value: {
                title: "",
                duration: 1500,
                mask: !1
            },
            observer: function(t) {
                var a = this, i = a.data.newOptions, e = Object.assign({}, a.data.defaultOptions, t);
                a._watchOptions(e, i);
            }
        }
    },
    data: {
        defaultOptions: {
            title: "",
            duration: 1500,
            mask: !1
        },
        newOptions: {
            title: "",
            duration: 1500,
            mask: !1
        },
        isShow: !1
    },
    detached: function() {
        this.data.timer = null;
    },
    methods: {
        _watchOptions: function(t, i) {
            if (!t.title || a.mpIsEmpty(t.title) || a.isObjectEqual(t, i)) return !1;
            var e = this;
            e.setData({
                newOptions: t,
                isShow: !0
            }), e.data.timer && clearTimeout(e.data.timer), e.data.timer = setTimeout(function() {
                e.setData({
                    newOptions: Object.assign({}, e.data.defaultOptions),
                    isShow: !1
                }), e.data.timer = null;
            }, t.duration);
        }
    }
});