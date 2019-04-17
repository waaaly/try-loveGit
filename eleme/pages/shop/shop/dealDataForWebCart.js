var e = getApp().services.HashToUrl;

module.exports = function(i) {
    return i.foods.forEach(function(i) {
        var r = i.specfoods;
        i.price = Number.POSITIVE_INFINITY, i.stock = 0, 1 === r.length && (i.original_price = r[0].original_price), 
        r.forEach(function(e) {
            e.category_id = i.category_id, i.stock += e.stock, i.price = Math.min(i.price, e.price);
        }), i.image_path = e(i.image_path, 640, 640), i.price = +i.price.toFixed(2);
    }), i;
};