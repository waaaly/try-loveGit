var t = require("../../../common/utils/api.js"), a = require("../../../libs/promise.js");

module.exports = {
    data: {
        showCategory: !1,
        categoryList: [],
        categoryNow: {
            selectParent: "美食"
        },
        categoryData: {
            show_name: "",
            flavor_ids: []
        }
    },
    toggleCategory: function() {
        this.setData({
            showFilter: !1,
            showSort: !1,
            showCategory: !this.data.showCategory
        });
    },
    renderCategory: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "美食";
        this.setData({
            categoryNow: Object.assign(this.data.categoryNow, {
                parent: this.data.categoryList,
                children: this.data.categoryList[t] ? this.data.categoryList[t].sub_categories : {},
                selectParent: this.data.categoryList[t] ? this.data.categoryList[t].name : ""
            }),
            categoryData: Object.assign(this.data.categoryData, {
                show_name: a
            })
        });
    },
    chooseParentCategory: function(t) {
        var a = Number(t.currentTarget.dataset.index);
        this.data.categoryList[a].sub_categories && 0 !== this.data.categoryList[a].sub_categories.length || this.searchByCategory(null, t.currentTarget.dataset.name), 
        this.renderCategory(a);
    },
    chooseChildCategory: function(t) {
        this.searchByCategory(Number(t.currentTarget.dataset.id), t.currentTarget.dataset.name);
    },
    searchByCategory: function(t) {
        var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "美食";
        this.data.query.restaurant_category_ids = t ? t instanceof Array ? t : [ t ] : [], 
        this.data.offset = 0, this.setData({
            categoryNow: Object.assign(this.data.categoryNow, {
                selectChild: t
            }),
            categoryData: Object.assign(this.data.categoryData, {
                show_name: a
            })
        }), this.toggleCategory(), this.filterShops();
    },
    initCategoryNow: function() {
        for (var t = this.data.categoryData.show_name, a = this.data.categoryList, e = 0, s = a.length; e < s; e++) if (a[e].name === t) return void this.setData({
            categoryNow: {
                parent: this.data.categoryList,
                children: this.data.categoryList[e] ? this.data.categoryList[e].sub_categories : {},
                selectParent: this.data.categoryList[e] ? this.data.categoryList[e].name : "",
                selectChild: a[e].sub_categories[0].id
            }
        });
        this.renderCategory(1, t);
    },
    getCategory: function() {
        var e = this;
        return t.getShopCategories({
            latitude: this.data.query.latitude,
            longitude: this.data.query.longitude,
            flavor_ids: this.data.categoryData.flavor_ids,
            show_name: this.data.categoryData.show_name
        }).then(function(t) {
            var s = t.data;
            return e.data.categoryList = s, a.resolve();
        });
    },
    onLoad: function() {
        this.setData({
            categoryData: {
                flavor_ids: this.data.options.category_schema ? this.data.options.category_schema.complex_category_ids : [ 207, 220, 233, 260 ],
                show_name: this.data.options.category_schema ? this.data.options.category_schema.category_name : "美食"
            }
        }), this.getCategory().then(this.initCategoryNow);
    }
};