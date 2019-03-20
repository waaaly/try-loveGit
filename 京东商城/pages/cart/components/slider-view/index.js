var t = require("../../../../bases/component"), e = getApp().systemInfo.pixelRatio, a = void 0 === e ? 2 : e;

new t.JDComponent({
    properties: {
        moveThreshold: {
            type: Number,
            value: 60
        },
        moveMax: {
            type: Number,
            value: 150
        },
        open: {
            type: Boolean,
            value: !1,
            observer: function(t) {
                this.setData({
                    x: t ? 0 : this.data.moveMax
                }), this.triggerEvent("change", {
                    open: t
                });
            }
        },
        disabled: Boolean
    },
    data: {
        x: 150,
        currentX: 150,
        moveInstance: 0
    },
    attached: function() {},
    methods: {
        onChange: function(t) {
            var e = t.detail.x * a;
            this.data.moveInstance = this.data.moveMax - e, this.data.currentX = e;
        },
        onTouchEnd: function() {
            0 !== this.data.currentX ? this.data.currentX !== this.data.moveMax ? this.data.open && this.data.currentX > 0 ? this.setData({
                open: !1
            }) : this.data.moveInstance < this.data.moveThreshold ? this.setData({
                open: !1,
                x: this.data.moveMax
            }) : this.setData({
                open: !0
            }) : this.setData({
                open: !1
            }) : this.setData({
                open: !0
            });
        },
        onRemove: function(t) {
            this.setData({
                open: !1
            }), this.triggerEvent("remove", t);
        },
        onTouchStart: function(t) {
            this.data.open || this.triggerEvent("open", t);
        }
    }
});