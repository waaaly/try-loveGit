Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(t, e, n, r) {
    var u = n.groups[e], i = [];
    return i = r ? [ function(t) {
        var e = u.find(t);
        return t.quantity = e.quantity || 0, t.extra = e.extra || {}, t;
    }(t) ] : function(t) {
        return t.reduce(function(t, e) {
            return e.quantity = u.findById(e).reduce(function(t, e) {
                return t + e.quantity;
            }, 0), e.extra = {}, t.concat(e);
        }, []);
    }(t.specfoods), {
        activity: t.activity,
        entities: i,
        groupIndex: e,
        quantity: i.reduce(function(t, e) {
            return t + e.quantity;
        }, 0)
    };
};