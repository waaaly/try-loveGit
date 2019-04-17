function n(n, t) {
    if (!(n instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function n(n, t) {
        for (var e = 0; e < t.length; e++) {
            var a = t[e];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(n, a.key, a);
        }
    }
    return function(t, e, a) {
        return e && n(t.prototype, e), a && n(t, a), t;
    };
}(), e = function() {
    function e() {
        n(this, e), this.data = {
            countPersonRange: [ "1人", "2人", "3人", "4人", "5人", "6人", "7人", "8人", "9人", "10人", "10人以上" ]
        };
    }
    return t(e, [ {
        key: "reset",
        value: function() {
            this.data = {
                countPersonRange: [ "1人", "2人", "3人", "4人", "5人", "6人", "7人", "8人", "9人", "10人", "10人以上" ]
            };
        }
    }, {
        key: "set",
        value: function(n) {
            this.data.isCountPersonAvailable = n;
        }
    }, {
        key: "save",
        value: function(n) {
            return this.data.countPerson = this.data.countPersonRange[n];
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
    } ]), e;
}();

module.exports = e;