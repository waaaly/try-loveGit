module.exports = {
    onTagTap: function() {
        var a = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).target.dataset.tagName;
        if (a) {
            var t = "id=" + this.data.shop.ele_id + "&tagName=" + a;
            wx.navigateTo({
                url: "/pages/shop/rating/index?" + t
            });
        }
    }
};