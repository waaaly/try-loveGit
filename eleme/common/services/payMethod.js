function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var a = e[n];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(t, a.key, a);
        }
    }
    return function(e, n, a) {
        return n && t(e.prototype, n), a && t(e, a), e;
    };
}(), n = function() {
    function n() {
        t(this, n), this.data = {};
    }
    return e(n, [ {
        key: "reset",
        value: function() {
            this.data = {};
        }
    }, {
        key: "set",
        value: function(t) {
            this.data.payMethods = t, this.data.payMethod = this.data.payMethods.find(function(t) {
                return 1 === t.select_state;
            });
        }
    }, {
        key: "select",
        value: function(t) {
            this.data.payMethod = t;
        }
    }, {
        key: "load",
        value: function() {
            return this.data;
        }
    }, {
        key: "loadSync",
        value: function() {
            return this.data;
        }
    } ]), n;
}();

module.exports = n;