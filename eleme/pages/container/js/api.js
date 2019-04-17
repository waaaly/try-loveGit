var e = getApp().services.ApiCreater, r = require("../../../common/services/hosts").crayfishlite;

module.exports = {
    getWebviewConfig: function() {
        return e({
            url: r + "/webviewlink"
        });
    }
};