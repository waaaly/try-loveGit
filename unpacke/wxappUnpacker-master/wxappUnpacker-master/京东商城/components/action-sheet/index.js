new (require("../../bases/component").JDComponent)({
    properties: {
        title: String,
        listData: {
            type: Array,
            value: []
        },
        showActionSheetFlag: {
            type: Boolean,
            value: !1,
            observer: "observeFlagChange"
        },
        isShowLayer: Boolean,
        showAnim: Boolean
    },
    methods: {
        closeLayer: function(e) {
            this.triggerEvent("closeActionSheet");
        },
        handleItemClick: function(e) {
            var t = e.currentTarget.dataset.idx;
            this.triggerEvent("handleItemClick", t);
        },
        observeFlagChange: function(e) {
            var t = this;
            e ? (this.setData({
                isShowLayer: !0
            }), setTimeout(function() {
                t.setData({
                    showAnim: !0
                });
            }, 100)) : (this.setData({
                showAnim: !1
            }), setTimeout(function() {
                t.setData({
                    isShowLayer: !1
                });
            }, 100));
        },
        noscroll: function() {}
    }
});