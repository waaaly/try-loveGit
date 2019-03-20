Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.hostHelper = {
    getShopHost: function(t) {
        return 1 == t ? "https://api.gzcfe.net/shop" : 0 == t ? "http://testapi.gzcfe.net/testshop" : "";
    },
    getAppHost: function(t) {
        return 1 == t ? "https://api.gzcfe.net/app" : 0 == t ? "http://testapi.gzcfe.net/testapp" : "";
    },
    getJdHost: function(t) {
        return 1 == t ? "https://api.gzcfe.net/new/api" : 0 == t ? "http://47.94.145.183:8701/api" : "";
    }
};