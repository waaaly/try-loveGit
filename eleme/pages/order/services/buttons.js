function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e;
    };
}(), n = {
    cancel: {
        title: "取消订单",
        key: "cancel"
    },
    refund: {
        title: "申请退款",
        key: "refund"
    },
    rebuy: {
        title: "再来一单",
        key: "rebuy"
    },
    confirm: {
        title: "确认送达",
        class: "confirm",
        key: "confirm"
    },
    remind: {
        title: "催单",
        key: "remind"
    },
    rate: function() {
        return {
            title: "评价得金币",
            class: "alert",
            key: "rate"
        };
    }
}, i = function() {
    function i(e) {
        var r = this;
        if (t(this, i), this.buttons = [], this.hidenButtons = [], this.status = e, e.remind.is_available && this.buttons.push(n.remind), 
        e.could_contact) {
            var u = "rider" === e.could_contact;
            this.buttons.push({
                title: "联系" + (u ? "骑手" : "商家"),
                key: u ? "rider" : "shop"
            });
        }
        Object.keys(n).forEach(function(t) {
            e["operation_" + t] && ("function" == typeof n[t] ? r.buttons.push(n[t].call(r)) : r.buttons.push(n[t]));
        });
    }
    return e(i, [ {
        key: "getButtons",
        value: function() {
            return this.buttons;
        }
    }, {
        key: "getHidenButtons",
        value: function() {
            return this.hidenButtons;
        }
    } ]), i;
}();

module.exports = i;