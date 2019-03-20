var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./page"));

new (require("../../../../../common/wqvue/indexv1.2").WqComponent)(e.default, "plus-curtain");