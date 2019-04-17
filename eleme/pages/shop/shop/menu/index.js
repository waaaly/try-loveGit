var t = require("../apis"), e = require("../dealDataForWebCart"), a = !1;

module.exports = {
    scrollToBottom: function(e) {
        var n = this;
        if (!a && this.data.isNewRetail) {
            a = !0, this.setData({
                menuPage: this.data.menuPage + 1
            });
            var s = JSON.parse(JSON.stringify(this.data.menuIndex));
            t.getFoodsByCategory(this.data.shop.id, s.id, s.type, this.data.menuPage).then(function(t) {
                var e = t.filter(function(t) {
                    var e = !1;
                    return s.foods.map(function(a) {
                        t.item_id === a.item_id && (e = !0);
                    }), !e;
                });
                s.foods = s.foods.concat(e), n.setData({
                    menuIndex: s
                }), a = !1;
            });
        }
    },
    changeCategory: function(a) {
        var n = this, s = a.currentTarget, i = Number(s.dataset.index);
        if (this.setData({
            menuError: !1,
            activeMenuCategory: {
                id: s.dataset.value
            },
            menuIndex: this.data.menu[i],
            menuPage: 1,
            showEssentailTip: this.data.needEssential && this.essentialIndex !== i && this.independentIndex !== i
        }), !this.data.menuIndex.foods.length) {
            var o = s.dataset.id, d = s.dataset.type;
            t.getCategory(this.data.shop.id, o, d, this.data.isNewRetail).then(function(t) {
                if (t.foods && t.foods.length) {
                    var a = n.data.menu;
                    a[i].foods = e(t).foods, n.setData({
                        menu: a,
                        menuIndex: n.data.menu[i]
                    });
                } else n.setData({
                    menuError: !1
                });
            }).catch(function(t) {
                console.error(t), n.setData({
                    menuError: !0
                });
            });
        }
    }
};