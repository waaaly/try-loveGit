Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}(require("../../../common/js/utils")), t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../../common/wxcontext")), r = {
    props: {
        show: {
            type: Boolean,
            default: !0
        },
        list: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    mounted: function() {
        this.jumpLogisDetail = e.throttle(this.jumpLogisDetail, 1e3);
    },
    methods: {
        jumpLogisDetail: function(e) {
            var r = (e.xcxEvent || e).currentTarget.dataset, o = r.dealid, u = r.dealstate, l = r.venderid, a = r.ordertype;
            this.$xgoto([ "/pages/order/follow/follow", "//wqs.jd.com/order/deal_wuliu.shtml?from=my" ], {
                dealId: o,
                dealState: u,
                ptag: "7155.1.117",
                venderId: t.default.isXCX ? l : "",
                orderType: t.default.isXCX ? a : "",
                source: t.default.isXCX ? "userCenter" : ""
            });
        }
    }
};

exports.default = r;