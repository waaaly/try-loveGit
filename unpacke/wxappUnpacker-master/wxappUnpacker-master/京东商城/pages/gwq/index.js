var e = require("../../bases/page.js"), t = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}(require("../../common/h5jump.js"));

new e.JDPage({
    data: {
        url: "https://wqs.jd.com/xcxgwq/index.html?xcx=1",
        ptag: "138043.1.3"
    },
    onLoad: function(e) {
        this.setData({
            url: t.addParamsToH5Url(this.data.url)
        }), console.log("购物圈 webview.src: ", this.data.url);
    },
    onShareAppMessage: function(e) {
        return {
            title: "京东微信购物圈"
        };
    }
});