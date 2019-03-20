var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./page"));

new (require("../../common/wqvue/indexv1.1.13").WqComponent)(e.default, "share");