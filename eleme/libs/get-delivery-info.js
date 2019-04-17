Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(e, r) {
    if (0 === Object.keys(e).length) return {};
    var t = e.rules, i = t.length > 1, n = parseInt(r, 10), f = "", u = void 0, o = void 0;
    if (i ? (o = 0, u = t[0].fee) : (o = t[0].price, f = 0 === (u = t[0].fee) ? "免配送费" : "配送费&yen;" + u), 
    0 !== n && i) {
        var l = t.filter(function(e) {
            return n >= e.price;
        }).pop(), d = t.filter(function(e) {
            return n < e.price;
        }).shift(), c = t.indexOf(d) === t.length - 1;
        if (u = l.fee, d) {
            var p = d.price - r, s = "减配送费&yen;" + (l.fee - d.fee).toFixed(2);
            c && (s = 0 === d.fee ? "免配送费" : "配送费&yen;" + d.fee), f = "再买&yen;" + +p.toFixed(2) + s;
        } else f = 0 === l.fee ? "免配送费" : "配送费&yen;" + l.fee;
    }
    return {
        deliveryText: f,
        deliveryFee: u,
        minimumOrderAmount: o
    };
};