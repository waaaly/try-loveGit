new (require("../../../bases/component").JDComponent)({
    properties: {
        isShortPwd: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        focus: !1,
        curIndex: 0,
        password: ""
    },
    methods: {
        onTap: function(t) {
            this.data.focus || this.setData({
                focus: !0
            });
        },
        onBlur: function(t) {
            this.setData({
                focus: !1
            });
        },
        onInput: function(t) {
            var s = t.detail.value;
            this.setData({
                password: s
            }), this.triggerEvent("input", s);
        }
    }
});