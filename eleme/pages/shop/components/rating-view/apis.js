var t = require("../../../../common/utils/api.js");

exports.fetchShop = function(e) {
    var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = Object.assign({
        extras: '["activities","album","license","identification","statistics"]'
    }, i);
    return t.getShopDetail(e, n);
}, exports.fetchScore = function(e) {
    return t.getScore(e);
}, exports.fetchTags = function(e) {
    return t.getTags(e);
}, exports.fetchRatings = function(e) {
    var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
        limit: 10,
        offset: 0,
        has_content: !0
    };
    return t.getShopRatings(e, i);
};