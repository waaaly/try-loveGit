var t = require("../../../common/utils/api.js");

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
    return t.getOneShopRatings(e);
};