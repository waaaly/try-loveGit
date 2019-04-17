var e = require("../../../dave/dave.js"), r = e.User, t = e.ApiCreater;

module.exports = {
    searchRestaurant: function(e) {
        return e.terminal = "weapp", t({
            url: "/shopping/v2/restaurants/search?extras[]=activities&search_item_type=3&is_rewrite=1",
            data: e,
            header: {
                cookie: "SID=" + r.SID
            }
        });
    },
    getHotwords: function(e) {
        return t({
            url: "/pizza/v1/hotwords",
            data: e
        });
    },
    getTypeAhead: function(e) {
        return t({
            url: "/shopping/v1/typeahead",
            data: e
        });
    }
};