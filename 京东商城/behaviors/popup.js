Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = Behavior({
    properties: {
        showPopupFlag: {
            type: Boolean,
            value: !1,
            observer: "_observeFlagChange"
        },
        isShowPopup: Boolean,
        isShowPopupAnim: Boolean
    },
    methods: {
        _observeFlagChange: function(o) {
            var e = this;
            o ? (this.setData({
                isShowPopup: !0
            }), setTimeout(function() {
                e.setData({
                    isShowPopupAnim: !0
                });
            }, 100)) : (this.setData({
                isShowPopupAnim: !1
            }), setTimeout(function() {
                e.setData({
                    isShowPopup: !1
                });
            }, 500));
        },
        noscroll: function() {}
    }
});