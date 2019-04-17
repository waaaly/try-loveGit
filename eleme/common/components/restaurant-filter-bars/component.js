var t = getApp().extend([ {
    toggleMask: function() {
        this.setData({
            showFilter: !1,
            showSort: !1
        });
    }
}, require("../restaurant-sort/component.js"), require("../restaurant-filter/component.js") ]);

module.exports = t;