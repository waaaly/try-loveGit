var t = require("../../../../bases/component.js"), e = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    return e.default = t, e;
}(require("../../utils.js"));

new t.JDComponent({
    properties: {
        showTime: {
            type: Number,
            observer: function() {
                this.checkTips();
            }
        }
    },
    data: {
        tipsText: "",
        tipsPath: ""
    },
    methods: {
        checkTips: function() {
            var t = getApp().indexTips;
            this.setData({
                tipsText: t.text,
                tipsPath: t.path
            }), t.text && t.path && e.report("7486.3.1"), t.text = "", t.path = "";
        },
        onDisableTips: function(t) {
            var i = getApp().indexTips;
            i.text = "", i.path = "", this.setData({
                tipsPath: "",
                tipsText: ""
            }), e.report("7486.3.3");
        },
        onTapTips: function(t) {
            var i = t.currentTarget.dataset.path;
            this.$goto(i), e.report("7486.3.2");
        }
    }
});