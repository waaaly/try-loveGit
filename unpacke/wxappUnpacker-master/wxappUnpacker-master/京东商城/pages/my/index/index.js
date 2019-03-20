function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var u = e(require("./page")), r = require("../../../common/wqvue/indexv1.2");

e(require("../../../common/wxcontext")).default.isXCX || window.Vue.use(require("@legos/recommend").default), 
new r.WqVue(u.default);