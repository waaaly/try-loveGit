function e(e) {
    if (Array.isArray(e)) {
        for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t];
        return i;
    }
    return Array.from(e);
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var i = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var a = t[i];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, i, a) {
        return i && e(t.prototype, i), a && e(t, a), t;
    };
}(), a = function() {
    function a() {
        t(this, a), this.data = {};
    }
    return i(a, [ {
        key: "reset",
        value: function() {
            this.data = {};
        }
    }, {
        key: "set",
        value: function(t, i, a, r, n) {
            this.data.isOnTime = i, this.data.isFengniao = t, this.data.deliveryTime = this.data.deliveryTime || a, 
            this.data.reachTime = r, this.select(this.data.deliveryTime);
            var s = n.length > 0 ? n[0].time_points.map(function(e) {
                return e.time;
            }) : [];
            this.data.deliveryTimesForPicker = [ "尽快送达" ].concat(e(s));
        }
    }, {
        key: "select",
        value: function(e) {
            e ? (this.data.deliveryTimeDescription = e, this.data.deliveryTime = e) : (this.data.deliveryTimeDescription = "尽快送达 | 预计" + this.data.reachTime, 
            this.data.deliveryTime = "");
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
    } ]), a;
}();

module.exports = a;