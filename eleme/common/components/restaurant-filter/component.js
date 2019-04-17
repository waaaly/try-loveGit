var t = require("../../utils/api.js");

module.exports = {
    data: {
        showFilter: !1,
        filterData: {
            activityAttribute: [],
            activityTypes: [],
            deliveryMode: [],
            averageCosts: []
        },
        shopAmount: 0
    },
    getFilter: function() {
        var e = this, a = this.data.place || this.data.query, i = {
            latitude: a.latitude,
            longitude: a.longitude,
            terminal: "weapp"
        };
        return this.data.fromSearch && (i.entry_page = 1), t.getBatchFilters(i).then(function(t) {
            var a = t.data, i = a.bar, r = a.outside;
            e.setData({
                filterData: {
                    activityAttribute: i.supports || [],
                    activityTypes: i.activity_types || [],
                    deliveryMode: i.delivery_mode ? [ i.delivery_mode ] : [],
                    averageCosts: i.average_costs || []
                },
                outside: r
            });
        });
    },
    toggleFilter: function() {
        this.setData({
            showFilter: !this.data.showFilter,
            showSort: !1
        }), this.getShopAmount();
    },
    chooseFilter: function(t) {
        var e = t.currentTarget.dataset, a = e.index, i = e.tag;
        a = Number(a);
        var r = this.data.filterData[i][a];
        "activityAttribute" === i || r.selected || this.data.filterData[i].forEach(function(t) {
            return t.selected = !1;
        }), r.selected = !r.selected, this.setData({
            filterData: this.data.filterData
        }), this.getShopAmount();
    },
    extractFilter: function(t) {
        var e = [].concat(this.data.filterData[t].filter(function(t) {
            return t.selected;
        }).map(function(t) {
            return t.id;
        }));
        return e.length && this.setData({
            showFilterBarBold: !0
        }), e;
    },
    clearFilter: function() {
        this.setData({
            showFilterBarBold: !1
        });
        for (var t in this.data.filterData) this.data.filterData[t].forEach(function(t) {
            return t.selected = !1;
        });
        this.setData({
            filterData: this.data.filterData
        }), this.getShopAmount();
    },
    extractAll: function() {
        Object.assign(this.data.query, {
            delivery_mode: this.extractFilter("deliveryMode"),
            activity_types: this.extractFilter("activityTypes"),
            support_ids: this.extractFilter("activityAttribute"),
            average_cost_ids: this.extractFilter("averageCosts")
        });
    },
    searchByFilter: function() {
        !this.data.fetching && this.data.shopAmount && (this.setData({
            showFilterBarBold: !1
        }), this.extractAll(), this.toggleFilter(), this.filterShops());
    },
    getShopAmount: function() {
        var e = this;
        if (!this.data.fetching) {
            this.setData({
                fetching: !0
            }), this.extractAll();
            var a = this.data.place || this.data.query, i = {
                latitude: a.latitude,
                longitude: a.longitude
            };
            Object.assign(i, this.data.query), t.getShopAmount(i).then(function(t) {
                e.setData({
                    shopAmount: t.data,
                    fetching: !1
                });
            });
        }
    }
};