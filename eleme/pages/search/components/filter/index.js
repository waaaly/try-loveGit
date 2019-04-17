function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

module.exports = {
    data: {
        delivery_mode: [],
        singleData: {}
    },
    searchAction: function() {
        var t = {
            "delivery_mode[]": this.data.delivery_mode[0]
        };
        this.data.singleData.name && (t[this.data.singleData.key + "[]"] = this.data.singleData.values[0]), 
        this.loadData(t, !1, !0);
    },
    select: function(a) {
        var e = "delivery_mode", i = a.target.dataset.value, s = this.data[e];
        s.indexOf(i) >= 0 ? s = s.filter(function(t) {
            return t !== i;
        }) : s.push(i), this.setData(t({}, e, s)), this.searchAction();
    },
    selectSingle: function(t) {
        var a = t.target.dataset.name, e = t.target.dataset.key, i = t.target.dataset.values;
        this.data.singleData.name === a ? this.setData({
            singleData: {}
        }) : this.setData({
            singleData: {
                name: a,
                key: e,
                values: i
            }
        }), this.searchAction();
    }
};