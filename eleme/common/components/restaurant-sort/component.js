module.exports = {
    data: {
        showSort: !1,
        sortData: {
            sortName: "综合排序",
            isBold: !0
        }
    },
    toggleSort: function() {
        this.setData({
            showFilter: !1,
            showSort: !this.data.showSort
        });
    },
    searchBySort: function(t) {
        var e = this, s = t.currentTarget.dataset, a = s.key, r = s.value, o = (s.name, 
        Number(r)), i = this.data.outside.inside_sort_filter, h = this.data.query;
        h[a] && h[a] === o ? delete h[a] : h[a] = o;
        var u = i.filter(function(t) {
            return e.data.query[t.key] === t.value;
        })[0], l = u ? u.name : "综合排序";
        this.setData({
            query: h,
            sortData: {
                sortName: l,
                isBold: !!u
            }
        }), i[a] && i[a] === o ? this.toggleSort() : this.setData({
            showSort: !1,
            showFilter: !1
        }), this.filterShops();
    }
};