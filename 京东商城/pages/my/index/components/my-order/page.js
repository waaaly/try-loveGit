function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = e(require("./store")), a = e(require("../../../../../common/wxcontext")), i = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}(require("../../../common/js/utils")), n = e(require("../../../../../api/Ptag/report_manager_wqvue")), o = {
    store: r.default,
    created: function() {
        this.fetchAllOrder(), this.navToOrderListPage = i.throttle(this.navToOrderListPage, 1e3), 
        this.navToH5 = i.throttle(this.navToH5, 1e3);
    },
    methods: {
        initPage: function() {
            this.fetchAllOrder();
        },
        fetchAllOrder: function() {
            this.fetAllOrderData();
        },
        navToOrderListPage: function(e) {
            var r, i = (e.xcxEvent || e).currentTarget.dataset, n = i.page, o = i.ptag, s = (r = {}, 
            t(r, a.default.isXCX ? "currentPage" : "tab", a.default.isXCX ? n : Number(n) + 1), 
            t(r, "ptag", o), r);
            this.isMenv && (s.sceneval = 2), this.$xgoto([ "/pages/order/list/list", "//wqs.jd.com/order/orderlist_merge.shtml" ], s);
        },
        navToH5: function() {
            n.default.addPtag("7155.1.15"), this.$xgoto([ "//tuihuan.jd.com/afs/orders" ], {
                sceneval: this.isMenv ? 2 : ""
            });
        }
    }
};

exports.default = o;