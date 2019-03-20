function t(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
    return e.default = t, e;
}

function e(t) {
    var e = Object.assign({}, t);
    return e.postTime = e.creationTime.substr(0, 10), e.skuDesc = (e.productColor + " " + e.productSize).trim(), 
    e.thumbs = e.images ? e.images.map(function(t) {
        var e = t.imgUrl.replace(/\/n\d{1,2}\//i, "/n8/");
        return o.getImg(e, 200, 400);
    }) : [], e;
}

var r = require("../../../bases/component"), o = t(require("../../../common/fe_helper.js")), n = t(require("../../../common/biz")), a = require("../../../api/Ptag/Ptag_utils.js"), i = t(require("../../../api/Ptag/Ptag_constants.js"));

new r.JDComponent({
    properties: {
        skuId: String,
        venderId: String,
        isPingou: Boolean
    },
    data: {
        skuId: "",
        review: {}
    },
    ready: function() {
        var t = this, r = this.data, o = r.skuId, s = r.isPingou;
        o && n.getComment(0, 0, o).then(function(r) {
            var o = r.productCommentSummary, n = [];
            if (o.SensitiveBook && 1 == o.SensitiveBook) t.setData({
                "review.total": 0
            }); else {
                r.comments[0] && n.push(e(r.comments[0])), r.comments[1] && n.push(e(r.comments[1]));
                var u = {
                    total: o.CommentCount,
                    totalStr: o.CommentCountStr,
                    percent: (100 * o.GoodRate).toFixed(1).replace(".0", ""),
                    detail: n,
                    entries: [ {
                        name: "好评",
                        countStr: o.GoodCountStr
                    }, {
                        name: "中评",
                        countStr: o.GeneralCountStr
                    }, {
                        name: "差评",
                        countStr: o.PoorCountStr
                    }, {
                        name: "晒单",
                        countStr: o.ShowCountStr
                    } ]
                };
                t.setData({
                    review: u
                }), s && a.PtagUtils.addPtag(i.EXP_COMMENT_FLOOR);
            }
        }).catch(function(t) {
            throw t;
        });
    },
    methods: {
        navigateTo: function(t) {
            if (this.data.review.total && 0 != this.data.review.total) {
                var e = t.currentTarget.dataset, r = e.url, o = e.type, n = this.data, s = n.skuId, u = n.venderId, m = n.isPingou;
                this.$goto(r, {
                    sku: s,
                    vender: u || "",
                    type: o
                }, "navigateToByForce"), m ? a.PtagUtils.addPtag(i.CLICK_ALL_COMMENT) : a.PtagUtils.addPtag(i.VIEW_COMMENT);
            }
        }
    }
});