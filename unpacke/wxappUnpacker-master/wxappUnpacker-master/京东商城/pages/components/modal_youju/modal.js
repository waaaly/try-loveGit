new (require("../../../bases/component").JDComponent)({
    properties: {
        show: {
            type: Boolean,
            value: !1
        },
        type: {
            type: String
        },
        title: {
            type: String
        },
        content: {
            type: String
        },
        couponPrice: {
            type: String,
            value: "0"
        },
        couponName: {
            type: String,
            value: ""
        },
        couponTips: {
            type: String,
            value: "在我的福利中可以查看"
        },
        cancelText: {
            type: String,
            value: "取消"
        },
        confirmText: {
            type: String,
            value: "确定"
        },
        showCancel: {
            type: Boolean,
            value: !1
        },
        icon: {
            type: String,
            value: "warn"
        },
        confirmButtonType: {
            type: String,
            value: ""
        }
    },
    methods: {
        cancelCallback: function() {
            this.triggerEvent("cancel");
        },
        confirmCallback: function() {
            this.triggerEvent("confirm");
        },
        getPhoneNumCallback: function(e) {
            this.triggerEvent("getphonenumber", e);
        },
        onGetPhoneNumTap: function(e) {
            this.triggerEvent("getphonenumbertap", e);
        }
    }
});