Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = getApp().services, r = e.ApiCreater, t = e.paramsToString, o = e.User;

exports.getShop = function(e) {
    var s = t({
        "extras[]": "activities",
        terminal: "h5"
    });
    return r({
        url: "/shopping/restaurant/" + e + "?" + s,
        header: {
            cookie: o.SID ? "SID=" + o.SID : ""
        }
    });
}, exports.getFoods = function(e) {
    return r({
        url: "/shopping/v1/restaurants/" + e + "/hot_sale_food",
        header: {
            cookie: o.SID ? "SID=" + o.SID : ""
        }
    });
};