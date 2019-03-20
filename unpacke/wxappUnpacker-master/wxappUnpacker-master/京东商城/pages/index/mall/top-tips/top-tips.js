var e = require("../../../../bases/component.js"), t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../common-behavior.js")), o = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    return t.default = e, t;
}(require("../../../../common/localStorage.js"));

new e.JDComponent({
    behaviors: [ t.default ],
    properties: {
        hideTime: {
            type: Number,
            observer: function(e) {
                this.onHide();
            }
        }
    },
    data: {
        hideModule: !0
    },
    methods: {
        refresh: function() {
            this.init();
        },
        init: function() {
            var e = this;
            -1 !== getApp().systemInfo.system.indexOf("Android") && o.get("mall_toptips_hide_util", null).then(function(t) {
                var i = void 0;
                t ? i = !0 : (i = !1, o.set("mall_toptips_hide_util", !0)), e.setData({
                    hideModule: i
                });
            }).catch(function(e) {
                console.log(e);
            });
        },
        onHide: function() {
            this.closeModule();
        },
        closeModule: function() {
            this.setData({
                hideModule: !0
            });
        }
    }
});