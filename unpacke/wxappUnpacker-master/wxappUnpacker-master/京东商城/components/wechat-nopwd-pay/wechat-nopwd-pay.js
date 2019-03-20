var e = require("../../bases/component.js"), t = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}(require("../../models/pay/wechat_nopwd_pay.js"));

new e.JDComponent({
    properties: {
        maxMoney: {
            type: Number,
            value: 0
        },
        jdpins: {
            type: Array,
            value: []
        },
        perDayTimes: {
            type: Number,
            value: 0
        }
    },
    methods: {
        _onWechatNopwdPayTap: function(e) {
            var r = e.currentTarget.dataset.type;
            t.operatePapPayGuide(), this.triggerEvent("btntap", {
                type: r
            });
        }
    }
});